"use client";

import { useEffect, useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Send,
  FileText,
  MessageCircle,
  Mail,
  CheckCircle2,
  Building2,
  Phone,
  MapPin,
  Globe,
  Factory,
  Headphones,
  Handshake,
} from "lucide-react";
import { generateQuotePDF } from "@/utils/generatePdf";
import { products } from "@/data/productsData";

import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";

const QUOTE_CATEGORY_GROUPS = [
  {
    label: "BTP",
    categories: [
      { id: "pompes-beton", label: "Pompes à Béton" },
      { id: "centrales-beton", label: "Centrales à Béton" },
      { id: "centrales-enrobage", label: "Centrales d'Enrobage" },
      { id: "malaxeurs", label: "Malaxeurs" },
      { id: "excavation", label: "Excavation" },
      { id: "terrassement", label: "Terrassement & Routes" },
      { id: "grues", label: "Grues" },
      { id: "concassage", label: "Concassage" },
      { id: "concasseurs", label: "Concasseurs" },
      { id: "mines", label: "Mines & Carrières" },
      { id: "forage", label: "Forage" },
      { id: "foreuses", label: "Foreuses" },
      { id: "transport", label: "Transport" },
    ],
  },
  {
    label: "Manutention",
    categories: [
      { id: "chariots-elevateurs", label: "Chariot frontaux" },
      { id: "rayonnage-stockage", label: "Magasinage" },
      { id: "nacelles", label: "Nacelles" },
      { id: "chariots-telescopiques", label: "Chariots Télescopiques" },
      { id: "manutention-portuaire", label: "Manutention Portuaire" },
      { id: "solutions-automatisees", label: "Solutions Automatisées" },
    ],
  },
  {
    label: "Energie & Eclairage",
    categories: [
      { id: "groupes-electrogenes", label: "Groupes Électrogènes" },
      { id: "eclairage", label: "Éclairage" },
    ],
  },
] as const;

export default function DevisClient() {
  const { t, language } = useLanguage();

  // Keep quote categories aligned with available products, grouped in a business-friendly order.
  const availableCategoryGroups = useMemo(() => {
    const productCategories = new Set(
      products
        .filter((product) => product.available !== false)
        .map((product) => product.category)
    );

    return QUOTE_CATEGORY_GROUPS.map((group) => ({
      ...group,
      categories: group.categories.filter((category) =>
        productCategories.has(category.id)
      ),
    })).filter((group) => group.categories.length > 0);
  }, []);

  // Format category for display
  const formatCategory = (cat: string) => {
    const map: Record<string, string> = {
      "btp": "BTP",
      "energie-eclairage": "Energie & Eclairage",
      "chariots-elevateurs": "Chariot frontaux",
      "chariots-telescopiques": "Chariots Télescopiques",
      "groupes-electrogenes": "Groupes Électrogènes",
      "manutention-portuaire": "Manutention Portuaire",
      "rayonnage-stockage": "Rayonnage & Stockage",
      "solutions-automatisees": "Solutions Automatisées",
      "centrales-enrobage": "Centrales d'Enrobage",
      "concassage": "Concassage",
      "forage": "Forage",
      "foreuses": "Foreuses",
      "mines": "Mines & Carrières",
      "transport": "Transport",
      "pompes-beton": "Pompes à Béton",
      "chariotselevateurs": "Chariot frontaux",
      "grues": "Grues Mobiles",
      "terrassement": "Engins de Terrassement",
      "nacelles": "Nacelles",
      "generateurs": "Groupes Électrogènes",
      "excavation": "Excavation",
      "manutention": "Manutention",
      "malaxeurs": "Malaxeurs",
      "centrales-beton": "Centrales à Béton",
      "eclairage": "Éclairage",
      "concasseurs": "Concasseurs",
    };
    return map[cat] || cat.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  const serviceOptions = [
    {
      value: "achat",
      label:
        language === "fr"
          ? "Achat"
          : language === "es"
            ? "Compra"
            : "Purchase",
    },
    {
      value: "location",
      label:
        language === "fr"
          ? "Location"
          : language === "es"
            ? "Alquiler"
            : "Rental",
    },
    {
      value: "maintenance",
      label:
        language === "fr"
          ? "Maintenance / SAV"
          : language === "es"
            ? "Mantenimiento / Postventa"
            : "Maintenance / After-sales",
    },
    {
      value: "autre",
      label:
        language === "fr"
          ? "Autre service"
          : language === "es"
            ? "Otro servicio"
            : "Other service",
    },
  ];

  const formatServiceType = (serviceType: string) =>
    serviceOptions.find((option) => option.value === serviceType)?.label ||
    serviceType;

  const [formData, setFormData] = useState({
    serviceType: "",
    category: "",
    model: "",
    country: "",
    city: "",
    name: "",
    phone: "",
    email: "",
    company: "",
    timeframe: "",
    message: "",
    consent: false,
  });

  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    if (service === "location") {
      setFormData((prev) => ({ ...prev, serviceType: "location" }));
    }
  }, []);

  // Extract models based on selected category for autocomplete
  const availableModels = useMemo(() => {
    const models = new Set<string>();

    products.filter((product) => product.available !== false).forEach((product) => {
      if (
        formData.category &&
        formData.category !== "autre" &&
        product.category !== formData.category
      ) {
        return;
      }

      if (product.models) {
        product.models.forEach((model) => models.add(model));
      }
    });
    return Array.from(models).sort();
  }, [formData?.category]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteId, setQuoteId] = useState("");

  const devisInfos = `

ID Devis: ${quoteId}

1. ÉQUIPEMENT
Service: ${formData.serviceType ? formatServiceType(formData.serviceType) : "Non spécifié"}
Catégorie: ${formatCategory(formData.category) || formData.category}
Type: Non spécifié
Modèle: ${formData.model || "Non spécifié"}
  
2. LOCALISATION
Pays: ${formData.country}
Ville: ${formData.city}
  
3. CONTACT
Nom: ${formData.name}
Société: ${formData.company || "Non spécifiée"}
Téléphone: ${formData.phone}
Email: ${formData.email}
  
4. DÉTAILS
Délai: ${formData.timeframe}
Message:
${formData.message || "Aucun message supplémentaire"}

Cordialement,
${formData.name}
${formData.phone}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      // If category changes, reset the model to prevent invalid combinations
      if (name === "category" && prev.category !== value) {
        return { ...prev, [name]: value, model: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Generate Quote ID
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const quoteId = `DEVIS-${dateStr}-${randomSuffix}`;
    const submissionDate = new Date().toISOString();

    try {
      // const token = await executeRecaptcha("devis_submission"); // Removed

      // Save to Firestore
      await addDoc(collection(db, "devis"), {
        quoteId,
        date: submissionDate,
        // recaptchaToken: token, // Removed
        ...formData,
      });

      // Send data to Google Sheet (Legacy)
      // await fetch(
      //   `https://script.google.com/macros/s/${process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID}/exec`,
      //   {
      //     method: "POST",
      //     mode: "no-cors",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       quoteId,
      //       date: submissionDate,
      //       serviceType: formData.serviceType,
      //       category: formData.category,
      //       model: formData.model,
      //       country: formData.country,
      //       city: formData.city,
      //       name: formData.name,
      //       phone: formData.phone,
      //       email: formData.email,
      //       company: formData.company,
      //       timeframe: formData.timeframe,
      //       message: formData.message,
      //     }),
      //   }
      // );

      setQuoteId(quoteId);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form: ", error);
      // Handle error appropriately (maybe show a toast or alert)
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    generateQuotePDF(
      {
        ...formData,
        serviceType: formData.serviceType
          ? formatServiceType(formData.serviceType)
          : "",
      },
      quoteId
    );
  };

  const handleWhatsAppShare = () => {
    const date = new Date().toLocaleDateString("fr-FR");
    const message = `NOUVELLE DEMANDE DE DEVIS
  --------------------------------
  Date: ${date}
 
  ${devisInfos}
  
  --------------------------------
  envoyé depuis le site web`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/212664624738?text=${encodedMessage}`, "_blank");
  };

  const handleEmailShare = () => {
    const subject = `Demande de Devis - ${quoteId} - ${formData.company || formData.name
      }`;
    const body = `Bonjour,

${devisInfos}
`;
    window.open(
      `mailto:contact@forgesdebazas.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
  };

  return (
    <div
      className="min-h-screen bg-gray-50 pb-12 mt-20"
      style={{ paddingTop: "calc(var(--site-header-height, 140px) + 0.5rem)" }}
    >
      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 sm:py-14 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight text-balance">
              {t.devis.pageTitle}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t.devis.pageDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Why Choose Us */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-red-600 transition-all hover:shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {t.devis.whyChooseUs}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Factory className="text-red-600 mt-1 flex-shrink-0 w-5 h-5" />
                  <span className="text-gray-600">{t.devis.reason1}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Globe className="text-red-600 mt-1 flex-shrink-0 w-5 h-5" />
                  <span className="text-gray-600">{t.devis.reason2}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Headphones className="text-red-600 mt-1 flex-shrink-0 w-5 h-5" />
                  <span className="text-gray-600">{t.devis.reason3}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Handshake className="text-red-600 mt-1 flex-shrink-0 w-5 h-5" />
                  <span className="text-gray-600">{t.devis.reason4}</span>
                </li>
              </ul>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-red-600 transition-all hover:shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {t.devis.needHelp}
              </h3>
              <div className="space-y-5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{t.contact.phone}</p>
                    <p className="font-bold">+212 522 669 850</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{t.contact.email}</p>
                    <p className="font-bold">contact@forgesdebazas.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      {t.devis.headquarters}
                    </p>
                    <p className="font-bold text-sm">
                      {t.devis.headquartersAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2 order-first lg:order-none">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {!isSubmitted ? (
                <>
                  <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
                    {/* <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xl">
                      <Wrench className="w-6 h-6" />
                    </div> */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {t.devis.formTitle}
                      </h2>
                      <p className="text-gray-500">{t.devis.formSubtitle}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Step 1: Equipment */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm mr-2">
                          1
                        </span>
                        {t.devis.step1}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {language === "fr"
                              ? "Type de demande"
                              : language === "es"
                                ? "Tipo de solicitud"
                                : "Request type"}
                          </label>
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={(e) =>
                              handleSelectChange("serviceType", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            required
                          >
                            <option value="">
                              {language === "fr"
                                ? "Choisir un service"
                                : language === "es"
                                  ? "Elegir un servicio"
                                  : "Choose a service"}
                            </option>
                            {serviceOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.devis.category}
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={(e) =>
                              handleSelectChange("category", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            required
                          >
                            <option value="">
                              {t.devis.categoryPlaceholder}
                            </option>
                            {availableCategoryGroups.map((group) => (
                              <optgroup key={group.label} label={group.label}>
                                {group.categories.map((cat) => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.label}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                            <option value="autre">Autre</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.devis.model}
                          </label>
                          <input
                            type="text"
                            name="model"
                            list="models-list"
                            value={formData.model}
                            onChange={handleChange}
                            placeholder={t.devis.modelPlaceholder}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                          />
                          <datalist id="models-list">
                            {availableModels.map((model) => (
                              <option key={model} value={model} />
                            ))}
                          </datalist>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Location */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm mr-2">
                          2
                        </span>
                        {t.devis.step2}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.devis.country}
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={(e) =>
                              handleSelectChange("country", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            required
                          >
                            <option value="">
                              {t.devis.countryPlaceholder}
                            </option>
                            <option value="Maroc">Maroc</option>
                            <option value="Mauritanie">Mauritanie</option>
                            <option value="Senegal">Sénégal</option>
                            <option value={"Cote d'Ivoire"}>Côte d&apos;Ivoire</option>
                            <option value="Autre">Autre</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.devis.city}
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder={t.devis.cityPlaceholder}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Contact Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm mr-2">
                          3
                        </span>
                        {t.devis.step3}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.devis.name}
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t.devis.namePlaceholder}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.devis.company}
                          </label>
                          <div className="relative">
                            <Building2 className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder={t.devis.companyPlaceholder}
                              className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.devis.phone}
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t.devis.phonePlaceholder}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.devis.email}
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t.devis.emailPlaceholder}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 4: Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm mr-2">
                          4
                        </span>
                        {t.devis.step4}
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.devis.timeframe}
                        </label>
                        <select
                          name="timeframe"
                          value={formData.timeframe}
                          onChange={(e) =>
                            handleSelectChange("timeframe", e.target.value)
                          }
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                          required
                        >
                          <option value="">
                            {t.devis.timeframePlaceholder}
                          </option>
                          <option value="urgent">
                            Urgent (Moins d&apos;un mois)
                          </option>
                          <option value="1-3mois">1 à 3 mois</option>
                          <option value="3-6mois">3 à 6 mois</option>
                          <option value="budget">Budgetisation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.devis.message}
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder={t.devis.messagePlaceholder}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Consent */}
                    <div className="flex items-start space-x-3 pt-4 border-t border-gray-200">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        required
                      />
                      <div className="text-sm text-gray-600">
                        <p>{t.devis.consentDesc}</p>
                        <Link
                          href="/politique-confidentialite"
                          className="text-red-600 hover:underline"
                        >
                          {t.devis.privacyPolicy}
                        </Link>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <span>{t.devis.submitBtn}</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {t.devis.successTitle}
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {t.devis.successDesc}
                  </p>

                  <div className="bg-gray-50 p-6 rounded-xl mb-8 max-w-sm mx-auto">
                    <p className="text-sm text-gray-500 mb-1">ID Devis</p>
                    <p className="text-2xl font-mono font-bold text-gray-900 tracking-wider">
                      {quoteId}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-4 max-w-sm mx-auto">
                    <button
                      onClick={handleDownloadPDF}
                      className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center space-x-2"
                    >
                      <FileText className="w-5 h-5" />
                      <span>{t.devis.downloadPdf}</span>
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={handleWhatsAppShare}
                        className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold hover:bg-[#128C7E] transition-all flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{t.devis.shareWhatsapp}</span>
                      </button>
                      <button
                        onClick={handleEmailShare}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
                      >
                        <Mail className="w-5 h-5" />
                        <span>{t.devis.shareEmail}</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {t.devis.shareNote}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        serviceType: "",
                        category: "",
                        model: "",
                        country: "",
                        city: "",
                        name: "",
                        phone: "",
                        email: "",
                        company: "",
                        timeframe: "",
                        message: "",
                        consent: false,
                      });
                    }}
                    className="mt-8 text-gray-500 hover:text-gray-900 underline"
                  >
                    {t.devis.newRequest}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
