import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands } from "@/data/brands";
import { toBrandSlug } from "@/lib/slug";
import { buildMetadata } from "@/lib/seo";
import {
  getFaboCategories,
  getFaboCategoryBySlug,
  getFaboSubcategoryBySlug,
  findProductInSubcategory,
  findVariantOnProduct,
  getProductsForSubcategory,
  getProductSlug,
} from "@/lib/faboCatalog";
import { getLocalizedText } from "@/lib/types";
import FaboVariantDetailPage from "../../../../FaboVariantDetailPage";

interface Props {
  params: Promise<{
    brand: string;
    category: string;
    subcategory: string;
    product: string;
    model: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: brandSlug, category: categorySlug, subcategory: subSlug, product: productSlug, model: modelSlug } =
    await params;

  const brand = brands.find((b) => toBrandSlug(b.name) === brandSlug.toLowerCase());
  const path = `/marque/${brandSlug}/${categorySlug}/${subSlug}/${productSlug}/${modelSlug}`;

  if (!brand || brand.name.toUpperCase() !== "FABO") {
    return buildMetadata({ title: "Modèle introuvable", description: "", path, noIndex: true });
  }

  const category = getFaboCategoryBySlug(categorySlug);
  const sub = category ? getFaboSubcategoryBySlug(categorySlug, subSlug) : null;
  const series = sub ? findProductInSubcategory(sub, productSlug) : null;
  const variant = series ? findVariantOnProduct(series, modelSlug) : null;

  if (!category || !sub || !series || !variant) {
    return buildMetadata({ title: "Modèle introuvable", description: "", path, noIndex: true });
  }

  const title = getLocalizedText(variant.title, "fr");
  const description = getLocalizedText(variant.description, "fr");

  return buildMetadata({
    title: `FABO – ${title}`,
    description,
    path,
  });
}

export default async function FaboVariantPage({ params }: Props) {
  const { brand: brandSlug, category: categorySlug, subcategory: subSlug, product: productSlug, model: modelSlug } =
    await params;

  const brand = brands.find((b) => toBrandSlug(b.name) === brandSlug.toLowerCase());
  if (!brand || brand.name.toUpperCase() !== "FABO") notFound();

  const category = getFaboCategoryBySlug(categorySlug);
  if (!category) notFound();

  const sub = getFaboSubcategoryBySlug(categorySlug, subSlug);
  if (!sub) notFound();

  const series = findProductInSubcategory(sub, productSlug);
  if (!series) notFound();

  const variant = findVariantOnProduct(series, modelSlug);
  if (!variant) notFound();

  return (
    <FaboVariantDetailPage
      brand={brand}
      category={category}
      subcategory={sub}
      series={series}
      variant={variant}
    />
  );
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const faboBrand = brands.find((b) => b.name.toUpperCase() === "FABO");
  if (!faboBrand) return [];

  const brandSlug = toBrandSlug(faboBrand.name);

  return getFaboCategories().flatMap((cat) =>
    cat.subcategories.flatMap((sub) =>
      getProductsForSubcategory(sub).flatMap((product) =>
        (product.variants ?? []).map((v) => ({
          brand: brandSlug,
          category: cat.slug,
          subcategory: sub.slug,
          product: getProductSlug(product.id),
          model: v.slug,
        }))
      )
    )
  );
}
