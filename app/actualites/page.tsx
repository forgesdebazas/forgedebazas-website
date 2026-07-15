import ActualitesClient from "./ActualitesClient";
import { buildMetadata } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { GET_ALL_ACTUALITES_QUERY } from "@/sanity/lib/queries";

export const dynamic = 'force-dynamic'; // Enforce fresh data for actualites

export const metadata = buildMetadata({
  title: "Actualités",
  description:
    "Restez informé de nos dernières nouvelles, événements et innovations chez Forges de Bazas.",
  path: "/actualites",
});

export default async function ActualitesPage() {
  const articles = await client.fetch(GET_ALL_ACTUALITES_QUERY);
  
  return <ActualitesClient articles={articles} />;
}
