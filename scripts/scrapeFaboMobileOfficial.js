/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const MOBILE_SUBCATEGORIES = [
  {
    category: "cribles-vibrants-mobile-sur-chenilles",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/cribles-vibrants-mobile-sur-chenilless/",
  },
  {
    category: "crible-de-scalpeur-sur-chenilles",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/crible-de-scalpeur-sur-chenilles/",
  },
  {
    category: "concasseur-mobile-a-percussion",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/concasseur-mobile-a-percussionn/",
  },
  {
    category: "machines-de-fabrication-de-sable-mobile",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/machines-de-fabrication-de-sable-mobile/",
  },
  {
    category: "concasseurs-mobiles-et-criblage-et-lavage",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/concasseurs-mobiles-et-criblage-et-lavage/",
  },
  {
    category: "installations-mobiles-de-criblage-et-de-lavage",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/installations-mobiles-de-criblage-et-de-lavage/",
  },
  {
    category: "usine-de-concassage-primaire-mobile",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/usine-de-concassage-primaire-mobile/",
  },
  {
    category: "usine-de-concassage-et-criblage-secondaire",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/usine-de-concassage-et-criblage-secondaire/",
  },
  {
    category: "installation-de-concassage-a-percussion-mobile-a-arbre-vertical",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/installation-de-concassage-a-percussion-mobile-a-arbre-vertical/",
  },
  {
    category: "concasseur-a-machoire-mobile-type-container",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/concasseur-a-machoire-mobile-type-container/",
  },
];

function decodeHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/\s+/g, " ")
    .trim();
}

function absolutize(url) {
  if (!url) return "";
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `https://fabo.com.tr${url}`;
  return url;
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function replaceMany(text, replacements) {
  let result = text || "";
  for (const [from, to] of replacements) {
    result = result.replace(new RegExp(from, "gi"), to);
  }
  return result;
}

const TITLE_TO_EN = [
  ["Installation Mobile de Criblage", "Mobile Screening Plant"],
  ["Crible Vibrant Mobile sur Chenilles", "Tracked Mobile Vibrating Screen"],
  ["Crible De Scalpeur Sur Chenilles", "Tracked Scalper Screen"],
  ["Crible Scalpeur Sur Chenilles", "Tracked Scalper Screen"],
  ["Concasseur Mobile a Percussion", "Mobile Impact Crusher"],
  ["Concasseur Mobile à Percussion", "Mobile Impact Crusher"],
  ["Machines de Fabrication de Sable Mobile", "Mobile Sand Making Machines"],
  ["Concasseurs Mobiles et Criblage et Lavage", "Mobile Crushers, Screening and Washing"],
  ["Installations mobiles de criblage et de lavage", "Mobile Screening and Washing Plants"],
  ["Usine de Concassage Primaire Mobile", "Mobile Primary Crushing Plant"],
  ["Usine de Concassage et Criblage Secondaire", "Mobile Secondary Crushing and Screening Plant"],
  ["Installation de Concassage a Percussion Mobile a-Arbre Vertical", "Mobile Vertical Shaft Impact Crushing Plant"],
  ["Installation de Concassage a Percussion Mobile a Arbre Vertical", "Mobile Vertical Shaft Impact Crushing Plant"],
  ["Installation de Concassage à Percussion Mobile à Arbre Vertical", "Mobile Vertical Shaft Impact Crushing Plant"],
  ["Concasseur a Machoire Mobile Type Container", "Container Type Mobile Jaw Crusher"],
  ["Concasseur à Machoire Mobile Type Container", "Container Type Mobile Jaw Crusher"],
  ["sur Chenilles", "Tracked"],
  ["a Percussion", "Impact"],
  ["à Percussion", "Impact"],
  ["Concasseur", "Crusher"],
  ["Crible", "Screen"],
  ["Mobile", "Mobile"],
];

const TITLE_TO_ES = [
  ["Installation Mobile de Criblage", "Planta Movil de Cribado"],
  ["Crible Vibrant Mobile sur Chenilles", "Criba Vibratoria Movil sobre Orugas"],
  ["Crible De Scalpeur Sur Chenilles", "Criba Scalper sobre Orugas"],
  ["Crible Scalpeur Sur Chenilles", "Criba Scalper sobre Orugas"],
  ["Concasseur Mobile a Percussion", "Trituradora Movil de Impacto"],
  ["Concasseur Mobile à Percussion", "Trituradora Movil de Impacto"],
  ["Machines de Fabrication de Sable Mobile", "Maquinas Moviles de Fabricacion de Arena"],
  ["Concasseurs Mobiles et Criblage et Lavage", "Trituradoras Moviles, Cribado y Lavado"],
  ["Installations mobiles de criblage et de lavage", "Instalaciones Moviles de Cribado y Lavado"],
  ["Usine de Concassage Primaire Mobile", "Planta Movil de Trituracion Primaria"],
  ["Usine de Concassage et Criblage Secondaire", "Planta Movil de Trituracion y Cribado Secundaria"],
  ["Installation de Concassage a Percussion Mobile a-Arbre Vertical", "Planta Movil de Trituracion de Impacto de Eje Vertical"],
  ["Installation de Concassage a Percussion Mobile a Arbre Vertical", "Planta Movil de Trituracion de Impacto de Eje Vertical"],
  ["Installation de Concassage à Percussion Mobile à Arbre Vertical", "Planta Movil de Trituracion de Impacto de Eje Vertical"],
  ["Concasseur a Machoire Mobile Type Container", "Trituradora Movil de Mandibulas Tipo Contenedor"],
  ["Concasseur à Machoire Mobile Type Container", "Trituradora Movil de Mandibulas Tipo Contenedor"],
  ["sur Chenilles", "sobre Orugas"],
  ["a Percussion", "de Impacto"],
  ["à Percussion", "de Impacto"],
  ["Concasseur", "Trituradora"],
  ["Crible", "Criba"],
];

const SPEC_TO_EN = [
  ["CAPACITÉ DE PRODUCTION", "PRODUCTION CAPACITY"],
  ["CAPACITE DE PRODUCTION", "PRODUCTION CAPACITY"],
  ["CAPACITÃ‰ DE PRODUCTION", "PRODUCTION CAPACITY"],
  ["PUISSANCE TOTALE DU MOTEUR", "TOTAL MOTOR POWER"],
  ["PUISSANCE", "POWER"],
  ["TAILLE DE CRİBLE VIBRANT", "VIBRATING SCREEN SIZE"],
  ["TAILLE DE CRIBLE VIBRANT", "VIBRATING SCREEN SIZE"],
  ["BANDE DE CRİBLE VİBRANTE", "VIBRATING SCREEN BELT"],
  ["BANDE DE CRIBLE VIBRANTE", "VIBRATING SCREEN BELT"],
  ["ALIMENTATION MAXIMALE", "MAX FEED SIZE"],
  ["TAILLE DU ROTOR", "ROTOR SIZE"],
  ["GÉNÉRATEUR \\(EN OPTION\\)", "GENERATOR (OPTIONAL)"],
  ["GENERATEUR \\(EN OPTION\\)", "GENERATOR (OPTIONAL)"],
  ["POIDS", "WEIGHT"],
  ["DIMENSIONS", "DIMENSIONS"],
  ["Marque", "Brand"],
  ["Sur demande", "On request"],
  ["Disponibilite", "Availability"],
  ["Disponibilité", "Availability"],
  ["TONNE", "TON"],
];

const SPEC_TO_ES = [
  ["CAPACITÉ DE PRODUCTION", "CAPACIDAD DE PRODUCCION"],
  ["CAPACITE DE PRODUCTION", "CAPACIDAD DE PRODUCCION"],
  ["CAPACITÃ‰ DE PRODUCTION", "CAPACIDAD DE PRODUCCION"],
  ["PUISSANCE TOTALE DU MOTEUR", "POTENCIA TOTAL DEL MOTOR"],
  ["PUISSANCE", "POTENCIA"],
  ["TAILLE DE CRİBLE VIBRANT", "TAMANO DE CRIBA VIBRANTE"],
  ["TAILLE DE CRIBLE VIBRANT", "TAMANO DE CRIBA VIBRANTE"],
  ["BANDE DE CRİBLE VİBRANTE", "BANDA DE CRIBA VIBRANTE"],
  ["BANDE DE CRIBLE VIBRANTE", "BANDA DE CRIBA VIBRANTE"],
  ["ALIMENTATION MAXIMALE", "ALIMENTACION MAXIMA"],
  ["TAILLE DU ROTOR", "TAMANO DEL ROTOR"],
  ["GÉNÉRATEUR \\(EN OPTION\\)", "GENERADOR (OPCIONAL)"],
  ["GENERATEUR \\(EN OPTION\\)", "GENERADOR (OPCIONAL)"],
  ["POIDS", "PESO"],
  ["DIMENSIONS", "DIMENSIONES"],
  ["Marque", "Marca"],
  ["Sur demande", "Bajo pedido"],
  ["Disponibilite", "Disponibilidad"],
  ["Disponibilité", "Disponibilidad"],
  ["TONNE", "TON"],
];

function translateTitle(text, lang) {
  return replaceMany(text, lang === "en" ? TITLE_TO_EN : TITLE_TO_ES);
}

function translateSpec(text, lang) {
  return replaceMany(text, lang === "en" ? SPEC_TO_EN : SPEC_TO_ES);
}

function translatedDescription(title, category, lang) {
  const translatedTitle = lang === "fr" ? title : translateTitle(title, lang);
  if (lang === "en") {
    return `${translatedTitle} is official FABO mobile crushing, screening or washing equipment with technical details sourced from the FABO catalogue.`;
  }
  if (lang === "es") {
    return `${translatedTitle} es un equipo movil FABO oficial de trituracion, cribado o lavado con detalles tecnicos tomados del catalogo FABO.`;
  }
  return `${title} - Equipement FABO officiel pour ${category.replace(/-/g, " ")}.`;
}

function extractTitle(html) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return decodeHtml(h1[1]);
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return title ? decodeHtml(title[1]).replace(/\s*-\s*Fabo\s*$/i, "") : "";
}

function extractImages(html) {
  const images = [];
  const imgRe = /<img\b[^>]*>/gi;
  let match;
  while ((match = imgRe.exec(html))) {
    const tag = match[0];
    const src =
      tag.match(/\s(?:src|data-src)=["']([^"']+)["']/i)?.[1] ||
      tag.match(/\ssrcset=["']([^"']+)["']/i)?.[1]?.split(/\s+/)[0] ||
      "";
    const alt = tag.match(/\salt=["']([^"']*)["']/i)?.[1] || "";
    const image = absolutize(src).replace("fabo-59e2.kxcdn.com", "fabo.com.tr");
    if (!image.includes("wp-content/uploads")) continue;
    if (/logo|flag|icon|instagram|facebook|youtube|linkedin/i.test(image)) continue;
    if (!images.some((i) => i.src === image)) {
      images.push({ src: image, alt: decodeHtml(alt) });
    }
  }
  return images;
}

function extractRows(tableHtml) {
  const rows = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rowMatch;
  while ((rowMatch = rowRe.exec(tableHtml))) {
    const cells = [];
    const cellRe = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
    let cellMatch;
    while ((cellMatch = cellRe.exec(rowMatch[1]))) {
      const cell = decodeHtml(cellMatch[1]);
      if (cell) cells.push(cell);
    }
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}

function extractTables(html) {
  const tables = [];
  const tableRe = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let match;
  while ((match = tableRe.exec(html))) {
    const rows = extractRows(match[1]);
    if (rows.length > 0) tables.push(rows);
  }
  return tables;
}

function extractDescription(html) {
  const paragraphs = [];
  const pRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = pRe.exec(html))) {
    const text = decodeHtml(match[1]);
    if (text.length > 40 && !/fabo ©|facebook|twitter|instagram/i.test(text)) {
      paragraphs.push(text);
    }
  }
  return paragraphs[0] || "";
}

function findProductLinks(html, categoryUrl) {
  const links = [];
  const seen = new Set();
  const anchorRe = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorRe.exec(html))) {
    const href = absolutize(match[1]).replace(/#.*$/, "");
    if (!href.startsWith("https://fabo.com.tr/fr/")) continue;
    if (href.replace(/\/$/, "") === categoryUrl.replace(/\/$/, "")) continue;
    if (!href.startsWith(categoryUrl)) continue;
    if (seen.has(href)) continue;
    const inner = match[2];
    const title = decodeHtml(inner) || decodeHtml(inner.match(/alt=["']([^"']+)["']/i)?.[1]);
    const image = extractImages(inner)[0]?.src || "";
    if (!title && !image) continue;
    seen.add(href);
    links.push({ url: href, title, image });
  }
  return links;
}

function tableToSpecs(table) {
  const specs = {};
  if (!table || table.length === 0) return specs;
  for (const row of table) {
    if (row.length >= 2) {
      const key = row[0];
      const value = row.slice(1).join(" / ");
      if (key && value && !/^model$/i.test(key) && !/teknik|details|détails/i.test(key)) {
        specs[key] = value;
      }
    }
  }
  return specs;
}

function tableToVariants(table, images) {
  if (!table || table.length < 2) return [];
  const modelRow = table.find((row) => /^model$/i.test(row[0] || ""));
  if (!modelRow || modelRow.length < 2) return [];
  return modelRow.slice(1).map((model, index) => {
    const specs = [];
    for (const row of table) {
      if (/^model$/i.test(row[0] || "")) continue;
      const key = row[0];
      const value = row[index + 1];
      if (key && value) specs.push(`${key}: ${value}`);
    }
    const title = model.trim();
    return {
      slug: slugify(title),
      title: { fr: title, en: translateTitle(title, "en"), es: translateTitle(title, "es") },
      description: {
        fr: `${title} - Equipement FABO`,
        en: `${translateTitle(title, "en")} - FABO Equipment`,
        es: `${translateTitle(title, "es")} - Equipo FABO`,
      },
      image: images[index + 1]?.src || images[0]?.src || "",
      specs: specs.map((spec) => spec),
    };
  });
}

function mainSpecs(specs) {
  const entries = Object.entries(specs);
  const find = (patterns) =>
    entries.find(([key]) => patterns.some((pattern) => key.toUpperCase().includes(pattern)));
  const capacity = find(["CAPAC", "PRODUCTION"]);
  const power = find(["PUISSANCE", "MOTEUR"]);
  const feed = find(["ALIMENTATION", "ROTOR", "TAILLE"]);
  return {
    portee: capacity ? `${capacity[0]}: ${capacity[1]}` : entries[0] ? `${entries[0][0]}: ${entries[0][1]}` : "Sur demande",
    pression: power ? `${power[0]}: ${power[1]}` : "Marque: FABO",
    sortie: feed ? `${feed[0]}: ${feed[1]}` : "Disponibilite: Sur demande",
  };
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

async function scrapePage(config) {
  const categoryHtml = await fetchHtml(config.url);
  let links = findProductLinks(categoryHtml, config.url);
  if (links.length === 0) {
    links = [{ url: config.url, title: extractTitle(categoryHtml), image: extractImages(categoryHtml)[0]?.src || "" }];
  }

  const products = [];
  for (const link of links) {
    const html = link.url === config.url ? categoryHtml : await fetchHtml(link.url);
    const title = extractTitle(html) || link.title;
    const images = extractImages(html);
    const tables = extractTables(html);
    const specs = tableToSpecs(tables[0]);
    const highlights = mainSpecs(specs);
    const variants = tableToVariants(tables[0], images);
    const modelStrings = Object.entries(specs).map(([key, value]) => `${key}: ${value}`);
    const image = images[0]?.src || link.image;
    products.push({
      id: `fabo-${slugify(title)}`,
      category: config.category,
      brand: "FABO",
      title: { fr: title, en: translateTitle(title, "en"), es: translateTitle(title, "es") },
      shortTitle: { fr: title.split(/\s+/)[0], en: title.split(/\s+/)[0], es: title.split(/\s+/)[0] },
      description: {
        fr: extractDescription(html) || translatedDescription(title, config.category, "fr"),
        en: translatedDescription(title, config.category, "en"),
        es: translatedDescription(title, config.category, "es"),
      },
      specs: {
        portee: { fr: highlights.portee, en: translateSpec(highlights.portee, "en"), es: translateSpec(highlights.portee, "es") },
        pression: { fr: highlights.pression, en: translateSpec(highlights.pression, "en"), es: translateSpec(highlights.pression, "es") },
        sortie: { fr: highlights.sortie, en: translateSpec(highlights.sortie, "en"), es: translateSpec(highlights.sortie, "es") },
      },
      models: modelStrings,
      image,
      featured: true,
      available: true,
      variants,
    });
  }
  return products;
}

async function run() {
  const products = [];
  for (const config of MOBILE_SUBCATEGORIES) {
    console.log(`Scraping ${config.category}`);
    products.push(...(await scrapePage(config)));
  }

  const ts = `import type { Product } from "@/lib/types";

export const faboOfficialMobileProducts: Product[] = ${JSON.stringify(products, null, 2)};
`;
  const output = path.join(__dirname, "..", "data", "faboOfficialMobileProducts.ts");
  fs.writeFileSync(output, ts);
  console.log(`Generated ${products.length} official mobile FABO products: ${output}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
