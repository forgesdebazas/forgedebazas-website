/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const CATEGORY_URL =
  "https://fabo.com.tr/fr/produits/station-de-concassage-fixes/station-de-concassage-fixes/";
const OUTPUT_PATH = path.join(
  __dirname,
  "..",
  "data",
  "faboOfficialStationaryProducts.ts"
);

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(parseInt(code, 16))
    )
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&eacute;/g, "é")
    .replace(/&egrave;/g, "è")
    .replace(/&agrave;/g, "à")
    .replace(/&ccedil;/g, "ç");
}

function stripTags(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|h[1-6]|li|tr|div)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getMeta(html, property) {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
    "i"
  );
  return decodeEntities(html.match(re)?.[1] || "");
}

function getCanonical(html, fallbackUrl) {
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
  return canonical ? absolutize(decodeEntities(canonical)) : fallbackUrl;
}

function absolutize(url) {
  if (!url) return "";
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `https://fabo.com.tr${url}`;
  return url;
}

function normalizeImageUrl(url) {
  return absolutize(decodeEntities(url))
    .replace(/^http:\/\//, "https://")
    .replace("fabo-59e2.kxcdn.com", "fabo.com.tr")
    .replace(/-\d+x\d+(?=\.(?:jpe?g|png|webp))/i, "");
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; ProxamCatalogBot/1.0; +https://proxam.ma)",
      accept: "text/html,application/xhtml+xml",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.text();
}

function collectProductLinks(categoryHtml) {
  const links = [];
  const seen = new Set();
  const re =
    /<h2[^>]*>\s*<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>\s*<\/h2>/gi;
  let match;
  while ((match = re.exec(categoryHtml))) {
    const url = absolutize(decodeEntities(match[1]));
    const title = stripTags(match[2]);
    if (!url.includes("/fr/produits/station-de-concassage-fixes/")) continue;
    if (url === CATEGORY_URL || seen.has(url)) continue;
    seen.add(url);
    links.push({ url, title });
  }
  return links;
}

function collectImages(html) {
  const images = [];
  const seen = new Set();
  const add = (raw) => {
    const src = normalizeImageUrl(raw);
    if (!src || seen.has(src)) return;
    if (!/\.(jpe?g|png|webp)(?:\?|$)/i.test(src)) return;
    if (/logo|icon|flags|avatar|whatsapp|facebook|instagram/i.test(src)) return;
    if (!src.includes("/wp-content/uploads/")) return;
    seen.add(src);
    images.push(src);
  };

  for (const match of html.matchAll(/<img[^>]+>/gi)) {
    const tag = match[0];
    for (const attr of ["src", "data-src", "data-lazy-src"]) {
      const value = tag.match(new RegExp(`${attr}=["']([^"']+)["']`, "i"))?.[1];
      if (value) add(value);
    }
    const srcset = tag.match(/srcset=["']([^"']+)["']/i)?.[1];
    if (srcset) {
      for (const item of srcset.split(",")) add(item.trim().split(/\s+/)[0]);
    }
  }

  const ogImage = getMeta(html, "og:image");
  if (ogImage) {
    const image = normalizeImageUrl(ogImage);
    return [image, ...images.filter((src) => src !== image)];
  }

  return images;
}

function collectDocuments(html) {
  const documents = [];
  const seen = new Set();
  for (const match of html.matchAll(
    /href=["']([^"']+\.(?:pdf|docx?|xlsx?)(?:\?[^"']*)?)["']/gi
  )) {
    const href = absolutize(decodeEntities(match[1]));
    if (!seen.has(href)) {
      seen.add(href);
      documents.push(href);
    }
  }
  return documents;
}

function collectRows(html) {
  const rows = [];
  for (const rowMatch of html.matchAll(/<tr[\s\S]*?<\/tr>/gi)) {
    const cells = [...rowMatch[0].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)]
      .map((cell) => stripTags(cell[1]))
      .filter(Boolean);
    if (cells.length >= 2) rows.push(cells.join(": "));
  }
  return rows;
}

function collectContentLines(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
  const text = stripTags(body);
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^(\+90|info@|facebook|twitter|youtube|linkedin|instagram|menu)$/i.test(line))
    .filter((line) => !/FABO ©|Diriger le secteur|Choisir la langue/i.test(line));
}

function collectSpecs(html, title, gallery, documents, sourceUrl) {
  const specs = [];
  const seen = new Set();
  const add = (line) => {
    const clean = line.replace(/\s+/g, " ").trim();
    if (!clean || clean === title || seen.has(clean)) return;
    seen.add(clean);
    specs.push(clean);
  };

  collectRows(html).forEach(add);
  collectContentLines(html)
    .filter((line) =>
      /TEKN|DÉFINITION|UNITÉ|PIÈCE|CONCASSEUR|CRIBLE|TREM|CONVOYEUR|BUNKER|CAPACIT|PUISSANCE|DIMENSION|ALIMENT|STOCK|CABINE|PANNEAU|HYDROCYCLONE|LAVAGE|SILO|mm|m3|kW|T\/H/i.test(
        line
      )
    )
    .slice(0, 80)
    .forEach(add);

  gallery.forEach((src, index) => add(`Galerie image ${index + 1}: ${src}`));
  documents.forEach((href, index) => add(`Document ${index + 1}: ${href}`));
  add(`Source officielle: ${sourceUrl}`);

  return specs;
}

function buildDescription(html, fallbackTitle) {
  const lines = collectContentLines(html).filter(
    (line) =>
      line.length > 80 &&
      !/Accueil|Produits|Station de Concassage et Criblage/i.test(line)
  );
  return lines.slice(0, 3).join("\n\n") || `${fallbackTitle} - Équipement FABO officiel.`;
}

function getCapacity(title) {
  const match = title.match(/(\d+)\s*[-–]\s*(\d+)\s*T\/H/i);
  if (match) return Number(match[1]);
  const single = title.match(/(\d+)\s*T\/H/i);
  return single ? Number(single[1]) : undefined;
}

function translateTitle(fr, lang) {
  if (lang === "en") {
    return fr
      .replace(/L[’']installation de Concassage Fix/gi, "Stationary Crushing Plant")
      .replace(/Installation de Concassage Criblage Fixe/gi, "Stationary Crushing and Screening Plant")
      .replace(/Installation De Criblage Et De Lavage Stationnaire/gi, "Stationary Screening and Washing Plant")
      .replace(/Capacit[eè]/gi, "Capacity")
      .replace(/Pour Concasse Le Calcaire/gi, "for Limestone Crushing")
      .replace(/Pour Pierre Dure/gi, "for Hard Stone")
      .replace(/avec PDK/gi, "with PDK")
      .replace(/Système De Stockage Spècial/gi, "Special Storage System")
      .replace(/L[’']istallation/gi, "Stationary Crushing Plant")
      .replace(/L[’']installation de Criblage Lavage et Deshydratation de Sable Systeme de Hydrocyclone/gi, "Sand Screening, Washing and Dewatering Plant with Hydrocyclone System");
  }
  return fr
    .replace(/L[’']installation de Concassage Fix/gi, "Instalación de Trituración Fija")
    .replace(/Installation de Concassage Criblage Fixe/gi, "Instalación Fija de Trituración y Cribado")
    .replace(/Installation De Criblage Et De Lavage Stationnaire/gi, "Instalación Estacionaria de Cribado y Lavado")
    .replace(/Capacit[eè]/gi, "Capacidad")
    .replace(/Pour Concasse Le Calcaire/gi, "para Triturar Caliza")
    .replace(/Pour Pierre Dure/gi, "para Piedra Dura")
    .replace(/avec PDK/gi, "con PDK")
    .replace(/Système De Stockage Spècial/gi, "Sistema de Almacenamiento Especial")
    .replace(/L[’']istallation/gi, "Instalación de Trituración Fija")
    .replace(/L[’']installation de Criblage Lavage et Deshydratation de Sable Systeme de Hydrocyclone/gi, "Instalación de Cribado, Lavado y Deshidratación de Arena con Sistema Hidrociclón");
}

async function main() {
  const categoryHtml = await fetchHtml(CATEGORY_URL);
  const categoryImage = normalizeImageUrl(getMeta(categoryHtml, "og:image"));
  const links = collectProductLinks(categoryHtml);

  const products = [];
  for (const link of links) {
    const html = await fetchHtml(link.url);
    const sourceUrl = getCanonical(html, link.url);
    const title = getMeta(html, "og:title").replace(/\s+-\s+Fabo$/i, "") || link.title;
    const gallery = collectImages(html);
    const documents = collectDocuments(html);
    const image = gallery[0] || normalizeImageUrl(getMeta(html, "og:image"));
    const specs = collectSpecs(html, title, gallery, documents, sourceUrl);
    const capacity = getCapacity(title);
    const description = buildDescription(html, title);
    const shortTitle = title.match(/(\d+\s*[-–]\s*\d+\s*T\/H|\d+\s*T\/H)/i)?.[1] || title;

    products.push({
      id: `fabo-${slugify(title)}`,
      category: "station-de-concassage-fixes",
      brand: "FABO",
      title: {
        fr: title,
        en: translateTitle(title, "en"),
        es: translateTitle(title, "es"),
      },
      shortTitle: {
        fr: shortTitle,
        en: translateTitle(shortTitle, "en"),
        es: translateTitle(shortTitle, "es"),
      },
      description: {
        fr: description,
        en: translateTitle(description, "en"),
        es: translateTitle(description, "es"),
      },
      specs: {
        portee: {
          fr: capacity ? `Capacité: ${shortTitle}` : "Sur demande",
          en: capacity ? `Capacity: ${shortTitle}` : "On request",
          es: capacity ? `Capacidad: ${shortTitle}` : "Bajo pedido",
        },
        pression: {
          fr: "Marque: FABO",
          en: "Brand: FABO",
          es: "Marca: FABO",
        },
        sortie: {
          fr: `Disponibilité: Sur demande`,
          en: `Availability: On request`,
          es: `Disponibilidad: Bajo pedido`,
        },
      },
      ...(capacity ? { numericSpecs: { capacity } } : {}),
      models: specs,
      image,
      featured: false,
      available: true,
    });
  }

  const ts = `import type { Product } from "@/lib/types";

export const faboOfficialStationaryProducts: Product[] = ${JSON.stringify(
    products,
    null,
    2
  )};

export const faboOfficialStationaryCategoryImage = ${JSON.stringify(categoryImage)};
`;

  fs.writeFileSync(OUTPUT_PATH, ts);
  console.log(
    `Generated ${products.length} official stationary FABO products in ${OUTPUT_PATH}`
  );
  console.log(`Category image: ${categoryImage}`);
  for (const product of products) {
    console.log(`- ${product.title.fr} | ${product.image} | ${product.models.length} details`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
