import CookiesClient from "./CookiesClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Politique des cookies",
  description:
    "Politique des cookies de Forges de Bazas. Découvrez comment nous utilisons les cookies sur notre site web.",
  path: "/cookies",
});

export default function CookiesPage() {
  return <CookiesClient />;
}

