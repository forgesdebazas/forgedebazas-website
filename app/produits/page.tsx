import ProductsClient from "./ProductsClient";
import { buildMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = buildMetadata({
  title: "Produits",
  description:
    "Explorez notre large gamme d'équipements industriels et BTP au Maroc. Manutention, levage, terrassement et construction. Distributeur SANY et TOYOTA.",
  path: "/produits",
});

export default function ProduitsPage() {
  return <Suspense fallback={null}><ProductsClient /></Suspense>;
}
