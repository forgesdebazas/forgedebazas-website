"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { div } from "framer-motion/client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#171616] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-8 mb-8">
          {/* Logo and Map */}
          <div className="sm:col-span-2 xl:col-span-2">
            <div className="mb-6 relative inline-block">
              <Link href="/">
                <Image
                  src="/images/new-logo-carte.png"
                  alt="Forges de Bazas Logo and Map"
                  width={250}
                  height={250}
                  className="w-full max-w-[250px] h-auto rounded-lg"
                />
              </Link>

              {/* Tanger */}
              <div className="absolute top-[28%] left-[57%] flex items-center gap-1 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded shadow-sm backdrop-blur-sm">
                  Tanger
                </span>
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-[#dc2626]"></span>
                </span>
              </div>

              {/* Casablanca */}
              <div className="absolute top-[38%] left-[47%] flex items-center gap-1 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded shadow-sm backdrop-blur-sm">
                  Casablanca
                </span>
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-[#dc2626]"></span>
                </span>
              </div>

              {/* Agadir */}
              <div className="absolute top-[56%] left-[38%] flex items-center gap-1 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded shadow-sm backdrop-blur-sm">
                  Agadir
                </span>
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-[#dc2626]"></span>
                </span>
              </div>
            </div>
            <div className="flex gap-4 items-center flex-wrap">
              <span className="text-sm">{t.footer.followUs}</span>
              <a
                href="https://www.facebook.com/share/18HS5UCLzA/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/forgesdebazas?igsh=MTFxYmVrdmY0emFkcQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="hover:text-red-500 transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/forges-de-bazas/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* NOS PRODUITS */}
          <div>
            <h4 className="font-semibold mb-4 text-[#dc2626] underline decoration-2 decoration-[#dc2626]">
              {t.footer.ourProducts}
            </h4>
            <nav aria-label="Product links">
              <ul className="space-y-2 text-sm text-gray-200">
                <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                  <ChevronRight className="w-4 h-4 " aria-hidden="true" />
                  <Link
                    href="/produits"
                    className="hover:text-[#dc2626] transition-colors"
                  >
                    {t.footer.newEquipment}
                  </Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                  <ChevronRight className="w-4 h-4 " aria-hidden="true" />
                  <Link
                    href="/produits"
                    className="hover:text-[#dc2626] transition-colors"
                  >
                    {t.footer.usedEquipment}
                  </Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                  <ChevronRight className="w-4 h-4 " aria-hidden="true" />
                  <Link
                    href="/produits"
                    className="hover:text-[#dc2626] transition-colors"
                  >
                    {t.footer.spareParts}
                  </Link>
                </li>
                <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                  <ChevronRight className="w-4 h-4 " aria-hidden="true" />
                  <Link
                    href="/nos-marques"
                    className="hover:text-[#dc2626] transition-colors"
                  >
                    {t.footer.brands}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* NOS SOLUTIONS */}
          <div>
            <h4 className="font-semibold mb-4 text-[#dc2626] underline decoration-2 decoration-[#dc2626]">
              {t.footer.ourSolutions}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronsRight className="w-4 h-4 " />
                <Link href="/solutions" className="">
                  {t.solutions.manutention.title}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronsRight className="w-4 h-4 " />
                <Link href="/solutions" className="">
                  {t.solutions.rayonnage.title}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronsRight className="w-4 h-4 " />
                <Link href="/solutions" className="">
                  {t.solutions.levage.title}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronsRight className="w-4 h-4 " />
                <Link href="/solutions" className="">
                  {t.solutions.terrassement.title}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronsRight className="w-4 h-4 " />
                <Link href="/solutions" className="">
                  Portuaire
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronsRight className="w-4 h-4 " />
                <Link href="/solutions" className="">
                  Transport
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronsRight className="w-4 h-4 " />
                <Link href="/solutions" className="">
                  Enérgie
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronsRight className="w-4 h-4 " />
                <Link href="/solutions" className="">
                  Solutions par marques
                </Link>
              </li>
            </ul>
          </div>

          {/* LOCATION & SERVICES */}
          <div>
            <h4 className="font-semibold mb-4 text-[#dc2626] underline decoration-2 decoration-[#dc2626]">
              {t.footer.rental}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/location"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  {t.footer.shortLongRental}
                </Link>
              </li>
            </ul>
            <h4 className="font-semibold mb-4 text-[#dc2626] underline decoration-2 decoration-[#dc2626]">
              {t.footer.servicesSAV}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/sav#maintenance"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  {t.footer.maintenance}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/sav#reconditionnement"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  {t.footer.reconditioning}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/sav#formation"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  {t.footer.training}
                </Link>
              </li>
            </ul>
          </div>

          {/* À PROPOS & CONTACT */}
          <div className="sm:col-span-2 xl:col-span-1">
            <h4 className="font-semibold mb-4 text-[#dc2626] underline decoration-2 decoration-[#dc2626]">
              {t.footer.aboutForges}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/apropos"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  {t.footer.presentation}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/apropos#historique-vision"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  {t.footer.history}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/apropos"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  {t.footer.partners}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/apropos#nos-agences"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  {t.footer.agencies}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/politique-confidentialite"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/mentions-legales"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  {t.footer.legalNotice}
                </Link>
              </li>
              <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/cookies"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  {t.footer.cookies}
                </Link>
              </li>
              {/* <li className="flex items-center gap-2 hover:text-[#dc2626] transition-colors">
                <ChevronRight className="w-4 h-4 " />
                <Link
                  href="/carrieres"
                  className="hover:text-[#dc2626] transition-colors"
                >
                  Carrières
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="sm:col-span-2 xl:col-span-1">
            <h4 className="font-semibold mb-4 text-[#dc2626] underline decoration-2 decoration-[#dc2626]">
              CONTACT
            </h4>
            <address className="space-y-4 text-xs text-gray-200 not-italic">
              <div>
                <p className="font-semibold text-[#dc2626] mb-2">
                  Casablanca (siège)
                </p>
                <div className="leading-relaxed space-y-0.5">
                  <div>
                    Route 111, km 11.5 - Quartier Industriel Sidi Bernoussi Casablanca 20590 – Maroc
                  </div>
                  <div>
                    Tél :{" "}
                    <a
                      href="tel:+212522669850"
                      className="hover:text-[#dc2626]"
                    >
                      +212 522 669 850
                    </a>
                  </div>
                  <div>
                    E-mail :{" "}
                    <a
                      href="mailto:contact@forgesdebazas.com"
                      className="hover:text-[#dc2626]"
                    >
                      contact@forgesdebazas.com
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-semibold text-[#dc2626] mb-2">Agadir</p>
                <div className="leading-relaxed space-y-0.5">
                  <div>
                    LOT 55, TASSILA RP 40, DCHEIRA 80000 - Agadir
                  </div>
                  <div>
                    Tél :{" "}
                    <a
                      href="tel:+212608116363"
                      className="hover:text-[#dc2626]"
                    >
                      +212 608 116 363
                    </a>
                  </div>
                  <div>
                    E-mail :{" "}
                    <a
                      href="mailto:contact@forgesdebazas.com"
                      className="hover:text-[#dc2626]"
                    >
                      contact@forgesdebazas.com
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-semibold text-[#dc2626] mb-2">Tanger</p>
                <div className="leading-relaxed space-y-0.5">
                  <div>
                    LOT 211, ZI GZENAYA 90090 - Tanger
                  </div>
                  <div>
                    Tél :{" "}
                    <a
                      href="tel:+212608116262"
                      className="hover:text-[#dc2626]"
                    >
                      +212608116262
                    </a>
                  </div>
                  <div>
                    E-mail :{" "}
                    <a
                      href="mailto:contact@forgesdebazas.com"
                      className="hover:text-[#dc2626]"
                    >
                      contact@forgesdebazas.com
                    </a>
                  </div>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-gray-700 p-6 text-center text-sm text-gray-400 bg-[#1f1d1d]">
        <p>
          © {new Date().getFullYear()}, Forges de Bazas. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
