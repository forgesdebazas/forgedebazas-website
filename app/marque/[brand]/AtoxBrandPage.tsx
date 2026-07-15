"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronDown, ChevronUp, FileText, Phone, ArrowRight, ChevronRight } from "lucide-react";
import { rayonnageElements } from "@/data/rayonnageElements";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import type { Brand } from "@/data/brands";
import { useLanguage } from "@/contexts/LanguageContext";
import CtaSection from "@/components/ui/CtaSection";

const ATOX_LOGO =
  "https://atoxgrupo.com/wp-content/uploads/2024/08/112fe7426f6ffed9ad2cd4946a4235e4.png";

const ACCENT_COLORS = [
  { bg: "#dc2626", light: "#fef2f2", border: "#fecaca", text: "#dc2626" },
  { bg: "#2563eb", light: "#eff6ff", border: "#bfdbfe", text: "#2563eb" },
  { bg: "#ea580c", light: "#fff7ed", border: "#fed7aa", text: "#ea580c" },
  { bg: "#16a34a", light: "#f0fdf4", border: "#bbf7d0", text: "#16a34a" },
];

// Only ATOX-branded elements
// const rayonnageElements = rayonnageElements.filter(
//   (el) =>
//     el.title.toLowerCase().includes("atox") ||
//     el.description.toLowerCase().includes("atox")
// );

function AtoxCard({
  element,
  index,
}: {
  element: (typeof rayonnageElements)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const isReversed = index % 2 === 1;
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <ScrollAnimation delay={0.1}>
      <div
        id={element.id}
        className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white border border-gray-100"
      >
        <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
          {/* IMAGE PANEL */}
          <div className="relative lg:w-[58%] overflow-hidden bg-gray-900" style={{ minHeight: "420px" }}>
            <Image
              src={element.images[activeImg]}
              alt={element.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/60 pointer-events-none" />

            {/* ATOX badge */}
            {/* <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
              <Image
                src={ATOX_LOGO}
                alt="ATOX"
                width={88}
                height={34}
                className="object-contain h-8 w-auto"
                unoptimized
              />
            </div> */}

            {/* Thumbnail strip */}
            <div className="absolute bottom-5 left-5 flex gap-2.5">
              {element.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden transition-all duration-200 ${
                    activeImg === i
                      ? "ring-2 ring-white scale-105 shadow-lg"
                      : "ring-2 ring-white/40 opacity-60 hover:opacity-90"
                  }`}
                >
                  <Image src={img} alt={`Vue ${i + 1}`} fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT PANEL */}
          <div
            className="lg:w-[42%] flex flex-col justify-between p-8 sm:p-10"
            style={{
              borderLeft: isReversed ? "none" : `4px solid ${color.bg}`,
              borderRight: isReversed ? `4px solid ${color.bg}` : "none",
            }}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight text-gray-900 uppercase">
                {element.title}
              </h3>
              <div className="w-12 h-1 rounded-full mb-5" style={{ backgroundColor: color.bg }} />
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {element.description}
              </p>

              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95"
                style={{
                  backgroundColor: expanded ? color.bg : color.light,
                  color: expanded ? "#fff" : color.text,
                  border: `1.5px solid ${color.border}`,
                }}
              >
                {expanded ? "Masquer les avantages" : "Voir les avantages"}
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {expanded && (
                <ul className="mt-5 space-y-3 pt-5 border-t border-gray-100">
                  {element.advantages.map((adv, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: color.bg }} />
                      <span className="text-sm text-gray-700 leading-relaxed">{adv}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ATOX footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              {/* <Image
                src={ATOX_LOGO}
                alt="ATOX"
                width={80}
                height={30}
                className="object-contain h-7 w-auto opacity-75"
                unoptimized
              /> */}
              <Link
                href="/devis"
                className="inline-flex items-center gap-1.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm"
              >
                Demande Devis
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}

interface AtoxBrandPageProps {
  brand: Brand;
}

export default function AtoxBrandPage({ brand }: AtoxBrandPageProps) {
  const { t } = useLanguage();

  return (
    <main
      className="min-h-screen bg-gray-50"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      {/* Breadcrumb — pins below the fixed site header on scroll */}
      <div
        className="sticky z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100"
        style={{ top: "var(--site-header-height, 140px)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-2.5">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0 text-gray-300" />
            <Link href="/solutions" className="hover:text-gray-700 transition-colors">Solutions</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0 text-gray-300" />
            <span className="text-[#dc2626] font-semibold">ATOX</span>
          </nav>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-white border-b border-gray-100">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8 lg:py-10">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">

      {/* Left: info */}
      <div className="space-y-4 text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
          ATOX
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
          Découvrez nos solutions de rayonnage et d&apos;automatisation
          d&apos;entrepôt ATOX : Radio Shuttle, convoyeurs à rouleaux et
          bien plus. Fiabilité et performance garanties.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Link
            href="/devis"
            className="group inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm text-xs sm:text-sm w-full sm:w-auto"
          >
            <FileText className="w-3.5 h-3.5 flex-shrink-0" />
            {t.productsDetails.request_quote}
            <ArrowRight className="w-3 h-3 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-xl border border-gray-200 transition-all duration-200 text-xs sm:text-sm w-full sm:w-auto"
          >
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            {t.productsDetails.contact_us}
          </Link>
        </div>
      </div>

      {/* Right: ATOX Logo */}
      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-[300px] h-[110px] sm:h-[140px] md:h-[160px]">
          <Image
            src={ATOX_LOGO}
            alt="ATOX"
            fill
            className="object-contain"
            unoptimized
            priority
          />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ── ATOX ELEMENTS ── */}
      <section className="py-14 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <ScrollAnimation>
            <div className="text-center mb-12">
              {/* <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-5 py-2 rounded-full mb-4">
                <span className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626]">
                  Solutions ATOX
                </span>
              </div> */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                Nos équipements ATOX
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Systèmes de stockage automatisés et convoyeurs à rouleaux ATOX —
                fiabilité, performance et optimisation de vos entrepôts.
              </p>
            </div>
          </ScrollAnimation>

          <div className="space-y-8 sm:space-y-10">
            {rayonnageElements.map((element, index) => (
              <AtoxCard key={element.id} element={element} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title={t.productsDetails.interested}
        description={t.productsDetails.interested_desc}
        primaryAction={{ href: "/devis", label: t.productsDetails.request_quote }}
        secondaryAction={{ href: "/contact", label: t.productsDetails.contact_us }}
      />

      {/* Back link */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/solutions/rayonnage"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#dc2626] font-semibold transition-colors group"
          >
            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Retour aux solutions rayonnage
          </Link>
        </div>
      </section>
    </main>
  );
}
