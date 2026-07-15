"use client";

import { Brand } from "@/data/brands";
import { FaboCategory, FaboSubcategory } from "@/lib/faboCatalog";
import { getLocalizedText } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Home, Phone, ArrowRight, FileText } from "lucide-react";
import { toBrandSlug } from "@/lib/slug";
import { getProductSlug } from "@/lib/faboCatalog";
import { translateFaboSpecText } from "@/lib/faboText";
import type { Product } from "@/lib/types";

interface Props {
  brand: Brand;
  category: FaboCategory;
  subcategory: FaboSubcategory;
  product: Product;
}

export default function FaboProductDetailPage({
  brand,
  category,
  subcategory,
  product,
}: Props) {
  const { language, t } = useLanguage();
  const brandSlug = toBrandSlug(brand.name);

  const n = (item: { nameFr: string; nameEn: string; nameEs: string }) =>
    language === "fr" ? item.nameFr : language === "es" ? item.nameEs : item.nameEn;

  const title = getLocalizedText(product.title, language);
  const description = getLocalizedText(product.description, language);

  const specPortee = getLocalizedText(product.specs.portee, language);
  const specPression = getLocalizedText(product.specs.pression, language);
  const specSortie = getLocalizedText(product.specs.sortie, language);

  const galleryImages = (product.models ?? [])
    .map((m) => m.match(/^Galerie image \d+:\s*(.+)$/i)?.[1]?.trim())
    .filter((src): src is string => Boolean(src));
  const documentLinks = (product.models ?? [])
    .map((m) => m.match(/^Document \d+:\s*(.+)$/i)?.[1]?.trim())
    .filter((href): href is string => Boolean(href));
  const sourceLinks = (product.models ?? [])
    .map((m) => m.match(/^Source officielle:\s*(.+)$/i)?.[1]?.trim())
    .filter((href): href is string => Boolean(href));

  const specRows = (product.models ?? [])
    .filter(
      (m) =>
        !/^Galerie image \d+:/i.test(m) &&
        !/^Document \d+:/i.test(m) &&
        !/^Source officielle:/i.test(m)
    )
    .map((m) => {
      const idx = m.indexOf(":");
      if (idx < 0) return { key: m, val: "" };
      return {
        key: translateFaboSpecText(m.slice(0, idx).trim(), language),
        val: translateFaboSpecText(m.slice(idx + 1).trim(), language),
      };
    })
    .filter((r) => r.key && r.val);

  const highlightSpecs = [specPortee, specPression, specSortie].filter(
    (s) =>
      s &&
      s.trim() !== "" &&
      !s.toLowerCase().includes("sur demande") &&
      !s.toLowerCase().includes("on request") &&
      !s.toLowerCase().includes("bajo pedido") &&
      !s.toLowerCase().includes("marque:") &&
      !s.toLowerCase().includes("brand:") &&
      !s.toLowerCase().includes("marca:")
  );

  const [activeImage, setActiveImage] = useState(0);
  const images = Array.from(new Set([product.image, ...galleryImages]));

  return (
    <main
      className="min-h-screen"
      style={{
        fontFamily: "Montserrat, sans-serif",
        paddingTop: "var(--site-header-height, 140px)",
      }}
    >

      {/* ═══ BREADCRUMB + HERO ══════════════════════════════════════════ */}
      <div>

        {/* Breadcrumb — pins below the fixed site header on scroll */}
        <div
          className="sticky z-30 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200"
          style={{ top: "var(--site-header-height, 140px)" }}
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
              <Link href="/" className="flex items-center gap-1 hover:text-red-600 transition-colors">
                <Home className="w-3.5 h-3.5" />
                {t.productsDetails.home}
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <Link href="/produits" className="hover:text-red-600 transition-colors">
                {t.productsDetails.products}
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <Link href={`/marque/${brandSlug}`} className="hover:text-red-600 transition-colors">
                FABO
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <Link href={`/marque/${brandSlug}/${category.slug}`} className="hover:text-red-600 transition-colors">
                {n(category)}
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <Link href={`/marque/${brandSlug}/${category.slug}/${subcategory.slug}`} className="hover:text-red-600 transition-colors">
                {n(subcategory)}
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <span className="text-red-600 font-semibold truncate max-w-40">{title}</span>
            </nav>
          </div>
        </div>

        {/* ─── Product hero ─── */}
        <div className="bg-gray-900 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-14">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">

              {/* Left — title */}
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-red-500 mb-2">
                  {n(subcategory)}
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">{title}</h1>
                {highlightSpecs.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {highlightSpecs.map((s, i) => (
                      <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right — quick CTA */}
              <div className="flex flex-col gap-2 shrink-0">
                <Link
                  href="/devis"
                  className="inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  {t.productsDetails.request_quote}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/marque/${brandSlug}/${category.slug}/${subcategory.slug}`}
                  className="inline-flex items-center justify-center gap-2 font-semibold text-xs px-6 py-2.5 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                >
                  ← {n(subcategory)}
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══════════════════════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── Left: image ── */}
            <div>
              <div className="rounded-2xl overflow-hidden mb-3 relative border border-gray-100 shadow-sm" style={{ background: "#f8f8f8", aspectRatio: "4/3" }}>
                <Image
                  src={images[activeImage]}
                  alt={title}
                  fill
                  unoptimized
                  className="object-contain p-6"
                />
                {/* Red corner accent */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600 rounded-br-2xl pointer-events-none" />
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className="rounded-xl overflow-hidden border-2 transition-all"
                      style={{
                        borderColor: activeImage === i ? "#dc2626" : "#e5e7eb",
                        width: 72, height: 54, background: "#f8f8f8", flexShrink: 0,
                      }}
                    >
                      <div className="relative w-full h-full">
                        <Image src={img} alt={`${title} ${i + 1}`} fill unoptimized className="object-contain p-1" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {(documentLinks.length > 0 || sourceLinks.length > 0) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {documentLinks.map((href, i) => (
                    <Link
                      key={`doc-${href}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:border-red-300 hover:text-red-600 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Document {i + 1}
                    </Link>
                  ))}
                  {/* {sourceLinks.slice(0, 1).map((href) => (
                    <Link
                      key={`source-${href}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:border-red-300 hover:text-red-600 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Source FABO
                    </Link>
                  ))} */}
                </div>
              )}
            </div>

            {/* ── Right: info ── */}
            <div>
              {/* Category pill */}
              {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 mb-4">
                <Tag className="w-3 h-3 text-red-600" />
                <span className="text-xs font-bold text-red-600 uppercase tracking-wide">{n(subcategory)}</span>
              </div> */}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">{title}</h1>

              {/* Highlight spec badges */}
              {highlightSpecs.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {highlightSpecs.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              {description && !description.includes("Équipement FABO") && !description.includes("FABO Equipment") && (
                <p className="text-sm text-gray-500 mb-6 leading-relaxed border-l-2 border-red-600 pl-4">
                  {description}
                </p>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/devis"
                  className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  {t.productsDetails.request_quote}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-7 py-3 rounded-lg border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {t.productsDetails.contact_us}
                </Link>
              </div>

              {/* FABO branding strip */}
              {/* <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-1 h-10 rounded-full bg-red-600 flex-shrink-0" />
                <div>
                  <p className="font-bold text-xs text-gray-900">FABO</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {language === "fr"
                      ? "22 ans d'expérience dans les équipements de concassage et de béton"
                      : language === "es"
                        ? "22 años de experiencia en equipos de trituración y hormigón"
                        : "22 years of experience in crushing and concrete equipment"}
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERIES VARIANTS (FTJ-85, FTJ-11-60, …) ════════════════════ */}
      {product.variants && product.variants.length > 0 && (
        <section className="py-14 bg-gray-50">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 rounded-full bg-red-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {language === "fr"
                  ? "Modèles de la série"
                  : language === "es"
                    ? "Modelos de la serie"
                    : "Models in this series"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {product.variants.map((v) => {
                const vTitle = getLocalizedText(v.title, language);
                const href = `/marque/${brandSlug}/${category.slug}/${subcategory.slug}/${getProductSlug(product.id)}/${v.slug}`;
                return (
                  <Link
                    key={v.slug}
                    href={href}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-gray-100 hover:border-red-200"
                  >
                    <div className="relative overflow-hidden bg-gray-50" style={{ height: 220 }}>
                      <Image
                        src={v.image}
                        alt={vTitle}
                        fill
                        unoptimized
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </div>
                    <div className="px-5 py-4 flex items-center justify-between gap-2 border-t border-gray-100">
                      <h3 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
                        {vTitle}
                      </h3>
                      <div className="shrink-0 w-8 h-8 rounded-full bg-red-50 group-hover:bg-red-600 flex items-center justify-center transition-colors duration-200">
                        <ArrowRight className="w-4 h-4 text-red-600 group-hover:text-white transition-colors duration-200" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* ── Comparison spec table ────────────────────────────── */}
            {(() => {
              const variants = product.variants ?? [];
              const variantsWithSpecs = variants.filter((v) => v.specs && v.specs.length > 0);
              if (variantsWithSpecs.length === 0) return null;

              const parse = (s: string) => {
                const idx = s.indexOf(":");
                return idx < 0
                  ? { key: translateFaboSpecText(s.trim(), language), val: "" }
                  : {
                      key: translateFaboSpecText(s.slice(0, idx).trim(), language),
                      val: translateFaboSpecText(s.slice(idx + 1).trim(), language),
                    };
              };

              const specKeys: string[] = [];
              variantsWithSpecs.forEach((v) => {
                v.specs.forEach((s) => {
                  const { key } = parse(s);
                  if (key && !specKeys.includes(key)) specKeys.push(key);
                });
              });

              const valueOf = (v: typeof variantsWithSpecs[number], key: string) => {
                for (const s of v.specs) {
                  const p = parse(s);
                  if (p.key === key) return p.val;
                }
                return "—";
              };

              const modelLabel = (v: typeof variantsWithSpecs[number]) => {
                const t = getLocalizedText(v.title, language);
                const m = t.match(/^([A-Z]+[-A-Z0-9]+)/i);
                return m ? m[1] : t.split(" ")[0];
              };

              return (
                <div className="mt-10">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-bold text-gray-900">
                      {language === "fr"
                        ? "Caractéristiques Techniques des Modèles"
                        : language === "es"
                          ? "Características Técnicas de los Modelos"
                          : "Models Technical Specifications"}
                    </h3>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white overflow-x-auto">
                    <table className="w-full text-sm border-collapse min-w-[640px]">
                      <thead>
                        <tr className="bg-gray-900">
                          <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-red-400 sticky left-0 bg-gray-900 z-10">
                            {language === "fr" ? "Paramètre" : language === "es" ? "Parámetro" : "Parameter"}
                          </th>
                          {variantsWithSpecs.map((v) => (
                            <th
                              key={v.slug}
                              className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-white/80 whitespace-nowrap"
                            >
                              {modelLabel(v)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {specKeys.map((key, i) => (
                          <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-4 py-3 font-semibold text-xs text-gray-700 border-b border-gray-100 sticky left-0 bg-inherit">
                              {key}
                            </td>
                            {variantsWithSpecs.map((v) => (
                              <td
                                key={v.slug}
                                className="px-4 py-3 text-xs font-bold text-gray-900 border-b border-gray-100 whitespace-nowrap"
                              >
                                {valueOf(v, key)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* ═══ TECHNICAL SPECS ═══════════════════════════════════════════ */}
      {specRows.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 rounded-full bg-red-600" />
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  {language === "fr" ? "Caractéristiques Techniques" : language === "es" ? "Características Técnicas" : "Technical Specifications"}
                </h2>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-red-400 w-[50%]">
                      {language === "fr" ? "Paramètre" : language === "es" ? "Parámetro" : "Parameter"}
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-white/50 w-[50%]">
                      {language === "fr" ? "Valeur" : language === "es" ? "Valor" : "Value"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-3 font-semibold text-xs text-gray-700 border-b border-gray-100">
                        {row.key}
                      </td>
                      <td className="px-5 py-3 text-xs font-bold text-gray-900 border-b border-gray-100">
                        {row.val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA STRIP ════════════════════════════════════════════════════ */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-red-600/10 to-transparent pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-1.5">FABO</p>
              <h2 className="text-xl font-bold text-white mb-1">{t.productsDetails.interested}</h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">{t.productsDetails.interested_desc}</p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg shadow-red-600/20"
              >
                {t.productsDetails.request_quote}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/marque/${brandSlug}/${category.slug}/${subcategory.slug}`}
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-lg border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                ← {n(subcategory)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
