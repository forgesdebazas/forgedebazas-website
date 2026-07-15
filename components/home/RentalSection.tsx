"use client";

import HeadSections from "../HeadSections";
import { useLanguage } from "@/contexts/LanguageContext";

export function RentalSection() {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <HeadSections
        title={t.rental.title}
        presentation={t.rental.subtitle}
        description={t.rental.description}
      />
    </section>
  );
}

export default RentalSection;
