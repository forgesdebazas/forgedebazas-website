"use client";

import { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronDown,
  CheckCircle2,
  Loader2,
  Send,
  X,
  AlertCircle,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Calendar,
  Building2,
  Upload,
  FileText,
  Trash2,
} from "lucide-react";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/data/translations";

// ─── Types ───────────────────────────────────────────────────────────────────
interface JobOffer {
  id: string;
  titre: string;
  titreEn?: string;
  titreEs?: string;
  departement: string;
  departementEn?: string;
  departementEs?: string;
  lieu: string;
  lieuEn?: string;
  lieuEs?: string;
  type: string; // ex: CDI, CDD, Stage
  description: string;
  descriptionEn?: string;
  descriptionEs?: string;
  competences: string[];
  competencesEn?: string[];
  competencesEs?: string[];
  datePublication?: string;
  actif?: boolean;
}

type ApplicationForm = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  ville: string;
  niveauEtudes: string;
  experience: string;
  lettreMotivation: string;
};

const initialForm: ApplicationForm = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  ville: "",
  niveauEtudes: "",
  experience: "",
  lettreMotivation: "",
};


const typeBadge: Record<string, string> = {
  CDI: "bg-green-100 text-green-700 border-green-200",
  CDD: "bg-blue-100 text-blue-700 border-blue-200",
  Stage: "bg-amber-100 text-amber-700 border-amber-200",
  Alternance: "bg-purple-100 text-purple-700 border-purple-200",
};

const careerCopy = {
  fr: {
    modalBadge: "Formulaire de candidature",
    successTitle: "Candidature envoyée !",
    successDesc:
      "Merci pour votre intérêt. Notre équipe RH examinera votre dossier et vous contactera dans les meilleurs délais.",
    close: "Fermer",
    errorSubmit: "Une erreur s'est produite. Veuillez réessayer.",
    retry: "Réessayer",
    personalInfo: "Informations personnelles",
    lastName: "Nom *",
    firstName: "Prénom *",
    email: "Email *",
    phone: "Téléphone *",
    city: "Ville",
    yourLastName: "Votre nom",
    yourFirstName: "Votre prénom",
    yourCity: "Votre ville de résidence",
    careerPath: "Parcours professionnel",
    education: "Niveau d'études *",
    experience: "Années d'expérience",
    choose: "-- Choisir --",
    beginner: "Débutant (moins de 1 an)",
    exp1to3: "1 - 3 ans",
    exp3to5: "3 - 5 ans",
    exp5to10: "5 - 10 ans",
    exp10plus: "Plus de 10 ans",
    cv: "Curriculum Vitae *",
    uploadCv: "Cliquez pour téléverser votre CV",
    cvHelp: "PDF, DOC ou DOCX - max 5 Mo",
    deleteCv: "Supprimer le CV",
    motivation: "Lettre de motivation",
    motivationPlaceholder:
      "Expliquez en quelques lignes pourquoi vous souhaitez rejoindre Forges de Bazas pour ce poste...",
    requiredFields: "* Champs obligatoires",
    submit: "Envoyer la candidature",
    sending: "Envoi...",
    uploadingCv: "Téléversement du CV...",
    savingApplication: "Enregistrement de la candidature...",
    required: "Requis",
    invalidEmail: "Email invalide",
    minMotivation: "Minimum 30 caractères",
    cvRequired: "CV requis",
    acceptedFormat: "Format accepté : PDF, DOC, DOCX",
    fileTooLarge: "Fichier trop volumineux (max 5 Mo)",
    readLess: "Réduire",
    readMore: "Voir plus",
    applyNow: "Postuler maintenant",
    heroBadge: "Rejoignez-nous",
    heroTitlePrefix: "Construisez votre",
    heroTitleHighlight: "carrière",
    heroTitleSuffix: "avec Forges de Bazas",
    heroDescription:
      "Rejoignez une équipe passionnée par l'excellence industrielle. Découvrez nos opportunités et donnez un nouvel élan à votre parcours professionnel.",
    viewOffers: "Voir les offres",
    whyJoin: "Pourquoi nous rejoindre ?",
    benefits: [
      {
        title: "Évolution de carrière",
        desc: "Des parcours clairs avec des opportunités d'évolution internes.",
      },
      {
        title: "Formation continue",
        desc: "Programmes de formation pour développer vos compétences.",
      },
      {
        title: "Équipe soudée",
        desc: "Un environnement collaboratif et bienveillant.",
      },
      {
        title: "Projets stimulants",
        desc: "Des missions variées dans un secteur en pleine croissance.",
      },
    ],
    allDepartments: "Tous",
    offersTitle: "Nos offres d'emploi",
    offerCount: (count: number) =>
      `${count} offre${count !== 1 ? "s" : ""} disponible${count !== 1 ? "s" : ""}`,
    loadingOffers: "Chargement des offres...",
    noOffers: "Aucune offre dans ce département pour le moment.",
    dateLocale: "fr-FR",
  },
  en: {
    modalBadge: "Application form",
    successTitle: "Application sent!",
    successDesc:
      "Thank you for your interest. Our HR team will review your application and contact you as soon as possible.",
    close: "Close",
    errorSubmit: "An error occurred. Please try again.",
    retry: "Try again",
    personalInfo: "Personal information",
    lastName: "Last name *",
    firstName: "First name *",
    email: "Email *",
    phone: "Phone *",
    city: "City",
    yourLastName: "Your last name",
    yourFirstName: "Your first name",
    yourCity: "Your city of residence",
    careerPath: "Professional background",
    education: "Education level *",
    experience: "Years of experience",
    choose: "-- Choose --",
    beginner: "Beginner (less than 1 year)",
    exp1to3: "1 - 3 years",
    exp3to5: "3 - 5 years",
    exp5to10: "5 - 10 years",
    exp10plus: "More than 10 years",
    cv: "Resume *",
    uploadCv: "Click to upload your resume",
    cvHelp: "PDF, DOC or DOCX - max 5 MB",
    deleteCv: "Remove resume",
    motivation: "Cover letter",
    motivationPlaceholder:
      "Explain in a few lines why you would like to join Forges de Bazas for this position...",
    requiredFields: "* Required fields",
    submit: "Send application",
    sending: "Sending...",
    uploadingCv: "Uploading resume...",
    savingApplication: "Saving application...",
    required: "Required",
    invalidEmail: "Invalid email",
    minMotivation: "Minimum 30 characters",
    cvRequired: "Resume required",
    acceptedFormat: "Accepted format: PDF, DOC, DOCX",
    fileTooLarge: "File too large (max 5 MB)",
    readLess: "Show less",
    readMore: "Read more",
    applyNow: "Apply now",
    heroBadge: "Join us",
    heroTitlePrefix: "Build your",
    heroTitleHighlight: "career",
    heroTitleSuffix: "with Forges de Bazas",
    heroDescription:
      "Join a team passionate about industrial excellence. Discover our opportunities and give your professional journey new momentum.",
    viewOffers: "View openings",
    whyJoin: "Why join us?",
    benefits: [
      {
        title: "Career growth",
        desc: "Clear career paths with internal growth opportunities.",
      },
      {
        title: "Continuous training",
        desc: "Training programs to develop your skills.",
      },
      {
        title: "United team",
        desc: "A collaborative and supportive environment.",
      },
      {
        title: "Stimulating projects",
        desc: "Varied assignments in a growing sector.",
      },
    ],
    allDepartments: "All",
    offersTitle: "Current job openings",
    offerCount: (count: number) => `${count} opening${count !== 1 ? "s" : ""} available`,
    loadingOffers: "Loading openings...",
    noOffers: "No openings in this department at the moment.",
    dateLocale: "en-US",
  },
  es: {
    modalBadge: "Formulario de candidatura",
    successTitle: "Candidatura enviada!",
    successDesc:
      "Gracias por su interés. Nuestro equipo de RR. HH. revisará su expediente y le contactará lo antes posible.",
    close: "Cerrar",
    errorSubmit: "Se ha producido un error. Inténtelo de nuevo.",
    retry: "Intentar de nuevo",
    personalInfo: "Información personal",
    lastName: "Apellido *",
    firstName: "Nombre *",
    email: "Email *",
    phone: "Teléfono *",
    city: "Ciudad",
    yourLastName: "Su apellido",
    yourFirstName: "Su nombre",
    yourCity: "Su ciudad de residencia",
    careerPath: "Trayectoria profesional",
    education: "Nivel de estudios *",
    experience: "Años de experiencia",
    choose: "-- Elegir --",
    beginner: "Principiante (menos de 1 año)",
    exp1to3: "1 - 3 años",
    exp3to5: "3 - 5 años",
    exp5to10: "5 - 10 años",
    exp10plus: "Más de 10 años",
    cv: "Currículum Vitae *",
    uploadCv: "Haga clic para subir su CV",
    cvHelp: "PDF, DOC o DOCX - máx. 5 MB",
    deleteCv: "Eliminar CV",
    motivation: "Carta de motivación",
    motivationPlaceholder:
      "Explique en unas líneas por qué desea unirse a Forges de Bazas para este puesto...",
    requiredFields: "* Campos obligatorios",
    submit: "Enviar candidatura",
    sending: "Enviando...",
    uploadingCv: "Subiendo CV...",
    savingApplication: "Guardando candidatura...",
    required: "Obligatorio",
    invalidEmail: "Email no válido",
    minMotivation: "Mínimo 30 caracteres",
    cvRequired: "CV obligatorio",
    acceptedFormat: "Formato aceptado: PDF, DOC, DOCX",
    fileTooLarge: "Archivo demasiado grande (máx. 5 MB)",
    readLess: "Reducir",
    readMore: "Ver más",
    applyNow: "Postular ahora",
    heroBadge: "Únase a nosotros",
    heroTitlePrefix: "Construya su",
    heroTitleHighlight: "carrera",
    heroTitleSuffix: "con Forges de Bazas",
    heroDescription:
      "Únase a un equipo apasionado por la excelencia industrial. Descubra nuestras oportunidades y dé un nuevo impulso a su trayectoria profesional.",
    viewOffers: "Ver ofertas",
    whyJoin: "Por qué unirse a nosotros?",
    benefits: [
      {
        title: "Desarrollo profesional",
        desc: "Trayectorias claras con oportunidades de evolución interna.",
      },
      {
        title: "Formación continua",
        desc: "Programas de formación para desarrollar sus competencias.",
      },
      {
        title: "Equipo unido",
        desc: "Un entorno colaborativo y solidario.",
      },
      {
        title: "Proyectos estimulantes",
        desc: "Misiones variadas en un sector en crecimiento.",
      },
    ],
    allDepartments: "Todos",
    offersTitle: "Nuestras ofertas de empleo",
    offerCount: (count: number) => `${count} oferta${count !== 1 ? "s" : ""} disponible${count !== 1 ? "s" : ""}`,
    loadingOffers: "Cargando ofertas...",
    noOffers: "No hay ofertas en este departamento por el momento.",
    dateLocale: "es-ES",
  },
} as const;

const getLocalizedOfferText = (
  offer: JobOffer,
  field: "titre" | "departement" | "lieu" | "description",
  language: Language
) => {
  const suffix = language === "en" ? "En" : language === "es" ? "Es" : "";
  const localizedKey = `${field}${suffix}` as keyof JobOffer;
  const value = suffix ? offer[localizedKey] : offer[field];
  return typeof value === "string" && value.trim() ? value : offer[field];
};

const getLocalizedSkills = (offer: JobOffer, language: Language) => {
  if (language === "en" && offer.competencesEn?.length) return offer.competencesEn;
  if (language === "es" && offer.competencesEs?.length) return offer.competencesEs;
  return offer.competences || [];
};


function ApplicationModal({
  offer,
  onClose,
  copy,
  language,
}: {
  offer: JobOffer;
  onClose: () => void;
  copy: (typeof careerCopy)[Language];
  language: Language;
}) {
  const [form, setForm] = useState<ApplicationForm>(initialForm);
  const [errors, setErrors] = useState<Partial<ApplicationForm> & { cv?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [cv, setCv] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const cvInputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_CV_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const MAX_CV_SIZE = 5 * 1024 * 1024; // 5 MB

  const validate = (): boolean => {
    const e: Partial<ApplicationForm> & { cv?: string } = {};
    if (!form.nom.trim()) e.nom = copy.required;
    if (!form.prenom.trim()) e.prenom = copy.required;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = copy.invalidEmail;
    if (!form.telephone.trim()) e.telephone = copy.required;
    if (!form.niveauEtudes) e.niveauEtudes = copy.required;
    if (!form.lettreMotivation.trim() || form.lettreMotivation.length < 30)
      e.lettreMotivation = copy.minMotivation;
    if (!cv) e.cv = copy.cvRequired;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_CV_TYPES.includes(file.type)) {
      setErrors((p) => ({ ...p, cv: copy.acceptedFormat }));
      setCv(null);
      if (cvInputRef.current) cvInputRef.current.value = "";
      return;
    }
    if (file.size > MAX_CV_SIZE) {
      setErrors((p) => ({ ...p, cv: copy.fileTooLarge }));
      setCv(null);
      if (cvInputRef.current) cvInputRef.current.value = "";
      return;
    }
    setErrors((p) => ({ ...p, cv: undefined }));
    setCv(file);
  };

  const removeCv = () => {
    setCv(null);
    if (cvInputRef.current) cvInputRef.current.value = "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof ApplicationForm])
      setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const uploadCvToCloudinary = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      throw new Error("Configuration Cloudinary manquante.");
    }
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", uploadPreset);
    fd.append("folder", `cvs/${offer.id}`);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: "POST", body: fd }
    );
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Cloudinary upload failed: ${txt}`);
    }
    return (await res.json()) as {
      secure_url: string;
      public_id: string;
      bytes: number;
      original_filename: string;
      format: string;
      resource_type: string;
    };
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      let cvUrl = "";
      let cvPublicId = "";
      let cvName = "";
      if (cv) {
        setUploadProgress(copy.uploadingCv);
        const result = await uploadCvToCloudinary(cv);
        cvUrl = result.secure_url;
        cvPublicId = result.public_id;
        cvName = cv.name;
      }
      setUploadProgress(copy.savingApplication);
      await addDoc(collection(db, "candidatures"), {
        ...form,
        offreId: offer.id,
        offreTitre: getLocalizedOfferText(offer, "titre", language),
        departement: getLocalizedOfferText(offer, "departement", language),
        lieu: getLocalizedOfferText(offer, "lieu", language),
        cvUrl,
        cvPublicId,
        cvName,
        statut: "Nouvelle candidature",
        createdAt: serverTimestamp(),
      });
      setUploadProgress("");
      setStatus("success");
    } catch (err) {
      console.error("Erreur de candidature :", err);
      setUploadProgress("");
      setStatus("error");
    }
  };

  const inputClass = (field: keyof ApplicationForm) =>
    `w-full border px-3 py-2.5 text-sm rounded focus:outline-none focus:ring-2 focus:ring-[#dc2626] transition ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-300"
    }`;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full sm:max-w-2xl max-h-[95vh] overflow-y-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#dc2626] to-[#991b1b] px-6 py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-red-200 text-xs font-medium uppercase tracking-widest mb-1">
                {copy.modalBadge}
              </p>
              <h2 className="text-white font-bold text-base sm:text-lg leading-tight">
                {getLocalizedOfferText(offer, "titre", language)}
              </h2>
              <div className="flex items-center gap-3 mt-1.5 text-red-100 text-xs">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {getLocalizedOfferText(offer, "departement", language)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {getLocalizedOfferText(offer, "lieu", language)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          {status === "success" ? (
            <div className="flex flex-col items-center py-10 text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{copy.successTitle}</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                {copy.successDesc}
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-8 py-2.5 text-sm font-semibold transition"
              >
                {copy.close}
              </button>
            </div>
          ) : status === "error" ? (
            <div className="flex flex-col items-center py-8 text-center gap-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
              <p className="text-gray-600 text-sm">
                {copy.errorSubmit}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="bg-[#dc2626] text-white px-6 py-2 text-sm transition hover:bg-[#b91c1c]"
              >
                {copy.retry}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Personal info */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#dc2626] mb-3">
                  {copy.personalInfo}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{copy.lastName}</label>
                    <input
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      placeholder={copy.yourLastName}
                      className={inputClass("nom")}
                    />
                    {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{copy.firstName}</label>
                    <input
                      name="prenom"
                      value={form.prenom}
                      onChange={handleChange}
                      placeholder={copy.yourFirstName}
                      className={inputClass("prenom")}
                    />
                    {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{copy.email}</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="exemple@email.com"
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{copy.phone}</label>
                    <input
                      name="telephone"
                      type="tel"
                      value={form.telephone}
                      onChange={handleChange}
                      placeholder="+212 6XX XXX XXX"
                      className={inputClass("telephone")}
                    />
                    {errors.telephone && (
                      <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">{copy.city}</label>
                    <input
                      name="ville"
                      value={form.ville}
                      onChange={handleChange}
                      placeholder={copy.yourCity}
                      className={inputClass("ville")}
                    />
                  </div>
                </div>
              </div>

              {/* Parcours */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#dc2626] mb-3">
                  {copy.careerPath}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {copy.education}
                    </label>
                    <select
                      name="niveauEtudes"
                      value={form.niveauEtudes}
                      onChange={handleChange}
                      className={inputClass("niveauEtudes")}
                    >
                      <option value="">{copy.choose}</option>
                      <option>Bac</option>
                      <option>Bac+2 / BTS / DUT</option>
                      <option>Bac+3 / Licence</option>
                      <option>Bac+5 / Master / Ingénieur</option>
                      <option>Doctorat</option>
                    </select>
                    {errors.niveauEtudes && (
                      <p className="text-red-500 text-xs mt-1">{errors.niveauEtudes}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {copy.experience}
                    </label>
                    <select
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      className={inputClass("experience")}
                    >
                      <option value="">{copy.choose}</option>
                      <option>{copy.beginner}</option>
                      <option>{copy.exp1to3}</option>
                      <option>{copy.exp3to5}</option>
                      <option>{copy.exp5to10}</option>
                      <option>{copy.exp10plus}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* CV */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#dc2626] mb-3">
                  {copy.cv}
                </p>
                {cv ? (
                  <div className="flex items-center justify-between gap-3 border border-gray-200 bg-gray-50 rounded px-3 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-5 h-5 text-[#dc2626] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{cv.name}</p>
                        <p className="text-xs text-gray-500">
                          {(cv.size / 1024).toFixed(0)} Ko
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeCv}
                      className="text-gray-400 hover:text-red-600 transition shrink-0 p-1"
                      aria-label={copy.deleteCv}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="cv-upload"
                    className={`flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed rounded px-4 py-6 transition ${errors.cv
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 hover:border-[#dc2626] hover:bg-red-50/30"
                      }`}
                  >
                    <Upload className="w-6 h-6 text-[#dc2626]" />
                    <p className="text-sm font-medium text-gray-700">
                      {copy.uploadCv}
                    </p>
                    <p className="text-xs text-gray-500">{copy.cvHelp}</p>
                  </label>
                )}
                <input
                  id="cv-upload"
                  ref={cvInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleCvChange}
                  className="hidden"
                />
                {errors.cv && <p className="text-red-500 text-xs mt-1">{errors.cv}</p>}
              </div>

              {/* Lettre */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#dc2626] mb-3">
                  {copy.motivation}
                </p>
                <textarea
                  name="lettreMotivation"
                  value={form.lettreMotivation}
                  onChange={handleChange}
                  rows={5}
                  placeholder={copy.motivationPlaceholder}
                  className={`${inputClass("lettreMotivation")} resize-none`}
                />
                {errors.lettreMotivation && (
                  <p className="text-red-500 text-xs mt-1">{errors.lettreMotivation}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-400">{copy.requiredFields}</p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-60 text-white px-7 py-2.5 font-semibold text-sm transition"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {uploadProgress || copy.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> {copy.submit}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({
  offer,
  onApply,
  copy,
  language,
}: {
  offer: JobOffer;
  onApply: () => void;
  copy: (typeof careerCopy)[Language];
  language: Language;
}) {
  const [expanded, setExpanded] = useState(false);
  const title = getLocalizedOfferText(offer, "titre", language);
  const department = getLocalizedOfferText(offer, "departement", language);
  const location = getLocalizedOfferText(offer, "lieu", language);
  const description = getLocalizedOfferText(offer, "description", language);
  const skills = getLocalizedSkills(offer, language);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Top stripe */}
      <div className="h-1 bg-gradient-to-r from-[#dc2626] to-[#991b1b]" />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg leading-tight">{title}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#dc2626]" />
                {department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#dc2626]" />
                {location}
              </span>
              {offer.datePublication && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {new Date(offer.datePublication).toLocaleDateString(copy.dateLocale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
          <span
            className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${typeBadge[offer.type] ?? "bg-gray-100 text-gray-600 border-gray-200"
              }`}
          >
            {offer.type}
          </span>
        </div>

        {/* Description expandable */}
        <div>
          <p
            className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${expanded ? "" : "line-clamp-2"
              }`}
          >
            {description}
          </p>
          {description.length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[#dc2626] text-xs font-medium mt-1 flex items-center gap-0.5 hover:underline"
            >
              {expanded ? copy.readLess : copy.readMore}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((c) => (
              <span
                key={c}
                className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={onApply}
            className="w-full flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-sm py-3 transition-colors duration-200"
          >
            {copy.applyNow}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CarrieresClient() {
  const { language } = useLanguage();
  const copy = careerCopy[language];
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [filter, setFilter] = useState<string>(copy.allDepartments);
  const offersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const snap = await getDocs(collection(db, "offres"));
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<JobOffer, "id">),
        }));
        setOffers(data.filter((o) => o.actif !== false));
      } catch (err) {
        console.error("Erreur de chargement des offres :", err);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  useEffect(() => {
    setFilter(copy.allDepartments);
  }, [copy.allDepartments]);

  const departments = [
    copy.allDepartments,
    ...Array.from(
      new Set(offers.map((o) => getLocalizedOfferText(o, "departement", language)))
    ),
  ];
  const filtered =
    filter === copy.allDepartments
      ? offers
      : offers.filter(
        (o) => getLocalizedOfferText(o, "departement", language) === filter
      );

  const scrollToOffers = () =>
    offersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div
      className="bg-white min-h-screen mt-14"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-[#1a0505] to-[#7f1d1d] overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#dc2626]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-[#dc2626]/10 blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#dc2626]/20 border border-[#dc2626]/40 text-red-300 text-xs font-semibold px-3 py-1 rounded-full mb-6">
              {/* <Briefcase className="w-3.5 h-3.5" /> */}
              {copy.heroBadge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              {copy.heroTitlePrefix}{" "}
              <span className="text-[#dc2626]">{copy.heroTitleHighlight}</span>
              <br />
              {copy.heroTitleSuffix}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              {copy.heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToOffers}
                className="flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-8 py-4 text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-900/40 hover:-translate-y-0.5"
              >
                {copy.viewOffers}
                <ArrowRight className="w-4 h-4" />
              </button>
              {/* <Link
                href="/contact"
                className="flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-sm transition"
              >
                Candidature spontanée
              </Link> */}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        {/* <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6">
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              {[
                { icon: Users, value: "200+", label: "Collaborateurs" },
                { icon: Award, value: "30+", label: "Ans d'expertise" },
                { icon: TrendingUp, value: "3", label: "Agences au Maroc" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="bg-[#dc2626]/20 rounded-full p-2 shrink-0">
                    <stat.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-white text-xl sm:text-2xl font-extrabold">{stat.value}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </section>

      {/* ── Why join us ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              {copy.whyJoin}
            </h2>
            <div className="w-16 h-1 bg-[#dc2626] mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.benefits.map((item, index) => {
              const Icon = [TrendingUp, Award, Users, Clock][index];
              return (
              <div
                key={item.title}
                className="bg-white rounded-xl p-7 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#dc2626]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Offers ─────────────────────────────────────────────────────────── */}
      <section
        ref={offersRef}
        id="offres"
        className="py-20 bg-white"
        style={{ scrollMarginTop: "var(--site-header-height, 80px)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                {copy.offersTitle}
              </h2>
              <div className="w-16 h-1 bg-[#dc2626]" />
            </div>
            {!loading && (
              <p className="text-gray-500 text-sm">
                <span className="font-bold text-gray-900">{filtered.length}</span>{" "}
                {copy.offerCount(filtered.length).replace(String(filtered.length), "").trim()}
              </p>
            )}
          </div>

          {/* Department filters */}
          {!loading && departments.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {departments.map((dep) => (
                <button
                  key={dep}
                  onClick={() => setFilter(dep)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${filter === dep
                    ? "bg-[#dc2626] border-[#dc2626] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#dc2626] hover:text-[#dc2626]"
                    }`}
                >
                  {dep}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-24">
              <Loader2 className="w-10 h-10 text-[#dc2626] animate-spin" />
              <p className="text-gray-500 text-sm">{copy.loadingOffers}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-24 gap-4 text-center">
              <Briefcase className="w-12 h-12 text-gray-300" />
              <p className="text-gray-500">{copy.noOffers}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((offer) => (
                <JobCard
                  key={offer.id}
                  offer={offer}
                  copy={copy}
                  language={language}
                  onApply={() => setSelectedOffer(offer)}
                />
              ))}
            </div>
          )}

          {/* Spontaneous application banner */}
          {/* <div className="mt-16 bg-gradient-to-r from-gray-900 to-[#7f1d1d] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-2">
                Vous ne trouvez pas l&apos;offre idéale ?
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
                Envoyez une candidature spontanée. Nous gardons vos informations dans notre vivier
                de talents.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-6 py-3 text-sm transition"
            >
              Candidature spontanée
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div> */}
        </div>
      </section>

      {/* Application modal */}
      {selectedOffer && (
        <ApplicationModal
          offer={selectedOffer}
          copy={copy}
          language={language}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
}
