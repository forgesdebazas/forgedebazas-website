import { Product } from "@/lib/types";
import sunwardCatalog from "./sunward_mining_products.json";

interface RawSunwardSpec {
  name?: string;
  value?: string;
}

interface RawSunwardProduct {
  reference?: string;
  name?: string;
  description?: { summary?: string };
  technicalSpecifications?: RawSunwardSpec[];
  imageSourceUrls?: string[];
  primaryImage?: string | null;
}

interface RawSunwardCategory {
  categoryName: string;
  categoryNameEn?: string;
  categoryNameEs?: string;
  categorySlug: string;
  products: RawSunwardProduct[];
}

interface RawSunwardCatalog {
  categories: RawSunwardCategory[];
}

const slugify = (input: string): string =>
  input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildProduct = (
  cat: RawSunwardCategory,
  raw: RawSunwardProduct
): Product | null => {
  const ref = raw.reference?.trim();
  if (!ref) return null;

  const id = `sunward-${slugify(ref)}`;
  const summary = raw.description?.summary?.trim() || raw.name?.trim() || ref;
  const image = raw.primaryImage || raw.imageSourceUrls?.[0] || "";
  const specs = (raw.technicalSpecifications || []).slice(0, 3);

  const specEntry = (idx: number) => {
    const s = specs[idx];
    if (!s?.name) return { fr: "", en: "", es: "" };
    const text = `${s.name}: ${s.value ?? ""}`.trim();
    return { fr: text, en: text, es: text };
  };

  return {
    id,
    category: cat.categorySlug,
    brand: "SUNWARD",
    title: {
      fr: `SUNWARD ${ref}`,
      en: `SUNWARD ${ref}`,
      es: `SUNWARD ${ref}`,
    },
    shortTitle: {
      fr: ref,
      en: ref,
      es: ref,
    },
    description: {
      fr: summary,
      en: summary,
      es: summary,
    },
    specs: {
      portee: specEntry(0),
      pression: specEntry(1),
      sortie: specEntry(2),
    },
    models: [ref],
    image,
    featured: false,
    available: true,
  };
};

const catalog = sunwardCatalog as unknown as RawSunwardCatalog;

export const sunwardScrapedProducts: Product[] = catalog.categories.flatMap(
  (cat) =>
    (cat.products || [])
      .map((p) => buildProduct(cat, p))
      .filter((p): p is Product => p !== null)
);

export const sunwardScrapedCategories = catalog.categories.map((cat) => ({
  id: cat.categorySlug,
  name: {
    fr: cat.categoryName,
    en: cat.categoryNameEn || cat.categoryName,
    es: cat.categoryNameEs || cat.categoryName,
  },
  description: {
    fr: cat.categoryName,
    en: cat.categoryNameEn || cat.categoryName,
    es: cat.categoryNameEs || cat.categoryName,
  },
  parentId: "foreuses-mining" as const,
}));
