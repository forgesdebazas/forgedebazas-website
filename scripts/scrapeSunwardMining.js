#!/usr/bin/env node
"use strict";

const { chromium } = require("playwright");
const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_JSON_PATH = path.join(ROOT_DIR, "data", "sunward_mining_products.json");

const CATEGORIES = [
  {
    name: "Foreuse de surface hors du trou",
    nameEn: "Top Hammer Drilling Rig",
    nameEs: "Perforadora de superficie fuera del pozo",
    slug: "tophammer-drilling-rig",
    url: "https://www.sunwardmining.com/fr/tophammer-drilling-rig/",
  },
  {
    name: "Foreuse de surface fond du trou",
    nameEn: "DTH Drilling Rig",
    nameEs: "Perforadora de superficie fondo del pozo",
    slug: "dth-drilling-rig",
    url: "https://www.sunwardmining.com/fr/dth-drilling-rig2738/",
  },
  {
    name: "Foreuse de surface Rotative",
    nameEn: "Rotary Blasthole Drilling Rig",
    nameEs: "Perforadora de superficie Rotativa",
    slug: "rotary-blasthole-drilling-rig",
    url: "https://www.sunwardmining.com/fr/rotary-blasthole-drilling-rig/",
  },
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForContent(page) {
  const html = await page.content();
  if (html.includes("Just a moment")) {
    console.log("  Cloudflare challenge, waiting...");
    await delay(10000);
    await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  }
}

async function scrapeCategoryListing(page, categoryDef) {
  console.log(`\n--- Scraping category: ${categoryDef.name} ---`);
  await page.goto(categoryDef.url, { waitUntil: "networkidle", timeout: 60000 });
  await delay(3000);
  await waitForContent(page);

  const catImageUrl = await page.evaluate(() => {
    const banner = document.querySelector(".banner img, .page-header img, .hero img, header img");
    if (banner) return banner.dataset.src || banner.src || "";
    const firstProductImg = document.querySelector("figure img, .product_item img");
    if (firstProductImg) return firstProductImg.dataset.src || firstProductImg.src || "";
    return "";
  });

  const products = await page.evaluate((catUrl) => {
    const results = [];
    const seen = new Set();

    document.querySelectorAll("figure, .product_item, li").forEach((container) => {
      const titleLink = container.querySelector(".item_title a, h2 a, h3 a");
      const imgEl = container.querySelector("a img");
      if (!titleLink) return;

      const href = titleLink.href;
      const name = titleLink.textContent.trim();
      const image = imgEl ? (imgEl.dataset.src || imgEl.src || "") : "";

      if (href.includes("/fr/") && name && !seen.has(href) && href !== catUrl) {
        seen.add(href);
        const fullImage = image.startsWith("/") ? window.location.origin + image : image;
        results.push({ name, url: href, image: fullImage });
      }
    });

    return results;
  }, categoryDef.url);

  const filtered = products.filter(
    (p) => !p.url.includes("tinymce") && !p.url.includes("Dth-drilling-rig") && !p.url.includes("rotary-blasthole-drilling")
  );

  console.log(`Found ${filtered.length} products`);
  return { products: filtered, categoryImage: catImageUrl };
}

async function scrapeProductDetail(page, productUrl) {
  console.log(`  Detail: ${productUrl}`);
  try {
    await page.goto(productUrl, { waitUntil: "networkidle", timeout: 60000 });
    await delay(2000);
    await waitForContent(page);

    const detail = await page.evaluate(() => {
      const h1El = document.querySelector("h1");
      const title = h1El ? h1El.textContent.trim() : "";

      const rawDescParts = [];
      const proTopR = document.querySelector(".pro_top_r, .product-info");
      if (proTopR) {
        proTopR.querySelectorAll("p, div, span").forEach((el) => {
          const text = el.textContent.trim();
          if (text && text.length > 3) rawDescParts.push(text);
        });
      }
      const rawDesc =
        rawDescParts.join("\n") ||
        document.querySelector(".pro_con, .entry-content")?.textContent?.trim() ||
        "";

      // ── Grouped spec parsing from ul.npror ─────────────────────────────────
      // Structure: <ul class="npror"><li><p>Name</p><p>Value or empty</p></li>...
      // A <li> with an empty second <p> is a group header.
      const specGroups = [];
      let currentGroup = null;

      document.querySelectorAll("ul.npror li").forEach((li) => {
        const ps = li.querySelectorAll("p");
        if (ps.length < 1) return;
        const name = ps[0] ? ps[0].textContent.trim() : "";
        const value = ps[1] ? ps[1].textContent.trim() : "";

        if (!name) return;

        if (!value) {
          // Group header
          currentGroup = { groupName: name, specs: [] };
          specGroups.push(currentGroup);
        } else {
          // Spec row
          if (!currentGroup) {
            currentGroup = { groupName: "Général", specs: [] };
            specGroups.push(currentGroup);
          }
          currentGroup.specs.push({ name, value });
        }
      });

      // Flatten into legacy flat specs
      const specs = [];
      for (const g of specGroups) {
        for (const s of g.specs) {
          if (!specs.find((x) => x.name === s.name)) {
            specs.push(s);
          }
        }
      }
      // ────────────────────────────────────────────────────────────────────────

      const images = [];
      const seenImgs = new Set();
      document.querySelectorAll("img").forEach((img) => {
        let src = img.dataset.src || img.src || "";
        if (src.startsWith("/")) src = window.location.origin + src;
        if (
          src &&
          src.includes("/upload/image/") &&
          !seenImgs.has(src.split("?")[0]) &&
          !src.includes("x.png") &&
          !src.includes("title_pic")
        ) {
          seenImgs.add(src.split("?")[0]);
          images.push(src.split("?")[0]);
        }
      });

      const features = [];
      document.querySelectorAll(".pro_youshi li, .feature li, .advantage li").forEach((li) => {
        const text = li.textContent.trim();
        if (text) features.push(text);
      });

      return { title, rawDesc, specs, specGroups, images, features };
    });

    return detail;
  } catch (err) {
    console.error(`  Error: ${err.message}`);
    return null;
  }
}

function parseSpecsFromText(text) {
  const specs = [];
  const knownKeys = [
    "Méthode de forage",
    "Diamètre du trou rotatif",
    "Diamètre du trou DTH",
    "Diamètre du trou",
    "DTH Marteau", "Dth - marteau", "DTH - marteau", "Dth-marteau",
    "Marque de moteur",
    "Typeofpower", "Type de puissance",
    "Profondeur de trou maximum", "Profondeur de trou max",
    "Plage de forage",
    "Tie",
  ];

  const normalized = text.replace(/\n/g, " ");
  const keyPositions = [];

  for (const key of knownKeys) {
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    let m;
    while ((m = regex.exec(normalized)) !== null) {
      keyPositions.push({ key, pos: m.index, end: m.index + m[0].length });
    }
  }

  keyPositions.sort((a, b) => a.pos - b.pos);

  for (let i = 0; i < keyPositions.length; i++) {
    const kp = keyPositions[i];
    const nextPos = i + 1 < keyPositions.length ? keyPositions[i + 1].pos : normalized.length;
    let value = normalized.substring(kp.end, nextPos).trim();
    value = value.replace(/^[:\s]+/, "").trim();
    value = value.split(/[●]/)[0].trim();
    value = value.replace(/\s+/g, " ").trim();

    if (!value || value.length > 80) continue;

    let name = kp.key;
    if (name.toLowerCase().includes("typeofpower")) name = "Type de puissance";
    if (name.toLowerCase().includes("dth") && name.toLowerCase().includes("marteau")) name = "DTH Marteau";
    if (name === "Profondeur de trou maximum" || name === "Profondeur de trou max") name = "Profondeur max";

    const exists = specs.find((s) => s.name === name);
    if (!exists) {
      specs.push({ name, value });
    }
  }

  return specs;
}

function extractReference(name, url) {
  const urlMatch = url.match(/\/(swd[a-z0-9-]+)\/?$/i);
  if (urlMatch) {
    let ref = urlMatch[1].toUpperCase().replace(/-/g, "");
    if (ref.startsWith("SURFACE")) {
      const nameMatch = name.match(/(SWD[A-Z0-9]+)/i);
      if (nameMatch) return nameMatch[1].toUpperCase();
    }
    return ref;
  }
  const nameMatch = name.match(/(SWD[A-Z0-9]+)/i);
  if (nameMatch) return nameMatch[1].toUpperCase();
  return name.split(" ").slice(0, 2).join(" ");
}

async function main() {
  console.log("=== SUNWARD Mining Scraper v3 ===\n");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1920, height: 1080 },
    locale: "fr-FR",
  });

  const page = await context.newPage();

  console.log("Visiting homepage...");
  await page.goto("https://www.sunwardmining.com/fr/", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await delay(5000);
  console.log(`Homepage: ${await page.title()}`);

  const catalog = {
    source: "https://www.sunwardmining.com",
    generatedAt: new Date().toISOString(),
    totals: { totalCategories: 0, totalProducts: 0 },
    categories: [],
  };

  let globalProductId = 1;

  for (const categoryDef of CATEGORIES) {
    const { products: listings, categoryImage } = await scrapeCategoryListing(page, categoryDef);
    const products = [];

    for (const listing of listings) {
      const detail = await scrapeProductDetail(page, listing.url);
      if (!detail) continue;

      const reference = extractReference(listing.name, listing.url);
      const cleanName = detail.title || listing.name;
      const rawText = detail.rawDesc || listing.name;

      let specs = detail.specs.length > 0 ? detail.specs : parseSpecsFromText(rawText);
      const specGroups = detail.specGroups && detail.specGroups.length > 0
        ? detail.specGroups.filter((g) => g.specs.length > 0)
        : [];

      const productImages = [];
      if (listing.image && listing.image.includes("/upload/image/")) {
        productImages.push(listing.image.split("?")[0]);
      }
      for (const img of detail.images || []) {
        if (!productImages.includes(img)) {
          productImages.push(img);
        }
      }

      let descriptionText = rawText;
      const bulletIdx = descriptionText.indexOf("●");
      if (bulletIdx > 0) {
        descriptionText = descriptionText.substring(bulletIdx);
      }
      descriptionText = descriptionText.replace(/●/g, "• ").replace(/\s+/g, " ").trim();
      const summary = descriptionText.substring(0, 400);

      const productNode = {
        id: globalProductId++,
        reference,
        name: cleanName,
        fullName: `${reference} - ${categoryDef.name}`,
        sourceUrl: listing.url,
        category: {
          name: categoryDef.name,
          nameEn: categoryDef.nameEn,
          nameEs: categoryDef.nameEs,
          slug: categoryDef.slug,
        },
        description: {
          summary,
          fullText: rawText,
        },
        technicalSpecifications: specs,
        features: detail.features || [],
        imageSourceUrls: productImages,
        primaryImage: productImages[0] || null,
      };

      if (specGroups.length > 0) {
        productNode.specificationGroups = specGroups;
      }

      products.push(productNode);
    }

    catalog.categories.push({
      categoryId: catalog.categories.length + 1,
      categoryName: categoryDef.name,
      categoryNameEn: categoryDef.nameEn,
      categoryNameEs: categoryDef.nameEs,
      categorySlug: categoryDef.slug,
      sourceUrl: categoryDef.url,
      previewImage: categoryImage || (products[0]?.primaryImage || null),
      totalProducts: products.length,
      products,
    });

    catalog.totals.totalProducts += products.length;
    catalog.totals.totalCategories += 1;

    console.log(`Completed: ${categoryDef.name} - ${products.length} products`);
  }

  await browser.close();

  await fs.writeFile(OUTPUT_JSON_PATH, JSON.stringify(catalog, null, 2), "utf-8");
  console.log(`\n=== Saved to ${OUTPUT_JSON_PATH} ===`);
  console.log(`Categories: ${catalog.totals.totalCategories}`);
  console.log(`Products: ${catalog.totals.totalProducts}`);

  for (const cat of catalog.categories) {
    console.log(`\n${cat.categoryName} (${cat.totalProducts}):`);
    for (const p of cat.products) {
      const groupCount = p.specificationGroups ? p.specificationGroups.length : 0;
      console.log(
        `  ${p.reference}: ${p.technicalSpecifications.length} flat specs, ` +
        `${groupCount} groups, ${p.imageSourceUrls.length} imgs`
      );
      if (p.specificationGroups) {
        for (const g of p.specificationGroups) {
          console.log(`    [${g.groupName}] → ${g.specs.map((s) => s.name).join(", ")}`);
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
