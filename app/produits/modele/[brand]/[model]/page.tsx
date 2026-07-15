import type { Metadata } from "next";
import { products } from "@/data/productsData";
import ModelProductsClient from "./ModelProductsClient";
import { buildMetadata } from "@/lib/seo";
import { isRoutableModelName } from "@/lib/modelRoutes";

interface ModelPageProps {
  params: Promise<{
    brand: string;
    model: string;
  }>;
}

export async function generateMetadata({
  params,
}: ModelPageProps): Promise<Metadata> {
  const { brand, model } = await params;
  const decodedBrand = decodeURIComponent(brand);
  const decodedModel = decodeURIComponent(model);

  const exists = products.some(
    (p) =>
      p.brand.toLowerCase() === decodedBrand.toLowerCase() &&
      (p.models || []).some((m) => isRoutableModelName(m) && m === decodedModel)
  );

  if (!exists) {
    return buildMetadata({
      title: "Modèle non trouvé",
      description: "Le modèle demandé est introuvable.",
      path: `/produits/modele/${brand}/${model}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${decodedBrand.toUpperCase()} ${decodedModel}`,
    description: `Découvrez les équipements ${decodedBrand.toUpperCase()} modèle ${decodedModel} disponibles chez Forges de Bazas.`,
    path: `/produits/modele/${brand}/${model}`,
  });
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { brand, model } = await params;
  return <ModelProductsClient brand={brand} model={model} />;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const seen = new Set<string>();
  const entries: { brand: string; model: string }[] = [];

  products.forEach((product) => {
    const brand = product.brand.toLowerCase();
    (product.models || []).forEach((model) => {
      if (!isRoutableModelName(model)) return;
      const key = `${brand}::${model}`;
      if (!seen.has(key)) {
        seen.add(key);
        entries.push({
          brand: encodeURIComponent(brand),
          model: encodeURIComponent(model),
        });
      }
    });
  });

  return entries;
}

