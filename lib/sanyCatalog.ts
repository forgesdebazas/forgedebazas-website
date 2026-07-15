import catalogData from "@/data/sany_official_products.json";

export interface SanyCatalogImage {
  index: number;
  sourceUrl: string;
  localPath: string | null;
  fileName: string | null;
  contentType: string | null;
  bytes: number | null;
  downloaded: boolean;
}

export interface SanySpecificationItem {
  name: string;
  value: string;
  unit: string;
  valueWithUnit: string;
}

export interface SanySpecificationGroup {
  groupName: string;
  specifications: SanySpecificationItem[];
}

export interface SanyFeature {
  title: string;
  description: string;
  imageUrls: string[];
}

export interface SanyProductDescription {
  summary: string;
  productDescription: string | null;
  featureList: SanyFeature[];
  fullText: string;
}

export interface SanyProductDocuments {
  brochureUrl: string;
  vrUrl: string | null;
  vrImageUrl: string | null;
}

export interface SanyProductNode {
  id: number;
  modelId: number;
  goodsId: number;
  reference: string;
  sku: string | null;
  name: string;
  fullName: string;
  productFamily: string | null;
  sourceUrl: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  subCategory: {
    id: number;
    name: string;
    slug: string;
  };
  description: SanyProductDescription;
  technicalSpecifications: SanySpecificationGroup[];
  keyAttributes: SanySpecificationItem[];
  documents: SanyProductDocuments;
  imageSourceUrls: string[];
  images: SanyCatalogImage[];
  verification: {
    hasSpecifications: boolean;
    hasDescription: boolean;
    hasImages: boolean;
  };
}

export interface SanySubCategoryNode {
  subCategoryId: number;
  subCategoryName: string;
  subCategorySlug: string;
  totalProducts: number;
  products: SanyProductNode[];
}

export interface SanyCategoryNode {
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  totalProducts: number;
  subCategories: SanySubCategoryNode[];
}

export interface SanyCatalogData {
  source: string;
  generatedAt: string;
  totals: {
    totalCategories: number;
    totalProducts: number;
    totalProductUrlsDiscovered: number;
    totalListingPagesVisited: number;
    totalImagesReferenced: number;
    totalImagesDownloaded: number;
  };
  categories: SanyCategoryNode[];
}

const parsedCatalog = catalogData as SanyCatalogData;

export const getSanyCatalog = (): SanyCatalogData => parsedCatalog;

export const getSanyCategories = (): SanyCategoryNode[] => parsedCatalog.categories;

export const toPublicImagePath = (localPath: string | null): string | null => {
  if (!localPath) return null;
  const normalized = localPath.replace(/\\/g, "/");
  if (normalized.startsWith("public/")) {
    return `/${normalized.slice("public/".length)}`;
  }
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
};

export const getSanyProductImages = (product: SanyProductNode): string[] => {
  return product.images
    .map((image) => toPublicImagePath(image.localPath) ?? image.sourceUrl)
    .filter(Boolean);
};

export const getSanyPrimaryProductImage = (
  product: SanyProductNode,
): string | null => {
  const image = getSanyProductImages(product)[0];
  return image ?? null;
};

export const SANY_TRUCK_MIXER_DISPLAY_REF = "SY412C-8S(V)";
export const SANY_BACKHOE_LOADER_DISPLAY_REF = "BHL95";
export const SANY_TELEHANDLER_DISPLAY_REFS: ReadonlySet<string> = new Set([
  "STH1440",
  "STH1840",
]);
export const SANY_MOTOR_GRADER_DISPLAY_REF = "STG230C-10S(Stage Ⅱ)";

export const SANY_HIDDEN_PRODUCT_REFS: ReadonlySet<string> = new Set([
  "SYG5320THB 45(SZ-TU)",
  "SW305K",
  "SW405K",
  "SY19E",
  "SY10U",
  "SY16C",
  "SY16C(Tier4 F & Stage Ⅴ)",
  "SY18C(Tier4 F & Stage Ⅴ)",
  "SY26U(Tier4 F & Stage Ⅴ)",
  "SY35U(Tier4 F & Stage Ⅴ)",
  "SY60C(Tier4 F & Stage Ⅴ)",
  "SY65W",
  "SY75C(Tier4 F & Stage Ⅴ)",
  "SY80U",
  "SY95C(Tier4 F & Stage Ⅴ)",
  "SY135C(StageIII)",
  "SY135C(Tier4 F & Stage Ⅴ)",
  "SY135F",
  "SY155U(Tier4 F & Stage Ⅴ)",
  "SY155H",
  "SY215HS",
  "SY235H",
  "SY265C LC",
  "SY285ME",
  "SY500H (Tier4 F & Stage Ⅴ)",
  "SY155W(Tier4 F & Stage Ⅴ)",
  "SY155W",
  "SS270V (Stage V)",
  "SS270V (Tier 4)",
  "ST230V (EU)",
  "ST230V (US)",
  "ST230V (NA)",
]);

export const isSanyHiddenProductRef = (ref: string): boolean =>
  SANY_HIDDEN_PRODUCT_REFS.has(ref);

/**
 * Parse a SANY spec value string into a number for range computation.
 *
 * Naive `parseFloat(v.replace(",", "."))` mis-handles three patterns seen in
 * the scraped catalog and produces nonsensical min/max ranges on the brand
 * page:
 *  • Thousands separator: "2,500" → 2.5 (should be 2500)
 *  • Multiplicative:      "2×180" → 2   (should be 360, two motors @ 180 kW)
 *  • Dual-mode slash:     "11/21" → 11  (use max — the high-mode rating)
 *
 * Returns NaN when no meaningful number can be extracted.
 */
export function parseSanyNumber(raw: string): number {
  if (raw == null) return NaN;
  // Strip parenthesised alt-unit info: "17,905(123)" → "17,905"
  const s = String(raw).replace(/\s*\([^)]*\)\s*/g, "").trim();
  if (!s) return NaN;

  // Multiplicative pattern (× or x between two numbers): return the product.
  const mult = s.match(/^(\d+(?:[.,]\d+)?)\s*[×x*]\s*(\d+(?:[.,]\d+)?)/);
  if (mult) {
    const a = parseFloat(mult[1].replace(",", "."));
    const b = parseFloat(mult[2].replace(",", "."));
    if (!isNaN(a) && !isNaN(b)) return a * b;
  }

  // Slash-separated dual-mode (e.g. "11/21" MPa low/high): use the maximum.
  if (/^\s*\d/.test(s) && s.includes("/")) {
    const parts = s.split("/").map((part) => {
      const m = part.match(/-?\d+(?:[.,]\d+)?/);
      return m ? parseFloat(m[0].replace(",", ".")) : NaN;
    }).filter((n) => !isNaN(n));
    if (parts.length > 0) return Math.max(...parts);
  }

  // Strip a single trailing unit / range trailer (e.g. "1250/(1200-1600)" already
  // handled above; "2,500" + unit comes here): pick the first numeric token.
  // Detect thousands separator: digit-comma-3digits pattern → strip commas.
  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) {
    return parseFloat(s.replace(/,/g, ""));
  }
  // European decimal comma (1-2 digits after comma, no other punctuation).
  if (/^\d+,\d{1,2}$/.test(s)) {
    return parseFloat(s.replace(",", "."));
  }

  // Fallback: take the first numeric run.
  const m = s.match(/-?\d+(?:[.,]\d+)?/);
  return m ? parseFloat(m[0].replace(",", ".")) : NaN;
}

// ── Ordered catalog helpers ────────────────────────────────────────────────

export const SANY_CATEGORY_ORDER = [
  40,  // Excavator
  300, // Wheel Loader
  51,  // Crane
  41,  // Concrete Machinery
  42,  // Truck Mixer (Camion Malaxeur)
  53,  // Road Machinery
  52,  // Port Machinery
  54,  // Mining & Tunneling
  55,  // Truck
  57,  // Piling Machinery
  93,  // Fire-fighting Equipment
  58,  // Petroleum Equipment
  56,  // Wind Turbine
  123, // Photovoltaics
];

export const SANY_SUBCATEGORY_ORDER = [
  44, 46, 47, 247, 61, 118,           // Excavator (247 = Mining Excavator)
  303, 304, 305, 301, 302,           // Wheel Loader
  63, 64, 65, 66, 67, 68,            // Crane
  59, 43, 60,                         // Concrete Machinery
  78, 77, 79, 81,                     // Road Machinery
  70, 71, 72, 73, 74, 75, 76, 147,   // Port Machinery
  82, 87,                              // Mining & Tunneling (87 = Off-highway Mining Truck, also mirrored under Truck)
  87, 86, 117,                         // Truck
  89,                                  // Piling Machinery
  90, 211,                             // Petroleum Equipment
  88,                                  // Wind Turbine
  191, 205,                            // Photovoltaics
];

const catOrder = (id: number) => {
  const i = SANY_CATEGORY_ORDER.indexOf(id);
  return i === -1 ? 999 : i;
};
const subOrder = (id: number) => {
  const i = SANY_SUBCATEGORY_ORDER.indexOf(id);
  return i === -1 ? 999 : i;
};

export const getSanyOrderedCategories = (): SanyCategoryNode[] =>
  [...parsedCatalog.categories].sort(
    (a, b) =>
      catOrder(a.categoryId) - catOrder(b.categoryId) ||
      a.categoryName.localeCompare(b.categoryName),
  );

export const getSanyOrderedSubCategories = (
  category: SanyCategoryNode,
): SanySubCategoryNode[] =>
  [...category.subCategories].sort(
    (a, b) =>
      subOrder(a.subCategoryId) - subOrder(b.subCategoryId) ||
      a.subCategoryName.localeCompare(b.subCategoryName),
  );

export const getSanyCategoryBySlug = (slug: string): SanyCategoryNode | null =>
  parsedCatalog.categories.find((c) => c.categorySlug === slug) ?? null;

export const getSanySubCategoryBySlug = (
  categorySlug: string,
  subSlug: string,
): SanySubCategoryNode | null => {
  const cat = getSanyCategoryBySlug(categorySlug);
  return cat?.subCategories.find((s) => s.subCategorySlug === subSlug) ?? null;
};

/** First available image URL from any product in a subCategory. */
export const getSanySeriesPreviewImage = (
  sub: SanySubCategoryNode,
): string | null => {
  for (const p of getSanyDisplayProductsForSubCategory(sub)) {
    const img = getSanyPrimaryProductImage(p);
    if (img) return img;
  }
  return null;
};

export const getSanyDisplayProductsForSubCategory = (
  sub: SanySubCategoryNode,
): SanyProductNode[] => {
  if (sub.subCategoryId === 60) {
    return sub.products.filter((p) => p.reference === SANY_TRUCK_MIXER_DISPLAY_REF);
  }
  if (sub.subCategoryId === 304) {
    return sub.products.filter((p) => p.reference === SANY_BACKHOE_LOADER_DISPLAY_REF);
  }
  if (sub.subCategoryId === 74) {
    return sub.products.filter((p) => SANY_TELEHANDLER_DISPLAY_REFS.has(p.reference));
  }
  if (sub.subCategoryId === 77) {
    return sub.products.filter((p) => p.reference === SANY_MOTOR_GRADER_DISPLAY_REF);
  }
  return sub.products.filter((p) => !isSanyHiddenProductRef(p.reference));
};

export const getSanyDisplayProductCountForSubCategory = (
  sub: SanySubCategoryNode,
): number => getSanyDisplayProductsForSubCategory(sub).length;

/** Manual image overrides keyed by category slug. */
const CATEGORY_IMAGE_OVERRIDES: Record<string, string> = {
  "wheel-loader":
    "https://sanyglobal-img.sany.com.cn/prod/20230615/wheel-loader_091223.jpg?x-oss-process=image/format,webp",
  "concrete-machinery":
    "https://sanyglobal-img.sany.com.cn/product/goods/20221031/39_010555.jpg?x-oss-process=image/format,webp",
  "camion-malaxeur":
    "https://sanyglobal-img.sany.com.cn/prod/20250724/SY412C-8S(Ⅴ)-OE_160931.jpg?x-oss-process=image/format,webp",
  "road-machinery":
    "/images/sany-official/road-machinery/roller/ssr100c-10-euro-1358/ssr100c-10-euro-1358__img-01.webp",
  "milling-machine":
    "https://sanyglobal-img.sany.com.cn/prod/20250425/SCM2000C-10R_155147.jpg?x-oss-process=image/format,webp",
};

export const getSanyCategoryImageOverride = (slug: string): string | null =>
  CATEGORY_IMAGE_OVERRIDES[slug] ?? null;

/** First available image URL from any product in a category. */
export const getSanyCategoryPreviewImage = (
  cat: SanyCategoryNode,
): string | null => {
  if (CATEGORY_IMAGE_OVERRIDES[cat.categorySlug]) {
    return CATEGORY_IMAGE_OVERRIDES[cat.categorySlug];
  }
  for (const sub of cat.subCategories) {
    const img = getSanySeriesPreviewImage(sub);
    if (img) return img;
  }
  return null;
};

// ── Promoted subcategories (shown as standalone categories on the brand page) ─

export interface SanyPromotedSubcategoryConfig {
  /** subCategoryId in catalog */
  subCategoryId: number;
  /** Parent categoryId where this subcategory actually lives */
  parentCategoryId: number;
  /** URL slug for the virtual category (also matches the existing subCategorySlug) */
  slug: string;
  /** English display name shown on the card / breadcrumb (matches subCategoryName) */
  displayName: string;
}

export const SANY_PROMOTED_SUBCATEGORIES: SanyPromotedSubcategoryConfig[] = [
  { subCategoryId: 59,  parentCategoryId: 41,  slug: "pompe-mobile",              displayName: "Pompe mobile" },
  { subCategoryId: 43,  parentCategoryId: 41,  slug: "pompe-stationnaire",        displayName: "Pompe stationnaire" },
  { subCategoryId: 118, parentCategoryId: 40,  slug: "wheel-excavator",            displayName: "Wheel Excavator" },
  { subCategoryId: 304, parentCategoryId: 300, slug: "chargeuse-pelleteuse",       displayName: "Backhoe Loader" },
  { subCategoryId: 305, parentCategoryId: 300, slug: "chargeuse-compacte-skid-steer", displayName: "Skid Steer Loader" },
  { subCategoryId: 67,  parentCategoryId: 51,  slug: "tower-crane",                displayName: "Tower Crane" },
  { subCategoryId: 68,  parentCategoryId: 51,  slug: "crawler-crane",              displayName: "Crawler Crane" },
  { subCategoryId: 74,  parentCategoryId: 52,  slug: "telehandler",                displayName: "Telehandler" },
  { subCategoryId: 77,  parentCategoryId: 53,  slug: "motor-grader",               displayName: "Motor Grader" },
  { subCategoryId: 79,  parentCategoryId: 53,  slug: "paver",                      displayName: "Paver" },
  { subCategoryId: 81,  parentCategoryId: 53,  slug: "milling-machine",            displayName: "Milling Machine" },
  { subCategoryId: 87,  parentCategoryId: 55,  slug: "off-highway-mining-truck",   displayName: "Off-highway Mining Truck" },
  { subCategoryId: 117, parentCategoryId: 55,  slug: "semi-trailer-tractor",       displayName: "Semi-trailer Tractor" },
];

/**
 * Subcategory IDs hidden from the SANY brand page entirely (no card, no
 * route from category navigation). Used to retire SKU groups we no longer
 * stock or promote.
 */
export const SANY_EXCLUDED_SUBCATEGORY_IDS: ReadonlySet<number> = new Set([
  66, // Truck-mounted Crane (Grue sur Camion)
  87, // Off-highway Mining Truck — split into Tombereaux articulés / rigide promoted series
]);

export const isSanyExcludedSubcategoryId = (subId: number): boolean =>
  SANY_EXCLUDED_SUBCATEGORY_IDS.has(subId);

/**
 * Some series within a subcategory deserve their own standalone tile on the
 * SANY brand page (e.g. Off-highway Mining Trucks split into Articulated vs
 * Rigid). The series is identified by its rangeLabel inside SANY_SERIES_CONFIG.
 */
export interface SanyPromotedSeriesConfig {
  /** URL slug for the virtual category */
  slug: string;
  /** Display name on the brand-page card */
  displayName: string;
  /** Parent category id (real SANY catalog id) used to resolve breadcrumbs */
  parentCategoryId: number;
  /** Subcategory id whose series we are promoting */
  subCategoryId: number;
  /** Range label that matches an entry in SANY_SERIES_CONFIG[subCategoryId] */
  rangeLabel: string;
}

export const SANY_PROMOTED_SERIES: SanyPromotedSeriesConfig[] = [
  {
    slug: "tombereaux-articules",
    displayName: "Tombereaux articulés",
    parentCategoryId: 54,
    subCategoryId: 87,
    rangeLabel: "40 - 70T",
  },
  {
    slug: "tombereaux-rigide",
    displayName: "Tombereaux rigide",
    parentCategoryId: 54,
    subCategoryId: 87,
    rangeLabel: "90 - 220T",
  },
];

export const getSanyPromotedSeriesBySlug = (
  slug: string,
): SanyPromotedSeriesConfig | null =>
  SANY_PROMOTED_SERIES.find((p) => p.slug === slug) ?? null;

const PROMOTED_SUB_IDS = new Set(
  SANY_PROMOTED_SUBCATEGORIES.map((p) => p.subCategoryId),
);

export const isSanyPromotedSubcategoryId = (subId: number): boolean =>
  PROMOTED_SUB_IDS.has(subId);

export const getSanyPromotedConfigBySlug = (
  slug: string,
): SanyPromotedSubcategoryConfig | null =>
  SANY_PROMOTED_SUBCATEGORIES.find((p) => p.slug === slug) ?? null;

/** Lookup the actual subcategory node for a promoted config. */
export const getSanyPromotedSubcategory = (
  config: SanyPromotedSubcategoryConfig,
): { parent: SanyCategoryNode; sub: SanySubCategoryNode } | null => {
  const parent = parsedCatalog.categories.find(
    (c) => c.categoryId === config.parentCategoryId,
  );
  if (!parent) return null;
  const sub = parent.subCategories.find(
    (s) => s.subCategoryId === config.subCategoryId,
  );
  if (!sub) return null;
  return { parent, sub };
};
