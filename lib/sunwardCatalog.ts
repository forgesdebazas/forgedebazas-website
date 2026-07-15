import catalogData from "@/data/sunward_mining_products.json";

export interface SunwardSpecification {
  name: string;
  value: string;
}

export interface SunwardSpecGroup {
  groupName: string;
  specs: SunwardSpecification[];
}

export interface SunwardProductDescription {
  summary: string;
  fullText: string;
}

export interface SunwardProductNode {
  id: number;
  reference: string;
  name: string;
  fullName: string;
  sourceUrl: string;
  brochureUrl?: string;
  category: {
    name: string;
    nameEn: string;
    nameEs: string;
    slug: string;
  };
  description: SunwardProductDescription;
  technicalSpecifications: SunwardSpecification[];
  specificationGroups?: SunwardSpecGroup[];
  features: string[];
  imageSourceUrls: string[];
  primaryImage: string | null;
}

export interface SunwardCategoryNode {
  categoryId: number;
  categoryName: string;
  categoryNameEn: string;
  categoryNameEs: string;
  categorySlug: string;
  sourceUrl: string;
  previewImage: string | null;
  totalProducts: number;
  products: SunwardProductNode[];
}

export interface SunwardCatalogData {
  source: string;
  generatedAt: string;
  totals: {
    totalCategories: number;
    totalProducts: number;
  };
  categories: SunwardCategoryNode[];
}

const parsedCatalog = catalogData as unknown as SunwardCatalogData;

export const getSunwardCatalog = (): SunwardCatalogData => parsedCatalog;

export const getSunwardCategories = (): SunwardCategoryNode[] =>
  parsedCatalog.categories;

export const getSunwardPrimaryProductImage = (
  product: SunwardProductNode
): string | null => {
  return product.primaryImage || product.imageSourceUrls[0] || null;
};

export const getSunwardCategoryPreviewImage = (
  category: SunwardCategoryNode
): string | null => {
  if (category.previewImage) return category.previewImage;
  for (const product of category.products) {
    const image = getSunwardPrimaryProductImage(product);
    if (image) return image;
  }
  return null;
};

export const getSunwardCategoryBySlug = (
  slug: string
): SunwardCategoryNode | undefined =>
  parsedCatalog.categories.find((c) => c.categorySlug === slug);

export const getSunwardProductBySlug = (
  categorySlug: string,
  productSlug: string
): SunwardProductNode | undefined => {
  const cat = getSunwardCategoryBySlug(categorySlug);
  if (!cat) return undefined;
  return cat.products.find(
    (p) => p.reference.toLowerCase() === productSlug.toLowerCase()
  );
};
