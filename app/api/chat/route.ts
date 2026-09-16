import { NextRequest, NextResponse } from "next/server";
import { brands } from "@/data/brands";
import { toBrandSlug } from "@/lib/slug";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type LinkSuggestion = {
  label: string;
  href: string;
  description?: string;
};

type LinkCandidate = {
  id: string;
  label: string;
  path: string;
  description?: string;
  keywords: string[];
  priority?: number;
};

const BASE_URL_FALLBACK = "https://www.forgesdebazas.com";

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s/-]/g, " ");

const findLatestUserMessage = (messages: ChatMessage[]) =>
  [...messages].reverse().find((message) => message.role === "user")?.content ??
  "";

const SYSTEM_PROMPT = `You are the expert AI consultant for Forges de Bazas — Morocco's leading industrial equipment distributor since 1950, headquartered in Casablanca with branches in Agadir and Tanger.

**RESPONSE RULES:**
- Reply in the same language as the user (French by default).
- Keep answers concise: 2-4 sentences max, 80 words max.
- Be expert and diagnostic: understand the need, recommend the right product/solution.
- Never include URLs — the UI handles links automatically.
- For prices, always direct to /devis for a personalized quote.

**COMPANY:**
- Name: Forges de Bazas | Founded: 1950 | 75+ years of expertise
- Locations: Casablanca HQ (+212 522 669 850, Route 111, km 11.5 - Quartier Industriel Sidi Bernoussi), Agadir (+212 608 116 363), Tanger (+212 608 116 262)
- Email: contact@forgesdebazas.com
- Services: Vente (neuf/reconditionné), Location PROXAM, SAV complet

---

**BRAND EXPERTISE:**

### TOYOTA Material Handling (Distributeur exclusif Maroc)
Gamme complète de chariots élévateurs et solutions logistiques :
- **Chariots électriques 3 roues** (1–2T): légèreté, maniabilité en entrepôt
- **Chariots électriques 4 roues TRAIGO80** (1.5–8T): polyvalents et puissants
- **Chariots diesel petit tonnage** (1–3.5T): extérieur, terrains exigeants
- **Chariots diesel gros tonnage** (4–10T): charges lourdes
- **Chariots à mât rétractable REFLEX** (standard, IN/OUT intérieur/extérieur)
- **VNA (allées très étroites)**: cabine sol et cabine montante
- **Transpalettes électriques**: LWE250 (accompagnant), LPE200 (autoporté)
- **Gerbeurs électriques**: SWE (accompagnant), SWE autoporté
- **Préparateurs de commandes horizontaux**: OSE120 (sol)
- **Préparateurs de commandes verticaux**: OME100 (haute élévation)
- **Tracteurs de traction**: TRACTO series
- **Solutions automatisées (AGV)**: chariots de palettes automatisés, navettes semi-automatisées, robots d'entrepôt
- **Gestion de flotte**: I_Site (télématique temps réel)

### SANY (Distributeur exclusif Maroc)
**Excavatrices:**
- Mini-excavatrices (<2.5T): SY16C, SY27C
- Mini-excavatrices (2.5–5T): SY35C
- Excavatrices moyennes (6–30T)
- Grandes excavatrices minières (+30T)

**Grues:**
- Grues à tour: Topkit, Flat Top (SLT260) — 25–80T, portée 50–80m
- Grues sur camion légères (2–10T, 8–25m)
- Grues sur camion 50–100T
- Grues sur camion lourdes +100T: STC500T (100–300T)
- Grues tout-terrain 100–200T: SAC300, SAC400
- Grues tout-terrain 200–300T: SAC4500S
- Grues terrain accidenté 30–50T: SRC250C
- Grues terrain accidenté 50–80T: SRC350C
- Grues terrain accidenté +80T: SRC500C
- Grues sur chenilles (treillis): SCC2600, SCC3200, SCC4000 (25–800T)

**Pompes à béton:**
- Montées sur camion portée <37m: SYG5211THB, SYG5200THB (100–150 m³/h)
- Montées sur camion grande portée 66m+
- Stationnaires: HBT9028CH, HBT9032CH, HBT9038CH (60–120 m³/h)
- Camions malaxeurs toupie (béton)

**Matériels BTP/Terrassement:**
- Chargeuses sur roues: SWL32F, SWL50F, SWL80F (1.5–2.5 m³)
- Compacteurs vibrants: SSR800, STR140
- Niveleuses: STG800, SMG200
- Finisseurs d'asphalte: SSP130C, SAP800
- Fraiseuses routières
- Camions bennes TP
- Camions miniers

**Manutention portuaire:**
- Reach stackers (conteneurs pleins/vides)

**Mines:**
- Haveuses (roadheaders): série EBZ, STR, SCR

### FABO
- **Concasseurs mobiles sur chenilles** (100–300T/h): FTB-15-50, concasseurs à percussion
- **Stations de concassage mobiles HP** (haute production)
- **Stations de concassage fixes** (jaw crushers, cone crushers, VSI)
- **Centrales à béton fixes**: POWERMIX-60/90/100 (50–200 m³/h, contrôle Siemens/ABB)
- **Centrale à béton mobile**
- **MIX-COMPACT 30** (mini centrale béton mobile compacte)

### SUNWARD
- **Foreuses de roches** pour mines et carrières: SWDRT200B, SWDRT250B, SWDR152B, SWDH102S, SWDE200B, SWDE165B, SWDE138Q
- Foreuses intégrées et séparées, systèmes de forage haute performance

### TEKSAN
- **Groupes électrogènes diesel**: série TJ de 8 kVA à 2500+ kVA (TJ8BD, TJ50BD, TJ100BD, TJ500BD, etc.)
- **Tours d'éclairage conventionnelles**: série TLT (LED/halogène, mât 7–9m)
- **Tours d'éclairage solaires**: autonomes, 0 carburant

### SINOBOOM (Nacelles élévatrices)
- **Nacelles ciseaux** (scissor lifts): 4–18m
- **Nacelles télescopiques** (boom lifts): jusqu'à 43m
- **Nacelles articulées** (articulating): jusqu'à 28m
- **Mâts verticaux** (vertical mast): 6–12m
- **Araignées** (spider lifts): terrains difficiles

### E-MAK (Centrales d'enrobage asphalte)
- EXPRESS (compacte), EXPERT, GREEN TYPE (eco-friendly), SUPER GT, MEGATON, CHALLENGER

### AJAX (Malaxeurs autochargeants)
- ARGO 2000 (2m³), ARGO 2300, ARGO 2500, ARGO 3000, ARGO 4000 (4.0m³)

### ATOX
- Systèmes de rayonnage: palettes, drive-in, dynamique, mobile, mezzanines, cantilever

---

**NOS 8 SOLUTIONS:**
1. **Manutention**: Toyota forklifts, transpalettes, gerbeurs, AGV, I_Site
2. **Rayonnage**: ATOX racking, stockage palette, drive-in, mezzanines
3. **Levage**: SANY grues tour, sur camion, tout-terrain, chenilles
4. **Terrassement/BTP**: SANY excavatrices, chargeuses, compacteurs, pompes béton, FABO centrales
5. **Mines & Carrières**: SANY excavatrices minières & haveuses, SUNWARD foreuses, FABO concasseurs
6. **Portuaire**: SANY reach stackers, manutention conteneurs
7. **Transport**: SANY camions bennes, camions miniers
8. **Énergie**: TEKSAN groupes électrogènes & tours d'éclairage, solutions solaires

---

**SERVICES:**
- **PROXAM Location**: court terme (1 jour–1 mois), long terme (3 mois–5 ans)
- **SAV**: maintenance préventive/curative, pièces d'origine, formation opérateurs
- **Financement**: solutions adaptées disponibles
- **Devis**: gratuit, personnalisé sous 24h`;

const buildLinkSuggestions = (
  message: string,
  origin: string | null
): LinkSuggestion[] => {
  const normalized = normalizeText(message);

  const baseLinks: LinkCandidate[] = [
    {
      id: "devis",
      label: "Demander un devis",
      path: "/devis",
      description: "Recevez une proposition rapide et personnalisée.",
      keywords: [
        "devis", "prix", "tarif", "budget", "cout", "coût", "quote",
        "pricing", "combien", "achat", "acheter",
      ],
      priority: 3,
    },
    {
      id: "contact",
      label: "Contact & agences",
      path: "/contact",
      description: "Casablanca, Agadir et Tanger.",
      keywords: [
        "contact", "telephone", "téléphone", "email", "mail", "adresse",
        "agence", "casablanca", "agadir", "tanger", "rendez-vous", "rdv",
        "appeler", "bureau", "siege",
      ],
      priority: 2,
    },
    {
      id: "produits",
      label: "Catalogue produits",
      path: "/produits",
      description: "Voir tous les équipements disponibles.",
      keywords: [
        "produit", "produits", "catalogue", "equipement", "équipement",
        "machine", "machines", "materiel", "matériel",
      ],
    },
    {
      id: "solutions",
      label: "Nos solutions",
      path: "/solutions",
      description: "Manutention, BTP, énergie, mines, transport.",
      keywords: ["solution", "solutions", "projet", "industrie", "btp"],
    },
    {
      id: "location",
      label: "Location PROXAM",
      path: "/location",
      description: "Location courte et longue durée.",
      keywords: [
        "location", "louer", "rent", "rental", "proxam",
        "court terme", "long terme", "journee", "journée",
      ],
    },
    {
      id: "sav",
      label: "Service Après-Vente",
      path: "/sav",
      description: "Maintenance, pièces et formation.",
      keywords: [
        "sav", "service apres vente", "service après vente", "maintenance",
        "reparation", "réparation", "pieces", "pièces", "formation", "panne",
      ],
    },
    {
      id: "marques",
      label: "Nos marques",
      path: "/nos-marques",
      description: "Toyota, SANY, FABO, TEKSAN, SUNWARD…",
      keywords: ["marque", "marques", "distributeur", "dealer", "fabricant"],
    },
    {
      id: "actualites",
      label: "Actualités",
      path: "/actualites",
      description: "Dernières nouvelles et projets.",
      keywords: ["actualite", "actualité", "news", "evenement", "événement"],
    },
    {
      id: "apropos",
      label: "À propos",
      path: "/apropos",
      description: "Notre histoire et notre expertise.",
      keywords: ["apropos", "a propos", "entreprise", "histoire", "experience", "depuis"],
    },
  ];

  const solutionLinks: LinkCandidate[] = [
    {
      id: "solution-manutention",
      label: "Solution Manutention",
      path: "/solutions/manutention",
      description: "Chariots élévateurs, transpalettes, AGV, logistique.",
      keywords: [
        "manutention", "logistique", "entrepot", "entrepôt", "forklift",
        "chariot elevateur", "chariot élévateur", "transpalette", "gerbeur",
        "stockage", "palette", "preparateur commande", "préparateur",
      ],
    },
    {
      id: "solution-rayonnage",
      label: "Solution Rayonnage",
      path: "/solutions/rayonnage",
      description: "Rayonnages, drive-in, mezzanines, stockage.",
      keywords: [
        "rayonnage", "racking", "stockage", "rack", "etagere", "étagère",
        "mezzanine", "drive-in", "palette rack", "cantilever",
      ],
    },
    {
      id: "solution-levage",
      label: "Solution Levage",
      path: "/solutions/levage",
      description: "Grues tour, sur camion, tout-terrain, chenilles.",
      keywords: [
        "levage", "grue", "palan", "pont roulant", "lifting",
        "lever", "levée", "nacelle", "plateforme elevatrice",
      ],
    },
    {
      id: "solution-terrassement",
      label: "Solution Terrassement & BTP",
      path: "/solutions/terrassement",
      description: "Excavateurs, chargeuses, compacteurs, pompes béton.",
      keywords: [
        "terrassement", "btp", "construction", "pelle", "bulldozer",
        "excavatrice", "excavateur", "chantier", "infrastructure",
        "route", "travaux", "batiment",
      ],
    },
    {
      id: "solution-mines",
      label: "Solution Mines & Carrières",
      path: "/solutions/mines",
      description: "Foreuses, concasseurs, excavatrices minières.",
      keywords: [
        "mine", "mines", "carriere", "carrière", "quarry", "forage",
        "concasseur", "extraction", "minerai", "phosphate",
      ],
    },
    {
      id: "solution-portuaire",
      label: "Solution Portuaire",
      path: "/solutions/portuaire",
      description: "Reach stackers, manutention portuaire.",
      keywords: [
        "port", "portuaire", "terminal", "conteneur", "container",
        "reach stacker", "manutention portuaire",
      ],
    },
    {
      id: "solution-transport",
      label: "Solution Transport",
      path: "/solutions/transport",
      description: "Camions bennes et logistique lourde.",
      keywords: [
        "transport", "camion", "remorque", "tracteur", "semi-remorque",
        "benne", "logistique lourde",
      ],
    },
    {
      id: "solution-energie",
      label: "Solution Énergie",
      path: "/solutions/energie",
      description: "Groupes électrogènes, éclairage, off-grid.",
      keywords: [
        "energie", "énergie", "groupe electrogene", "groupe électrogène",
        "generator", "genset", "solaire", "eclairage", "éclairage",
        "electricite", "électricité", "courant", "alimentation",
      ],
    },
  ];

  // Direct product page links
  const productLinks: LinkCandidate[] = [
    // === TOYOTA ===
    {
      id: "toyota-traigo80-4r-4-8t",
      label: "Toyota Chariot Électrique 4 Roues (4–8T)",
      path: "/produits/toyota-traigo80-4roues-4-8t",
      description: "TRAIGO80 — grande capacité, fiabilité TOYOTA.",
      keywords: [
        "toyota", "traigo", "traigo80", "chariot electrique", "chariot électrique",
        "4 roues", "4t", "5t", "6t", "8t", "electrique lourd",
      ],
      priority: 1,
    },
    {
      id: "toyota-traigo-15-35t",
      label: "Toyota Chariot Électrique 4 Roues (1.5–3.5T)",
      path: "/produits/toyota-traigo80-4roues-15-35t",
      description: "TRAIGO80 compact — polyvalent et économique.",
      keywords: [
        "toyota", "traigo", "chariot electrique petit", "1.5t", "2t", "3.5t",
        "petit chariot", "chariot leger",
      ],
      priority: 1,
    },
    {
      id: "toyota-chariot-3roues",
      label: "Toyota Chariot Électrique 3 Roues (1–2T)",
      path: "/produits/toyota-chariot-electrique-3roues-1-2t",
      description: "Maniable, idéal pour entrepôts étroits.",
      keywords: [
        "toyota", "3 roues", "chariot 3 roues", "manoeuvrable", "etroit",
        "espace reduit", "compact toyota",
      ],
      priority: 1,
    },
    {
      id: "toyota-diesel-petit",
      label: "Toyota Chariot Diesel Petit Tonnage (1–3.5T)",
      path: "/produits/toyota-chariot-diesel-petit-tonnage-1-35t",
      description: "Fiable pour extérieur, all-terrain léger.",
      keywords: [
        "toyota diesel", "chariot diesel", "1t", "2t", "3t", "3.5t",
        "thermique toyota", "exterieur",
      ],
      priority: 1,
    },
    {
      id: "toyota-diesel-gros",
      label: "Toyota Chariot Diesel Gros Tonnage (4–10T)",
      path: "/produits/toyota-chariot-diesel-gros-tonnage-4-10t",
      description: "Idéal pour charges très lourdes en extérieur.",
      keywords: [
        "toyota diesel lourd", "gros tonnage", "4t", "5t", "7t", "10t",
        "charge lourde toyota",
      ],
      priority: 1,
    },
    {
      id: "toyota-reflex",
      label: "Toyota Chariot à Mât Rétractable REFLEX",
      path: "/produits/toyota-reflex-standard",
      description: "REFLEX — haute élévation pour entrepôts à grande hauteur.",
      keywords: [
        "toyota reflex", "mat retractable", "mât rétractable", "reach truck",
        "grande hauteur", "7m", "10m", "12m", "entrepot hauteur",
      ],
      priority: 1,
    },
    {
      id: "toyota-reflex-inout",
      label: "Toyota Chariot Mât Rétractable IN/OUT",
      path: "/produits/toyota-reflex-in-out",
      description: "Intérieur et extérieur — polyvalence maximale.",
      keywords: [
        "toyota reflex in out", "interieur exterieur", "in out", "mi-lourd",
      ],
      priority: 1,
    },
    {
      id: "toyota-transpalette-lwe",
      label: "Toyota Transpalette Électrique LWE250",
      path: "/produits/toyota-transpalette-lwe250",
      description: "Accompagnant électrique, léger et efficace.",
      keywords: [
        "transpalette", "transpalette electrique", "lwe250", "accompagnant",
        "palette electrique", "tire palette",
      ],
      priority: 1,
    },
    {
      id: "toyota-transpalette-lpe",
      label: "Toyota Transpalette Autoporté LPE200",
      path: "/produits/toyota-transpalette-lpe200",
      description: "LPE200 — autoporté, plate-forme conducteur.",
      keywords: [
        "lpe200", "transpalette autoporte", "transpalette plateforme",
        "transpalette conducteur",
      ],
      priority: 1,
    },
    {
      id: "toyota-gerbeur-swe",
      label: "Toyota Gerbeur Électrique SWE",
      path: "/produits/toyota-gerbeur-swe",
      description: "Gerbage haute précision, accompagnant.",
      keywords: [
        "gerbeur", "gerbeur electrique", "swe", "stackeur", "empileur",
      ],
      priority: 1,
    },
    {
      id: "toyota-gerbeur-swe-autoporte",
      label: "Toyota Gerbeur Autoporté SWE",
      path: "/produits/toyota-gerbeur-swe-autoporte",
      description: "Gerbeur SWE autoporté pour productivité accrue.",
      keywords: [
        "gerbeur autoporte", "swe autoporte", "stackeur autoporte",
      ],
    },
    {
      id: "toyota-preparateur-ose",
      label: "Toyota Préparateur de Commandes Sol OSE120",
      path: "/produits/toyota-preparateur-ose120",
      description: "Préparation rapide au sol.",
      keywords: [
        "preparateur commande", "préparateur commande", "order picker",
        "ose120", "picking", "preparation commande sol",
      ],
      priority: 1,
    },
    {
      id: "toyota-preparateur-ome",
      label: "Toyota Préparateur Vertical OME100",
      path: "/produits/toyota-preparateur-ome100",
      description: "OME100 — préparation haute élévation.",
      keywords: [
        "ome100", "preparateur vertical", "préparateur vertical",
        "picking vertical", "haute elevation picking",
      ],
      priority: 1,
    },
    {
      id: "toyota-tracteur-tracto",
      label: "Toyota Tracteur de Traction TRACTO",
      path: "/produits/toyota-tracteur-tracto",
      description: "TRACTO — convoyage et trains de remorques.",
      keywords: [
        "tracteur traction", "tracto", "tow tractor", "remorquage",
        "train remorque", "convoyage interne",
      ],
    },
    {
      id: "toyota-vna-sol",
      label: "Toyota VNA Cabine Sol",
      path: "/produits/toyota-vna-cabine-sol",
      description: "VNA — cabine sol, allées très étroites.",
      keywords: [
        "vna", "allees etroites", "allées étroites", "very narrow aisle",
        "tres etroit", "très étroit", "haute densite", "vna sol",
        "cabine sol",
      ],
      priority: 1,
    },
    {
      id: "toyota-vna-montante",
      label: "Toyota VNA Cabine Montante",
      path: "/produits/toyota-vna-cabine-montante",
      description: "Cabine montante — picking + gerbage haute densité.",
      keywords: [
        "vna cabine montante", "cabine montante", "man up", "vna montant",
      ],
    },
    {
      id: "toyota-agv-mat",
      label: "Toyota AGV — Transpalettes/Gerbeurs/Mât Rétractable",
      path: "/produits/toyota-transpalettes-gerbeurs-mat-retractable-automatises",
      description: "Chariots AGV et robots pour entrepôts automatisés.",
      keywords: [
        "agv", "automatise", "automatisé", "robot", "automatisation",
        "entrepot automatise", "chariot automatique", "industrie 4.0",
      ],
      priority: 2,
    },
    {
      id: "toyota-agv-tracteur",
      label: "Toyota AGV Tracteur de Remorquage",
      path: "/produits/toyota-tracteur-remorquage-automatise",
      description: "Tracteur de remorquage automatisé.",
      keywords: [
        "agv tracteur", "tracteur automatise", "tow tractor agv",
      ],
    },
    {
      id: "toyota-agv-navette",
      label: "Toyota AGV Navette Semi-Automatisée",
      path: "/produits/toyota-navettes-semi-automatisees",
      description: "Navettes semi-automatisées pour intra-logistique.",
      keywords: [
        "navette agv", "shuttle agv", "navette semi automatisee",
      ],
    },
    {
      id: "toyota-autopilot",
      label: "Toyota Support Système Autopilot",
      path: "/produits/toyota-support-systeme-autopilot",
      description: "Support technique pour systèmes Autopilot.",
      keywords: [
        "autopilot", "i_site", "i-site", "isite", "telematique",
        "fleet management", "gestion flotte",
      ],
    },
    {
      id: "toyota-logiciel-auto",
      label: "Toyota Logiciel d'Automatisation",
      path: "/produits/toyota-logiciel-automatisation",
      description: "Logiciel pour piloter les flottes automatisées.",
      keywords: [
        "logiciel automatisation", "wms toyota", "logiciel agv",
      ],
    },
    {
      id: "toyota-gestion-projet",
      label: "Toyota Gestion de Projets d'Automatisation",
      path: "/produits/toyota-gestion-projets-automatisation",
      description: "Audit, design et déploiement d'AGV.",
      keywords: [
        "projet automatisation", "deploiement agv", "audit agv",
        "integration agv",
      ],
    },

    // === SANY EXCAVATORS ===
    {
      id: "sany-mini-exc",
      label: "SANY Mini Excavatrice (2–5T)",
      path: "/produits/sany-mini-excavatrice",
      description: "SY16C, SY27C, SY35C — compacte et maniable.",
      keywords: [
        "mini excavatrice", "mini excavateur", "mini pelle", "sy16", "sy27",
        "sy35", "petit excavateur", "2t excavatrice", "3t excavatrice",
        "5t excavatrice", "compact",
      ],
      priority: 1,
    },
    {
      id: "sany-mini-exc2",
      label: "SANY Mini Excavatrice <2.5T",
      path: "/produits/sany-mini-excavatrice-moins-25t",
      description: "Ultra-compacte pour espaces très restreints.",
      keywords: [
        "mini pelle micro", "excavatrice 1t", "1.5t pelle", "sy16c",
        "micro pelle", "micro excavatrice",
      ],
    },
    {
      id: "sany-mini-exc3",
      label: "SANY Mini Excavatrice 2.5–5T",
      path: "/produits/sany-mini-excavatrice-25-5t",
      description: "SY35C — puissance dans un gabarit compact.",
      keywords: [
        "sy35", "2.5t pelle", "4t pelle", "pelle compacte", "excavatrice compacte",
      ],
    },

    // === SANY CRANES ===
    {
      id: "sany-grue-tour",
      label: "SANY Grue à Tour",
      path: "/produits/sany-grue-tour",
      description: "Topkit & Flat Top (SLT260) — 25–80T, 50–80m.",
      keywords: [
        "grue tour", "grue à tour", "tower crane", "slt260", "topkit",
        "flat top", "immeuble", "batiment", "construction verticale",
      ],
      priority: 1,
    },
    {
      id: "sany-grue-camion-lourd",
      label: "SANY Grue sur Camion +100T (STC500T)",
      path: "/produits/sany-grue-camion-100t",
      description: "100–300T, portée 30–60m, grands travaux.",
      keywords: [
        "grue camion lourd", "stc500", "grue 100t", "grue 200t", "grue 300t",
        "grand levage", "grue lourde", "lift lourd",
      ],
      priority: 1,
    },
    {
      id: "sany-grue-camion-50-100",
      label: "SANY Grue sur Camion 50–100T",
      path: "/produits/sany-grue-camion-50-100t",
      description: "Capacité 50–100T pour chantiers industriels.",
      keywords: [
        "grue camion 50t", "grue 50t", "grue 80t", "grue 100t camion",
      ],
    },
    {
      id: "sany-grue-camion-leger",
      label: "SANY Grue sur Camion Légère (2–10T)",
      path: "/produits/sany-grue-montee-camion-2t",
      description: "Compacte, 2–10T, 8–25m de portée.",
      keywords: [
        "grue legere", "grue légère", "grue camion petit", "2t grue",
        "10t grue", "grue compact",
      ],
    },
    {
      id: "sany-grue-at-100-200",
      label: "SANY Grue Tout-Terrain 100–200T",
      path: "/produits/sany-grue-tout-terrain-100-200t",
      description: "SAC300/SAC400 — all-terrain 100–200T.",
      keywords: [
        "grue tout terrain", "all terrain crane", "sac300", "sac400",
        "grue 100t terrain", "grue route", "grue mobile",
      ],
      priority: 1,
    },
    {
      id: "sany-grue-at-200-300",
      label: "SANY Grue Tout-Terrain 200–300T",
      path: "/produits/sany-grue-tout-terrain-200-300t",
      description: "SAC4500S — projets majeurs en terrain accidenté.",
      keywords: [
        "sac4500", "grue tout terrain 200t", "grue 250t", "grue 300t terrain",
      ],
    },
    {
      id: "sany-grue-rt-30-50",
      label: "SANY Grue Terrain Accidenté 30–50T (SRC250C)",
      path: "/produits/sany-grue-terrain-accidente-30-50t",
      description: "Mobilité hors-route, capacité 30–50T.",
      keywords: [
        "grue terrain accidente", "rough terrain", "src250", "30t grue",
        "50t grue", "chantier difficile",
      ],
    },
    {
      id: "sany-grue-rt-50-80",
      label: "SANY Grue Terrain Accidenté 50–80T (SRC350C)",
      path: "/produits/sany-grue-terrain-accidente-50-80t",
      description: "SRC350C — capacité 50–80T tout-terrain.",
      keywords: [
        "src350", "grue 50t terrain", "grue 60t", "grue 80t terrain",
      ],
    },
    {
      id: "sany-grue-rt-80",
      label: "SANY Grue Terrain Accidenté +80T (SRC500C)",
      path: "/produits/sany-grue-terrain-accidente-80t",
      description: "SRC500C — grand levage en terrain difficile.",
      keywords: [
        "src500", "grue 100t terrain", "grue lourd accidente",
      ],
    },
    {
      id: "sany-grue-chenilles",
      label: "SANY Grue sur Chenilles (25–800T)",
      path: "/produits/sany-grue-chenilles-lattice",
      description: "SCC2600/3200/4000 — pour les plus grands projets.",
      keywords: [
        "grue chenilles", "crawler crane", "grue sur chenille", "scc",
        "scc2600", "scc3200", "scc4000", "grue 500t", "grue 800t",
        "grue treillis", "lattice boom",
      ],
      priority: 1,
    },

    // === SANY CONCRETE ===
    {
      id: "sany-pompe-beton-cam",
      label: "SANY Pompe à Béton sur Camion (<37m)",
      path: "/produits/sany-pompe-beton-camion-37m",
      description: "SYG5211THB — 100–150 m³/h, portée verticale 36m.",
      keywords: [
        "pompe beton camion", "pompe béton", "truck pump", "pump truck",
        "sygthb", "beton pompé", "coulage beton",
      ],
      priority: 1,
    },
    {
      id: "sany-pompe-beton-grande",
      label: "SANY Pompe à Béton Grande Portée (66m+)",
      path: "/produits/sany-pompe-beton-camion-grande-portee-66m",
      description: "Grande hauteur, idéale pour tours et IGH.",
      keywords: [
        "pompe beton grande portee", "pompe 66m", "pompe haute", "igh",
        "beton grande hauteur",
      ],
    },
    {
      id: "sany-pompe-stationnaire",
      label: "SANY Pompe à Béton Stationnaire",
      path: "/produits/sany-pompe-beton-stationnaire",
      description: "HBT9038CH — 60–120 m³/h, diesel ou électrique.",
      keywords: [
        "pompe stationnaire", "pompe beton fixe", "hbt", "hbt9038",
        "stationary pump", "beton stationnaire",
      ],
    },

    // === SANY BTP ===
    {
      id: "sany-chargeuse",
      label: "SANY Chargeuse sur Roues",
      path: "/produits/sany-chargeuse-roues",
      description: "SWL32F/50F/80F — godet 1.5–2.5 m³.",
      keywords: [
        "chargeuse", "chargeuse pneus", "wheel loader", "swl", "godet",
        "chargeur", "front loader",
      ],
      priority: 1,
    },
    {
      id: "sany-compacteur",
      label: "SANY Compacteur Vibrant",
      path: "/produits/sany-compacteur-vibrant",
      description: "SSR800/STR140 — compaction sol et béton.",
      keywords: [
        "compacteur", "rouleau vibrant", "compactage", "ssr800", "str140",
        "roller", "cylindre compacteur",
      ],
    },
    {
      id: "sany-niveleuse",
      label: "SANY Niveleuse",
      path: "/produits/sany-niveleuse",
      description: "STG800/SMG200 — finition routes et surfaces.",
      keywords: [
        "niveleuse", "motor grader", "grader", "stg800", "smg200",
        "planage", "profil route",
      ],
    },
    {
      id: "sany-finisseur",
      label: "SANY Finisseur d'Asphalte",
      path: "/produits/sany-finisseur",
      description: "SSP130C/SAP800 — pose d'asphalte ou béton.",
      keywords: [
        "finisseur", "asphalt finisher", "repandeuse", "asphalte",
        "bitume", "enrobage", "ssp130", "sap800",
      ],
    },
    {
      id: "sany-fraiseuse",
      label: "SANY Fraiseuse Routière",
      path: "/produits/sany-fraiseuse",
      description: "Rabotage et recyclage de revêtements routiers.",
      keywords: [
        "fraiseuse", "road milling", "raboteuse", "rabot", "decapage route",
        "milling machine",
      ],
    },
    {
      id: "sany-camion-benne",
      label: "SANY Camion Benne TP",
      path: "/produits/sany-camion-benne",
      description: "Transport de matériaux sur chantier.",
      keywords: [
        "camion benne", "benne tp", "dump truck", "camion chantier",
        "transport terre", "decombres",
      ],
    },
    {
      id: "sany-camion-minier",
      label: "SANY Camion Minier",
      path: "/produits/sany-camion-minier",
      description: "Camion de transport pour sites miniers.",
      keywords: [
        "camion minier", "mining truck", "haul truck", "camion mine",
        "tombereau", "dumper",
      ],
    },
    {
      id: "sany-reach-stacker",
      label: "SANY Reach Stacker",
      path: "/produits/sany-reach-stacker",
      description: "Manutention de conteneurs pleins et vides.",
      keywords: [
        "reach stacker", "porteur conteneur", "manutention conteneur",
        "container handler", "terminal conteneur",
      ],
    },
    {
      id: "sany-haveuse",
      label: "SANY Haveuse EBZ (Roadheader)",
      path: "/produits/sany-haveuse-ebz",
      description: "Série EBZ — excavation souterraine, mines.",
      keywords: [
        "haveuse", "roadheader", "tunnel", "galerie", "souterrain",
        "ebz", "excavation souterraine",
      ],
    },
    {
      id: "sany-haveuse-str",
      label: "SANY Haveuse STR",
      path: "/produits/sany-haveuse-str",
      description: "Série STR — haveuse pour roches dures.",
      keywords: ["haveuse str", "roadheader str", "roche dure"],
    },
    {
      id: "sany-haveuse-scr",
      label: "SANY Haveuse SCR",
      path: "/produits/sany-haveuse-scr",
      description: "Série SCR — haveuse compacte pour galeries.",
      keywords: ["haveuse scr", "roadheader scr", "galerie compacte"],
    },

    // === FABO ===
    {
      id: "fabo-concasseur-mobile",
      label: "FABO Concasseur Mobile sur Chenilles",
      path: "/produits/fabo-concasseur-mobile",
      description: "100–300T/h, mobile, granulats sur site.",
      keywords: [
        "concasseur mobile", "concasseur chenilles", "fabo", "ftb",
        "granulat", "pierre concassee", "gravier", "mobile crusher",
      ],
      priority: 1,
    },
    {
      id: "fabo-concasseur-hp",
      label: "FABO Station Concassage Mobile HP",
      path: "/produits/fabo-concasseur-mobile-hp",
      description: "Haute production, configuration modulaire.",
      keywords: [
        "concasseur hp", "high production", "station concassage mobile",
        "fabo hp", "production granulat",
      ],
    },
    {
      id: "fabo-station-fixe",
      label: "FABO Station de Concassage Fixe",
      path: "/produits/fabo-station-concassage-fixe",
      description: "Jaw, cone, VSI — station complète fixe.",
      keywords: [
        "concasseur fixe", "station fixe", "concasseur machoire",
        "concasseur cone", "jaw crusher", "cone crusher", "vsi",
      ],
    },
    {
      id: "fabo-centrale-beton",
      label: "FABO Centrale à Béton Fixe (POWERMIX)",
      path: "/produits/fabo-centrale-beton-fixe-standard",
      description: "POWERMIX-60/90/100 — 50–200 m³/h, Siemens.",
      keywords: [
        "centrale beton", "centrale à béton", "batching plant", "powermix",
        "fabo beton", "production beton", "usine beton", "centrale fixe",
      ],
      priority: 1,
    },
    {
      id: "fabo-centrale-mobile",
      label: "FABO Centrale à Béton Mobile",
      path: "/produits/fabo-centrale-beton-mobile",
      description: "Unité déplaçable, idéale pour chantiers itinérants.",
      keywords: [
        "centrale beton mobile", "centrale mobile", "batching mobile",
        "beton mobile", "chantier beton itinerant",
      ],
    },
    {
      id: "fabo-mix-compact",
      label: "FABO MIX-COMPACT 30 (Mini Centrale Béton)",
      path: "/produits/fabo-mix-compact-30",
      description: "Compacte, parfaite pour petits chantiers.",
      keywords: [
        "mix compact", "mini centrale beton", "petite centrale", "compact beton",
        "petit volume beton",
      ],
    },

    // === SUNWARD ===
    {
      id: "sunward-foreuse",
      label: "SUNWARD Foreuse de Roches",
      path: "/produits/sunward-rock-drilling-rig",
      description: "SWDRT200B–250B — forage mines et carrières.",
      keywords: [
        "foreuse", "forage", "drilling rig", "sunward", "swdrt",
        "forage roche", "forage mine", "foreuse carriere",
      ],
      priority: 1,
    },
    {
      id: "sunward-swdrt200",
      label: "SUNWARD SWDRT200B",
      path: "/produits/sunward-swdrt200b",
      description: "Foreuse de précision pour mine et carrière.",
      keywords: ["swdrt200", "swdrt200b", "200b"],
    },

    // === TEKSAN ===
    {
      id: "teksan-genset",
      label: "TEKSAN Groupe Électrogène Diesel",
      path: "/produits/teksan-diesel-generator",
      description: "Série TJ : 8 kVA à 2500+ kVA.",
      keywords: [
        "groupe electrogene", "groupe électrogène", "teksan", "generatrice",
        "genset", "kva", "generator diesel", "tj series", "tj50", "tj100",
        "tj200", "tj500", "groupe energie", "lectrticite chantier",
      ],
      priority: 1,
    },
    {
      id: "teksan-eclairage",
      label: "TEKSAN Tour d'Éclairage",
      path: "/produits/teksan-tours-eclairage",
      description: "Mâts LED/halogène, 7–9m, montage rapide.",
      keywords: [
        "tour eclairage", "tour d'éclairage", "mat eclairage", "lighting tower",
        "eclairage chantier", "tlt", "teksan lumiere",
      ],
    },
    {
      id: "teksan-solaire",
      label: "TEKSAN Tour d'Éclairage Solaire",
      path: "/produits/teksan-tour-eclairage-solaire",
      description: "100% solaire, zéro carburant, autonome.",
      keywords: [
        "tour solaire", "eclairage solaire", "solar tower", "panneau solaire",
        "off grid eclairage", "zero carburant",
      ],
    },

    // === SINOBOOM ===
    {
      id: "sinoboom-ciseaux",
      label: "SINOBOOM Nacelle Ciseaux",
      path: "/produits/sinoboom-scissor-lift",
      description: "Scissor lift 4–18m, électrique ou diesel.",
      keywords: [
        "nacelle ciseaux", "scissor lift", "plateforme elevante", "sinoboom",
        "nacelle elevante", "work platform", "elevation ciseaux",
        "plateforme ciseau",
      ],
      priority: 1,
    },
    {
      id: "sinoboom-telescopique",
      label: "SINOBOOM Nacelle Télescopique",
      path: "/produits/sinoboom-telescopic-boom-lift",
      description: "Boom télescopique jusqu'à 43m.",
      keywords: [
        "nacelle telescopique", "boom telescopique", "telescopic boom",
        "grande hauteur nacelle", "43m", "nacelle 30m", "nacelle 40m",
      ],
    },
    {
      id: "sinoboom-articulee",
      label: "SINOBOOM Nacelle Articulée",
      path: "/produits/sinoboom-articulating-boom-lift",
      description: "Articulée jusqu'à 28m, obstacles facilement.",
      keywords: [
        "nacelle articulee", "articulated boom", "nacelle coude",
        "nacelle obstacle", "cherry picker",
      ],
    },
    {
      id: "sinoboom-araignee",
      label: "SINOBOOM Nacelle Araignée",
      path: "/produits/sinoboom-spider-lift",
      description: "Spider lift pour terrains difficiles et étroits.",
      keywords: [
        "araignee", "spider lift", "nacelle araignee", "terrain difficile",
        "nacelle etroite",
      ],
    },

    // === E-MAK ===
    {
      id: "emak-expert",
      label: "E-MAK Centrale d'Enrobage EXPERT",
      path: "/produits/e-mak-expert",
      description: "Centrale d'asphalte EXPERT — haute qualité.",
      keywords: [
        "enrobage", "centrale enrobage", "asphalte usine", "emak", "e-mak",
        "bitume usine", "asphalt plant", "enrobe",
      ],
      priority: 1,
    },
    {
      id: "emak-express",
      label: "E-MAK Centrale d'Enrobage EXPRESS",
      path: "/produits/e-mak-express",
      description: "Compacte et mobile, déploiement rapide.",
      keywords: ["emak express", "centrale asphalte mobile", "e-mak express"],
    },
    {
      id: "emak-megaton",
      label: "E-MAK Centrale d'Enrobage MEGATON",
      path: "/produits/e-mak-megaton",
      description: "Grande capacité pour projets routiers majeurs.",
      keywords: ["megaton", "emak megaton", "grande centrale asphalte"],
    },

    // === AJAX ===
    {
      id: "ajax-argo-4000",
      label: "AJAX ARGO 4000 (Malaxeur Autochargeant 4.0m³)",
      path: "/produits/ajax-argo-4000",
      description: "ARGO 4000 — grande capacité, autonome.",
      keywords: [
        "ajax", "argo", "malaxeur autochargeant", "self loading mixer",
        "argo 4000", "beton autochargeant", "malaxeur autonome",
      ],
      priority: 1,
    },
    {
      id: "ajax-argo-2300",
      label: "AJAX ARGO 2300 (Malaxeur Autochargeant 2.3m³)",
      path: "/produits/ajax-argo-2300",
      description: "ARGO 2300 — compact et agile.",
      keywords: [
        "ajax", "argo", "malaxeur autochargeant", "self loading mixer",
        "argo 2300", "beton autochargeant",
      ],
      priority: 1,
    },
    {
      id: "ajax-argo-2000",
      label: "AJAX ARGO 2000 (Malaxeur 2m³)",
      path: "/produits/ajax-argo-2000",
      description: "Compact pour petits chantiers.",
      keywords: ["argo 2000", "ajax 2m3", "petit malaxeur"],
    },
  ];

  const brandLinks: LinkCandidate[] = brands.map((brand) => ({
    id: `brand-${toBrandSlug(brand.name)}`,
    label: `Gamme ${brand.name}`,
    path: `/marque/${toBrandSlug(brand.name)}`,
    description: `Voir tous les produits ${brand.name}.`,
    keywords: [brand.name.toLowerCase(), toBrandSlug(brand.name)],
    priority: 1,
  }));

  const candidates = [...baseLinks, ...solutionLinks, ...productLinks, ...brandLinks];

  const scored = candidates
    .map((candidate) => {
      const matchCount = candidate.keywords.reduce((count, keyword) => {
        return normalized.includes(normalizeText(keyword)) ? count + 1 : count;
      }, 0);
      const score =
        matchCount + (matchCount > 0 ? candidate.priority ?? 0 : 0);
      return { ...candidate, score };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score);

  const fallbackIds = ["devis", "solutions", "contact"];
  const fallback = baseLinks.filter((link) => fallbackIds.includes(link.id));
  const selected = scored.length > 0 ? scored : fallback;

  const unique = new Map<string, LinkCandidate & { score?: number }>();
  selected.forEach((candidate) => {
    if (!unique.has(candidate.path)) {
      unique.set(candidate.path, candidate);
    }
  });

  const baseUrl =
    origin && origin.startsWith("http") ? origin : BASE_URL_FALLBACK;
  return Array.from(unique.values())
    .slice(0, 5)
    .map((candidate) => ({
      label: candidate.label,
      href: new URL(candidate.path, baseUrl).toString(),
      description: candidate.description,
    }));
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const typedMessages = Array.isArray(messages)
      ? (messages as ChatMessage[])
      : [];
    const lastUserMessage = findLatestUserMessage(typedMessages);
    const linkSuggestions = buildLinkSuggestions(
      lastUserMessage,
      req.headers.get("origin")
    );

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          ...typedMessages,
        ],
        temperature: 0.35,
        stream: false,
        max_tokens: 200,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Groq API Error (${res.status}):`, errorText);
      return NextResponse.json(
        { error: `API Error: ${res.status} - ${errorText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content?.trim() || "No response.",
      links: linkSuggestions,
    });
  } catch (error: unknown) {
    console.error("API Route Error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
