import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type JsPdfWithAutoTable = jsPDF & {
  lastAutoTable?: {
    finalY: number;
  };
};

interface QuoteFormData {
  serviceType?: string;
  category: string;
  model: string;
  country: string;
  city: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  timeframe: string;
  message: string;
}

export const generateQuotePDF = (formData: QuoteFormData, quoteId: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString("fr-FR");

  const img = new Image();
  img.src = "/images/logo-black.png";

  img.onload = () => {
    // Logo
    doc.addImage(img, "PNG", 15, 15, 40, 15); // x, y, w, h

    // Company Info (Right aligned)
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Forges de Bazas", 200, 20, { align: "right" });
    doc.text("contact@forgesdebazas.ma", 200, 25, { align: "right" });
    doc.text("+212 522 669 850", 200, 30, { align: "right" });
    doc.text("Casablanca, Maroc", 200, 35, { align: "right" });

    // Title & Quote ID
    doc.setFontSize(18);
    doc.setTextColor(0);
    doc.text("DEMANDE DE DEVIS", 105, 55, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Réf: ${quoteId}`, 105, 62, { align: "center" });
    doc.text(`Date: ${date}`, 105, 68, { align: "center" });

    // --- Client Info Section ---
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Informations Client", 15, 85);

    autoTable(doc, {
      startY: 90,
      head: [],
      body: [
        [
          "Nom / Entreprise",
          formData.company
            ? `${formData.name} (${formData.company})`
            : formData.name,
        ],
        ["Email", formData.email],
        ["Téléphone", formData.phone],
        ["Localisation", `${formData.city}, ${formData.country}`],
      ],
      theme: "plain",
      styles: { fontSize: 11, cellPadding: 2 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
    });

    // --- Product Info Section ---
    const finalY = ((doc as JsPdfWithAutoTable).lastAutoTable?.finalY ?? 90) + 15;
    doc.setFontSize(14);
    doc.text("Détails de la Demande", 15, finalY);

    autoTable(doc, {
      startY: finalY + 5,
      head: [["Description", "Détails"]],
      body: [
        ["Service", formData.serviceType || "Non spécifié"],
        ["Catégorie", formData.category || "Non spécifié"],
        ["Modèle", formData.model || "Non spécifié"],
        ["Délai souhaité", formData.timeframe || "Non spécifié"],
        [
          "Message / Besoins",
          formData.message || "Aucun message supplémentaire",
        ],
      ],
      theme: "grid",
      headStyles: { fillColor: [220, 38, 38], textColor: 255 }, // Red header
      styles: { fontSize: 11, cellPadding: 4 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
    });

    // --- Footer ---
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      "Ce document est une demande de devis générée automatiquement.",
      105,
      pageHeight - 20,
      { align: "center" }
    );
    doc.text("www.forgesdebazas.com", 105, pageHeight - 15, {
      align: "center",
    });

    // Save
    doc.save(`Devis_${quoteId}.pdf`);
  };

  img.onerror = () => {
    // Fallback if image fails to load (e.g. during dev or path issue)
    // Just generate without logo
    doc.setFontSize(18);
    doc.text("Forges de Bazas", 15, 20);
    doc.save(`Devis_${quoteId}.pdf`);
  };
};
