"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { rayonnageElements, RayonnageElement } from "@/data/rayonnageElements";

const ATOX_LOGO =
  "https://atoxgrupo.com/wp-content/uploads/2024/08/112fe7426f6ffed9ad2cd4946a4235e4.png";

// Unique accent color per element
const ACCENT_COLORS = [
  { bg: "#dc2626", light: "#fef2f2", border: "#fecaca", text: "#dc2626" }, // red
  { bg: "#2563eb", light: "#eff6ff", border: "#bfdbfe", text: "#2563eb" }, // blue
  { bg: "#ea580c", light: "#fff7ed", border: "#fed7aa", text: "#ea580c" }, // orange
  { bg: "#16a34a", light: "#f0fdf4", border: "#bbf7d0", text: "#16a34a" }, // green
  { bg: "#7c3aed", light: "#faf5ff", border: "#e9d5ff", text: "#7c3aed" }, // purple
  { bg: "#0d9488", light: "#f0fdfa", border: "#99f6e4", text: "#0d9488" }, // teal
  { bg: "#d97706", light: "#fffbeb", border: "#fde68a", text: "#d97706" }, // amber
  { bg: "#0891b2", light: "#ecfeff", border: "#a5f3fc", text: "#0891b2" }, // cyan
  { bg: "#be185d", light: "#fdf2f8", border: "#fbcfe8", text: "#be185d" }, // pink
  { bg: "#4f46e5", light: "#eef2ff", border: "#c7d2fe", text: "#4f46e5" }, // indigo
  { bg: "#059669", light: "#ecfdf5", border: "#a7f3d0", text: "#059669" }, // emerald
  { bg: "#b45309", light: "#fef3c7", border: "#fde68a", text: "#b45309" }, // brown
];

function RayonnageCard({
  element,
  index,
}: {
  element: RayonnageElement;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const isReversed = index % 2 === 1;
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const isAtoxProduct =
    element.title.toLowerCase().includes("atox") ||
    element.description.toLowerCase().includes("atox");

  return (
    <ScrollAnimation delay={0.1}>
      <div
        id={element.id}
        className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white border border-gray-100"
      >
        <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>

          {/* ── IMAGE PANEL ── */}
          <div className="relative lg:w-[58%] overflow-hidden bg-gray-900" style={{ minHeight: "480px" }}>
            {/* Main image */}
            <Image
              src={element.images[activeImg]}
              alt={element.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/60 pointer-events-none" />

            {/* Number — big decorative */}
            {/* <div
              className="absolute top-5 left-5 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl font-black text-white text-xl"
              style={{ backgroundColor: color.bg }}
            >
              {String(index + 1).padStart(2, "0")}
            </div> */}

            {/* ATOX badge */}
            {isAtoxProduct && (
              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                <Image
                  src={ATOX_LOGO}
                  alt="ATOX"
                  width={88}
                  height={34}
                  className="object-contain h-8 w-auto"
                  unoptimized
                />
              </div>
            )}

            {/* Thumbnail strip */}
            <div className="absolute bottom-5 left-5 flex gap-2.5">
              {element.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden transition-all duration-200 ${
                    activeImg === i
                      ? "ring-3 ring-white scale-105 shadow-lg"
                      : "ring-2 ring-white/40 opacity-60 hover:opacity-90"
                  }`}
                  style={activeImg === i ? { outlineColor: color.bg } : {}}
                >
                  <Image src={img} alt={`Vue ${i + 1}`} fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          </div>

          {/* ── CONTENT PANEL ── */}
          <div
            className="lg:w-[42%] flex flex-col justify-between p-8 sm:p-10"
            style={{ borderLeft: isReversed ? "none" : `4px solid ${color.bg}`, borderRight: isReversed ? `4px solid ${color.bg}` : "none" }}
          >
            <div>
              {/* Category pill */}
              {/* <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: color.light, color: color.text, border: `1px solid ${color.border}` }}
              >
                Solution #{String(index + 1).padStart(2, "0")}
              </span> */}

              {/* Title */}
              <h3
                className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight"
                style={{ color: "#111827" }}
              >
                {element.title}
              </h3>

              {/* Divider */}
              <div className="w-12 h-1 rounded-full mb-5" style={{ backgroundColor: color.bg }} />

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {element.description}
              </p>

              {/* Advantages */}
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
                      <CheckCircle2
                        className="w-5 h-5 mt-0.5 shrink-0"
                        style={{ color: color.bg }}
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">{adv}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ATOX footer */}
            {isAtoxProduct && (
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                {/* <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                  Certifié
                </span> */}
                <Image
                  src={ATOX_LOGO}
                  alt="ATOX"
                  width={80}
                  height={30}
                  className="object-contain h-7 w-auto opacity-75"
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}

export default function RayonnageElementsSection() {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">

        {/* ── HEADER ── */}
        <ScrollAnimation>
          <div className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-5 py-2 rounded-full mb-5">
              <span className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626]">
                Nos solutions de rayonnage
              </span>
            </div>

            {/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
              Éléments des Systèmes{" "}
              <span className="text-[#dc2626]">d&apos;Entrepôt</span>
            </h2> */}

            <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Découvrez notre gamme complète de solutions de rayonnage et
              d&apos;équipements d&apos;entrepôt, conçus pour optimiser votre
              espace de stockage et améliorer votre productivité.
            </p>
          </div>
        </ScrollAnimation>

        {/* ── ELEMENT LIST ── */}
        <div className="space-y-8 sm:space-y-10">
          {rayonnageElements.map((element, index) => (
            <RayonnageCard key={element.id} element={element} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
