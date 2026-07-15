"use client";

import { useState, useRef, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronDown, ChevronUp, FileText, Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  translateSanyName,
  translateSanyFeature,
  translateSanySpecValue,
  SANY_SPEC_GROUP_NAMES,
  SANY_SPEC_NAMES,
} from "@/data/sanyTranslations";
import { SANY_BEST_SELLER_REFS } from "@/data/sanyBestSellers";

export interface ProcessedModel {
  reference: string;
  name: string;
  image: string | null;
  isRemoteImage: boolean;
  keyAttributes: { name: string; valueWithUnit: string }[];
  technicalSpecifications: {
    groupName: string;
    specifications: { name: string; valueWithUnit: string }[];
  }[];
  featureList: { title: string; description: string }[];
  summary: string;
  brochureUrl: string;
  sourceUrl: string;
}

interface SanyModelSelectorProps {
  seriesName: string;
  models: ProcessedModel[];
}

export default function SanyModelSelector({
  seriesName,
  models,
}: SanyModelSelectorProps) {
  const { t, language } = useLanguage();
  const s = t.sany;
  const tGroup = (name: string) =>
    translateSanyName(name, language, SANY_SPEC_GROUP_NAMES);
  const tSpec = (name: string) =>
    translateSanyName(name, language, SANY_SPEC_NAMES);
  const tValue = (value: string) => translateSanySpecValue(value, language);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialIdx = useMemo(() => {
    const ref = searchParams.get("model");
    if (!ref) return 0;
    const idx = models.findIndex((m) => m.reference === ref);
    return idx >= 0 ? idx : 0;
  }, [searchParams, models]);

  const [selectedIdx, setSelectedIdx] = useState(initialIdx);
  const [activeTab, setActiveTab] = useState<"features" | "parameters">(
    () =>
      (models[initialIdx]?.technicalSpecifications.length ?? 0) > 0
        ? "parameters"
        : "features",
  );
  const [openSpecGroups, setOpenSpecGroups] = useState<Set<string>>(
    new Set([models[initialIdx]?.technicalSpecifications[0]?.groupName ?? ""]),
  );
  const [openFeatures, setOpenFeatures] = useState<Set<string>>(new Set());
  const contentRef = useRef<HTMLDivElement>(null);

  const model = models[selectedIdx] ?? models[0];
  if (!model) return null;

  const isBestSeller = SANY_BEST_SELLER_REFS.has(model.reference);

  const hasFeatures = model.featureList.length > 0;
  const hasSpecs = model.technicalSpecifications.length > 0;

  const effectiveTab =
    activeTab === "features" && !hasFeatures
      ? "parameters"
      : activeTab === "parameters" && !hasSpecs
        ? "features"
        : activeTab;

  const allSpecsOpen =
    hasSpecs &&
    model.technicalSpecifications.every((g) => openSpecGroups.has(g.groupName));
  const allFeaturesOpen =
    hasFeatures && model.featureList.every((f) => openFeatures.has(f.title));

  const toggleSpecGroup = (name: string) => {
    setOpenSpecGroups((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const toggleFeature = (title: string) => {
    setOpenFeatures((prev) => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  };

  const toggleAllSpecs = () => {
    if (allSpecsOpen) {
      setOpenSpecGroups(new Set());
    } else {
      setOpenSpecGroups(
        new Set(model.technicalSpecifications.map((g) => g.groupName)),
      );
    }
  };

  const toggleAllFeatures = () => {
    if (allFeaturesOpen) {
      setOpenFeatures(new Set());
    } else {
      setOpenFeatures(new Set(model.featureList.map((f) => f.title)));
    }
  };

  const handleModelChange = (i: number) => {
    const m = models[i];
    setSelectedIdx(i);
    setActiveTab(
      (m.technicalSpecifications.length ?? 0) > 0 ? "parameters" : "features",
    );
    setOpenSpecGroups(
      new Set([m.technicalSpecifications[0]?.groupName ?? ""]),
    );
    setOpenFeatures(new Set());
    const params = new URLSearchParams(window.location.search);
    if (i === 0) params.delete("model");
    else params.set("model", m.reference);
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  };

  const handleViewAllSpecs = () => {
    setActiveTab("parameters");
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div>
      {/* ── Hero: Info left | Image right ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white">
        {/* Left — info (shows below image on mobile) */}
        <div className="order-2 md:order-1 flex flex-col gap-6 p-8 border-r border-gray-100 md:overflow-y-auto md:max-h-[520px]">
          <div>
            <div className="flex items-start gap-3 flex-wrap">
              <p className="text-5xl font-bold text-red-600 leading-none tracking-tight">
                {model.reference}
              </p>
              {isBestSeller && (
                <span className="inline-flex items-center gap-1 self-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-400 text-amber-900 shadow-sm shrink-0">
                  ★ {s.bestSeller}
                </span>
              )}
            </div>
            <p className="text-base font-medium text-gray-500 mt-1">{seriesName}</p>
          </div>

          {/* Key attributes table */}
          {model.keyAttributes.length > 0 && (
            <table className="w-full text-sm">
              <tbody>
                {model.keyAttributes.map((attr) => (
                  <tr key={attr.name} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 pr-4 text-gray-500 w-[58%]">{tSpec(attr.name)}</td>
                    <td className="py-2 text-right font-semibold text-gray-900 text-sm">
                      {tValue(attr.valueWithUnit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* View All Specs → */}
          {hasSpecs && (
            <button
              onClick={handleViewAllSpecs}
              className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 bg-transparent border-none cursor-pointer p-0 hover:gap-2.5 transition-all duration-200 w-fit"
            >
              {s.viewAllSpecs} →
            </button>
          )}

          {/* CTAs */}
          <div className="flex gap-2 flex-wrap">
            <a
              href="/devis"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors no-underline"
            >
              {t.productsDetails.request_quote}
            </a>
            {model.brochureUrl && (
              <a
                href={model.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-600 text-sm font-semibold rounded-lg transition-all no-underline"
              >
                <FileText size={14} />
                {s.brochurePdf}
              </a>
            )}
          </div>
        </div>

        {/* Right — image (shows above info on mobile) */}
        <div className="order-1 md:order-2 relative bg-gray-50 min-h-[260px] md:min-h-[520px] flex items-center justify-center overflow-hidden">
          {model.image ? (
            <Image
              src={model.image}
              alt={model.reference}
              fill
              unoptimized={model.isRemoteImage}
              className="object-contain"
              style={{ padding: "2rem" }}
            />
          ) : (
            <span className="text-xs tracking-widest uppercase text-gray-300">
              {s.noImage}
            </span>
          )}
        </div>
      </div>

      {/* ── Model selector tabs (shown when multiple models) ── */}
      {models.length > 1 && (
        <div className="bg-gray-900 px-6 overflow-x-auto scrollbar-hide">
          <div
            className="flex min-w-max"
            role="tablist"
            aria-label={s.availableModels}
          >
            {models.map((m, i) => (
              <button
                key={m.reference}
                role="tab"
                aria-selected={i === selectedIdx}
                onClick={() => handleModelChange(i)}
                className={[
                  "px-4 py-3.5 text-xs tracking-widest uppercase whitespace-nowrap border-b-2 transition-all duration-200 bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer",
                  i === selectedIdx
                    ? "text-white border-red-600"
                    : "text-white/35 border-transparent hover:text-white/70",
                ].join(" ")}
              >
                {m.reference}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Sticky nav: model ref | Features / Parameters tabs ── */}
      {(hasFeatures || hasSpecs) && (
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between gap-4 px-7">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-gray-900 whitespace-nowrap">
                {model.reference}
              </span>
              {isBestSeller && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-amber-900 shrink-0">
                  ★ {s.bestSeller}
                </span>
              )}
            </div>
            <div className="flex">
              {hasFeatures && (
                <button
                  onClick={() => setActiveTab("features")}
                  className={[
                    "px-5 py-4 text-sm font-semibold border-b-2 transition-all duration-200 bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer whitespace-nowrap",
                    effectiveTab === "features"
                      ? "text-gray-900 border-red-600"
                      : "text-gray-500 border-transparent hover:text-gray-900",
                  ].join(" ")}
                >
                  {s.characteristicsTitle}
                </button>
              )}
              {hasSpecs && (
                <button
                  onClick={() => setActiveTab("parameters")}
                  className={[
                    "px-5 py-4 text-sm font-semibold border-b-2 transition-all duration-200 bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer whitespace-nowrap",
                    effectiveTab === "parameters"
                      ? "text-gray-900 border-red-600"
                      : "text-gray-500 border-transparent hover:text-gray-900",
                  ].join(" ")}
                >
                  {s.parameters}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Features tab ── */}
      {effectiveTab === "features" && hasFeatures && (
        <div
          className="bg-gray-50 px-7 py-10 border-t border-gray-100"
          ref={effectiveTab === "features" ? contentRef : undefined}
        >
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <h2 className="text-2xl font-bold text-gray-900">{s.characteristicsTitle}</h2>
            <button
              onClick={toggleAllFeatures}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-widest uppercase text-gray-500 bg-white border border-gray-200 rounded-md hover:text-gray-900 hover:border-gray-400 transition-all cursor-pointer"
            >
              {allFeaturesOpen ? <Minus size={11} /> : <Plus size={11} />}
              {allFeaturesOpen ? s.collapseAll : s.expandAll}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {model.featureList.map((feat) => {
              const isOpen = openFeatures.has(feat.title);
              const translated = translateSanyFeature(feat.title, feat.description, language);
              return (
                <div
                  key={feat.title}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    className="flex items-center justify-between w-full px-5 py-4 text-left bg-transparent border-none cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFeature(feat.title)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-bold text-gray-900">{translated.title}</span>
                    <span className={isOpen ? "text-red-600" : "text-gray-400"}>
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </span>
                  </button>
                  {isOpen && translated.description && (
                    <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                      {translated.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Parameters tab ── */}
      {effectiveTab === "parameters" && hasSpecs && (
        <div className="bg-white px-7 py-10 border-t border-gray-100" ref={contentRef}>
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <h2 className="text-2xl font-bold text-gray-900">{s.parameters}</h2>
            <div className="flex items-center gap-2">
              {model.brochureUrl && (
                <a
                  href={model.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-widest uppercase text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-600 hover:text-white hover:border-red-600 transition-all no-underline"
                >
                  <FileText size={11} />
                  {s.brochurePdf}
                </a>
              )}
              <button
                onClick={toggleAllSpecs}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-widest uppercase text-gray-500 bg-white border border-gray-200 rounded-md hover:text-gray-900 hover:border-gray-400 transition-all cursor-pointer"
              >
                {allSpecsOpen ? <Minus size={11} /> : <Plus size={11} />}
                {allSpecsOpen ? s.collapseAll : s.expandAll}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {model.technicalSpecifications.map((group) => {
              const isOpen = openSpecGroups.has(group.groupName);
              return (
                <div
                  key={group.groupName}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    className={[
                      "flex items-center justify-between w-full gap-4 px-5 py-4 text-left border-none cursor-pointer transition-colors",
                      isOpen ? "bg-white" : "bg-gray-50 hover:bg-gray-100",
                    ].join(" ")}
                    onClick={() => toggleSpecGroup(group.groupName)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-bold text-gray-900">
                      {tGroup(group.groupName)}
                    </span>
                    <span className={isOpen ? "text-red-600" : "text-gray-400"}>
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </span>
                  </button>
                  {isOpen && (
                    <table className="w-full border-collapse">
                      <tbody>
                        {group.specifications.map((spec) => (
                          <tr key={spec.name} className="border-t border-gray-50">
                            <td className="px-5 py-2.5 text-sm text-gray-500 w-[55%]">
                              {tSpec(spec.name)}
                            </td>
                            <td className="px-5 py-2.5 text-right text-xs font-semibold text-gray-900">
                              {tValue(spec.valueWithUnit)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
