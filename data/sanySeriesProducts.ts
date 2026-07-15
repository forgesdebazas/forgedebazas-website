import type { Product } from "@/lib/types";
import {
  getSanyOrderedCategories,
  getSanyOrderedSubCategories,
  getSanyPrimaryProductImage,
  parseSanyNumber,
  SANY_PROMOTED_SUBCATEGORIES,
  type SanyCategoryNode,
  type SanyProductNode,
  type SanySubCategoryNode,
} from "@/lib/sanyCatalog";
import {
  SANY_SERIES_CONFIG,
  SANY_SUBCATEGORY_SPEC_OVERRIDES,
} from "@/data/sanySeriesConfig";
import { SANY_BEST_SELLER_REFS } from "@/data/sanyBestSellers";
import {
  translateSanyName,
  translateSanySpecValue,
  SANY_SUBCATEGORY_NAMES,
  SANY_SPEC_NAMES,
  SANY_RANGE_LABELS,
} from "@/data/sanyTranslations";

type Lang = "fr" | "en" | "es";
const LANGS: Lang[] = ["fr", "en", "es"];

const isNumericRange = (label: string): boolean =>
  /^[\d≥<>][\d\s.,\-≥<>kWmTtkW³º°/]*$/.test(label.trim());

/** Translate a range label per language; numeric/model-code labels pass through. */
function tRangeLabel(label: string, lang: Lang): string {
  if (isNumericRange(label)) return label;
  return translateSanyName(label, lang, SANY_RANGE_LABELS);
}

function tSubCategory(name: string, lang: Lang): string {
  return translateSanyName(name, lang, SANY_SUBCATEGORY_NAMES);
}

function tSpecName(name: string, lang: Lang): string {
  return translateSanyName(name, lang, SANY_SPEC_NAMES);
}

const SANY_BEST_SELLERS_LOWER = new Set(
  Array.from(SANY_BEST_SELLER_REFS).map((s) => s.toLowerCase()),
);

// Categories excluded from the SANY brand page; mirror that here.
const EXCLUDED_CATEGORY_IDS = new Set([123, 56, 93, 57, 58]);

// Map SANY catalog category id → site /produits filter category id.
const CATEGORY_TO_SITE_FILTER: Record<number, string> = {
  40: "excavation",          // Excavator
  300: "manutention",        // Wheel Loader (chargeuses)
  51: "grues",               // Crane
  52: "manutention-portuaire", // Port Machinery
  41: "pompes-beton",        // Concrete Machinery (pumps + trailer pumps)
  42: "beton",               // Truck Mixer
  53: "terrassement",        // Road Machinery
  54: "mines",               // Mining & Tunneling (roadheader, mining truck)
  55: "transport",           // Truck (dump truck, semi-trailer tractor)
};

// Override per subcategory when the parent mapping isn't ideal.
const SUBCATEGORY_TO_SITE_FILTER: Record<number, string> = {
  // Truck Mixer is in Concrete Machinery in some catalogs — force "beton"
  // (handled via parent mapping for cat 42 already)

  // Promoted subcategories that have their own site-filter mapping
  117: "transport",  // Semi-trailer Tractor
  118: "excavation", // Wheel Excavator
  76: "manutention-portuaire", // Customized Container Cranes
  147: "manutention-portuaire", // Electric Terminal Tractor
  77: "terrassement", // Motor Grader
  79: "terrassement", // Paver
  81: "terrassement", // Milling Machine
};

interface SeriesContext {
  catalogCategory: SanyCategoryNode;
  subCategory: SanySubCategoryNode;
  /** When `subCategory` is a promoted subcategory, this is the virtual category slug (e.g. "motor-grader"). */
  routeCategorySlug: string;
  /** Display label for the series (e.g. "1 - 15.5T", "RTG / RMG", or empty if no series split). */
  rangeLabel: string | null;
  /** Optional override for the subcategory display name (e.g. show "Small Excavator" instead of "Mini Excavator"). */
  subCategoryNameOverride?: string;
  /** Optional hard-coded preview spec rows (mirrors SANY's curated listing range). */
  previewSpecsOverride?: { name: string; valueWithUnit: string }[];
  /** Stable index used in the generated product id when there are multiple series per subcategory. */
  seriesIndex: number;
  products: SanyProductNode[];
}

const promotedSubIdToSlug = new Map(
  SANY_PROMOTED_SUBCATEGORIES.map((p) => [p.subCategoryId, p.slug] as const),
);

function pickSiteCategory(catId: number, subId: number): string {
  return (
    SUBCATEGORY_TO_SITE_FILTER[subId] ??
    CATEGORY_TO_SITE_FILTER[catId] ??
    "manutention"
  );
}

function buildSeriesContexts(): SeriesContext[] {
  const out: SeriesContext[] = [];
  for (const cat of getSanyOrderedCategories()) {
    if (EXCLUDED_CATEGORY_IDS.has(cat.categoryId)) continue;
    for (const sub of getSanyOrderedSubCategories(cat)) {
      const promotedSlug = promotedSubIdToSlug.get(sub.subCategoryId);
      const routeCategorySlug = promotedSlug ?? cat.categorySlug;

      const seriesDefs = SANY_SERIES_CONFIG[sub.subCategoryId];
      if (seriesDefs && seriesDefs.length > 0) {
        seriesDefs.forEach((def, idx) => {
          const refSet = new Set(def.productRefs);
          const seriesProducts = sub.products.filter((p) =>
            refSet.has(p.reference),
          );
          if (seriesProducts.length === 0) return;
          out.push({
            catalogCategory: cat,
            subCategory: sub,
            routeCategorySlug,
            rangeLabel: def.rangeLabel,
            subCategoryNameOverride: def.subCategoryNameOverride,
            previewSpecsOverride: def.previewSpecsOverride,
            seriesIndex: idx,
            products: seriesProducts,
          });
        });
      } else if (sub.products.length > 0) {
        out.push({
          catalogCategory: cat,
          subCategory: sub,
          routeCategorySlug,
          rangeLabel: null,
          seriesIndex: 0,
          products: sub.products,
        });
      }
    }
  }
  return out;
}

function seriesTitle(ctx: SeriesContext, lang: Lang): string {
  const base = tSubCategory(ctx.subCategoryNameOverride ?? ctx.subCategory.subCategoryName, lang);
  if (!ctx.rangeLabel) return base;
  const range = tRangeLabel(ctx.rangeLabel, lang);
  // Numeric range labels read better with the range first ("1 - 15.5T Mini Excavator");
  // text labels read better as a suffix ("Roller – Tandem Roller").
  return isNumericRange(ctx.rangeLabel) ? `${range} ${base}` : `${base} – ${range}`;
}

function seriesShortTitle(ctx: SeriesContext, lang: Lang): string {
  const base = tSubCategory(ctx.subCategoryNameOverride ?? ctx.subCategory.subCategoryName, lang);
  if (!ctx.rangeLabel) return base;
  return `${base} ${tRangeLabel(ctx.rangeLabel, lang)}`;
}

function seriesDescription(ctx: SeriesContext, lang: Lang): string {
  const count = ctx.products.length;
  const sub = tSubCategory(ctx.subCategoryNameOverride ?? ctx.subCategory.subCategoryName, lang);
  const range = ctx.rangeLabel ? ` (${tRangeLabel(ctx.rangeLabel, lang)})` : "";
  if (lang === "fr") {
    return `Série SANY ${sub}${range} — ${count} modèle${count > 1 ? "s" : ""} disponible${count > 1 ? "s" : ""}.`;
  }
  if (lang === "es") {
    return `Serie SANY ${sub}${range} — ${count} modelo${count > 1 ? "s" : ""} disponible${count > 1 ? "s" : ""}.`;
  }
  return `SANY ${sub}${range} series — ${count} model${count > 1 ? "s" : ""} available.`;
}

function seriesImage(ctx: SeriesContext): string {
  for (const p of ctx.products) {
    const img = getSanyPrimaryProductImage(p);
    if (img) return img;
  }
  return "/placeholder.svg";
}

/** Aggregate the most common key attribute names into ranges, similar to the brand page. */
function buildSpecsFromAttributes(ctx: SeriesContext): {
  fr: string;
  en: string;
  es: string;
}[] {
  // SANY's listing page sometimes publishes curated series ranges that don't
  // match the strict per-product min/max. Prefer the hard-coded override
  // (per-series first, then per-subcategory) so the SEO copy mirrors
  // sanyglobal.com.
  const override =
    ctx.previewSpecsOverride ??
    (ctx.rangeLabel === null
      ? SANY_SUBCATEGORY_SPEC_OVERRIDES[ctx.subCategory.subCategoryId]
      : undefined);
  if (override) {
    return override.map(({ name, valueWithUnit }) => {
      const out = { fr: "", en: "", es: "" } as Record<Lang, string>;
      for (const lang of LANGS) {
        out[lang] = `${tSpecName(name, lang)}: ${translateSanySpecValue(valueWithUnit, lang)}`;
      }
      return out;
    });
  }

  const attrMap = new Map<
    string,
    { numericValues: number[]; unit: string; fallback: string }
  >();
  const order: string[] = [];
  for (const p of ctx.products) {
    for (const a of p.keyAttributes) {
      if (!attrMap.has(a.name)) {
        attrMap.set(a.name, {
          numericValues: [],
          unit: a.unit,
          fallback: a.valueWithUnit,
        });
        order.push(a.name);
      }
      const num = parseSanyNumber(a.value);
      if (!Number.isNaN(num)) attrMap.get(a.name)!.numericValues.push(num);
    }
  }
  return order.slice(0, 3).map((name) => {
    const { numericValues, unit, fallback } = attrMap.get(name)!;
    let value = fallback;
    if (numericValues.length > 0) {
      const min = Math.min(...numericValues);
      const max = Math.max(...numericValues);
      value =
        min === max
          ? `${min}${unit ? " " + unit : ""}`
          : `${min} - ${max}${unit ? " " + unit : ""}`;
    }
    const out = { fr: "", en: "", es: "" } as Record<Lang, string>;
    for (const lang of LANGS) {
      out[lang] = `${tSpecName(name, lang)}: ${translateSanySpecValue(value, lang)}`;
    }
    return out;
  });
}

function ctxToProduct(ctx: SeriesContext): Product {
  const subSlug = ctx.subCategory.subCategorySlug;
  const id = `sany-series-${ctx.routeCategorySlug}-${subSlug}-${ctx.seriesIndex}`;
  const firstRef = ctx.products[0]?.reference ?? "";
  // Detail pages are statically generated under the real parent category slug
  // only (see app/marque/[brand]/[category]/[subcategory]/page.tsx —
  // dynamicParams=false). Promoted virtual category slugs would 404.
  const link =
    `/marque/sany/${ctx.catalogCategory.categorySlug}/${subSlug}` +
    (firstRef ? `?model=${encodeURIComponent(firstRef)}` : "");

  const specs = buildSpecsFromAttributes(ctx);
  const empty = { fr: "", en: "", es: "" };

  return {
    id,
    category: pickSiteCategory(
      ctx.catalogCategory.categoryId,
      ctx.subCategory.subCategoryId,
    ),
    brand: "SANY",
    title: {
      fr: seriesTitle(ctx, "fr"),
      en: seriesTitle(ctx, "en"),
      es: seriesTitle(ctx, "es"),
    },
    shortTitle: {
      fr: seriesShortTitle(ctx, "fr"),
      en: seriesShortTitle(ctx, "en"),
      es: seriesShortTitle(ctx, "es"),
    },
    description: {
      fr: seriesDescription(ctx, "fr"),
      en: seriesDescription(ctx, "en"),
      es: seriesDescription(ctx, "es"),
    },
    specs: {
      portee: specs[0] ?? empty,
      pression: specs[1] ?? empty,
      sortie: specs[2] ?? empty,
    },
    models: ctx.products.map((p) => p.reference),
    image: seriesImage(ctx),
    featured: ctx.products.some((p) =>
      // Series is featured if any of its references appears in the best-seller list
      SANY_BEST_SELLERS_LOWER.has(p.reference.toLowerCase()),
    ),
    available: true,
    sanySeriesLink: link,
  };
}

/** All SANY products from the brand catalog, one card per series. */
export const sanySeriesProducts: Product[] = buildSeriesContexts().map(
  ctxToProduct,
);

/** Subset of SANY series products whose models include any best-seller reference. */
export const sanyBestSellerSeriesProducts: Product[] = sanySeriesProducts.filter(
  (p) =>
    p.models.some((ref) => SANY_BEST_SELLERS_LOWER.has(ref.toLowerCase())),
);
