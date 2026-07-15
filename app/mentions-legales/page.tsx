import LegalNoticeClient from "./LegalNoticeClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales de Forges de Bazas. Informations légales concernant l'entreprise et les conditions d'utilisation du site.",
  path: "/mentions-legales",
});

export default function LegalNoticePage() {
  return <LegalNoticeClient />;
}

