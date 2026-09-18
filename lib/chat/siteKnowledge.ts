import { products } from "@/data/productsData";
import { solutions } from "@/data/solutionsData";
import { brands } from "@/data/brands";
import { newsArticles } from "@/data/newsData";

export interface SiteLink {
  label: string;
  href: string;
  description?: string;
}

// Master company reference always available
export const COMPANY_PROFILE = {
  name: "Forges de Bazas",
  founded: 1950,
  yearsOfExpertise: "75+ ans",
  description:
    "Leader marocain de la distribution de matériels industriels, BTP, levage, manutention, énergie et stockage.",
  headquarters: {
    city: "Casablanca",
    address: "Route 111, km 11.5 - Quartier Industriel Sidi Bernoussi, Casablanca 20590 – Maroc",
    phone: "+212 522 669 850",
    email: "contact@forgesdebazas.com",
  },
  branches: [
    {
      city: "Casablanca (Siège)",
      address: "Route 111, km 11.5 - Quartier Industriel Sidi Bernoussi, Casablanca 20590",
      phone: "+212 522 669 850",
    },
    {
      city: "Agadir",
      address: "LOT 55, TASSILA RP 40, DCHEIRA 80000",
      phone: "+212 608 116 363",
    },
    {
      city: "Tanger",
      address: "LOT 211, ZI GZENAYA 90090",
      phone: "+212 608 116 262",
    },
  ],
  workingHours: "Du Lundi au Vendredi: 8h00 - 18h00 | Samedi: 8h30 - 12h30",
  keyServices: [
    {
      name: "Location PROXAM",
      path: "/location",
      desc: "Location d'engins et chariots en court terme (1 jour à 1 mois) ou long terme (3 mois à 5 ans) avec maintenance, pièces de rechange et assistance incluses. Disponibilité immédiate et fiscalement avantageux.",
    },
    {
      name: "Service Après-Vente (SAV) & Maintenance",
      path: "/sav",
      desc: "Maintenance préventive et curative, 100% pièces d'origine certifiées fabricants, techniciens experts certifiés, contrat Full Service tout inclus avec télémétrie, et unités d'ateliers mobiles intervenant sur tout le Maroc.",
    },
    {
      name: "Demande de Devis",
      path: "/devis",
      desc: "Devis en ligne gratuit et personnalisé sous 24h pour achat neuf, reconditionné ou location avec solutions de financement sur mesure.",
    },
    {
      name: "Carrières & Recrutement",
      path: "/carrieres",
      desc: "Opportunités d'emploi pour techniciens, commerciaux et ingénieurs à Casablanca, Agadir et Tanger.",
    },
  ],
  brandPartnerships: [
    {
      name: "TOYOTA Material Handling",
      status: "Distributeur exclusif au Maroc",
      scope: "Chariots élévateurs électriques 3 & 4 roues (Traigo 1.5 à 8T), chariots diesel petit et gros tonnage (1 à 10T), transpalettes électriques LWE/LPE, gerbeurs SWE, préparateurs de commande OSE/OME, chariots à mât rétractable Reflex, chariots VNA pour allées étroites, AGV automatisés et télématique I_Site.",
      path: "/marque/toyota",
    },
    {
      name: "SANY",
      status: "Distributeur exclusif au Maroc",
      scope: "Mini-pelles (SY16C, SY26U, SY35C), excavatrices moyennes et lourdes (+30T), grues mobiles tout-terrain (SAC), grues sur camion (STC), grues à tour, grues sur chenilles (SCC), pompes à béton sur camion et stationnaires (HBT), malaxeurs toupie, chargeuses sur pneus (SWL), niveleuses (SMG), compacteurs (SSR), finisseurs d'asphalte, reach stackers portuaires et camions miniers.",
      path: "/marque/sany",
    },
    {
      name: "FABO",
      status: "Partenaire officiel",
      scope: "Centrales à béton fixes et mobiles (POWERMIX, MIX-COMPACT), concasseurs mobiles sur chenilles et à percussion, installations fixes de concassage et cribles industriels.",
      path: "/marque/fabo",
    },
    {
      name: "SUNWARD",
      status: "Partenaire officiel",
      scope: "Foreuses de roche fond de trou et hydrauliques pour mines et carrières (séries SWDE, SWDRT, SWDH), solutions de forage lourd.",
      path: "/marque/sunward",
    },
    {
      name: "TEKSAN",
      status: "Partenaire officiel",
      scope: "Groupes électrogènes diesel industriels de secours et continu (8 kVA à 2500+ kVA, série TJ), tours d'éclairage diesel et 100% solaires autonomes sans carburant.",
      path: "/marque/teksan",
    },
    {
      name: "SINOBOOM",
      status: "Partenaire officiel",
      scope: "Nacelles élévatrices ciseaux électriques et diesel (4 à 18m), nacelles articulées, nacelles télescopiques (jusqu'à 43m) et nacelles araignées tout-terrain.",
      path: "/marque/sinoboom",
    },
    {
      name: "COMBILIFT",
      status: "Partenaire officiel",
      scope: "Chariots multidirectionnels, Aisle Master pour allées très étroites et manipulation spécialisée de charges longues et encombrantes.",
      path: "/marque/combilift",
    },
    {
      name: "AJAX",
      status: "Partenaire officiel",
      scope: "Malaxeurs à béton autochargeants ARGO (2 à 4 m³) autonomes pour chantiers isolés.",
      path: "/marque/ajax",
    },
    {
      name: "ATOX",
      status: "Partenaire officiel",
      scope: "Systèmes de rayonnage industriel pour stockage palettes, rayonnages dynamiques, drive-in, cantilevers et mezzanines d'entrepôt.",
      path: "/marque/atox",
    },
  ],
};

const normalize = (str: string): string =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s/-]/g, " ")
    .trim();

/**
 * Searches the site's rich database to extract relevant products, solutions, and services
 */
export function retrieveSiteContext(query: string) {
  const normQuery = normalize(query);
  const tokens = normQuery.split(/\s+/).filter((t) => t.length >= 2);

  // 1. Search products
  const matchedProducts: Array<{
    id: string;
    brand: string;
    title: string;
    models: string[];
    specsSummary: string;
    score: number;
    path: string;
  }> = [];

  for (const p of products) {
    let score = 0;
    const titleFr = normalize(p.title?.fr || "");
    const titleEn = normalize(p.title?.en || "");
    const descFr = normalize(p.description?.fr || "");
    const brandNorm = normalize(p.brand || "");
    const categoryNorm = normalize(p.category || "");
    const modelsNorm = (p.models || []).map((m) => normalize(m));

    // Exact model match gets top priority
    for (const model of modelsNorm) {
      if (normQuery.includes(model) || tokens.some((t) => model.includes(t) && t.length >= 3)) {
        score += 8;
      }
    }

    // Token matches
    for (const token of tokens) {
      if (brandNorm.includes(token)) score += 4;
      if (categoryNorm.includes(token)) score += 3;
      if (titleFr.includes(token) || titleEn.includes(token)) score += 3;
      if (descFr.includes(token)) score += 1;
    }

    if (score > 0) {
      // Build brief specs summary
      const specList: string[] = [];
      if (p.specs) {
        for (const [k, v] of Object.entries(p.specs)) {
          if (v && typeof v === "object" && "fr" in v) {
            specList.push((v as { fr: string }).fr);
          } else if (typeof v === "string") {
            specList.push(`${k}: ${v}`);
          }
        }
      }

      matchedProducts.push({
        id: p.id,
        brand: p.brand,
        title: p.title?.fr || p.title?.en || p.id,
        models: p.models || [],
        specsSummary: specList.slice(0, 3).join(" | "),
        score,
        path: `/produits/${p.id}`,
      });
    }
  }

  // Sort matched products by relevance
  matchedProducts.sort((a, b) => b.score - a.score);
  const topProducts = matchedProducts.slice(0, 4);

  // 2. Search solutions
  const matchedSolutions: Array<{
    id: string;
    title: string;
    desc: string;
    path: string;
  }> = [];

  for (const s of solutions) {
    const sTitle = normalize(s.title?.fr || "");
    const sDesc = normalize(s.description?.fr || "");
    const sId = normalize(s.id);

    const matches = tokens.some(
      (t) => sTitle.includes(t) || sDesc.includes(t) || sId.includes(t)
    );

    if (matches) {
      matchedSolutions.push({
        id: s.id,
        title: s.title?.fr || s.id,
        desc: s.description?.fr || "",
        path: `/solutions/${s.id}`,
      });
    }
  }

  // 3. Search relevant news articles
  const matchedNews: Array<{
    title: string;
    date: string;
    path: string;
  }> = [];

  for (const n of newsArticles) {
    const nTitle = normalize(n.title);
    const nExcerpt = normalize(n.excerpt);
    if (tokens.some((t) => (nTitle.includes(t) || nExcerpt.includes(t)) && t.length >= 4)) {
      matchedNews.push({
        title: n.title,
        date: n.date,
        path: `/actualites/${n.id}`,
      });
    }
  }

  return {
    topProducts,
    matchedSolutions: matchedSolutions.slice(0, 2),
    matchedNews: matchedNews.slice(0, 2),
  };
}

const BASE_URL_FALLBACK = "https://www.forgesdebazas.com";

/**
 * Generates smart, contextual link suggestions for the user based on their query
 */
export function buildContextualLinks(
  query: string,
  retrievedContext: ReturnType<typeof retrieveSiteContext>,
  origin?: string | null
): SiteLink[] {
  const baseUrl =
    origin && origin.startsWith("http") ? origin : BASE_URL_FALLBACK;

  const toAbsolute = (path: string) => {
    if (path.startsWith("http")) return path;
    try {
      return new URL(path, baseUrl).toString();
    } catch {
      return path;
    }
  };

  const norm = normalize(query);
  const links: SiteLink[] = [];
  const addedPaths = new Set<string>();

  const addLink = (link: SiteLink) => {
    const fullHref = toAbsolute(link.href);
    if (!addedPaths.has(fullHref) && links.length < 4) {
      addedPaths.add(fullHref);
      links.push({
        ...link,
        href: fullHref,
      });
    }
  };


  // 1. Direct matched products
  for (const p of retrievedContext.topProducts.slice(0, 2)) {
    addLink({
      label: `${p.brand} - ${p.title.slice(0, 36)}`,
      href: p.path,
      description: p.specsSummary || "Voir la fiche technique complète",
    });
  }

  // 2. Direct matched solutions
  for (const s of retrievedContext.matchedSolutions) {
    addLink({
      label: `Solution : ${s.title}`,
      href: s.path,
      description: s.desc.slice(0, 60) + "…",
    });
  }

  // 3. Intent-based actions
  if (
    norm.includes("prix") ||
    norm.includes("tarif") ||
    norm.includes("cout") ||
    norm.includes("devis") ||
    norm.includes("budget") ||
    norm.includes("acheter") ||
    norm.includes("achat") ||
    norm.includes("combien")
  ) {
    addLink({
      label: "Demander un devis personnalisé",
      href: "/devis",
      description: "Devis gratuit sans engagement sous 24h.",
    });
  }

  if (
    norm.includes("louer") ||
    norm.includes("location") ||
    norm.includes("proxam") ||
    norm.includes("court terme") ||
    norm.includes("long terme")
  ) {
    addLink({
      label: "Location PROXAM",
      href: "/location",
      description: "Flotte complète en location courte & longue durée.",
    });
  }

  if (
    norm.includes("sav") ||
    norm.includes("maintenance") ||
    norm.includes("reparation") ||
    norm.includes("panne") ||
    norm.includes("piece") ||
    norm.includes("pieces")
  ) {
    addLink({
      label: "Service Après-Vente & Pièces",
      href: "/sav",
      description: "Maintenance préventive, curative et pièces d'origine.",
    });
  }

  if (
    norm.includes("contact") ||
    norm.includes("agence") ||
    norm.includes("casablanca") ||
    norm.includes("agadir") ||
    norm.includes("tanger") ||
    norm.includes("adresse") ||
    norm.includes("telephone") ||
    norm.includes("appeler")
  ) {
    addLink({
      label: "Nos agences (Casablanca, Agadir, Tanger)",
      href: "/contact",
      description: "Adresses, coordonnées directes et itinéraires.",
    });
  }

  if (
    norm.includes("recrutement") ||
    norm.includes("carriere") ||
    norm.includes("emploi") ||
    norm.includes("stage") ||
    norm.includes("embauche")
  ) {
    addLink({
      label: "Espace Carrières",
      href: "/carrieres",
      description: "Consultez nos opportunités et postulez en ligne.",
    });
  }

  // Fallbacks to always have at least 2 helpful links
  if (links.length < 2) {
    addLink({
      label: "Catalogue complet des produits",
      href: "/produits",
      description: "Explorez tous les matériels neufs et certifiés.",
    });
  }
  if (links.length < 3) {
    addLink({
      label: "Demander un devis en ligne",
      href: "/devis",
      description: "Réponse personnalisée sous 24 heures.",
    });
  }

  return links;
}

/**
 * Builds the complete system prompt injecting site knowledge and context
 */
export function buildSiteAwareSystemPrompt(
  retrievedContext: ReturnType<typeof retrieveSiteContext>
): string {
  let prompt = `Tu es le conseiller expert et assistant officiel en ligne de Forges de Bazas au Maroc.
Tu connais l'intégralité du site www.forgesdebazas.com, l'histoire de l'entreprise, ses 3 agences (Casablanca, Agadir, Tanger), ses 9 marques partenaires, ses 8 solutions industrielles, ses services de location PROXAM, son SAV et son catalogue complet de produits.

RÈGLES FONDAMENTALES DE RÉPONSE :
1. Langue : Réponds toujours dans la même langue que l'utilisateur (français par défaut, ou anglais/espagnol/arabe si l'utilisateur s'exprime dans cette langue).
2. Clarté et concision : Rédige une réponse fluide, professionnelle et experte, d'environ 2 à 4 phrases (maximum 100 mots). Va droit au but avec des informations concrètes et précises.
3. Spécificité Site : Cite les marques officielles, les gammes, modèles ou spécifications précises du site quand c'est pertinent.
4. Jamais d'URL brutes dans le texte : L'interface utilisateur affiche automatiquement les boutons et cartes de liens pertinents sous ton message.
5. Prix et Tarifs : Les prix dépendent des configurations et des options ; invite toujours courtoisement à demander un devis gratuit en ligne ou à contacter nos conseillers.
6. Orientation client : Agis comme un ingénieur commercial expérimenté et bienveillant qui comprend le besoin du client et lui propose la machine ou la solution la plus adaptée.

---
IDENTITÉ & COORDONNÉES DE L'ENTREPRISE :
- Entreprise : Forges de Bazas (fondée en 1950, ${COMPANY_PROFILE.yearsOfExpertise} d'expertise au Maroc).
- Agences :
  * Siège Casablanca : Route 111, km 11.5, Quartier Industriel Sidi Bernoussi, Tél : +212 522 669 850, Email : contact@forgesdebazas.com
  * Agence Agadir : LOT 55, TASSILA RP 40, DCHEIRA 80000, Tél : +212 608 116 363
  * Agence Tanger : LOT 211, ZI GZENAYA 90090, Tél : +212 608 116 262
- Horaires : Lundi au vendredi 8h00 - 18h00 | Samedi 8h30 - 12h30

SERVICES MAJEURS DU SITE :
- Location PROXAM : Court terme (1j à 1 mois) ou Long terme (3 mois à 5 ans), flotte complète avec maintenance, pièces de rechange et assistance incluses.
- Service Après-Vente (SAV) : Maintenance préventive et corrective, pièces de rechange 100% d'origine certifiées, ateliers mobiles sur tout le Maroc, contrat Full Service tout inclus.
- Devis en ligne : Proposition technique et financière sur mesure sous 24h avec facilités de financement.
- Carrières : Recrutement continu de profils techniques, commerciaux et logistiques.

LES 8 SOLUTIONS SECTORIELLES DU SITE :
1. Manutention : Chariots frontaux Toyota (électriques 3/4 roues Traigo 1.5–8T, diesel 1–10T), transpalettes, gerbeurs, allées étroites VNA, AGV autonomes, I_Site.
2. Rayonnage : Racks à palettes ATOX, drive-in, rayonnages dynamiques, cantilevers, mezzanines de stockage.
3. Levage : Grues SANY (à tour, camions grues STC 25–300T, tout-terrain SAC, chenilles SCC jusqu'à 800T) et nacelles élévatrices Sinoboom (ciseaux, articulées, télescopiques jusqu'à 43m).
4. Terrassement & BTP : Pelles excavatrices SANY (mini-pelles SY16C/SY26U/SY35C à +30T), chargeuses SWL, niveleuses, compacteurs SSR, pompes à béton HBT et sur camion, centrales à béton FABO.
5. Mines & Carrières : Foreuses Sunward (SWDE, SWDRT), concasseurs mobiles FABO, pelles lourdes et haveuses minières SANY.
6. Portuaire : Reach stackers SANY (manipulation conteneurs pleins et vides).
7. Transport : Camions bennes TP et camions miniers SANY.
8. Énergie : Groupes électrogènes industriels TEKSAN (8 à 2500+ kVA) et tours d'éclairage diesel & solaires.
`;

  // Inject dynamically retrieved product & solution specs
  if (retrievedContext.topProducts.length > 0) {
    prompt += `\n---
PRODUITS DU SITE SPÉCIFIQUEMENT ASSOCIÉS À LA DEMANDE DE L'UTILISATEUR :
`;
    for (const p of retrievedContext.topProducts) {
      prompt += `- [${p.brand}] ${p.title} (Modèles : ${p.models.join(", ") || "Plusieurs"}) | Spécifications : ${p.specsSummary}\n`;
    }
  }

  if (retrievedContext.matchedSolutions.length > 0) {
    prompt += `\nSOLUTIONS ASSOCIÉES DU SITE :
`;
    for (const s of retrievedContext.matchedSolutions) {
      prompt += `- ${s.title} : ${s.desc}\n`;
    }
  }

  return prompt;
}

/**
 * Intelligent local fallback when the AI API is unreachable
 */
export function generateKnowledgeFallback(
  userMessage: string,
  retrievedContext: ReturnType<typeof retrieveSiteContext>
): string {
  const norm = normalize(userMessage);

  // If specific products were matched
  if (retrievedContext.topProducts.length > 0) {
    const top = retrievedContext.topProducts[0];
    const modelsStr = top.models.length > 0 ? ` (notamment ${top.models.slice(0, 3).join(", ")})` : "";
    const specsStr = top.specsSummary ? ` Caractéristiques clés : ${top.specsSummary}.` : "";
    return `Forges de Bazas propose la gamme ${top.brand} pour ce besoin, incluant le modèle ${top.title}${modelsStr}.${specsStr} Vous pouvez consulter sa fiche technique détaillée ou faire une demande de devis en direct via les liens ci-dessous.`;
  }

  // Contact / Agencies
  if (
    norm.includes("contact") ||
    norm.includes("agence") ||
    norm.includes("adresse") ||
    norm.includes("telephone") ||
    norm.includes("casablanca") ||
    norm.includes("agadir") ||
    norm.includes("tanger")
  ) {
    return "Forges de Bazas est à votre service au Maroc via notre siège à Casablanca (Route 111, Sidi Bernoussi - +212 522 669 850), notre agence d'Agadir (Tassila - +212 608 116 363) et notre agence de Tanger (ZI Gzenaya - +212 608 116 262). Nos conseillers vous accueillent du lundi au vendredi de 8h à 18h et le samedi matin.";
  }

  // Location / Rental
  if (norm.includes("location") || norm.includes("louer") || norm.includes("proxam")) {
    return "Notre service PROXAM propose des solutions complètes de location courte durée (1 jour à 1 mois) ou longue durée (3 mois à 5 ans). La maintenance complète et les pièces de rechange sont intégralement prises en charge pour garantir la continuité de vos opérations.";
  }

  // SAV / Maintenance
  if (
    norm.includes("sav") ||
    norm.includes("maintenance") ||
    norm.includes("reparation") ||
    norm.includes("piece") ||
    norm.includes("panne")
  ) {
    return "Notre Service Après-Vente (SAV) assure la maintenance préventive et curative de vos parcs avec des pièces d'origine certifiées et des contrats Full Service. Nos unités d'ateliers mobiles interviennent rapidement sur site à travers tout le Maroc.";
  }

  // Devis / Prix
  if (
    norm.includes("prix") ||
    norm.includes("devis") ||
    norm.includes("cout") ||
    norm.includes("tarif") ||
    norm.includes("budget") ||
    norm.includes("acheter")
  ) {
    return "Nos offres tarifaires sont établies sur mesure selon vos exigences techniques et vos options d'acquisition (achat neuf, reconditionné ou location PROXAM). Remplissez notre formulaire de devis en ligne pour recevoir une proposition chiffrée sous 24 heures.";
  }

  // General brand presentation
  return "Fondée en 1950, Forges de Bazas est le distributeur de référence au Maroc d'équipements industriels, BTP, levage, manutention et énergie (Toyota, SANY, Fabo, Sunward, Teksan, Sinoboom). Précisez-moi votre application technique ou utilisez les liens ci-dessous pour accéder directement à nos solutions.";
}
