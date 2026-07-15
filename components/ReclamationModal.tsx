"use client";
import { useState } from "react";
import { X, AlertCircle, CheckCircle2, Loader2, Send, FileText } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReclamationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  societe: string;
  typeReclamation: string;
  numeroDossier: string;
  description: string;
};

const initialFormData: FormData = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  societe: "",
  typeReclamation: "",
  numeroDossier: "",
  description: "",
};

const RECLAMATION_TYPES: Array<{
  value: string;
  labels: { fr: string; en: string; es: string };
}> = [
  { value: "machines", labels: { fr: "Machines", en: "Machines", es: "Máquinas" } },
  { value: "piece", labels: { fr: "Pièce", en: "Spare Part", es: "Pieza" } },
  { value: "service", labels: { fr: "Service", en: "Service", es: "Servicio" } },
  { value: "autre", labels: { fr: "Autre", en: "Other", es: "Otro" } },
];

export default function ReclamationModal({ isOpen, onClose }: ReclamationModalProps) {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.nom.trim()) newErrors.nom = t.reclamation.errors.lastNameRequired;
    if (!formData.prenom.trim()) newErrors.prenom = t.reclamation.errors.firstNameRequired;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t.reclamation.errors.invalidEmail;
    if (!formData.telephone.trim()) newErrors.telephone = t.reclamation.errors.phoneRequired;
    if (!formData.typeReclamation) newErrors.typeReclamation = t.reclamation.errors.typeRequired;
    if (!formData.description.trim() || formData.description.trim().length < 20)
      newErrors.description = t.reclamation.errors.descriptionShort;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      await addDoc(collection(db, "reclamations"), {
        ...formData,
        createdAt: serverTimestamp(),
        statut: "En cours de traitement",
      });
      setStatus("success");
      setFormData(initialFormData);
    } catch (err) {
      console.error("Firebase error:", err);
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setFormData(initialFormData);
      setErrors({});
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reclamation-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl rounded-lg animate-modal-in">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#dc2626] to-[#991b1b] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <div className="bg-white/20 rounded-full p-2">
              <FileText className="w-5 h-5 text-white" />
            </div> */}
            <div>
              <h2
                id="reclamation-modal-title"
                className="text-white font-bold text-lg leading-tight"
              >
                {t.reclamation.title}
              </h2>
              {/* <p className="text-red-100 text-xs mt-0.5">
                Nous traitons votre réclamation sous 48h ouvrées
              </p> */}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-colors"
            aria-label={t.reclamation.closeButton}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {t.reclamation.successTitle}
              </h3>
              <p className="text-gray-500 max-w-sm text-sm">
                {t.reclamation.successMessage}
              </p>
              <button
                onClick={handleClose}
                className="mt-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-8 py-2.5 font-medium text-sm transition-colors"
              >
                {t.reclamation.closeButton}
              </button>
            </div>
          ) : status === "error" ? (
            <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">{t.reclamation.errorTitle}</h3>
              <p className="text-gray-500 text-sm">
                {t.reclamation.errorMessage}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-2 text-sm font-medium transition-colors"
              >
                {t.reclamation.retryButton}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Intro paragraph */}
              <div className="bg-red-50/60 border-l-4 border-[#dc2626] rounded-r-md px-4 py-3">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {t.reclamation.introText}
                </p>
              </div>

              {/* Personal Info */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#dc2626] mb-3">
                  {t.reclamation.personalInfoSection}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label={t.reclamation.lastName}
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    error={errors.nom}
                    placeholder={t.reclamation.lastNamePlaceholder}
                  />
                  <Field
                    label={t.reclamation.firstName}
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    error={errors.prenom}
                    placeholder={t.reclamation.firstNamePlaceholder}
                  />
                  <Field
                    label={t.reclamation.email}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder={t.reclamation.emailPlaceholder}
                  />
                  <Field
                    label={t.reclamation.phone}
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleChange}
                    error={errors.telephone}
                    placeholder={t.reclamation.phonePlaceholder}
                  />
                  <Field
                    label={t.reclamation.company}
                    name="societe"
                    value={formData.societe}
                    onChange={handleChange}
                    placeholder={t.reclamation.companyPlaceholder}
                    className="sm:col-span-2"
                  />
                </div>
              </div>

              {/* Réclamation details */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#dc2626] mb-3">
                  {t.reclamation.reclamationDetailsSection}
                </p>
                <div className="space-y-4">
                  {/* Type select */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.reclamation.reclamationType}
                    </label>
                    <select
                      name="typeReclamation"
                      value={formData.typeReclamation}
                      onChange={handleChange}
                      className={`w-full border px-3 py-2.5 text-sm rounded focus:outline-none focus:ring-2 focus:ring-[#dc2626] transition ${errors.typeReclamation
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 bg-white"
                        }`}
                    >
                      <option value="">{t.reclamation.reclamationTypePlaceholder}</option>
                      {RECLAMATION_TYPES.map((type) => {
                        const typeKey = type.value as keyof typeof t.reclamation.reclamationTypes;
                        const translatedLabel = t.reclamation.reclamationTypes[typeKey] || type.labels[language as keyof typeof type.labels] || type.labels.fr;
                        return (
                          <option key={type.value} value={type.value}>
                            {translatedLabel}
                          </option>
                        );
                      })}
                    </select>
                    {errors.typeReclamation && (
                      <p className="text-red-500 text-xs mt-1">{errors.typeReclamation}</p>
                    )}
                  </div>

                  <Field
                    label={t.reclamation.fileNumber}
                    name="numeroDossier"
                    value={formData.numeroDossier}
                    onChange={handleChange}
                    placeholder={t.reclamation.fileNumberPlaceholder}
                  />

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.reclamation.description}
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder={t.reclamation.descriptionPlaceholder}
                      className={`w-full border px-3 py-2.5 text-sm rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#dc2626] transition ${errors.description
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300"
                        }`}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-400">{t.reclamation.requiredFields}</p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-60 disabled:cursor-not-allowed text-white px-7 py-2.5 font-semibold text-sm transition-colors"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.reclamation.sendingButton}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t.reclamation.submitButton}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-in {
          animation: modal-in 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// Reusable field component
function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={`field-${name}`} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={`field-${name}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border px-3 py-2.5 text-sm rounded focus:outline-none focus:ring-2 focus:ring-[#dc2626] transition ${error ? "border-red-400 bg-red-50" : "border-gray-300"
          }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
