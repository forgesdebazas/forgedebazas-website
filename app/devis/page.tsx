import DevisClient from "./DevisClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Demande de devis",
  description:
    "Obtenez un devis personnalisé pour vos besoins industriels et BTP au Maroc. Manutention, levage, terrassement et construction. Distributeur SANY et TOYOTA.",
  path: "/devis",
});

export default function DevisPage() {
  return <DevisClient />;
}
