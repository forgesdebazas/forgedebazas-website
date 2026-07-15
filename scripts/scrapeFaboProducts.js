/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const CATEGORY_PAGES = [
  {
    section: "concassage-mobile",
    subcategory: "Concasseurs Mobiles sur Chenilles",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/concasseurs-mobiles-sur-chenilless/",
  },
  {
    section: "concassage-mobile",
    subcategory: "Cribles Vibrants Mobile sur Chenilles",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/cribles-vibrants-mobile-sur-chenilless/",
  },
  {
    section: "concassage-mobile",
    subcategory: "FTB 15-50 Crible De Scalpeur Sur Chenilles",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/crible-de-scalpeur-sur-chenilles/",
  },
  {
    section: "concassage-mobile",
    subcategory: "Concasseur Mobile a Percussion",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/concasseur-mobile-a-percussionn/",
  },
  {
    section: "concassage-mobile",
    subcategory: "Machines de Fabrication de Sable Mobile",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/machines-de-fabrication-de-sable-mobile/",
  },
  {
    section: "concassage-mobile",
    subcategory: "Concasseurs Mobiles et Criblage et Lavage",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/concasseurs-mobiles-et-criblage-et-lavage/",
  },
  {
    section: "concassage-mobile",
    subcategory: "Installations mobiles de criblage et de lavage",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/installations-mobiles-de-criblage-et-de-lavage/",
  },
  {
    section: "concassage-mobile",
    subcategory: "Usine de Concassage Primaire Mobile",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/usine-de-concassage-primaire-mobile/",
  },
  {
    section: "concassage-mobile",
    subcategory: "Usine de Concassage et Criblage Secondaire",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/usine-de-concassage-et-criblage-secondaire/",
  },
  {
    section: "concassage-mobile",
    subcategory: "Installation de Concassage a Percussion Mobile a-Arbre Vertical",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/installation-de-concassage-a-percussion-mobile-a-arbre-vertical/",
  },
  {
    section: "concassage-mobile",
    subcategory: "Concasseur a Machoire Mobile Type Container",
    url: "https://fabo.com.tr/fr/produits/concasseurs-mobiles/concasseur-a-machoire-mobile-type-container/",
  },
  {
    section: "concassage-fixe",
    subcategory: "Concasseurs à Mâchoires",
    url: "https://fabo.com.tr/fr/produits/station-de-concassage-fixes/concasseurs-a-machoires/",
  },
  {
    section: "concassage-fixe",
    subcategory: "Concasseur à Percussion Primaire",
    url: "https://fabo.com.tr/fr/produits/station-de-concassage-fixes/concasseur-a-percussion-primaire/",
  },
  {
    section: "concassage-fixe",
    subcategory: "Broyeur à Percussion Secondaire DMK",
    url: "https://fabo.com.tr/fr/produits/station-de-concassage-fixes/broyeur-a-percussion-secondaire-dmk/",
  },
  {
    section: "concassage-fixe",
    subcategory: "Concasseurs à Percussion à Arbre Vertical",
    url: "https://fabo.com.tr/fr/concasseurs-a-percussion-a-arbre-vertical/",
  },
  {
    section: "concassage-fixe",
    subcategory: "Concasseurs à Cône",
    url: "https://fabo.com.tr/fr/produits/station-de-concassage-fixes/concasseurs-a-cone/",
  },
  {
    section: "concassage-fixe",
    subcategory: "Concasseurs Tertiaire",
    url: "https://fabo.com.tr/fr/produits/station-de-concassage-fixes/concasseurs-tertiaire/",
  },
  {
    section: "concassage-fixe",
    subcategory: "Crible Vibrant",
    url: "https://fabo.com.tr/fr/produits/station-de-concassage-fixes/crible-vibrant/",
  },
  {
    section: "concassage-fixe",
    subcategory: "Trémie D'alimentation Vibrante",
    url: "https://fabo.com.tr/fr/produits/station-de-concassage-fixes/tremie-dalimentation-vibrante/",
  },
  {
    section: "concassage-fixe",
    subcategory: "Crible de Déshydratation Hydrocyclone",
    url: "https://fabo.com.tr/fr/produits/station-de-concassage-fixes/crible-de-deshydratation-hydrocyclone/",
  },
  {
    section: "concassage-fixe",
    subcategory: "Vis de Lavage à Sable",
    url: "https://fabo.com.tr/fr/produits/station-de-concassage-fixes/vis-de-lavage-a-sable/",
  },
  {
    section: "centrales-beton-mobiles",
    subcategory: "Centrales à Béton Mobiles",
    url: "https://fabo.com.tr/fr/produits/centrales-a-beton-mobiles/",
  },
  {
    section: "centrales-beton-fixes",
    subcategory: "Centrales à Béton Fixes",
    url: "https://fabo.com.tr/fr/produits/centrales-a-beton-fixes/",
  },
];

const NAV_BLACKLIST = [
  "/a-propos", "/nos-actualites", "/foires/", "/galerie/",
  "/e-catalogue/", "/videos", "/blog", "/formulaire",
  "/nos-concessionnaires", "/politique-de-confidentialite",
  "/contact", "/mentions-legales", "/cookies",
  "/produits/concasseurs-mobiles/concasseurs-mobiles-sur-chenilless/$",
  "/produits/centrales-a-beton-mobiles/$",
  "/produits/centrales-a-beton-fixes/$",
];

function isProductLink(href, categoryUrl) {
  if (!href || !href.includes("fabo.com.tr/fr/")) return false;
  if (href === categoryUrl) return false;
  if (href.endsWith("/fr/") || href.endsWith("/fr")) return false;
  if (href.includes("#")) return false;
  for (const bl of NAV_BLACKLIST) {
    if (href.includes(bl)) return false;
  }
  // Skip category-level pages
  if (href.match(/\/produits\/[^/]+\/?$/)) return false;
  return true;
}

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function scrapeCategoryForProducts(page, categoryUrl) {
  console.log(`\n  Category: ${categoryUrl}`);
  await page.goto(categoryUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await delay(2000);

  const data = await page.evaluate((catUrl) => {
    const pageTitle = document.querySelector("h1")?.textContent?.trim() || "";

    const productEntries = [];
    const seenUrls = new Set();

    // Method 1: Look for product grid items with images and links
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (seenUrls.has(href)) return;

      const img = a.querySelector("img");
      if (!img) return;

      const imgSrc = img.getAttribute("src") || img.getAttribute("data-src") || "";
      if (!imgSrc.includes("wp-content/uploads")) return;

      // Find associated title
      const parent = a.closest("article, .product, .elementor-post, .jet-listing-grid__item, .elementor-column");
      const titleEl = parent?.querySelector("h2, h3, h4") || a.querySelector("h2, h3, h4");
      const title = titleEl?.textContent?.trim() || img.getAttribute("alt") || "";

      if (href.includes("fabo.com.tr")) {
        seenUrls.add(href);
        productEntries.push({ url: href, title, image: imgSrc });
      }
    });

    // Method 2: Check for elementor headings linked to product pages
    document.querySelectorAll("h2 a, h3 a, h4 a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (seenUrls.has(href)) return;
      if (href.includes("fabo.com.tr")) {
        seenUrls.add(href);
        productEntries.push({
          url: href,
          title: a.textContent.trim(),
          image: "",
        });
      }
    });

    return { pageTitle, productEntries };
  }, categoryUrl);

  // Filter to only real product links
  const products = data.productEntries.filter((p) =>
    isProductLink(p.url, categoryUrl)
  );
  console.log(`  Title: "${data.pageTitle}", Products found: ${products.length}`);
  return { pageTitle: data.pageTitle, products };
}

async function scrapeProductDetail(page, productUrl) {
  console.log(`    -> Product detail: ${productUrl}`);
  try {
    await page.goto(productUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await delay(2000);

    const data = await page.evaluate(() => {
      const title = document.querySelector("h1")?.textContent?.trim() ||
        document.querySelector(".elementor-heading-title")?.textContent?.trim() || "";

      // Images
      const images = [];
      document.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || img.getAttribute("data-src") || "";
        if (src.includes("wp-content/uploads") && !src.includes("logo") && !src.includes("icon") && !src.includes("flag")) {
          images.push({ src, alt: img.getAttribute("alt") || "" });
        }
      });

      // Tables (specs)
      const tables = [];
      document.querySelectorAll("table").forEach((table) => {
        const rows = [];
        table.querySelectorAll("tr").forEach((tr) => {
          const cells = [];
          tr.querySelectorAll("td, th").forEach((cell) => {
            cells.push(cell.textContent.trim());
          });
          if (cells.length > 0) rows.push(cells);
        });
        if (rows.length > 0) tables.push(rows);
      });

      // Description text
      const descriptions = [];
      document.querySelectorAll(".elementor-text-editor p, .entry-content p").forEach((p) => {
        const text = p.textContent.trim();
        if (text.length > 15) descriptions.push(text);
      });

      // Lists
      const listItems = [];
      document.querySelectorAll(".elementor-text-editor li, .entry-content li").forEach((li) => {
        const text = li.textContent.trim();
        if (text) listItems.push(text);
      });

      // All headings for context
      const headings = [];
      document.querySelectorAll("h1, h2, h3, h4").forEach((h) => {
        headings.push({ tag: h.tagName, text: h.textContent.trim() });
      });

      return {
        title,
        images: [...new Map(images.map((i) => [i.src, i])).values()],
        tables,
        descriptions,
        listItems,
        headings,
        url: window.location.href,
      };
    });

    return data;
  } catch (e) {
    console.error(`    Error: ${e.message}`);
    return null;
  }
}

async function main() {
  console.log("Starting FABO product scraper (targeted)...\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  });
  const page = await context.newPage();

  const results = {};

  for (const cat of CATEGORY_PAGES) {
    if (!results[cat.section]) {
      results[cat.section] = { subcategories: [] };
    }

    const catData = await scrapeCategoryForProducts(page, cat.url);

    const subcategoryResult = {
      name: cat.subcategory,
      url: cat.url,
      pageTitle: catData.pageTitle,
      products: [],
    };

    // Scrape each product detail page
    for (const prod of catData.products) {
      const detail = await scrapeProductDetail(page, prod.url);
      subcategoryResult.products.push({
        listTitle: prod.title,
        listImage: prod.image,
        detail,
      });
      await delay(1000);
    }

    results[cat.section].subcategories.push(subcategoryResult);
    await delay(1000);
  }

  const outputPath = path.join(__dirname, "..", "data", "fabo_scraped_raw.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nData saved to: ${outputPath}`);

  // Summary
  console.log("\n\nSUMMARY:");
  console.log("=".repeat(60));
  for (const [section, data] of Object.entries(results)) {
    console.log(`\n${section}:`);
    for (const sub of data.subcategories) {
      console.log(`  ${sub.name}: ${sub.products.length} products`);
      for (const p of sub.products) {
        const title = p.detail?.title || p.listTitle;
        const tables = p.detail?.tables?.length || 0;
        console.log(`    - ${title} (${tables} spec tables)`);
      }
    }
  }

  await browser.close();
  console.log("\nDone!");
}

main().catch(console.error);
