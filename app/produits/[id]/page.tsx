import { products } from "@/data/productsData";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, getProductJsonLd } from "@/lib/seo";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return buildMetadata({
      title: "Produit non trouvé",
      description: "Le produit demandé est introuvable.",
      path: `/produits/${id}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: product.title.fr,
    description: product.description.fr,
    path: `/produits/${id}`,
    image: product.image,
    openGraphType: "product",
    keywords: [
      product.brand,
      product.category,
      "Équipements industriels",
      "BTP Maroc",
    ],
  });
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <JsonLd
        id={`product-${product.id}`}
        data={getProductJsonLd({
          id: product.id,
          name: product.title.fr,
          description: product.description.fr,
          image: product.image,
          brand: product.brand,
        })}
      />
      <ProductDetailClient params={params} />
    </>
  );
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}
