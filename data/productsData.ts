import { Product, Category, Brand } from "@/lib/types";
import { sanySeriesProducts } from "./sanySeriesProducts";
import { faboScrapedProducts } from "./faboScrapedProducts";
import { faboOfficialMobileProducts } from "./faboOfficialMobileProducts";
import {
  sunwardScrapedProducts,
  sunwardScrapedCategories,
} from "./sunwardScrapedProducts";
import { teksanGensetModels } from "./teksanGensetModels";
import { teksanLightingTowerModels } from "./teksanLightingTowerModels";

const existingProducts: Product[] = [
  {
    id: "sany-pompe-beton-37m",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "SANY POMPE À BÉTON MONTÉE SUR CAMION DE MOINS DE 37M",
      en: "SANY TRUCK-MOUNTED CONCRETE PUMP UNDER 37M",
      es: "SANY BOMBA DE HORMIGÓN MONTADA EN CAMIÓN MENOS DE 37M",
    },
    shortTitle: {
      fr: "POMPE À BÉTON MONTÉE SUR CAMION DE MOINS DE 37M",
      en: "TRUCK-MOUNTED CONCRETE PUMP UNDER 37M",
      es: "BOMBA DE HORMIGÓN MONTADA EN CAMIÓN MENOS DE 37M",
    },
    description: {
      fr: "Pompe à béton montée sur camion haute performance pour projets de construction de moyenne envergure",
      en: "High-performance truck-mounted concrete pump for medium-scale construction projects",
      es: "Bomba de hormigón montada en camión de alto rendimiento para proyectos de construcción de mediana escala",
    },
    specs: {
      portee: {
        fr: "Portée verticale: 24 - 36 m",
        en: "Vertical reach: 24 - 36 m",
        es: "Alcance vertical: 24 - 36 m",
      },
      pression: {
        fr: "Pression: 6 - 6.6 MPa",
        en: "Pressure: 6 - 6.6 MPa",
        es: "Presión: 6 - 6.6 MPa",
      },
      sortie: {
        fr: "Sortie: 100 - 150 m³/h",
        en: "Output: 100 - 150 m³/h",
        es: "Salida: 100 - 150 m³/h",
      },
    },
    models: [
      "SYG5211THB 25C-10(SZ-EU)",
      "SYG5200THB 25C-8(SZ-RU)",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20250716/1_140856.jpg?x-oss-process=image/format,webp",
    featured: true,
    available: true,
    numericSpecs: {
      reach: 36,
      capacity: 150,
    },
  },

  {
    id: "sany-pompe-beton-stationnaire",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "SANY POMPE À BÉTON STATIONNAIRE",
      en: "SANY STATIONARY CONCRETE PUMP",
      es: "SANY BOMBA DE HORMIGÓN ESTACIONARIA",
    },
    shortTitle: {
      fr: "POMPE À BÉTON STATIONNAIRE",
      en: "STATIONARY CONCRETE PUMP",
      es: "BOMBA DE HORMIGÓN ESTACIONARIA",
    },
    description: {
      fr: "Pompe à béton stationnaire haute capacité pour les grands chantiers de construction",
      en: "High-capacity stationary concrete pump for large construction sites",
      es: "Bomba de hormigón estacionaria de alta capacidad para grandes obras de construcción",
    },
    specs: {
      portee: {
        fr: "Portée: jusqu'à 120 m",
        en: "Range: up to 120 m",
        es: "Alcance: hasta 120 m",
      },
      pression: {
        fr: "Capacité: 60 - 120 m³/h",
        en: "Capacity: 60 - 120 m³/h",
        es: "Capacidad: 60 - 120 m³/h",
      },
      sortie: {
        fr: "Moteur: Diesel/Électrique",
        en: "Engine: Diesel/Electric",
        es: "Motor: Diésel/Eléctrico",
      },
    },
    models: ["HBT9028CH-5S", "HBT9032CH", "HBT9038CH"],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20240415/2_103240.jpg?x-oss-process=image/format,webp",
    featured: true,
    available: true,
    numericSpecs: {
      reach: 120,
      capacity: 120,
    },
  },

  {
    id: "sany-mini-excavatrice",
    category: "excavation",
    brand: "SANY",
    title: {
      fr: "SANY MINI EXCAVATRICE",
      en: "SANY MINI EXCAVATOR",
      es: "SANY MINI EXCAVADORA",
    },
    shortTitle: {
      fr: "MINI EXCAVATRICE",
      en: "MINI EXCAVATOR",
      es: "MINI EXCAVADORA",
    },
    description: {
      fr: "Mini excavatrice compacte pour les travaux en espaces restreints et démolition sélective",
      en: "Compact mini excavator for work in confined spaces and selective demolition",
      es: "Mini excavadora compacta para trabajos en espacios reducidos y demolición selectiva",
    },
    specs: {
      portee: {
        fr: "Poids de fonctionnement: 1,87 - 5,1 T",
        en: "Operating weight: 1.87 - 5.1 T",
        es: "Peso de funcionamiento: 1,87 - 5,1 T",
      },
      pression: {
        fr: "Puissance du moteur: 10,3 - 35,5 kW",
        en: "Engine power: 10.3 - 35.5 kW",
        es: "Potencia del motor: 10,3 - 35,5 kW",
      },
      sortie: {
        fr: "Capacité du godet: 0,04 - 0,15 m³",
        en: "Bucket capacity: 0.04 - 0.15 m³",
        es: "Capacidad del cubo: 0,04 - 0,15 m³",
      },
    },
    models: ["SY16C", "SY26U (Tier4 F & Stage Ⅴ)", "SY50U"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/2T~5T%20Mini%20Exca-174719?x-oss-process=image/format,webp",
    featured: false,
    available: true,
    numericSpecs: {
      weight: 5.1,
      power: 35.5,
    },
  },
  {
    id: "sany-chargeuse-roues",
    category: "manutention",
    brand: "SANY",
    title: {
      fr: "SANY CHARGEUSE SUR ROUES",
      en: "SANY WHEEL LOADER",
      es: "SANY CARGADORA DE RUEDAS",
    },
    shortTitle: {
      fr: "CHARGEUSE SUR ROUES",
      en: "WHEEL LOADER",
      es: "CARGADORA DE RUEDAS",
    },
    description: {
      fr: "Chargeuse sur roues compacte pour chargement et transport de matériaux",
      en: "Compact wheel loader for loading and transporting materials",
      es: "Cargadora de ruedas compacta para carga y transporte de materiales",
    },
    specs: {
      portee: {
        fr: "Capacité godet: 1.5 - 2.5 m³",
        en: "Bucket capacity: 1.5 - 2.5 m³",
        es: "Capacidad cubo: 1.5 - 2.5 m³",
      },
      pression: {
        fr: "Puissance: 60 - 100 kW",
        en: "Power: 60 - 100 kW",
        es: "Potencia: 60 - 100 kW",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SWL32F", "SWL50F", "SWL80F"],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20230621/956%20(1)_164455.png?x-oss-process=image/format,webp",
    featured: false,
    available: true,
    numericSpecs: {
      capacity: 2.5,
      power: 100,
    },
  },
  {
    id: "sany-grue-camion-100t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "SANY GRUE MONTÉE SUR CAMION +100T",
      en: "SANY TRUCK-MOUNTED CRANE +100T",
      es: "SANY GRÚA MONTADA EN CAMIÓN +100T",
    },
    shortTitle: {
      fr: "GRUE MONTÉE SUR CAMION +100T",
      en: "TRUCK-MOUNTED CRANE +100T",
      es: "GRÚA MONTADA EN CAMIÓN +100T",
    },
    description: {
      fr: "Grue montée sur camion haute capacité pour les plus gros travaux de levage (>100 tonnes)",
      en: "High-capacity truck-mounted crane for major lifting operations (>100 tons)",
      es: "Grúa montada en camión de alta capacidad para grandes trabajos de elevación (>100 toneladas)",
    },
    specs: {
      portee: {
        fr: "Portée: 30 - 60 m",
        en: "Range: 30 - 60 m",
        es: "Alcance: 30 - 60 m",
      },
      pression: {
        fr: "Capacité: 100 - 300 tonnes",
        en: "Capacity: 100 - 300 tons",
        es: "Capacidad: 100 - 300 toneladas",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["STC500T"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/over%20100T%20Truck-192038?x-oss-process=image/format,webp",
    featured: true,
    available: true,
    numericSpecs: {
      weight: 300,
      reach: 60,
    },
  },
  {
    id: "sany-grue-tour",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "SANY GRUE À TOUR",
      en: "SANY TOWER CRANE",
      es: "SANY GRÚA TORRE",
    },
    shortTitle: {
      fr: "GRUE À TOUR",
      en: "TOWER CRANE",
      es: "GRÚA TORRE",
    },
    description: {
      fr: "Grue à tour pour construction immobilière avec grande stabilité",
      en: "Tower crane for building construction with high stability",
      es: "Grúa torre para construcción de edificios con gran estabilidad",
    },
    specs: {
      portee: {
        fr: "Portée: 50 - 80 m",
        en: "Range: 50 - 80 m",
        es: "Alcance: 50 - 80 m",
      },
      pression: {
        fr: "Capacité: 25 - 80 tonnes",
        en: "Capacity: 25 - 80 tons",
        es: "Capacidad: 25 - 80 toneladas",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["Topkit Tower Crane", "Flat Top Tower Crane", "SLT260"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/Flat%20top%20tower%20-194920?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },

  // {
  //   id: "ajax-malaxeur-autochargeant",
  //   category: "malaxeurs",
  //   brand: "AJAX",
  //   title: {
  //     fr: "AJAX MALAXEUR AUTOCHARGEANT",
  //     en: "AJAX SELF-LOADING MIXER",
  //     es: "AJAX MEZCLADOR AUTOCARGANTE",
  //   },
  //   shortTitle: {
  //     fr: "MALAXEUR AUTOCHARGEANT",
  //     en: "SELF-LOADING MIXER",
  //     es: "MEZCLADOR AUTOCARGANTE",
  //   },
  //   description: {
  //     fr: "Malaxeur autochargeant compact pour mélange de béton avec efficacité maximale",
  //     en: "Compact self-loading mixer for concrete mixing with maximum efficiency",
  //     es: "Mezclador autocargante compacto para mezcla de hormigón con máxima eficiencia",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité: 2 - 4.8 m³",
  //       en: "Capacity: 2 - 4.8 m³",
  //       es: "Capacidad: 2 - 4.8 m³",
  //     },
  //     pression: {
  //       fr: "Chargement: Automatique",
  //       en: "Loading: Automatic",
  //       es: "Carga: Automática",
  //     },
  //     sortie: {
  //       fr: "Moteur: Diesel",
  //       en: "Engine: Diesel",
  //       es: "Motor: Diésel",
  //     },
  //   },
  //   models: ["SPX1024", "ARGO 2000DM"],
  //   image:
  //     "https://cdn.prod.website-files.com/65006e6ed741800ddeb94c08/655475e5fd4185156a1a49a8_SPX1024.webp",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "fabo-centrale-beton-fixe",
  //   category: "centrales-beton",
  //   brand: "FABO",
  //   title: {
  //     fr: "FABO CENTRALE À BÉTON FIXE",
  //     en: "FABO STATIONARY CONCRETE BATCHING PLANT",
  //     es: "FABO PLANTA DE HORMIGÓN FIJA",
  //   },
  //   shortTitle: {
  //     fr: "CENTRALE À BÉTON FIXE",
  //     en: "STATIONARY CONCRETE PLANT",
  //     es: "PLANTA DE HORMIGÓN FIJA",
  //   },
  //   description: {
  //     fr: "Centrale à béton stationnaire haute performance pour la production de béton à long terme sur site",
  //     en: "High-performance stationary concrete plant for long-term on-site concrete production",
  //     es: "Planta de hormigón fija de alto rendimiento para la producción de hormigón a largo plazo",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité: 60 - 200 m³/h",
  //       en: "Capacity: 60 - 200 m³/h",
  //       es: "Capacidad: 60 - 200 m³/h",
  //     },
  //     pression: {
  //       fr: "Malaxeur: Double arbre",
  //       en: "Mixer: Twin shaft",
  //       es: "Mezclador: Doble eje",
  //     },
  //     sortie: {
  //       fr: "Contrôle: Entièrement automatique",
  //       en: "Control: Fully automatic",
  //       es: "Control: Completamente automático",
  //     },
  //   },
  //   models: ["PowerMix-100", "PowerMix-130", "PowerMix-160"],
  //   image:
  //     "https://fabo.com.tr/wp-content/uploads/2021/08/Station-de-Concassage-Fixes.jpg",
  //   featured: false,
  //   available: true,
  // },
  // {
  //   id: "teksan-tour-eclairage",
  //   category: "eclairage",
  //   brand: "TEKSAN",
  //   title: {
  //     fr: "TEKSAN TOUR D'ÉCLAIRAGE",
  //     en: "TEKSAN LIGHTING TOWER",
  //     es: "TEKSAN TORRE DE ILUMINACIÓN",
  //   },
  //   shortTitle: {
  //     fr: "TOUR D'ÉCLAIRAGE",
  //     en: "LIGHTING TOWER",
  //     es: "TORRE DE ILUMINACIÓN",
  //   },
  //   description: {
  //     fr: "Tours d'éclairage mobiles et robustes pour les chantiers nocturnes et les événements",
  //     en: "Robust mobile lighting towers for night construction sites and events",
  //     es: "Torres de iluminación móviles y robustas para obras nocturnas y eventos",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Type de lampe: LED / Halogène",
  //       en: "Lamp type: LED / Halogen",
  //       es: "Tipo de lámpara: LED / Halógena",
  //     },
  //     pression: {
  //       fr: "Hauteur mât: 7 - 9 m",
  //       en: "Mast height: 7 - 9 m",
  //       es: "Altura del mástil: 7 - 9 m",
  //     },
  //     sortie: {
  //       fr: "Moteur: Diesel",
  //       en: "Engine: Diesel",
  //       es: "Motor: Diésel",
  //     },
  //   },
  //   models: ["TLT series"],
  //   image: "https://cdn.teksan.com/DataPict/Large/aydinlatma-kuleleri-1-e1.png",
  //   featured: false,
  //   available: true,
  // },
  {
    id: "sany-grue-tout-terrain-100-200t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "SANY GRUE TOUT-TERRAIN 100-200T",
      en: "SANY ALL-TERRAIN CRANE 100-200T",
      es: "SANY GRÚA TODO TERRENO 100-200T",
    },
    shortTitle: {
      fr: "GRUE TOUT-TERRAIN 100-200T",
      en: "ALL-TERRAIN CRANE 100-200T",
      es: "GRÚA TODO TERRENO 100-200T",
    },
    description: {
      fr: "Grue tout-terrain pour applications exigeantes sur terrains accidentés (100-200 tonnes)",
      en: "All-terrain crane for demanding applications on rough terrain (100-200 tons)",
      es: "Grúa todo terreno para aplicaciones exigentes en terrenos accidentados (100-200 toneladas)",
    },
    specs: {
      portee: {
        fr: "Portée: 20 - 50 m",
        en: "Range: 20 - 50 m",
        es: "Alcance: 20 - 50 m",
      },
      pression: {
        fr: "Capacité: 100 - 200 tonnes",
        en: "Capacity: 100 - 200 tons",
        es: "Capacidad: 100 - 200 toneladas",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SAC300", "SAC400"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/100~200T%20All-te-193759?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },
  {
    id: "sany-grue-tout-terrain-200-300t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "SANY GRUE TOUT-TERRAIN 200-300T",
      en: "SANY ALL-TERRAIN CRANE 200-300T",
      es: "SANY GRÚA TODO TERRENO 200-300T",
    },
    shortTitle: {
      fr: "GRUE TOUT-TERRAIN 200-300T",
      en: "ALL-TERRAIN CRANE 200-300T",
      es: "GRÚA TODO TERRENO 200-300T",
    },
    description: {
      fr: "Grue tout-terrain grande capacité pour les projets majeurs (200-300 tonnes)",
      en: "High-capacity all-terrain crane for major projects (200-300 tons)",
      es: "Grúa todo terreno de gran capacidad para proyectos importantes (200-300 toneladas)",
    },
    specs: {
      portee: {
        fr: "Portée: 30 - 60 m",
        en: "Range: 30 - 60 m",
        es: "Alcance: 30 - 60 m",
      },
      pression: {
        fr: "Capacité: 200 - 300 tonnes",
        en: "Capacity: 200 - 300 tons",
        es: "Capacidad: 200 - 300 toneladas",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SAC4500S"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/200~300T%20All-te-193818?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },
  {
    id: "sany-grue-terrain-accidente-30-50t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "SANY GRUE TERRAIN ACCIDENTÉ 30-50T",
      en: "SANY ROUGH TERRAIN CRANE 30-50T",
      es: "SANY GRÚA TERRENO ACCIDENTADO 30-50T",
    },
    shortTitle: {
      fr: "GRUE TERRAIN ACCIDENTÉ 30-50T",
      en: "ROUGH TERRAIN CRANE 30-50T",
      es: "GRÚA TERRENO ACCIDENTADO 30-50T",
    },
    description: {
      fr: "Grue pour terrains accidentés légère à moyenne (30-50 tonnes)",
      en: "Light to medium rough terrain crane (30-50 tons)",
      es: "Grúa para terrenos accidentados ligera a mediana (30-50 toneladas)",
    },
    specs: {
      portee: {
        fr: "Portée: 15 - 40 m",
        en: "Range: 15 - 40 m",
        es: "Alcance: 15 - 40 m",
      },
      pression: {
        fr: "Capacité: 30 - 50 tonnes",
        en: "Capacity: 30 - 50 tons",
        es: "Capacidad: 30 - 50 toneladas",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SRC250C"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/30~50T%20Rough-te-193902?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-terrain-accidente-50-80t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "SANY GRUE TERRAIN ACCIDENTÉ 50-80T",
      en: "SANY ROUGH TERRAIN CRANE 50-80T",
      es: "SANY GRÚA TERRENO ACCIDENTADO 50-80T",
    },
    shortTitle: {
      fr: "GRUE TERRAIN ACCIDENTÉ 50-80T",
      en: "ROUGH TERRAIN CRANE 50-80T",
      es: "GRÚA TERRENO ACCIDENTADO 50-80T",
    },
    description: {
      fr: "Grue pour terrains accidentés moyenne à grande capacité (50-80 tonnes)",
      en: "Medium to high capacity rough terrain crane (50-80 tons)",
      es: "Grúa para terrenos accidentados de capacidad media a alta (50-80 toneladas)",
    },
    specs: {
      portee: {
        fr: "Portée: 20 - 50 m",
        en: "Range: 20 - 50 m",
        es: "Alcance: 20 - 50 m",
      },
      pression: {
        fr: "Capacité: 50 - 80 tonnes",
        en: "Capacity: 50 - 80 tons",
        es: "Capacidad: 50 - 80 toneladas",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SRC350C"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/50~80T%20Rough-te-193920?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-terrain-accidente-80t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "SANY GRUE TERRAIN ACCIDENTÉ +80T",
      en: "SANY ROUGH TERRAIN CRANE +80T",
      es: "SANY GRÚA TERRENO ACCIDENTADO +80T",
    },
    shortTitle: {
      fr: "GRUE TERRAIN ACCIDENTÉ +80T",
      en: "ROUGH TERRAIN CRANE +80T",
      es: "GRÚA TERRENO ACCIDENTADO +80T",
    },
    description: {
      fr: "Grue pour terrains accidentés haute capacité (>80 tonnes)",
      en: "High-capacity rough terrain crane (>80 tons)",
      es: "Grúa para terrenos accidentados de alta capacidad (>80 toneladas)",
    },
    specs: {
      portee: {
        fr: "Portée: 30 - 60 m",
        en: "Range: 30 - 60 m",
        es: "Alcance: 30 - 60 m",
      },
      pression: {
        fr: "Capacité: 80 - 160 tonnes",
        en: "Capacity: 80 - 160 tons",
        es: "Capacidad: 80 - 160 toneladas",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SRC500C"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/over%2080T%20Rough--193946?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-chenilles-lattice",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "SANY GRUE SUR CHENILLES - TREILLIS",
      en: "SANY LATTICE BOOM CRAWLER CRANE",
      es: "SANY GRÚA SOBRE ORUGAS - CELOSÍA",
    },
    shortTitle: {
      fr: "GRUE SUR CHENILLES - TREILLIS",
      en: "LATTICE BOOM CRAWLER CRANE",
      es: "GRÚA SOBRE ORUGAS - CELOSÍA",
    },
    description: {
      fr: "Grue sur chenilles avec mât en treillis pour très grandes portées",
      en: "Crawler crane with lattice boom for very large ranges",
      es: "Grúa sobre orugas con pluma de celosía para alcances muy grandes",
    },
    specs: {
      portee: {
        fr: "Portée: 30 - 80 m",
        en: "Range: 30 - 80 m",
        es: "Alcance: 30 - 80 m",
      },
      pression: {
        fr: "Capacité: 25 - 800 tonnes",
        en: "Capacity: 25 - 800 tons",
        es: "Capacidad: 25 - 800 toneladas",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SCC2600", "SCC3200", "SCC4000"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20230329/02_144704.jpg?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },
  {
    id: "sany-grue-montee-camion-2t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "SANY GRUE MONTÉE SUR CAMION LÉGÈRE",
      en: "SANY LIGHT TRUCK-MOUNTED CRANE",
      es: "SANY GRÚA MONTADA EN CAMIÓN LIGERA",
    },
    shortTitle: {
      fr: "GRUE MONTÉE SUR CAMION LÉGÈRE",
      en: "LIGHT TRUCK-MOUNTED CRANE",
      es: "GRÚA MONTADA EN CAMIÓN LIGERA",
    },
    description: {
      fr: "Grue montée sur camion compacte pour applications légères en chantier",
      en: "Compact truck-mounted crane for light applications on construction sites",
      es: "Grúa montada en camión compacta para aplicaciones ligeras en obras",
    },
    specs: {
      portee: {
        fr: "Portée: 8 - 25 m",
        en: "Range: 8 - 25 m",
        es: "Alcance: 8 - 25 m",
      },
      pression: {
        fr: "Capacité: 2 - 10 tonnes",
        en: "Capacity: 2 - 10 tons",
        es: "Capacidad: 2 - 10 toneladas",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["Truck-mounted Crane"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200902/Truck-mounted%20c-190538.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-compacteur-vibrant",
    category: "terrassement",
    brand: "SANY",
    title: {
      fr: "SANY COMPACTEUR VIBRANT",
      en: "SANY VIBRATORY ROLLER",
      es: "SANY RODILLO VIBRATORIO",
    },
    shortTitle: {
      fr: "COMPACTEUR VIBRANT",
      en: "VIBRATORY ROLLER",
      es: "RODILLO VIBRATORIO",
    },
    description: {
      fr: "Compacteur vibrant automoteur pour la compaction du sol et du béton",
      en: "Self-propelled vibratory roller for soil and concrete compaction",
      es: "Rodillo vibratorio autopropulsado para compactación de suelo y hormigón",
    },
    specs: {
      portee: {
        fr: "Poids: 8 - 15 tonnes",
        en: "Weight: 8 - 15 tons",
        es: "Peso: 8 - 15 toneladas",
      },
      pression: {
        fr: "Largeur: 2 - 2.5 m",
        en: "Width: 2 - 2.5 m",
        es: "Ancho: 2 - 2.5 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SSR800", "STR140"],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20250704/SSR-800-480-AC_112921.png?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "fabo-centrale-beton-fixe-standard",
    category: "centrales-beton",
    brand: "FABO",
    title: {
      fr: "FABO CENTRALE À BÉTON FIXE",
      en: "FABO STATIONARY CONCRETE BATCHING PLANT",
      es: "FABO PLANTA DE HORMIGÓN FIJA",
    },
    shortTitle: {
      fr: "CENTRALE À BÉTON FIXE",
      en: "STATIONARY CONCRETE BATCHING PLANT",
      es: "PLANTA DE HORMIGÓN FIJA",
    },
    description: {
      fr: "Centrale à béton fixe pour la production continue de béton en usine",
      en: "Stationary concrete batching plant for continuous concrete production in factories",
      es: "Planta de hormigón fija para producción continua de hormigón en fábricas",
    },
    specs: {
      portee: {
        fr: "Capacité: 50 - 200 m³/h",
        en: "Capacity: 50 - 200 m³/h",
        es: "Capacidad: 50 - 200 m³/h",
      },
      pression: {
        fr: "Malaxeur: Pan/Axial",
        en: "Mixer: Pan/Axial",
        es: "Mezclador: Pan/Axial",
      },
      sortie: {
        fr: "Système de contrôle: Siemens/ABB",
        en: "Control system: Siemens/ABB",
        es: "Sistema de control: Siemens/ABB",
      },
    },
    models: ["POWERMIX-60", "POWERMIX-90", "POWERMIX-100"],
    image:
      "https://fabo.com.tr/wp-content/uploads/2021/08/Powermix-60-Centrale-a-beton-fixe-min.jpg",
    featured: false,
    available: true,
  },
  {
    id: "fabo-concasseur-mobile",
    category: "concasseurs",
    brand: "FABO",
    title: {
      fr: "FABO CONCASSEUR MOBILE",
      en: "FABO MOBILE CRUSHER",
      es: "FABO TRITURADORA MÓVIL",
    },
    shortTitle: {
      fr: "CONCASSEUR MOBILE",
      en: "MOBILE CRUSHER",
      es: "TRITURADORA MÓVIL",
    },
    description: {
      fr: "Concasseur mobile sur chenilles pour le concassage de matériaux en site",
      en: "Mobile crusher on tracks for crushing materials on site",
      es: "Trituradora móvil sobre orugas para trituración de materiales en sitio",
    },
    specs: {
      portee: {
        fr: "Capacité: 100 - 300 tonnes/h",
        en: "Capacity: 100 - 300 tons/h",
        es: "Capacidad: 100 - 300 toneladas/h",
      },
      pression: {
        fr: "Transport: Sur chenilles",
        en: "Transport: On tracks",
        es: "Transporte: Sobre orugas",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["FTB-15-50", "Concasseur à Percussion"],
    image:
      "https://fabo.com.tr/wp-content/uploads/2023/04/Concasseurs-Mobiles-sur-Chenilless.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-niveleuse",
    category: "terrassement",
    brand: "SANY",
    title: {
      fr: "SANY NIVELEUSE",
      en: "SANY MOTOR GRADER",
      es: "SANY NIVELADORA",
    },
    shortTitle: {
      fr: "NIVELEUSE",
      en: "MOTOR GRADER",
      es: "NIVELADORA",
    },
    description: {
      fr: "Niveleuse pour l'égalisation et la finition des routes et surfaces",
      en: "Motor grader for leveling and finishing roads and surfaces",
      es: "Niveladora para igualación y acabado de carreteras y superficies",
    },
    specs: {
      portee: {
        fr: "Poids: 13 - 20 tonnes",
        en: "Weight: 13 - 20 tons",
        es: "Peso: 13 - 20 toneladas",
      },
      pression: {
        fr: "Largeur lame: 3.5 - 4.5 m",
        en: "Blade width: 3.5 - 4.5 m",
        es: "Ancho de hoja: 3.5 - 4.5 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["STG800", "SMG200"],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20250704/STG-800-480_144543.png?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-finisseur",
    category: "terrassement",
    brand: "SANY",
    title: {
      fr: "SANY FINISSEUR D'ASPHALTE",
      en: "SANY ASPHALT FINISHER",
      es: "SANY EXTENDEDORA DE ASFALTO",
    },
    shortTitle: {
      fr: "FINISSEUR D'ASPHALTE",
      en: "ASPHALT FINISHER",
      es: "EXTENDEDORA DE ASFALTO",
    },
    description: {
      fr: "Finisseur pour la pose du béton ou bitume avec finition de surface lisse",
      en: "Finisher for laying concrete or asphalt with smooth surface finish",
      es: "Extendedora para colocación de hormigón o asfalto con acabado de superficie liso",
    },
    specs: {
      portee: {
        fr: "Poids: 9 - 13 tonnes",
        en: "Weight: 9 - 13 tons",
        es: "Peso: 9 - 13 toneladas",
      },
      pression: {
        fr: "Largeur: 3 - 4 m",
        en: "Width: 3 - 4 m",
        es: "Ancho: 3 - 4 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SSP130C", "SAP800"],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20250704/SAP-800-480_143918.png?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },

  {
    id: "sany-fraiseuse",
    category: "terrassement",
    brand: "SANY",
    title: {
      fr: "SANY FRAISEUSE ROUTIÈRE",
      en: "SANY ROAD MILLING MACHINE",
      es: "SANY FRESADORA DE CARRETERAS",
    },
    shortTitle: {
      fr: "FRAISEUSE ROUTIÈRE",
      en: "ROAD MILLING MACHINE",
      es: "FRESADORA DE CARRETERAS",
    },
    description: {
      fr: "Fraiseuse pour l'enlèvement et le recyclage de revêtements routiers",
      en: "Milling machine for removal and recycling of road surfaces",
      es: "Fresadora para eliminación y reciclaje de superficies de carreteras",
    },
    specs: {
      portee: {
        fr: "Poids: 8 - 14 tonnes",
        en: "Weight: 8 - 14 tons",
        es: "Peso: 8 - 14 toneladas",
      },
      pression: {
        fr: "Largeur: 2 - 3 m",
        en: "Width: 2 - 3 m",
        es: "Ancho: 2 - 3 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SCM800"],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20250704/SCM-800-480_113804.png?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-camion-50-100t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "SANY GRUE MONTÉE SUR CAMION 50-100T",
      en: "SANY TRUCK-MOUNTED CRANE 50-100T",
      es: "SANY GRÚA MONTADA EN CAMIÓN 50-100T",
    },
    shortTitle: {
      fr: "GRUE MONTÉE SUR CAMION 50-100T",
      en: "TRUCK-MOUNTED CRANE 50-100T",
      es: "GRÚA MONTADA EN CAMIÓN 50-100T",
    },
    description: {
      fr: "Grue montée sur camion pour levage et manutention de charges lourdes (50-100 tonnes)",
      en: "Truck-mounted crane for lifting and handling heavy loads (50-100 tons)",
      es: "Grúa montada en camión para elevación y manipulación de cargas pesadas (50-100 toneladas)",
    },
    specs: {
      portee: {
        fr: "Portée: 15 - 50 m",
        en: "Range: 15 - 50 m",
        es: "Alcance: 15 - 50 m",
      },
      pression: {
        fr: "Capacité: 50 - 100 tonnes",
        en: "Capacity: 50 - 100 tons",
        es: "Capacidad: 50 - 100 toneladas",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["STC300T", "STC400T"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/50~100T%20Truck%20c-192016?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },
  {
    id: "sany-camion-benne",
    category: "transport",
    brand: "SANY",
    title: {
      fr: "SANY CAMION BENNE",
      en: "SANY DUMP TRUCK",
      es: "SANY CAMIÓN VOLQUETE",
    },
    shortTitle: {
      fr: "CAMION BENNE",
      en: "DUMP TRUCK",
      es: "CAMIÓN VOLQUETE",
    },
    description: {
      fr: "Camion benne pour le transport de matériaux en vrac sur route",
      en: "Dump truck for transporting bulk materials on roads",
      es: "Camión volquete para transporte de materiales a granel en carreteras",
    },
    specs: {
      portee: {
        fr: "Capacité: 20 - 50 tonnes",
        en: "Capacity: 20 - 50 tons",
        es: "Capacidad: 20 - 50 toneladas",
      },
      pression: {
        fr: "Volume: 10 - 20 m³",
        en: "Volume: 10 - 20 m³",
        es: "Volumen: 10 - 20 m³",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SYZ5250"],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20250707/%E7%87%83%E6%B2%B9%E8%BD%A6_160230.png?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-camion-minier",
    category: "transport",
    brand: "SANY",
    title: {
      fr: "SANY CAMION MINIER TOUT-TERRAIN",
      en: "SANY ALL-TERRAIN MINING TRUCK",
      es: "SANY CAMIÓN MINERO TODO TERRENO",
    },
    shortTitle: {
      fr: "CAMION MINIER TOUT-TERRAIN",
      en: "ALL-TERRAIN MINING TRUCK",
      es: "CAMIÓN MINERO TODO TERRENO",
    },
    description: {
      fr: "Camion minier tout-terrain pour le transport de matériaux et minerais",
      en: "All-terrain mining truck for transporting materials and ores",
      es: "Camión minero todo terreno para transporte de materiales y minerales",
    },
    specs: {
      portee: {
        fr: "Capacité: 40 - 90 tonnes",
        en: "Capacity: 40 - 90 tons",
        es: "Capacidad: 40 - 90 toneladas",
      },
      pression: {
        fr: "Volume: 20 - 40 m³",
        en: "Volume: 20 - 40 m³",
        es: "Volumen: 20 - 40 m³",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SET150S", "SKT90", "SRT100"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20220304/SET150S-02-160026.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-reach-stacker",
    category: "manutention-portuaire",
    brand: "SANY",
    title: {
      fr: "SANY REACH STACKER",
      en: "SANY REACH STACKER",
      es: "SANY APILADORA DE ALTO ALCANCE",
    },
    shortTitle: {
      fr: "REACH STACKER",
      en: "REACH STACKER",
      es: "APILADORA DE ALTO ALCANCE",
    },
    description: {
      fr: "Reach stacker pour la manutention de conteneurs dans les ports et dépôts",
      en: "Reach stacker for container handling in ports and depots",
      es: "Apiladora de alto alcance para manipulación de contenedores en puertos y depósitos",
    },
    specs: {
      portee: {
        fr: "Capacité: 30 - 50 tonnes",
        en: "Capacity: 30 - 50 tons",
        es: "Capacidad: 30 - 50 toneladas",
      },
      pression: {
        fr: "Hauteur: jusqu'à 10 m",
        en: "Height: up to 10 m",
        es: "Altura: hasta 10 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SRS45", "SRS50"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200818/below%2040T%20Reach-084958?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth5519",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH5519 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH5519 TELEHANDLER",
      es: "SANY STH5519 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH5519",
      en: "STH5519",
      es: "STH5519",
    },
    description: {
      fr: "Chariot télescopique compact SANY STH5519, idéal pour les espaces restreints avec une hauteur de levage de 6 m et une capacité de 2,5 tonnes.",
      en: "Compact SANY STH5519 telehandler, ideal for tight spaces with 6 m lifting height and 2.5 T rated capacity.",
      es: "Manipulador telescópico compacto SANY STH5519, ideal para espacios reducidos con altura de elevación de 6 m y capacidad de 2,5 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 6 m",
        en: "Lifting height: 6 m",
        es: "Altura de elevación: 6 m",
      },
      pression: {
        fr: "Capacité nominale: 2,5 T",
        en: "Rated capacity: 2.5 T",
        es: "Capacidad nominal: 2,5 T",
      },
      sortie: {
        fr: "Moteur: DEUTZ TD 3.6 (55 kW)",
        en: "Engine: DEUTZ TD 3.6 (55 kW)",
        es: "Motor: DEUTZ TD 3.6 (55 kW)",
      },
    },
    models: ["STH5519"],
    image: "/images/sany-official/port-machinery/telehandler/sth5519-1646/sth5519-1646__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth742",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH742 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH742 TELEHANDLER",
      es: "SANY STH742 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH742",
      en: "STH742",
      es: "STH742",
    },
    description: {
      fr: "Chariot télescopique SANY STH742 polyvalent avec une capacité nominale de 4,2 tonnes et une hauteur de levage de 7,07 m.",
      en: "Versatile SANY STH742 telehandler with 4.2 T rated capacity and 7.07 m lifting height.",
      es: "Manipulador telescópico SANY STH742 versátil con capacidad nominal de 4,2 toneladas y altura de elevación de 7,07 m.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 7,07 m",
        en: "Lifting height: 7.07 m",
        es: "Altura de elevación: 7,07 m",
      },
      pression: {
        fr: "Capacité nominale: 4,2 T",
        en: "Rated capacity: 4.2 T",
        es: "Capacidad nominal: 4,2 T",
      },
      sortie: {
        fr: "Moteur: DEUTZ TD 3.6L (55 kW)",
        en: "Engine: DEUTZ TD 3.6L (55 kW)",
        es: "Motor: DEUTZ TD 3.6L (55 kW)",
      },
    },
    models: ["STH742"],
    image: "/images/sany-official/port-machinery/telehandler/sth742-1343/sth742-1343__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth634",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH634 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH634 TELEHANDLER",
      es: "SANY STH634 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH634",
      en: "STH634",
      es: "STH634",
    },
    description: {
      fr: "Chariot télescopique SANY STH634 avec hauteur de levage de 10,35 m et capacité nominale de 2,72 tonnes.",
      en: "SANY STH634 telehandler with 10.35 m lifting height and 2.72 T rated capacity.",
      es: "Manipulador telescópico SANY STH634 con altura de elevación de 10,35 m y capacidad nominal de 2,72 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 10,35 m",
        en: "Lifting height: 10.35 m",
        es: "Altura de elevación: 10,35 m",
      },
      pression: {
        fr: "Capacité nominale: 2,72 T",
        en: "Rated capacity: 2.72 T",
        es: "Capacidad nominal: 2,72 T",
      },
      sortie: {
        fr: "Moteur: DEUTZ TD2.9 (55 kW)",
        en: "Engine: DEUTZ TD2.9 (55 kW)",
        es: "Motor: DEUTZ TD2.9 (55 kW)",
      },
    },
    models: ["STH634"],
    image: "/images/sany-official/port-machinery/telehandler/sth634-666/sth634-666__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth844",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH844 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH844 TELEHANDLER",
      es: "SANY STH844 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH844",
      en: "STH844",
      es: "STH844",
    },
    description: {
      fr: "Chariot télescopique SANY STH844 avec moteur DEUTZ Tier 4F, hauteur de levage de 13,4 m et capacité nominale de 3,6 tonnes.",
      en: "SANY STH844 telehandler with DEUTZ Tier 4F engine, 13.4 m lifting height and 3.6 T rated capacity.",
      es: "Manipulador telescópico SANY STH844 con motor DEUTZ Tier 4F, altura de elevación de 13,4 m y capacidad nominal de 3,6 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 13,4 m",
        en: "Lifting height: 13.4 m",
        es: "Altura de elevación: 13,4 m",
      },
      pression: {
        fr: "Capacité nominale: 3,6 T",
        en: "Rated capacity: 3.6 T",
        es: "Capacidad nominal: 3,6 T",
      },
      sortie: {
        fr: "Moteur: DEUTZ TCD3.6 Tier 4F (55 kW)",
        en: "Engine: DEUTZ TCD3.6 Tier 4F (55 kW)",
        es: "Motor: DEUTZ TCD3.6 Tier 4F (55 kW)",
      },
    },
    models: ["STH844"],
    image: "/images/sany-official/port-machinery/telehandler/sth844-1341/sth844-1341__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth844a1",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH844A1 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH844A1 TELEHANDLER",
      es: "SANY STH844A1 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH844A1",
      en: "STH844A1",
      es: "STH844A1",
    },
    description: {
      fr: "Chariot télescopique SANY STH844A1 équipé d'un moteur Cummins QSF3.8 T4, hauteur de levage de 13,4 m et capacité de 3,63 tonnes.",
      en: "SANY STH844A1 telehandler powered by Cummins QSF3.8 T4 engine, 13.4 m lifting height and 3.63 T rated capacity.",
      es: "Manipulador telescópico SANY STH844A1 con motor Cummins QSF3.8 T4, altura de elevación de 13,4 m y capacidad de 3,63 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 13,4 m",
        en: "Lifting height: 13.4 m",
        es: "Altura de elevación: 13,4 m",
      },
      pression: {
        fr: "Capacité nominale: 3,63 T",
        en: "Rated capacity: 3.63 T",
        es: "Capacidad nominal: 3,63 T",
      },
      sortie: {
        fr: "Moteur: Cummins QSF3.8 T4 (55 kW)",
        en: "Engine: Cummins QSF3.8 T4 (55 kW)",
        es: "Motor: Cummins QSF3.8 T4 (55 kW)",
      },
    },
    models: ["STH844A1"],
    image: "/images/sany-official/port-machinery/telehandler/sth844a1-149/sth844a1-149__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth844a2",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH844A2 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH844A2 TELEHANDLER",
      es: "SANY STH844A2 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH844A2",
      en: "STH844A2",
      es: "STH844A2",
    },
    description: {
      fr: "Chariot télescopique SANY STH844A2 avec moteur Cummins QSF3.8 T3, hauteur de levage de 13,4 m et capacité de 3,63 tonnes.",
      en: "SANY STH844A2 telehandler with Cummins QSF3.8 T3 engine, 13.4 m lifting height and 3.63 T rated capacity.",
      es: "Manipulador telescópico SANY STH844A2 con motor Cummins QSF3.8 T3, altura de elevación de 13,4 m y capacidad de 3,63 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 13,4 m",
        en: "Lifting height: 13.4 m",
        es: "Altura de elevación: 13,4 m",
      },
      pression: {
        fr: "Capacité nominale: 3,63 T",
        en: "Rated capacity: 3.63 T",
        es: "Capacidad nominal: 3,63 T",
      },
      sortie: {
        fr: "Moteur: Cummins QSF3.8 T3 (74 kW)",
        en: "Engine: Cummins QSF3.8 T3 (74 kW)",
        es: "Motor: Cummins QSF3.8 T3 (74 kW)",
      },
    },
    models: ["STH844A2"],
    image: "/images/sany-official/port-machinery/telehandler/sth844a2-1340/sth844a2-1340__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth1440",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH1440 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH1440 TELEHANDLER",
      es: "SANY STH1440 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH1440",
      en: "STH1440",
      es: "STH1440",
    },
    description: {
      fr: "Chariot télescopique SANY STH1440 avec moteur DEUTZ TD 3.6L, hauteur de levage de 13,97 m et capacité de 4 tonnes.",
      en: "SANY STH1440 telehandler with DEUTZ TD 3.6L engine, 13.97 m lifting height and 4 T rated capacity.",
      es: "Manipulador telescópico SANY STH1440 con motor DEUTZ TD 3.6L, altura de elevación de 13,97 m y capacidad de 4 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 13,97 m",
        en: "Lifting height: 13.97 m",
        es: "Altura de elevación: 13,97 m",
      },
      pression: {
        fr: "Capacité nominale: 4 T",
        en: "Rated capacity: 4 T",
        es: "Capacidad nominal: 4 T",
      },
      sortie: {
        fr: "Moteur: DEUTZ TD 3.6L (55 kW)",
        en: "Engine: DEUTZ TD 3.6L (55 kW)",
        es: "Motor: DEUTZ TD 3.6L (55 kW)",
      },
    },
    models: ["STH1440"],
    image: "/images/sany-official/port-machinery/telehandler/sth1440-1344/sth1440-1344__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth1056a2",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH1056A2 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH1056A2 TELEHANDLER",
      es: "SANY STH1056A2 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH1056A2",
      en: "STH1056A2",
      es: "STH1056A2",
    },
    description: {
      fr: "Chariot télescopique SANY STH1056A2 avec moteur Cummins QSF3.8 T4F, hauteur de levage de 17,1 m et capacité de 4,54 tonnes.",
      en: "SANY STH1056A2 telehandler with Cummins QSF3.8 T4F engine, 17.1 m lifting height and 4.54 T rated capacity.",
      es: "Manipulador telescópico SANY STH1056A2 con motor Cummins QSF3.8 T4F, altura de elevación de 17,1 m y capacidad de 4,54 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 17,1 m",
        en: "Lifting height: 17.1 m",
        es: "Altura de elevación: 17,1 m",
      },
      pression: {
        fr: "Capacité nominale: 4,54 T",
        en: "Rated capacity: 4.54 T",
        es: "Capacidad nominal: 4,54 T",
      },
      sortie: {
        fr: "Moteur: Cummins QSF3.8 T4F (97 kW)",
        en: "Engine: Cummins QSF3.8 T4F (97 kW)",
        es: "Motor: Cummins QSF3.8 T4F (97 kW)",
      },
    },
    models: ["STH1056A2"],
    image: "/images/sany-official/port-machinery/telehandler/sth1056a2-150/sth1056a2-150__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth1056a5",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH1056A5 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH1056A5 TELEHANDLER",
      es: "SANY STH1056A5 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH1056A5",
      en: "STH1056A5",
      es: "STH1056A5",
    },
    description: {
      fr: "Chariot télescopique SANY STH1056A5 avec moteur Cummins QSF3.8 T3, hauteur de levage de 17,1 m et capacité de 4,54 tonnes.",
      en: "SANY STH1056A5 telehandler with Cummins QSF3.8 T3 engine, 17.1 m lifting height and 4.54 T rated capacity.",
      es: "Manipulador telescópico SANY STH1056A5 con motor Cummins QSF3.8 T3, altura de elevación de 17,1 m y capacidad de 4,54 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 17,1 m",
        en: "Lifting height: 17.1 m",
        es: "Altura de elevación: 17,1 m",
      },
      pression: {
        fr: "Capacité nominale: 4,54 T",
        en: "Rated capacity: 4.54 T",
        es: "Capacidad nominal: 4,54 T",
      },
      sortie: {
        fr: "Moteur: Cummins QSF3.8 T3 (93 kW)",
        en: "Engine: Cummins QSF3.8 T3 (93 kW)",
        es: "Motor: Cummins QSF3.8 T3 (93 kW)",
      },
    },
    models: ["STH1056A5"],
    image: "/images/sany-official/port-machinery/telehandler/sth1056a5-151/sth1056a5-151__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth1256",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH1256 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH1256 TELEHANDLER",
      es: "SANY STH1256 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH1256",
      en: "STH1256",
      es: "STH1256",
    },
    description: {
      fr: "Chariot télescopique SANY STH1256 avec moteur Cummins QSF 3.8 T4F, hauteur de levage de 17,1 m et capacité nominale de 5,44 tonnes.",
      en: "SANY STH1256 telehandler with Cummins QSF 3.8 T4F engine, 17.1 m lifting height and 5.44 T rated capacity.",
      es: "Manipulador telescópico SANY STH1256 con motor Cummins QSF 3.8 T4F, altura de elevación de 17,1 m y capacidad nominal de 5,44 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 17,1 m",
        en: "Lifting height: 17.1 m",
        es: "Altura de elevación: 17,1 m",
      },
      pression: {
        fr: "Capacité nominale: 5,44 T",
        en: "Rated capacity: 5.44 T",
        es: "Capacidad nominal: 5,44 T",
      },
      sortie: {
        fr: "Moteur: Cummins QSF 3.8 T4F (94 kW)",
        en: "Engine: Cummins QSF 3.8 T4F (94 kW)",
        es: "Motor: Cummins QSF 3.8 T4F (94 kW)",
      },
    },
    models: ["STH1256"],
    image: "/images/sany-official/port-machinery/telehandler/sth1256-1647/sth1256-1647__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth1256a1",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH1256A1 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH1256A1 TELEHANDLER",
      es: "SANY STH1256A1 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH1256A1",
      en: "STH1256A1",
      es: "STH1256A1",
    },
    description: {
      fr: "Chariot télescopique SANY STH1256A1 avec moteur Cummins QSF3.8 T4F, hauteur de levage de 17,1 m et capacité nominale de 5,44 tonnes.",
      en: "SANY STH1256A1 telehandler with Cummins QSF3.8 T4F engine, 17.1 m lifting height and 5.44 T rated capacity.",
      es: "Manipulador telescópico SANY STH1256A1 con motor Cummins QSF3.8 T4F, altura de elevación de 17,1 m y capacidad nominal de 5,44 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 17,1 m",
        en: "Lifting height: 17.1 m",
        es: "Altura de elevación: 17,1 m",
      },
      pression: {
        fr: "Capacité nominale: 5,44 T",
        en: "Rated capacity: 5.44 T",
        es: "Capacidad nominal: 5,44 T",
      },
      sortie: {
        fr: "Moteur: Cummins QSF3.8 T4F (97 kW)",
        en: "Engine: Cummins QSF3.8 T4F (97 kW)",
        es: "Motor: Cummins QSF3.8 T4F (97 kW)",
      },
    },
    models: ["STH1256A1"],
    image: "/images/sany-official/port-machinery/telehandler/sth1256a1-152/sth1256a1-152__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth1256a2",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH1256A2 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH1256A2 TELEHANDLER",
      es: "SANY STH1256A2 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH1256A2",
      en: "STH1256A2",
      es: "STH1256A2",
    },
    description: {
      fr: "Chariot télescopique SANY STH1256A2 avec moteur Cummins QSF3.8 T3, hauteur de levage de 17,1 m et capacité nominale de 5,44 tonnes.",
      en: "SANY STH1256A2 telehandler with Cummins QSF3.8 T3 engine, 17.1 m lifting height and 5.44 T rated capacity.",
      es: "Manipulador telescópico SANY STH1256A2 con motor Cummins QSF3.8 T3, altura de elevación de 17,1 m y capacidad nominal de 5,44 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 17,1 m",
        en: "Lifting height: 17.1 m",
        es: "Altura de elevación: 17,1 m",
      },
      pression: {
        fr: "Capacité nominale: 5,44 T",
        en: "Rated capacity: 5.44 T",
        es: "Capacidad nominal: 5,44 T",
      },
      sortie: {
        fr: "Moteur: Cummins QSF3.8 T3 (93 kW)",
        en: "Engine: Cummins QSF3.8 T3 (93 kW)",
        es: "Motor: Cummins QSF3.8 T3 (93 kW)",
      },
    },
    models: ["STH1256A2"],
    image: "/images/sany-official/port-machinery/telehandler/sth1256a2-1328/sth1256a2-1328__img-01.webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-sth1840",
    category: "chariots-telescopiques",
    brand: "SANY",
    title: {
      fr: "SANY STH1840 CHARIOT TÉLESCOPIQUE",
      en: "SANY STH1840 TELEHANDLER",
      es: "SANY STH1840 MANIPULADOR TELESCÓPICO",
    },
    shortTitle: {
      fr: "STH1840",
      en: "STH1840",
      es: "STH1840",
    },
    description: {
      fr: "Chariot télescopique SANY STH1840 avec moteur DEUTZ TD 3.6L, hauteur de levage maximale de 17,55 m et capacité nominale de 4 tonnes.",
      en: "SANY STH1840 telehandler with DEUTZ TD 3.6L engine, max 17.55 m lifting height and 4 T rated capacity.",
      es: "Manipulador telescópico SANY STH1840 con motor DEUTZ TD 3.6L, altura máxima de elevación de 17,55 m y capacidad nominal de 4 toneladas.",
    },
    specs: {
      portee: {
        fr: "Hauteur de levage: 17,55 m",
        en: "Lifting height: 17.55 m",
        es: "Altura de elevación: 17,55 m",
      },
      pression: {
        fr: "Capacité nominale: 4 T",
        en: "Rated capacity: 4 T",
        es: "Capacidad nominal: 4 T",
      },
      sortie: {
        fr: "Moteur: DEUTZ TD 3.6L (55 kW)",
        en: "Engine: DEUTZ TD 3.6L (55 kW)",
        es: "Motor: DEUTZ TD 3.6L (55 kW)",
      },
    },
    models: ["STH1840"],
    image: "/images/sany-official/port-machinery/telehandler/sth1840-1345/sth1840-1345__img-01.webp",
    featured: false,
    available: true,
  },
  // {
  //   id: "fabo-station-concassage-fixe",
  //   category: "concasseurs",
  //   brand: "FABO",
  //   title: {
  //     fr: "FABO STATION DE CONCASSAGE FIXE",
  //     en: "FABO FIXED CRUSHING PLANT",
  //     es: "FABO PLANTA DE TRITURACIÓN FIJA",
  //   },
  //   shortTitle: {
  //     fr: "STATION DE CONCASSAGE FIXE",
  //     en: "FIXED CRUSHING PLANT",
  //     es: "PLANTA DE TRITURACIÓN FIJA",
  //   },
  //   description: {
  //     fr: "Station fixe de concassage et criblage pour la production de granulats",
  //     en: "Fixed crushing and screening plant for aggregate production",
  //     es: "Planta fija de trituración y cribado para producción de áridos",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité: 100 - 500 tonnes/h",
  //       en: "Capacity: 100 - 500 tons/h",
  //       es: "Capacidad: 100 - 500 toneladas/h",
  //     },
  //     pression: {
  //       fr: "Configuration: Multi-étages",
  //       en: "Configuration: Multi-stage",
  //       es: "Configuración: Multi-etapas",
  //     },
  //     sortie: {
  //       fr: "Moteur: Diesel/Électrique",
  //       en: "Engine: Diesel/Electric",
  //       es: "Motor: Diésel/Eléctrico",
  //     },
  //   },
  //   models: ["Station Primaire", "Station Secondaire"],
  //   image:
  //     "https://fabo.com.tr/wp-content/uploads/2021/08/Station-de-Concassage-Fixes.jpg",
  //   featured: false,
  //   available: true,
  // },

  // {
  //   id: "sunward-foreuse-roches",
  //   category: "foreuses",
  //   brand: "SUNWARD",
  //   title: {
  //     fr: "SUNWARD FOREUSE DE ROCHES",
  //     en: "SUNWARD ROCK DRILLING RIG",
  //     es: "SUNWARD PERFORADORA DE ROCAS",
  //   },
  //   shortTitle: {
  //     fr: "FOREUSE DE ROCHES",
  //     en: "ROCK DRILLING RIG",
  //     es: "PERFORADORA DE ROCAS",
  //   },
  //   description: {
  //     fr: "Foreuse de roches pour forage géotechnique et exploitation minière profonde",
  //     en: "Rock drilling rig for geotechnical drilling and deep mining",
  //     es: "Perforadora de rocas para perforación geotécnica y minería profunda",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Profondeur: jusqu'à 1000 m",
  //       en: "Depth: up to 1000 m",
  //       es: "Profundidad: hasta 1000 m",
  //     },
  //     pression: {
  //       fr: "Puissance: 200 - 500 kW",
  //       en: "Power: 200 - 500 kW",
  //       es: "Potencia: 200 - 500 kW",
  //     },
  //     sortie: {
  //       fr: "Moteur: Diesel",
  //       en: "Engine: Diesel",
  //       es: "Motor: Diésel",
  //     },
  //   },
  //   models: ["Rock Drilling Rig"],
  //   image:
  //     "https://www.sunwardmachine.com/upload/product/1747635570685331.jpg.webp",
  //   featured: false,
  //   available: true,
  // },
  {
    id: "sunward-rock-drilling-rig",
    category: "foreuses",
    brand: "SUNWARD",
    title: {
      fr: "SUNWARD FOREUSE DE ROCHES",
      en: "SUNWARD ROCK DRILLING RIG",
      es: "SUNWARD PERFORADORA DE ROCAS",
    },
    shortTitle: {
      fr: "FOREUSE DE ROCHES",
      en: "ROCK DRILLING RIG",
      es: "PERFORADORA DE ROCAS",
    },
    description: {
      fr: "Foreuse de roches pour forage géotechnique et exploitation minière profonde",
      en: "Rock drilling rig for geotechnical drilling and deep mining",
      es: "Perforadora de rocas para perforación geotécnica y minería profunda",
    },
    specs: {
      portee: {
        fr: "Profondeur: jusqu'à 1000 m",
        en: "Depth: up to 1000 m",
        es: "Profundidad: hasta 1000 m",
      },
      pression: {
        fr: "Puissance: 200 - 500 kW",
        en: "Power: 200 - 500 kW",
        es: "Potencia: 200 - 500 kW",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["Rock Drilling Rig"],
    image:
      "https://www.sunwardmachine.com/upload/product/1747635570685331.jpg.webp",
    featured: false,
    available: true,
  },
  // {
  //   id: "e-mak-asphalt-plant",
  //   category: "centrales-enrobage",
  //   brand: "E-MAK",
  //   title: {
  //     fr: "CENTRALE D'ENROBAGE",
  //     en: "ASPHALT PLANT",
  //     es: "PLANTA DE ASFALTO",
  //   },
  //   shortTitle: {
  //     fr: "CENTRALE D'ENROBAGE",
  //     en: "ASPHALT PLANT",
  //     es: "PLANTA DE ASFALTO",
  //   },
  //   description: {
  //     fr: "Centrale d'enrobage pour la production de mélanges bitumineux",
  //     en: "Asphalt plant for bituminous mixture production",
  //     es: "Planta de asfalto para producción de mezclas bituminosas",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité: variable selon modèle",
  //       en: "Capacity: varies by model",
  //       es: "Capacidad: varía según modelo",
  //     },
  //     pression: {
  //       fr: "Type: Fixe ou mobile",
  //       en: "Type: Fixed or mobile",
  //       es: "Tipo: Fija o móvil",
  //     },
  //     sortie: {
  //       fr: "Applications: Routes, autoroutes, parkings",
  //       en: "Applications: Roads, highways, parking lots",
  //       es: "Aplicaciones: Carreteras, autopistas, aparcamientos",
  //     },
  //   },
  //   models: [
  //     "E-Series",
  //     "Express",
  //     "Expert",
  //     "Green Type",
  //     "Super GT",
  //     "Challenger",
  //     "Megaton",
  //   ],
  //   image:
  //     "https://e-mak.com/uploads/content/559/e-serisi-f59e40feca6bd47e41b821c56e2509b8.png",
  //   featured: true,
  //   available: true,
  // },
  {
    id: "e-mak-express",
    category: "centrales-enrobage",
    brand: "E-MAK",
    title: { fr: "EXPRESS", en: "EXPRESS", es: "EXPRESS" },
    shortTitle: { fr: "Express", en: "Express", es: "Express" },
    description: {
      fr: "Centrale d'enrobage mobile E‑MAK Express (80–320 T/H) à montage rapide en 10 jours, conçue pour les chantiers urbains et autoroutiers nécessitant une relocalisation fréquente.",
      en: "E‑MAK Express mobile asphalt plant (80–320 T/H) with fast 10-day assembly, designed for urban and highway projects requiring frequent relocation.",
      es: "Planta de asfalto móvil E‑MAK Express (80–320 T/H) con montaje rápido en 10 días, diseñada para proyectos urbanos y de autopistas que requieren reubicación frecuente.",
    },
    specs: {
      portee: {
        fr: "Capacité: 80–320 T/H",
        en: "Capacity: 80–320 T/H",
        es: "Capacidad: 80–320 T/H",
      },
      pression: {
        fr: "Type: Mobile modulaire",
        en: "Type: Modular mobile",
        es: "Tipo: Modular móvil",
      },
      sortie: {
        fr: "Montage: 10 jours, 11 remorques",
        en: "Assembly: 10 days, 11 trailers",
        es: "Montaje: 10 días, 11 remolques",
      },
    },
    models: ["Express"],
    image:
      "https://e-mak.com/uploads/content/245/express-3-fc511284d6aee43a2f4923a5d7d7add5.jpg",
    featured: false,
    available: true,
  },
  {
    id: "e-mak-expert",
    category: "centrales-enrobage",
    brand: "E-MAK",
    title: { fr: "EXPERT", en: "EXPERT", es: "EXPERT" },
    shortTitle: { fr: "Expert", en: "Expert", es: "Expert" },
    description: {
      fr: "Centrale d'enrobage E‑MAK Expert (240–320 T/H) conçue pour un montage économique et des installations en espace restreint.",
      en: "E‑MAK Expert asphalt plant (240–320 T/H) designed for cost-efficient installation in tight spaces.",
      es: "Planta de asfalto E‑MAK Expert (240–320 T/H) diseñada para montaje económico en espacios reducidos.",
    },
    specs: {
      portee: {
        fr: "Capacité: 240 – 320 T/H",
        en: "Capacity: 240 – 320 T/H",
        es: "Capacidad: 240 – 320 T/H",
      },
      pression: {
        fr: "Unité du malaxeur: complet fermé",
        en: "Mixer unit: fully enclosed",
        es: "Unidad mezcladora: completamente cerrada",
      },
      sortie: {
        fr: "Installation: montage économique en endroit étroit",
        en: "Installation: cost-effective in narrow sites",
        es: "Instalación: económica en espacios estrechos",
      },
    },
    models: ["Expert"],
    image:
      "https://e-mak.com/uploads/content/246/expert-2-6ecda2addf93339c5b15cc9b1f11eff0.jpg",
    featured: true,
    available: true,
  },
  {
    id: "e-mak-green-type",
    category: "centrales-enrobage",
    brand: "E-MAK",
    title: { fr: "GREEN TYPE", en: "GREEN TYPE", es: "GREEN TYPE" },
    shortTitle: { fr: "Green Type", en: "Green Type", es: "Green Type" },
    description: {
      fr: "Centrale d'enrobage E‑MAK Green Type (200–240 T/H) avec stockage grand volume et plateforme de travail intégrée.",
      en: "E‑MAK Green Type asphalt plant (200–240 T/H) with large-volume storage and integrated platform.",
      es: "Planta de asfalto E‑MAK Green Type (200–240 T/H) con almacenamiento de gran volumen y plataforma integrada.",
    },
    specs: {
      portee: {
        fr: "Capacité: 200 – 240 T/H",
        en: "Capacity: 200 – 240 T/H",
        es: "Capacidad: 200 – 240 T/H",
      },
      pression: {
        fr: "Stockage: grand volume",
        en: "Storage: large volume",
        es: "Almacenamiento: gran volumen",
      },
      sortie: {
        fr: "Intégration: prête pour nouvelles technologies",
        en: "Integration: ready for new technologies",
        es: "Integración: lista para nuevas tecnologías",
      },
    },
    models: ["Green Type"],
    image:
      "https://e-mak.com/uploads/content/248/greentype-599ccc6617cc5bd9e3d24fa3175d4870.jpg",
    featured: false,
    available: true,
  },
  {
    id: "e-mak-super-gt",
    category: "centrales-enrobage",
    brand: "E-MAK",
    title: { fr: "SUPER GT", en: "SUPER GT", es: "SUPER GT" },
    shortTitle: { fr: "Super GT", en: "Super GT", es: "Super GT" },
    description: {
      fr: "Centrale d'enrobage E‑MAK Super GT (200–350 T/H) avec silo d’agrégats chauds haute capacité et malaxeur fermé.",
      en: "E‑MAK Super GT asphalt plant (200–350 T/H) with high-capacity hot aggregate silo and enclosed mixer.",
      es: "Planta de asfalto E‑MAK Super GT (200–350 T/H) con silo de áridos calientes de alta capacidad y mezclador cerrado.",
    },
    specs: {
      portee: {
        fr: "Capacité: 200 – 350 T/H",
        en: "Capacity: 200 – 350 T/H",
        es: "Capacidad: 200 – 350 T/H",
      },
      pression: {
        fr: "Silo agrégats chauds: haute capacité",
        en: "Hot aggregate silo: high capacity",
        es: "Silo de áridos calientes: alta capacidad",
      },
      sortie: {
        fr: "Enrobés: stockage possible de 5 types",
        en: "Asphalt mixes: can store 5 types",
        es: "Mezclas: posibilidad de almacenar 5 tipos",
      },
    },
    models: ["Super GT"],
    image:
      "https://e-mak.com/uploads/content/249/super-gt-2-1f2c71c5fc3818e1ad01b7f4ca72d824.jpg",
    featured: false,
    available: true,
  },
  {
    id: "e-mak-megaton",
    category: "centrales-enrobage",
    brand: "E-MAK",
    title: { fr: "MEGATON", en: "MEGATON", es: "MEGATON" },
    shortTitle: { fr: "Megaton", en: "Megaton", es: "Megaton" },
    description: {
      fr: "Solution E‑MAK Megaton pour alimentation simultanée (enrobage, béton, usine à froid) avec grande capacité de stockage.",
      en: "E‑MAK Megaton solution feeding asphalt, concrete and cold plant simultaneously, with large storage capacity.",
      es: "Solución E‑MAK Megaton para alimentar simultáneamente planta de asfalto, hormigón y planta en frío, con gran capacidad de almacenamiento.",
    },
    specs: {
      portee: {
        fr: "Stock: jusqu’à 3000 tonnes",
        en: "Stock: up to 3000 tons",
        es: "Stock: hasta 3000 toneladas",
      },
      pression: {
        fr: "Production: jusqu’à 10 000 tonnes/jour",
        en: "Production: up to 10,000 tons/day",
        es: "Producción: hasta 10.000 toneladas/día",
      },
      sortie: {
        fr: "Usage: enrobage + béton + usine à froid simultanément",
        en: "Use: asphalt + concrete + cold plant simultaneously",
        es: "Uso: asfalto + hormigón + planta en frío simultáneamente",
      },
    },
    models: ["Megaton"],
    image:
      "https://e-mak.com/uploads/content/255/magaton-2-15c35fc882331ba218959e940fc1feb9.jpg",
    featured: false,
    available: true,
  },
  {
    id: "e-mak-challenger",
    category: "centrales-enrobage",
    brand: "E-MAK",
    title: { fr: "CHALLENGER", en: "CHALLENGER", es: "CHALLENGER" },
    shortTitle: { fr: "Challenger", en: "Challenger", es: "Challenger" },
    description: {
      fr: "Centrale E‑MAK Challenger orientée efficacité énergétique, respect de l’environnement et haute qualité d’enrobé/béton.",
      en: "E‑MAK Challenger plant focused on energy savings, environmental compliance, and high asphalt/concrete quality.",
      es: "Planta E‑MAK Challenger orientada al ahorro de energía, respeto del medio ambiente y alta calidad de asfalto/hormigón.",
    },
    specs: {
      portee: {
        fr: "Capacité: 250 - 450 T/H",
        en: "Capacity: 250 - 450 T/H",
        es: "Capacidad: 250 - 450 T/H",
      },
      pression: {
        fr: "Respect de l’environnement",
        en: "Environment-friendly",
        es: "Respeto del medio ambiente",
      },
      sortie: {
        fr: "Qualité: enrobé / béton",
        en: "Quality: asphalt / concrete",
        es: "Calidad: asfalto / hormigón",
      },
    },
    models: ["Challenger"],
    image:
      "https://e-mak.com/uploads/content/257/challenger-1-e3afdd0643c3f9c1ae90beaefdd8c3bf.jpg",
    featured: false,
    available: true,
  },
  // {
  //   id: "mak-challenger",
  //   category: "centrales-enrobage",
  //   brand: "E-MAK",
  //   title: {
  //     fr: "E-MAK CHALLENGER",
  //     en: "E-MAK CHALLENGER",
  //     es: "E-MAK CHALLENGER",
  //   },
  //   shortTitle: {
  //     fr: "CHALLENGER",
  //     en: "CHALLENGER",
  //     es: "CHALLENGER",
  //   },
  //   description: {
  //     fr: "Centrale d'enrobage haute performance de la série CHALLENGER pour la production d'asphalte durable.",
  //     en: "High-performance asphalt plant from the CHALLENGER series for sustainable asphalt production.",
  //     es: "Planta de asfalto de alto rendimiento de la serie CHALLENGER para la producción sostenible de asfalto.",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité: 160 - 400 t/h",
  //       en: "Capacity: 160 - 400 t/h",
  //       es: "Capacidad: 160 - 400 t/h",
  //     },
  //     pression: {
  //       fr: "Type: Stationnaire",
  //       en: "Type: Stationary",
  //       es: "Tipo: Fija",
  //     },
  //     sortie: {
  //       fr: "Technologie: Basse émission",
  //       en: "Technology: Low emission",
  //       es: "Tecnología: Baja emisión",
  //     },
  //   },
  //   models: ["CHALLENGER 160", "CHALLENGER 240", "CHALLENGER 320", "CHALLENGER 400"],
  //   image: "https://e-mak.com/uploads/content/257/challenger-1-e3afdd0643c3f9c1ae90beaefdd8c3bf.jpg",
  //   featured: true,
  //   available: true,
  // },
  {
    id: "teksan-diesel-generator",
    category: "groupes-electrogenes",
    brand: "TEKSAN",
    title: {
      fr: "TEKSAN GROUPE ÉLECTROGÈNE DIESEL",
      en: "TEKSAN DIESEL GENERATOR",
      es: "TEKSAN GRUPO ELECTRÓGENO DIÉSEL",
    },
    shortTitle: {
      fr: "GROUPE ÉLECTROGÈNE DIESEL",
      en: "DIESEL GENERATOR",
      es: "GRUPO ELECTRÓGENO DIÉSEL",
    },
    description: {
      fr: "Gamme complète de groupes électrogènes diesel TEKSAN, offrant fiabilité et performance pour toutes vos applications industrielles et de secours. Équipés de moteurs de renommée mondiale (Perkins, Baudouin).",
      en: "Complete range of TEKSAN diesel generators, offering reliability and performance for all your industrial and backup applications. Equipped with world-renowned engines (Perkins, Baudouin).",
      es: "Gama completa de grupos electrógenos diésel TEKSAN, que ofrecen fiabilidad y rendimiento para todas sus aplicaciones industriales y de respaldo. Equipados con motores de renombre mundial (Perkins, Baudouin).",
    },
    specs: {
      portee: {
        fr: "Puissance: 8 - 4500 kVA",
        en: "Power: 8 - 4500 kVA",
        es: "Potencia: 8 - 4500 kVA",
      },
      pression: {
        fr: "Voltage: 230V - 480V",
        en: "Voltage: 230V - 480V",
        es: "Voltaje: 230V - 480V",
      },
      sortie: {
        fr: "Moteurs: Perkins, Baudouin",
        en: "Engines: Perkins, Baudouin",
        es: "Motores: Perkins, Baudouin",
      },
    },
    models: teksanGensetModels,
    image: "https://cdn.teksan.com/DataPict/Large/TJ10PE5L-3545-1.jpg",
    featured: true,
    available: true,
  },
  {
    id: "teksan-tours-eclairage",
    category: "eclairage",
    brand: "TEKSAN",
    title: {
      fr: "TEKSAN TOURS D'ÉCLAIRAGE",
      en: "TEKSAN LIGHTING TOWERS",
      es: "TEKSAN TORRES DE ILUMINACIÓN",
    },
    shortTitle: {
      fr: "TOURS D'ÉCLAIRAGE",
      en: "LIGHTING TOWERS",
      es: "TORRES DE ILUMINACIÓN",
    },
    description: {
      fr: "Tours d’éclairage TEKSAN pour chantiers et sites isolés : solutions robustes, mobiles et performantes.",
      en: "TEKSAN lighting towers for worksites and remote areas: robust, mobile, high-performance solutions.",
      es: "Torres de iluminación TEKSAN para obras y sitios aislados: soluciones robustas, móviles y de alto rendimiento.",
    },
    specs: {
      portee: {
        fr: "Puissance: 5 kVA",
        en: "Power: 5 kVA",
        es: "Potencia: 5 kVA",
      },
      pression: {
        fr: "Voltage: 230V - 480V",
        en: "Voltage: 230V - 480V",
        es: "Voltaje: 230V - 480V",
      },
      sortie: {
        fr: "Moteur: Mitsubishi",
        en: "Engine: Mitsubishi",
        es: "Motor: Mitsubishi",
      },
    },
    models: teksanLightingTowerModels,
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1774960121/aydinlatma-kulesi-1-d6-02.jpg_aamgv5.jpg",
    featured: true,
    available: true,
  },
  // {
  //   id: "ajax-self-loading-mixer",
  //   category: "malaxeurs",
  //   brand: "AJAX",
  //   title: {
  //     fr: "AJAX MALAXEUR AUTOCHARGEANT",
  //     en: "AJAX SELF-LOADING CONCRETE MIXER",
  //     es: "AJAX MEZCLADOR AUTOCARGANTE",
  //   },
  //   shortTitle: {
  //     fr: "MALAXEUR AUTOCHARGEANT",
  //     en: "SELF-LOADING MIXER",
  //     es: "MEZCLADOR AUTOCARGANTE",
  //   },
  //   description: {
  //     fr: "Malaxeur autochargeant compact pour mélange de béton avec efficacité maximale",
  //     en: "Compact self-loading mixer for concrete mixing with maximum efficiency",
  //     es: "Mezclador autocargante compacto para mezcla de hormigón con máxima eficiencia",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité: 1 - 4.8 m³",
  //       en: "Capacity: 1 - 4.8 m³",
  //       es: "Capacidad: 1 - 4.8 m³",
  //     },
  //     pression: {
  //       fr: "Chargement: Automatique",
  //       en: "Loading: Automatic",
  //       es: "Carga: Automática",
  //     },
  //     sortie: {
  //       fr: "Moteur: Diesel",
  //       en: "Engine: Diesel",
  //       es: "Motor: Diésel",
  //     },
  //   },
  //   models: ["SPX1024", "ARGO 2000DM", "ARGO 2300", "ARGO 2800", "ARGO 4800"],
  //   image:
  //     "https://cdn.prod.website-files.com/65006e6ed741800ddeb94c08/655475e5fd4185156a1a49a8_SPX1024.webp",
  //   featured: true,
  //   available: true,
  // },
  {
    id: "toyota-traigo80-4roues-15-35t",
    category: "chariots-elevateurs",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA CHARIOT ÉLÉVATEUR ÉLECTRIQUE 4 ROUES 1.5-3.5T",
      en: "TOYOTA 4-WHEEL ELECTRIC FORKLIFT 1.5-3.5T",
      es: "TOYOTA CARRETILLA ELEVADORA ELÉCTRICA 4 RUEDAS 1.5-3.5T",
    },
    shortTitle: {
      fr: "CHARIOT ÉLÉVATEUR ÉLECTRIQUE 4 ROUES 1.5-3.5T",
      en: "4-WHEEL ELECTRIC FORKLIFT 1.5-3.5T",
      es: "CARRETILLA ELEVADORA ELÉCTRICA 4 RUEDAS 1.5-3.5T",
    },
    description: {
      fr: "Chariot élévateur électrique 4 roues pour applications en entrepôt",
      en: "4-wheel electric forklift for warehouse applications",
      es: "Carretilla elevadora eléctrica de 4 ruedas para aplicaciones en almacén",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1.5 t à 3.5 t",
        en: "Load capacity: 1.5 t to 3.5 t",
        es: "Capacidad de carga: 1.5 t a 3.5 t",
      },
      pression: {
        fr: "Hauteurs de levage: jusqu'à 6 m",
        en: "Lift heights: up to 6 m",
        es: "Alturas de elevación: hasta 6 m",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["Traigo80"],
    image:
      "https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/9fbm35t_1.jpg?preset=Small&autorotate=true",
    featured: true,
    available: true,
  },
  // https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/9fbm35t_1.jpg?preset=Small&autorotate=true
  {
    id: "toyota-traigo80-4roues-4-8t",
    category: "chariots-elevateurs",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA CHARIOT ÉLÉVATEUR ÉLECTRIQUE 4 ROUES GROS TONNAGE 4-8T",
      en: "TOYOTA 4-WHEEL HEAVY DUTY ELECTRIC FORKLIFT 4-8T",
      es: "TOYOTA CARRETILLA ELEVADORA ELÉCTRICA 4 RUEDAS GRAN TONELAJE 4-8T",
    },
    shortTitle: {
      fr: "CHARIOT ÉLÉVATEUR ÉLECTRIQUE 4 ROUES GROS TONNAGE 4-8T",
      en: "4-WHEEL HEAVY DUTY ELECTRIC FORKLIFT 4-8T",
      es: "CARRETILLA ELEVADORA ELÉCTRICA 4 RUEDAS GRAN TONELAJE 4-8T",
    },
    description: {
      fr: "Chariot élévateur électrique 4 roues gros tonnage pour applications industrielles lourdes",
      en: "4-wheel heavy duty electric forklift for heavy industrial applications",
      es: "Carretilla elevadora eléctrica de 4 ruedas de gran tonelaje para aplicaciones industriales pesadas",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 4 t à 8 t",
        en: "Load capacity: 4 t to 8 t",
        es: "Capacidad de carga: 4 t a 8 t",
      },
      pression: {
        fr: "Hauteurs de levage: jusqu'à 7 m",
        en: "Lift heights: up to 7 m",
        es: "Alturas de elevación: hasta 7 m",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["Traigo 80"],
    image:
      "https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/8fbmht60-main.jpg?autorotate=true&format=webp&preset=Small",
    featured: true,
    available: true,
  },
  {
    id: "toyota-chariot-electrique-3roues-1-2t",
    category: "chariots-elevateurs",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA CHARIOT ÉLÉVATEUR ÉLECTRIQUE 3 ROUES 1-2T",
      en: "TOYOTA 3-WHEEL ELECTRIC FORKLIFT 1-2T",
      es: "TOYOTA CARRETILLA ELEVADORA ELÉCTRICA 3 RUEDAS 1-2T",
    },
    shortTitle: {
      fr: "CHARIOT ÉLÉVATEUR ÉLECTRIQUE 3 ROUES 1-2T",
      en: "3-WHEEL ELECTRIC FORKLIFT 1-2T",
      es: "CARRETILLA ELEVADORA ELÉCTRICA 3 RUEDAS 1-2T",
    },
    description: {
      fr: "Chariot élévateur électrique 3 roues compact et maniable pour espaces restreints",
      en: "Compact and maneuverable 3-wheel electric forklift for confined spaces",
      es: "Carretilla elevadora eléctrica de 3 ruedas compacta y maniobrable para espacios reducidos",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1 t à 2 t",
        en: "Load capacity: 1 t to 2 t",
        es: "Capacidad de carga: 1 t a 2 t",
      },
      pression: {
        fr: "Hauteurs de levage: jusqu'à 6 m",
        en: "Lift heights: up to 6 m",
        es: "Alturas de elevación: hasta 6 m",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["3-Wheel Electric"],
    image:
      "https://www.toyotamaterialhandling.com.au/media/567927/toyota-10_20-tonne-8fbe-3_wheel-battery-forklift.png?width=800&height=800",
    featured: true,
    available: true,
  },
  {
    id: "toyota-chariot-diesel-petit-tonnage-1-35t",
    category: "chariots-elevateurs",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA CHARIOT ÉLÉVATEUR DIESEL PETIT TONNAGE 1-3.5T",
      en: "TOYOTA SMALL TONNAGE DIESEL FORKLIFT 1-3.5T",
      es: "TOYOTA CARRETILLA ELEVADORA DIÉSEL PEQUEÑO TONELAJE 1-3.5T",
    },
    shortTitle: {
      fr: "CHARIOT ÉLÉVATEUR DIESEL PETIT TONNAGE 1-3.5T",
      en: "SMALL TONNAGE DIESEL FORKLIFT 1-3.5T",
      es: "CARRETILLA ELEVADORA DIÉSEL PEQUEÑO TONELAJE 1-3.5T",
    },
    description: {
      fr: "Chariot élévateur diesel petit tonnage pour applications extérieures",
      en: "Small tonnage diesel forklift for outdoor applications",
      es: "Carretilla elevadora diésel de pequeño tonelaje para aplicaciones exteriores",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1 t à 3.5 t",
        en: "Load capacity: 1 t to 3.5 t",
        es: "Capacidad de carga: 1 t a 3.5 t",
      },
      pression: {
        fr: "Hauteurs de levage: jusqu'à 7 m",
        en: "Lift heights: up to 7 m",
        es: "Alturas de elevación: hasta 7 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["Diesel Forklift"],
    image:
      "https://www.toyotamaterialhandling.com.au/media/567869/toyota-10_35-tonne-8_series-4_wheel-forklift.png?width=800&height=800",
    featured: true,
    available: true,
  },
  {
    id: "toyota-chariot-diesel-gros-tonnage-4-10t",
    category: "chariots-elevateurs",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA CHARIOT ÉLÉVATEUR DIESEL GROS TONNAGE 4-10T",
      en: "TOYOTA HEAVY DUTY DIESEL FORKLIFT 4-10T",
      es: "TOYOTA CARRETILLA ELEVADORA DIÉSEL GRAN TONELAJE 4-10T",
    },
    shortTitle: {
      fr: "CHARIOT ÉLÉVATEUR DIESEL GROS TONNAGE 4-10T",
      en: "HEAVY DUTY DIESEL FORKLIFT 4-10T",
      es: "CARRETILLA ELEVADORA DIÉSEL GRAN TONELAJE 4-10T",
    },
    description: {
      fr: "Chariot élévateur diesel gros tonnage pour applications industrielles lourdes",
      en: "Heavy duty diesel forklift for heavy industrial applications",
      es: "Carretilla elevadora diésel de gran tonelaje para aplicaciones industriales pesadas",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 4 t à 10 t",
        en: "Load capacity: 4 t to 10 t",
        es: "Capacidad de carga: 4 t a 10 t",
      },
      pression: {
        fr: "Hauteurs de levage: jusqu'à 7 m",
        en: "Lift heights: up to 7 m",
        es: "Alturas de elevación: hasta 7 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["Heavy Duty Diesel"],
    image:
      "https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/8fd70n-side.jpg?autorotate=true&format=webp&preset=Small",
    featured: true,
    available: true,
  },
  {
    id: "toyota-logiciel-automatisation",
    category: "solutions-automatisees",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA LOGICIEL D'AUTOMATISATION",
      en: "TOYOTA AUTOMATION SOFTWARE",
      es: "TOYOTA SOFTWARE DE AUTOMATIZACIÓN",
    },
    shortTitle: {
      fr: "LOGICIEL D'AUTOMATISATION",
      en: "AUTOMATION SOFTWARE",
      es: "SOFTWARE DE AUTOMATIZACIÓN",
    },
    description: {
      fr: "Le logiciel d'automatisation intelligent de Toyota gère les flux de commandes et le trafic des chariots AGV Toyota.",
      en: "Toyota's intelligent automation software manages order flows and the traffic of Toyota AGV trucks.",
      es: "El software de automatización inteligente de Toyota gestiona los flujos de pedidos y el tráfico de las carretillas AGV Toyota.",
    },
    specs: {
      portee: {
        fr: "Gestion: Flux de commandes",
        en: "Management: Order flows",
        es: "Gestión: Flujos de pedidos",
      },
      pression: {
        fr: "Trafic: Chariots AGV Toyota",
        en: "Traffic: Toyota AGV trucks",
        es: "Tráfico: Carretillas AGV Toyota",
      },
      sortie: {
        fr: "Type: Logiciel intelligent",
        en: "Type: Intelligent software",
        es: "Tipo: Software inteligente",
      },
    },
    models: ["Toyota Automation Software"],
    image:
      "https://tmhe-media.azureedge.net/published/13872_768x400_toyota%20mh.jpg",
    featured: true,
    available: true,
  },
  {
    id: "toyota-gestion-projets-automatisation",
    category: "solutions-automatisees",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA GESTION DE PROJETS D'AUTOMATISATION",
      en: "TOYOTA AUTOMATION PROJECT MANAGEMENT",
      es: "TOYOTA GESTIÓN DE PROYECTOS DE AUTOMATIZACIÓN",
    },
    shortTitle: {
      fr: "GESTION DE PROJETS D'AUTOMATISATION",
      en: "AUTOMATION PROJECT MANAGEMENT",
      es: "GESTIÓN DE PROYECTOS DE AUTOMATIZACIÓN",
    },
    description: {
      fr: "Notre équipe d'experts en automatisation vous accompagne avec des stratégies, des idées et des solutions pour automatiser vos opérations.",
      en: "Our team of automation experts supports you with strategies, ideas and solutions to automate your operations.",
      es: "Nuestro equipo de expertos en automatización le acompaña con estrategias, ideas y soluciones para automatizar sus operaciones.",
    },
    specs: {
      portee: {
        fr: "Accompagnement: Équipe d'experts en automatisation",
        en: "Support: Team of automation experts",
        es: "Acompañamiento: Equipo de expertos en automatización",
      },
      pression: {
        fr: "Approche: Stratégies, idées et solutions",
        en: "Approach: Strategies, ideas and solutions",
        es: "Enfoque: Estrategias, ideas y soluciones",
      },
      sortie: {
        fr: "Objectif: Automatisation des opérations",
        en: "Goal: Operations automation",
        es: "Objetivo: Automatización de operaciones",
      },
    },
    models: ["Toyota Automation Project Management"],
    image:
      "https://tmhe-media.azureedge.net/published/22456_768x400_toyota%20mh.jpg",
    featured: true,
    available: true,
  },
  {
    id: "toyota-navettes-semi-automatisees",
    category: "solutions-automatisees",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA NAVETTES SEMI-AUTOMATISÉES",
      en: "TOYOTA SEMI-AUTOMATED SHUTTLES",
      es: "TOYOTA LANZADERAS SEMI-AUTOMÁTICAS",
    },
    shortTitle: {
      fr: "NAVETTES SEMI-AUTOMATISÉES",
      en: "SEMI-AUTOMATED SHUTTLES",
      es: "LANZADERAS SEMI-AUTOMÁTICAS",
    },
    description: {
      fr: "Système de stockage en profondeur, haute densité avec utilisation de 80 % de l'espace.",
      en: "Deep storage system, high density with 80% space utilization.",
      es: "Sistema de almacenamiento en profundidad, alta densidad con utilización del 80% del espacio.",
    },
    specs: {
      portee: {
        fr: "Densité: 80 % d'utilisation de l'espace",
        en: "Density: 80% space utilization",
        es: "Densidad: 80% utilización del espacio",
      },
      pression: {
        fr: "Stockage: Haute densité en profondeur",
        en: "Storage: High density deep storage",
        es: "Almacenamiento: Alta densidad en profundidad",
      },
      sortie: {
        fr: "Type: Système semi-automatisé",
        en: "Type: Semi-automated system",
        es: "Tipo: Sistema semi-automatizado",
      },
    },
    models: ["Semi-Auto Shuttle Toyota"],
    image:
      "https://tmhe-media.azureedge.net/published/13998_768x400_toyota%20mh.jpg",
    featured: true,
    available: true,
  },
  {
    id: "toyota-chariot-contrepoids-automatise",
    category: "solutions-automatisees",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA CHARIOT ÉLÉVATEUR À CONTREPOIDS AUTOMATISÉ",
      en: "TOYOTA AUTOMATED COUNTERBALANCE FORKLIFT",
      es: "TOYOTA CARRETILLA ELEVADORA CONTRAPESADA AUTOMATIZADA",
    },
    shortTitle: {
      fr: "CHARIOT ÉLÉVATEUR À CONTREPOIDS AUTOMATISÉ",
      en: "AUTOMATED COUNTERBALANCE FORKLIFT",
      es: "CARRETILLA ELEVADORA CONTRAPESADA AUTOMATIZADA",
    },
    description: {
      fr: "Ce chariot AGV polyvalent et adaptable est conçu pour répondre à de multiples besoins dans les différents flux opérationnels de votre entrepôt. Il peut prendre en charge tous les types de palettes, qu'elles soient de type Euro ou à fond fixe.",
      en: "This versatile and adaptable AGV truck is designed to meet multiple needs in the different operational flows of your warehouse. It can handle all types of pallets, whether Euro or fixed-bottom.",
      es: "Esta carretilla AGV versátil y adaptable está diseñada para satisfacer múltiples necesidades en los diferentes flujos operativos de su almacén. Puede manejar todo tipo de paletas, ya sean Euro o de fondo fijo.",
    },
    specs: {
      portee: {
        fr: "Application: Flux opérationnels d'entrepôt",
        en: "Application: Warehouse operational flows",
        es: "Aplicación: Flujos operativos de almacén",
      },
      pression: {
        fr: "Palettes: Euro et à fond fixe",
        en: "Pallets: Euro and fixed-bottom",
        es: "Paletas: Euro y de fondo fijo",
      },
      sortie: {
        fr: "Type: AGV polyvalent et adaptable",
        en: "Type: Versatile and adaptable AGV",
        es: "Tipo: AGV versátil y adaptable",
      },
    },
    models: ["Autopilot Toyota Counterbalance"],
    image:
      "https://tmhe-media.azureedge.net/published/44130_768x400_toyota%20mh.jpg",
    featured: true,
    available: false,
  },
  {
    id: "toyota-transpalettes-gerbeurs-mat-retractable-automatises",
    category: "solutions-automatisees",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA TRANSPALETTES, GERBEURS ET CHARIOTS À MÂT RÉTRACTABLE AUTOMATISÉS",
      en: "TOYOTA AUTOMATED PALLET TRUCKS, STACKERS AND REACH TRUCKS",
      es: "TOYOTA TRANSPALETAS, APILADORES Y CARRETILLAS RETRÁCTILES AUTOMATIZADAS",
    },
    shortTitle: {
      fr: "TRANSPALETTES, GERBEURS ET CHARIOTS À MÂT RÉTRACTABLE AUTOMATISÉS",
      en: "AUTOMATED PALLET TRUCKS, STACKERS AND REACH TRUCKS",
      es: "TRANSPALETAS, APILADORES Y CARRETILLAS RETRÁCTILES AUTOMATIZADAS",
    },
    description: {
      fr: "Conçus pour automatiser les opérations répétitives de manutention de palettes, ces chariots AGV permettent le transport automatisé de palettes, l'empilage en bloc, la gestion de palettes mixtes et le stockage en grande hauteur.",
      en: "Designed to automate repetitive pallet handling operations, these AGV trucks enable automated pallet transport, block stacking, mixed pallet management and high-level storage.",
      es: "Diseñadas para automatizar las operaciones repetitivas de manipulación de paletas, estas carretillas AGV permiten el transporte automatizado de paletas, el apilado en bloque, la gestión de paletas mixtas y el almacenamiento a gran altura.",
    },
    specs: {
      portee: {
        fr: "Opérations: Transport, empilage, stockage en grande hauteur",
        en: "Operations: Transport, stacking, high-level storage",
        es: "Operaciones: Transporte, apilado, almacenamiento a gran altura",
      },
      pression: {
        fr: "Palettes: Simples et mixtes",
        en: "Pallets: Single and mixed",
        es: "Paletas: Simples y mixtas",
      },
      sortie: {
        fr: "Type: AGV pour manutention répétitive",
        en: "Type: AGV for repetitive handling",
        es: "Tipo: AGV para manipulación repetitiva",
      },
    },
    models: ["Autopilot Toyota AGV"],
    image:
      "https://tmhe-media.azureedge.net/published/13632_768x400_toyota%20mh.jpg",
    featured: true,
    available: true,
  },
  {
    id: "toyota-tracteur-remorquage-automatise",
    category: "solutions-automatisees",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA TRACTEUR DE REMORQUAGE AUTOMATISÉ",
      en: "TOYOTA AUTOMATED TOW TRACTOR",
      es: "TOYOTA TRACTOR DE REMOLQUE AUTOMATIZADO",
    },
    shortTitle: {
      fr: "TRACTEUR DE REMORQUAGE AUTOMATISÉ",
      en: "AUTOMATED TOW TRACTOR",
      es: "TRACTOR DE REMOLQUE AUTOMATIZADO",
    },
    description: {
      fr: "Manutention automatisée de palettes et d'articles sans fourches, idéale pour les livraisons en flux tendu et les tournées de livraison.",
      en: "Automated handling of pallets and items without forks, ideal for just-in-time deliveries and delivery rounds.",
      es: "Manipulación automatizada de paletas y artículos sin horquillas, ideal para entregas justo a tiempo y rondas de entrega.",
    },
    specs: {
      portee: {
        fr: "Application: Livraisons en flux tendu et tournées",
        en: "Application: Just-in-time deliveries and delivery rounds",
        es: "Aplicación: Entregas justo a tiempo y rondas",
      },
      pression: {
        fr: "Type: Sans fourches (palettes et articles)",
        en: "Type: Forkless (pallets and items)",
        es: "Tipo: Sin horquillas (paletas y artículos)",
      },
      sortie: {
        fr: "Mode: Automatisé",
        en: "Mode: Automated",
        es: "Modo: Automatizado",
      },
    },
    models: ["Autopilot Toyota Tow Tractor"],
    image:
      "https://tmhe-media.azureedge.net/published/13651_768x400_toyota%20mh.jpg",
    featured: true,
    available: true,
  },
  {
    id: "toyota-transporteur-horizontal-automatise",
    category: "solutions-automatisees",
    brand: "TOYOTA",
    title: {
      fr: "TOYOTA TRANSPORTEUR HORIZONTAL AUTOMATISÉ",
      en: "TOYOTA AUTOMATED HORIZONTAL TRANSPORTER",
      es: "TOYOTA TRANSPORTADOR HORIZONTAL AUTOMATIZADO",
    },
    shortTitle: {
      fr: "TRANSPORTEUR HORIZONTAL AUTOMATISÉ",
      en: "AUTOMATED HORIZONTAL TRANSPORTER",
      es: "TRANSPORTADOR HORIZONTAL AUTOMATIZADO",
    },
    description: {
      fr: "Transporteur automatisé de palettes individuelles sans fourches, idéal pour le transport d'un point A à un point B.",
      en: "Automated transporter of individual pallets without forks, ideal for transport from point A to point B.",
      es: "Transportador automatizado de paletas individuales sin horquillas, ideal para el transporte de un punto A a un punto B.",
    },
    specs: {
      portee: {
        fr: "Transport: Point A à Point B",
        en: "Transport: Point A to Point B",
        es: "Transporte: Punto A a Punto B",
      },
      pression: {
        fr: "Type: Sans fourches (palettes individuelles)",
        en: "Type: Forkless (individual pallets)",
        es: "Tipo: Sin horquillas (paletas individuales)",
      },
      sortie: {
        fr: "Mode: Automatisé",
        en: "Mode: Automated",
        es: "Modo: Automatizado",
      },
    },
    models: ["Autopilot Toyota Horizontal"],
    image:
      "https://tmhe-media.azureedge.net/published/27435_768x400_toyota%20mh.jpg",
    featured: true,
    available: false,
  },
  // {
  //   id: "toyota-transpalette-electrique-accompagnant",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA TRANSPALETTE ÉLECTRIQUE À CONDUCTEUR ACCOMPAGNANT",
  //     en: "TOYOTA PEDESTRIAN ELECTRIC PALLET TRUCK",
  //     es: "TOYOTA TRANSPALETA ELÉCTRICA CON CONDUCTOR A PIE",
  //   },
  //   shortTitle: {
  //     fr: "TRANSPALETTE ÉLECTRIQUE À CONDUCTEUR ACCOMPAGNANT",
  //     en: "PEDESTRIAN ELECTRIC PALLET TRUCK",
  //     es: "TRANSPALETA ELÉCTRICA CON CONDUCTOR A PIE",
  //   },
  //   description: {
  //     fr: "Transpalette électrique à conducteur accompagnant pour courtes distances de transport",
  //     en: "Pedestrian electric pallet truck for short transport distances",
  //     es: "Transpaleta eléctrica con conductor a pie para distancias cortas de transporte",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 1.3 à 2.5 t",
  //       en: "Load capacity: 1.3 to 2.5 t",
  //       es: "Capacidad de carga: 1.3 a 2.5 t",
  //     },
  //     pression: {
  //       fr: "Pour les courtes distances de transport",
  //       en: "For short transport distances",
  //       es: "Para distancias cortas de transporte",
  //     },
  //     sortie: {
  //       fr: "Moteur: Électrique",
  //       en: "Engine: Electric",
  //       es: "Motor: Eléctrico",
  //     },
  //   },
  //   models: ["Pallet Truck"],
  //   image:
  //     "https://tmhe-media.azureedge.net/published/2055_768x400_toyota%20mh.jpg",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-transpalette-electrique-autoporte",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA TRANSPALETTE ÉLECTRIQUE AUTOPORTÉ",
  //     en: "TOYOTA RIDER ELECTRIC PALLET TRUCK",
  //     es: "TOYOTA TRANSPALETA ELÉCTRICA AUTOPROPULSADA",
  //   },
  //   shortTitle: {
  //     fr: "TRANSPALETTE ÉLECTRIQUE AUTOPORTÉ",
  //     en: "RIDER ELECTRIC PALLET TRUCK",
  //     es: "TRANSPALETA ELÉCTRICA AUTOPROPULSADA",
  //   },
  //   description: {
  //     fr: "Transpalette électrique autoporté idéal pour les longues distances de transport",
  //     en: "Rider electric pallet truck ideal for long transport distances",
  //     es: "Transpaleta eléctrica autopropulsada ideal para largas distancias de transporte",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 2.0 à 2.5 t",
  //       en: "Load capacity: 2.0 to 2.5 t",
  //       es: "Capacidad de carga: 2.0 a 2.5 t",
  //     },
  //     pression: {
  //       fr: "Plateforme rabattable et barrières pliables",
  //       en: "Foldable platform and collapsible barriers",
  //       es: "Plataforma plegable y barreras plegables",
  //     },
  //     sortie: {
  //       fr: "Moteur: Électrique",
  //       en: "Engine: Electric",
  //       es: "Motor: Eléctrico",
  //     },
  //   },
  //   models: ["Rider Pallet Truck"],
  //   image:
  //     "https://tmhe-media.azureedge.net/published/2055_768x400_toyota%20mh.jpg",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-gerbeur-electrique-accompagnant",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA GERBEUR ÉLECTRIQUE À CONDUCTEUR ACCOMPAGNANT",
  //     en: "TOYOTA PEDESTRIAN ELECTRIC STACKER",
  //     es: "TOYOTA APILADOR ELÉCTRICO CON CONDUCTOR A PIE",
  //   },
  //   shortTitle: {
  //     fr: "GERBEUR ÉLECTRIQUE À CONDUCTEUR ACCOMPAGNANT",
  //     en: "PEDESTRIAN ELECTRIC STACKER",
  //     es: "APILADOR ELÉCTRICO CON CONDUCTOR A PIE",
  //   },
  //   description: {
  //     fr: "Gerbeur électrique à conducteur accompagnant pour distances courtes",
  //     en: "Pedestrian electric stacker for short distances",
  //     es: "Apilador eléctrico con conductor a pie para distancias cortas",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 0.8 à 2.0 t",
  //       en: "Load capacity: 0.8 to 2.0 t",
  //       es: "Capacidad de carga: 0.8 a 2.0 t",
  //     },
  //     pression: {
  //       fr: "Hauteurs de levage: jusqu'à 6 m",
  //       en: "Lift heights: up to 6 m",
  //       es: "Alturas de elevación: hasta 6 m",
  //     },
  //     sortie: {
  //       fr: "Moteur: Électrique",
  //       en: "Engine: Electric",
  //       es: "Motor: Eléctrico",
  //     },
  //   },
  //   models: ["Stacker"],
  //   image:
  //     "https://tmhe-media.azureedge.net/published/13632_768x400_toyota%20mh.jpg",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-gerbeur-electrique-autoporte",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA GERBEUR ÉLECTRIQUE AUTOPORTÉ",
  //     en: "TOYOTA RIDER ELECTRIC STACKER",
  //     es: "TOYOTA APILADOR ELÉCTRICO AUTOPROPULSADO",
  //   },
  //   shortTitle: {
  //     fr: "GERBEUR ÉLECTRIQUE AUTOPORTÉ",
  //     en: "RIDER ELECTRIC STACKER",
  //     es: "APILADOR ELÉCTRICO AUTOPROPULSADO",
  //   },
  //   description: {
  //     fr: "Gerbeur électrique autoporté pour transport rapide sur longues distances",
  //     en: "Rider electric stacker for fast transport over long distances",
  //     es: "Apilador eléctrico autopropulsado para transporte rápido en largas distancias",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 1.2 à 2.0 t",
  //       en: "Load capacity: 1.2 to 2.0 t",
  //       es: "Capacidad de carga: 1.2 a 2.0 t",
  //     },
  //     pression: {
  //       fr: "Hauteurs de levage: jusqu'à 6 m",
  //       en: "Lift heights: up to 6 m",
  //       es: "Alturas de elevación: hasta 6 m",
  //     },
  //     sortie: {
  //       fr: "Plateforme rabattable et barrières pliables",
  //       en: "Foldable platform and collapsible barriers",
  //       es: "Plataforma plegable y barreras plegables",
  //     },
  //   },
  //   models: ["Rider Stacker"],
  //   image:
  //     "https://tmhe-media.azureedge.net/published/13632_768x400_toyota%20mh.jpg",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-preparateur-commande-sol",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA PRÉPARATEUR DE COMMANDE AU SOL",
  //     en: "TOYOTA LOW-LEVEL ORDER PICKER",
  //     es: "TOYOTA PREPARADOR DE PEDIDOS A NIVEL DEL SUELO",
  //   },
  //   shortTitle: {
  //     fr: "PRÉPARATEUR DE COMMANDE AU SOL",
  //     en: "LOW-LEVEL ORDER PICKER",
  //     es: "PREPARADOR DE PEDIDOS A NIVEL DEL SUELO",
  //   },
  //   description: {
  //     fr: "Préparateur de commande au sol pour prélèvement jusqu'à 2.8 m de hauteur",
  //     en: "Low-level order picker for picking up to 2.8 m height",
  //     es: "Preparador de pedidos a nivel del suelo para recolección hasta 2.8 m de altura",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 1.0 à 2.5 t",
  //       en: "Load capacity: 1.0 to 2.5 t",
  //       es: "Capacidad de carga: 1.0 a 2.5 t",
  //     },
  //     pression: {
  //       fr: "Prélèvement: jusqu'à 2.8 m de hauteur",
  //       en: "Picking: up to 2.8 m height",
  //       es: "Recolección: hasta 2.8 m de altura",
  //     },
  //     sortie: {
  //       fr: "Moteur: Électrique",
  //       en: "Engine: Electric",
  //       es: "Motor: Eléctrico",
  //     },
  //   },
  //   models: ["Optio"],
  //   image:
  //     "https://tmhe-media.azureedge.net/published/13603_768x400_toyota%20mh.jpg",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-preparateur-commande-hauteur",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA PRÉPARATEUR DE COMMANDE DE MOYENNE ET GRANDE HAUTEUR",
  //     en: "TOYOTA MEDIUM AND HIGH-LEVEL ORDER PICKER",
  //     es: "TOYOTA PREPARADOR DE PEDIDOS DE ALTURA MEDIA Y ALTA",
  //   },
  //   shortTitle: {
  //     fr: "PRÉPARATEUR DE COMMANDE DE MOYENNE ET GRANDE HAUTEUR",
  //     en: "MEDIUM AND HIGH-LEVEL ORDER PICKER",
  //     es: "PREPARADOR DE PEDIDOS DE ALTURA MEDIA Y ALTA",
  //   },
  //   description: {
  //     fr: "Préparateur de commande de moyenne et grande hauteur avec plateforme élévatrice",
  //     en: "Medium and high-level order picker with elevating platform",
  //     es: "Preparador de pedidos de altura media y alta con plataforma elevadora",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 1.0 à 1.2 t",
  //       en: "Load capacity: 1.0 to 1.2 t",
  //       es: "Capacidad de carga: 1.0 a 1.2 t",
  //     },
  //     pression: {
  //       fr: "Prélèvement: jusqu'à 12.1 m de hauteur",
  //       en: "Picking: up to 12.1 m height",
  //       es: "Recolección: hasta 12.1 m de altura",
  //     },
  //     sortie: {
  //       fr: "Plateformes élévatrices pour le prélèvement en hauteur",
  //       en: "Elevating platforms for high-level picking",
  //       es: "Plataformas elevadoras para recolección en altura",
  //     },
  //   },
  //   models: ["High-Level Order Picker"],
  //   image:
  //     "https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/bt-optio-m-series-ome100n-main.jpg",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-tracteur-electrique",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA TRACTEUR ÉLECTRIQUE",
  //     en: "TOYOTA ELECTRIC TRACTOR",
  //     es: "TOYOTA TRACTOR ELÉCTRICO",
  //   },
  //   shortTitle: {
  //     fr: "TRACTEUR ÉLECTRIQUE",
  //     en: "ELECTRIC TRACTOR",
  //     es: "TRACTOR ELÉCTRICO",
  //   },
  //   description: {
  //     fr: "Tracteur électrique pour transport horizontal avec opérateur debout",
  //     en: "Electric tractor for horizontal transport with standing operator",
  //     es: "Tractor eléctrico para transporte horizontal con operador de pie",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 1.0 à 6 t",
  //       en: "Load capacity: 1.0 to 6 t",
  //       es: "Capacidad de carga: 1.0 a 6 t",
  //     },
  //     pression: {
  //       fr: "Opérateur debout pour le transport horizontal",
  //       en: "Standing operator for horizontal transport",
  //       es: "Operador de pie para transporte horizontal",
  //     },
  //     sortie: {
  //       fr: "Moteur: Électrique",
  //       en: "Engine: Electric",
  //       es: "Motor: Eléctrico",
  //     },
  //   },
  //   models: ["Tracto"],
  //   image:
  //     "https://toyota-forklifts.fr/globalassets/inriver/resources/toyota-tracto-s-series-tse500-main.jpg",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-chariot-mat-retractable",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA CHARIOT À MÂT RÉTRACTABLE",
  //     en: "TOYOTA REACH TRUCK",
  //     es: "TOYOTA CARRETILLA RETRÁCTIL",
  //   },
  //   shortTitle: {
  //     fr: "CHARIOT À MÂT RÉTRACTABLE",
  //     en: "REACH TRUCK",
  //     es: "CARRETILLA RETRÁCTIL",
  //   },
  //   description: {
  //     fr: "Chariot à mât rétractable pour optimisation de l'espace en entrepôt",
  //     en: "Reach truck for warehouse space optimization",
  //     es: "Carretilla retráctil para optimización del espacio en almacén",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 1.2 t à 2.5 t",
  //       en: "Load capacity: 1.2 t to 2.5 t",
  //       es: "Capacidad de carga: 1.2 t a 2.5 t",
  //     },
  //     pression: {
  //       fr: "Hauteurs de levage: jusqu'à 13 m",
  //       en: "Lift heights: up to 13 m",
  //       es: "Alturas de elevación: hasta 13 m",
  //     },
  //     sortie: {
  //       fr: "Moteur: Électrique",
  //       en: "Engine: Electric",
  //       es: "Motor: Eléctrico",
  //     },
  //   },
  //   models: ["Reach Truck"],
  //   image:
  //     "https://tmhe-media.azureedge.net/published/13616_768x400_toyota%20mh.jpg",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-chariot-mat-retractable-chassis-etroit",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA CHARIOT À MÂT RÉTRACTABLE CHÂSSIS ÉTROIT",
  //     en: "TOYOTA NARROW CHASSIS REACH TRUCK",
  //     es: "TOYOTA CARRETILLA RETRÁCTIL CHASIS ESTRECHO",
  //   },
  //   shortTitle: {
  //     fr: "CHARIOT À MÂT RÉTRACTABLE CHÂSSIS ÉTROIT",
  //     en: "NARROW CHASSIS REACH TRUCK",
  //     es: "CARRETILLA RETRÁCTIL CHASIS ESTRECHO",
  //   },
  //   description: {
  //     fr: "Chariot à mât rétractable châssis étroit pour allées très étroites",
  //     en: "Narrow chassis reach truck for very narrow aisles",
  //     es: "Carretilla retráctil de chasis estrecho para pasillos muy estrechos",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 1.2 t à 1.6 t",
  //       en: "Load capacity: 1.2 t to 1.6 t",
  //       es: "Capacidad de carga: 1.2 t a 1.6 t",
  //     },
  //     pression: {
  //       fr: "Hauteurs de levage: jusqu'à 10 m",
  //       en: "Lift heights: up to 10 m",
  //       es: "Alturas de elevación: hasta 10 m",
  //     },
  //     sortie: {
  //       fr: "Moteur: Électrique",
  //       en: "Engine: Electric",
  //       es: "Motor: Eléctrico",
  //     },
  //   },
  //   models: ["Narrow Chassis Reach Truck"],
  //   image:
  //     "https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/vce120a_s0032.jpg?preset=Medium&autorotate=true&format=webp",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-chariot-mat-retractable-interieur-exterieur",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA CHARIOT À MÂT RÉTRACTABLE POUR INTÉRIEUR ET EXTÉRIEUR",
  //     en: "TOYOTA INDOOR/OUTDOOR REACH TRUCK",
  //     es: "TOYOTA CARRETILLA RETRÁCTIL PARA INTERIOR Y EXTERIOR",
  //   },
  //   shortTitle: {
  //     fr: "CHARIOT À MÂT RÉTRACTABLE POUR INTÉRIEUR ET EXTÉRIEUR",
  //     en: "INDOOR/OUTDOOR REACH TRUCK",
  //     es: "CARRETILLA RETRÁCTIL PARA INTERIOR Y EXTERIOR",
  //   },
  //   description: {
  //     fr: "Chariot à mât rétractable polyvalent pour usage intérieur et extérieur",
  //     en: "Versatile reach truck for indoor and outdoor use",
  //     es: "Carretilla retráctil versátil para uso interior y exterior",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 1.6 t",
  //       en: "Load capacity: 1.6 t",
  //       es: "Capacidad de carga: 1.6 t",
  //     },
  //     pression: {
  //       fr: "Hauteurs de levage: jusqu'à 7.5 m",
  //       en: "Lift heights: up to 7.5 m",
  //       es: "Alturas de elevación: hasta 7.5 m",
  //     },
  //     sortie: {
  //       fr: "Moteur: Électrique",
  //       en: "Engine: Electric",
  //       es: "Motor: Eléctrico",
  //     },
  //   },
  //   models: ["BT Reflex"],
  //   image:
  //     "https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/toyota-bt-reflex-rre160h_line-up.jpg?preset=Medium&autorotate=true&format=webp",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-chariot-allees-etroites-cabine-sol",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA CHARIOT POUR ALLÉES ÉTROITES (VNA) - CABINE AU SOL",
  //     en: "TOYOTA VERY NARROW AISLE TRUCK (VNA) - GROUND CABIN",
  //     es: "TOYOTA CARRETILLA PARA PASILLOS ESTRECHOS (VNA) - CABINA EN EL SUELO",
  //   },
  //   shortTitle: {
  //     fr: "CHARIOT POUR ALLÉES ÉTROITES (VNA) - CABINE AU SOL",
  //     en: "VERY NARROW AISLE TRUCK (VNA) - GROUND CABIN",
  //     es: "CARRETILLA PARA PASILLOS ESTRECHOS (VNA) - CABINA EN EL SUELO",
  //   },
  //   description: {
  //     fr: "Chariot pour allées étroites avec cabine au sol, conçu pour le filoguidage ou le guidage rail",
  //     en: "Very narrow aisle truck with ground cabin, designed for wire or rail guidance",
  //     es: "Carretilla para pasillos estrechos con cabina en el suelo, diseñada para guiado por cable o riel",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 1.25 t à 1.5 t",
  //       en: "Load capacity: 1.25 t to 1.5 t",
  //       es: "Capacidad de carga: 1.25 t a 1.5 t",
  //     },
  //     pression: {
  //       fr: "Hauteurs de levage: jusqu'à 11 m",
  //       en: "Lift heights: up to 11 m",
  //       es: "Alturas de elevación: hasta 11 m",
  //     },
  //     sortie: {
  //       fr: "Conçu pour le filoguidage ou le guidage rail",
  //       en: "Designed for wire or rail guidance",
  //       es: "Diseñado para guiado por cable o riel",
  //     },
  //   },
  //   models: ["BT Vector"],
  //   image:
  //     "https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/vce120a_s0032.jpg?preset=Medium&autorotate=true&format=webp",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-chariot-allees-etroites-cabine-montante",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA CHARIOT POUR ALLÉES ÉTROITES (VNA) - CABINE MONTANTE",
  //     en: "TOYOTA VERY NARROW AISLE TRUCK (VNA) - ELEVATING CABIN",
  //     es: "TOYOTA CARRETILLA PARA PASILLOS ESTRECHOS (VNA) - CABINA ELEVADORA",
  //   },
  //   shortTitle: {
  //     fr: "CHARIOT POUR ALLÉES ÉTROITES (VNA) - CABINE MONTANTE",
  //     en: "VERY NARROW AISLE TRUCK (VNA) - ELEVATING CABIN",
  //     es: "CARRETILLA PARA PASILLOS ESTRECHOS (VNA) - CABINA ELEVADORA",
  //   },
  //   description: {
  //     fr: "Chariot pour allées étroites avec cabine montante et châssis articulé",
  //     en: "Very narrow aisle truck with elevating cabin and articulated chassis",
  //     es: "Carretilla para pasillos estrechos con cabina elevadora y chasis articulado",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Capacité de charge: 1 t à 1.5 t",
  //       en: "Load capacity: 1 t to 1.5 t",
  //       es: "Capacidad de carga: 1 t a 1.5 t",
  //     },
  //     pression: {
  //       fr: "Hauteurs de levage: jusqu'à 16.8 m",
  //       en: "Lift heights: up to 16.8 m",
  //       es: "Alturas de elevación: hasta 16.8 m",
  //     },
  //     sortie: {
  //       fr: "Châssis articulé, conçu pour le filoguidage ou le guidage rail",
  //       en: "Articulated chassis, designed for wire or rail guidance",
  //       es: "Chasis articulado, diseñado para guiado por cable o riel",
  //     },
  //   },
  //   models: ["BT Vector"],
  //   image:
  //     "https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/vce120a_s0032.jpg?preset=Medium&autorotate=true&format=webp",
  //   featured: true,
  //   available: true,
  // },
  // {
  //   id: "toyota-solutions-automatisees",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "TOYOTA SOLUTIONS AUTOMATISÉES",
  //     en: "TOYOTA AUTOMATED SOLUTIONS",
  //     es: "TOYOTA SOLUCIONES AUTOMATIZADAS",
  //   },
  //   shortTitle: {
  //     fr: "SOLUTIONS AUTOMATISÉES",
  //     en: "AUTOMATED SOLUTIONS",
  //     es: "SOLUCIONES AUTOMATIZADAS",
  //   },
  //   description: {
  //     fr: "Solutions automatisées pour entrepôts incluant chariots automatisés, tracteurs de remorquage et navettes",
  //     en: "Automated warehouse solutions including automated trucks, towing tractors and shuttles",
  //     es: "Soluciones automatizadas para almacenes incluyendo carretillas automatizadas, tractores de remolque y lanzaderas",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Chariots automatisés pour entrepôts",
  //       en: "Automated warehouse trucks",
  //       es: "Carretillas automatizadas para almacenes",
  //     },
  //     pression: {
  //       fr: "Tracteurs de remorquage automatisés",
  //       en: "Automated towing tractors",
  //       es: "Tractores de remolque automatizados",
  //     },
  //     sortie: {
  //       fr: "Transporteur horizontal automatisé, Navettes semi-automatisées",
  //       en: "Automated horizontal transporter, Semi-automated shuttles",
  //       es: "Transportador horizontal automatizado, Lanzaderas semiautomatizadas",
  //     },
  //   },
  //   models: ["Automated Solutions"],
  //   image:
  //     "https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/vce150a_3_4_front3.jpg?preset=Medium&autorotate=true&format=webp",
  //   featured: true,
  //   available: true,
  // },
  {
    id: "sinoboom-scissor-lift",
    category: "nacelles",
    brand: "SINOBOOM",
    title: {
      fr: "SINOBOOM NACELLE CISEAUX",
      en: "SINOBOOM SCISSOR LIFT",
      es: "SINOBOOM PLATAFORMA DE TIJERA",
    },
    shortTitle: {
      fr: "NACELLE CISEAUX",
      en: "SCISSOR LIFT",
      es: "PLATAFORMA DE TIJERA",
    },
    description: {
      fr: "Nacelles ciseaux électriques pour travaux en hauteur avec grande capacité de charge",
      en: "Electric scissor lifts for elevated work with high load capacity",
      es: "Plataformas de tijera eléctricas para trabajos en altura con gran capacidad de carga",
    },
    specs: {
      portee: {
        fr: "Hauteur de travail: 5.8 m à 15.8 m",
        en: "Working height: 5.8 m to 15.8 m",
        es: "Altura de trabajo: 5.8 m a 15.8 m",
      },
      pression: {
        fr: "Portée horizontale: jusqu'à 0.9 m",
        en: "Horizontal outreach: up to 0.9 m",
        es: "Alcance horizontal: hasta 0.9 m",
      },
      sortie: {
        fr: "Capacité de charge: 230 kg à 350 kg",
        en: "Load capacity: 230 kg to 350 kg",
        es: "Capacidad de carga: 230 kg a 350 kg",
      },
    },
    models: [
      "0608ME All (1932ME All)",
      "0808E All (2732E All)",
      "0407EN (1530EN)",
      "0407SE (1530SE)",
      "0607EN (1930EN)",
      "0607SE (1932SE)",
      "0608E (2132E)",
      "0608SE (1930SE)",
      "0608ME (1932ME)",
      "0808E (2732E)",
    ],
    image:
      "https://ae.sinoboom.com/data/upload/me/cms/category/202503(5)/109/sl/1744194232952630.png",
    featured: true,
    available: true,
  },
  {
    id: "sinoboom-telescopic-boom-lift",
    category: "nacelles",
    brand: "SINOBOOM",
    title: {
      fr: "SINOBOOM NACELLE TÉLESCOPIQUE",
      en: "SINOBOOM TELESCOPIC BOOM LIFT",
      es: "SINOBOOM PLATAFORMA TELESCÓPICA",
    },
    shortTitle: {
      fr: "NACELLE TÉLESCOPIQUE",
      en: "TELESCOPIC BOOM LIFT",
      es: "PLATAFORMA TELESCÓPICA",
    },
    description: {
      fr: "Nacelles télescopiques haute performance pour accès en hauteur extrême avec grande portée",
      en: "High-performance telescopic boom lifts for extreme height access with long reach",
      es: "Plataformas telescópicas de alto rendimiento para acceso a alturas extremas con gran alcance",
    },
    specs: {
      portee: {
        fr: "Hauteur de travail: 16.1 m à 59.9 m",
        en: "Working height: 16.1 m to 59.9 m",
        es: "Altura de trabajo: 16.1 m a 59.9 m",
      },
      pression: {
        fr: "Portée horizontale: 9.1 m à 24.4 m",
        en: "Horizontal outreach: 9.1 m to 24.4 m",
        es: "Alcance horizontal: 9.1 m a 24.4 m",
      },
      sortie: {
        fr: "Capacité de charge: 250 kg à 480 kg",
        en: "Load capacity: 250 kg to 480 kg",
        es: "Capacidad de carga: 250 kg a 480 kg",
      },
    },
    models: [
      "TB14J Plus (TB460J Plus)",
      "TB18J Plus (TB590J Plus)",
      "TB20J Plus (TB660J Plus)",
      "TB22J Plus (TB740J Plus)",
      "TB26J Plus (TB860J Plus)",
      "TB28J Plus (TB910J Plus)",
      "TB32JN Plus (TB1060JN Plus)",
      "TB32J Plus (TB1060J Plus)",
      "TB39RJ PLUS (TB1290RJ PLUS)",
      "TB42RJ PLUS (TB1370RJ PLUS)",
      "TB42RJ (TB1370RJ)",
      "TB58RJ Plus (TB1900RJ Plus)",
    ],
    image:
      "https://ae.sinoboom.com/data/upload/me/cms/category/202503(5)/107/tbl/1744165284198027.png",
    featured: true,
    available: true,
  },
  {
    id: "sinoboom-articulating-boom-lift",
    category: "nacelles",
    brand: "SINOBOOM",
    title: {
      fr: "SINOBOOM NACELLE ARTICULÉE",
      en: "SINOBOOM ARTICULATING BOOM LIFT",
      es: "SINOBOOM PLATAFORMA ARTICULADA",
    },
    shortTitle: {
      fr: "NACELLE ARTICULÉE",
      en: "ARTICULATING BOOM LIFT",
      es: "PLATAFORMA ARTICULADA",
    },
    description: {
      fr: "Nacelles articulées pour accès difficile avec flexibilité maximale et capacité tout-terrain",
      en: "Articulating boom lifts for difficult access with maximum flexibility and all-terrain capability",
      es: "Plataformas articuladas para acceso difícil con máxima flexibilidad y capacidad todoterreno",
    },
    specs: {
      portee: {
        fr: "Hauteur de travail: 11.62 m à 27.65 m",
        en: "Working height: 11.62 m to 27.65 m",
        es: "Altura de trabajo: 11.62 m a 27.65 m",
      },
      pression: {
        fr: "Portée horizontale: 6.3 m à 19.1 m",
        en: "Horizontal outreach: 6.3 m to 19.1 m",
        es: "Alcance horizontal: 6.3 m a 19.1 m",
      },
      sortie: {
        fr: "Capacité de charge: 230 kg à 340 kg",
        en: "Load capacity: 230 kg to 340 kg",
        es: "Capacidad de carga: 230 kg a 340 kg",
      },
    },
    models: [
      "AB10ERJN (AB320ERJN)",
      "AB14EJ (AB460EJ)",
      "AB16EJ (AB520EJ)",
      "AB26EJ Plus (AB850EJ Plus)",
      "AB22EJ Plus (AB710EJ Plus)",
      "AB18EJ (AB600EJ)",
      "AB16EJ Plus (AB520EJ Plus)",
    ],
    image:
      "https://ae.sinoboom.com/data/upload/me/cms/category/202503(5)/108/abl/1744194050874460.png",
    featured: true,
    available: true,
  },
  {
    id: "sinoboom-vertical-mast-lift",
    category: "nacelles",
    brand: "SINOBOOM",
    title: {
      fr: "SINOBOOM NACELLE VERTICALE",
      en: "SINOBOOM VERTICAL MAST LIFT",
      es: "SINOBOOM PLATAFORMA VERTICAL",
    },
    shortTitle: {
      fr: "NACELLE VERTICALE",
      en: "VERTICAL MAST LIFT",
      es: "PLATAFORMA VERTICAL",
    },
    description: {
      fr: "Nacelle verticale compacte pour travaux en hauteur dans espaces restreints",
      en: "Compact vertical mast lift for elevated work in confined spaces",
      es: "Plataforma vertical compacta para trabajos en altura en espacios reducidos",
    },
    specs: {
      portee: {
        fr: "Hauteur de travail: 10.3 m",
        en: "Working height: 10.3 m",
        es: "Altura de trabajo: 10.3 m",
      },
      pression: {
        fr: "Portée horizontale: 3.3 m",
        en: "Horizontal outreach: 3.3 m",
        es: "Alcance horizontal: 3.3 m",
      },
      sortie: {
        fr: "Capacité de charge: 200 kg",
        en: "Load capacity: 200 kg",
        es: "Capacidad de carga: 200 kg",
      },
    },
    models: ["ML08EJ (ML270EJ)"],
    image:
      "https://ae.sinoboom.com/data/upload/me/cms/category/202503(5)/110/vml/1744194381123272.png",
    featured: true,
    available: true,
  },
  {
    id: "sinoboom-spider-lift",
    category: "nacelles",
    brand: "SINOBOOM",
    title: {
      fr: "SINOBOOM NACELLE ARAIGNÉE",
      en: "SINOBOOM SPIDER LIFT",
      es: "SINOBOOM PLATAFORMA ARAÑA",
    },
    shortTitle: {
      fr: "NACELLE ARAIGNÉE",
      en: "SPIDER LIFT",
      es: "PLATAFORMA ARAÑA",
    },
    description: {
      fr: "Nacelles araignées compactes pour terrains difficiles et pentes raides avec stabilisateurs",
      en: "Compact spider lifts for difficult terrain and steep slopes with stabilizers",
      es: "Plataformas araña compactas para terrenos difíciles y pendientes pronunciadas con estabilizadores",
    },
    specs: {
      portee: {
        fr: "Hauteur de travail: 27 m à 52 m",
        en: "Working height: 27 m to 52 m",
        es: "Altura de trabajo: 27 m a 52 m",
      },
      pression: {
        fr: "Portée horizontale: 14.2 m à 17 m",
        en: "Horizontal outreach: 14.2 m to 17 m",
        es: "Alcance horizontal: 14.2 m a 17 m",
      },
      sortie: {
        fr: "Capacité de charge: 120 kg à 450 kg",
        en: "Load capacity: 120 kg to 450 kg",
        es: "Capacidad de carga: 120 kg a 450 kg",
      },
    },
    models: ["SPT52HJ", "SPA27J", "SPT38HJ Plus", "SPT43HJ", "SPA33HJ"],
    image:
      "https://ae.sinoboom.com/data/upload/me/cms/category/202503(5)/111/spl/1744194506025858.png",
    featured: true,
    available: true,
  },
  {
    id: "sinoboom-truck-mounted-boom-lift",
    category: "nacelles",
    brand: "SINOBOOM",
    title: {
      fr: "SINOBOOM NACELLE SUR CAMION",
      en: "SINOBOOM TRUCK-MOUNTED BOOM LIFT",
      es: "SINOBOOM PLATAFORMA SOBRE CAMIÓN",
    },
    shortTitle: {
      fr: "NACELLE SUR CAMION",
      en: "TRUCK-MOUNTED BOOM LIFT",
      es: "PLATAFORMA SOBRE CAMIÓN",
    },
    description: {
      fr: "Nacelle montée sur camion pour une mobilité optimale et un déploiement rapide sur chantier",
      en: "Truck-mounted boom lift for optimal mobility and rapid on-site deployment",
      es: "Plataforma montada sobre camión para movilidad óptima y despliegue rápido en obra",
    },
    specs: {
      portee: {
        fr: "Hauteur de travail: 17.6 m",
        en: "Working height: 17.6 m",
        es: "Altura de trabajo: 17.6 m",
      },
      pression: {
        fr: "Portée horizontale: 11.3 m",
        en: "Horizontal outreach: 11.3 m",
        es: "Alcance horizontal: 11.3 m",
      },
      sortie: {
        fr: "Capacité de charge: 200 kg",
        en: "Load capacity: 200 kg",
        es: "Capacidad de carga: 200 kg",
      },
    },
    models: [],
    image:
      "https://www.sinoboom.com/Public/Upload/image/20240404/1712241182143d5d38cb905f50.png",
    featured: true,
    available: true,
  },
  {
    id: "teksan-tour-eclairage-solaire",
    category: "eclairage",
    brand: "TEKSAN",
    title: {
      fr: "TEKSAN TOUR D'ÉCLAIRAGE SOLAIRE",
      en: "TEKSAN SOLAR LIGHTING TOWER",
      es: "TEKSAN TORRE DE ILUMINACIÓN SOLAR",
    },
    shortTitle: {
      fr: "TOUR D'ÉCLAIRAGE SOLAIRE",
      en: "SOLAR LIGHTING TOWER",
      es: "TORRE DE ILUMINACIÓN SOLAR",
    },
    description: {
      fr: "Tours d'éclairage solaires autonomes avec panneaux photovoltaïques et batteries haute capacité pour éclairage de chantier écologique",
      en: "Autonomous solar lighting towers with photovoltaic panels and high-capacity batteries for eco-friendly site lighting",
      es: "Torres de iluminación solar autónomas con paneles fotovoltaicos y baterías de alta capacidad para iluminación ecológica de obra",
    },
    specs: {
      portee: {
        fr: "Puissance panneau solaire: 2000 W",
        en: "Solar panel power: 2000 W",
        es: "Potencia panel solar: 2000 W",
      },
      pression: {
        fr: "Flux lumineux total: 96000 lm (4 x 24000 lm)",
        en: "Total luminous flux: 96000 lm (4 x 24000 lm)",
        es: "Flujo luminoso total: 96000 lm (4 x 24000 lm)",
      },
      sortie: {
        fr: "Zone éclairée: 3500 m² (20 lux)",
        en: "Illuminated area: 3500 m² (20 lux)",
        es: "Área iluminada: 3500 m² (20 lux)",
      },
    },
    models: [
      "TJSLT-8LC (Lead Carbon 8h)",
      "TJSLT-8LFP (LiFePO4 8h)",
      "TJSLT-12LC (Lead Carbon 12h)",
      "TJSLT-12LFP (LiFePO4 12h)",
    ],
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1774960132/aydinlatma-kulesi-1-d6-01.jpg_vhorpg.jpg",
    featured: true,
    available: true,
  },
  {
    id: "fabo-concasseur-mobile-hp",
    category: "concassage",
    brand: "FABO",
    title: {
      fr: "FABO CONCASSEUR MOBILE",
      en: "FABO MOBILE CRUSHER",
      es: "FABO TRITURADORA MÓVIL",
    },
    shortTitle: {
      fr: "CONCASSEUR MOBILE",
      en: "MOBILE CRUSHER",
      es: "TRITURADORA MÓVIL",
    },
    description: {
      fr: "Concasseurs mobiles haute performance pour production d'agrégats sur site avec mobilité maximale",
      en: "High-performance mobile crushers for on-site aggregate production with maximum mobility",
      es: "Trituradoras móviles de alto rendimiento para producción de agregados en sitio con máxima movilidad",
    },
    specs: {
      portee: {
        fr: "Installation mobile complète",
        en: "Complete mobile installation",
        es: "Instalación móvil completa",
      },
      pression: {
        fr: "Haute capacité de production",
        en: "High production capacity",
        es: "Alta capacidad de producción",
      },
      sortie: {
        fr: "Concassage primaire et secondaire",
        en: "Primary and secondary crushing",
        es: "Trituración primaria y secundaria",
      },
    },
    models: ["Mobile Crusher"],
    image:
      "https://fabo.com.tr/wp-content/uploads/2023/10/Concasseurs-Mobiles.webp",
    featured: true,
    available: true,
  },
  {
    id: "fabo-station-concassage-fixe",
    category: "concassage",
    brand: "FABO",
    title: {
      fr: "FABO STATION DE CONCASSAGE FIXE",
      en: "FABO FIXED CRUSHING STATION",
      es: "FABO ESTACIÓN DE TRITURACIÓN FIJA",
    },
    shortTitle: {
      fr: "STATION DE CONCASSAGE FIXE",
      en: "FIXED CRUSHING STATION",
      es: "ESTACIÓN DE TRITURACIÓN FIJA",
    },
    description: {
      fr: "Stations de concassage fixes pour production continue d'agrégats de haute qualité",
      en: "Fixed crushing stations for continuous production of high-quality aggregates",
      es: "Estaciones de trituración fijas para producción continua de agregados de alta calidad",
    },
    specs: {
      portee: {
        fr: "Installation fixe permanente",
        en: "Permanent fixed installation",
        es: "Instalación fija permanente",
      },
      pression: {
        fr: "Production continue optimisée",
        en: "Optimized continuous production",
        es: "Producción continua optimizada",
      },
      sortie: {
        fr: "Concassage et criblage intégrés",
        en: "Integrated crushing and screening",
        es: "Trituración y cribado integrados",
      },
    },
    models: ["Fixed Crushing Station"],
    image:
      "https://fabo.com.tr/wp-content/uploads/2021/08/Station-de-Concassage-Fixes.jpg",
    featured: true,
    available: true,
  },
  {
    id: "fabo-centrale-beton-fixe-powermix60",
    category: "centrales-beton",
    brand: "FABO",
    title: {
      fr: "FABO CENTRALE À BÉTON FIXE POWERMIX 60",
      en: "FABO FIXED CONCRETE PLANT POWERMIX 60",
      es: "FABO PLANTA DE HORMIGÓN FIJA POWERMIX 60",
    },
    shortTitle: {
      fr: "CENTRALE À BÉTON FIXE POWERMIX 60",
      en: "FIXED CONCRETE PLANT POWERMIX 60",
      es: "PLANTA DE HORMIGÓN FIJA POWERMIX 60",
    },
    description: {
      fr: "Centrale à béton fixe haute capacité pour production industrielle continue de béton de qualité",
      en: "High-capacity fixed concrete plant for continuous industrial production of quality concrete",
      es: "Planta de hormigón fija de alta capacidad para producción industrial continua de hormigón de calidad",
    },
    specs: {
      portee: {
        fr: "Capacité: 60 m³/h",
        en: "Capacity: 60 m³/h",
        es: "Capacidad: 60 m³/h",
      },
      pression: {
        fr: "Installation fixe permanente",
        en: "Permanent fixed installation",
        es: "Instalación fija permanente",
      },
      sortie: {
        fr: "Production continue haute performance",
        en: "High-performance continuous production",
        es: "Producción continua de alto rendimiento",
      },
    },
    models: ["Powermix 60"],
    image:
      "https://fabo.com.tr/wp-content/uploads/2021/08/Powermix-60-Centrale-a-beton-fixe-min.jpg",
    featured: true,
    available: true,
  },
  {
    id: "fabo-centrale-beton-mobile",
    category: "centrales-beton",
    brand: "FABO",
    title: {
      fr: "FABO CENTRALE À BÉTON MOBILE",
      en: "FABO MOBILE CONCRETE PLANT",
      es: "FABO PLANTA DE HORMIGÓN MÓVIL",
    },
    shortTitle: {
      fr: "CENTRALE À BÉTON MOBILE",
      en: "MOBILE CONCRETE PLANT",
      es: "PLANTA DE HORMIGÓN MÓVIL",
    },
    description: {
      fr: "Centrales à béton mobiles pour production flexible de béton sur différents chantiers",
      en: "Mobile concrete plants for flexible concrete production at different construction sites",
      es: "Plantas de hormigón móviles para producción flexible de hormigón en diferentes obras",
    },
    specs: {
      portee: {
        fr: "Installation mobile transportable",
        en: "Transportable mobile installation",
        es: "Instalación móvil transportable",
      },
      pression: {
        fr: "Flexibilité maximale",
        en: "Maximum flexibility",
        es: "Flexibilidad máxima",
      },
      sortie: {
        fr: "Production de béton sur site",
        en: "On-site concrete production",
        es: "Producción de hormigón en sitio",
      },
    },
    models: ["Mobile Concrete Plant"],
    image:
      "https://fabo.com.tr/wp-content/uploads/2023/10/centrales-a-beton-mobiles-0050.webp",
    featured: true,
    available: true,
  },
  {
    id: "fabo-mix-compact-30",
    category: "centrales-beton",
    brand: "FABO",
    title: {
      fr: "FABO MIX COMPACT 30 TYPE A",
      en: "FABO MIX COMPACT 30 TYPE A",
      es: "FABO MIX COMPACT 30 TIPO A",
    },
    shortTitle: {
      fr: "MIX COMPACT 30 TYPE A",
      en: "MIX COMPACT 30 TYPE A",
      es: "MIX COMPACT 30 TIPO A",
    },
    description: {
      fr: "Centrale à béton compacte avec godet malaxeur pour petits et moyens chantiers",
      en: "Compact concrete plant with bucket mixer for small and medium construction sites",
      es: "Planta de hormigón compacta con mezclador de cubo para obras pequeñas y medianas",
    },
    specs: {
      portee: {
        fr: "Capacité: 30 m³/h",
        en: "Capacity: 30 m³/h",
        es: "Capacidad: 30 m³/h",
      },
      pression: {
        fr: "Design compact avec godet",
        en: "Compact design with bucket",
        es: "Diseño compacto con cubo",
      },
      sortie: {
        fr: "Idéal pour petits chantiers",
        en: "Ideal for small sites",
        es: "Ideal para obras pequeñas",
      },
    },
    models: ["Mix Compact 30 Type A"],
    image:
      "https://fabo.com.tr/wp-content/uploads/2021/08/FABO-Mix-Compact-30-Type-A-Godet-min.jpg",
    featured: true,
    available: true,
  },
  {
    id: "sany-mini-excavatrice-moins-25t",
    category: "excavation",
    brand: "SANY",
    title: {
      fr: "SANY MINI EXCAVATRICE DE MOINS DE 2,5T",
      en: "SANY MINI EXCAVATOR BELOW 2.5T",
      es: "SANY MINI EXCAVADORA MENOS DE 2,5T",
    },
    shortTitle: {
      fr: "MINI EXCAVATRICE < 2,5T",
      en: "MINI EXCAVATOR < 2.5T",
      es: "MINI EXCAVADORA < 2,5T",
    },
    description: {
      fr: "Mini excavatrice ultra-compacte pour travaux en espaces restreints et applications légères",
      en: "Ultra-compact mini excavator for work in confined spaces and light applications",
      es: "Mini excavadora ultra compacta para trabajos en espacios reducidos y aplicaciones ligeras",
    },
    specs: {
      portee: {
        fr: "Capacité du godet: 0,04 m³",
        en: "Bucket capacity: 0.04 m³",
        es: "Capacidad del cubo: 0,04 m³",
      },
      pression: {
        fr: "Poids de fonctionnement: 1,87 - 1,98 T",
        en: "Operating weight: 1.87 - 1.98 T",
        es: "Peso de funcionamiento: 1,87 - 1,98 T",
      },
      sortie: {
        fr: "Puissance du moteur: 10,3 - 14,6 kW",
        en: "Engine power: 10.3 - 14.6 kW",
        es: "Potencia del motor: 10,3 - 14,6 kW",
      },
    },
    models: ["SY16C", "SY16C (Tier4 F & Stage Ⅴ)", "SY18C (Tier4 F & Stage Ⅴ)"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/below%202T%20Mini%20E-191822?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },
  {
    id: "sany-mini-excavatrice-25-5t",
    category: "excavation",
    brand: "SANY",
    title: {
      fr: "SANY MINI EXCAVATRICE DE 2,5-5T",
      en: "SANY MINI EXCAVATOR 2.5-5T",
      es: "SANY MINI EXCAVADORA 2,5-5T",
    },
    shortTitle: {
      fr: "MINI EXCAVATRICE 2,5-5T",
      en: "MINI EXCAVATOR 2.5-5T",
      es: "MINI EXCAVADORA 2,5-5T",
    },
    description: {
      fr: "Mini excavatrice polyvalente pour chantiers de petite et moyenne envergure",
      en: "Versatile mini excavator for small and medium-scale construction sites",
      es: "Mini excavadora versátil para obras de pequeña y mediana escala",
    },
    specs: {
      portee: {
        fr: "Capacité du godet: 0,06 - 0,15 m³",
        en: "Bucket capacity: 0.06 - 0.15 m³",
        es: "Capacidad del cubo: 0,06 - 0,15 m³",
      },
      pression: {
        fr: "Poids de fonctionnement: 2,76 - 5,1 T",
        en: "Operating weight: 2.76 - 5.1 T",
        es: "Peso de funcionamiento: 2,76 - 5,1 T",
      },
      sortie: {
        fr: "Puissance du moteur: 15,2 - 35,5 kW",
        en: "Engine power: 15.2 - 35.5 kW",
        es: "Potencia del motor: 15,2 - 35,5 kW",
      },
    },
    models: [
      "SY26U (Tier4 F & Stage Ⅴ)",
      "SY35U (StageIII)",
      "SY35U (Tier4 F & Stage Ⅴ)",
      "SY50U",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/2T~5T%20Mini%20Exca-174719?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },
  {
    id: "sany-pompe-beton-camion-37m",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "SANY POMPE À BÉTON MONTÉE SUR CAMION DE 37M",
      en: "SANY TRUCK-MOUNTED CONCRETE PUMP 37M",
      es: "SANY BOMBA DE HORMIGÓN MONTADA EN CAMIÓN 37M",
    },
    shortTitle: {
      fr: "POMPE À BÉTON 37M",
      en: "CONCRETE PUMP 37M",
      es: "BOMBA DE HORMIGÓN 37M",
    },
    description: {
      fr: "Pompe à béton montée sur camion de 37 mètres pour projets de construction de grande envergure",
      en: "37-meter truck-mounted concrete pump for large-scale construction projects",
      es: "Bomba de hormigón montada en camión de 37 metros para proyectos de construcción de gran escala",
    },
    specs: {
      portee: {
        fr: "Portée verticale: 36.5 m",
        en: "Vertical reach: 36.5 m",
        es: "Alcance vertical: 36.5 m",
      },
      pression: {
        fr: "Pression: 6 - 13 MPa",
        en: "Pressure: 6 - 13 MPa",
        es: "Presión: 6 - 13 MPa",
      },
      sortie: {
        fr: "Sortie: 48 - 160 m³/h",
        en: "Output: 48 - 160 m³/h",
        es: "Salida: 48 - 160 m³/h",
      },
    },
    models: [
      "SYG5261THB 370C-10(SZ-LA)",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20220615/2_37m%20(1)-150032.png?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },
  {
    id: "sany-pompe-beton-camion-grande-portee-66m",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "SANY POMPE À BÉTON MONTÉE SUR CAMION DE GRANDE PORTÉE 66M",
      en: "SANY LONG REACH TRUCK-MOUNTED CONCRETE PUMP 66M",
      es: "SANY BOMBA DE HORMIGÓN MONTADA EN CAMIÓN DE GRAN ALCANCE 66M",
    },
    shortTitle: {
      fr: "POMPE À BÉTON 66M",
      en: "CONCRETE PUMP 66M",
      es: "BOMBA DE HORMIGÓN 66M",
    },
    description: {
      fr: "Pompe à béton montée sur camion de 66 mètres pour projets d'infrastructure de très grande envergure",
      en: "66-meter truck-mounted concrete pump for very large-scale infrastructure projects",
      es: "Bomba de hormigón montada en camión de 66 metros para proyectos de infraestructura de muy gran escala",
    },
    specs: {
      portee: {
        fr: "Portée verticale: 66 m",
        en: "Vertical reach: 66 m",
        es: "Alcance vertical: 66 m",
      },
      pression: {
        fr: "Pression: 6 - 20 MPa",
        en: "Pressure: 6 - 20 MPa",
        es: "Presión: 6 - 20 MPa",
      },
      sortie: {
        fr: "Sortie: 50 - 200 m³/h",
        en: "Output: 50 - 200 m³/h",
        es: "Salida: 50 - 200 m³/h",
      },
    },
    models: ["SYG5590THB 680C-10"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20210819/02-155920.jpg?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },
  {
    id: "sany-haveuse-ebz",
    category: "mines",
    brand: "SANY",
    title: {
      fr: "SANY HAVEUSE SÉRIE EBZ",
      en: "SANY EBZ SERIES ROADHEADER",
      es: "SANY ROZADORA SERIE EBZ",
    },
    shortTitle: {
      fr: "HAVEUSE SÉRIE EBZ",
      en: "EBZ SERIES ROADHEADER",
      es: "ROZADORA SERIE EBZ",
    },
    description: {
      fr: "Haveuse série EBZ pour l'excavation de tunnels et l'exploitation minière en conditions de charbon et demi-charbon.",
      en: "EBZ series roadheader for tunnel excavation and mining in coal and half-coal conditions.",
      es: "Rozadora serie EBZ para excavación de túneles y minería en condiciones de carbón y medio carbón.",
    },
    specs: {
      portee: {
        fr: "Conditions: Charbon / Demi-charbon",
        en: "Conditions: Coal / Half Coal",
        es: "Condiciones: Carbón / Medio Carbón",
      },
      pression: {
        fr: "Puissance de coupe: 75 - 318 kW",
        en: "Cutting power: 75 - 318 kW",
        es: "Potencia de corte: 75 - 318 kW",
      },
      sortie: {
        fr: "Puissance totale: 200 - 570 kW",
        en: "Total power: 200 - 570 kW",
        es: "Potencia total: 200 - 570 kW",
      },
    },
    models: [
      "EBZ132",
      "EBZ160CA",
      "EBZ200RUS",
      "EBZ200R",
      "EBZ200H",
      "EBZ260R",
      "EBZ260RUS",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200818/EBZ%20series%20Road-082041?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },
  {
    id: "sany-haveuse-str",
    category: "mines",
    brand: "SANY",
    title: {
      fr: "SANY HAVEUSE SÉRIE STR",
      en: "SANY STR SERIES ROADHEADER",
      es: "SANY ROZADORA SERIE STR",
    },
    shortTitle: {
      fr: "HAVEUSE SÉRIE STR",
      en: "STR SERIES ROADHEADER",
      es: "ROZADORA SERIE STR",
    },
    description: {
      fr: "Haveuse série STR haute performance pour l'excavation de roches dures et l'exploitation minière.",
      en: "High-performance STR series roadheader for hard rock excavation and mining.",
      es: "Rozadora serie STR de alto rendimiento para excavación de roca dura y minería.",
    },
    specs: {
      portee: {
        fr: "Conditions: Charbon / Demi-charbon / Roche",
        en: "Conditions: Coal / Half Coal / Rock",
        es: "Condiciones: Carbón / Medio Carbón / Roca",
      },
      pression: {
        fr: "Puissance de coupe: 200 - 368 kW",
        en: "Cutting power: 200 - 368 kW",
        es: "Potencia de corte: 200 - 368 kW",
      },
      sortie: {
        fr: "Puissance totale: 340 - 606 kW",
        en: "Total power: 340 - 606 kW",
        es: "Potencia total: 340 - 606 kW",
      },
    },
    models: ["STR260/5", "STR318/5", "EBZ318H"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200818/STR%20series%20Road-082440?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },
  {
    id: "sany-haveuse-scr",
    category: "mines",
    brand: "SANY",
    title: {
      fr: "SANY HAVEUSE SÉRIE SCR",
      en: "SANY SCR SERIES ROADHEADER",
      es: "SANY ROZADORA SERIE SCR",
    },
    shortTitle: {
      fr: "HAVEUSE SÉRIE SCR",
      en: "SCR SERIES ROADHEADER",
      es: "ROZADORA SERIE SCR",
    },
    description: {
      fr: "Haveuse série SCR conçue pour les conditions de roche non charbonneuse et les projets d'infrastructure.",
      en: "SCR series roadheader designed for non-coal rock conditions and infrastructure projects.",
      es: "Rozadora serie SCR diseñada para condiciones de roca no carbonosa y proyectos de infraestructura.",
    },
    specs: {
      portee: {
        fr: "Conditions: Non-charbon",
        en: "Conditions: Non-coal",
        es: "Condiciones: No carbón",
      },
      pression: {
        fr: "Puissance de coupe: 200 - 2x315 kW",
        en: "Cutting power: 200 - 2x315 kW",
        es: "Potencia de corte: 200 - 2x315 kW",
      },
      sortie: {
        fr: "Puissance totale: 455 - 867 kW",
        en: "Total power: 455 - 867 kW",
        es: "Potencia total: 455 - 867 kW",
      },
    },
    models: ["SCR280", "SCR520A", "SCR630"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200818/SCR%20series%20Road-082411?x-oss-process=image/format,webp",
    featured: true,
    available: true,
  },
  {
    id: "sunward-swdrt200b",
    category: "forage",
    brand: "SUNWARD",
    title: {
      fr: "SUNWARD SWDRT200B",
      en: "SUNWARD SWDRT200B",
      es: "SUNWARD SWDRT200B",
    },
    shortTitle: {
      fr: "SWDRT200B",
      en: "SWDRT200B",
      es: "SWDRT200B",
    },
    description: {
      fr: "Appareil de forage rotatif haute performance pour fondations profondes.",
      en: "High-performance rotary drilling rig for deep foundations.",
      es: "Equipo de perforación rotativa de alto rendimiento para cimentaciones profundas.",
    },
    specs: {
      portee: {
        fr: "Plage de forage: 180-216 mm",
        en: "Drilling range: 180-216 mm",
        es: "Rango de perforación: 180-216 mm",
      },
      pression: {
        fr: "Profondeur max: 48 m",
        en: "Max depth: 48 m",
        es: "Profundidad máx: 48 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SWDRT200B"],
    image:
      "https://www.sunwardmachine.com/upload/product/1747635570685331.jpg.webp",
    featured: true,
    available: true,
  },
  {
    id: "sunward-swdrt250b",
    category: "forage",
    brand: "SUNWARD",
    title: {
      fr: "SUNWARD SWDRT250B",
      en: "SUNWARD SWDRT250B",
      es: "SUNWARD SWDRT250B",
    },
    shortTitle: {
      fr: "SWDRT250B",
      en: "SWDRT250B",
      es: "SWDRT250B",
    },
    description: {
      fr: "Appareil de forage rotatif de grande capacité pour projets d'infrastructure majeurs.",
      en: "Large capacity rotary drilling rig for major infrastructure projects.",
      es: "Equipo de perforación rotativa de gran capacidad para proyectos de infraestructura importantes.",
    },
    specs: {
      portee: {
        fr: "Diamètre de forage: 200-250 mm",
        en: "Drilling diameter: 200-250 mm",
        es: "Diámetro de perforación: 200-250 mm",
      },
      pression: {
        fr: "Profondeur max: 48 m",
        en: "Max depth: 48 m",
        es: "Profundidad máx: 48 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SWDRT250B"],
    image:
      "https://www.sunwardmachine.com/upload/product/1747635570685331.jpg.webp",
    featured: true,
    available: true,
  },
  {
    id: "sunward-swdr152b",
    category: "forage",
    brand: "SUNWARD",
    title: {
      fr: "SUNWARD SWDR152B",
      en: "SUNWARD SWDR152B",
      es: "SUNWARD SWDR152B",
    },
    shortTitle: {
      fr: "SWDR152B",
      en: "SWDR152B",
      es: "SWDR152B",
    },
    description: {
      fr: "Appareil de forage polyvalent pour diverses applications géotechniques.",
      en: "Versatile drilling rig for various geotechnical applications.",
      es: "Equipo de perforación versátil para diversas aplicaciones geotécnicas.",
    },
    specs: {
      portee: {
        fr: "Plage de forage: 105-165 mm",
        en: "Drilling range: 105-165 mm",
        es: "Rango de perforación: 105-165 mm",
      },
      pression: {
        fr: "Profondeur max: 30 m",
        en: "Max depth: 30 m",
        es: "Profundidad máx: 30 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SWDR152B"],
    image:
      "https://www.sunwardmachine.com/upload/product/1747632151941825.jpg.webp",
    featured: true,
    available: true,
  },
  {
    id: "sunward-swdh102s",
    category: "forage",
    brand: "SUNWARD",
    title: {
      fr: "SUNWARD SWDH102S",
      en: "SUNWARD SWDH102S",
      es: "SUNWARD SWDH102S",
    },
    shortTitle: {
      fr: "SWDH102S",
      en: "SWDH102S",
      es: "SWDH102S",
    },
    description: {
      fr: "Appareil de forage compact pour travaux de précision en espaces restreints.",
      en: "Compact drilling rig for precision work in confined spaces.",
      es: "Equipo de perforación compacto para trabajos de precisión en espacios reducidos.",
    },
    specs: {
      portee: {
        fr: "Diamètre du trou: 76-115 mm",
        en: "Hole diameter: 76-115 mm",
        es: "Diámetro del agujero: 76-115 mm",
      },
      pression: {
        fr: "Profondeur max: 24 m",
        en: "Max depth: 24 m",
        es: "Profundidad máx: 24 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SWDH102S"],
    image:
      "https://www.sunwardmachine.com/upload/product/1760062276673778.jpg.webp",
    featured: true,
    available: true,
  },
  {
    id: "sunward-swde200b",
    category: "forage",
    brand: "SUNWARD",
    title: {
      fr: "SUNWARD SWDE200B",
      en: "SUNWARD SWDE200B",
      es: "SUNWARD SWDE200B",
    },
    shortTitle: {
      fr: "SWDE200B",
      en: "SWDE200B",
      es: "SWDE200B",
    },
    description: {
      fr: "Appareil de forage de surface robuste pour carrières et mines.",
      en: "Robust surface drilling rig for quarries and mines.",
      es: "Equipo de perforación de superficie robusto para canteras y minas.",
    },
    specs: {
      portee: {
        fr: "Diamètre du trou: 165-230 mm",
        en: "Hole diameter: 165-230 mm",
        es: "Diámetro del agujero: 165-230 mm",
      },
      pression: {
        fr: "Profondeur max: 36 m",
        en: "Max depth: 36 m",
        es: "Profundidad máx: 36 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SWDE200B"],
    image:
      "https://www.sunwardmachine.com/upload/product/1747623712559022.jpg.webp",
    featured: true,
    available: true,
  },
  {
    id: "sunward-swde165b",
    category: "forage",
    brand: "SUNWARD",
    title: {
      fr: "SUNWARD SWDE165B",
      en: "SUNWARD SWDE165B",
      es: "SUNWARD SWDE165B",
    },
    shortTitle: {
      fr: "SWDE165B",
      en: "SWDE165B",
      es: "SWDE165B",
    },
    description: {
      fr: "Appareil de forage de surface efficace pour diverses conditions de roche.",
      en: "Efficient surface drilling rig for various rock conditions.",
      es: "Equipo de perforación de superficie eficiente para diversas condiciones de roca.",
    },
    specs: {
      portee: {
        fr: "Diamètre du trou: 138-180 mm",
        en: "Hole diameter: 138-180 mm",
        es: "Diámetro del agujero: 138-180 mm",
      },
      pression: {
        fr: "Profondeur max: 36 m",
        en: "Max depth: 36 m",
        es: "Profundidad máx: 36 m",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SWDE165B"],
    image:
      "https://www.sunwardmachine.com/upload/product/1760063728162964.jpg.webp",
    featured: true,
    available: true,
  },
  {
    id: "sunward-swde138q",
    category: "forage",
    brand: "SUNWARD",
    title: {
      fr: "SUNWARD SWDE138Q",
      en: "SUNWARD SWDE138Q",
      es: "SUNWARD SWDE138Q",
    },
    shortTitle: {
      fr: "SWDE138Q",
      en: "SWDE138Q",
      es: "SWDE138Q",
    },
    description: {
      fr: "Appareil de forage léger et rapide pour travaux de forage rapides.",
      en: "Lightweight and fast drilling rig for quick drilling tasks.",
      es: "Equipo de perforación ligero y rápido para trabajos de perforación rápidos.",
    },
    specs: {
      portee: {
        fr: "Profondeur max: 21 m",
        en: "Max depth: 21 m",
        es: "Profundidad máx: 21 m",
      },
      pression: {
        fr: "Force d'avance max: 17 kN",
        en: "Max feed force: 17 kN",
        es: "Fuerza de avance máx: 17 kN",
      },
      sortie: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
    },
    models: ["SWDE138Q"],
    image:
      "https://www.sunwardmachine.com/upload/product/1761706685582800.png.webp",
    featured: true,
    available: true,
  },
  {
    id: "ajax-argo-2300",
    category: "malaxeurs",
    brand: "AJAX",
    title: {
      fr: "AJAX ARGO 2300",
      en: "AJAX ARGO 2300",
      es: "AJAX ARGO 2300",
    },
    shortTitle: {
      fr: "ARGO 2300",
      en: "ARGO 2300",
      es: "ARGO 2300",
    },
    description: {
      fr: "Un malaxeur autochargeant compact et agile, conçu pour les petits et moyens chantiers. Mélange précis et déplacements fluides sur site.",
      en: "A compact and agile self-loading concrete mixer, designed for small and medium job sites. Precise mixing and smooth on-site mobility.",
      es: "Una hormigonera autocargable compacta y ágil, diseñada para obras pequeñas y medianas. Mezcla precisa y movilidad fluida en obra.",
    },
    specs: {
      portee: {
        fr: "Capacité: 2.3 m³",
        en: "Capacity: 2.3 m³",
        es: "Capacidad: 2.3 m³",
      },
      pression: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
      sortie: {
        fr: "Transmission: 4x4",
        en: "Transmission: 4x4",
        es: "Transmisión: 4x4",
      },
    },
    models: ["ARGO 2300"],
    image: "/argo/argo2300.png",
    featured: true,
    available: true,
  },
  {
    id: "ajax-argo-4000",
    category: "malaxeurs",
    brand: "AJAX",
    title: {
      fr: "AJAX ARGO 4000",
      en: "AJAX ARGO 4000",
      es: "AJAX ARGO 4000",
    },
    shortTitle: {
      fr: "ARGO 4000",
      en: "ARGO 4000",
      es: "ARGO 4000",
    },
    description: {
      fr: "Une référence dans le monde des malaxeurs autochargeants. Il est conçu pour la précision, offrant un mélange homogène et une productivité accrue.",
      en: "A powerhouse in the world of self-loading concrete mixers. It is engineered for precision, offering a seamless mix and enhanced productivity.",
      es: "Una potencia en el mundo de las hormigoneras autocargables. Está diseñado para la precisión, ofreciendo una mezcla perfecta y una mayor productividad.",
    },
    specs: {
      portee: {
        fr: "Capacité: 4.0 m³",
        en: "Capacity: 4.0 m³",
        es: "Capacidad: 4.0 m³",
      },
      pression: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
      sortie: {
        fr: "Transmission: 4x4",
        en: "Transmission: 4x4",
        es: "Transmisión: 4x4",
      },
    },
    models: ["ARGO 4000"],
    image: "/argo/argo2300.png",
    featured: true,
    available: true,
  },
  {
    id: "ajax-argo-3000",
    category: "malaxeurs",
    brand: "AJAX",
    title: {
      fr: "AJAX ARGO 3000",
      en: "AJAX ARGO 3000",
      es: "AJAX ARGO 3000",
    },
    shortTitle: {
      fr: "ARGO 3000",
      en: "ARGO 3000",
      es: "ARGO 3000",
    },
    description: {
      fr: "Un concentré de puissance compact pour vos besoins en béton. Ce malaxeur autochargeant allie efficacité et agilité, assurant un mélange de béton fluide et précis.",
      en: "A compact powerhouse for your concrete needs. This self-loading concrete mixer combines efficiency with agility, ensuring smooth and precise concrete mixing.",
      es: "Una potencia compacta para sus necesidades de hormigón. Esta hormigonera autocargable combina eficiencia con agilidad, asegurando una mezcla de hormigón suave y precisa.",
    },
    specs: {
      portee: {
        fr: "Capacité: 3.0 m³",
        en: "Capacity: 3.0 m³",
        es: "Capacidad: 3.0 m³",
      },
      pression: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
      sortie: {
        fr: "Transmission: 4x4",
        en: "Transmission: 4x4",
        es: "Transmisión: 4x4",
      },
    },
    models: ["ARGO 3000"],
    image: "/argo/argo2300.png",
    featured: true,
    available: true,
  },
  {
    id: "ajax-argo-2500",
    category: "malaxeurs",
    brand: "AJAX",
    title: {
      fr: "AJAX ARGO 2500",
      en: "AJAX ARGO 2500",
      es: "AJAX ARGO 2500",
    },
    shortTitle: {
      fr: "ARGO 2500",
      en: "ARGO 2500",
      es: "ARGO 2500",
    },
    description: {
      fr: "AJAX présente l'ARGO 2500, un malaxeur autochargeant qui redéfinit la polyvalence. Avec des fonctionnalités avancées et une conception robuste, il assure un mélange de béton précis sur chaque projet.",
      en: "AJAX presents ARGO 2500, a Self-Loading Concrete Mixer that redefines versatility. With advanced features and a robust design, it ensures precision concrete mixing on every project.",
      es: "AJAX presenta ARGO 2500, una hormigonera autocargable que redefine la versatilidad. Con características avanzadas y un diseño robusto, garantiza una mezcla de hormigón precisa en cada proyecto.",
    },
    specs: {
      portee: {
        fr: "Capacité: 2.5 m³",
        en: "Capacity: 2.5 m³",
        es: "Capacidad: 2.5 m³",
      },
      pression: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
      sortie: {
        fr: "Transmission: 4x4",
        en: "Transmission: 4x4",
        es: "Transmisión: 4x4",
      },
    },
    models: ["ARGO 2500"],
    image: "/argo/argo2300.png",
    featured: true,
    available: true,
  },
  {
    id: "ajax-argo-2000",
    category: "malaxeurs",
    brand: "AJAX",
    title: {
      fr: "AJAX ARGO 2000",
      en: "AJAX ARGO 2000",
      es: "AJAX ARGO 2000",
    },
    shortTitle: {
      fr: "ARGO 2000",
      en: "ARGO 2000",
      es: "ARGO 2000",
    },
    description: {
      fr: "Le malaxeur autochargeant AJAX ARGO 2000 allie puissance et efficacité, ce qui en fait le choix idéal pour le mélange de béton sur site.",
      en: "AJAX's ARGO 2000 Self-Loading Concrete Mixer combines power and efficiency, making it the ideal choice for on-site concrete mixing.",
      es: "La hormigonera autocargable ARGO 2000 de AJAX combina potencia y eficiencia, lo que la convierte en la opción ideal para el mezclado de hormigón en el sitio.",
    },
    specs: {
      portee: {
        fr: "Capacité: 2.0 m³",
        en: "Capacity: 2.0 m³",
        es: "Capacidad: 2.0 m³",
      },
      pression: {
        fr: "Moteur: Diesel",
        en: "Engine: Diesel",
        es: "Motor: Diésel",
      },
      sortie: {
        fr: "Transmission: 4x4",
        en: "Transmission: 4x4",
        es: "Transmisión: 4x4",
      },
    },
    models: ["ARGO 2000"],
    image: "/argo/argo2300.png",
    featured: true,
    available: true,
  },
  {
    id: "toyota-transpalette-lwe250",
    category: "manutention",
    brand: "TOYOTA",
    title: {
      fr: "Toyota Transpalette électrique à conducteur accompagnant",
      en: "Toyota Pedestrian Pallet Truck",
      es: "Transpaleta eléctrica de conductor acompañante Toyota",
    },
    shortTitle: {
      fr: "Transpalette électrique à conducteur accompagnant",
      en: "Pedestrian Electric Pallet Truck",
      es: "Transpaleta eléctrica de conductor acompañante",
    },
    description: {
      fr: "Transpalette électrique à conducteur accompagnant pour les courtes distances de transport. Capacité de charge de 1,3 à 2,5 t.",
      en: "Pedestrian pallet truck for short transport distances. Load capacity from 1.3 to 2.5 t.",
      es: "Transpaleta eléctrica para distancias cortas de transporte. Capacidad de carga de 1,3 a 2,5 t.",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1.3 - 2.5 t",
        en: "Load capacity: 1.3 - 2.5 t",
        es: "Capacidad de carga: 1.3 - 2.5 t",
      },
      pression: {
        fr: "Hauteur de levage: Transpalette",
        en: "Lifting height: Pallet level",
        es: "Altura de elevación: Nivel paleta",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["LWE130", "LWE140", "LWE160", "LWE180", "LWE200", "LWE250"],
    image: "https://www.lectura-specs.com/models/renamed/orig/pedestrian-pallet-truck-lwe-250-bt.jpg",
    featured: false,
    available: true,
  },
  //TOYOTA PRODUCTS
  {
    id: "toyota-transpalette-lpe200",
    category: "manutention",
    brand: "TOYOTA",
    title: {
      fr: "Toyota Transpalette électrique autoporté",
      en: "Toyota Powered Pallet Truck with Platform",
      es: "Transpaleta eléctrica con plataforma Toyota",
    },
    shortTitle: {
      fr: "Transpalette électrique autoporté",
      en: "Rider Electric Pallet Truck",
      es: "Transpaleta eléctrica autopropulsada",
    },
    description: {
      fr: "Transpalette électrique autoporté idéal pour les longues distances de transport. Plateforme rabattable et barrières pliables. Capacité de charge de 2,0 à 2,5 t.",
      en: "Powered pallet truck with platform, ideal for long transport distances. Fold-out platform and folding guards. Load capacity from 2.0 to 2.5 t.",
      es: "Transpaleta eléctrica con plataforma, ideal para largas distancias. Plataforma y protecciones plegables. Capacidad de carga de 2,0 a 2,5 t.",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 2.0 - 2.5 t",
        en: "Load capacity: 2.0 - 2.5 t",
        es: "Capacidad de carga: 2.0 - 2.5 t",
      },
      pression: {
        fr: "Hauteur de levage: Transpalette",
        en: "Lifting height: Pallet level",
        es: "Altura de elevación: Nivel paleta",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["LPE200", "LPE220", "LPE250"],
    image:
      "https://www.toyotamaterialhandling.com.au/media/prslalii/levio_lpe220_600x600_2-3.png?width=800&height=800",
    featured: false,
    available: true,
  },
  {
    id: "toyota-gerbeur-swe",
    category: "manutention",
    brand: "TOYOTA",
    title: {
      fr: "Toyota Gerbeur électrique à conducteur accompagnant",
      en: "Toyota Pedestrian Stacker",
      es: "Apilador eléctrico de conductor acompañante Toyota",
    },
    shortTitle: {
      fr: "Gerbeur électrique à conducteur accompagnant",
      en: "Pedestrian Electric Stacker",
      es: "Apilador eléctrico de conductor acompañante",
    },
    description: {
      fr: "Gerbeur électrique à conducteur accompagnant pour les distances plus courtes. Hauteurs de levage jusqu'à 6 m. Capacité de charge de 0,8 à 2,0 t.",
      en: "Pedestrian stacker for shorter distances. Lift heights up to 6 m. Load capacity from 0.8 to 2.0 t.",
      es: "Apilador eléctrico para distancias cortas. Alturas de elevación hasta 6 m. Capacidad de carga de 0,8 a 2,0 t.",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 0.8 - 2.0 t",
        en: "Load capacity: 0.8 - 2.0 t",
        es: "Capacidad de carga: 0.8 - 2.0 t",
      },
      pression: {
        fr: "Hauteur de levage: jusqu'à 6 m",
        en: "Lifting height: up to 6 m",
        es: "Altura de elevación: hasta 6 m",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["SWE080L", "SWE100", "SWE120", "SWE140", "SWE160", "SWE200"],
    image: "/images/toyota/image-7.jpg",
    featured: false,
    available: true,
  },
  {
    id: "toyota-gerbeur-swe-autoporte",
    category: "manutention",
    brand: "TOYOTA",
    title: {
      fr: "Toyota Gerbeur électrique autoporté",
      en: "Toyota Powered Stacker with Platform",
      es: "Apilador eléctrico con plataforma Toyota",
    },
    shortTitle: {
      fr: "Gerbeur électrique autoporté",
      en: "Powered Stacker with Platform",
      es: "Apilador eléctrico con plataforma",
    },
    description: {
      fr: "Gerbeur électrique autoporté pour un transport rapide sur de longues distances. Plateforme rabattable et barrières pliables. Hauteurs de levage jusqu'à 6 m. Capacité de charge de 1,2 à 2,0 t.",
      en: "Powered stacker with platform for fast transport over long distances. Fold-out platform and folding guards. Lift heights up to 6 m. Load capacity from 1.2 to 2.0 t.",
      es: "Apilador eléctrico con plataforma para transporte rápido a largas distancias. Plataforma y protecciones plegables. Alturas de elevación hasta 6 m. Capacidad de carga de 1,2 a 2,0 t.",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1.2 - 2.0 t",
        en: "Load capacity: 1.2 - 2.0 t",
        es: "Capacidad de carga: 1.2 - 2.0 t",
      },
      pression: {
        fr: "Hauteur de levage: jusqu'à 6 m",
        en: "Lifting height: up to 6 m",
        es: "Altura de elevación: hasta 6 m",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["SRE135", "SRE160"],
    image: "/images/toyota/image-6.jpg",
    featured: false,
    available: true,
  },
  {
    id: "toyota-preparateur-ose120",
    category: "manutention",
    brand: "TOYOTA",
    title: {
      fr: "Toyota Préparateur de commandes au sol",
      en: "Toyota Low-Level Order Picker",
      es: "Preparador de pedidos a nivel del suelo Toyota",
    },
    shortTitle: {
      fr: "Préparateur de commandes au sol",
      en: "Low-Level Order Picker",
      es: "Preparador de pedidos a nivel del suelo",
    },
    description: {
      fr: "Prélèvement jusqu'à 2,8 m de hauteur. Capacité de charge de 1,0 à 2,5 t.",
      en: "Picking up to 2.8 m height. Load capacity from 1.0 to 2.5 t.",
      es: "Recogida hasta 2,8 m de altura. Capacidad de carga de 1,0 a 2,5 t.",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1.0 - 2.5 t",
        en: "Load capacity: 1.0 - 2.5 t",
        es: "Capacidad de carga: 1.0 - 2.5 t",
      },
      pression: {
        fr: "Hauteur de levage: jusqu'à 2.8 m",
        en: "Lifting height: up to 2.8 m",
        es: "Altura de elevación: hasta 2.8 m",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["OSE120", "OSE120P", "OSE180", "OSE250"],
    image: "/images/toyota/image-5.jpg",
    featured: false,
    available: true,
  },
  {
    id: "toyota-preparateur-ome100",
    category: "manutention",
    brand: "TOYOTA",
    title: {
      fr: "Toyota Préparateur de commandes de moyenne à grande hauteur",
      en: "Toyota Medium and High-Level Order Picker",
      es: "Preparador de pedidos de altura media a alta Toyota",
    },
    shortTitle: {
      fr: "Préparateur de commandes de moyenne à grande hauteur",
      en: "Medium and High-Level Order Picker",
      es: "Preparador de pedidos de altura media a alta",
    },
    description: {
      fr: "Prélèvement jusqu'à 12,1 m de hauteur. Plateformes élévatrices pour le prélèvement en hauteur. Capacité de charge de 1,0 à 1,2 t.",
      en: "Picking up to 12.1 m height. Elevating platforms for high-level picking. Load capacity from 1.0 to 1.2 t.",
      es: "Recogida hasta 12,1 m de altura. Plataformas elevadoras para recogida en altura. Capacidad de carga de 1,0 a 1,2 t.",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1.0 - 1.2 t",
        en: "Load capacity: 1.0 - 1.2 t",
        es: "Capacidad de carga: 1.0 - 1.2 t",
      },
      pression: {
        fr: "Hauteur de levage: jusqu'à 12.1 m",
        en: "Lifting height: up to 12.1 m",
        es: "Altura de elevación: hasta 12.1 m",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["OME100", "OME100N", "OME100W", "OME120"],
    image: "/images/toyota/image-4.jpg",
    featured: false,
    available: true,
  },
  {
    id: "toyota-tracteur-tracto",
    category: "manutention",
    brand: "TOYOTA",
    title: {
      fr: "Toyota Tracteur électrique",
      en: "Toyota Electric Towing Tractor",
      es: "Tractor de arrastre eléctrico Toyota",
    },
    shortTitle: {
      fr: "Tracteur électrique",
      en: "Electric Tractor",
      es: "Tractor eléctrico",
    },
    description: {
      fr: "Opérateur debout pour le transport horizontal. Capacité de charge de 1,0 à 6 t.",
      en: "Stand-in operator for horizontal transport. Towing capacity from 1.0 to 6 t.",
      es: "Operador de pie para transporte horizontal. Capacidad de arrastre de 1,0 a 6 t.",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1.0 - 6.0 t",
        en: "Load capacity: 1.0 - 6.0 t",
        es: "Capacidad de carga: 1.0 - 6.0 t",
      },
      pression: {
        fr: "Hauteur de levage: Transport horizontal",
        en: "Lifting height: Horizontal transport",
        es: "Altura de elevación: Transporte horizontal",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["Tracto S-series", "Tracto N-series"],
    image: "/images/toyota/image-3.jpg",
    featured: false,
    available: true,
  },
  {
    id: "toyota-reflex-standard",
    category: "manutention",
    brand: "TOYOTA",
    title: {
      fr: "Toyota Chariot à mât rétractable",
      en: "Toyota Reach Truck",
      es: "Carretilla retráctil Toyota",
    },
    shortTitle: {
      fr: "Chariot à mât rétractable",
      en: "Reach Truck",
      es: "Carretilla retráctil",
    },
    description: {
      fr: "Hauteurs de levage jusqu'à 13 m. Capacité de charge de 1,2 t à 2,5 t.",
      en: "Lift heights up to 13 m. Load capacity from 1.2 t to 2.5 t.",
      es: "Alturas de elevación hasta 13 m. Capacidad de carga de 1,2 t a 2,5 t.",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1.2 - 2.5 t",
        en: "Load capacity: 1.2 - 2.5 t",
        es: "Capacidad de carga: 1.2 - 2.5 t",
      },
      pression: {
        fr: "Hauteur de levage: jusqu'à 13 m",
        en: "Lifting height: up to 13 m",
        es: "Altura de elevación: hasta 13 m",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["RRE120", "RRE140", "RRE160", "RRE180", "RRE200", "RRE250"],
    image: "/images/toyota/image-2.jpg",
    featured: false,
    available: true,
  },
  // {
  //   id: "toyota-reflex-etroit",
  //   category: "chariots-elevateurs",
  //   brand: "TOYOTA",
  //   title: {
  //     fr: "Toyota Chariot à mât rétractable Châssis étroit",
  //     en: "Toyota Narrow Chassis Reach Truck",
  //     es: "Carretilla retráctil chasis estrecho Toyota",
  //   },
  //   shortTitle: {
  //     fr: "Chariot à mât rétractable étroit",
  //     en: "Narrow Reach Truck",
  //     es: "Carretilla retráctil estrecha",
  //   },
  //   description: {
  //     fr: "Châssis étroit pour espaces restreints. Hauteurs de levage jusqu'à 10 m. Capacité de charge de 1,2 t à 1,6 t.",
  //     en: "Narrow chassis for confined spaces. Lift heights up to 10 m. Load capacity from 1.2 t to 1.6 t.",
  //     es: "Chasis estrecho para espacios reducidos. Alturas de elevación hasta 10 m. Capacidad de carga de 1,2 t a 1,6 t.",
  //   },
  //   specs: {
  //     portee: {
  //       fr: "Levage: jusqu'à 10 m",
  //       en: "Lift: up to 10 m",
  //       es: "Elevación: hasta 10 m",
  //     },
  //     pression: {
  //       fr: "Capacité: 1.2 - 1.6 t",
  //       en: "Capacity: 1.2 - 1.6 t",
  //       es: "Capacidad: 1.2 - 1.6 t",
  //     },
  //     sortie: {
  //       fr: "Châssis: Étroit",
  //       en: "Chassis: Narrow",
  //       es: "Chasis: Estrecho",
  //     },
  //   },
  //   models: ["RRE120N", "RRE140N", "RRE160N"],
  //   image: "https://manuaf.com/wp-content/uploads/2022/02/Reach-truck.jpg",
  //   featured: false,
  //   available: true,
  // },
  {
    id: "toyota-reflex-in-out",
    category: "manutention",
    brand: "TOYOTA",
    title: {
      fr: "Toyota Chariot à mât rétractable Indoor/Outdoor",
      en: "Toyota Indoor/Outdoor Reach Truck",
      es: "Carretilla retráctil Interior/Exterior Toyota",
    },
    shortTitle: {
      fr: "Chariot à mât rétractable Indoor /Outdoor",
      en: "Indoor/Outdoor Reach Truck",
      es: "Carretilla retráctil Interior/Exterior",
    },
    description: {
      fr: "Conçu pour une utilisation mixte intérieur et extérieur. Équipé de pneus pleins souples. Hauteurs de levage jusqu'à 7,5 m. Capacité de charge 1,6 t.",
      en: "Designed for mixed indoor and outdoor use. Equipped with cushioned solid tires. Lift heights up to 7.5 m. Load capacity 1.6 t.",
      es: "Diseñada para uso mixto interior y exterior. Equipada con neumáticos macizos amortiguados. Alturas de elevación hasta 7,5 m. Capacidad de carga 1,6 t.",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1.6 t",
        en: "Load capacity: 1.6 t",
        es: "Capacidad de carga: 1.6 t",
      },
      pression: {
        fr: "Hauteur de levage: jusqu'à 7.5 m",
        en: "Lifting height: up to 7.5 m",
        es: "Altura de elevación: hasta 7.5 m",
      },
      sortie: {
        fr: "Équipé de pneus pleins souples",
        en: "Equipped with cushioned solid tires",
        es: "Equipada con neumáticos macizos amortiguados",
      },
    },
    models: ["RRE160R"],
    image:
      "https://www.toyotamaterialhandling.com.au/media/e5tlmhkd/reflex_rre160hr_600x600_1.png?width=800&height=800",
    featured: false,
    available: true,
  },
  {
    id: "toyota-vna-cabine-sol",
    category: "manutention",
    brand: "TOYOTA",
    title: {
      fr: "Toyota Chariot pour allées étroites avec cabine au sol",
      en: "Toyota VNA Truck - Down-platform",
      es: "Carretilla para pasillos estrechos (VNA) Toyota - Cabina al suelo",
    },
    shortTitle: {
      fr: "Chariot pour allées étroites avec cabine au sol",
      en: "VNA Truck Down-platform",
      es: "Carretilla VNA Cabina al suelo",
    },
    description: {
      fr: "Chariot pour allées étroites VNA avec cabine au sol et fourche tridirectionnelle. Conçu pour le filoguidage ou le guidage rail. Hauteurs de levage jusqu'à 11 m. Capacité de charge de 1,25 t à 1,5 t.",
      en: "Designed for wire or rail guidance. Lift heights up to 11 m. Load capacity from 1.25 t to 1.5 t.",
      es: "Diseñada para guiado por cable o raíl. Alturas de elevación hasta 11 m. Capacidad de carga de 1,25 t a 1,5 t.",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1.25 - 1.5 t",
        en: "Load capacity: 1.25 - 1.5 t",
        es: "Capacidad de carga: 1.25 - 1.5 t",
      },
      pression: {
        fr: "Hauteur de levage: jusqu'à 11 m",
        en: "Lifting height: up to 11 m",
        es: "Altura de elevación: hasta 11 m",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["VCE125", "VCE150"],
    image: "https://cdn.toyota-forklifts.eu/globalassets/inriver/resources/bt-vector-vre125_150-main.jpg?autorotate=true&format=webp&preset=Small",
    featured: false,
    available: true,
  },
  {
    id: "toyota-vna-cabine-montante",
    category: "manutention",
    brand: "TOYOTA",
    title: {
      fr: "Toyota Chariot cabine montante",
      en: "Toyota VNA Truck - Man-up",
      es: "Carretilla para pasillos estrechos (VNA) Toyota - Cabina móvil",
    },
    shortTitle: {
      fr: "Chariot cabine montante",
      en: "VNA Truck Man-up",
      es: "Carretilla VNA Cabina móvil",
    },
    description: {
      fr: "Châssis articulé. Hauteurs de levage jusqu'à 16,8 m. Conçu pour le filoguidage ou le guidage rail. Capacité de charge de 1 t à 1,5 t.",
      en: "Articulated chassis. Lift heights up to 16.8 m. Designed for wire or rail guidance. Load capacity from 1 t to 1.5 t.",
      es: "Chasis articulado. Alturas de elevación hasta 16,8 m. Diseñada para guiado por cable o raíl. Capacidad de carga de 1 t a 1,5 t.",
    },
    specs: {
      portee: {
        fr: "Capacité de charge: 1.0 - 1.5 t",
        en: "Load capacity: 1.0 - 1.5 t",
        es: "Capacidad de carga: 1.0 - 1.5 t",
      },
      pression: {
        fr: "Hauteur de levage: jusqu'à 16.8 m",
        en: "Lifting height: up to 16.8 m",
        es: "Altura de elevación: hasta 16.8 m",
      },
      sortie: {
        fr: "Moteur: Électrique",
        en: "Engine: Electric",
        es: "Motor: Eléctrico",
      },
    },
    models: ["VCE100", "VCE120", "VCE150A"],
    image: "https://www.toyotawarehousesolutions.co.th/wp-content/uploads/2023/12/vce150a_3_4_front3.webp",
    featured: false,
    available: true,
  },

  // ─── ATOX ─── Rayonnage & Solutions de stockage ───────────────────────────
  {
    id: "atox-rayonnage-autoportant",
    category: "rayonnage-stockage",
    brand: "ATOX",
    title: {
      fr: "ATOX RAYONNAGE AUTOPORTANT",
      en: "ATOX SELF-SUPPORTED RACKING",
      es: "ATOX ESTANTERÍA AUTOPORTANTE",
    },
    shortTitle: {
      fr: "Rayonnage Autoportant",
      en: "Self-Supported Racking",
      es: "Estantería Autoportante",
    },
    description: {
      fr: "Le système autoportant offre une solution de stockage performante, combinant capacité élevée et efficacité opérationnelle. Pas besoin de construction préalable de bâtiment.",
      en: "The self-supported system offers a high-performance storage solution combining high capacity and operational efficiency. No prior building construction needed.",
      es: "El sistema autoportante ofrece una solución de almacenamiento de alto rendimiento combinando alta capacidad y eficiencia operativa. Sin necesidad de construcción previa.",
    },
    specs: {
      portee: { fr: "Grande capacité exploitant la hauteur disponible", en: "Large capacity using available height", es: "Gran capacidad aprovechando la altura disponible" },
      pression: { fr: "Sans construction préalable de bâtiment", en: "No prior building construction", es: "Sin construcción previa de edificio" },
      sortie: { fr: "Application: Entrepôts industriels", en: "Application: Industrial warehouses", es: "Aplicación: Almacenes industriales" },
    },
    models: ["Rayonnage Autoportant ATOX"],
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1773062713/Sans_titre_-_1-02_plyema.png",
    featured: true,
    available: true,
  },
  {
    id: "atox-rayonnage-conventionnel",
    category: "rayonnage-stockage",
    brand: "ATOX",
    title: {
      fr: "ATOX RAYONNAGE CONVENTIONNEL",
      en: "ATOX CONVENTIONAL PALLET RACKING",
      es: "ATOX ESTANTERÍA CONVENCIONAL",
    },
    shortTitle: {
      fr: "Rayonnage Conventionnel",
      en: "Conventional Pallet Racking",
      es: "Estantería Convencional",
    },
    description: {
      fr: "Rayonnage pour palettes en simple profondeur, offrant un accès direct à chaque unité de charge. Flexibilité et sécurité maximales, adaptable à tous types de palettes.",
      en: "Single-depth pallet racking offering direct access to each load unit. Maximum flexibility and safety, adaptable to all pallet types.",
      es: "Estantería de palés en profundidad simple con acceso directo a cada unidad de carga. Máxima flexibilidad y seguridad, adaptable a todos los tipos de palés.",
    },
    specs: {
      portee: { fr: "Accès direct à chaque palette", en: "Direct access to each pallet", es: "Acceso directo a cada palé" },
      pression: { fr: "Sélectivité maximale des références", en: "Maximum reference selectivity", es: "Selectividad máxima de referencias" },
      sortie: { fr: "Application: Entrepôts logistiques", en: "Application: Logistics warehouses", es: "Aplicación: Almacenes logísticos" },
    },
    models: ["Rayonnage Conventionnel ATOX"],
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1773062713/Sans_titre_-_1-03_fdgabx.png",
    featured: true,
    available: true,
  },
  {
    id: "atox-rayonnage-par-accumulation",
    category: "rayonnage-stockage",
    brand: "ATOX",
    title: {
      fr: "ATOX RAYONNAGE PAR ACCUMULATION",
      en: "ATOX DRIVE-IN RACKING",
      es: "ATOX ESTANTERÍA POR ACUMULACIÓN",
    },
    shortTitle: {
      fr: "Rayonnage par Accumulation",
      en: "Drive-In Racking",
      es: "Estantería por Acumulación",
    },
    description: {
      fr: "Système de stockage maximisant l'espace en supprimant les allées, avec un gain jusqu'à 85 % de surface. Idéal pour le stockage de produits homogènes et grandes séries.",
      en: "Storage system maximizing space by eliminating aisles, saving up to 85% of floor area. Ideal for homogeneous products and large production runs.",
      es: "Sistema de almacenamiento que maximiza el espacio eliminando pasillos, con ahorro de hasta el 85% de superficie. Ideal para productos homogéneos y grandes series.",
    },
    specs: {
      portee: { fr: "Gain d'espace jusqu'à 85 %", en: "Space saving up to 85%", es: "Ahorro de espacio hasta el 85%" },
      pression: { fr: "Stockage en profondeur multiple", en: "Multi-depth storage", es: "Almacenamiento en profundidad múltiple" },
      sortie: { fr: "Application: Stockage haute densité", en: "Application: High-density storage", es: "Aplicación: Almacenamiento de alta densidad" },
    },
    models: ["Rayonnage Accumulation ATOX"],
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1773062665/Sans_titre_-_1-06_hcbrms.png",
    featured: false,
    available: true,
  },
  {
    id: "atox-rayonnage-semi-lourd",
    category: "rayonnage-stockage",
    brand: "ATOX",
    title: {
      fr: "ATOX RAYONNAGE SEMI-LOURD",
      en: "ATOX MEDIUM-HEAVY DUTY RACKING",
      es: "ATOX ESTANTERÍA SEMIPESADA",
    },
    shortTitle: {
      fr: "Rayonnage Semi-Lourd",
      en: "Medium-Heavy Duty Racking",
      es: "Estantería Semipesada",
    },
    description: {
      fr: "Rayonnage pour produits de poids et dimensions moyens à élevés avec chargement manuel sur plusieurs niveaux. Niveaux réglables tous les 50 mm pour une grande flexibilité.",
      en: "Racking for medium to heavy weight and dimension products with manual loading on multiple levels. Levels adjustable every 50 mm for maximum flexibility.",
      es: "Estantería para productos de peso y dimensiones medias a altas con carga manual en múltiples niveles. Niveles ajustables cada 50 mm para máxima flexibilidad.",
    },
    specs: {
      portee: { fr: "Niveaux réglables tous les 50 mm", en: "Levels adjustable every 50 mm", es: "Niveles ajustables cada 50 mm" },
      pression: { fr: "Chargement manuel multi-niveaux", en: "Multi-level manual loading", es: "Carga manual multinivel" },
      sortie: { fr: "Application: Charges moyennes et lourdes", en: "Application: Medium and heavy loads", es: "Aplicación: Cargas medias y pesadas" },
    },
    models: ["Rayonnage Semi-Lourd ATOX"],
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1773062665/Sans_titre_-_1-07_wmxbro.png",
    featured: false,
    available: true,
  },
  {
    id: "atox-rayonnage-dynamique",
    category: "rayonnage-stockage",
    brand: "ATOX",
    title: {
      fr: "ATOX RAYONNAGE DYNAMIQUE",
      en: "ATOX DYNAMIC RACKING",
      es: "ATOX ESTANTERÍA DINÁMICA",
    },
    shortTitle: {
      fr: "Rayonnage Dynamique",
      en: "Dynamic Racking",
      es: "Estantería Dinámica",
    },
    description: {
      fr: "Rayonnages dynamiques pour palettes avec chemins à rouleaux légèrement inclinés permettant aux charges de se déplacer par gravité. Rotation FIFO garantie.",
      en: "Dynamic pallet racking with slightly inclined roller tracks allowing loads to move by gravity. Guaranteed FIFO rotation.",
      es: "Estanterías dinámicas para palés con caminos de rodillos ligeramente inclinados que permiten el movimiento de cargas por gravedad. Rotación FIFO garantizada.",
    },
    specs: {
      portee: { fr: "Rotation FIFO garantie", en: "Guaranteed FIFO rotation", es: "Rotación FIFO garantizada" },
      pression: { fr: "Flux par gravité, sans allées supplémentaires", en: "Gravity flow, no additional aisles", es: "Flujo por gravedad, sin pasillos adicionales" },
      sortie: { fr: "Application: Produits périssables", en: "Application: Perishable products", es: "Aplicación: Productos perecederos" },
    },
    models: ["Rayonnage Dynamique ATOX"],
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1773062666/Sans_titre_-_1-09_tencoe.png",
    featured: false,
    available: true,
  },
  {
    id: "atox-passerelle",
    category: "rayonnage-stockage",
    brand: "ATOX",
    title: {
      fr: "ATOX PASSERELLE DE STOCKAGE",
      en: "ATOX MEZZANINE WALKWAY",
      es: "ATOX PASARELA DE ALMACENAMIENTO",
    },
    shortTitle: {
      fr: "Passerelle de Stockage",
      en: "Mezzanine Walkway",
      es: "Pasarela de Almacenamiento",
    },
    description: {
      fr: "Système de stockage optimisant la hauteur de l'entrepôt. Des passerelles surélevées reliées par des escaliers permettent un accès facile à tous les niveaux sans matériel de levage.",
      en: "Storage system optimizing warehouse height. Elevated walkways connected by stairs allow easy access to all levels without lifting equipment.",
      es: "Sistema de almacenamiento que optimiza la altura del almacén. Pasarelas elevadas conectadas por escaleras permiten acceso fácil a todos los niveles sin equipo de elevación.",
    },
    specs: {
      portee: { fr: "Accès direct à chaque niveau sans matériel de levage", en: "Direct access to each level without lifting equipment", es: "Acceso directo a cada nivel sin equipo de elevación" },
      pression: { fr: "Modulaire : facile à étendre ou reconfigurer", en: "Modular: easy to extend or reconfigure", es: "Modular: fácil de ampliar o reconfigurar" },
      sortie: { fr: "Application: Entrepôts multi-niveaux", en: "Application: Multi-level warehouses", es: "Aplicación: Almacenes multinivel" },
    },
    models: ["Passerelle ATOX"],
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1773062669/Sans_titre_-_1-14_txcckx.png",
    featured: false,
    available: true,
  },
  {
    id: "atox-mezzanine",
    category: "rayonnage-stockage",
    brand: "ATOX",
    title: {
      fr: "ATOX MEZZANINE MODULAIRE",
      en: "ATOX MODULAR MEZZANINE",
      es: "ATOX ALTILLO MODULAR",
    },
    shortTitle: {
      fr: "Mezzanine Modulaire",
      en: "Modular Mezzanine",
      es: "Altillo Modular",
    },
    description: {
      fr: "Structure modulaire sur mesure exploitant pleinement la hauteur de l'entrepôt, doublant ou triplant l'espace disponible. Facile à monter, sans travaux de génie civil.",
      en: "Custom modular structure fully utilizing warehouse height, doubling or tripling available space. Easy to assemble with no civil engineering work required.",
      es: "Estructura modular a medida que aprovecha completamente la altura del almacén, duplicando o triplicando el espacio disponible. Fácil de montar sin obras de ingeniería civil.",
    },
    specs: {
      portee: { fr: "Double ou triple l'espace disponible", en: "Doubles or triples available space", es: "Duplica o triplica el espacio disponible" },
      pression: { fr: "Sans travaux de génie civil", en: "No civil engineering work", es: "Sin obras de ingeniería civil" },
      sortie: { fr: "Application: Bureaux et entrepôts", en: "Application: Offices and warehouses", es: "Aplicación: Oficinas y almacenes" },
    },
    models: ["Mezzanine ATOX"],
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1773062677/Sans_titre_-_1-16_k7paay.png",
    featured: false,
    available: true,
  },
  {
    id: "atox-radio-shuttle",
    category: "rayonnage-stockage",
    brand: "ATOX",
    title: {
      fr: "ATOX RADIO SHUTTLE",
      en: "ATOX RADIO SHUTTLE",
      es: "ATOX RADIO SHUTTLE",
    },
    shortTitle: {
      fr: "Radio Shuttle ATOX",
      en: "Radio Shuttle ATOX",
      es: "Radio Shuttle ATOX",
    },
    description: {
      fr: "Système automatisé pour le stockage de palettes, piloté à distance et conçu pour des opérations rapides et sécurisées. Charge jusqu'à 1 200 kg, fonctionne en LIFO ou FIFO.",
      en: "Automated pallet storage system, remotely controlled for fast and safe operations. Capacity up to 1,200 kg, operates in LIFO or FIFO mode.",
      es: "Sistema automatizado de almacenamiento de palés, controlado a distancia para operaciones rápidas y seguras. Capacidad hasta 1.200 kg, funciona en modo LIFO o FIFO.",
    },
    specs: {
      portee: { fr: "Capacité: jusqu'à 1 200 kg", en: "Capacity: up to 1,200 kg", es: "Capacidad: hasta 1.200 kg" },
      pression: { fr: "Pilotage à distance, mode LIFO ou FIFO", en: "Remote control, LIFO or FIFO mode", es: "Control remoto, modo LIFO o FIFO" },
      sortie: { fr: "Application: Stockage compact automatisé", en: "Application: Automated compact storage", es: "Aplicación: Almacenamiento compacto automatizado" },
    },
    models: ["Radio Shuttle ATOX"],
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1773062712/Sans_titre_-_1-18_otwy8d.png",
    featured: true,
    available: true,
  },
  {
    id: "atox-convoyeurs-a-rouleaux",
    category: "rayonnage-stockage",
    brand: "ATOX",
    title: {
      fr: "ATOX CONVOYEURS À ROULEAUX",
      en: "ATOX ROLLER CONVEYORS",
      es: "ATOX TRANSPORTADORES DE RODILLOS",
    },
    shortTitle: {
      fr: "Convoyeurs à Rouleaux",
      en: "Roller Conveyors",
      es: "Transportadores de Rodillos",
    },
    description: {
      fr: "Convoyeurs à rouleaux ATOX offrant une manutention rapide et flexible, avec sections motorisées et libres, adaptées aux trajets droits, courbes ou en pente.",
      en: "ATOX roller conveyors offering fast and flexible handling, with motorized and free sections, suitable for straight, curved or inclined paths.",
      es: "Transportadores de rodillos ATOX que ofrecen manipulación rápida y flexible, con secciones motorizadas y libres, adecuadas para trayectos rectos, curvos o inclinados.",
    },
    specs: {
      portee: { fr: "Sections motorisées et libres", en: "Motorized and free sections", es: "Secciones motorizadas y libres" },
      pression: { fr: "Trajets droits, courbes ou en pente", en: "Straight, curved or inclined paths", es: "Trayectos rectos, curvos o inclinados" },
      sortie: { fr: "Application: Logistique & automatisation", en: "Application: Logistics & automation", es: "Aplicación: Logística y automatización" },
    },
    models: ["Convoyeur à Rouleaux ATOX"],
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1773062665/Sans_titre_-_1-23_kyn0xs.png",
    featured: false,
    available: true,
  },
  {
    id: "atox-systemes-pick-to-light",
    category: "rayonnage-stockage",
    brand: "ATOX",
    title: {
      fr: "ATOX SYSTÈMES PICK-TO-LIGHT",
      en: "ATOX PICK-TO-LIGHT SYSTEMS",
      es: "ATOX SISTEMAS PICK-TO-LIGHT",
    },
    shortTitle: {
      fr: "Systèmes Pick-to-Light",
      en: "Pick-to-Light Systems",
      es: "Sistemas Pick-to-Light",
    },
    description: {
      fr: "Les systèmes pick-to-light et put-to-light optimisent les flux de travail en entrepôt pour une préparation rapide et précise des commandes avec réduction des erreurs.",
      en: "Pick-to-light and put-to-light systems optimize warehouse workflows for fast and accurate order picking with reduced errors.",
      es: "Los sistemas pick-to-light y put-to-light optimizan los flujos de trabajo en almacén para una preparación de pedidos rápida y precisa con reducción de errores.",
    },
    specs: {
      portee: { fr: "Précision maximale des préparations", en: "Maximum picking accuracy", es: "Máxima precisión en la preparación" },
      pression: { fr: "Réduction des erreurs de picking", en: "Reduced picking errors", es: "Reducción de errores de picking" },
      sortie: { fr: "Application: Entrepôts logistiques", en: "Application: Logistics warehouses", es: "Aplicación: Almacenes logísticos" },
    },
    models: ["Pick-to-Light ATOX", "Put-to-Light ATOX"],
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1773062663/Sans_titre_-_1-21_bcxjp2.png",
    featured: false,
    available: true,
  },
];

// Merge existing products with scraped products
export const products: Product[] = [
  ...existingProducts.filter(
    (product) =>
      product.brand !== "SANY" &&
      (product.brand !== "FABO" || product.category === "centrales-beton") &&
      product.brand !== "SUNWARD"
  ),
  ...sanySeriesProducts,
  ...faboScrapedProducts,
  ...faboOfficialMobileProducts,
  ...sunwardScrapedProducts,
];
export const categories: Category[] = [
  {
    id: "pompes-beton",
    name: {
      fr: "Pompes à Béton",
      en: "Concrete Pumps",
      es: "Bombas de Hormigón",
    },
    description: {
      fr: "Pompes à béton montées sur camion et stationnaires pour tous types de projets",
      en: "Truck-mounted and stationary concrete pumps for all project types",
      es: "Bombas de hormigón montadas en camión y estacionarias para todo tipo de proyectos",
    },
  },
  {
    id: "beton",
    name: {
      fr: "Équipements Béton",
      en: "Concrete Equipment",
      es: "Equipos de Hormigón",
    },
    description: {
      fr: "Camions-toupies et équipements de transport de béton frais",
      en: "Mixer trucks and fresh concrete transport equipment",
      es: "Camiones hormigonera y equipos de transporte de hormigón fresco",
    },
  },
  {
    id: "excavation",
    name: { fr: "Excavation", en: "Excavation", es: "Excavación" },
    description: {
      fr: "Excavatrices hydrauliques pour terrassement et démolition",
      en: "Hydraulic excavators for earthmoving and demolition",
      es: "Excavadoras hidráulicas para movimiento de tierras y demolición",
    },
  },
  {
    id: "chariots-elevateurs",
    name: {
      fr: "Chariots Élévateurs",
      en: "Forklifts",
      es: "Carretillas Elevadoras",
    },
    description: {
      fr: "Chariots élévateurs électriques et thermiques pour manutention",
      en: "Electric and thermal forklifts for material handling",
      es: "Carretillas elevadoras eléctricas y térmicas para manipulación",
    },
  },
  {
    id: "grues",
    name: { fr: "Grues", en: "Cranes", es: "Grúas" },
    description: {
      fr: "Grues mobiles, tout-terrain, sur chenilles et à tour pour levage de charges lourdes",
      en: "Mobile, all-terrain, crawler and tower cranes for heavy lifting",
      es: "Grúas móviles, todoterreno, sobre orugas y torre para elevación de cargas pesadas",
    },
  },
  {
    id: "terrassement",
    name: {
      fr: "Terrassement & Routes",
      en: "Earthmoving & Roads",
      es: "Movimiento de Tierras & Carreteras",
    },
    description: {
      fr: "Compacteurs, niveleuses, finisseurs et fraiseuses pour travaux routiers",
      en: "Compactors, graders, pavers and milling machines for road works",
      es: "Compactadores, motoniveladoras, pavimentadoras y fresadoras para obras viales",
    },
  },
  {
    id: "transport",
    name: { fr: "Transport", en: "Transport", es: "Transporte" },
    description: {
      fr: "Camions bennes et camions miniers pour transport de matériaux",
      en: "Dump trucks and mining trucks for material transport",
      es: "Camiones volquete y camiones mineros para transporte de materiales",
    },
  },
  {
    id: "manutention",
    name: { fr: "Manutention", en: "Material Handling", es: "Manipulación" },
    description: {
      fr: "Chargeuses et équipements de manutention légère et transport",
      en: "Loaders and light handling and transport equipment",
      es: "Cargadoras y equipos de manipulación ligera y transporte",
    },
  },
  {
    id: "solutions-automatisees",
    name: {
      fr: "Solutions Automatisées",
      en: "Automated Solutions",
      es: "Soluciones Automatizadas",
    },
    description: {
      fr: "Chariots AGV Autopilot Toyota pour l'automatisation des opérations répétitives de manutention en entrepôt",
      en: "Toyota Autopilot AGV trucks for automating repetitive warehouse material handling operations",
      es: "Carretillas AGV Autopilot Toyota para automatizar las operaciones repetitivas de manipulación en almacén",
    },
  },
  {
    id: "manutention-portuaire",
    name: {
      fr: "Manutention Portuaire",
      en: "Port Material Handling",
      es: "Manipulación Portuaria",
    },
    description: {
      fr: "Reach stackers, grues portuaires, portiques à conteneurs, tracteurs de terminal et manutentionnaires de conteneurs vides",
      en: "Reach stackers, port cranes, container gantry cranes, terminal tractors and empty container handlers",
      es: "Reach stackers, grúas portuarias, grúas pórtico de contenedores, tractores de terminal y manipuladores de contenedores vacíos",
    },
  },
  // ── 2. Centrale à Béton ──
  {
    id: "centrale-a-beton",
    name: {
      fr: "Centrale à Béton",
      en: "Concrete Batching Plant",
      es: "Planta de Hormigón",
    },
    description: {
      fr: "Centrales à béton fixes et mobiles pour la production de béton.",
      en: "Fixed and mobile concrete batching plants for concrete production.",
      es: "Plantas de hormigón fijas y móviles para la producción de hormigón.",
    },
  },
  {
    id: "centrales-beton-mobiles",
    parentId: "centrale-a-beton",
    name: {
      fr: "Centrales à Béton Mobiles",
      en: "Mobile Concrete Batching Plants",
      es: "Plantas de Hormigón Móviles",
    },
    description: {
      fr: "Centrales à béton mobiles Turbomix et Minimix pour production de béton sur site.",
      en: "Turbomix and Minimix mobile concrete batching plants for on-site concrete production.",
      es: "Plantas de hormigón móviles Turbomix y Minimix para producción de hormigón en obra.",
    },
  },
  {
    id: "centrales-beton-fixes",
    parentId: "centrale-a-beton",
    name: {
      fr: "Centrales à Béton Fixes",
      en: "Stationary Concrete Batching Plants",
      es: "Plantas de Hormigón Fijas",
    },
    description: {
      fr: "Centrales à béton fixes Powermix pour production de béton en usine.",
      en: "Powermix stationary concrete batching plants for factory concrete production.",
      es: "Plantas de hormigón fijas Powermix para producción de hormigón en fábrica.",
    },
  },
  {
    id: "centrales-enrobage",
    name: {
      fr: "Centrales d’enrobage",
      en: "Asphalt Plants",
      es: "Plantas de Asfalto",
    },
    description: {
      fr: "Centrales d’enrobage pour la production de mélanges bitumineux.",
      en: "Asphalt plants for bituminous mix production.",
      es: "Plantas de asfalto para la producción de mezclas bituminosas.",
    },
  },
  {
    id: "malaxeurs",
    name: { fr: "Malaxeurs", en: "Mixers", es: "Mezcladoras" },
    description: {
      fr: "Malaxeurs autochargeants pour béton et mortier",
      en: "Self-loading mixers for concrete and mortar",
      es: "Mezcladoras autocargantes para hormigón y mortero",
    },
  },
  // ── 1. Équipement de Concassage ──
  {
    id: "equipement-concassage",
    name: {
      fr: "Équipement de Concassage",
      en: "Crushing Equipment",
      es: "Equipos de Trituración",
    },
    description: {
      fr: "Équipements de concassage mobiles et fixes pour le traitement des agrégats.",
      en: "Mobile and stationary crushing equipment for aggregate processing.",
      es: "Equipos de trituración móviles y fijos para el procesamiento de áridos.",
    },
  },
  {
    id: "concassage-mobile",
    parentId: "equipement-concassage",
    name: {
      fr: "Concasseurs Mobiles",
      en: "Mobile Crushers",
      es: "Trituradoras Móviles",
    },
    description: {
      fr: "Concasseurs mobiles pour le concassage en tout terrain.",
      en: "Mobile crushers for all-terrain crushing operations.",
      es: "Trituradoras móviles para operaciones de trituración en todo terreno.",
    },
  },
  {
    id: "concasseurs-mobiles-chenilles",
    parentId: "concassage-mobile",
    name: {
      fr: "Concasseurs Mobiles sur Chenilles",
      en: "Tracked Mobile Crushers",
      es: "Trituradoras Móviles sobre Orugas",
    },
    description: {
      fr: "Concasseurs mobiles sur chenilles pour un déplacement facile sur chantier.",
      en: "Tracked mobile crushers for easy on-site movement.",
      es: "Trituradoras móviles sobre orugas para fácil desplazamiento en obra.",
    },
  },
  {
    id: "cribles-vibrants-mobile-sur-chenilles",
    parentId: "concassage-mobile",
    name: {
      fr: "Cribles Vibrants Mobile sur Chenilles",
      en: "Mobile Tracked Vibrating Screens",
      es: "Cribas Vibratorias Móviles sobre Orugas",
    },
    description: {
      fr: "Cribles vibrants mobiles sur chenilles pour le criblage des agrégats.",
      en: "Mobile tracked vibrating screens for aggregate screening.",
      es: "Cribas vibratorias móviles sobre orugas para cribado de áridos.",
    },
  },
  {
    id: "crible-de-scalpeur-sur-chenilles",
    parentId: "concassage-mobile",
    name: {
      fr: "FTB 15-50 Crible De Scalpeur Sur Chenilles",
      en: "FTB 15-50 Tracked Scalper Screen",
      es: "FTB 15-50 Criba Scalper sobre Orugas",
    },
    description: {
      fr: "Crible scalpeur sur chenilles pour le précriblage mobile.",
      en: "Tracked scalper screen for mobile pre-screening.",
      es: "Criba scalper sobre orugas para precribado móvil.",
    },
  },
  {
    id: "concasseur-mobile-a-percussion",
    parentId: "concassage-mobile",
    name: {
      fr: "Concasseur Mobile a Percussion",
      en: "Mobile Impact Crusher",
      es: "Trituradora Móvil de Impacto",
    },
    description: {
      fr: "Concasseurs mobiles à percussion FABO pour concassage primaire et secondaire.",
      en: "FABO mobile impact crushers for primary and secondary crushing.",
      es: "Trituradoras móviles de impacto FABO para trituración primaria y secundaria.",
    },
  },
  {
    id: "machines-de-fabrication-de-sable-mobile",
    parentId: "concassage-mobile",
    name: {
      fr: "Machines de Fabrication de Sable Mobile",
      en: "Mobile Sand Making Machines",
      es: "Máquinas Móviles de Fabricación de Arena",
    },
    description: {
      fr: "Machines mobiles pour la production de sable concassé.",
      en: "Mobile machines for crushed sand production.",
      es: "Máquinas móviles para producción de arena triturada.",
    },
  },
  {
    id: "concasseurs-mobiles-et-criblage-et-lavage",
    parentId: "concassage-mobile",
    name: {
      fr: "Concasseurs Mobiles et Criblage et Lavage",
      en: "Mobile Crushers, Screening and Washing",
      es: "Trituradoras Móviles, Cribado y Lavado",
    },
    description: {
      fr: "Installations mobiles combinant concassage, criblage et lavage.",
      en: "Mobile plants combining crushing, screening and washing.",
      es: "Instalaciones móviles que combinan trituración, cribado y lavado.",
    },
  },
  {
    id: "installations-mobiles-de-criblage-et-de-lavage",
    parentId: "concassage-mobile",
    name: {
      fr: "Installations mobiles de criblage et de lavage",
      en: "Mobile Screening and Washing Plants",
      es: "Instalaciones Móviles de Cribado y Lavado",
    },
    description: {
      fr: "Installations mobiles pour le criblage et le lavage des matériaux.",
      en: "Mobile plants for material screening and washing.",
      es: "Instalaciones móviles para cribado y lavado de materiales.",
    },
  },
  {
    id: "usine-de-concassage-primaire-mobile",
    parentId: "concassage-mobile",
    name: {
      fr: "Usine de Concassage Primaire Mobile",
      en: "Mobile Primary Crushing Plant",
      es: "Planta Móvil de Trituración Primaria",
    },
    description: {
      fr: "Usines mobiles de concassage primaire FABO.",
      en: "FABO mobile primary crushing plants.",
      es: "Plantas móviles FABO de trituración primaria.",
    },
  },
  {
    id: "usine-de-concassage-et-criblage-secondaire",
    parentId: "concassage-mobile",
    name: {
      fr: "Usine de Concassage et Criblage Secondaire",
      en: "Mobile Secondary Crushing and Screening Plant",
      es: "Planta Móvil de Trituración y Cribado Secundaria",
    },
    description: {
      fr: "Usines mobiles de concassage et criblage secondaire.",
      en: "Mobile secondary crushing and screening plants.",
      es: "Plantas móviles de trituración y cribado secundario.",
    },
  },
  {
    id: "installation-de-concassage-a-percussion-mobile-a-arbre-vertical",
    parentId: "concassage-mobile",
    name: {
      fr: "Installation de Concassage a Percussion Mobile a-Arbre Vertical",
      en: "Mobile Vertical Shaft Impact Crushing Plant",
      es: "Planta Móvil de Trituración de Impacto de Eje Vertical",
    },
    description: {
      fr: "Installations mobiles VSI pour concassage à arbre vertical.",
      en: "Mobile VSI plants for vertical shaft impact crushing.",
      es: "Instalaciones móviles VSI para trituración de eje vertical.",
    },
  },
  {
    id: "concasseur-a-machoire-mobile-type-container",
    parentId: "concassage-mobile",
    name: {
      fr: "Concasseur a Machoire Mobile Type Container",
      en: "Container Type Mobile Jaw Crusher",
      es: "Trituradora Móvil de Mandíbulas Tipo Contenedor",
    },
    description: {
      fr: "Concasseur mobile à mâchoire de type container.",
      en: "Container type mobile jaw crusher.",
      es: "Trituradora móvil de mandíbulas tipo contenedor.",
    },
  },
  {
    id: "concassage-fixe",
    parentId: "equipement-concassage",
    name: {
      fr: "Concassage Fixe",
      en: "Stationary Crushing",
      es: "Trituración Fija",
    },
    description: {
      fr: "Stations de concassage fixes pour installations permanentes.",
      en: "Stationary crushing plants for permanent installations.",
      es: "Plantas de trituración fijas para instalaciones permanentes.",
    },
  },
  {
    id: "concasseurs-a-machoires",
    parentId: "concassage-fixe",
    name: {
      fr: "Concasseurs à Mâchoires",
      en: "Jaw Crushers",
      es: "Trituradoras de Mandíbulas",
    },
    description: {
      fr: "Concasseurs à mâchoires pour le concassage primaire de roches dures.",
      en: "Jaw crushers for primary crushing of hard rocks.",
      es: "Trituradoras de mandíbulas para la trituración primaria de rocas duras.",
    },
  },
  {
    id: "concasseur-percussion-primaire",
    parentId: "concassage-fixe",
    name: {
      fr: "Concasseur à Percussion Primaire",
      en: "Primary Impact Crusher",
      es: "Trituradora de Impacto Primaria",
    },
    description: {
      fr: "Concasseurs à percussion primaire pour le traitement initial des matériaux.",
      en: "Primary impact crushers for initial material processing.",
      es: "Trituradoras de impacto primarias para el procesamiento inicial de materiales.",
    },
  },
  {
    id: "broyeur-percussion-secondaire-dmk",
    parentId: "concassage-fixe",
    name: {
      fr: "Broyeur à Percussion Secondaire DMK",
      en: "DMK Secondary Impact Crusher",
      es: "Trituradora de Impacto Secundaria DMK",
    },
    description: {
      fr: "Broyeurs à percussion secondaire DMK pour le concassage de second étage.",
      en: "DMK secondary impact crushers for second-stage crushing.",
      es: "Trituradoras de impacto secundarias DMK para la trituración de segunda etapa.",
    },
  },
  {
    id: "concasseurs-percussion-arbre-vertical",
    parentId: "concassage-fixe",
    name: {
      fr: "Concasseurs à Percussion à Arbre Vertical",
      en: "Vertical Shaft Impact Crushers",
      es: "Trituradoras de Impacto de Eje Vertical",
    },
    description: {
      fr: "Concasseurs VSI à arbre vertical pour la production de sable et agrégats fins.",
      en: "VSI vertical shaft impact crushers for sand and fine aggregate production.",
      es: "Trituradoras VSI de eje vertical para la producción de arena y áridos finos.",
    },
  },
  {
    id: "concasseurs-a-cone",
    parentId: "concassage-fixe",
    name: {
      fr: "Concasseurs à Cône",
      en: "Cone Crushers",
      es: "Trituradoras de Cono",
    },
    description: {
      fr: "Concasseurs à cône pour le concassage secondaire et tertiaire de matériaux durs.",
      en: "Cone crushers for secondary and tertiary crushing of hard materials.",
      es: "Trituradoras de cono para la trituración secundaria y terciaria de materiales duros.",
    },
  },
  {
    id: "concasseurs-tertiaire",
    parentId: "concassage-fixe",
    name: {
      fr: "Concasseurs Tertiaire",
      en: "Tertiary Crushers",
      es: "Trituradoras Terciarias",
    },
    description: {
      fr: "Concasseurs tertiaires pour la production d'agrégats fins et calibrés.",
      en: "Tertiary crushers for fine and calibrated aggregate production.",
      es: "Trituradoras terciarias para la producción de áridos finos y calibrados.",
    },
  },
  {
    id: "crible-vibrant",
    parentId: "concassage-fixe",
    name: {
      fr: "Crible Vibrant",
      en: "Vibrating Screen",
      es: "Criba Vibrante",
    },
    description: {
      fr: "Cribles vibrants pour le tri et la séparation des matériaux par granulométrie.",
      en: "Vibrating screens for sorting and separating materials by particle size.",
      es: "Cribas vibrantes para la clasificación y separación de materiales por granulometría.",
    },
  },
  {
    id: "tremie-alimentation-vibrante",
    parentId: "concassage-fixe",
    name: {
      fr: "Trémie d'Alimentation Vibrante",
      en: "Vibrating Feeder Hopper",
      es: "Tolva de Alimentación Vibrante",
    },
    description: {
      fr: "Trémies d'alimentation vibrantes pour l'alimentation régulière des concasseurs.",
      en: "Vibrating feeder hoppers for regular feeding of crushers.",
      es: "Tolvas de alimentación vibrantes para la alimentación regular de trituradoras.",
    },
  },
  {
    id: "crible-deshydratation-hydrocyclone",
    parentId: "concassage-fixe",
    name: {
      fr: "Crible de Déshydratation Hydrocyclone",
      en: "Hydrocyclone Dewatering Screen",
      es: "Criba de Deshidratación Hidrociclón",
    },
    description: {
      fr: "Cribles de déshydratation avec hydrocyclone pour le traitement et lavage des agrégats.",
      en: "Dewatering screens with hydrocyclone for aggregate treatment and washing.",
      es: "Cribas de deshidratación con hidrociclón para el tratamiento y lavado de áridos.",
    },
  },
  {
    id: "vis-lavage-sable",
    parentId: "concassage-fixe",
    name: {
      fr: "Vis de Lavage à Sable",
      en: "Sand Washing Screw",
      es: "Tornillo de Lavado de Arena",
    },
    description: {
      fr: "Vis de lavage à sable pour le nettoyage et la classification du sable.",
      en: "Sand washing screws for sand cleaning and classification.",
      es: "Tornillos de lavado de arena para la limpieza y clasificación de arena.",
    },
  },
  {
    id: "mines",
    name: {
      fr: "Mines & Carrières",
      en: "Mining & Quarrying",
      es: "Minería y Canteras",
    },
    description: {
      fr: "Haveuses, camions miniers et équipements pour l'exploitation minière et les tunnels.",
      en: "Roadheaders, mining trucks and equipment for mining and tunneling.",
      es: "Rozadoras, camiones mineros y equipos para minería y túneles.",
    },
  },
  {
    id: "forage",
    name: {
      fr: "Forage",
      en: "Drilling",
      es: "Perforación",
    },
    description: {
      fr: "Appareils de forage rotatifs et de surface pour fondations et mines.",
      en: "Rotary and surface drilling rigs for foundations and mining.",
      es: "Equipos de perforación rotativa y de superficie para cimentaciones y minería.",
    },
  },
  {
    id: "foreuses-integrees",
    name: {
      fr: "Foreuses de surface intégrées",
      en: "Integrated Surface Drilling Rigs",
      es: "Perforadoras de Superficie Integradas",
    },
    description: {
      fr: "Foreuses de surface avec compresseur d'air intégré pour une efficacité maximale.",
      en: "Surface drilling rigs with integrated air compressor for maximum efficiency.",
      es: "Perforadoras de superficie con compresor de aire integrado para máxima eficiencia.",
    },
  },
  {
    id: "foreuses-separees",
    name: {
      fr: "Foreuses de surface séparées",
      en: "Separated Surface Drilling Rigs",
      es: "Perforadoras de Superficie Separadas",
    },
    description: {
      fr: "Foreuses de surface avec unité de puissance et compresseur séparés.",
      en: "Surface drilling rigs with separate power unit and compressor.",
      es: "Perforadoras de superficie con unidad de potencia y compresor separados.",
    },
  },
  {
    id: "foreuses-coupe",
    name: {
      fr: "Foreuses de surface de coupe",
      en: "Cutting Surface Drilling Rigs",
      es: "Perforadoras de Superficie de Corte",
    },
    description: {
      fr: "Foreuses spécialisées pour la coupe de blocs de pierre et carrières.",
      en: "Specialized drilling rigs for stone block cutting and quarries.",
      es: "Perforadoras especializadas para el corte de bloques de piedra y canteras.",
    },
  },
  {
    id: "rayonnage-stockage",
    name: {
      fr: "Rayonnage & Stockage",
      en: "Racking & Storage",
      es: "Estantería y Almacenamiento",
    },
    description: {
      fr: "Solutions de rayonnage, mezzanines, passerelles et systèmes de stockage automatisés pour entrepôts.",
      en: "Racking solutions, mezzanines, walkways and automated storage systems for warehouses.",
      es: "Soluciones de estantería, altillos, pasarelas y sistemas de almacenamiento automatizados para almacenes.",
    },
  },
  {
    id: "foreuses-mining",
    name: {
      fr: "Foreuses minières",
      en: "Mining Drilling Rigs",
      es: "Perforadoras de Minería",
    },
    description: {
      fr: "Foreuses de surface SUNWARD pour les opérations minières et de forage.",
      en: "SUNWARD surface drilling rigs for mining and drilling operations.",
      es: "Perforadoras de superficie SUNWARD para operaciones de minería y perforación.",
    },
  },
  ...sunwardScrapedCategories,
];

export const brands: Brand[] = [
  {
    id: "sany",
    name: "SANY",
    logo: "/images/logos/sany.png",
    description: {
      fr: "Leader mondial en équipements de construction et BTP",
      en: "World leader in construction and civil engineering equipment",
      es: "Líder mundial en equipos de construcción e ingeniería civil",
    },
  },
  {
    id: "toyota",
    name: "TOYOTA",
    logo: "/images/logos/toyota.png",
    description: {
      fr: "Excellence en chariots élévateurs et solutions de manutention",
      en: "Excellence in forklifts and material handling solutions",
      es: "Excelencia en carretillas elevadoras y soluciones de manipulación",
    },
  },
  {
    id: "fabo",
    name: "FABO",
    logo: "/images/logos/fabo.png",
    description: {
      fr: "Spécialiste des centrales à béton et concasseurs",
      en: "Specialist in concrete batching plants and crushers",
      es: "Especialista en plantas de hormigón y trituradoras",
    },
  },
  {
    id: "ajax",
    name: "AJAX",
    logo: "/images/logos/ajax.png",
    description: {
      fr: "Innovateur en malaxeurs autochargeants et solutions béton",
      en: "Innovator in self-loading mixers and concrete solutions",
      es: "Innovador en mezcladoras autocargantes y soluciones de hormigón",
    },
  },
  {
    id: "teksan",
    name: "TEKSAN",
    logo: "/images/logos/teksan.png",
    description: {
      fr: "Spécialiste des centrales à béton et concasseurs",
      en: "Specialist in concrete batching plants and crushers",
      es: "Especialista en plantas de hormigón y trituradoras",
    },
  },
  {
    id: "sunward",
    name: "SUNWARD",
    logo: "/images/logos/sunward.png",
  },
  {
    id: "sinoboom",
    name: "SINOBOOM",
    logo: "https://www.tvh.com/sites/tvh/files/styles/max_650x650/public/2023-10/Sinoboom_1.png?itok=iZS_UD_y",
  },
  {
    id: "atox",
    name: "ATOX",
    logo: "https://atoxgrupo.com/wp-content/uploads/2024/08/112fe7426f6ffed9ad2cd4946a4235e4.png",
  }
];

export default { products, categories, brands };
