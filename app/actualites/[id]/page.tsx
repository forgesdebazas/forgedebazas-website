import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, getArticleJsonLd } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { GET_ACTUALITE_BY_SLUG_QUERY, GET_ALL_ACTUALITES_QUERY } from "@/sanity/lib/queries";
import { NewsArticle } from "../ActualitesClient";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

// Ensure the page fetches dynamic data for Sanity updates
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article: NewsArticle = await client.fetch(GET_ACTUALITE_BY_SLUG_QUERY, { slug: id });

  if (!article) {
    return buildMetadata({
      title: "Article non trouvé",
      description: "L'article demandé est introuvable.",
      path: `/actualites/${id}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/actualites/${id}`,
    image: article.image,
    openGraphType: "article",
    keywords: [article.category, "Actualités", "Forges de Bazas"],
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  
  const article: NewsArticle = await client.fetch(GET_ACTUALITE_BY_SLUG_QUERY, { slug: id });

  if (!article) {
    notFound();
  }

  // Fetch all to get related (in a real app, query specifically for related)
  const allArticles: NewsArticle[] = await client.fetch(GET_ALL_ACTUALITES_QUERY);
  const relatedArticles = allArticles.filter((a) => a.id !== id).slice(0, 2);

  return (
    <>
      <JsonLd
        id={`news-article-${article.id}`}
        data={getArticleJsonLd({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          image: article.image,
          author: article.author || "Forges de Bazas",
          date: article.date,
        })}
      />
      <ArticleClient article={article} relatedArticles={relatedArticles} />
    </>
  );
}
