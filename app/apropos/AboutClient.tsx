"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  CheckCircle,
  Factory,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Wrench,
  Briefcase,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useEffect } from "react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import CtaSection from "@/components/ui/CtaSection";
import { brands } from "@/data/brands";
import { toBrandSlug } from "@/lib/slug";

export default function AboutClient() {
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
              {t.aboutPage.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t.aboutPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20 sm:py-24 md:py-32 bg-white">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 text-gray-900 leading-tight text-balance">
                {t.aboutPage.ourStory}
              </h2>
              <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
                <p className="font-semibold text-gray-800">
                  {t.aboutPage.intro}
                </p>
                <p>{t.aboutPage.description}</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-72 sm:h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-transform duration-500">
              <Image
                src="https://res.cloudinary.com/doflwt77p/image/upload/v1776771483/presentation_forges_2.jpg_iazkbp.jpg"
                alt="Histoire de Forges de Bazas"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Nos Valeurs */}
      <section className="relative overflow-hidden py-20 sm:py-24 md:py-32 bg-[radial-gradient(circle_at_top_left,_#fee2e2,_transparent_34%),linear-gradient(135deg,_#ffffff_0%,_#f8fafc_48%,_#fef2f2_100%)]">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-red-100/70 blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-gray-200/70 blur-3xl" />
        <ScrollAnimation className="relative container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="mx-auto mb-12 sm:mb-16 max-w-3xl text-center">
            {/* <span className="inline-flex items-center rounded-full border border-red-200 bg-white/80 px-4 py-1.5 text-xs font-black uppercase tracking-[0.28em] text-red-700 shadow-sm">
              FDB DNA
            </span> */}
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 leading-tight text-balance">
              {t.aboutPage.ourValues}
            </h2>
            {/* <div className="mx-auto mt-5 h-1.5 w-24 rounded-full bg-gradient-to-r from-red-700 via-red-500" /> */}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-6">
            {[
              {
                icon: ShieldCheck,
                title: t.aboutPage.trust,
                description: t.aboutPage.trustDesc,
              },
              {
                icon: CheckCircle,
                title: t.aboutPage.excellence,
                description: t.aboutPage.excellenceDesc,
              },
              {
                icon: Factory,
                title: t.aboutPage.partnership,
                description: t.aboutPage.partnershipDesc,
              },
              {
                icon: Sparkles,
                title: t.aboutPage.innovation,
                description: t.aboutPage.innovationDesc,
              },
              {
                icon: Lightbulb,
                title: t.aboutPage.continuousInnovation,
                description: t.aboutPage.continuousInnovationDesc,
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-6 sm:p-7 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-red-200 hover:shadow-[0_28px_70px_rgba(185,28,28,0.16)] ${
                  index < 2
                    ? "lg:col-span-3"
                    : "lg:col-span-2"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-700 via-red-500 to-gray-900" />
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-100 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-700 to-red-500 shadow-lg shadow-red-700/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 sm:h-16 sm:w-16">
                    <value.icon className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                  </div>
                  <span className="font-black text-5xl leading-none text-gray-100 transition-colors duration-500 group-hover:text-red-50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="relative mt-6 text-xl sm:text-2xl font-extrabold text-gray-950">
                  {value.title}
                </h3>
                <p className="relative mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* Notre Expertise */}
      <section className="py-20 sm:py-24 md:py-32 bg-white">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 sm:mb-14 text-gray-900 leading-tight text-balance">
            {t.aboutPage.expertise}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-gray-50 p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <Briefcase className="w-8 h-8 text-red-700" />
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {t.aboutPage.equipmentSales}
                </h3>
              </div>
              <ul className="space-y-4 text-sm sm:text-base text-gray-700">
                {[
                  t.aboutPage.equipmentItem1,
                  t.aboutPage.equipmentItem2,
                  t.aboutPage.equipmentItem3,
                  t.aboutPage.equipmentItem4,
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start p-3 bg-white rounded-lg shadow-sm border border-red-100"
                  >
                    <CheckCircle2 className="w-5 h-5 text-red-700 shrink-0 mt-0.5 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <Wrench className="w-8 h-8 text-red-700" />
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {t.aboutPage.servicesSav}
                </h3>
              </div>
              <ul className="space-y-4 text-sm sm:text-base text-gray-700">
                {[
                  t.aboutPage.serviceItem1,
                  t.aboutPage.serviceItem2,
                  t.aboutPage.serviceItem3,
                  t.aboutPage.serviceItem4,
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start p-3 bg-white rounded-lg shadow-sm border border-red-100"
                  >
                    <CheckCircle2 className="w-5 h-5 text-red-700 shrink-0 mt-0.5 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Historique & Vision */}
      <section id="historique-vision" className="py-20 sm:py-24 md:py-32 bg-gray-50" style={{ scrollMarginTop: "var(--site-header-height, 80px)" }}>
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900 leading-tight text-balance">
            {t.aboutPage.historyAndVision}
          </h2>
          <div className="w-16 h-1 bg-red-700 mx-auto mb-12 sm:mb-16"></div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-red-200 sm:-translate-x-px"></div>

            <div className="space-y-10 sm:space-y-12">
              {t.aboutPage.timeline.map((event, index) => (
                <div key={index} className={`relative flex flex-col sm:flex-row gap-6 sm:gap-0 ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`pl-12 sm:pl-0 sm:w-[calc(50%-2rem)] ${index % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"}`}>
                    <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <span className="inline-block bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">{event.year}</span>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{event.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 top-5 sm:top-1/2 w-4 h-4 bg-red-700 rounded-full border-4 border-white shadow-md sm:-translate-x-1/2 sm:-translate-y-1/2 -translate-x-1/2 sm:transform"></div>

                  {/* Empty space on the other side */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="mt-16 sm:mt-20 bg-red-700 rounded-2xl p-8 sm:p-12 text-white text-center shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">{t.aboutPage.visionTitle}</h3>
            <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto opacity-90">
              {t.aboutPage.visionText}
            </p>
          </div>
        </ScrollAnimation>
      </section>

      {/* Engagement QSE */}
      <section id="qse" className="py-20 sm:py-24 md:py-32 bg-white" style={{ scrollMarginTop: "var(--site-header-height, 80px)" }}>
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-red-700">
              <ShieldCheck className="w-4 h-4" />
              QSE
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight text-balance">
              {t.aboutPage.qseTitle}
            </h2>
            <p className="mt-5 text-base sm:text-lg text-gray-700 leading-relaxed">
              {t.aboutPage.qseIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-start">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8 shadow-lg">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                {t.aboutPage.qseCommitmentsTitle}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
                {t.aboutPage.qseCommitmentsIntro}
              </p>
              <ul className="space-y-4">
                {t.aboutPage.qseCommitments.map((commitment, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-white p-4 text-sm sm:text-base text-gray-700 shadow-sm border border-red-100"
                  >
                    <CheckCircle2 className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                    <span>{commitment}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-red-700 p-6 sm:p-8 text-white shadow-xl">
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
                  {t.aboutPage.qseSmiTitle}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-white/90">
                  {t.aboutPage.qseSmiText}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-lg">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                  {t.aboutPage.qsePurposeTitle}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
                  {t.aboutPage.qsePurposeIntro}
                </p>
                <ul className="space-y-3">
                  {t.aboutPage.qsePurposes.map((purpose, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                      <CheckCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                      <span>{purpose}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Nos Agences */}
      <section id="nos-agences" className="py-20 sm:py-24 md:py-32 bg-white" style={{ scrollMarginTop: "var(--site-header-height, 80px)" }}>
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900 leading-tight text-balance">
            {t.aboutPage.ourAgenciesSection}
          </h2>
          <div className="w-16 h-1 bg-red-700 mx-auto mb-6"></div>
          <p className="text-center text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12 sm:mb-16">
            {t.aboutPage.ourAgenciesDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                city: "Casablanca",
                tag: "Siège",
                address: "Route Zenata, lotissement polygone, quartier Ain Sebaa lots 13,14 & 15, 20250",
                phone: "0522 669 850",
                phoneTel: "+212522669850",
                map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.8245401419663!2d-7.508045024301253!3d33.63579117331658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cbbf8244a441%3A0x9fbe1a1ca06dc7d0!2sForges%20de%20Bazas!5e0!3m2!1sfr!2sma!4v1765657582549!5m2!1sfr!2sma",
              },
              {
                city: "Agadir",
                tag: null,
                address: "LOT 55, TASSILA RP 40, DCHEIRA 80000",
                phone: "06 08 11 63 63",
                phoneTel: "+212608116363",
                map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.638273553259!2d-9.5255628!3d30.3896279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3c93da94dfb97%3A0x8f085efc57a43dd8!2sForges%20de%20bazas!5e0!3m2!1sfr!2sma!4v1765673315728!5m2!1sfr!2sma",
              },
              {
                city: "Tanger",
                tag: null,
                address: "LOT 211, ZI GZENAYA 90090",
                phone: "+212 608 116 262",
                phoneTel: "+212608116262",
                map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.4908105758195!2d-5.896532924210833!3d35.714145972576745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b86267cf0f33b%3A0x8ade2914e3c74a1e!2sForges%20de%20bazas%20Tanger!5e0!3m2!1sfr!2sma!4v1765673503907!5m2!1sfr!2sma",
              },
            ].map((agency) => (
              <div key={agency.city} className="bg-gray-50 rounded-2xl border border-gray-100 shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 shrink-0">
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
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-700 shrink-0" />
                    <h3 className="font-extrabold text-base text-gray-900">{agency.city}</h3>
                    {agency.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wide text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                        {t.aboutPage.headquartersTag}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{agency.address}</p>
                  <div className="pt-2 border-t border-gray-100 mt-auto">
                    <a
                      href={`tel:${agency.phoneTel}`}
                      className="flex items-center gap-2 text-xs text-gray-700 hover:text-red-700 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-red-700" />
                      {agency.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* Carrières */}
      <section id="carrieres" className="py-20 sm:py-24 md:py-32 bg-white" style={{ scrollMarginTop: "var(--site-header-height, 80px)" }}>
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900 leading-tight text-balance">
            {t.aboutPage.careersTitle}
          </h2>
          <div className="w-16 h-1 bg-red-700 mx-auto mb-6"></div>
          <p className="text-center text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12 sm:mb-16">
            {t.aboutPage.careersDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Open Positions */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="bg-red-700 w-14 h-14 rounded-full flex items-center justify-center mb-5 shrink-0">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.aboutPage.openPositions}</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {t.aboutPage.openPositionsDesc}
              </p>
              <a
                href="/carrieres#offres"
                className="mt-6 inline-block text-center bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors duration-200"
              >
                {t.aboutPage.openPositionsCTA}
              </a>
            </div>

            {/* Company Culture */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="bg-red-700 w-14 h-14 rounded-full flex items-center justify-center mb-5 shrink-0">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.aboutPage.companyCulture}</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {t.aboutPage.companyCultureDesc}
              </p>
            </div>

            {/* Training Programs */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="bg-red-700 w-14 h-14 rounded-full flex items-center justify-center mb-5 shrink-0">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.aboutPage.trainingPrograms}</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {t.aboutPage.trainingProgramsDesc}
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Nos marques partenaires */}
      <section
        id="nos-marques-partenaires"
        className="py-20 sm:py-24 md:py-32 bg-gray-50"
        style={{ scrollMarginTop: "var(--site-header-height, 80px)" }}
      >
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900 leading-tight text-balance">
            Nos Marques Partenaires
          </h2>
          <div className="w-16 h-1 bg-red-700 mx-auto mb-6"></div>
          <p className="text-center text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12 sm:mb-16">
            Nous représentons les leaders mondiaux des équipements industriels et BTP.
            Découvrez notre portefeuille de marques partenaires reconnues pour leur fiabilité et leurs performances.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/marque/${toBrandSlug(brand.name)}`}
                className="group bg-white rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center gap-3 shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border-2 border-transparent hover:border-red-600"
              >
                <div className="relative w-full h-16 sm:h-20 flex items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={160}
                    height={70}
                    className="object-contain max-h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/nos-marques"
              className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold uppercase rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Voir toutes les marques
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollAnimation>
      </section>

      {/* CTA Section */}
      <CtaSection
        title={t.aboutPage.readyToWork}
        description={t.aboutPage.contactToday}
        primaryAction={{ href: "/contact", label: t.common.contactUs }}
        secondaryAction={{ href: "/devis", label: t.common.requestQuote }}
      />
    </div>
  );
}
