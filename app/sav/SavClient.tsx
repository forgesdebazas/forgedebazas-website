"use client";

import Image from "next/image";
import {
  Wrench,
  Clock,
  ShieldCheck,
  Settings,
  RefreshCw,
  GraduationCap,
  ClipboardCheck,
  BarChart3,
  Truck,
  CheckCircle2,
  ArrowRight,
  Factory,
} from "lucide-react";
import { useEffect } from "react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import CtaSection from "@/components/ui/CtaSection";

export default function SavClient() {
  const { t } = useLanguage();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }, []);

  return (
    <div
      className="bg-white min-h-screen mt-20"
      style={{ paddingTop: "calc(var(--site-header-height, 140px) + 0.5rem)" }}
    >
      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 sm:py-14 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight text-balance">
              {t.services.pageTitle}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t.services.pageDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Maintenance & Réparation */}
      <section id="maintenance" className="py-16 sm:py-20 md:py-24" style={{ scrollMarginTop: "var(--site-header-height, 80px)" }}>
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://sanyperkasa.com/wp-content/uploads/2026/07/DSC00477pe-2.png"
                  alt="Maintenance et Réparation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <Wrench className="w-8 h-8 text-[#dc2626]" />
                    <h3 className="text-2xl font-bold">{t.services.expertiseTechniqueTitle}</h3>
                  </div>
                  <p className="text-gray-200">
                    {t.services.expertiseTechniqueSubtitle}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {t.services.maintenanceRepair}
                <span className="block text-[#dc2626] text-xl sm:text-2xl mt-2">
                  {t.services.maintenanceRepairDesc}
                </span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t.services.priority}
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#dc2626]">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#dc2626]" />
                    {t.services.expertTechnicians}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• {t.services.expertBullet1}</li>
                    <li>• {t.services.expertBullet2}</li>
                    <li>• {t.services.expertBullet3}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#dc2626]">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#dc2626]" />
                    {t.services.flexibleInterventions}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• {t.services.flexibleBullet1}</li>
                    <li>• {t.services.flexibleBullet2}</li>
                    <li>• {t.services.flexibleBullet3}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#dc2626]">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#dc2626]" />
                    {t.services.originalParts}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {t.services.originalPartsDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Location PROXAM */}
      <section className="py-16 sm:py-20 bg-gray-900 text-white">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t.services.proxamRental}
            </h2>
            <p className="text-xl text-gray-400">
              {t.services.proxamSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Truck className="w-12 h-12 text-[#dc2626] mb-6" />
              <h3 className="text-xl font-bold mb-4">
                {t.services.immediateAvailabilityCard}
              </h3>
              <p className="text-gray-400 mb-4">
                {t.services.immediateAvailabilityCardDesc}
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" /> {t.services.availabilityBullet1}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" /> {t.services.availabilityBullet2}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" /> {t.services.availabilityBullet3}
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Clock className="w-12 h-12 text-[#dc2626] mb-6" />
              <h3 className="text-xl font-bold mb-4">{t.services.flexibleFormulas}</h3>
              <p className="text-gray-400 mb-4">
                {t.services.flexibleFormulasDesc}
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" /> {t.services.formulasBullet1}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" /> {t.services.formulasBullet2}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" /> {t.services.formulasBullet3}
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <ShieldCheck className="w-12 h-12 text-[#dc2626] mb-6" />
              <h3 className="text-xl font-bold mb-4">{t.services.totalPeaceOfMind}</h3>
              <p className="text-gray-400 mb-4">
                {t.services.totalPeaceDesc}
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" /> {t.services.peaceBullet1}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" /> {t.services.peaceBullet2}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" /> {t.services.peaceBullet3}
                </li>
              </ul>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Reconditionnement & Audit */}
      <section id="reconditionnement" className="py-16 sm:py-20 md:py-24" style={{ scrollMarginTop: "var(--site-header-height, 80px)" }}>
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Reconditionnement */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#dc2626]/10 p-4 rounded-xl">
                  <RefreshCw className="w-8 h-8 text-[#dc2626]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {t.services.certifiedReconditioning}
                </h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">{t.services.completeMachinesTitle}</h3>
                  <p className="text-gray-600 text-sm">
                    {t.services.completeMachinesDesc}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    {t.services.componentsTitle}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t.services.componentsDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Audit & Formation */}
            <div id="formation" style={{ scrollMarginTop: "var(--site-header-height, 80px)" }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#dc2626]/10 p-4 rounded-xl">
                  <ClipboardCheck className="w-8 h-8 text-[#dc2626]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {t.services.auditAndTraining}
                </h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Factory className="w-5 h-5 text-[#dc2626]" /> {t.services.workEnvTitle}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t.services.workEnvDesc}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#dc2626]" /> {t.services.processTitle}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t.services.processDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* CTA */}
      <CtaSection
        title={t.services.ctaTitle}
        description={t.services.ctaDescription}
        primaryAction={{ href: "/contact", label: t.services.ctaContactSav }}
        secondaryAction={{ href: "/devis", label: t.common.requestQuote }}
      />
    </div>
  );
}
