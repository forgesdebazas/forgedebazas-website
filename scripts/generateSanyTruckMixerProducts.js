#!/usr/bin/env node
"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const INPUT_JSON = path.join(ROOT_DIR, "data", "sany_truck_mixers.json");
const OUTPUT_TS = path.join(ROOT_DIR, "data", "sanyTruckMixerProducts.ts");

const CAPACITY_GROUPS = {
  119: { capacity: 6, labelFr: "6 m³", labelEn: "6 m³", labelEs: "6 m³" },
  120: { capacity: 12, labelFr: "12 m³", labelEn: "12 m³", labelEs: "12 m³" },
  121: { capacity: 8, labelFr: "8 m³", labelEn: "8 m³", labelEs: "8 m³" },
  122: { capacity: 10, labelFr: "10 m³", labelEn: "10 m³", labelEs: "10 m³" },
  142: { capacity: 8, labelFr: "8 m³", labelEn: "8 m³", labelEs: "8 m³" },
};

function groupProducts(products) {
  const groups = {};
  for (const p of products) {
    const gid = p.subCategoryGoodsId;
    if (!groups[gid]) groups[gid] = [];
    groups[gid].push(p);
  }
  return groups;
}

function maxOfField(items, field) {
  const values = items.map((p) => p.numericSpecs?.[field]).filter((v) => v != null);
  return values.length > 0 ? Math.max(...values) : undefined;
}

function rangeString(items, field) {
  const values = items.map((p) => p.numericSpecs?.[field]).filter((v) => v != null);
  if (values.length === 0) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? `${min}` : `${min} - ${max}`;
}

function buildGroupProduct(goodsId, items) {
  const group = CAPACITY_GROUPS[goodsId] || { capacity: items[0]?.numericSpecs?.capacity || 0 };
  const capacityVal = group.capacity;
  const isElectric = goodsId === "142";

  const models = items.map((p) => p.reference).sort();
  const bestImage = items[0]?.imageUrl || "";

  const weightRange = rangeString(items, "weight");
  const powerRange = rangeString(items, "power");
  const maxWeight = maxOfField(items, "weight");
  const maxPower = maxOfField(items, "power");

  const capacityStr = `${capacityVal} m³`;
  const weightStr = weightRange ? `${weightRange} t` : "";
  const powerStr = powerRange ? `${powerRange} kW` : "";

  const typeFr = isElectric ? "Camion Toupie Électrique" : "Camion Toupie";
  const typeEn = isElectric ? "Electric Truck Mixer" : "Truck Mixer";
  const typeEs = isElectric ? "Camión Hormigonera Eléctrico" : "Camión Hormigonera";

  const id = isElectric
    ? `sany-truck-mixer-electric-${capacityVal}m3`
    : `sany-truck-mixer-${capacityVal}m3`;

  return {
    id,
    category: "beton",
    brand: "SANY",
    title: {
      fr: `SANY ${typeFr} ${group.labelFr || capacityStr}`,
      en: `SANY ${typeEn} ${group.labelEn || capacityStr}`,
      es: `SANY ${typeEs} ${group.labelEs || capacityStr}`,
    },
    shortTitle: {
      fr: `${typeFr} ${group.labelFr || capacityStr}`,
      en: `${typeEn} ${group.labelEn || capacityStr}`,
      es: `${typeEs} ${group.labelEs || capacityStr}`,
    },
    description: {
      fr: `${typeFr} SANY avec une capacité de malaxage de ${capacityStr}.${weightStr ? ` Poids max: ${weightStr}.` : ""}${powerStr ? ` Puissance moteur: ${powerStr}.` : ""} Modèles disponibles: ${models.join(", ")}.`,
      en: `SANY ${typeEn} with ${capacityStr} mixing capacity.${weightStr ? ` Max weight: ${weightStr}.` : ""}${powerStr ? ` Engine power: ${powerStr}.` : ""} Available models: ${models.join(", ")}.`,
      es: `${typeEs} SANY con capacidad de mezcla de ${capacityStr}.${weightStr ? ` Peso máx: ${weightStr}.` : ""}${powerStr ? ` Potencia motor: ${powerStr}.` : ""} Modelos disponibles: ${models.join(", ")}.`,
    },
    specs: {
      portee: {
        fr: `Capacité de malaxage: ${capacityStr}`,
        en: `Mixing Capacity: ${capacityStr}`,
        es: `Capacidad de mezcla: ${capacityStr}`,
      },
      pression: {
        fr: weightStr ? `Poids brut max: ${weightStr}` : "",
        en: weightStr ? `Max GVW: ${weightStr}` : "",
        es: weightStr ? `Peso bruto máx: ${weightStr}` : "",
      },
      sortie: {
        fr: powerStr ? `Puissance moteur: ${powerStr}` : "",
        en: powerStr ? `Engine Power: ${powerStr}` : "",
        es: powerStr ? `Potencia del motor: ${powerStr}` : "",
      },
    },
    numericSpecs: {
      ...(capacityVal != null && { capacity: capacityVal }),
      ...(maxWeight != null && { weight: maxWeight }),
      ...(maxPower != null && { power: maxPower }),
    },
    models,
    image: bestImage,
    featured: capacityVal >= 10,
    available: true,
  };
}

async function main() {
  const raw = JSON.parse(await fs.readFile(INPUT_JSON, "utf-8"));
  const groups = groupProducts(raw.products);

  const products = [];
  for (const [goodsId, items] of Object.entries(groups)) {
    products.push(buildGroupProduct(goodsId, items));
  }

  products.sort((a, b) => {
    const ca = a.numericSpecs?.capacity || 0;
    const cb = b.numericSpecs?.capacity || 0;
    return ca - cb || a.id.localeCompare(b.id);
  });

  const tsLines = [
    'import type { Product } from "@/lib/types";',
    "",
    "export const sanyTruckMixerProducts: Product[] = " +
      JSON.stringify(products, null, 2) +
      ";",
    "",
  ];

  await fs.writeFile(OUTPUT_TS, tsLines.join("\n"), "utf-8");
  console.log(`Wrote ${products.length} truck mixer product groups to ${path.relative(ROOT_DIR, OUTPUT_TS)}`);

  for (const p of products) {
    const ns = p.numericSpecs;
    console.log(`  ${p.id}: capacity=${ns.capacity}m³ weight=${ns.weight || "?"}t power=${ns.power || "?"}kW models=${p.models.length}`);
  }
}

main().catch((error) => {
  console.error("[fatal]", error);
  process.exitCode = 1;
});
