import { solutions } from "@/data/solutionsData";
import { notFound } from "next/navigation";
import SolutionDetailClient from "./SolutionDetailClient";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

interface SolutionDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: SolutionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions.find((s) => s.id === slug);

  if (!solution) {
    return buildMetadata({
      title: "Solution non trouvée",
      description: "La solution demandée est introuvable.",
      path: `/solutions/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: solution.title.fr,
    description: solution.description.fr,
    path: `/solutions/${slug}`,
    image: solution.image,
    openGraphType: "article",
  });
}

export default async function SolutionDetailPage({
  params,
}: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.id === slug);

  if (!solution) {
    notFound();
  }

  const currentIndex = solutions.findIndex((s) => s.id === slug);
  const previousSolutionRaw =
    currentIndex > 0 ? solutions[currentIndex - 1] : null;
  const nextSolutionRaw =
    currentIndex < solutions.length - 1 ? solutions[currentIndex + 1] : null;

  // Omit icon property as it's not serializable (Lucide component)
  const { icon: _sIcon, ...solutionData } = solution;
  const previousSolution = previousSolutionRaw
    ? (() => {
        const { icon: _pIcon, ...rest } = previousSolutionRaw;
        return rest;
      })()
    : null;
  const nextSolution = nextSolutionRaw
    ? (() => {
        const { icon: _nIcon, ...rest } = nextSolutionRaw;
        return rest;
      })()
    : null;

  return (
    <SolutionDetailClient
      solution={solutionData as any}
      previousSolution={previousSolution as any}
      nextSolution={nextSolution as any}
    />
  );
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.id }));
}
