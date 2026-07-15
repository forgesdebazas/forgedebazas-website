/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const fs = require("fs");
const path = require("path");

const rawData = require("../data/fabo_scraped_raw.json");

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseSpecTable(table) {
  if (!table || table.length < 2) return {};
  const specs = {};
  for (let i = 1; i < table.length; i++) {
    const row = table[i];
    if (row.length >= 4) {
      const k1 = row[0]?.trim();
      const v1 = row[1]?.trim();
      const k2 = row[2]?.trim();
      const v2 = row[3]?.trim();
      if (k1 && v1 && k1 !== "Turbomix-60" && !k1.includes("TEKNİK") && !k1.includes("DÉTAILS")) {
        specs[k1] = v1;
      }
      if (k2 && v2 && k2 !== "Turbomix-60" && !k2.includes("TEKNİK") && !k2.includes("DÉTAILS")) {
        specs[k2] = v2;
      }
    } else if (row.length >= 2) {
      const k = row[0]?.trim();
      const v = row[1]?.trim();
      if (k && v && k !== "Turbomix-60" && !k.includes("TEKNİK") && !k.includes("DÉTAILS")) {
        specs[k] = v;
      }
    }
  }
  return specs;
}

function parseMultiModelTable(table) {
  if (!table || table.length < 2) return [];
  const models = [];
  const headerRow = table[0];
  for (let col = 1; col < headerRow.length; col++) {
    const modelName = headerRow[col]?.trim();
    if (modelName && !modelName.includes("TEKNİK") && !modelName.includes("DÉTAILS") && modelName !== "Turbomix-60") {
      const specs = {};
      for (let row = 1; row < table.length; row++) {
        const key = table[row][0]?.trim();
        const val = table[row][col]?.trim();
        if (key && val && val !== "-") {
          specs[key] = val;
        }
      }
      if (Object.keys(specs).length > 0) {
        models.push({ name: modelName, specs });
      }
    }
  }
  return models;
}

function getMainSpecs(specs) {
  let portee = "";
  let pression = "";
  let sortie = "";

  for (const [key, val] of Object.entries(specs)) {
    const k = key.toUpperCase();
    if (!portee && k.includes("PRODUCTION")) {
      portee = `${key}: ${val}`;
    }
  }
  for (const [key, val] of Object.entries(specs)) {
    const k = key.toUpperCase();
    if (!portee && k.includes("CAPACIT") && !k.includes("MALAXEUR") && !k.includes("BETON") && !k.includes("BANDE") && !k.includes("CHARGEMENT")) {
      portee = `${key}: ${val}`;
    }
  }
  for (const [key, val] of Object.entries(specs)) {
    const k = key.toUpperCase();
    if (!pression && (k.includes("PUISSANCE") || k.includes("MOTEUR"))) {
      pression = `${key}: ${val}`;
    }
  }
  for (const [key, val] of Object.entries(specs)) {
    const k = key.toUpperCase();
    if (!sortie && (k.includes("POIDS") || k.includes("WEIGHT"))) {
      sortie = `${key}: ${val}`;
    }
  }
  // Secondary picks
  for (const [key, val] of Object.entries(specs)) {
    const k = key.toUpperCase();
    if (!portee && (k.includes("DIMENSION") || k.includes("TAILLE") || k.includes("ROTOR"))) {
      portee = `${key}: ${val}`;
    }
    if (!pression && (k.includes("VITESSE") || k.includes("SPEED"))) {
      pression = `${key}: ${val}`;
    }
    if (!sortie && (k.includes("ALIMENTATION") || k.includes("OUVERT"))) {
      sortie = `${key}: ${val}`;
    }
  }

  // Fallback for concrete plants
  if (!pression) {
    for (const [key, val] of Object.entries(specs)) {
      const k = key.toUpperCase();
      if (k.includes("MALAXEUR") && k.includes("TYPE")) {
        pression = `${key}: ${val}`;
        break;
      }
    }
  }
  if (!sortie) {
    for (const [key, val] of Object.entries(specs)) {
      const k = key.toUpperCase();
      if (k.includes("MALAXEUR") && k.includes("CAPACIT")) {
        sortie = `${key}: ${val}`;
        break;
      }
    }
  }

  if (!portee && !pression && !sortie) {
    const entries = Object.entries(specs);
    if (entries.length >= 1) portee = `${entries[0][0]}: ${entries[0][1]}`;
    if (entries.length >= 2) pression = `${entries[1][0]}: ${entries[1][1]}`;
    if (entries.length >= 3) sortie = `${entries[2][0]}: ${entries[2][1]}`;
  }

  if (!portee) portee = "Sur demande";
  if (!pression) pression = "Marque: FABO";
  if (!sortie) sortie = "Disponibilité: Sur demande";

  return { portee, pression, sortie };
}

function generateShortTitle(title) {
  const modelMatch = title.match(/^([A-Z]+-?\d+[A-Z]*(?:\s*(?:CR|OR|S))?)/i);
  if (modelMatch) return modelMatch[1].trim();

  // For concrete plants with model prefix
  const concreteMatch = title.match(/^((?:Turbomix|Powermix|Minimix|Mix Compact)-?\d+)/i);
  if (concreteMatch) return concreteMatch[1].trim();

  return title;
}

// Translation dictionaries
const TITLE_FR_TO_EN = {
  "Concasseur à mâchoires sur chenilles série": "Tracked Jaw Crusher Series",
  "Concasseur a Percussion Mobile sur Chenilles série": "Tracked Mobile Impact Crusher Series",
  "Concasseur a Cone sur Chenilles Série": "Tracked Cone Crusher Series",
  "Concasseur Verticale a Percussion sur Chenilles série": "Tracked Vertical Impact Crusher Series",
  "Concasseurs a Machoires": "Jaw Crusher",
  "Concasseur a  Percussion Primaire": "Primary Impact Crusher",
  "Concasseur a Percussion Primaire": "Primary Impact Crusher",
  "Broyeur a Percussion Secondaire": "Secondary Impact Crusher",
  "Concasseurs a Verticale a Percussion": "Vertical Shaft Impact Crusher",
  "Concasseurs a Cone": "Cone Crusher",
  "Concasseur a cone": "Cone Crusher",
  "Concasseurs Tertiaire": "Tertiary Crusher",
  "Crible Vibrant avec Grille en Polyurethane et Avec Systeme de Lavage": "Vibrating Screen with Polyurethane Grid and Washing System",
  "Crible vibrant horizontal a arbre – a boîte de vitesses": "Horizontal Vibrating Screen with Gearbox",
  "Crible Vibrant": "Vibrating Screen",
  "Double Arbre Vibrant": "Twin Shaft Vibrating Screen",
  "Tremie D'alimentation Vibrante": "Vibrating Feeder Hopper",
  "Alimenteur a Chenilles": "Track Feeder",
  "Alimenter Bande a Tablier": "Apron Belt Feeder",
  "Vis de Lavage a Sable": "Sand Washing Screw",
  "Centrales a Beton Mobiles": "Mobile Concrete Batching Plant",
  "Centrales a Beton Mobile avec Une Malaxeur a Pan": "Mobile Concrete Plant with Pan Mixer",
  "Centrales a Beton Mobile avec Une Malaxeur a Double": "Mobile Concrete Plant with Twin Shaft Mixer",
  "Centrale a Beton Fixe": "Stationary Concrete Plant",
  "Malaxeurs a Doubles Arbres": "Twin Shaft Mixers",
  "Malaxeur Planetaire": "Planetary Mixer",
  "MALAXEUR À PAN": "Pan Mixer",
  "Malaxeurs Axials a Un Seul Arbre": "Single Shaft Axial Mixers",
  "Silos de Ciment": "Cement Silos",
  "Bunker Agregat": "Aggregate Bunker",
};

const TITLE_FR_TO_ES = {
  "Concasseur à mâchoires sur chenilles série": "Trituradora de Mandíbulas sobre Orugas Serie",
  "Concasseur a Percussion Mobile sur Chenilles série": "Trituradora de Impacto Móvil sobre Orugas Serie",
  "Concasseur a Cone sur Chenilles Série": "Trituradora de Cono sobre Orugas Serie",
  "Concasseur Verticale a Percussion sur Chenilles série": "Trituradora de Impacto Vertical sobre Orugas Serie",
  "Concasseurs a Machoires": "Trituradora de Mandíbulas",
  "Concasseur a  Percussion Primaire": "Trituradora de Impacto Primaria",
  "Concasseur a Percussion Primaire": "Trituradora de Impacto Primaria",
  "Broyeur a Percussion Secondaire": "Trituradora de Impacto Secundaria",
  "Concasseurs a Verticale a Percussion": "Trituradora de Impacto de Eje Vertical",
  "Concasseurs a Cone": "Trituradora de Cono",
  "Concasseur a cone": "Trituradora de Cono",
  "Concasseurs Tertiaire": "Trituradora Terciaria",
  "Crible Vibrant avec Grille en Polyurethane et Avec Systeme de Lavage": "Criba Vibrante con Malla de Poliuretano y Sistema de Lavado",
  "Crible vibrant horizontal a arbre – a boîte de vitesses": "Criba Vibrante Horizontal con Caja de Engranajes",
  "Crible Vibrant": "Criba Vibrante",
  "Double Arbre Vibrant": "Criba Vibrante de Doble Eje",
  "Tremie D'alimentation Vibrante": "Tolva de Alimentación Vibrante",
  "Alimenteur a Chenilles": "Alimentador sobre Orugas",
  "Alimenter Bande a Tablier": "Alimentador de Banda de Delantal",
  "Vis de Lavage a Sable": "Tornillo de Lavado de Arena",
  "Centrales a Beton Mobiles": "Planta de Hormigón Móvil",
  "Centrales a Beton Mobile avec Une Malaxeur a Pan": "Planta de Hormigón Móvil con Mezclador de Pan",
  "Centrales a Beton Mobile avec Une Malaxeur a Double": "Planta de Hormigón Móvil con Mezclador de Doble Eje",
  "Centrale a Beton Fixe": "Planta de Hormigón Fija",
  "Malaxeurs a Doubles Arbres": "Mezcladores de Doble Eje",
  "Malaxeur Planetaire": "Mezclador Planetario",
  "MALAXEUR À PAN": "Mezclador de Pan",
  "Malaxeurs Axials a Un Seul Arbre": "Mezcladores Axiales de Un Solo Eje",
  "Silos de Ciment": "Silos de Cemento",
  "Bunker Agregat": "Búnker de Agregados",
};

function translateTitle(fr, dict) {
  let result = fr;
  // Sort by length descending to match longer patterns first
  const sorted = Object.entries(dict).sort((a, b) => b[0].length - a[0].length);
  for (const [frText, translated] of sorted) {
    if (result.includes(frText)) {
      result = result.replace(frText, translated);
    }
  }
  return result;
}

const SPEC_FR_TO_EN = [
  ["CAPACITÉ DE PRODUCTION", "PRODUCTION CAPACITY"],
  ["CAPACITÉ DU MALAXEUR", "MIXER CAPACITY"],
  ["CAPACITÉ DU BÉTON HUMIDE", "WET CONCRETE CAPACITY"],
  ["CAPACITÉ DU BÉTON FRAIS", "FRESH CONCRETE CAPACITY"],
  ["CAPACITÉ DU BÉTON COMPRIMÉ", "COMPRESSED CONCRETE CAPACITY"],
  ["CAPACITÉ DE LA BANDE", "BELT CAPACITY"],
  ["CAPACITÉ DE CHARGEMENT", "LOADING CAPACITY"],
  ["CAPASİTE", "CAPACITY"],
  ["CAPACITÉ", "CAPACITY"],
  ["Capacité de production", "Production Capacity"],
  ["PUISSANCE TOTALE DU MOTEUR", "TOTAL MOTOR POWER"],
  ["PUISSANCE DU MOTEUR", "MOTOR POWER"],
  ["Puissance du moteur", "Motor Power"],
  ["PUISSANCE", "POWER"],
  ["TAILLE D'OUVERTUTRE", "OPENING SIZE"],
  ["TAILLE DE LA BOUCHE", "MOUTH SIZE"],
  ["TAILLE DU ROTOR", "ROTOR SIZE"],
  ["TAILLE DU CRİBLE VIBRANT", "VIBRATING SCREEN SIZE"],
  ["Taille du rotor", "Rotor Size"],
  ["ALIMENTATION MAXIMALE", "MAX FEED SIZE"],
  ["Alimentation maximale", "Max Feed Size"],
  ["UNE NUTRITION OPTIMISÉE", "OPTIMIZED FEED"],
  ["OUVERTURE DE SORTIE", "OUTPUT OPENING"],
  ["OUVERTURE DE LA MÂCHOIRE", "JAW OPENING"],
  ["OUVERTURE DU MORS", "JAW OPENING"],
  ["ÉCART D'ALIMENTATION", "FEED GAP"],
  ["POIDS", "WEIGHT"],
  ["Poids", "Weight"],
  ["DIMENSIONS", "DIMENSIONS"],
  ["TREMIE D'AGREGAT", "AGGREGATE HOPPER"],
  ["TYPE DE MALAXEUR", "MIXER TYPE"],
  ["TYPE DE CONCASSEUR", "CRUSHER TYPE"],
  ["TYPE", "TYPE"],
  ["METHODE DE CHARGEMENT", "LOADING METHOD"],
  ["PESAGE AGRÉGÉ", "AGGREGATE WEIGHING"],
  ["PESAGE DU CIMENT", "CEMENT WEIGHING"],
  ["PESAGE DE L'EAU", "WATER WEIGHING"],
  ["PESAGE ADDITIF", "ADDITIVE WEIGHING"],
  ["SYSTÈMES DE CONTRÔLE", "CONTROL SYSTEMS"],
  ["CHAMBRE DE CONTRÔLE", "CONTROL ROOM"],
  ["DIAMÈTRE DE LA VIS", "SCREW DIAMETER"],
  ["COMPRESSEUR", "COMPRESSOR"],
  ["LARGEUR  D'ALIMENTATION", "FEED WIDTH"],
  ["LARGEUR D'ALIMENTATION", "FEED WIDTH"],
  ["LONGUEUR D'ALIMENTATION", "FEED LENGTH"],
  ["VOLUME DE TREMİE", "HOPPER VOLUME"],
  ["BESOINS EN EAU", "WATER REQUIREMENTS"],
  ["LA VITESSE", "SPEED"],
  ["Vitesse", "Speed"],
  ["Sur demande", "On request"],
  ["Disponibilité", "Availability"],
  ["Marque: FABO", "Brand: FABO"],
  ["RÉDUCTEUR", "REDUCER"],
  ["MÉTHODE DE DÉCHARGEMENT", "DISCHARGE METHOD"],
];

const SPEC_FR_TO_ES = [
  ["CAPACITÉ DE PRODUCTION", "CAPACIDAD DE PRODUCCIÓN"],
  ["CAPACITÉ DU MALAXEUR", "CAPACIDAD DEL MEZCLADOR"],
  ["CAPACITÉ DU BÉTON HUMIDE", "CAPACIDAD DE HORMIGÓN HÚMEDO"],
  ["CAPACITÉ DU BÉTON FRAIS", "CAPACIDAD DE HORMIGÓN FRESCO"],
  ["CAPACITÉ DU BÉTON COMPRIMÉ", "CAPACIDAD DE HORMIGÓN COMPRIMIDO"],
  ["CAPACITÉ DE LA BANDE", "CAPACIDAD DE LA CINTA"],
  ["CAPACITÉ DE CHARGEMENT", "CAPACIDAD DE CARGA"],
  ["CAPASİTE", "CAPACIDAD"],
  ["CAPACITÉ", "CAPACIDAD"],
  ["Capacité de production", "Capacidad de producción"],
  ["PUISSANCE TOTALE DU MOTEUR", "POTENCIA TOTAL DEL MOTOR"],
  ["PUISSANCE DU MOTEUR", "POTENCIA DEL MOTOR"],
  ["Puissance du moteur", "Potencia del motor"],
  ["PUISSANCE", "POTENCIA"],
  ["TAILLE D'OUVERTUTRE", "TAMAÑO DE APERTURA"],
  ["TAILLE DE LA BOUCHE", "TAMAÑO DE BOCA"],
  ["TAILLE DU ROTOR", "TAMAÑO DEL ROTOR"],
  ["TAILLE DU CRİBLE VIBRANT", "TAMAÑO DE CRIBA VIBRANTE"],
  ["Taille du rotor", "Tamaño del rotor"],
  ["ALIMENTATION MAXIMALE", "ALIMENTACIÓN MÁXIMA"],
  ["Alimentation maximale", "Alimentación máxima"],
  ["UNE NUTRITION OPTIMISÉE", "ALIMENTACIÓN OPTIMIZADA"],
  ["OUVERTURE DE SORTIE", "APERTURA DE SALIDA"],
  ["OUVERTURE DE LA MÂCHOIRE", "APERTURA DE MANDÍBULA"],
  ["OUVERTURE DU MORS", "APERTURA DE MANDÍBULA"],
  ["ÉCART D'ALIMENTATION", "DISTANCIA DE ALIMENTACIÓN"],
  ["POIDS", "PESO"],
  ["Poids", "Peso"],
  ["DIMENSIONS", "DIMENSIONES"],
  ["TREMIE D'AGREGAT", "TOLVA DE AGREGADOS"],
  ["TYPE DE MALAXEUR", "TIPO DE MEZCLADOR"],
  ["TYPE DE CONCASSEUR", "TIPO DE TRITURADORA"],
  ["TYPE", "TIPO"],
  ["METHODE DE CHARGEMENT", "MÉTODO DE CARGA"],
  ["PESAGE AGRÉGÉ", "PESAJE DE AGREGADOS"],
  ["PESAGE DU CIMENT", "PESAJE DE CEMENTO"],
  ["PESAGE DE L'EAU", "PESAJE DE AGUA"],
  ["PESAGE ADDITIF", "PESAJE DE ADITIVOS"],
  ["SYSTÈMES DE CONTRÔLE", "SISTEMAS DE CONTROL"],
  ["CHAMBRE DE CONTRÔLE", "SALA DE CONTROL"],
  ["DIAMÈTRE DE LA VIS", "DIÁMETRO DEL TORNILLO"],
  ["COMPRESSEUR", "COMPRESOR"],
  ["LARGEUR  D'ALIMENTATION", "ANCHO DE ALIMENTACIÓN"],
  ["LARGEUR D'ALIMENTATION", "ANCHO DE ALIMENTACIÓN"],
  ["LONGUEUR D'ALIMENTATION", "LARGO DE ALIMENTACIÓN"],
  ["VOLUME DE TREMİE", "VOLUMEN DE TOLVA"],
  ["BESOINS EN EAU", "NECESIDADES DE AGUA"],
  ["LA VITESSE", "VELOCIDAD"],
  ["Vitesse", "Velocidad"],
  ["Sur demande", "Bajo pedido"],
  ["Disponibilité", "Disponibilidad"],
  ["Marque: FABO", "Marca: FABO"],
  ["RÉDUCTEUR", "REDUCTOR"],
  ["MÉTHODE DE DÉCHARGEMENT", "MÉTODO DE DESCARGA"],
];

function translateSpec(spec, dict) {
  if (!spec) return spec;
  let result = spec;
  for (const [from, to] of dict) {
    result = result.replace(from, to);
  }
  return result;
}

function extractNumericSpecs(specs) {
  const result = {};
  for (const [key, val] of Object.entries(specs)) {
    const k = key.toUpperCase();
    if (k.includes("POIDS") || k === "WEIGHT") {
      const match = val.replace(/\./g, "").replace(/\s/g, "").match(/(\d+)/);
      if (match) result.weight = parseInt(match[1]) / 1000;
    }
    if (k.includes("PRODUCTION") && !result.capacity) {
      const match = val.match(/(\d+)/);
      if (match) result.capacity = parseInt(match[1]);
    }
    if ((k.includes("CAPACIT") || k.includes("CAPASİTE")) && !k.includes("MALAXEUR") && !k.includes("BETON") && !k.includes("BANDE") && !k.includes("CHARGEMENT") && !result.capacity) {
      const match = val.match(/(\d+)/);
      if (match) result.capacity = parseInt(match[1]);
    }
    if ((k.includes("PUISSANCE") || k.includes("MOTEUR")) && !result.power) {
      const match = val.match(/(\d+)/);
      if (match) result.power = parseInt(match[1]);
    }
  }
  return Object.keys(result).length > 0 ? result : null;
}

function buildModelStrings(specs) {
  const models = [];
  for (const [key, val] of Object.entries(specs)) {
    models.push(`${key}: ${val}`);
  }
  return models;
}

// ------ Main generation ------

const products = [];

for (const [sectionKey, sectionData] of Object.entries(rawData)) {
  for (const sub of sectionData.subcategories) {
    // Map subcategory name to granular category ID
    const subCategoryMap = {
      "Concasseurs Mobiles sur Chenilles": "concasseurs-mobiles-chenilles",
      "Cribles Vibrants Mobile sur Chenilles": "cribles-vibrants-mobile-sur-chenilles",
      "FTB 15-50 Crible De Scalpeur Sur Chenilles": "crible-de-scalpeur-sur-chenilles",
      "Concasseur Mobile a Percussion": "concasseur-mobile-a-percussion",
      "Machines de Fabrication de Sable Mobile": "machines-de-fabrication-de-sable-mobile",
      "Concasseurs Mobiles et Criblage et Lavage": "concasseurs-mobiles-et-criblage-et-lavage",
      "Installations mobiles de criblage et de lavage": "installations-mobiles-de-criblage-et-de-lavage",
      "Usine de Concassage Primaire Mobile": "usine-de-concassage-primaire-mobile",
      "Usine de Concassage et Criblage Secondaire": "usine-de-concassage-et-criblage-secondaire",
      "Installation de Concassage a Percussion Mobile a-Arbre Vertical": "installation-de-concassage-a-percussion-mobile-a-arbre-vertical",
      "Concasseur a Machoire Mobile Type Container": "concasseur-a-machoire-mobile-type-container",
      "Concasseurs à Mâchoires": "concasseurs-a-machoires",
      "Concasseur à Percussion Primaire": "concasseur-percussion-primaire",
      "Broyeur à Percussion Secondaire DMK": "broyeur-percussion-secondaire-dmk",
      "Concasseurs à Percussion à Arbre Vertical": "concasseurs-percussion-arbre-vertical",
      "Concasseurs à Cône": "concasseurs-a-cone",
      "Concasseurs Tertiaire": "concasseurs-tertiaire",
      "Crible Vibrant": "crible-vibrant",
      "Trémie D'alimentation Vibrante": "tremie-alimentation-vibrante",
      "Crible de Déshydratation Hydrocyclone": "crible-deshydratation-hydrocyclone",
      "Vis de Lavage à Sable": "vis-lavage-sable",
      "Centrales à Béton Mobiles": "centrales-beton-mobiles",
      "Centrales à Béton Fixes": "centrales-beton-fixes",
    };

    let category = subCategoryMap[sub.name];
    if (!category) {
      if (sectionKey.includes("concassage") && sectionKey.includes("mobile")) category = "concassage-mobile";
      else if (sectionKey.includes("concassage") && sectionKey.includes("fixe")) category = "concassage-fixe";
      else if (sectionKey.includes("beton") && sectionKey.includes("mobile")) category = "centrales-beton-mobiles";
      else if (sectionKey.includes("beton") && sectionKey.includes("fixe")) category = "centrales-beton-fixes";
      else continue;
    }

    for (const prod of sub.products) {
      const detail = prod.detail;
      if (!detail) continue;

      const title = detail.title || prod.listTitle;
      if (!title) continue;

      const rawImage = detail.images?.[0]?.src || prod.listImage || "";
      const image = rawImage.replace("fabo-59e2.kxcdn.com", "fabo.com.tr");
      const specs = detail.tables?.length > 0 ? parseSpecTable(detail.tables[0]) : {};
      const description = detail.descriptions?.[0] || "";

      const id = "fabo-" + slugify(title);
      const mainSpecs = getMainSpecs(specs);
      const numericSpecs = extractNumericSpecs(specs);
      const modelStrings = buildModelStrings(specs);

      const titleEn = translateTitle(title, TITLE_FR_TO_EN);
      const titleEs = translateTitle(title, TITLE_FR_TO_ES);
      const shortFr = generateShortTitle(title);
      const shortEn = translateTitle(shortFr, TITLE_FR_TO_EN);
      const shortEs = translateTitle(shortFr, TITLE_FR_TO_ES);

      const descFr = description || `${title} – Équipement FABO`;
      const descEn = translateTitle(descFr.replace("– Équipement FABO", "– FABO Equipment"), TITLE_FR_TO_EN);
      const descEs = translateTitle(descFr.replace("– Équipement FABO", "– Equipo FABO"), TITLE_FR_TO_ES);

      products.push({
        id,
        category,
        brand: "FABO",
        title: { fr: title, en: titleEn, es: titleEs },
        shortTitle: { fr: shortFr, en: shortEn, es: shortEs },
        description: { fr: descFr, en: descEn, es: descEs },
        specs: {
          portee: {
            fr: mainSpecs.portee,
            en: translateSpec(mainSpecs.portee, SPEC_FR_TO_EN),
            es: translateSpec(mainSpecs.portee, SPEC_FR_TO_ES),
          },
          pression: {
            fr: mainSpecs.pression,
            en: translateSpec(mainSpecs.pression, SPEC_FR_TO_EN),
            es: translateSpec(mainSpecs.pression, SPEC_FR_TO_ES),
          },
          sortie: {
            fr: mainSpecs.sortie,
            en: translateSpec(mainSpecs.sortie, SPEC_FR_TO_EN),
            es: translateSpec(mainSpecs.sortie, SPEC_FR_TO_ES),
          },
        },
        numericSpecs,
        models: modelStrings,
        image,
        featured: category.includes("mobile"),
        available: true,
      });
    }
  }
}

// Generate TypeScript
let ts = `import type { Product } from "@/lib/types";

export const faboScrapedProducts: Product[] = [\n`;

for (const p of products) {
  ts += `  {\n`;
  ts += `    id: ${JSON.stringify(p.id)},\n`;
  ts += `    category: ${JSON.stringify(p.category)},\n`;
  ts += `    brand: "FABO",\n`;
  ts += `    title: {\n`;
  ts += `      fr: ${JSON.stringify(p.title.fr)},\n`;
  ts += `      en: ${JSON.stringify(p.title.en)},\n`;
  ts += `      es: ${JSON.stringify(p.title.es)},\n`;
  ts += `    },\n`;
  ts += `    shortTitle: {\n`;
  ts += `      fr: ${JSON.stringify(p.shortTitle.fr)},\n`;
  ts += `      en: ${JSON.stringify(p.shortTitle.en)},\n`;
  ts += `      es: ${JSON.stringify(p.shortTitle.es)},\n`;
  ts += `    },\n`;
  ts += `    description: {\n`;
  ts += `      fr: ${JSON.stringify(p.description.fr)},\n`;
  ts += `      en: ${JSON.stringify(p.description.en)},\n`;
  ts += `      es: ${JSON.stringify(p.description.es)},\n`;
  ts += `    },\n`;
  ts += `    specs: {\n`;
  ts += `      portee: {\n`;
  ts += `        fr: ${JSON.stringify(p.specs.portee.fr)},\n`;
  ts += `        en: ${JSON.stringify(p.specs.portee.en)},\n`;
  ts += `        es: ${JSON.stringify(p.specs.portee.es)},\n`;
  ts += `      },\n`;
  ts += `      pression: {\n`;
  ts += `        fr: ${JSON.stringify(p.specs.pression.fr)},\n`;
  ts += `        en: ${JSON.stringify(p.specs.pression.en)},\n`;
  ts += `        es: ${JSON.stringify(p.specs.pression.es)},\n`;
  ts += `      },\n`;
  ts += `      sortie: {\n`;
  ts += `        fr: ${JSON.stringify(p.specs.sortie.fr)},\n`;
  ts += `        en: ${JSON.stringify(p.specs.sortie.en)},\n`;
  ts += `        es: ${JSON.stringify(p.specs.sortie.es)},\n`;
  ts += `      },\n`;
  ts += `    },\n`;

  if (p.numericSpecs) {
    ts += `    numericSpecs: {\n`;
    if (p.numericSpecs.weight) ts += `      weight: ${p.numericSpecs.weight},\n`;
    if (p.numericSpecs.capacity) ts += `      capacity: ${p.numericSpecs.capacity},\n`;
    if (p.numericSpecs.power) ts += `      power: ${p.numericSpecs.power},\n`;
    ts += `    },\n`;
  }

  ts += `    models: ${JSON.stringify(p.models)},\n`;
  ts += `    image:\n`;
  ts += `      ${JSON.stringify(p.image)},\n`;
  ts += `    featured: ${p.featured},\n`;
  ts += `    available: true,\n`;
  ts += `  },\n`;
}

ts += `];\n`;

fs.writeFileSync(path.join(__dirname, "..", "data", "faboScrapedProducts.ts"), ts);
console.log(`Generated ${products.length} products in data/faboScrapedProducts.ts`);

// Summary
const byCat = {};
for (const p of products) {
  if (!byCat[p.category]) byCat[p.category] = [];
  byCat[p.category].push(`${p.title.fr} (${p.models.length} specs)`);
}
for (const [cat, prods] of Object.entries(byCat)) {
  console.log(`\n${cat}: ${prods.length} products`);
  for (const t of prods) console.log(`  - ${t}`);
}
