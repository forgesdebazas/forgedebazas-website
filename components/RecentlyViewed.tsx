"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, X, ArrowRight } from "lucide-react";
import { useNavigation } from "@/contexts/NavigationContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RecentlyViewed() {
  const { recentlyViewed, clearRecentlyViewed } = useNavigation();
  const { t } = useLanguage();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#dc2626]/10 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#dc2626]" />
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              {t.productsDetails?.recently_viewed || "Récemment Consultés"}
            </h2>
          </div>
          <button
            onClick={clearRecentlyViewed}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#dc2626] transition-colors"
            title="Effacer l'historique"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Effacer</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {recentlyViewed.map((product) => (
            <Link
              key={product.id}
              href={`/produits/${product.id}`}
              className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 hover:border-[#dc2626] hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white mb-2 sm:mb-3">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  unoptimized={product.brand === "SUNWARD"}
                />
              </div>

              {/* Info */}
              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs font-bold text-[#dc2626] uppercase">
                  {product.brand}
                </span>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#dc2626] transition-colors leading-tight">
                  {product.title}
                </h3>
              </div>

              {/* Arrow indicator */}
              <div className="mt-2 flex justify-end">
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#dc2626] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
