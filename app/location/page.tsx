import LocationClient from "./LocationClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Location",
  description:
    "Solutions de location flexible pour vos équipements industriels et BTP au Maroc. Chariots élévateurs, nacelles, engins de chantier et groupes électrogènes.",
  path: "/location",
});

export default function LocationPage() {
  return <LocationClient />;
}
