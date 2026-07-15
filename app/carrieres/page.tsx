import type { Metadata } from "next";
import CarrieresClient from "./CarrieresClient";

export const metadata: Metadata = {
  title: "Carrières | Forges de Bazas",
  description:
    "Rejoignez l'équipe Forges de Bazas. Découvrez nos offres d'emploi en manutention, SAV, commerce et plus encore. Postulez en ligne.",
};

export default function CarrieresPage() {
  return <CarrieresClient />;
}
