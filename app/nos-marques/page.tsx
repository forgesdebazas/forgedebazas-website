import NosMarquesClient from "./NosMarquesClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nos marques",
  description:
    "Découvrez les marques partenaires de Forges de Bazas. Leaders mondiaux et spécialistes reconnus pour des équipements fiables et performants.",
  path: "/nos-marques",
});

export default function NosMarquesPage() {
  return <NosMarquesClient />;
}
