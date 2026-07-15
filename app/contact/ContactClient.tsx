"use client";

import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AGENCIES = [
  {
    city: "Casablanca",
    isHeadquarters: true,
    address: "Route Zenata, lotissement polygone, quartier Ain Sebaa lots 13,14 & 15, 20250",
    phone: "0522 669 850",
    phoneTel: "+212522669850",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.8245401419663!2d-7.508045024301253!3d33.63579117331658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cbbf8244a441%3A0x9fbe1a1ca06dc7d0!2sForges%20de%20Bazas!5e0!3m2!1sfr!2sma!4v1765657582549!5m2!1sfr!2sma",
  },
  {
    city: "Agadir",
    isHeadquarters: false,
    address: "LOT 55, TASSILA RP 40, DCHEIRA 80000",
    phone: "06 08 11 63 63",
    phoneTel: "+212608116363",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.638273553259!2d-9.5255628!3d30.3896279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3c93da94dfb97%3A0x8f085efc57a43dd8!2sForges%20de%20bazas!5e0!3m2!1sfr!2sma!4v1765673315728!5m2!1sfr!2sma",
  },
  {
    city: "Tanger",
    isHeadquarters: false,
    address: "LOT 211, ZI GZENAYA 90090",
    phone: "+212 608 116 262",
    phoneTel: "+212608116262",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.4908105758195!2d-5.896532924210833!3d35.714145972576745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b86267cf0f33b%3A0x8ade2914e3c74a1e!2sForges%20de%20bazas%20Tanger!5e0!3m2!1sfr!2sma!4v1765673503907!5m2!1sfr!2sma",
  },
];

export default function ContactClient() {
  const { t } = useLanguage();

  return (
    <div
      className="bg-gray-50 flex flex-col mt-16"
      style={{
        minHeight: "100dvh",
        paddingTop: "calc(var(--site-header-height, 140px) + 0.5rem)",
      }}
    >

      {/* ── COMPACT HEADER ── */}
      <div className="bg-gray-900 pb-6 pt-6 px-4 text-center shrink-0">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
          {t.contact.title}
        </h1>
        <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
          {t.contact.description}
        </p>
      </div>

      {/* ── CONTACT STRIP ── */}
      <div className="bg-[#dc2626] shrink-0">
        <div className="container mx-auto px-4 max-w-6xl py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white">
            <a
              href="tel:+212522669850"
              className="flex items-center gap-2 hover:text-white/80 transition-colors font-medium"
            >
              <Phone className="w-4 h-4 shrink-0" />
              +212 522 669 850
            </a>
            <a
              href="mailto:contact@forgesdebazas.com"
              className="flex items-center gap-2 hover:text-white/80 transition-colors font-medium"
            >
              <Mail className="w-4 h-4 shrink-0" />
              contact@forgesdebazas.com
            </a>
            <span className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 shrink-0" />
              {t.contact.schedule}
            </span>
          </div>
        </div>
      </div>

      {/* ── AGENCIES GRID ── */}
      <main className="container mx-auto px-4 py-6 max-w-6xl flex-1">
        <h2 className="text-lg font-extrabold text-gray-900 text-center mb-5">
          {t.contact.ourAgencies}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full">
          {AGENCIES.map((agency) => (
            <div
              key={agency.city}
              className="bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden flex flex-col"
            >
              {/* Map */}
              <div className="h-44 shrink-0">
                <iframe
                  title={`${agency.city} map`}
                  src={agency.map}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#dc2626] shrink-0" />
                  <h3 className="font-extrabold text-base text-gray-900">
                    {agency.city}
                  </h3>
                  {agency.isHeadquarters && (
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#dc2626] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      {t.contact.headquarters}
                    </span>
                  )}
                </div>

                <p className="text-gray-500 text-xs leading-relaxed">
                  {agency.address}
                </p>

                <div className="pt-2 border-t border-gray-100 space-y-1.5 mt-auto">
                  <a
                    href={`tel:${agency.phoneTel}`}
                    className="flex items-center gap-2 text-xs text-gray-700 hover:text-[#dc2626] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#dc2626]" />
                    {agency.phone}
                  </a>
                  <a
                    href="mailto:contact@forgesdebazas.com"
                    className="flex items-center gap-2 text-xs text-gray-700 hover:text-[#dc2626] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                    contact@forgesdebazas.com
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
