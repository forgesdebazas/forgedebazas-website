import SavClient from "./SavClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Service après-vente",
  description:
    "Service après-vente expert pour vos équipements industriels et BTP au Maroc. Maintenance, réparation, pièces d'origine et formation technique par Forges de Bazas.",
  path: "/sav",
});

export default function SavPage() {
  return <SavClient />;
}
