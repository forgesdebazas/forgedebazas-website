"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Phone,
  Mail,
  Search,
  Menu,
  X,
  Clock,
  ChevronDown,
  ChevronRight,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { brands } from "@/data/brands";
import dynamic from "next/dynamic";
import { toBrandSlug } from "@/lib/slug";
import ReclamationModal from "./ReclamationModal";

const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });
const LanguageSwitcher = dynamic(() => import("./LanguageSwitcher"), {
  ssr: false,
});

export default function HeaderInfo() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isReclamationOpen, setIsReclamationOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(
    null
  );
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const desktopNavRef = useRef<HTMLElement | null>(null);
  const desktopMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const cancelDesktopMenuClose = () => {
    if (desktopMenuCloseTimer.current) {
      clearTimeout(desktopMenuCloseTimer.current);
      desktopMenuCloseTimer.current = null;
    }
  };
  const scheduleDesktopMenuClose = () => {
    cancelDesktopMenuClose();
    desktopMenuCloseTimer.current = setTimeout(() => {
      setOpenDesktopMenu(null);
    }, 150);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setMobileSubMenuOpen(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileSubMenuOpen(null);
    setOpenDesktopMenu(null);
  }, [pathname]);

  // Close desktop dropdowns on click outside / Escape
  useEffect(() => {
    if (!openDesktopMenu) return;
    const handleDocumentDown = (event: MouseEvent | TouchEvent) => {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(event.target as Node)
      ) {
        setOpenDesktopMenu(null);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDesktopMenu(null);
    };
    document.addEventListener("mousedown", handleDocumentDown);
    document.addEventListener("touchstart", handleDocumentDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleDocumentDown);
      document.removeEventListener("touchstart", handleDocumentDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [openDesktopMenu]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure header height and expose as CSS variable for spacing adjustments
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setHeaderHeight = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${h}px`
      );
    };

    setHeaderHeight();

    // ResizeObserver catches layout changes from async image loads, font swaps,
    // and viewport rotations — covers the case where the initial measurement
    // happens before the logo image has loaded on mobile.
    const observer = new ResizeObserver(setHeaderHeight);
    observer.observe(el);

    window.addEventListener("resize", setHeaderHeight);
    window.addEventListener("orientationchange", setHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", setHeaderHeight);
      window.removeEventListener("orientationchange", setHeaderHeight);
    };
  }, []);

  const navigationItems = [
    { label: t.nav.home, href: "/" },
    {
      label: t.nav.products,
      href: "/produits",
      subItems: [
        { label: t.nav.allproducts, href: "/produits" },
        // {
        //   label: "Produits SANY",
        //   href: "/marque/sany#catalogue-sany-officiel",
        // },
        { label: t.footer.newEquipment, href: "/produits" },
        { label: t.footer.usedEquipment, href: "#" },
        { label: t.footer.spareParts, href: "#" },
      ],
    },
    {
      label: t.nav.brands,
      // Dropdown uniquement (pas de navigation au clic)
      href: "/nos-marques",
      subItems: [
        { label: t.products.allBrands, href: "/nos-marques" },
        ...brands.map((brand) => ({
          label: brand.name,
          href: `/marque/${toBrandSlug(brand.name)}`,
        })),
      ],
    },
    {
      label: t.nav.solutions,
      href: "/solutions",
      subItems: [
        {
          label: t.nav.allSolutions,
          href: "/solutions",
        },
        {
          label: t.solutions.manutention.title,
          href: "/solutions/manutention",
        },
        { label: t.solutions.rayonnage.title, href: "/solutions/rayonnage" },
        { label: t.solutions.automated.title, href: "/solutions/solutions-automatisees" },
        { label: t.solutions.levage.title, href: "/solutions/levage" },
        {
          label: t.solutions.terrassement.title,
          href: "/solutions/terrassement",
        },
        {
          label: t.solutionDetails.mines.title, href: "/solutions/mines"
        },
        { label: t.solutionDetails.portuaires.title, href: "/solutions/portuaire" },
        { label: t.solutionDetails.transport.title, href: "/solutions/transport" },
        { label: t.solutionDetails.energie.title, href: "/solutions/energie" },
        { label: t.solutions.brandSolutions, href: "/solutions#solutions-par-marques" },
      ],
    },
    {
      label: t.nav.rental,
      href: "/location",
      subItems: [{ label: t.footer.shortLongRental, href: "/location" }],
    },
    {
      label: t.nav.services,
      href: "/sav",
      subItems: [
        {
          label: t.nav.allServandSav,
          href: "/sav",
        },
        { label: t.footer.maintenance, href: "/sav#maintenance" },
        { label: t.footer.reconditioning, href: "/sav#reconditionnement" },
        { label: t.footer.training, href: "/sav#formation" },
      ],
    },
    {
      label: t.nav.about,
      href: "/apropos",
      subItems: [
        { label: t.footer.presentation, href: "/apropos" },
        { label: t.footer.history, href: "/apropos#historique-vision" },
        { label: t.aboutPage.qseTitle, href: "/apropos#qse" },
        { label: t.footer.partners, href: "/apropos#nos-marques-partenaires" },
        { label: t.footer.agencies, href: "/apropos#nos-agences" },
        { label: t.footer.careers, href: "/apropos#carrieres" },
      ],
    },
    { label: t.nav.news, href: "/actualites" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const isBrandsRoute =
    pathname.startsWith("/marque") || pathname.startsWith("/nos-marques");

  const isActive = (href: string) => {
    if (href === "#") {
      return false;
    }
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMobileSubMenu = (label: string) => {
    setMobileSubMenuOpen(mobileSubMenuOpen === label ? null : label);
  };

  return (
    <header
      ref={headerRef}
      className="w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Top Bar */}
      <div
        className={`w-full text-white border-b border-gray-200 transition-all duration-300 ${isScrolled ? "bg-[#171616]" : "bg-[#171616]/80 backdrop-blur-md"
          }`}
      >
        {/* Mobile: Animated scrolling contact info */}
        <div className="md:hidden">
          <div className="overflow-hidden py-3 px-4">
            <div className="flex gap-6 scroll-animate whitespace-nowrap">
              <div className="flex items-center gap-2 shrink-0">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-xs">+212 522 669 850</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Mail className="w-4 h-4 text-red-600" />
                <span className="text-xs">contact@forgesdebazas.com</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="text-xs">{t.contact.schedule}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-xs">+212 522 669 850</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Mail className="w-4 h-4 text-red-600" />
                <span className="text-xs">contact@forgesdebazas.com</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="text-xs">{t.contact.schedule}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Static layout */}
        <div className="hidden md:flex items-center text-white py-3 justify-between gap-4 px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-600" />
              <span className="text-sm whitespace-nowrap">
                +212 522 669 850
              </span>
            </div>
            <div className="flex items-center gap-2 border-l border-r border-gray-300 px-4">
              <Mail className="w-4 h-4 text-red-600" />
              <span className="text-sm whitespace-nowrap">
                contact@forgesdebazas.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600" />
              <span className="text-sm whitespace-nowrap">
                {t.contact.schedule}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/share/18HS5UCLzA/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/forgesdebazas?igsh=MTFxYmVrdmY0emFkcQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            {/* <a
              href="#"
              className="hover:text-red-500 transition-colors duration-200"
              aria-label="Youtube"
            >
              <Youtube className="w-5 h-5" />
            </a> */}
            <a
              href="https://www.linkedin.com/company/forges-de-bazas/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`border-b border-gray-200 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-md"
          }`}
      >
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between py-1">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/images/Logo_black.png"
                alt="Forges de Bazas Logo"
                width={150}
                height={150}
                className="object-contain w-[150px] h-auto"
                priority
                quality={70}
                unoptimized
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              ref={desktopNavRef}
              className="hidden lg:flex items-center gap-3 xl:gap-5 flex-nowrap"
              aria-label="Main navigation"
            >
              {navigationItems.map((item) => {
                const isOpen = openDesktopMenu === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative shrink-0"
                    onMouseEnter={() => {
                      if (!item.subItems) return;
                      cancelDesktopMenuClose();
                      setOpenDesktopMenu(item.label);
                    }}
                    onMouseLeave={() => {
                      if (!item.subItems) return;
                      scheduleDesktopMenuClose();
                    }}
                  >
                    {item.subItems && item.href === "#" ? (
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDesktopMenu(isOpen ? null : item.label)
                        }
                        className={`whitespace-nowrap uppercase font-medium text-[13px] transition-colors relative pb-1 flex items-center gap-1 ${isBrandsRoute
                          ? "text-[#dc2626]"
                          : "text-black hover:text-[#dc2626]"
                          }`}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                          aria-hidden="true"
                        />
                        <span
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#dc2626] transition-opacity ${isBrandsRoute || isOpen
                            ? "opacity-100"
                            : "opacity-0"
                            }`}
                        ></span>
                      </button>
                    ) : item.subItems ? (
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={() => setOpenDesktopMenu(null)}
                          className={`whitespace-nowrap uppercase font-medium text-[13px] transition-colors relative pb-1 flex items-center ${isActive(item.href)
                            ? "text-[#dc2626]"
                            : "text-black hover:text-[#dc2626]"
                            }`}
                          aria-haspopup="true"
                          aria-expanded={isOpen}
                        >
                          {item.label}
                          <span
                            className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#dc2626] transition-opacity ${isActive(item.href) || isOpen
                              ? "opacity-100"
                              : "opacity-0"
                              }`}
                          ></span>
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDesktopMenu(isOpen ? null : item.label)
                          }
                          className={`p-1 -mr-1 ${isActive(item.href)
                            ? "text-[#dc2626]"
                            : "text-black hover:text-[#dc2626]"
                            }`}
                          aria-label={`Toggle ${item.label} submenu`}
                          aria-expanded={isOpen}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                              }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`whitespace-nowrap uppercase font-medium text-[13px] transition-colors relative pb-1 flex items-center gap-1 ${isActive(item.href)
                          ? "text-[#dc2626]"
                          : "text-black hover:text-[#dc2626]"
                          }`}
                      >
                        {item.label}
                        <span
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#dc2626] transition-opacity ${isActive(item.href)
                            ? "opacity-100"
                            : "opacity-0 hover:opacity-100"
                            }`}
                        ></span>
                      </Link>
                    )}

                    {item.subItems && (
                      <div
                        className={`absolute top-full left-0 pt-2 w-64 transition-all duration-200 z-50 ${isOpen
                          ? "opacity-100 visible translate-y-0 pointer-events-auto"
                          : "opacity-0 invisible translate-y-2 pointer-events-none"
                          }`}
                        role="menu"
                      >
                        <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                          {item.subItems.map((subItem, index) => (
                            <Link
                              key={index}
                              href={subItem.href}
                              onClick={() => setOpenDesktopMenu(null)}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#dc2626] transition-colors border-b border-gray-50 last:border-none"
                              role="menuitem"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right side - Search, Language, CTA */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600 hover:text-[#dc2626] transition-colors p-2"
                aria-label={t.common.search}
              >
                <Search className="w-5 h-5" />
              </button>

              <LanguageSwitcher />

              {/* Réclamation Button – Desktop */}
              <button
                onClick={() => setIsReclamationOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white px-3 md:px-4 py-2 font-medium text-xs md:text-sm transition-colors duration-200"
                aria-label={t.reclamation.buttonLabel}
              >
                {t.reclamation.buttonLabel}
              </button>

              <Link
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-3 md:px-6 py-2 rounded-none font-medium text-xs md:text-sm hidden sm:inline-flex"
                href="/devis"
              >
                {t.nav.requestQuote}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-gray-600 hover:text-[#dc2626] transition-colors p-2"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        style={{
          top: "var(--site-header-height)",
          maxHeight: "calc(100vh - var(--site-header-height))",
        }}
        className={`lg:hidden fixed left-0 right-0 bg-white shadow-xl transition-all duration-300 ease-in-out overflow-y-auto ${isMobileMenuOpen
          ? "opacity-100 max-h-[calc(100vh-var(--site-header-height))] pointer-events-auto"
          : "opacity-0 max-h-0 pointer-events-none"
          }`}
      >
        <nav className="py-4" aria-label="Mobile navigation">
          {navigationItems.map((item) => (
            <div key={item.label} className="border-b border-gray-100">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMobileSubMenu(item.label)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                    aria-expanded={mobileSubMenuOpen === item.label}
                  >
                    <span>{item.label}</span>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform duration-200 ${mobileSubMenuOpen === item.label ? "rotate-90" : ""
                        }`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${mobileSubMenuOpen === item.label
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                      }`}
                    role="menu"
                  >
                    <div className="bg-gray-50 py-2">
                      {item.subItems.map((subItem, index) => (
                        <Link
                          key={index}
                          href={subItem.href}
                          className="block px-10 py-3 text-sm text-gray-700 hover:text-[#dc2626] hover:bg-white transition-colors"
                          role="menuitem"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`block px-6 py-4 font-medium transition-colors ${isActive(item.href)
                    ? "text-[#dc2626] bg-red-50"
                    : "text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTA Buttons */}
          <div className="px-6 pt-4 space-y-3 pb-6">
            {/* Mobile Réclamation */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsReclamationOpen(true);
              }}
              className="flex items-center justify-center gap-2 w-full border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white px-6 py-3 font-medium text-sm transition-colors"
            >
              {t.reclamation.buttonLabel}
            </button>
            <Link
              href="/devis"
              className="block w-full text-center bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-3 rounded-none font-medium text-sm transition-colors"
            >
              {t.nav.requestQuote}
            </Link>
          </div>
        </nav>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <ReclamationModal
        isOpen={isReclamationOpen}
        onClose={() => setIsReclamationOpen(false)}
      />
    </header>
  );
}
