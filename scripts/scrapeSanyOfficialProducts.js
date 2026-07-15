#!/usr/bin/env node
"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const vm = require("node:vm");

const BASE_SITE = "https://www.sanyglobal.com";
const ROOT_PRODUCT_URL = `${BASE_SITE}/product/`;
const IMAGE_HOST = "https://sanyglobal-img.sany.com.cn";

const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_JSON_PATH = path.join(ROOT_DIR, "data", "sany_official_products.json");
const OUTPUT_REPORT_PATH = path.join(
  ROOT_DIR,
  "data",
  "sany_official_scrape_report.json",
);
const OUTPUT_IMAGE_ROOT = path.join(ROOT_DIR, "public", "images", "sany-official");

const REQUEST_TIMEOUT_MS = Number(process.env.SANY_REQUEST_TIMEOUT_MS || 45_000);
const FETCH_RETRIES = Number(process.env.SANY_FETCH_RETRIES || 4);
const LISTING_CONCURRENCY = Number(process.env.SANY_LISTING_CONCURRENCY || 8);
const DETAIL_CONCURRENCY = Number(process.env.SANY_DETAIL_CONCURRENCY || 12);
const IMAGE_CONCURRENCY = Number(process.env.SANY_IMAGE_CONCURRENCY || 16);
const MAX_PRODUCTS = Number(process.env.SANY_MAX_PRODUCTS || 0);
const SKIP_IMAGES = process.env.SANY_SKIP_IMAGES === "1";
const CLEAN_IMAGES = process.env.SANY_CLEAN_IMAGES === "1";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function safeNumber(value, fallback = null) {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return fallback;
  return numberValue;
}

function decodeHtmlEntities(value) {
  return String(value || "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#x2F;/gi, "/")
    .replace(/&#47;/gi, "/")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function stripTags(value) {
  return decodeHtmlEntities(String(value || ""))
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  const normalized = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "unknown";
}

function titleFromSlug(slug) {
  return String(slug || "")
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function extensionFromContentType(contentType) {
  const map = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
    "application/pdf": "pdf",
  };
  return map[(contentType || "").toLowerCase()] || null;
}

function extensionFromUrl(rawUrl) {
  try {
    const pathname = new URL(rawUrl).pathname;
    const match = pathname.match(/\.([a-zA-Z0-9]{2,5})$/);
    if (!match) return null;
    return match[1].toLowerCase();
  } catch {
    return null;
  }
}

function toAbsoluteUrl(rawHref, currentUrl = BASE_SITE) {
  if (!rawHref) return null;
  const clean = decodeHtmlEntities(rawHref).trim().replace(/\\+/g, "");
  if (!clean) return null;
  if (clean.startsWith("javascript:")) return null;
  if (clean.startsWith("#")) return null;
  if (clean.startsWith("//")) return `https:${clean}`;
  try {
    return new URL(clean, currentUrl).toString();
  } catch {
    return null;
  }
}

function canonicalizeUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    parsed.hash = "";
    parsed.search = "";
    parsed.pathname = parsed.pathname.replace(/\/{2,}/g, "/");
    if (!parsed.pathname.endsWith("/")) parsed.pathname += "/";
    return parsed.toString();
  } catch {
    return null;
  }
}

function parseProductPath(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (parsed.hostname !== "www.sanyglobal.com") return null;

  const segments = parsed.pathname.split("/").filter(Boolean);
  if (!segments.length || segments[0] !== "product") return null;
  if (segments.includes("inquiry")) return null;
  if (segments[1] === "successful") return null;
  if (segments.length < 2) return null;

  const rest = segments.slice(1);
  const isDetail =
    rest.length >= 4 &&
    /^\d+$/.test(rest[rest.length - 1]) &&
    /^\d+$/.test(rest[rest.length - 2]);

  if (isDetail) {
    return {
      type: "detail",
      categorySlug: rest[0] || "",
      subCategorySlug: rest[1] || "",
      goodsId: safeNumber(rest[2]),
      modelId: safeNumber(rest[3]),
    };
  }

  return {
    type: "listing",
    categorySlug: rest[0] || "",
    subCategorySlug: rest[1] || "",
  };
}

async function fetchWithRetry(url, { isBinary = false } = {}) {
  let lastError = null;

  for (let attempt = 1; attempt <= FETCH_RETRIES; attempt += 1) {
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

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url}`);
      }

      if (isBinary) {
        const buffer = Buffer.from(await response.arrayBuffer());
        clearTimeout(timer);
        return { response, body: buffer };
      }

      const textBody = await response.text();
      clearTimeout(timer);
      return { response, body: textBody };
    } catch (error) {
      clearTimeout(timer);
      lastError = error;

      if (attempt === FETCH_RETRIES) {
        break;
      }

      await delay(400 * 2 ** (attempt - 1));
    }
  }

  throw lastError;
}

function extractMetaDescription(html) {
  const patterns = [
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return stripTags(match[1]);
  }

  return "";
}

function extractJsonLdObjects(html) {
  const scripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const objects = [];

  for (const scriptMatch of scripts) {
    const raw = scriptMatch[1]?.trim();
    if (!raw) continue;
    try {
      objects.push(JSON.parse(raw));
    } catch {
      // Ignore malformed JSON-LD blocks.
    }
  }

  return objects;
}

function extractBreadcrumbData(jsonLdObjects) {
  const breadcrumb = jsonLdObjects.find(
    (entry) =>
      entry &&
      typeof entry === "object" &&
      !Array.isArray(entry) &&
      entry["@type"] === "BreadcrumbList",
  );

  if (!breadcrumb) return null;
  const items = Array.isArray(breadcrumb.itemListElement)
    ? breadcrumb.itemListElement
    : [];

  const second = items.find((item) => Number(item.position) === 2);
  const third = items.find((item) => Number(item.position) === 3);

  return {
    subCategoryName: stripTags(second?.name || ""),
    productName: stripTags(third?.name || ""),
  };
}

function extractProductJsonLd(jsonLdObjects) {
  return (
    jsonLdObjects.find(
      (entry) =>
        entry &&
        typeof entry === "object" &&
        !Array.isArray(entry) &&
        entry["@type"] === "Product",
    ) || null
  );
}

function extractScriptBodies(html) {
  return [...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/gi)].map(
    (match) => match[1] || "",
  );
}

function extractFlightPayloads(html) {
  const scriptBodies = extractScriptBodies(html);
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

  for (const scriptBody of scriptBodies) {
    if (!scriptBody.includes("self.__next_f.push")) continue;
    try {
      vm.runInNewContext(scriptBody, context, { timeout: 1_500 });
    } catch {
      // Ignore scripts that fail to evaluate in a sandbox.
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
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return payload.slice(start, i + 1);
      }
    }
  }

  return null;
}

function extractProductDataObject(html) {
  const payloads = extractFlightPayloads(html);
  for (const payload of payloads) {
    if (!payload.includes('"data":{"product":')) continue;
    const objectText = extractJsonObjectAfterKey(payload, '"data":');
    if (!objectText) continue;

    try {
      return JSON.parse(objectText);
    } catch {
      // Continue searching if JSON parsing fails for this payload.
    }
  }
  return null;
}

function parseProductNav(rootHtml) {
  const match = rootHtml.match(/var\s+productNav\s*=\s*(\[[\s\S]*?\]);/);
  if (!match?.[1]) return [];
  try {
    return JSON.parse(match[1]);
  } catch {
    return [];
  }
}

function buildCategoryMaps(productNav) {
  const childMap = new Map();
  const parentMap = new Map();

  for (const parent of productNav || []) {
    parentMap.set(parent.id, parent);
    for (const child of parent.children || []) {
      childMap.set(child.id, {
        parentId: parent.id,
        parentName: parent.catName,
        childName: child.catName,
      });
    }
  }

  return { childMap, parentMap };
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
  if (!cleaned) return null;
  if (/\$[0-9a-z_]+/i.test(cleaned)) return null;
  if (/^\{\{.*\}\}$/.test(cleaned)) return null;

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

async function crawlAllProductDetailUrls() {
  const queue = [ROOT_PRODUCT_URL];
  const queued = new Set(queue.map((item) => canonicalizeUrl(item)));
  const visitedListingUrls = new Set();
  const failedListingUrls = [];
  const detailUrls = new Set();

  while (queue.length > 0) {
    const batch = queue.splice(0, LISTING_CONCURRENCY);
    await Promise.all(
      batch.map(async (listingUrl) => {
        const canonicalListingUrl = canonicalizeUrl(listingUrl);
        if (!canonicalListingUrl || visitedListingUrls.has(canonicalListingUrl)) return;
        visitedListingUrls.add(canonicalListingUrl);

        try {
          const { body: html } = await fetchWithRetry(canonicalListingUrl);
          const links = [...html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)].map(
            (match) => match[1],
          );

          for (const rawHref of links) {
            if (!rawHref.includes("/product/")) continue;
            const absolute = toAbsoluteUrl(rawHref, canonicalListingUrl);
            if (!absolute) continue;

            const canonical = canonicalizeUrl(absolute);
            if (!canonical) continue;

            const parsed = parseProductPath(canonical);
            if (!parsed) continue;

            if (parsed.type === "detail") {
              detailUrls.add(canonical);
              continue;
            }

            if (!queued.has(canonical) && !visitedListingUrls.has(canonical)) {
              queued.add(canonical);
              queue.push(canonical);
            }
          }
        } catch (error) {
          failedListingUrls.push({
            url: canonicalListingUrl,
            error: String(error?.message || error),
          });
        }
      }),
    );

    console.log(
      `[crawl] listingVisited=${visitedListingUrls.size} queue=${queue.length} details=${detailUrls.size}`,
    );
  }

  return {
    detailUrls: Array.from(detailUrls).sort((a, b) => a.localeCompare(b)),
    visitedListingUrls: Array.from(visitedListingUrls),
    failedListingUrls,
  };
}

function buildProductRecord({
  detailUrl,
  parsedPath,
  data,
  metaDescription,
  breadcrumbData,
  productJsonLd,
  categoryMaps,
}) {
  const product = data?.product || {};
  const categoryMapping = categoryMaps.childMap.get(product.catId);

  const categoryName =
    categoryMapping?.parentName || titleFromSlug(parsedPath.categorySlug) || "Unknown";
  const subCategoryName =
    categoryMapping?.childName ||
    breadcrumbData?.subCategoryName ||
    titleFromSlug(parsedPath.subCategorySlug) ||
    "Unknown";

  const productCode =
    stripTags(product.productNo) ||
    stripTags(product.sku) ||
    breadcrumbData?.productName ||
    `MODEL-${parsedPath.modelId || "UNKNOWN"}`;
  const productFamily = stripTags(product.productName || "");

  const fullName =
    productFamily && !productCode.toLowerCase().includes(productFamily.toLowerCase())
      ? `${productCode} - ${productFamily}`
      : productCode;

  let extendsInfo = {};
  if (typeof product.extendsInfo === "string" && product.extendsInfo.trim()) {
    try {
      extendsInfo = JSON.parse(product.extendsInfo);
    } catch {
      extendsInfo = {};
    }
  }

  if (!Object.keys(extendsInfo).length && typeof data.extendsInfo === "string") {
    try {
      extendsInfo = JSON.parse(data.extendsInfo);
    } catch {
      extendsInfo = {};
    }
  }

  const productDescription = stripTags(product.productDesc || "");
  const summaryDescription = stripTags(metaDescription || productJsonLd?.description || "");

  const featureList = (data.featureList || [])
    .map((feature) => {
      const title = stripTags(feature.featName || "");
      const description = stripTags(feature.featDesc || "");
      const imageUrls = uniqueKeepOrder(
        splitCsvValues(feature.featImages).map(normalizeImageUrl).filter(Boolean),
      );

      if (!title && !description && imageUrls.length === 0) return null;

      return {
        title,
        description,
        imageUrls,
      };
    })
    .filter(Boolean);

  const descriptionParts = [];
  if (summaryDescription) descriptionParts.push(summaryDescription);
  if (productDescription && productDescription !== summaryDescription) {
    descriptionParts.push(productDescription);
  }
  for (const feature of featureList) {
    if (feature.title && feature.description) {
      descriptionParts.push(`${feature.title}: ${feature.description}`);
    } else if (feature.description) {
      descriptionParts.push(feature.description);
    }
  }

  const technicalSpecifications = (data.attributeDataList || [])
    .map((group) => {
      const groupName = stripTags(group.groupName || "") || "General";
      const items = (group.attributesList || [])
        .map((attribute) => {
          const name = stripTags(attribute.attrName || "");
          const value = stripTags(attribute.attrValue || "");
          const unit = stripTags(attribute.attrUnit || "");
          const valueWithUnit = [value, unit].filter(Boolean).join(" ").trim();
          if (!name && !valueWithUnit) return null;

          return {
            name,
            value,
            unit,
            valueWithUnit,
          };
        })
        .filter(Boolean);

      if (!items.length) return null;
      return {
        groupName,
        specifications: items,
      };
    })
    .filter(Boolean);

  const keyAttributes = (data.keyAttributeList || [])
    .map((entry) => {
      const name = stripTags(entry.attrName || "");
      const value = stripTags(entry.attrValue || "");
      const unit = stripTags(entry.attrUnit || "");
      const valueWithUnit = [value, unit].filter(Boolean).join(" ").trim();
      if (!name && !valueWithUnit) return null;

      return {
        name,
        value,
        unit,
        valueWithUnit,
      };
    })
    .filter(Boolean);

  const rawImageCandidates = [
    ...splitCsvValues(data?.images?.images),
    product.productThumb,
    ...(Array.isArray(productJsonLd?.image) ? productJsonLd.image : [productJsonLd?.image]),
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
    id: safeNumber(product.id, parsedPath.modelId),
    modelId: safeNumber(product.id, parsedPath.modelId),
    goodsId: safeNumber(product.goodsId, parsedPath.goodsId),
    reference: productCode || null,
    sku: stripTags(product.sku || "") || null,
    name: stripTags(breadcrumbData?.productName || productCode || fullName),
    fullName,
    productFamily: productFamily || null,
    sourceUrl: detailUrl,
    category: {
      id: safeNumber(categoryMapping?.parentId),
      name: categoryName,
      slug: slugify(parsedPath.categorySlug || categoryName),
    },
    subCategory: {
      id: safeNumber(product.catId),
      name: subCategoryName,
      slug: slugify(parsedPath.subCategorySlug || subCategoryName),
    },
    description: {
      summary: summaryDescription || null,
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
      hasDescription: Boolean(descriptionParts.length),
      hasImages: imageSourceUrls.length > 0,
    },
  };
}

async function runPool(items, concurrency, worker) {
  if (!items.length) return;
  const workerCount = Math.max(1, Math.min(concurrency, items.length));
  let nextIndex = 0;

  async function runWorker() {
    while (true) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      if (currentIndex >= items.length) return;
      await worker(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(Array.from({ length: workerCount }, runWorker));
}

async function scrapeAllProducts(detailUrls, categoryMaps) {
  const products = [];
  const failures = [];
  let processed = 0;

  await runPool(detailUrls, DETAIL_CONCURRENCY, async (detailUrl) => {
    try {
      const parsedPath = parseProductPath(detailUrl);
      if (!parsedPath || parsedPath.type !== "detail") {
        throw new Error("Invalid product detail URL format");
      }

      const { body: html } = await fetchWithRetry(detailUrl);
      const data = extractProductDataObject(html);
      if (!data?.product) {
        throw new Error("Missing data.product object in Next.js payload");
      }

      const metaDescription = extractMetaDescription(html);
      const jsonLdObjects = extractJsonLdObjects(html);
      const breadcrumbData = extractBreadcrumbData(jsonLdObjects);
      const productJsonLd = extractProductJsonLd(jsonLdObjects);

      const productRecord = buildProductRecord({
        detailUrl,
        parsedPath,
        data,
        metaDescription,
        breadcrumbData,
        productJsonLd,
        categoryMaps,
      });

      products.push(productRecord);
    } catch (error) {
      failures.push({
        url: detailUrl,
        error: String(error?.message || error),
      });
    } finally {
      processed += 1;
      if (processed % 25 === 0 || processed === detailUrls.length) {
        console.log(
          `[detail] processed=${processed}/${detailUrls.length} success=${products.length} failed=${failures.length}`,
        );
      }
    }
  });

  return { products, failures };
}

async function ensureDirectoryExists(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function writeBuffer(destinationPath, buffer) {
  await ensureDirectoryExists(path.dirname(destinationPath));
  await fs.writeFile(destinationPath, buffer);
}

async function downloadAllProductImages(products) {
  function removeXOssProcess(url) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.delete("x-oss-process");
      return parsed.toString();
    } catch {
      return null;
    }
  }

  async function downloadImageWithFallback(sourceUrl) {
    const candidates = uniqueKeepOrder([sourceUrl, removeXOssProcess(sourceUrl)]).filter(
      Boolean,
    );
    let lastError = null;

    for (const candidate of candidates) {
      try {
        const result = await fetchWithRetry(candidate, { isBinary: true });
        return {
          ...result,
          usedUrl: candidate,
        };
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error(`Failed to download image: ${sourceUrl}`);
  }

  const downloadCache = new Map();
  const tasks = [];
  let completed = 0;
  const failures = [];

  for (const product of products) {
    const categorySlug = slugify(product.category?.name || product.category?.slug || "unknown");
    const subCategorySlug = slugify(
      product.subCategory?.name || product.subCategory?.slug || "unknown",
    );
    const productIdentity = `${product.reference || product.name || "model"}-${product.modelId || "unknown"}`;
    const baseProductSlug = slugify(productIdentity);

    const productImageDir = path.join(
      OUTPUT_IMAGE_ROOT,
      categorySlug,
      subCategorySlug,
      baseProductSlug,
    );

    for (let index = 0; index < product.imageSourceUrls.length; index += 1) {
      const sourceUrl = product.imageSourceUrls[index];
      const imageBaseName = `${baseProductSlug}__img-${String(index + 1).padStart(2, "0")}`;
      tasks.push({
        product,
        productImageDir,
        imageBaseName,
        sourceUrl,
        index,
      });
    }
  }

  console.log(`[images] queued=${tasks.length} skip=${SKIP_IMAGES ? "yes" : "no"}`);
  if (SKIP_IMAGES || tasks.length === 0) {
    return {
      totalTasks: tasks.length,
      completedTasks: 0,
      failed: [],
    };
  }

  await runPool(tasks, IMAGE_CONCURRENCY, async (task) => {
    const { product, productImageDir, imageBaseName, sourceUrl, index } = task;
    let localPath = null;
    let filename = null;
    let contentType = null;
    let bytes = null;

    try {
      if (downloadCache.has(sourceUrl)) {
        const cached = downloadCache.get(sourceUrl);
        filename = `${imageBaseName}.${cached.ext}`;
        const absoluteDestination = path.join(productImageDir, filename);
        await ensureDirectoryExists(productImageDir);
        await fs.copyFile(cached.absolutePath, absoluteDestination);

        localPath = path
          .relative(ROOT_DIR, absoluteDestination)
          .split(path.sep)
          .join("/");
        contentType = cached.contentType;
        bytes = cached.bytes;
      } else {
        const { response, body, usedUrl } = await downloadImageWithFallback(sourceUrl);
        contentType = (response.headers.get("content-type") || "").split(";")[0].trim();
        const ext =
          extensionFromContentType(contentType) ||
          extensionFromUrl(usedUrl || sourceUrl) ||
          "jpg";

        filename = `${imageBaseName}.${ext}`;
        const absoluteDestination = path.join(productImageDir, filename);
        await writeBuffer(absoluteDestination, body);

        localPath = path
          .relative(ROOT_DIR, absoluteDestination)
          .split(path.sep)
          .join("/");
        bytes = body.length;

        downloadCache.set(sourceUrl, {
          absolutePath: absoluteDestination,
          ext,
          contentType,
          bytes,
        });
      }
    } catch (error) {
      failures.push({
        sourceUrl,
        productUrl: product.sourceUrl,
        error: String(error?.message || error),
      });
    } finally {
      completed += 1;
      if (completed % 50 === 0 || completed === tasks.length) {
        console.log(
          `[images] processed=${completed}/${tasks.length} failed=${failures.length}`,
        );
      }

      product.images[index] = {
        index: index + 1,
        sourceUrl,
        localPath,
        fileName: filename,
        contentType,
        bytes,
        downloaded: Boolean(localPath),
      };
    }
  });

  return {
    totalTasks: tasks.length,
    completedTasks: completed,
    failed: failures,
  };
}

function groupProductsByCategory(products) {
  const categoryMap = new Map();

  for (const product of products) {
    const categoryKey = `${product.category.slug}::${product.category.name}`;
    if (!categoryMap.has(categoryKey)) {
      categoryMap.set(categoryKey, {
        categoryId: product.category.id || null,
        categoryName: product.category.name,
        categorySlug: product.category.slug,
        subCategories: new Map(),
      });
    }
    const categoryEntry = categoryMap.get(categoryKey);
    const subCategoryKey = `${product.subCategory.slug}::${product.subCategory.name}`;
    if (!categoryEntry.subCategories.has(subCategoryKey)) {
      categoryEntry.subCategories.set(subCategoryKey, {
        subCategoryId: product.subCategory.id || null,
        subCategoryName: product.subCategory.name,
        subCategorySlug: product.subCategory.slug,
        products: [],
      });
    }
    categoryEntry.subCategories.get(subCategoryKey).products.push(product);
  }

  const categories = Array.from(categoryMap.values())
    .map((categoryEntry) => {
      const subCategories = Array.from(categoryEntry.subCategories.values())
        .map((subCategoryEntry) => {
          subCategoryEntry.products.sort((a, b) => {
            const aRef = a.reference || a.name || "";
            const bRef = b.reference || b.name || "";
            return aRef.localeCompare(bRef);
          });
          return {
            ...subCategoryEntry,
            totalProducts: subCategoryEntry.products.length,
          };
        })
        .sort((a, b) => a.subCategoryName.localeCompare(b.subCategoryName));

      return {
        categoryId: categoryEntry.categoryId,
        categoryName: categoryEntry.categoryName,
        categorySlug: categoryEntry.categorySlug,
        totalProducts: subCategories.reduce((acc, item) => acc + item.totalProducts, 0),
        subCategories,
      };
    })
    .sort((a, b) => a.categoryName.localeCompare(b.categoryName));

  return categories;
}

async function main() {
  const start = Date.now();
  console.log("[start] Scraping SANY official products...");
  console.log(
    `[config] maxProducts=${MAX_PRODUCTS || "all"} skipImages=${SKIP_IMAGES} cleanImages=${CLEAN_IMAGES}`,
  );

  await ensureDirectoryExists(path.dirname(OUTPUT_JSON_PATH));
  if (!SKIP_IMAGES && CLEAN_IMAGES) {
    await fs.rm(OUTPUT_IMAGE_ROOT, { recursive: true, force: true });
  }
  await ensureDirectoryExists(OUTPUT_IMAGE_ROOT);

  const { body: rootHtml } = await fetchWithRetry(ROOT_PRODUCT_URL);
  const productNav = parseProductNav(rootHtml);
  const categoryMaps = buildCategoryMaps(productNav);

  const crawlResult = await crawlAllProductDetailUrls();
  let detailUrls = crawlResult.detailUrls;
  if (MAX_PRODUCTS > 0) {
    detailUrls = detailUrls.slice(0, MAX_PRODUCTS);
  }

  console.log(`[crawl] detailUrls=${detailUrls.length}`);

  const { products, failures: productFailures } = await scrapeAllProducts(
    detailUrls,
    categoryMaps,
  );

  products.sort((a, b) => a.sourceUrl.localeCompare(b.sourceUrl));

  const imageDownloadResult = await downloadAllProductImages(products);

  const categories = groupProductsByCategory(products);
  const totalImagesReferenced = products.reduce(
    (acc, product) => acc + (product.imageSourceUrls?.length || 0),
    0,
  );
  const totalImagesDownloaded = products.reduce(
    (acc, product) =>
      acc +
      (product.images || []).filter((image) => image && image.downloaded).length,
    0,
  );

  const output = {
    source: ROOT_PRODUCT_URL,
    generatedAt: new Date().toISOString(),
    totals: {
      totalCategories: categories.length,
      totalProducts: products.length,
      totalProductUrlsDiscovered: crawlResult.detailUrls.length,
      totalListingPagesVisited: crawlResult.visitedListingUrls.length,
      totalImagesReferenced,
      totalImagesDownloaded,
    },
    categories,
  };

  const report = {
    generatedAt: output.generatedAt,
    durationSeconds: Number(((Date.now() - start) / 1000).toFixed(2)),
    configuration: {
      maxProducts: MAX_PRODUCTS || null,
      skipImages: SKIP_IMAGES,
      cleanImages: CLEAN_IMAGES,
      listingConcurrency: LISTING_CONCURRENCY,
      detailConcurrency: DETAIL_CONCURRENCY,
      imageConcurrency: IMAGE_CONCURRENCY,
      fetchRetries: FETCH_RETRIES,
      requestTimeoutMs: REQUEST_TIMEOUT_MS,
    },
    crawl: {
      listingPagesVisited: crawlResult.visitedListingUrls.length,
      detailUrlsDiscovered: crawlResult.detailUrls.length,
      failedListingUrls: crawlResult.failedListingUrls,
    },
    scrape: {
      successfulProducts: products.length,
      failedProducts: productFailures,
    },
    images: imageDownloadResult,
  };

  await fs.writeFile(OUTPUT_JSON_PATH, JSON.stringify(output, null, 2), "utf-8");
  await fs.writeFile(OUTPUT_REPORT_PATH, JSON.stringify(report, null, 2), "utf-8");

  console.log(
    `[done] products=${products.length} categories=${categories.length} imagesDownloaded=${totalImagesDownloaded}`,
  );
  console.log(`[done] json=${path.relative(ROOT_DIR, OUTPUT_JSON_PATH)}`);
  console.log(`[done] report=${path.relative(ROOT_DIR, OUTPUT_REPORT_PATH)}`);
}

module.exports = {
  fetchWithRetry,
  parseProductNav,
  buildCategoryMaps,
  scrapeAllProducts,
  downloadAllProductImages,
};

if (require.main === module) {
  main().catch((error) => {
    console.error("[fatal]", error);
    process.exitCode = 1;
  });
}
