import AboutClient from "./AboutClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "À propos",
  description:
    "Découvrez l'histoire de Forges de Bazas, nos valeurs d'excellence et de partenariat, ainsi que notre expertise dans la vente et le service d'équipements industriels au Maroc.",
  path: "/apropos",
});

export default function AProposPage() {
  return <AboutClient />;
}
