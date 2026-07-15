"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { products, categories, brands } from "@/data/productsData";
import { getLocalizedText } from "@/lib/types";
import Link from "next/link";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type PersistedProductsUiStateV1 = {
  searchQuery?: string;
  selectedCategories?: string[];
  selectedBrands?: string[];
  weightRange?: [number, number];
  capacityRange?: [number, number];
  featuredOnly?: boolean;
  availableOnly?: boolean;
  visibleCount?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function uniqueStrings(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return Array.from(new Set(values.filter((v) => typeof v === "string"))) as string[];
}

function sanitizeRange(
  value: unknown,
  fallback: [number, number],
  min: number,
  max: number
): [number, number] {
  if (!Array.isArray(value) || value.length !== 2) return fallback;
  const a = typeof value[0] === "number" ? value[0] : fallback[0];
  const b = typeof value[1] === "number" ? value[1] : fallback[1];
  const lo = clamp(Math.min(a, b), min, max);
  const hi = clamp(Math.max(a, b), min, max);
  return [lo, hi];
}

type FilterSidebarProps = {
  isMobile?: boolean;
  language: "fr" | "en" | "es";
  t: any;
  searchQuery: string;
  selectedCategories: string[];
  featuredOnly: boolean;
  availableOnly: boolean;
  resetFilters: () => void;
  toggleCategory: (id: string) => void;
};

type CategoryProductCounts = Record<string, number>;

function getCategoryProductCounts(): CategoryProductCounts {
  const counts: CategoryProductCounts = {};
  for (const product of products) {
    const direct = product.category;
    counts[direct] = (counts[direct] || 0) + 1;
    let current = categories.find((c) => c.id === direct);
    while (current?.parentId) {
      counts[current.parentId] = (counts[current.parentId] || 0) + 1;
      current = categories.find((c) => c.id === current!.parentId);
    }
  }
  return counts;
}

function FilterSidebar({
  isMobile = false,
  language,
  t,
  selectedCategories,
  featuredOnly,
  availableOnly,
  resetFilters,
  toggleCategory,
}: FilterSidebarProps) {
  const [categoryQuery, setCategoryQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const counts = useMemo(() => getCategoryProductCounts(), []);

  const rootCategories = useMemo(
    () => categories.filter((c) => !c.parentId && (counts[c.id] || 0) > 0),
    [counts]
  );

  const childrenByParent = useMemo(() => {
    const map: Record<string, typeof categories> = {};
    for (const c of categories) {
      if (c.parentId) {
        (map[c.parentId] ||= []).push(c);
      }
    }
    return map;
  }, []);

  const matchesQuery = (label: string) =>
    !categoryQuery.trim() ||
    label.toLowerCase().includes(categoryQuery.trim().toLowerCase());

  const toggleGroup = (id: string) =>
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className={cn("space-y-6", isMobile ? "p-4" : "")}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold flex items-center gap-2 text-gray-900">
          <SlidersHorizontal className="w-4 h-4 text-[#dc2626]" />
          {t.products.filters || "Filtres"}
        </h3>
        <button
          onClick={() => {
            resetFilters();
            setCategoryQuery("");
            setOpenGroups({});
          }}
          className="text-xs text-gray-400 hover:text-[#dc2626] flex items-center gap-1 transition-colors font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          {t.products.clearAll || "Tout effacer"}
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[11px] uppercase tracking-[0.12em] text-gray-500">
            {t.products.allCategories || "Catégories"}
          </h4>
          {selectedCategories.length > 0 && (
            <span className="text-[10px] font-bold text-[#dc2626] bg-red-50 px-2 py-0.5 rounded-full">
              {selectedCategories.length}
            </span>
          )}
        </div>

        {/* Category search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
          <input
            type="text"
            value={categoryQuery}
            onChange={(e) => setCategoryQuery(e.target.value)}
            placeholder={
              language === "fr"
                ? "Rechercher une catégorie"
                : language === "es"
                  ? "Buscar una categoría"
                  : "Search a category"
            }
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-transparent rounded-lg text-xs focus:bg-white focus:border-gray-200 focus:ring-1 focus:ring-[#dc2626]/20 outline-none transition-all"
          />
        </div>

        <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1 -mr-1 scrollbar-hide">
          {rootCategories.map((cat) => {
            const label = getLocalizedText(cat.name, language);
            const children = (childrenByParent[cat.id] || []).filter(
              (c) => (counts[c.id] || 0) > 0
            );
            const childMatches = children.filter((c) =>
              matchesQuery(getLocalizedText(c.name, language))
            );
            const selfMatch = matchesQuery(label);
            if (categoryQuery && !selfMatch && childMatches.length === 0) {
              return null;
            }

            const hasChildren = children.length > 0;
            const isOpen =
              openGroups[cat.id] ??
              (categoryQuery ? childMatches.length > 0 : false);
            const checked = selectedCategories.includes(cat.id);
            const visibleChildren = categoryQuery ? childMatches : children;

            return (
              <div key={cat.id} className="rounded-lg">
                <div className="flex items-center gap-2 group">
                  <Checkbox
                    id={`cat-${cat.id}`}
                    checked={checked}
                    onCheckedChange={() => toggleCategory(cat.id)}
                  />
                  <Label
                    htmlFor={`cat-${cat.id}`}
                    className="flex-1 text-[13px] font-semibold text-gray-800 cursor-pointer leading-tight py-1.5"
                  >
                    {label}
                  </Label>
                  <span className="text-[10px] text-gray-400 tabular-nums">
                    {counts[cat.id] || 0}
                  </span>
                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() => toggleGroup(cat.id)}
                      className="p-1 rounded hover:bg-gray-100 transition-colors"
                      aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                </div>

                {hasChildren && isOpen && (
                  <div className="ml-6 mt-0.5 mb-1 space-y-0.5 border-l border-gray-100 pl-3">
                    {visibleChildren.map((child) => {
                      const childLabel = getLocalizedText(child.name, language);
                      const childChecked = selectedCategories.includes(
                        child.id
                      );
                      return (
                        <div
                          key={child.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={`cat-${child.id}`}
                            checked={childChecked}
                            onCheckedChange={() => toggleCategory(child.id)}
                          />
                          <Label
                            htmlFor={`cat-${child.id}`}
                            className="flex-1 text-[12px] text-gray-600 cursor-pointer leading-tight py-1"
                          >
                            {childLabel}
                          </Label>
                          <span className="text-[10px] text-gray-300 tabular-nums">
                            {counts[child.id] || 0}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {rootCategories.every((cat) => {
            const label = getLocalizedText(cat.name, language);
            const children = (childrenByParent[cat.id] || []).filter(
              (c) => (counts[c.id] || 0) > 0
            );
            const childMatches = children.filter((c) =>
              matchesQuery(getLocalizedText(c.name, language))
            );
            return (
              !!categoryQuery &&
              !matchesQuery(label) &&
              childMatches.length === 0
            );
          }) &&
            categoryQuery && (
              <p className="text-xs text-gray-400 text-center py-4">
                {language === "fr"
                  ? "Aucune catégorie trouvée"
                  : language === "es"
                    ? "Ninguna categoría encontrada"
                    : "No category found"}
              </p>
            )}
        </div>
      </div>

      {/* Toggles (currently disabled in UI, but keep layout ready) */}
      {featuredOnly || availableOnly ? (
        <div className="text-xs text-gray-500"></div>
      ) : null}
    </div>
  );
}

export default function ProductsClient() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [initialUi] = useState<PersistedProductsUiStateV1>(() => ({
    searchQuery: searchParams.get("q") ?? "",
    selectedCategories: searchParams.get("categories")?.split(",").filter(Boolean) ?? [],
    selectedBrands: searchParams.get("brands")?.split(",").filter(Boolean) ?? [],
    weightRange: searchParams.get("weight")?.split("-").map(Number) as [number, number] | undefined,
    capacityRange: searchParams.get("capacity")?.split("-").map(Number) as [number, number] | undefined,
    featuredOnly: searchParams.get("featured") === "1",
    availableOnly: searchParams.get("available") === "1",
    visibleCount: Number(searchParams.get("limit")) || 6,
  })); // URL is the source of truth when this history entry is mounted.
  const didMount = useRef(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState(
    initialUi.searchQuery ?? ""
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    uniqueStrings(initialUi.selectedCategories)
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    uniqueStrings(initialUi.selectedBrands)
  );
  const [weightRange, setWeightRange] = useState<[number, number]>(
    sanitizeRange(initialUi.weightRange, [0, 100], 0, 100)
  ); // tons
  const [capacityRange, setCapacityRange] = useState<[number, number]>(
    sanitizeRange(initialUi.capacityRange, [0, 5], 0, 5)
  ); // m³
  const [featuredOnly, setFeaturedOnly] = useState(!!initialUi.featuredOnly);
  const [availableOnly, setAvailableOnly] = useState(!!initialUi.availableOnly);

  // UI States
  const [visibleCount, setVisibleCount] = useState(() => {
    const raw = initialUi.visibleCount;
    return typeof raw === "number" && raw > 0 ? Math.floor(raw) : 6;
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setWeightRange([0, 100]);
    setCapacityRange([0, 5]);
    setFeaturedOnly(false);
    setAvailableOnly(false);
    setVisibleCount(6);
  };

  // Filtering Logic - NOW WORKS CORRECTLY
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const isAvailable = product.available !== false;
      if (!isAvailable) return false;
      if (product.brand.toUpperCase() === "E-MAK") return false;

      // Search
      const title = getLocalizedText(product.title, language).toLowerCase();
      const shortTitle = getLocalizedText(
        product.shortTitle || product.title,
        language
      ).toLowerCase();
      const description = getLocalizedText(
        product.description,
        language
      ).toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        title.includes(searchQuery.toLowerCase()) ||
        shortTitle.includes(searchQuery.toLowerCase()) ||
        description.includes(searchQuery.toLowerCase());

      // Categories - matches category ID or any ancestor category
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category) ||
        selectedCategories.some((catId) => {
          let current = categories.find((c) => c.id === product.category);
          while (current?.parentId) {
            if (current.parentId === catId) return true;
            current = categories.find((c) => c.id === current!.parentId);
          }
          return false;
        });

      // Brands - matches brand ID exactly
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.some(
          (b) => b.toLowerCase() === product.brand.toLowerCase()
        );

      // Featured & Available
      const matchesFeatured = !featuredOnly || !!product.featured;
      const matchesAvailable = !availableOnly || isAvailable;

      // Weight (in tons)
      const weight = product.numericSpecs?.weight || 0;
      const matchesWeight =
        weight >= weightRange[0] && weight <= weightRange[1];

      // Capacity (in m³)
      const capacity = product.numericSpecs?.capacity || 0;
      const matchesCapacity =
        capacity >= capacityRange[0] && capacity <= capacityRange[1];

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesFeatured &&
        matchesAvailable &&
        matchesWeight &&
        matchesCapacity
      );
    });
  }, [
    searchQuery,
    selectedCategories,
    selectedBrands,
    weightRange,
    capacityRange,
    featuredOnly,
    availableOnly,
    language,
  ]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMoreProducts = filteredProducts.length > visibleCount;

  // Keep shareable list state in the URL. replace() avoids one history entry per keystroke.
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const setOrDelete = (key: string, value: string, isDefault = false) =>
      isDefault ? params.delete(key) : params.set(key, value);
    setOrDelete("q", searchQuery, !searchQuery);
    setOrDelete("categories", selectedCategories.join(","), selectedCategories.length === 0);
    setOrDelete("brands", selectedBrands.join(","), selectedBrands.length === 0);
    setOrDelete("weight", weightRange.join("-"), weightRange[0] === 0 && weightRange[1] === 100);
    setOrDelete("capacity", capacityRange.join("-"), capacityRange[0] === 0 && capacityRange[1] === 5);
    setOrDelete("featured", "1", !featuredOnly);
    setOrDelete("available", "1", !availableOnly);
    setOrDelete("limit", String(visibleCount), visibleCount === 6);
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [
    searchQuery,
    selectedCategories,
    selectedBrands,
    weightRange,
    capacityRange,
    featuredOnly,
    availableOnly,
    visibleCount,
    pathname,
    router,
  ]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleBrand = (id: string) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="bg-gray-50 min-h-screen mt-20"
      style={{ paddingTop: "calc(var(--site-header-height, 140px) + 0.5rem)" }}
    >
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden pt-8 pb-12 sm:pb-16 md:pb-20 border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10 flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <ScrollAnimation>
              {/* <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-red-700">Nos Produits</span>
              </div> */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {t.products.pageTitle}
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-0.5 w-12 bg-red-600"></div>
                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                <div className="h-0.5 w-12 bg-red-600"></div>
              </div>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                {t.products.pageDescription}
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-20 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 bg-white rounded-2xl shadow-xl p-8 h-fit sticky top-24">
            <FilterSidebar
              language={language}
              t={t}
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              featuredOnly={featuredOnly}
              availableOnly={availableOnly}
              resetFilters={resetFilters}
              toggleCategory={toggleCategory}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Sticky Search & Filters Header */}
            <div className="sticky top-24 z-30 bg-gray-50/95 backdrop-blur-sm pb-4 -mt-2">
              {/* Search & Mobile Toggle */}
              <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={
                      t.products.searchPlaceholder || "Rechercher un produit..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#dc2626] transition-all outline-none"
                  />
                </div>
                <Button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden w-full md:w-auto bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-xl px-6 py-6 flex items-center gap-2"
                >
                  <Filter className="w-5 h-5" />
                  Filtres
                </Button>
                <div className="hidden md:block text-sm font-medium text-gray-500 px-4">
                  {filteredProducts.length} résultat
                  {filteredProducts.length !== 1 ? "s" : ""}
                </div>
              </div>

              {/* Active Filters Chips */}
              {(selectedCategories.length > 0 ||
                selectedBrands.length > 0 ||
                featuredOnly ||
                availableOnly) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedCategories.map((catId) => {
                      const cat = categories.find((c) => c.id === catId);
                      return cat ? (
                        <span
                          key={catId}
                          className="bg-red-50 text-[#dc2626] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-red-100 shadow-sm"
                        >
                          {getLocalizedText(cat.name, language)}
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => toggleCategory(catId)}
                          />
                        </span>
                      ) : null;
                    })}
                    {selectedBrands.map((brandId) => {
                      const brand = brands.find((b) => b.id === brandId);
                      return brand ? (
                        <span
                          key={brandId}
                          className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-gray-200 shadow-sm"
                        >
                          {brand.name}
                          <X
                            className="w-3 h-3 cursor-pointer"
                            onClick={() => toggleBrand(brandId)}
                          />
                        </span>
                      ) : null;
                    })}

                    {availableOnly && (
                      <span className="bg-green-50 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-green-100 shadow-sm">
                        Disponible
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => setAvailableOnly(false)}
                        />
                      </span>
                    )}
                  </div>
                )}
            </div>

            {/* Brand quick-filter chips */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                  {language === "fr" ? "Filtrer par marque" : language === "es" ? "Filtrar por marca" : "Filter by brand"}
                </p>
                {selectedBrands.length > 0 && (
                  <button
                    onClick={() => setSelectedBrands([])}
                    className="text-[10px] font-bold text-gray-400 hover:text-[#dc2626] flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    {language === "fr" ? "Effacer" : language === "es" ? "Borrar" : "Clear"}
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => {
                  const isActive = selectedBrands.includes(brand.id);
                  const brandCount = products.filter(
                    (p) => p.brand.toLowerCase() === brand.id.toLowerCase()
                  ).length;
                  if (brandCount === 0) return null;
                  return (
                    <button
                      key={brand.id}
                      onClick={() => toggleBrand(brand.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 flex items-center gap-1.5",
                        isActive
                          ? "bg-[#dc2626] text-white border-[#dc2626] shadow-sm"
                          : "bg-white text-gray-700 border-gray-200 hover:border-[#dc2626] hover:text-[#dc2626]"
                      )}
                    >
                      <span>{brand.name}</span>
                      <span
                        className={cn(
                          "text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-full",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-500"
                        )}
                      >
                        {brandCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-20 text-center shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-500 mb-8">
                  Essayez de modifier vos filtres
                </p>
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="rounded-xl"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleProducts.map((product) => {
                  const title = getLocalizedText(product.title, language);
                  const shortTitle = getLocalizedText(
                    product.shortTitle || product.title,
                    language
                  );
                  const detailHref = product.sanySeriesLink ?? `/produits/${product.id}`;

                  return (
                    <ScrollAnimation key={product.id}>
                      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden border border-gray-100 flex flex-col h-full">
                        <Link
                          href={detailHref}
                          className="relative block h-56 sm:h-64 bg-white overflow-hidden flex-shrink-0"
                        >
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={title}
                            fill
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                            unoptimized={product.brand === "SUNWARD"}
                          />
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[11px] font-bold text-gray-900 shadow-sm border border-gray-100">
                              {brands.find(
                                (b) =>
                                  b.id.toLowerCase() ===
                                  product.brand.toLowerCase()
                              )?.name || product.brand}
                            </span>

                          </div>
                        </Link>

                        <div className="p-4 flex flex-col flex-1">
                          <Link
                            href={detailHref}
                            className="block mb-1.5"
                          >
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-2 leading-snug">
                              {shortTitle}
                            </h3>
                          </Link>

                          {/* Specs — max 2 rows so all cards stay aligned */}
                          <div className="flex flex-col gap-1 mb-3 min-h-[36px] flex-1">
                            {product.specs &&
                              Object.entries(product.specs)
                                .filter(([_, value]) => getLocalizedText(value, language).trim() !== "")
                                .slice(0, 2)
                                .map(([key, value]) => (
                                  <div
                                    key={key}
                                    className="flex items-center gap-2 text-[11px] text-gray-500"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-200 flex-shrink-0" />
                                    <span className="line-clamp-1">
                                      {getLocalizedText(value, language)}
                                    </span>
                                  </div>
                                ))}
                          </div>

                          <div className="flex gap-2 mt-auto">
                            <Link
                              href={detailHref}
                              className="flex-1"
                            >
                              <Button
                                variant="outline"
                                className="w-full rounded-lg border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs py-4"
                              >
                                {t.products.details || "Détails"}
                              </Button>
                            </Link>
                            <Link href="/devis" className="flex-1">
                              <Button className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-lg font-bold text-xs py-4 shadow-sm">
                                {t.products.quote || "Devis"}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </ScrollAnimation>
                  );
                })}
              </div>
            )}

            {/* Load More */}
            {hasMoreProducts && (
              <div className="flex justify-center pt-8">
                <Button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-2xl px-10 py-6 font-bold shadow-sm"
                >
                  Voir plus de produits
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
              <h2 className="text-xl font-bold">Filtres</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <FilterSidebar
                isMobile
                language={language}
                t={t}
                searchQuery={searchQuery}
                selectedCategories={selectedCategories}
                featuredOnly={featuredOnly}
                availableOnly={availableOnly}
                resetFilters={resetFilters}
                toggleCategory={toggleCategory}
              />
            </div>
            <div className="p-6 border-t sticky bottom-0 bg-white">
              <Button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-6 rounded-xl font-bold"
              >
                Appliquer les filtres ({filteredProducts.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
