/**
 * SANY product series organization — mirrors the official SANY website structure
 * (sanyglobal.com). Range labels, splits and product groupings follow the live
 * SANY filter / navigation as of 2026-05.
 *
 * Key  = subCategoryId (from sany_official_products.json)
 * Value = ordered series definitions; each series groups products by
 *         weight / capacity / reach / type range, exactly as shown on sany.com
 *
 * productRefs must match the `reference` field in the JSON catalog exactly,
 * including unicode characters such as Ⅴ (U+2164) and （）(full-width parens).
 */

/**
 * Per-subcategory spec-range overrides used to mirror the curated "series
 * range" values SANY publishes on its listing pages. The values shown on
 * sanyglobal.com are sometimes narrower than the strict min/max of every
 * product variant — SANY excludes outlier compact / heavy editions from the
 * series-level marketing summary. When that's the case, listing the strict
 * min/max would mismatch the SANY site, so we hard-code the published range
 * here.
 *
 * Key  = subCategoryId
 * Value = ordered spec rows to display on the brand category page card.
 */
export const SANY_SUBCATEGORY_SPEC_OVERRIDES: Record<
  number,
  { name: string; valueWithUnit: string }[]
> = {
  /** Telehandler — subCategoryId 74
   *  SANY's listing page shows 10-17.1 m / 2.7-5.5 T / 3.14-3.49 m
   *  (excludes the compact STH5519 and heavy STH1840 from the summary). */
  74: [
    { name: "Max. Lifting Height", valueWithUnit: "10 - 17.1 m" },
    { name: "Rated Capacity", valueWithUnit: "2.7 - 5.5 T" },
    { name: "Wheel Base", valueWithUnit: "3.14 - 3.49 m" },
  ],

  /** Wheel Loader — subCategoryId 303 (Chargeuse sur pneus)
   *  SANY's listing page shows 10-25 T / 2.0-7.0 m³ / 3-7 T. */
  303: [
    { name: "Operating Weight", valueWithUnit: "10 - 25 T" },
    { name: "Bucket Capacity", valueWithUnit: "2.0 - 7.0 m³" },
    { name: "Rated Payload", valueWithUnit: "3 - 7 T" },
  ],

  /** Long-reach Excavator — subCategoryId 61 (Excavatrice à Long Bras)
   *  SANY listing page: single series, no weight/capacity split. */
  61: [
    { name: "Bucket Capacity", valueWithUnit: "0.35 m³" },
    { name: "Engine Power", valueWithUnit: "114 - 147 kW" },
    { name: "Operating Weight", valueWithUnit: "20 - 32 T" },
  ],

  /** Wheel Excavator — subCategoryId 118 (Pelles sur Pneus)
   *  SANY listing page shows 13.5-16 T / 0.22-0.7 m³ / 78-120 kW. */
  118: [
    { name: "Bucket Capacity", valueWithUnit: "0.22 - 0.7 m³" },
    { name: "Engine Power", valueWithUnit: "78 - 120 kW" },
    { name: "Operating Weight", valueWithUnit: "13.5 - 16 T" },
  ],

  /** Mining Excavator — subCategoryId 247
   *  Official SANY category-level presentation ranges. */
  247: [
    { name: "Bucket Capacity", valueWithUnit: "1.5 - 8 m³" },
    { name: "Operating Weight", valueWithUnit: "36 - 125 t" },
    { name: "Engine Power", valueWithUnit: "205 - 567 kW" },
  ],

  /** Backhoe Loader — subCategoryId 304 (Chargeuse-pelleteuse)
   *  SANY listing page: loader bucket 1.0 m³ / excavator bucket 0.2 m³ / 74 kW. */
  304: [
    { name: "Loader Bucket Capacity", valueWithUnit: "1.0 m³" },
    { name: "Excavator Bucket Capacity", valueWithUnit: "0.2 m³" },
    { name: "Gross Power", valueWithUnit: "74 kW/2200 rpm" },
  ],

  /** Skid Steer Loader — subCategoryId 305 (Chargeuse compacte / Skid Steer)
   *  SANY listing page shows 4-5 T / 50-65 kW / 1-1.5 T rated load. */
  305: [
    { name: "Operating Weight", valueWithUnit: "4 - 5 T" },
    { name: "Engine Power", valueWithUnit: "50 - 65 kW" },
    { name: "Rated Load", valueWithUnit: "1 - 1.5 T" },
  ],

  /** Paver — subCategoryId 79 (Finisseuse)
   *  SANY SSP Series Multifunction Paver. */
  79: [
    { name: "Max. Paving Thickness", valueWithUnit: "35 - 55 cm" },
    { name: "Paving Capacity", valueWithUnit: "800 - 1200 t/h" },
    { name: "Paving Width", valueWithUnit: "7.7 - 13.5 m" },
  ],

  /** Milling Machine — subCategoryId 81 (Fraiseuse) */
  81: [
    { name: "Max. Milling Depth", valueWithUnit: "0 - 330 mm" },
    { name: "Max. Milling Width", valueWithUnit: "1000 - 2010 mm" },
    { name: "Rated Power of Engine", valueWithUnit: "180 - 496 kW" },
  ],
};

export interface SanySeriesDef {
  /** Range / type label appended to the subcategory name in the UI */
  rangeLabel: string;
  /** Exact product reference strings that belong to this series */
  productRefs: string[];
  /** Optional PDF brochure URL displayed next to the series header */
  brochureUrl?: string;
  /**
   * When true, the brand category page shows the series as a single aggregate
   * entry (using rangeLabel) instead of listing each individual variant.
   * Useful when several SKUs share the same trim and should appear as one model.
   */
  displayAsAggregate?: boolean;
  /**
   * Optional override for the subcategory display name when the series belongs
   * to a different product family than its catalog parent. Example: SANY's
   * Mini Excavator subcategory (id 44) contains both Mini Excavator and Small
   * Excavator products; the Small Excavator series uses this override so the
   * heading reads "Petite Excavatrice" instead of "Mini Excavatrice".
   */
  subCategoryNameOverride?: string;
  /**
   * Optional hard-coded spec rows to display on the brand category page,
   * bypassing the per-product min/max aggregation. Use this when SANY's
   * listing page publishes a curated series range that excludes outlier
   * variants (e.g. concrete pumps where Output / Pressure ranges differ from
   * the strict catalog min/max).
   */
  previewSpecsOverride?: { name: string; valueWithUnit: string }[];
  /**
   * Optional preview image URL displayed on the series card when the catalog
   * holds no products for this series (or none with a usable image). Useful
   * to surface SANY-published series that don't yet have scraped product
   * pages (e.g. SMG motor graders).
   */
  previewImageOverride?: string;
}

export const SANY_SERIES_CONFIG: Record<number, SanySeriesDef[]> = {

  // ════════════════════════════════════════════════════════════════════════
  //  EXCAVATOR
  // ════════════════════════════════════════════════════════════════════════

  /** Mini Excavator + Small Excavator — subCategoryId 44
   *  The SANY catalog merges both families under id 44 but the live SANY site
   *  exposes 6 distinct series — 3 Mini (Electric / ≤2.5T / 2.5-5T) and
   *  3 Small (5.5-7.5T / 8-13.5T / 15.5T). The "subCategoryNameOverride" is
   *  used so Small Excavator series show "Petite Excavatrice" in the UI.
   *  previewSpecsOverride values mirror the SANY listing-page ranges. */
  44: [
    {
      rangeLabel: "2.5 - 5T",
      productRefs: [
        "SY35U（StageIII)",
        "SY50U",
      ],
      previewSpecsOverride: [
        { name: "Bucket Capacity", valueWithUnit: "0.06 - 0.15 m³" },
        { name: "Engine Power", valueWithUnit: "15.2 - 29.1 kW" },
        { name: "Operating Weight", valueWithUnit: "2.68 - 5.3 T" },
      ],
    },
    {
      rangeLabel: "5.5 - 7.5T",
      subCategoryNameOverride: "Small Excavator",
      productRefs: [
        "SY55C",
        "SY75C",
      ],
      previewSpecsOverride: [
        { name: "Bucket Capacity", valueWithUnit: "0.21 - 0.28 m³" },
        { name: "Engine Power", valueWithUnit: "36 - 45.4 kW" },
        { name: "Operating Weight", valueWithUnit: "5.78 - 7.28 T" },
      ],
    },
  ],

  /** Medium Excavator — subCategoryId 46
   *  SANY site: 20-21.5T | 22-35T */
  46: [
    {
      rangeLabel: "20 - 21.5T",
      productRefs: [
        "SY215C",
        "SY215CLR",
        "SY215C LC",
        "SY215E",
      ],
      previewSpecsOverride: [
        { name: "Bucket Capacity", valueWithUnit: "0.83 - 1.2 m³" },
        { name: "Engine Power", valueWithUnit: "104 - 125 kW" },
        { name: "Operating Weight", valueWithUnit: "20 - 24 T" },
      ],
    },
    {
      rangeLabel: "22 - 35T",
      productRefs: [
        "SY245H",
        "SY305C LC",
        "SY330H",
        "SY335C(GBII)",
        "SY335LC",
      ],
      previewSpecsOverride: [
        { name: "Bucket Capacity", valueWithUnit: "1.3 - 1.7 m³" },
        { name: "Engine Power", valueWithUnit: "122 - 212 kW" },
        { name: "Operating Weight", valueWithUnit: "22 - 35 T" },
      ],
    },
  ],

  /** Large Excavator — subCategoryId 47
   *  SANY site: single "Over 36T" series (operating weight 36-125T) */
  47: [
    {
      rangeLabel: "Over 36T",
      previewImageOverride:
        "/images/sany-official/excavator/large-excavator/sy500h-stageiii-430/sy500h-stageiii-430__img-01.webp",
      productRefs: [
        "SY365H",
        "SY375H",
        "SY385C",
        "SY390H",
        "SY415H",
        "SY500H(StageIII)",
        "SY550HD",
        "SY650HB",
        "SY750H（StageIII)",
        "SY750H",
        "SY870H",
        "SY980H",
      ],
      previewSpecsOverride: [
        { name: "Bucket Capacity", valueWithUnit: "1.5 - 8 m³" },
        { name: "Engine Power", valueWithUnit: "205 - 567 kW" },
        { name: "Operating Weight", valueWithUnit: "36 - 125 T" },
      ],
    },
  ],

  // ════════════════════════════════════════════════════════════════════════
  //  CRANE
  // ════════════════════════════════════════════════════════════════════════

  /** Truck Crane — subCategoryId 63
   *  SANY site: Below 45T | 50-90T | Over 90T
   *  Spec rows mirror SANY's published series ranges. */
  63: [
    {
      rangeLabel: "Below 45T",
      productRefs: [
        "STC120T4",
        "STC250C4",
        "STC250C5",
        "STC250T5",
        "STC300C5",
        "STC300T5",
        "STC350TH",
        "STC400T5",
      ],
      previewSpecsOverride: [
        { name: "Max. lifting capacity", valueWithUnit: "16 - 45 t" },
        { name: "Max. lifting moment: basic boom", valueWithUnit: "32 - 45 kN·m" },
        { name: "Boom length: full-extension boom", valueWithUnit: "40.5 - 60.5 m" },
      ],
    },
    {
      rangeLabel: "50 - 90T",
      productRefs: [
        "STC500C5",
        "STC500T5",
        "STC550C5",
        "STC600T5",
        "STC700C5",
        "STC800C5",
        "STC800T5",
        "STC900T5",
      ],
      previewSpecsOverride: [
        { name: "Max. Lifting Capacity", valueWithUnit: "50 - 90 T" },
        { name: "Max. Boom Length", valueWithUnit: "44 - 50 m" },
        { name: "Max. Lifting Height", valueWithUnit: "60 - 77.5 m" },
      ],
    },
    {
      rangeLabel: "Over 90T",
      productRefs: [
        "STC1000T6",
        "STC1100T7-1",
        "STC1200T7",
        "STC1600T7",
      ],
      previewSpecsOverride: [
        { name: "Max. Lifting Capacity", valueWithUnit: "≥100 T" },
        { name: "Max. Boom Length", valueWithUnit: "≥56 m" },
        { name: "Max. Lifting Height", valueWithUnit: "≥77.5 m" },
      ],
    },
  ],

  /** All-terrain Crane — subCategoryId 64
   *  SANY site: Below 200T | 200-300T | Over 300T */
  64: [
    {
      rangeLabel: "Below 200T",
      productRefs: [
        "SAC600E",
        "SAC600E Euro V",
        "SAC700E",
        "SAC1100S",
        "SAC1200E",
        "SAC1300T7",
        "SAC1500E",
        "SAC1600C7",
        "SAC1600T7",
      ],
      previewSpecsOverride: [
        { name: "Max. Lifting Capacity", valueWithUnit: "60 - 200 T" },
        { name: "Max. Boom Length", valueWithUnit: "50 - 73 m" },
        { name: "Max. Lifting Height", valueWithUnit: "65 - 101 m" },
      ],
    },
    {
      rangeLabel: "200 - 300T",
      productRefs: [
        "SAC2000T8",
        "SAC2200T7-8",
        "SAC2500C8-8",
        "SAC2500E",
        "SAC2500T7",
        "SAC3000T8-8",
      ],
      previewSpecsOverride: [
        { name: "Max. Lifting Capacity", valueWithUnit: "200 - 300 T" },
        { name: "Max. Boom Length", valueWithUnit: "68 - 81 m" },
        { name: "Max. Lifting Height", valueWithUnit: "105 - 118 m" },
      ],
    },
    {
      rangeLabel: "Over 300T",
      previewImageOverride:
        "https://sanyglobal-img.sany.com.cn/product/goods/20220627/SAC4500S-000818.jpg?x-oss-process=image/resize,w_600,h_372,m_fill,limit_0",
      productRefs: [
        "SAC3500T7",
        "SAC4500T7-8",
        "SAC5000T7-8",
        "SAC6000T8-8",
        "SAC7000T7-8",
        "SAC8000C7-8",
        "SAC8000T7-8",
        "SAC9000C8-8",
        "SCL10000",
      ],
      previewSpecsOverride: [
        { name: "Max. Lifting Capacity", valueWithUnit: "＞300 T" },
        { name: "Max. Boom Length", valueWithUnit: "≥70 m" },
        { name: "Max. Lifting Height", valueWithUnit: "≥115 m" },
      ],
    },
  ],

  /** Rough-terrain Crane — subCategoryId 65
   *  SANY site: Below 50T | 50-80T | Over 80T */
  65: [
    {
      rangeLabel: "Below 50T",
      productRefs: [
        "SIC130",
        "SIC130EV",
        "SCD150",
        "SRC300T",
        "SRC400T",
      ],
      previewSpecsOverride: [
        { name: "Max. Lifting Capacity", valueWithUnit: "30 - 50 T" },
        { name: "Max. Boom Length", valueWithUnit: "31.5 - 35 m" },
        { name: "Max. Lifting Height", valueWithUnit: "38 - 52.3 m" },
      ],
    },
    {
      rangeLabel: "50 - 80T",
      productRefs: [
        "SRC500T",
        "SRC650T",
        "SRC800T",
      ],
      previewSpecsOverride: [
        { name: "Max. Lifting Capacity", valueWithUnit: "50 - 80 T" },
        { name: "Max. Boom Length", valueWithUnit: "43.5 - 47.5 m" },
        { name: "Max. Lifting Height", valueWithUnit: "61 - 67 m" },
      ],
    },
    {
      rangeLabel: "Over 80T",
      productRefs: [
        "SRC900T",
        "SRA1000A",
        "SRC1100T",
        "SRC1100T5",
        "SRC1300T",
      ],
      previewSpecsOverride: [
        { name: "Max. Lifting Capacity", valueWithUnit: "> 80 T" },
        { name: "Max. Boom Length", valueWithUnit: "≥47 m" },
        { name: "Max. Lifting Height", valueWithUnit: "≥63 m" },
      ],
    },
  ],

  /** Crawler Crane — subCategoryId 68
   *  SANY site distinguishes two boom families with 4 + 2 series:
   *   • Lattice Boom: Below 100T | 135-180T | 200-320T | Over 350T
   *   • Telescopic Boom: 25-40T | Over 55T */
  68: [
    {
      rangeLabel: "Below 100T Lattice Boom",
      productRefs: [
        "SCC450A-6",
        "SCC600A-5",
        "SCE600A",
        "SCE600A Chain-track",
        "SCE600A three-bar track pad",
        "SCS600A",
        "SCC750A-5",
        "SCC750HD/Q-A",
        "SCS800A",
        "SCC850A-5",
        "SCS900A",
        "SCA1000A",
        "SCC1000A-5",
        "SCE1000A",
        "SCE1000A-2",
        "SCE1000A-EV",
        "SCS1000A",
      ],
      previewSpecsOverride: [
        { name: "Max. Boom Length", valueWithUnit: "≤65 m" },
        { name: "Max. Lifting Capacity", valueWithUnit: "≤100 T" },
        { name: "Maximum Lifting Moment", valueWithUnit: "≤800 t·m" },
      ],
    },
    {
      rangeLabel: "135 - 180T Lattice Boom",
      productRefs: [
        "SCA1350A",
        "SCC1350A-5",
        "SCE1350A",
        "SCE1350A-EV",
        "SCC1500A-8",
        "SCI1500A",
        "SCS1500A",
        "SCC1800A",
      ],
      previewSpecsOverride: [
        { name: "Max. Boom Length", valueWithUnit: "76 - 82 m" },
        { name: "Max. Lifting Capacity", valueWithUnit: "135 - 180 T" },
        { name: "Maximum Lifting Moment", valueWithUnit: "668 - 1056 t·m" },
      ],
    },
    {
      rangeLabel: "200 - 320T Lattice Boom",
      productRefs: [
        "SCC2000A",
        "SCC2000A-EV",
        "SCC2500A",
        "SCI2600A",
        "SCA2600A",
        "SCC2800A",
        "SCE2800A",
        "SCC3200T",
      ],
      previewSpecsOverride: [
        { name: "Max. Boom Length", valueWithUnit: "85 - 92 m" },
        { name: "Max. Lifting Capacity", valueWithUnit: "200 - 320 T" },
        { name: "Maximum Lifting Moment", valueWithUnit: "1152 - 1820 t·m" },
      ],
    },
    {
      rangeLabel: "Over 350T Lattice Boom",
      productRefs: [
        "SCC3500A-6",
        "SCC3500A-8",
        "SCA4000A",
        "SCC4000A-6",
        "SCE4000A-1",
        "SCE4800A",
        "SCC5000A-1",
        "SCC6000A",
        "SCC6000A-1",
        "SCE6000A",
        "SCC7500A",
        "SCC8000A",
        "SCE8000A",
        "SCE12500A",
        "SCC16000TM",
        "SCC22000A",
        "SCE22000A",
      ],
      previewSpecsOverride: [
        { name: "Max. Boom Length", valueWithUnit: "≥84 m" },
        { name: "Max. Lifting Capacity", valueWithUnit: "≥350 T" },
        { name: "Maximum Lifting Moment", valueWithUnit: "≥2380 t·m" },
      ],
    },
    {
      rangeLabel: "25 - 40T Telescopic Boom",
      productRefs: [
        "SCC300TB",
        "STB300T5-1",
        "SCC400TB",
        "SCC400TB-EV",
        "SCE400TB",
      ],
      previewSpecsOverride: [
        { name: "Max. Boom Length", valueWithUnit: "40 - 45 m" },
        { name: "Max. Lifting Capacity", valueWithUnit: "25 - 40 T" },
        { name: "Maximum Lifting Moment", valueWithUnit: "100 - 150 t·m" },
      ],
    },
    {
      rangeLabel: "Over 55T Telescopic Boom",
      productRefs: [
        "STB500T5-EV",
        "SCC600TB",
        "SCE600TB",
        "SCA900TB",
        "SCC800TB",
        "SCC800TB-5",
        "SCE800TB",
        "SCE800TB-EV",
        "STB800T5-S",
        "SCC1000TB",
        "SCE1000TB-EV",
        "STB1000T5",
        "SCC1200TB",
        "SCE1500TB",
        "SCE1500TB-EV",
        "STB1600T6",
        "SCC2500TB",
        "SCE2500TB",
      ],
      previewSpecsOverride: [
        { name: "Max. Boom Length", valueWithUnit: "46 - 60 m" },
        { name: "Max. Lifting Capacity", valueWithUnit: "55 - 130 T" },
        { name: "Maximum Lifting Moment", valueWithUnit: "220 - 480 t·m" },
      ],
    },
  ],

  // ════════════════════════════════════════════════════════════════════════
  //  CONCRETE MACHINERY
  // ════════════════════════════════════════════════════════════════════════

  /** Trailer Pump — subCategoryId 43
   *  SANY site: 40/50 Series | 60 Series | 80 Series | 90 Series | 120 Series */
  43: [
    {
      rangeLabel: "40/50 Series",
      productRefs: ["HBT5008C-6Y"],
      previewSpecsOverride: [
        { name: "Engine Rated Power", valueWithUnit: "49 - 73.6 kW" },
        { name: "Max. Output Pressure", valueWithUnit: "6 - 10 MPa" },
        { name: "Max. Output Quantity", valueWithUnit: "40 - 59 m³/h" },
      ],
    },
    {
      rangeLabel: "60 Series",
      productRefs: [
        "HBT6013C-5(Electric)",
        "HBT6013C-5S",
        "HBT6016C-5S",
      ],
      previewSpecsOverride: [
        { name: "Engine Rated Power", valueWithUnit: "75 - 180 kW" },
        { name: "Max. Output Pressure", valueWithUnit: "7 - 16 MPa" },
        { name: "Max. Output Quantity", valueWithUnit: "65 - 70 m³/h" },
      ],
    },
    {
      rangeLabel: "80 Series",
      productRefs: ["HBT8018C-5S"],
      previewSpecsOverride: [
        { name: "Engine Rated Power", valueWithUnit: "180 kW" },
        { name: "Max. Output Pressure", valueWithUnit: "18 MPa" },
        { name: "Max. Output Quantity", valueWithUnit: "85 m³/h" },
      ],
    },
    {
      rangeLabel: "90 Series",
      productRefs: ["HBT9028CH-5S"],
      previewSpecsOverride: [
        { name: "Engine Rated Power", valueWithUnit: "2×180 kW" },
        { name: "Max. Output Pressure", valueWithUnit: "28 MPa" },
        { name: "Max. Output Quantity", valueWithUnit: "95 m³/h" },
      ],
    },
    {
      rangeLabel: "120 Series",
      productRefs: ["HBT12020C-5S"],
      previewSpecsOverride: [
        { name: "Engine Rated Power", valueWithUnit: "297 kW" },
        { name: "Max. Output Pressure", valueWithUnit: "21 MPa" },
        { name: "Max. Output Quantity", valueWithUnit: "120 m³/h" },
      ],
    },
  ],

  /** Truck-mounted Concrete Pump — subCategoryId 59
   *  SANY site: grouped by vertical reach — Below 37m | 37m | 38-48m
   *             | 49-55m | 56-60m | Over 60m
   *  Series spec rows mirror the curated ranges shown on the SANY listing
   *  page (sanyglobal.com /product/concrete_machinery/truck-mounted_concrete_pump/),
   *  which differ from the strict per-product min/max. */
  59: [
    {
      rangeLabel: "37m",
      productRefs: [
        "SYG5261THB 370C-10(SZ-LA)",
      ],
      previewSpecsOverride: [
        { name: "Vertical Reach", valueWithUnit: "36.5 m" },
        { name: "Output", valueWithUnit: "48 - 160 m³/h" },
        { name: "Pressure", valueWithUnit: "6 - 13 MPa" },
      ],
    },
    {
      rangeLabel: "38 - 48m",
      productRefs: [
        "SYG5260THB 390C-10",
        "SYG5262THB 390C-10",
        "SYG5310THB 430C-10",
        "SYG5370THB 470C-10",
      ],
      previewSpecsOverride: [
        { name: "Vertical Reach", valueWithUnit: "38 - 48 m" },
        { name: "Output", valueWithUnit: "120 - 200 m³/h" },
        { name: "Pressure", valueWithUnit: "7 - 12 MPa" },
      ],
    },
    {
      rangeLabel: "49 - 55m",
      productRefs: [
        "SYG5341THB 490C-10",
        "SYG5370THB 490C-10",
      ],
      previewSpecsOverride: [
        { name: "Vertical Reach", valueWithUnit: "48.6 - 55 m" },
        { name: "Output", valueWithUnit: "120 - 200 m³/h" },
        { name: "Pressure", valueWithUnit: "7 - 12 MPa" },
      ],
    },
    {
      rangeLabel: "56 - 60m",
      productRefs: [
        "SYG5445THB 560C-10",
        "SYG5450THB 560C-10",
      ],
      previewSpecsOverride: [
        { name: "Vertical Reach", valueWithUnit: "56 - 60 m" },
        { name: "Output", valueWithUnit: "120 - 200 m³/h" },
        { name: "Pressure", valueWithUnit: "7 - 12 MPa" },
      ],
    },
    {
      rangeLabel: "Over 60m",
      productRefs: [
        "SYG5521THB 630S",
        "SYM5552THB 710SA",
      ],
      previewSpecsOverride: [
        { name: "Vertical Reach", valueWithUnit: "＞60 m" },
        { name: "Output", valueWithUnit: "120 - 200 m³/h" },
        { name: "Pressure", valueWithUnit: "8.3 - 12 MPa" },
      ],
    },
  ],

  /** Truck Mixer — subCategoryId 60
   *  Curated catalogue: surface only the SY412C-8 commercial model. */
  60: [
    {
      rangeLabel: "SY412C-8",
      productRefs: ["SY412C-8S(V)"],
      brochureUrl:
        "https://drive.google.com/file/d/1K4EJpIAkKoGbZ4lCdFA-cNHttKXdgouP/view?usp=sharing",
      displayAsAggregate: true,
      previewSpecsOverride: [
        { name: "Engine Brand", valueWithUnit: "Weichai / Hino" },
        { name: "Mix Capacity", valueWithUnit: "12 m³" },
        { name: "Water Tank Capacity", valueWithUnit: "400 - 800 L" },
      ],
    },
  ],

  // ════════════════════════════════════════════════════════════════════════
  //  PORT MACHINERY
  // ════════════════════════════════════════════════════════════════════════

  /** Reach Stacker — subCategoryId 70
   *  SANY site: Below 40T | Over 40T */
  70: [
    {
      rangeLabel: "Below 40T",
      productRefs: [
        "SRSC1009-6E",
        "SRSC3532H1-L",
      ],
    },
    {
      rangeLabel: "Over 40T",
      productRefs: [
        "SRSC4535G5",
        "SRSC4535G5-S",
        "SRSC4535H1",
        "SRSC4535H4-65",
        "SRSC4540G5",
        "SRSC4540G5-75",
        "SRSC4540G5-S",
        "SRSC4540H4",
        "SRSC4545H1",
        "SRSC4545H4",
        "SRSC45E",
        "SRSC45E2A",
        "SRSC45E3",
        "SRSC45E5",
        "SRSC45G5",
        "SRSC45G59",
        "SRSC45H1",
        "SRSC45H2",
        "SRSC45H3",
        "SRSC45H4",
        "SRSC45H9",
        "SRSC45T",
        "SRSC45V",
        "SRSC45V1A",
        "SRSC45V3",
        "SRSC45V4",
      ],
    },
  ],

  /** Forklift Truck — subCategoryId 71
   *  SANY site: 10-16T | 18-25T | 28-35T | 40-46T */
  71: [
    {
      rangeLabel: "10 - 16T",
      productRefs: [
        "SCPE100",
        "SCP130A",
        "SCP130A1",
        "SCP130H",
        "SCP160A-6",
        "SCP160E",
        "SCP160H4",
        "SCP160V2",
        "SCP160V2A",
      ],
    },
    {
      rangeLabel: "18 - 25T",
      productRefs: [
        "SCP250C1A",
        "SCP250C2",
        "SCP250H4",
        "SCPE250",
      ],
    },
    {
      rangeLabel: "28 - 35T",
      productRefs: [
        "SCP300C1A",
        "SCP300C2",
        "SCP300H4",
        "SCP320C2",
        "SCP320H4",
        "SCP350C1A",
        "SCP350C2",
      ],
    },
    {
      rangeLabel: "40 - 46T",
      productRefs: [
        "SCP460C1",
        "SCP460C2",
      ],
    },
  ],

  /** Empty Container Handler — subCategoryId 72
   *  SANY site: 4 distinct families — Single Empty | Twin Empty
   *             | Loaded Container | Electric Empty */
  72: [
    {
      rangeLabel: "Single Empty Container Handler",
      productRefs: [
        "SDCY90K6G5",
        "SDCY90K6H1C",
        "SDCY90K6H2",
        "SDCY90K6H2B",
        "SDCY90K6H4",
        "SDCY90K7G5",
        "SDCY90K7H1-B",
        "SDCY90K7H1C",
        "SDCY90K7H2",
        "SDCY90K7H2B",
        "SDCY90K7H4",
        "SDCY90K7H4B",
        "SDCY90K7V1A",
        "SDCY90K7V1B",
        "SDCY90K7V5B",
        "SDCY90K8H1C",
        "SDCY90K8H2",
        "SDCY90K8H2B",
        "SDCY90K8H4",
      ],
    },
    {
      rangeLabel: "Twin Empty Container Handler",
      productRefs: [
        "SDCY100K8-T",
        "SDCY100K8H1-T",
        "SDCY100K9H1-T",
      ],
    },
    {
      rangeLabel: "Loaded Container Handler",
      productRefs: [
        "SDCY410K5H4",
        "SDCY410K5H5",
        "SDCY450K3H4",
      ],
    },
    {
      rangeLabel: "Electric Empty Container Handler",
      productRefs: [
        "SDCE90K7",
        "SDCE90K7E2",
        "SDCE90K7E3",
        "SDCE90K7E5",
        "SDCE100K7-T",
        "SDCE100K9-T",
      ],
    },
  ],

  /** Customized Container Cranes — subCategoryId 76
   *  SANY site: 3 separate families — STS | RTG | RMG */
  76: [
    {
      rangeLabel: "STS",
      productRefs: [
        "STS4101S",
        "STS4501S",
        "STS5001S",
        "STS5501S",
        "STS6501S",
      ],
    },
    {
      rangeLabel: "RTG",
      productRefs: [
        "RTG5203",
        "RTG5204",
        "RTG5223S",
        "RTG5501",
      ],
    },
    {
      rangeLabel: "RMG",
      productRefs: [
        "RMG5508",
        "RMG5530S",
        "RMG5540S",
      ],
    },
  ],

  // ════════════════════════════════════════════════════════════════════════
  //  ROAD MACHINERY
  // ════════════════════════════════════════════════════════════════════════

  /** Motor Grader — subCategoryId 77
   *  Curated display keeps only STG230C-10S(Stage Ⅱ). */
  77: [
    {
      rangeLabel: "STG Series",
      productRefs: ["STG230C-10S(Stage Ⅱ)"],
      previewSpecsOverride: [
        { name: "Length of Blade", valueWithUnit: "3660 - 4270 mm" },
        { name: "Operating Weight", valueWithUnit: "13 - 16.6 T" },
        { name: "Rated Power", valueWithUnit: "112 - 180 kW" },
      ],
    },
  ],

  /** Roller — subCategoryId 78
   *  SANY site has 4 series — Single Drum (Single Drive) | Single Drum (Dual Drive)
   *  | Tandem Drum | Pneumatic Tyre. All scraped SSR products in our catalog are
   *  Dual Drive, so the "Single Drive" sub-family is omitted until products are
   *  available. */
  78: [
    {
      rangeLabel: "Single Drum Roller (Dual Drive)",
      productRefs: [
        "SSR100C-10 (Euro Ⅲ)",
        "SSR100C-10S (Euro Ⅱ)",
        "SSR120C-10S (Euro Ⅱ)",
        "SSR120C-10S (Euro Ⅲ)",
        "SSR120C-10S(Euro Ⅲ)",
        "SSR120C-10S(ISUZU)",
        "SSR130C-10H",
        "SSR140C-10S",
        "SSR212",
      ],
      previewSpecsOverride: [
        { name: "Centrifugal Force", valueWithUnit: "246/124 - 420/310 kN" },
        { name: "Rated Power", valueWithUnit: "93 - 180 kW" },
        { name: "Operating Weight", valueWithUnit: "10000 - 26000 kg" },
      ],
      previewImageOverride:
        "/images/sany-official/road-machinery/roller/ssr100c-10-euro-1358/ssr100c-10-euro-1358__img-01.webp",
    },
    {
      rangeLabel: "Tandem Drum Roller",
      productRefs: [
        "STR27C-10",
        "STR30C-10S",
        "STR30C-8",
        "SZR30C-8",
        "STR50C-8K",
        "STR50C-8K(32.4kW)",
        "SZR50C-8K",
        "STR110C-10",
        "STR130C-10",
        "STR140C-10",
      ],
      previewSpecsOverride: [
        { name: "Centrifugal Force", valueWithUnit: "46/28 - 169/119 kN" },
        { name: "Rated Power", valueWithUnit: "28.1 - 119 kW" },
        { name: "Operating Weight", valueWithUnit: "3000 - 14000 kg" },
      ],
    },
    {
      rangeLabel: "Pneumatic Tyre Roller",
      productRefs: [
        "SPR160C-8",
        "SPR200C-8",
        "SPR260C-10",
        "SPR300C-10",
      ],
      previewSpecsOverride: [
        { name: "Compaction Width", valueWithUnit: "2085 - 2368 mm" },
        { name: "Max. Operating Weight", valueWithUnit: "16000 - 30000 kg" },
        { name: "Engine Power", valueWithUnit: "93 - 140 kW" },
      ],
    },
  ],

  // ════════════════════════════════════════════════════════════════════════
  //  MINING & TUNNELING
  // ════════════════════════════════════════════════════════════════════════

  /** Roadheader — subCategoryId 82
   *  SANY site: grouped by SERIES (cutter-head working condition)
   *   • EBZ Series — all/half coal seam
   *   • STR Series — coal/half-coal/rock
   *   • SCR Series — non-coal / hard rock */
  82: [
    {
      rangeLabel: "EBZ Series",
      productRefs: [
        "EBZ132",
        "EBZ160CA",
        "EBZ200H",
        "EBZ200R",
        "EBZ200RUS",
        "EBZ260R",
        "EBZ260RUS",
        "EBZ318H",
      ],
      previewSpecsOverride: [
        { name: "Cutting Motor Power", valueWithUnit: "75 - 318 kW" },
        { name: "Total Power", valueWithUnit: "200 - 570 kW" },
        { name: "Working Conditions", valueWithUnit: "All/Half Coal" },
      ],
    },
    {
      rangeLabel: "STR Series",
      productRefs: [
        "STR260/5",
        "STR318/5",
      ],
      previewSpecsOverride: [
        { name: "Cutting Motor Power", valueWithUnit: "200 - 368 kW" },
        { name: "Total Power", valueWithUnit: "340 - 606 kW" },
        { name: "Working Conditions", valueWithUnit: "Coal/Half Coal/Rock" },
      ],
    },
    {
      rangeLabel: "SCR Series",
      productRefs: [
        "SCR280",
        "SCR520A",
        "SCR630",
      ],
      previewSpecsOverride: [
        { name: "Cutting Motor Power", valueWithUnit: "200 - 2×315 kW" },
        { name: "Total Power", valueWithUnit: "455 - 867 kW" },
        { name: "Working Conditions", valueWithUnit: "Non-coal" },
      ],
    },
  ],

  // ════════════════════════════════════════════════════════════════════════
  //  TRUCK
  // ════════════════════════════════════════════════════════════════════════

  /** Off-highway Mining Truck — subCategoryId 87
   *  SANY site: 4 distinct families
   *   • Electric Drive Mining Truck (136-220T)
   *   • Wide Body Mining Truck (60-100T)
   *   • Rigid Mining Truck (55-95T)
   *   • Articulated Dump Truck (41T) */
  87: [
    {
      rangeLabel: "Electric Drive Mining Truck",
      productRefs: [
        "SET150S",
        "SET240S",
      ],
    },
    {
      rangeLabel: "Wide Body Mining Truck",
      productRefs: [
        "SKT40S",
        "SKT90S (Manual)",
        "SKT90S (Automatic)",
        "SKT90E",
        "SKT105S",
        "SKT105E",
        "SKT130S",
        "SKT160S",
      ],
    },
    {
      rangeLabel: "Rigid Mining Truck",
      productRefs: [
        "SRT55D",
        "SRT55D-W",
        "SRT95C",
      ],
    },
    {
      rangeLabel: "Articulated Dump Truck",
      productRefs: ["SAT40C"],
    },
  ],

  /** Semi-trailer Tractor — subCategoryId 117
   *  Curated split (not present on SANY site): electric (kWh battery) | diesel.
   *  Each series rendered as a single aggregate row (no specs, no variants). */
  117: [
    {
      rangeLabel: "Tracteur électrique",
      productRefs: [
        "282/376kWh Composite",
        '350kWh "4x2" Composite',
        '350kWh "6x4 Short Wheelbase" Composite',
        '350kWh "6x4" Composite',
        "350kWh Composite",
        "350kWh Super",
        "437kWh Composite",
        "437kWh Standard",
        "588kWh Composite",
        "588kWh Super",
        "636kWh Standard",
      ],
      brochureUrl:
        "https://drive.google.com/file/d/1krM-NShA2Kf2cfxanKCWbLCZ74saSB04/view?usp=sharing",
      displayAsAggregate: true,
    },
    {
      rangeLabel: "Tracteur diesel",
      productRefs: [
        "Africa 6x4",
        "Saudi Arabia 6x4",
      ],
      brochureUrl:
        "https://drive.google.com/file/d/1-Cz7vyyAhvgW9wEhDyYJAAgOjChzt9UD/view?usp=sharing",
      previewSpecsOverride: [
        { name: "Empty Weight", valueWithUnit: "7.5 T" },
        { name: "Wheelbase", valueWithUnit: "3750 mm" },
        { name: "Engine Power", valueWithUnit: "495 HP" },
      ],
      displayAsAggregate: true,
    },
  ],

  /** Dump Truck — subCategoryId 86
   *  Single curated series surfacing both SYZ420C variants under the
   *  shared "Camion Benne" title. No rangeLabel suffix is rendered. */
  86: [
    {
      rangeLabel: "",
      productRefs: ["SYZ420C-8S(V) 8x4", "SYZ420C"],
      brochureUrl:
        "https://drive.google.com/file/d/10FISGwp4KQUaFnErqs5m9uaCxOAKjt9M/view?usp=sharing",
    },
  ],
};
