export type SunwardLanguage = "fr" | "en" | "es";

type Translation = { en: string; es: string };

export const SUNWARD_CATEGORY_NAMES: Record<string, Record<SunwardLanguage, string>> = {
  "tophammer-drilling-rig": { fr: "Foreuse de surface hors du trou", en: "Top Hammer Drilling Rig", es: "Perforadora de martillo en cabeza" },
  "dth-drilling-rig": { fr: "Foreuse de surface fond du trou", en: "DTH Drilling Rig", es: "Perforadora de fondo DTH" },
  "rotary-blasthole-drilling-rig": { fr: "Foreuse de surface rotative", en: "Rotary Blasthole Drilling Rig", es: "Perforadora rotativa de barrenos" },
};

const GROUP_NAMES: Record<string, Translation> = {
  "Alimentation": { en: "Feed System", es: "Sistema de avance" },
  "Article": { en: "Item", es: "Elemento" },
  "Boom": { en: "Boom", es: "Pluma" },
  "Boom de foret": { en: "Drill Boom", es: "Pluma de perforación" },
  "Châssis": { en: "Chassis", es: "Chasis" },
  "Compresseur d'air": { en: "Air Compressor", es: "Compresor de aire" },
  "Dimension": { en: "Dimensions", es: "Dimensiones" },
  "Dimensions globales": { en: "Overall Dimensions", es: "Dimensiones generales" },
  "Général": { en: "General", es: "General" },
  "Gréement de forage de roche hydraulique": { en: "Hydraulic Rock Drill", es: "Perforadora hidráulica de roca" },
  "Groupe d'électricité": { en: "Power Unit", es: "Unidad de potencia" },
  "Groupe de présélection": { en: "Preselection Group", es: "Grupo de preselección" },
  "Méthode de forage": { en: "Drilling Method", es: "Método de perforación" },
  "Moteur": { en: "Engine", es: "Motor" },
  "Paramètres de fonctionnement": { en: "Operating Parameters", es: "Parámetros de funcionamiento" },
  "Paramètres principaux": { en: "Main Parameters", es: "Parámetros principales" },
  "Perceur de roche hydraulique": { en: "Hydraulic Rock Drill", es: "Perforadora hidráulica de roca" },
  "Système d'alimentation": { en: "Feed System", es: "Sistema de avance" },
  "Tête": { en: "Head", es: "Cabezal" },
  "Transporteur": { en: "Carrier", es: "Transportador" },
};

const SPEC_NAMES: Record<string, Translation> = {
  "Diamètre du trou": { en: "Hole Diameter", es: "Diámetro del barreno" },
  "Diamètre du trou DTH": { en: "DTH Hole Diameter", es: "Diámetro del barreno DTH" },
  "Diamètre du trou rotatif": { en: "Rotary Hole Diameter", es: "Diámetro del barreno rotativo" },
  "Profondeur de trou": { en: "Hole Depth", es: "Profundidad del barreno" },
  "Profondeur de trou maximale": { en: "Maximum Hole Depth", es: "Profundidad máxima del barreno" },
  "Plage de forage": { en: "Drilling Range", es: "Rango de perforación" },
  "Méthode de forage": { en: "Drilling Method", es: "Método de perforación" },
  "Angle de forage (facultatif)": { en: "Drilling Angle (optional)", es: "Ángulo de perforación (opcional)" },
  "Diamètre de la tige de forage": { en: "Drill Rod Diameter", es: "Diámetro de la barra de perforación" },
  "Diamètre du tuyau de perceuse": { en: "Drill Pipe Diameter", es: "Diámetro del tubo de perforación" },
  "Longueur de tige de forage": { en: "Drill Rod Length", es: "Longitud de la barra de perforación" },
  "Longueur de tuyau de perceuse": { en: "Drill Pipe Length", es: "Longitud del tubo de perforación" },
  "Dimensions de foret en acier": { en: "Drill Steel Size", es: "Tamaño del acero de perforación" },
  "Puissance du moteur": { en: "Engine Power", es: "Potencia del motor" },
  "Puissance d'impact": { en: "Impact Power", es: "Potencia de impacto" },
  "Couple": { en: "Torque", es: "Par" },
  "Couple de rotation": { en: "Rotation Torque", es: "Par de rotación" },
  "Vitesse de rotation": { en: "Rotation Speed", es: "Velocidad de rotación" },
  "Vitesse rotative": { en: "Rotation Speed", es: "Velocidad de rotación" },
  "Pression de travail": { en: "Working Pressure", es: "Presión de trabajo" },
  "Pression": { en: "Pressure", es: "Presión" },
  "Pression du sol": { en: "Ground Pressure", es: "Presión sobre el suelo" },
  "Force d'alimentation": { en: "Feed Force", es: "Fuerza de avance" },
  "Max. force d'alimentation": { en: "Max. Feed Force", es: "Fuerza máx. de avance" },
  "Taux d'alimentation": { en: "Feed Rate", es: "Velocidad de avance" },
  "Max. taux d'alimentation": { en: "Max. Feed Rate", es: "Velocidad máx. de avance" },
  "Force de traction": { en: "Tractive Force", es: "Fuerza de tracción" },
  "Max. force de traction": { en: "Max. Tractive Force", es: "Fuerza máx. de tracción" },
  "Max.traction": { en: "Max. Tractive Force", es: "Fuerza máx. de tracción" },
  "Vitesse de déplacement": { en: "Travel Speed", es: "Velocidad de desplazamiento" },
  "Vitesse de trammage": { en: "Travel Speed", es: "Velocidad de desplazamiento" },
  "Max. vitesse de trammage": { en: "Max. Travel Speed", es: "Velocidad máx. de desplazamiento" },
  "Gradabilité": { en: "Gradeability", es: "Pendiente superable" },
  "Gradabilité °": { en: "Gradeability", es: "Pendiente superable" },
  "Poids": { en: "Weight", es: "Peso" },
  "Poids brut": { en: "Gross Weight", es: "Peso bruto" },
  "L × W × H (travail)": { en: "L × W × H (working)", es: "L × A × H (trabajo)" },
  "L × W × H (transport)": { en: "L × W × H (transport)", es: "L × A × H (transporte)" },
  "Capacité du réservoir de carburant": { en: "Fuel Tank Capacity", es: "Capacidad del depósito de combustible" },
  "Volume du réservoir de carburant": { en: "Fuel Tank Capacity", es: "Capacidad del depósito de combustible" },
  "Réservoir à carburant": { en: "Fuel Tank", es: "Depósito de combustible" },
  "Collecteur de poussière": { en: "Dust Collector", es: "Colector de polvo" },
  "Dispositif d'élimination de la poussière": { en: "Dust Removal Device", es: "Dispositivo de eliminación de polvo" },
  "Dureté rocheuse": { en: "Rock Hardness", es: "Dureza de la roca" },
  "Modèle": { en: "Model", es: "Modelo" },
  "Marque": { en: "Brand", es: "Marca" },
  "Type de puissance": { en: "Power Type", es: "Tipo de potencia" },
  "Pouvoir": { en: "Power", es: "Potencia" },
  "Cote de puissance": { en: "Rated Power", es: "Potencia nominal" },
};

const lookup = (map: Record<string, Translation>, value: string, language: SunwardLanguage) => {
  if (language === "fr") return value;
  const normalized = value.normalize("NFC").replace(/\s+/g, " ").trim();
  const match = Object.entries(map).find(([key]) => key.normalize("NFC") === normalized)?.[1];
  return match?.[language] ?? value;
};

export const translateSunwardGroup = (value: string, language: SunwardLanguage) => lookup(GROUP_NAMES, value, language);
export const translateSunwardSpec = (value: string, language: SunwardLanguage) => lookup(SPEC_NAMES, value, language);
export const getSunwardCategoryName = (slug: string, language: SunwardLanguage) => SUNWARD_CATEGORY_NAMES[slug]?.[language] ?? slug;
export const getSunwardProductName = (reference: string, categorySlug: string, language: SunwardLanguage) =>
  `${reference} — ${getSunwardCategoryName(categorySlug, language)}`;
