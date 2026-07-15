#!/usr/bin/env node
"use strict";
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("node:fs/promises");
const path = require("node:path");
const {
  fetchWithRetry,
  parseProductNav,
  buildCategoryMaps,
  scrapeAllProducts,
  downloadAllProductImages,
} = require("./scrapeSanyOfficialProducts");

const ROOT_DIR = path.resolve(__dirname, "..");
const CATALOG_PATH = path.join(ROOT_DIR, "data", "sany_official_products.json");
const ROOT_PRODUCT_URL = "https://www.sanyglobal.com/product/";
const MODEL_IDS = [1688, 1684, 1685, 1687, 1686];
const DETAIL_URLS = MODEL_IDS.map(
  (id) => `https://www.sanyglobal.com/product/excavator/mining-excavators/247/${id}/`,
);
const MINING_REFS = new Set(["SY1050H", "SY1250H", "SY2000H", "SY3000E", "SY4000H"]);

function updateTotals(catalog) {
  for (const category of catalog.categories) {
    for (const sub of category.subCategories) sub.totalProducts = sub.products.length;
    category.totalProducts = category.subCategories.reduce((sum, sub) => sum + sub.totalProducts, 0);
  }
  const allProducts = catalog.categories.flatMap((cat) =>
    cat.subCategories.flatMap((sub) => sub.products),
  );
  catalog.totals.totalCategories = catalog.categories.length;
  catalog.totals.totalProducts = allProducts.length;
  catalog.totals.totalImagesReferenced = allProducts.reduce(
    (sum, product) => sum + (product.imageSourceUrls?.length || 0),
    0,
  );
  catalog.totals.totalImagesDownloaded = allProducts.reduce(
    (sum, product) =>
      sum + (product.images || []).filter((image) => image?.downloaded).length,
    0,
  );
}

async function main() {
  const [{ body: rootHtml }, catalogRaw] = await Promise.all([
    fetchWithRetry(ROOT_PRODUCT_URL),
    fs.readFile(CATALOG_PATH, "utf8"),
  ]);
  const categoryMaps = buildCategoryMaps(parseProductNav(rootHtml));
  const { products, failures } = await scrapeAllProducts(DETAIL_URLS, categoryMaps);
  if (failures.length || products.length !== DETAIL_URLS.length) {
    throw new Error(`Scrape incomplete: ${products.length}/${DETAIL_URLS.length}; ${JSON.stringify(failures)}`);
  }
  await downloadAllProductImages(products);

  const catalog = JSON.parse(catalogRaw);
  const excavator = catalog.categories.find((category) => category.categoryId === 40);
  if (!excavator) throw new Error("Excavator category (40) not found");

  // Move any formerly classified model (notably SY1250H) instead of duplicating it.
  for (const category of catalog.categories) {
    for (const sub of category.subCategories) {
      sub.products = sub.products.filter((product) => !MINING_REFS.has(product.reference));
    }
  }

  let mining = excavator.subCategories.find((sub) => sub.subCategoryId === 247);
  if (!mining) {
    mining = {
      subCategoryId: 247,
      subCategoryName: "Mining Excavator",
      subCategorySlug: "mining-excavators",
      totalProducts: 0,
      products: [],
    };
    excavator.subCategories.push(mining);
  }

  mining.products = products.map((product) => ({
    ...product,
    category: { id: 40, name: "Excavator", slug: "excavator" },
    subCategory: { id: 247, name: "Mining Excavator", slug: "mining-excavators" },
  }));
  mining.totalProducts = mining.products.length;
  updateTotals(catalog);
  await fs.writeFile(CATALOG_PATH, JSON.stringify(catalog, null, 2), "utf8");
  console.log(`Added ${mining.products.length} SANY mining excavators: ${mining.products.map((p) => p.reference).join(", ")}`);
}

main().catch((error) => {
  console.error("[fatal]", error);
  process.exitCode = 1;
});
