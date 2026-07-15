#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const CATALOG_PATH = path.join(ROOT_DIR, "data", "sany_official_products.json");
const LISTING_URL =
  "https://www.sanyglobal.com/product/truck/off-highway_mining_truck/";
const API_URL =
  "https://api.sanyglobal.com/front/product/models?catId=87&sort=sale_nums&pageSize=200&page=1";

async function fetchOfficialRefs() {
  const response = await fetch(API_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "application/json,text/plain,*/*",
      Referer: LISTING_URL,
      "x-site-language": "en",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${API_URL}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload.rows)) {
    throw new Error("Unexpected SANY API response: rows[] missing");
  }

  return payload.rows
    .map((row) => String(row.productNo || "").trim())
    .filter(Boolean);
}

function cloneForTruckCategory(product) {
  return {
    ...product,
    category: {
      id: 55,
      name: "Truck",
      slug: "truck",
    },
    subCategory: {
      id: 87,
      name: "Off-highway Mining Truck",
      slug: "off-highway-mining-truck",
    },
  };
}

async function main() {
  const officialRefs = await fetchOfficialRefs();
  const catalog = JSON.parse(await fs.readFile(CATALOG_PATH, "utf8"));

  const miningCategory = catalog.categories.find(
    (category) => category.categoryId === 54,
  );
  const sourceSubCategory = miningCategory?.subCategories.find(
    (subCategory) => subCategory.subCategoryId === 87,
  );
  if (!sourceSubCategory) {
    throw new Error("Source subcategory 87 not found under Mining & Tunneling");
  }

  const byRef = new Map(
    sourceSubCategory.products.map((product) => [product.reference, product]),
  );
  const missingRefs = officialRefs.filter((reference) => !byRef.has(reference));
  if (missingRefs.length > 0) {
    throw new Error(
      `Official refs missing from local catalog: ${missingRefs.join(", ")}`,
    );
  }

  const truckCategory = catalog.categories.find(
    (category) => category.categoryId === 55,
  );
  if (!truckCategory) throw new Error("Truck category 55 not found");

  const products = officialRefs.map((reference) =>
    cloneForTruckCategory(byRef.get(reference)),
  );

  const truckSubCategory = {
    subCategoryId: 87,
    subCategoryName: "Off-highway Mining Truck",
    subCategorySlug: "off-highway-mining-truck",
    totalProducts: products.length,
    products,
  };

  const existingIndex = truckCategory.subCategories.findIndex(
    (subCategory) => subCategory.subCategoryId === 87,
  );
  if (existingIndex >= 0) {
    truckCategory.subCategories[existingIndex] = truckSubCategory;
  } else {
    truckCategory.subCategories.unshift(truckSubCategory);
  }

  truckCategory.totalProducts = truckCategory.subCategories.reduce(
    (sum, subCategory) => sum + (subCategory.products?.length || 0),
    0,
  );
  catalog.totals.totalProducts = catalog.categories.reduce(
    (sum, category) => sum + (category.totalProducts || 0),
    0,
  );

  await fs.writeFile(CATALOG_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
  console.log(
    `Added Truck / Off-highway Mining Truck with ${products.length} official SANY models.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
