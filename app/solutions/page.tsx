import SolutionsClient from "./SolutionsClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "Découvrez nos solutions sur mesure pour l'industrie et le BTP au Maroc : manutention, rayonnage, levage, terrassement, mines, transport et énergie. Expertise et performance.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return <SolutionsClient />;
}
