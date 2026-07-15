import ContactClient from "./ContactClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contactez Forges de Bazas pour vos besoins en équipements industriels et BTP au Maroc. Retrouvez les coordonnées de nos agences à Casablanca, Agadir et Tanger.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
