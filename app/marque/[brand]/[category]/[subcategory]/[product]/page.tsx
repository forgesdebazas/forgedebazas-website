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
  getProductsForSubcategory,
  getProductSlug,
} from "@/lib/faboCatalog";
import { getLocalizedText } from "@/lib/types";
import FaboProductDetailPage from "../../../FaboProductDetailPage";

interface Props {
  params: Promise<{
    brand: string;
    category: string;
    subcategory: string;
    product: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: brandSlug, category: categorySlug, subcategory: subSlug, product: productSlug } =
    await params;

  const brand = brands.find((b) => toBrandSlug(b.name) === brandSlug.toLowerCase());
  if (!brand || brand.name.toUpperCase() !== "FABO") {
    return buildMetadata({
      title: "Produit introuvable",
      description: "",
      path: `/marque/${brandSlug}/${categorySlug}/${subSlug}/${productSlug}`,
      noIndex: true,
    });
  }

  const category = getFaboCategoryBySlug(categorySlug);
  const sub = category ? getFaboSubcategoryBySlug(categorySlug, subSlug) : null;
  const product = sub ? findProductInSubcategory(sub, productSlug) : null;

  if (!category || !sub || !product) {
    return buildMetadata({
      title: "Produit introuvable",
      description: "",
      path: `/marque/${brandSlug}/${categorySlug}/${subSlug}/${productSlug}`,
      noIndex: true,
    });
  }

  const title = getLocalizedText(product.title, "fr");
  const description = getLocalizedText(product.description, "fr");

  return buildMetadata({
    title: `FABO – ${title}`,
    description,
    path: `/marque/${brandSlug}/${categorySlug}/${subSlug}/${productSlug}`,
  });
}

export default async function FaboProductPage({ params }: Props) {
  const { brand: brandSlug, category: categorySlug, subcategory: subSlug, product: productSlug } =
    await params;

  const brand = brands.find((b) => toBrandSlug(b.name) === brandSlug.toLowerCase());
  if (!brand || brand.name.toUpperCase() !== "FABO") notFound();

  const category = getFaboCategoryBySlug(categorySlug);
  if (!category) notFound();

  const sub = getFaboSubcategoryBySlug(categorySlug, subSlug);
  if (!sub) notFound();

  const product = findProductInSubcategory(sub, productSlug);
  if (!product) notFound();

  return (
    <FaboProductDetailPage
      brand={brand}
      category={category}
      subcategory={sub}
      product={product}
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
      getProductsForSubcategory(sub).map((product) => ({
        brand: brandSlug,
        category: cat.slug,
        subcategory: sub.slug,
        product: getProductSlug(product.id),
      }))
    )
  );
}
