"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Shield,
  Wrench,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Truck,
  Phone,
  Mail,
} from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import CtaSection from "@/components/ui/CtaSection";

export default function LocationClient() {
  const { t } = useLanguage();

  const categoryImages = [
    "https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/0-3500kg.jpg?preset=FamilyListing&autorotate=true",
    "https://images.pexels.com/photos/30412717/pexels-photo-30412717.jpeg",
    "https://res.cloudinary.com/doflwt77p/image/upload/v1772372485/Design_sans_titre_4_cwhitc.png",
    "https://res.cloudinary.com/doflwt77p/image/upload/v1768325136/Dump-Truck-Truck-SANY-Group-01-13-2026_06_24_PM_fow0o6.png",
  ];

  const rentalCategories = t.rental.rentalCategories.map((cat, i) => ({
    ...cat,
    image: categoryImages[i],
  }));

  const planIcons = [Clock, Calendar];
  const planColors = ["bg-blue-500", "bg-[#dc2626]"];
  const rentalPlans = t.rental.rentalPlans.map((plan, i) => ({
    ...plan,
    icon: planIcons[i],
    color: planColors[i],
  }));

  return (
    <div
      className="min-h-screen mt-20"
      style={{ paddingTop: "calc(var(--site-header-height, 140px) + 0.5rem)" }}
    >
      <section className="relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 sm:py-14 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">

            <div className="mb-6 flex justify-center">
              <Image
                src="/images/logos/proxam.jpeg"
                alt="Proxam Logo"
                width={200}
                height={60}
                className="h-16 w-auto"
              />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight text-balance">
              {t.rental.pageTitle}
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-0.5 w-12 bg-red-600"></div>
              <div className="w-2 h-2 rounded-full bg-red-600"></div>
              <div className="h-0.5 w-12 bg-red-600"></div>
            </div>
            <Link
              href="/devis?service=location"
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm sm:text-base font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700 hover:-translate-y-0.5"
            >
              {t.rental.requestQuote}
            </Link>
          </div>
        </div>
      </section>
      {/* Rental Plans */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t.rental.ourPlans}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.rental.plansDescription}
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rentalPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className={`${plan.color} p-6 text-white`}>
                  <plan.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                    {plan.title}
                  </h3>
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    {plan.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#dc2626] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </section>
      {/* Equipment Categories */}
      <section className="py-16 sm:py-20 md:py-24">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t.rental.availableEquipment}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.rental.equipmentDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rentalCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      {category.title}
                    </h3>
                    <p className="text-white/90">{category.description}</p>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </section>
      {/* Advantages */}
      <section className="py-16 sm:py-20 bg-gray-900 text-white">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.rental.advantages}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: t.rental.immediateAvailability,
                description: t.rental.immediateAvailabilityDesc,
              },
              {
                icon: Wrench,
                title: t.rental.maintenanceIncluded,
                description: t.rental.maintenanceDesc,
              },
              {
                icon: Shield,
                title: t.rental.premiumEquipment,
                description: t.rental.premiumEquipmentDesc,
              },
              {
                icon: TrendingUp,
                title: t.rental.zeroImmobilization,
                description: t.rental.zeroImmobilizationDesc,
              },
            ].map((advantage, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors"
              >
                <advantage.icon className="w-12 h-12 text-[#dc2626] mb-4" />
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-white/80">{advantage.description}</p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </section>
      {/* Contact CTA */}
      <CtaSection
        title={t.rental.quotationNeeded}
        description={t.rental.quotationDesc}
        primaryAction={{ href: "/devis?service=location", label: t.rental.requestQuote }}
        secondaryAction={{ href: "/contact", label: t.rental.contactUs }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          <div className="flex items-center gap-4 p-4 bg-white/10 border border-white/20 rounded-xl">
            <Phone className="w-8 h-8 text-white" />
            <div>
              <p className="text-sm font-semibold text-white">
                {t.contact.phone}
              </p>
              <p className="text-sm text-white/80">{t.rental.rentalPhone}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/10 border border-white/20 rounded-xl">
            <Mail className="w-8 h-8 text-white" />
            <div>
              <p className="text-sm font-semibold text-white">
                {t.contact.email}
              </p>
              <p className="text-sm text-white/80">{t.rental.rentalEmail}</p>
            </div>
          </div>
        </div>
      </CtaSection>
    </div>
  );
}
