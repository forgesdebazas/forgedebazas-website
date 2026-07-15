#!/usr/bin/env node
"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const CATALOG_PATH = path.join(ROOT_DIR, "data", "sany_official_products.json");
const TRUCK_MIXERS_PATH = path.join(ROOT_DIR, "data", "sany_truck_mixers.json");

function stripTags(value) {
  return String(value || "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildCatalogProduct(scraped) {
  const techSpecs = (scraped.technicalSpecifications || []).map((group) => ({
    groupName: group.groupName,
    specifications: group.specifications.map((s) => ({
      name: s.name,
      value: s.value,
      unit: s.unit,
      valueWithUnit: s.valueWithUnit,
    })),
  }));

  const imageSourceUrls = scraped.allImageUrls || [];
  const mainImage = scraped.imageUrl || "";

  return {
    id: scraped.id,
    modelId: scraped.modelId,
    goodsId: scraped.goodsId,
    reference: scraped.reference,
    sku: null,
    name: scraped.name,
    fullName: scraped.name,
    productFamily: scraped.productFamily || "Truck Mixer",
    sourceUrl: scraped.sourceUrl,
    category: {
      id: 41,
      name: "Concrete Machinery",
      slug: "concrete-machinery",
    },
    subCategory: {
      id: 60,
      name: "Truck Mixer",
      slug: "truck-mixer",
    },
    description: {
      summary: scraped.description || `SANY ${scraped.reference} Truck Mixer`,
      productDescription: null,
      featureList: (scraped.features || []).map((f) => ({
        title: f.title,
        description: f.description,
        imageUrls: [],
      })),
      fullText: scraped.description || "",
    },
    technicalSpecifications: techSpecs,
    keyAttributes: [],
    documents: {
      brochureUrl: null,
      vrUrl: null,
      vrImageUrl: null,
    },
    imageSourceUrls,
    images: imageSourceUrls.map((url, i) => ({
      index: i + 1,
      sourceUrl: url,
      localPath: null,
      fileName: null,
      contentType: null,
      bytes: null,
      downloaded: false,
    })),
    verification: {
      hasSpecifications: techSpecs.length > 0,
      hasDescription: Boolean(scraped.description),
      hasImages: imageSourceUrls.length > 0,
    },
  };
}

async function main() {
  const catalog = JSON.parse(await fs.readFile(CATALOG_PATH, "utf-8"));
  const truckMixers = JSON.parse(await fs.readFile(TRUCK_MIXERS_PATH, "utf-8"));

  const concreteMachineryCategory = catalog.categories.find(
    (c) => c.categoryName === "Concrete Machinery",
  );

  if (!concreteMachineryCategory) {
    console.error("Could not find Concrete Machinery category");
    process.exit(1);
  }

  const existingTruckMixerSub = concreteMachineryCategory.subCategories.find(
    (s) => s.subCategorySlug === "truck-mixer",
  );

  if (existingTruckMixerSub) {
    console.log("Truck Mixer sub-category already exists, updating products...");
    existingTruckMixerSub.products = truckMixers.products.map(buildCatalogProduct);
    existingTruckMixerSub.totalProducts = existingTruckMixerSub.products.length;
  } else {
    const truckMixerSubCategory = {
      subCategoryId: 60,
      subCategoryName: "Truck Mixer",
      subCategorySlug: "truck-mixer",
      totalProducts: truckMixers.products.length,
      products: truckMixers.products.map(buildCatalogProduct),
    };

    concreteMachineryCategory.subCategories.push(truckMixerSubCategory);
    console.log("Added Truck Mixer sub-category to Concrete Machinery");
  }

  concreteMachineryCategory.totalProducts = concreteMachineryCategory.subCategories.reduce(
    (acc, sub) => acc + sub.totalProducts,
    0,
  );

  catalog.totals.totalProducts = catalog.categories.reduce(
    (acc, cat) => acc + cat.totalProducts,
    0,
  );

  await fs.writeFile(CATALOG_PATH, JSON.stringify(catalog, null, 2), "utf-8");
  console.log(
    `Updated catalog: Concrete Machinery now has ${concreteMachineryCategory.totalProducts} products (${truckMixers.products.length} truck mixers added)`,
  );
  console.log(`Total catalog products: ${catalog.totals.totalProducts}`);
}

main().catch((error) => {
  console.error("[fatal]", error);
  process.exitCode = 1;
});
