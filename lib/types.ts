// Multilingual text type
export type LocalizedText = {
  fr: string;
  en: string;
  es: string;
};

// Helper type for specs
export interface LocalizedSpecs {
  portee: LocalizedText;
  pression: LocalizedText;
  sortie: LocalizedText;
}

// Legacy specs (for backwards compatibility during transition)
export interface ProductSpecs {
  portee: string;
  pression: string;
  sortie: string;
}

export interface ProductVariant {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  specs: string[];
}

export interface Product {
  id: string;
  category: string;
  brand: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  specs: LocalizedSpecs;
  numericSpecs?: {
    weight?: number; // in tons
    capacity?: number; // in m3/h or similar
    power?: number; // in kW
    reach?: number; // in m
  };
  models: string[];
  image: string;
  featured: boolean;
  available: boolean;
  /**
   * Optional direct link to the brand's series/subcategory page (e.g. SANY series).
   * When set, product cards on the listing page link here instead of /produits/{id}.
   */
  sanySeriesLink?: string;
  /** Optional child models. Present on "series" products like FTJ that have sub-models. */
  variants?: ProductVariant[];
}

export interface Category {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  parentId?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description?: LocalizedText;
}

export interface ProductsData {
  products: Product[];
  categories: Category[];
  brands: Brand[];
}

// Helper function to get localized text
export function getLocalizedText(
  text: LocalizedText | string,
  language: "fr" | "en" | "es"
): string {
  if (typeof text === "string") {
    return text;
  }
  return text[language] || text.fr;
}
