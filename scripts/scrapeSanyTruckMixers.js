#!/usr/bin/env node
"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const vm = require("node:vm");

const BASE_SITE = "https://www.sanyglobal.com";
const LISTING_URL = `${BASE_SITE}/product/concrete_machinery/truck_mixer/`;
const IMAGE_HOST = "https://sanyglobal-img.sany.com.cn";

const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_JSON = path.join(ROOT_DIR, "data", "sany_truck_mixers.json");

const REQUEST_TIMEOUT_MS = 45_000;
const FETCH_RETRIES = 4;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripTags(value) {
  return String(value || "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeImageUrl(rawUrl) {
  const cleaned = String(rawUrl || "").trim();
  if (!cleaned) return null;
  let absolute = cleaned;
  if (cleaned.startsWith("//")) absolute = `https:${cleaned}`;
  else if (cleaned.startsWith("/")) absolute = `${IMAGE_HOST}${cleaned}`;
  else if (!/^https?:\/\//i.test(cleaned)) absolute = `${IMAGE_HOST}/${cleaned}`;
  absolute = absolute.replace(/\\+/g, "");
  if (!/[?&]x-oss-process=/.test(absolute)) {
    absolute += `${absolute.includes("?") ? "&" : "?"}x-oss-process=image/format,webp`;
  }
  return absolute;
}

async function fetchWithRetry(url) {
  let lastError = null;
  for (let attempt = 1; attempt <= FETCH_RETRIES; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          Accept: "*/*",
          Referer: BASE_SITE,
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
      const text = await response.text();
      clearTimeout(timer);
      return text;
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
      if (attempt < FETCH_RETRIES) await delay(400 * 2 ** (attempt - 1));
    }
  }
  throw lastError;
}

function extractFlightPayloads(html) {
  const scripts = [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1] || "",
  );
  const pushes = [];
  const context = {
    self: { __next_f: { push(entry) { pushes.push(entry); } } },
  };
  for (const body of scripts) {
    if (!body.includes("self.__next_f.push")) continue;
    try { vm.runInNewContext(body, context, { timeout: 3000 }); } catch {}
  }
  return pushes
    .map((e) => (Array.isArray(e) && typeof e[1] === "string" ? e[1] : ""))
    .filter(Boolean);
}

function extractJsonObjectAfterKey(payload, key) {
  const keyIndex = payload.indexOf(key);
  if (keyIndex < 0) return null;
  let index = keyIndex + key.length;
  while (index < payload.length && /\s/.test(payload[index])) index++;
  if (payload[index] !== "{") return null;
  const start = index;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = index; i < payload.length; i++) {
    const char = payload[i];
    if (inString) {
      if (escaped) { escaped = false; continue; }
      if (char === "\\") { escaped = true; continue; }
      if (char === '"') inString = false;
      continue;
    }
    if (char === '"') { inString = true; continue; }
    if (char === "{") { depth++; continue; }
    if (char === "}") {
      depth--;
      if (depth === 0) return payload.slice(start, i + 1);
    }
  }
  return null;
}

function extractProductData(html) {
  const payloads = extractFlightPayloads(html);
  for (const payload of payloads) {
    if (!payload.includes('"data":{"product":')) continue;
    const text = extractJsonObjectAfterKey(payload, '"data":');
    if (!text) continue;
    try { return JSON.parse(text); } catch {}
  }
  return null;
}

function extractMetaDescription(html) {
  const patterns = [
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return stripTags(m[1]);
  }
  return "";
}

async function discoverDetailUrls() {
  console.log("[crawl] Fetching truck mixer listing page...");
  const html = await fetchWithRetry(LISTING_URL);

  const links = [...html.matchAll(/href="(https:\/\/www\.sanyglobal\.com\/product\/concrete_machinery\/truck_mixer\/\d+\/\d+\/)"/gi)];
  const urls = [...new Set(links.map((m) => m[1]))].sort();
  console.log(`[crawl] Found ${urls.length} product detail URLs`);
  return urls;
}

function parseNumericValue(raw) {
  if (!raw) return null;
  const cleaned = String(raw).replace(/[≥≤<>~±]/g, "").replace(/,/g, "").trim();
  const match = cleaned.match(/^[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

function extractNumericSpecs(attributeDataList) {
  const specs = {};
  for (const group of attributeDataList || []) {
    for (const attr of group.attributesList || []) {
      const name = (attr.attrName || "").toLowerCase();
      const val = parseNumericValue(attr.attrValue);
      if (val === null) continue;

      if (name.includes("mix capacity") || name === "mixing capacity") {
        specs.capacity = val;
      }
      if (name.includes("curb weight") || name === "gvw") {
        const unit = (attr.attrUnit || "").toLowerCase();
        if (unit === "kg") specs.weight = val / 1000;
        else if (unit === "t") specs.weight = val;
      }
      if (
        name.includes("engine power") ||
        name.includes("rated power") ||
        name.includes("motor power")
      ) {
        const unit = (attr.attrUnit || "").toLowerCase();
        const rawVal = String(attr.attrValue || "");
        const powerMatch = rawVal.match(/^([\d.]+)/);
        const powerVal = powerMatch ? parseFloat(powerMatch[1]) : null;
        if (powerVal !== null) {
          if (unit.includes("kw")) specs.power = powerVal;
          else if (unit === "hp" || unit === "ps") specs.power = Math.round(powerVal * 0.7457);
        }
      }
    }
  }
  return Object.keys(specs).length > 0 ? specs : undefined;
}

function buildSpecStrings(attributeDataList) {
  let capacity = "";
  let weight = "";
  let power = "";

  for (const group of attributeDataList || []) {
    for (const attr of group.attributesList || []) {
      const name = (attr.attrName || "").toLowerCase();
      const valWithUnit = [attr.attrValue, attr.attrUnit].filter(Boolean).join(" ");

      if (name.includes("mix capacity") || name === "mixing capacity") {
        capacity = valWithUnit;
      }
      if (name === "gvw" || name.includes("gross vehicle weight")) {
        weight = valWithUnit;
      }
      if (
        name.includes("engine power") ||
        name.includes("rated power") ||
        name.includes("motor power")
      ) {
        power = valWithUnit;
      }
    }
  }

  return { capacity, weight, power };
}

async function scrapeProduct(url) {
  const html = await fetchWithRetry(url);
  const data = extractProductData(html);
  if (!data?.product) throw new Error("No product data found");

  const product = data.product;
  const metaDesc = extractMetaDescription(html);

  const productNo = stripTags(product.productNo) || `MODEL-${product.id}`;
  const productName = stripTags(product.productName) || "Truck Mixer";
  const fullName =
    productName && !productNo.toLowerCase().includes(productName.toLowerCase())
      ? `${productNo} - ${productName}`
      : productNo;

  const imageUrl = normalizeImageUrl(product.productThumb);

  const featureList = (data.featureList || []).map((f) => ({
    title: stripTags(f.featName || ""),
    description: stripTags(f.featDesc || ""),
  }));

  const technicalSpecs = (data.attributeDataList || []).map((group) => ({
    groupName: stripTags(group.groupName || "") || "General",
    specifications: (group.attributesList || [])
      .map((a) => ({
        name: stripTags(a.attrName || ""),
        value: stripTags(a.attrValue || ""),
        unit: stripTags(a.attrUnit || ""),
        valueWithUnit: [stripTags(a.attrValue || ""), stripTags(a.attrUnit || "")]
          .filter(Boolean)
          .join(" "),
      }))
      .filter((s) => s.name || s.valueWithUnit),
  })).filter((g) => g.specifications.length > 0);

  const numericSpecs = extractNumericSpecs(data.attributeDataList);
  const specStrings = buildSpecStrings(data.attributeDataList);

  const allImages = [];
  if (imageUrl) allImages.push(imageUrl);
  if (data.images?.images) {
    for (const raw of String(data.images.images).split(",").map((s) => s.trim()).filter(Boolean)) {
      const normalized = normalizeImageUrl(raw);
      if (normalized && !allImages.includes(normalized)) allImages.push(normalized);
    }
  }
  for (const feat of data.featureList || []) {
    for (const raw of String(feat.featImages || "").split(",").map((s) => s.trim()).filter(Boolean)) {
      const normalized = normalizeImageUrl(raw);
      if (normalized && !allImages.includes(normalized)) allImages.push(normalized);
    }
  }

  const urlParts = new URL(url).pathname.split("/").filter(Boolean);
  const goodsId = urlParts[urlParts.length - 2];
  const modelId = urlParts[urlParts.length - 1];

  return {
    id: product.id,
    modelId: product.id,
    goodsId: product.goodsId,
    reference: productNo,
    name: fullName,
    productFamily: productName,
    sourceUrl: url,
    category: "concrete_machinery",
    subCategory: "truck_mixer",
    subCategoryGoodsId: goodsId,
    subCategoryModelId: modelId,
    description: metaDesc || null,
    features: featureList.filter((f) => f.title || f.description),
    technicalSpecifications: technicalSpecs,
    numericSpecs,
    specStrings,
    imageUrl: imageUrl || "",
    allImageUrls: allImages,
  };
}

async function main() {
  console.log("[start] Scraping SANY Truck Mixer products...");
  const detailUrls = await discoverDetailUrls();

  const products = [];
  const failures = [];

  for (let i = 0; i < detailUrls.length; i++) {
    const url = detailUrls[i];
    try {
      console.log(`[scrape] (${i + 1}/${detailUrls.length}) ${url}`);
      const product = await scrapeProduct(url);
      products.push(product);
      console.log(`  => ${product.reference} (capacity: ${product.numericSpecs?.capacity || "?"} m³)`);
    } catch (error) {
      console.error(`  => FAILED: ${error.message}`);
      failures.push({ url, error: error.message });
    }
    if (i < detailUrls.length - 1) await delay(300);
  }

  products.sort((a, b) => (a.reference || "").localeCompare(b.reference || ""));

  const output = {
    source: LISTING_URL,
    generatedAt: new Date().toISOString(),
    totalProducts: products.length,
    totalFailures: failures.length,
    products,
    failures,
  };

  await fs.writeFile(OUTPUT_JSON, JSON.stringify(output, null, 2), "utf-8");
  console.log(`\n[done] Scraped ${products.length} products, ${failures.length} failures`);
  console.log(`[done] Output: ${path.relative(ROOT_DIR, OUTPUT_JSON)}`);
}

main().catch((error) => {
  console.error("[fatal]", error);
  process.exitCode = 1;
});
