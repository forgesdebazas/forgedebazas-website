import PrivacyPolicyClient from "./PrivacyPolicyClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Forges de Bazas. Découvrez comment nous protégeons vos données personnelles.",
  path: "/politique-confidentialite",
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
