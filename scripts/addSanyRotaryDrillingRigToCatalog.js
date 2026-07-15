#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const vm = require("node:vm");

const ROOT_DIR = path.resolve(__dirname, "..");
const CATALOG_PATH = path.join(ROOT_DIR, "data", "sany_official_products.json");
const IMAGE_ROOT = path.join(ROOT_DIR, "public", "images", "sany-official");
const PRODUCT_URL =
  "https://www.sanyglobal.com/product/piling_machinery/rotary_drilling_rig/38/";
const IMAGE_HOST = "https://sanyglobal-img.sany.com.cn";

function decodeHtmlEntities(value) {
  return String(value || "")
    .replace(/&amp;/gi, "&")
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#x2F;/gi, "/")
    .replace(/&#47;/gi, "/")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(parseInt(code, 16)),
    );
}

function stripTags(value) {
  return decodeHtmlEntities(String(value || ""))
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return (
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "unknown"
  );
}

function safeNumber(value, fallback = null) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "*/*",
      Referer: "https://www.sanyglobal.com/product/",
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.text();
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "*/*",
      Referer: PRODUCT_URL,
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return {
    body: Buffer.from(await response.arrayBuffer()),
    contentType: (response.headers.get("content-type") || "").split(";")[0].trim(),
  };
}

function extractScriptBodies(html) {
  return [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/gi)].map(
    (match) => match[1] || "",
  );
}

function extractFlightPayloads(html) {
  const pushes = [];
  const context = {
    self: {
      __next_f: {
        push(entry) {
          pushes.push(entry);
        },
      },
    },
  };

  for (const scriptBody of extractScriptBodies(html)) {
    if (!scriptBody.includes("self.__next_f.push")) continue;
    try {
      vm.runInNewContext(scriptBody, context, { timeout: 1500 });
    } catch {
      // Ignore non-critical inline script failures.
    }
  }

  return pushes
    .map((entry) => (Array.isArray(entry) && typeof entry[1] === "string" ? entry[1] : ""))
    .filter(Boolean);
}

function extractJsonObjectAfterKey(payload, key) {
  const keyIndex = payload.indexOf(key);
  if (keyIndex < 0) return null;

  let index = keyIndex + key.length;
  while (index < payload.length && /\s/.test(payload[index])) index += 1;
  if (payload[index] !== "{") return null;

  const start = index;
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = index; i < payload.length; i += 1) {
    const char = payload[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
    } else if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) return payload.slice(start, i + 1);
    }
  }
  return null;
}

function extractProductDataObject(html) {
  for (const payload of extractFlightPayloads(html)) {
    if (!payload.includes('"data":{"product":')) continue;
    const objectText = extractJsonObjectAfterKey(payload, '"data":');
    if (!objectText) continue;
    try {
      return JSON.parse(objectText);
    } catch {
      // Continue searching.
    }
  }
  return null;
}

function extractMetaDescription(html) {
  const match =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i) ||
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i);
  return match?.[1] ? stripTags(match[1]) : "";
}

function splitCsvValues(rawValue) {
  if (typeof rawValue !== "string") return [];
  return rawValue
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function normalizeImageUrl(rawUrl) {
  const cleaned = decodeHtmlEntities(rawUrl).trim();
  if (!cleaned || /\$[0-9a-z_]+/i.test(cleaned)) return null;
  let absolute = cleaned;
  if (cleaned.startsWith("//")) {
    absolute = `https:${cleaned}`;
  } else if (cleaned.startsWith("/")) {
    absolute = `${IMAGE_HOST}${cleaned}`;
  } else if (!/^https?:\/\//i.test(cleaned)) {
    absolute = `${IMAGE_HOST}/${cleaned.replace(/^\/+/, "")}`;
  }
  absolute = absolute.replace(/\\+/g, "");
  absolute = absolute.replace(
    /^https:\/\/sanyglobal-img\.sany\.com\.cn(?!\/)/i,
    "https://sanyglobal-img.sany.com.cn/",
  );
  if (/\.(pdf|docx?|xlsx?|pptx?)(\?|$)/i.test(absolute)) return null;
  if (!/[?&]x-oss-process=/.test(absolute)) {
    absolute += `${absolute.includes("?") ? "&" : "?"}x-oss-process=image/format,webp`;
  }
  return absolute;
}

function normalizeDocumentUrl(rawUrl) {
  const cleaned = decodeHtmlEntities(rawUrl).trim();
  if (!cleaned) return null;
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  if (cleaned.startsWith("//")) return `https:${cleaned}`;
  if (cleaned.startsWith("/")) return `${IMAGE_HOST}${cleaned}`;
  return `${IMAGE_HOST}/${cleaned.replace(/^\/+/, "")}`;
}

function uniqueKeepOrder(items) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    if (!item || seen.has(item)) continue;
    seen.add(item);
    result.push(item);
  }
  return result;
}

function extensionFromContentType(contentType) {
  const map = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return map[(contentType || "").toLowerCase()] || "jpg";
}

async function downloadImages(product) {
  const productIdentity = `${product.reference || product.name}-${product.modelId || "unknown"}`;
  const baseProductSlug = slugify(productIdentity);
  const productImageDir = path.join(
    IMAGE_ROOT,
    "piling-machinery",
    "rotary-drilling-rig",
    baseProductSlug,
  );
  await fs.mkdir(productImageDir, { recursive: true });

  const images = [];
  for (let index = 0; index < product.imageSourceUrls.length; index += 1) {
    const sourceUrl = product.imageSourceUrls[index];
    let localPath = null;
    let fileName = null;
    let contentType = null;
    let bytes = null;
    try {
      const result = await fetchBuffer(sourceUrl);
      contentType = result.contentType;
      bytes = result.body.length;
      fileName = `${baseProductSlug}__img-${String(index + 1).padStart(2, "0")}.${extensionFromContentType(contentType)}`;
      const destination = path.join(productImageDir, fileName);
      await fs.writeFile(destination, result.body);
      localPath = path.relative(ROOT_DIR, destination).split(path.sep).join("/");
    } catch (error) {
      console.warn(`[image] failed ${sourceUrl}: ${error.message}`);
    }
    images.push({
      index: index + 1,
      sourceUrl,
      localPath,
      fileName,
      contentType,
      bytes,
      downloaded: Boolean(localPath),
    });
  }
  return images;
}

function buildCatalogProduct(data, html) {
  const product = data.product || {};
  const productCode = stripTags(product.productNo || product.sku || "C10");
  const productFamily = stripTags(product.productName || "Rotary Drilling Rig");
  let extendsInfo = {};
  if (typeof product.extendsInfo === "string" && product.extendsInfo.trim()) {
    try {
      extendsInfo = JSON.parse(product.extendsInfo);
    } catch {
      extendsInfo = {};
    }
  }

  const featureList = (data.featureList || [])
    .map((feature) => {
      const title = stripTags(feature.featName || "");
      const description = stripTags(feature.featDesc || "");
      const imageUrls = uniqueKeepOrder(
        splitCsvValues(feature.featImages).map(normalizeImageUrl).filter(Boolean),
      );
      if (!title && !description && imageUrls.length === 0) return null;
      return { title, description, imageUrls };
    })
    .filter(Boolean);

  const technicalSpecifications = (data.attributeDataList || [])
    .map((group) => {
      const groupName = stripTags(group.groupName || "") || "General";
      const specifications = (group.attributesList || [])
        .map((attribute) => {
          const name = stripTags(attribute.attrName || "");
          const value = stripTags(attribute.attrValue || "");
          const unit = stripTags(attribute.attrUnit || "");
          const valueWithUnit = [value, unit].filter(Boolean).join(" ").trim();
          if (!name && !valueWithUnit) return null;
          return { name, value, unit, valueWithUnit };
        })
        .filter(Boolean);
      return specifications.length ? { groupName, specifications } : null;
    })
    .filter(Boolean);

  const keyAttributes = (data.keyAttributeList || [])
    .map((entry) => {
      const name = stripTags(entry.attrName || "");
      const value = stripTags(entry.attrValue || "");
      const unit = stripTags(entry.attrUnit || "");
      const valueWithUnit = [value, unit].filter(Boolean).join(" ").trim();
      if (!name && !valueWithUnit) return null;
      return { name, value, unit, valueWithUnit };
    })
    .filter(Boolean);

  const productDescription = stripTags(product.productDesc || "");
  const summary = extractMetaDescription(html) || `SANY ${productCode} Rotary Drilling Rig`;
  const descriptionParts = [summary, productDescription]
    .filter(Boolean)
    .concat(
      featureList
        .map((feature) =>
          feature.title && feature.description
            ? `${feature.title}: ${feature.description}`
            : feature.description,
        )
        .filter(Boolean),
    );

  const rawImageCandidates = [
    ...splitCsvValues(data?.images?.images),
    product.productThumb,
    ...featureList.flatMap((feature) => feature.imageUrls),
    extendsInfo?.vr_img,
  ];
  const imageSourceUrls = uniqueKeepOrder(
    rawImageCandidates.map(normalizeImageUrl).filter(Boolean),
  );

  const brochureUrl = normalizeDocumentUrl(extendsInfo?.brochure);
  const vrImageUrl = normalizeImageUrl(extendsInfo?.vr_img);
  const vrUrl = stripTags(extendsInfo?.vr_url || "");

  return {
    id: safeNumber(product.id, 38),
    modelId: safeNumber(product.id, 38),
    goodsId: safeNumber(product.goodsId, 38),
    reference: productCode,
    sku: stripTags(product.sku || "") || null,
    name: productCode,
    fullName: productFamily && !productCode.toLowerCase().includes(productFamily.toLowerCase())
      ? `${productCode} - ${productFamily}`
      : productCode,
    productFamily,
    sourceUrl: PRODUCT_URL,
    category: {
      id: 57,
      name: "Piling Machinery",
      slug: "piling-machinery",
    },
    subCategory: {
      id: safeNumber(product.catId, 89),
      name: "Rotary Drilling Rig",
      slug: "rotary-drilling-rig",
    },
    description: {
      summary,
      productDescription: productDescription || null,
      featureList,
      fullText: descriptionParts.join("\n\n").trim() || null,
    },
    technicalSpecifications,
    keyAttributes,
    documents: {
      brochureUrl: brochureUrl || null,
      vrUrl: vrUrl || null,
      vrImageUrl: vrImageUrl || null,
    },
    imageSourceUrls,
    images: [],
    verification: {
      hasSpecifications: technicalSpecifications.length > 0,
      hasDescription: descriptionParts.length > 0,
      hasImages: imageSourceUrls.length > 0,
    },
  };
}

function extractLegacyImages(html) {
  const images = [];
  for (const match of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) {
    const src = match[1];
    if (!src) continue;
    if (!/sanyglobal-img\.sany\.com\.cn/i.test(src)) continue;
    if (/logo|parameter|head-footer|favicon|\.svg/i.test(src)) continue;
    const normalized = normalizeImageUrl(src);
    if (normalized && !images.includes(normalized)) images.push(normalized);
  }
  return images;
}

function extractLegacyHeroStats(html) {
  const stats = [];
  const statRe =
    /<div class="spu-detail-data-one">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  for (const match of html.matchAll(statRe)) {
    const block = match[1];
    const value = stripTags(block.match(/<div class="font-4">([\s\S]*?)<\/div>/i)?.[1] || "");
    const name = stripTags(block.match(/<div class="font-9">([\s\S]*?)<\/div>/i)?.[1] || "");
    if (name && value) stats.push({ name, value, unit: "", valueWithUnit: value });
  }
  return stats;
}

function extractLegacyRows(html) {
  const specsStart = html.indexOf('<div id="specs"');
  if (specsStart < 0) return [];
  const specsHtml = html.slice(specsStart);
  const chunks = specsHtml.split('<div class="module-value-tr">').slice(1);

  return chunks
    .map((chunk) => {
      const sourceUrl = decodeHtmlEntities(
        chunk.match(/<a href=["']([^"']+)["'][^>]*class=["']model-name/i)?.[1] || "",
      );
      const modelId = safeNumber(sourceUrl.match(/\/(\d+)\/?$/)?.[1]);
      const reference = stripTags(chunk.match(/<span>([\s\S]*?)<\/span>/i)?.[1] || "");
      const brochureUrl = normalizeDocumentUrl(
        chunk.match(/href=["']([^"']+\.pdf)["'][^>]*class=["']model-brochure/i)?.[1] || "",
      );
      const flexValues = [...chunk.matchAll(/<div class="module-value-flex">([\s\S]*?)<\/div>/gi)]
        .map((match) => stripTags(match[1]))
        .filter(Boolean)
        .filter((text) => !text.includes("Brochure") && !text.includes("Inquiry") && text !== reference);
      const values = flexValues.slice(-3);
      if (!reference) return null;
      return {
        reference,
        modelId,
        sourceUrl: sourceUrl || PRODUCT_URL,
        brochureUrl,
        specs: [
          { name: "Max. Pile Diameter", value: values[0] || "", unit: "", valueWithUnit: values[0] || "" },
          { name: "Max. Pile Depth", value: values[1] || "", unit: "", valueWithUnit: values[1] || "" },
          { name: "Operating Weight", value: values[2] || "", unit: "", valueWithUnit: values[2] || "" },
        ].filter((spec) => spec.valueWithUnit),
      };
    })
    .filter(Boolean);
}

function buildLegacyProducts(html) {
  const title = stripTags(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "C10 Rotary Drilling Rig");
  const subtitle = stripTags(
    html.match(/<div class="spu-detail-titile">[\s\S]*?<div class="font-2">([\s\S]*?)<\/div>/i)?.[1] ||
      "Easy To Transport",
  );
  const summary = extractMetaDescription(html) || `${title} product models`;
  const imageSourceUrls = extractLegacyImages(html);
  const heroStats = extractLegacyHeroStats(html);
  const rows = extractLegacyRows(html);

  return rows.map((row) => {
    const technicalSpecifications = [
      {
        groupName: "Main Specification",
        specifications: row.specs,
      },
    ];
    const keyAttributes = row.specs.length ? row.specs : heroStats;
    return {
      id: row.modelId,
      modelId: row.modelId,
      goodsId: 38,
      reference: row.reference,
      sku: null,
      name: row.reference,
      fullName: `${row.reference} - ${title}`,
      productFamily: title,
      sourceUrl: row.sourceUrl,
      category: {
        id: 57,
        name: "Piling Machinery",
        slug: "piling-machinery",
      },
      subCategory: {
        id: 89,
        name: "Rotary Drilling Rig",
        slug: "rotary-drilling-rig",
      },
      description: {
        summary,
        productDescription: subtitle,
        featureList: [],
        fullText: `${summary}\n\n${subtitle}`.trim(),
      },
      technicalSpecifications,
      keyAttributes,
      documents: {
        brochureUrl: row.brochureUrl || null,
        vrUrl: null,
        vrImageUrl: null,
      },
      imageSourceUrls,
      images: [],
      verification: {
        hasSpecifications: technicalSpecifications.length > 0,
        hasDescription: true,
        hasImages: imageSourceUrls.length > 0,
      },
    };
  });
}

async function main() {
  const [catalogRaw, html] = await Promise.all([
    fs.readFile(CATALOG_PATH, "utf-8"),
    fetchText(PRODUCT_URL),
  ]);
  const catalog = JSON.parse(catalogRaw);
  const data = extractProductDataObject(html);
  const products = data?.product ? [buildCatalogProduct(data, html)] : buildLegacyProducts(html);
  if (!products.length) throw new Error("Could not extract SANY product data");
  for (const product of products) {
    product.images = await downloadImages(product);
  }

  let category = catalog.categories.find((c) => c.categorySlug === "piling-machinery");
  if (!category) {
    category = {
      categoryId: 57,
      categoryName: "Piling Machinery",
      categorySlug: "piling-machinery",
      totalProducts: 0,
      subCategories: [],
    };
    catalog.categories.push(category);
  }

  let subCategory = category.subCategories.find(
    (s) => s.subCategorySlug === "rotary-drilling-rig",
  );
  if (!subCategory) {
    subCategory = {
      subCategoryId: products[0].subCategory.id,
      subCategoryName: "Rotary Drilling Rig",
      subCategorySlug: "rotary-drilling-rig",
      totalProducts: 0,
      products: [],
    };
    category.subCategories.push(subCategory);
  }

  for (const product of products) {
    const existingIndex = subCategory.products.findIndex(
      (entry) => entry.reference === product.reference || entry.sourceUrl === product.sourceUrl,
    );
    if (existingIndex >= 0) {
      subCategory.products[existingIndex] = product;
    } else {
      subCategory.products.push(product);
    }
  }

  subCategory.totalProducts = subCategory.products.length;
  category.totalProducts = category.subCategories.reduce(
    (sum, sub) => sum + sub.totalProducts,
    0,
  );
  catalog.totals.totalProducts = catalog.categories.reduce(
    (sum, cat) => sum + cat.totalProducts,
    0,
  );
  catalog.totals.totalCategories = catalog.categories.length;
  catalog.totals.totalImagesReferenced = catalog.categories.reduce(
    (sum, cat) =>
      sum +
      cat.subCategories.reduce(
        (subSum, sub) =>
          subSum +
          sub.products.reduce(
            (productSum, entry) => productSum + (entry.imageSourceUrls?.length || 0),
            0,
          ),
        0,
      ),
    0,
  );
  catalog.totals.totalImagesDownloaded = catalog.categories.reduce(
    (sum, cat) =>
      sum +
      cat.subCategories.reduce(
        (subSum, sub) =>
          subSum +
          sub.products.reduce(
            (productSum, entry) =>
              productSum + (entry.images || []).filter((image) => image.downloaded).length,
            0,
          ),
        0,
      ),
    0,
  );

  await fs.writeFile(CATALOG_PATH, JSON.stringify(catalog, null, 2), "utf-8");
  const downloadedImages = products.reduce(
    (sum, product) => sum + product.images.filter((image) => image.downloaded).length,
    0,
  );
  console.log(
    `Added ${products.length} C10 Rotary Drilling Rig models to Piling Machinery (${downloadedImages} images)`,
  );
}

main().catch((error) => {
  console.error("[fatal]", error);
  process.exitCode = 1;
});
