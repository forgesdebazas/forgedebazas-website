import type { Product } from "@/lib/types";

// Additional official SANY products not yet represented on the site dataset.
export const sanyOfficialMissingProducts: Product[] = [
  {
    id: "sany-line-pump",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "Pompe a beton lineaire",
      en: "Line Pump",
      es: "Bomba de Hormigon en Linea",
    },
    shortTitle: {
      fr: "Pompe lineaire",
      en: "Line Pump",
      es: "Bomba en Linea",
    },
    description: {
      fr: "Pompe a beton lineaire modeles officiels SANY",
      en: "Official SANY line pump models",
      es: "Modelos oficiales SANY de bomba en linea",
    },
    specs: {
      portee: {
        fr: "Debit theorique: 83/41 - 100/62 m3/h",
        en: "Theo Concrete Output: 83/41 - 100/62 m3/h",
        es: "Salida teorica: 83/41 - 100/62 m3/h",
      },
      pression: {
        fr: "Pression theorique: 9/18 - 13/25 MPa",
        en: "Theo Delivery Pressure: 9/18 - 13/25 MPa",
        es: "Presion teorica: 9/18 - 13/25 MPa",
      },
      sortie: {
        fr: "Puissance moteur: 132 - 230 kW",
        en: "Upper Engine Power: 132 - 230 kW",
        es: "Potencia del motor: 132 - 230 kW",
      },
    },
    models: ["SY5143THBE-10023C-10S"],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20240701/line pump1_151216.png?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-pompe-a-beton-montee-sur-camion-de-49-55m",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "Pompe a beton montee sur camion de 49 - 55m",
      en: "49 - 55m Truck-mounted Concrete Pump",
      es: "Bomba de Hormigon sobre Camion de 49 - 55m",
    },
    shortTitle: {
      fr: "Pompe sur camion 49 - 55m",
      en: "49 - 55m Truck Pump",
      es: "Bomba 49 - 55m",
    },
    description: {
      fr: "Pompe a beton montee sur camion de 49 - 55m modeles officiels",
      en: "Official 49 - 55m truck-mounted concrete pump models",
      es: "Modelos oficiales de bomba sobre camion de 49 - 55m",
    },
    specs: {
      portee: {
        fr: "Portee verticale: 48.6 - 55 m",
        en: "Vertical Reach: 48.6 - 55 m",
        es: "Alcance vertical: 48.6 - 55 m",
      },
      pression: {
        fr: "Debit: 120 - 200 m3/h",
        en: "Output: 120 - 200 m3/h",
        es: "Salida: 120 - 200 m3/h",
      },
      sortie: {
        fr: "Pression: 7 - 12 MPa",
        en: "Pressure: 7 - 12 MPa",
        es: "Presion: 7 - 12 MPa",
      },
    },
    models: [
      "SYG5370THB 490C-10",
      "SYG5341THB 490C-10",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20220512/4_49%20-%2055m%20Truck-mounted%20Concrete%20Pump%20(-112251.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-pompe-a-beton-montee-sur-camion-de-56-60m",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "Pompe a beton montee sur camion de 56 - 60m",
      en: "56 - 60m Truck-mounted Concrete Pump",
      es: "Bomba de Hormigon sobre Camion de 56 - 60m",
    },
    shortTitle: {
      fr: "Pompe sur camion 56 - 60m",
      en: "56 - 60m Truck Pump",
      es: "Bomba 56 - 60m",
    },
    description: {
      fr: "Pompe a beton montee sur camion de 56 - 60m modeles officiels",
      en: "Official 56 - 60m truck-mounted concrete pump models",
      es: "Modelos oficiales de bomba sobre camion de 56 - 60m",
    },
    specs: {
      portee: {
        fr: "Portee verticale: 56 - 60 m",
        en: "Vertical Reach: 56 - 60 m",
        es: "Alcance vertical: 56 - 60 m",
      },
      pression: {
        fr: "Debit: 120 - 200 m3/h",
        en: "Output: 120 - 200 m3/h",
        es: "Salida: 120 - 200 m3/h",
      },
      sortie: {
        fr: "Pression: 7 - 12 MPa",
        en: "Pressure: 7 - 12 MPa",
        es: "Presion: 7 - 12 MPa",
      },
    },
    models: [
      "SYG5445THB 560C-10",
      "SYG5450THB 560C-10",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20220512/5_56%20-%2060m%20Truck-mounted%20Concrete%20Pump%20(-112524.png?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-pompe-a-beton-montee-sur-camion-de-plus-de-60m",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "Pompe a beton montee sur camion de plus de 60m",
      en: "Over 60m Truck-mounted Concrete Pump",
      es: "Bomba de Hormigon sobre Camion de mas de 60m",
    },
    shortTitle: {
      fr: "Pompe sur camion >60m",
      en: "Over 60m Truck Pump",
      es: "Bomba >60m",
    },
    description: {
      fr: "Pompe a beton montee sur camion de plus de 60m modeles officiels",
      en: "Official over 60m truck-mounted concrete pump models",
      es: "Modelos oficiales de bomba sobre camion de mas de 60m",
    },
    specs: {
      portee: {
        fr: "Portee verticale: >60 m",
        en: "Vertical Reach: >60 m",
        es: "Alcance vertical: >60 m",
      },
      pression: {
        fr: "Debit: 120 - 200 m3/h",
        en: "Output: 120 - 200 m3/h",
        es: "Salida: 120 - 200 m3/h",
      },
      sortie: {
        fr: "Pression: 8.3 - 12 MPa",
        en: "Pressure: 8.3 - 12 MPa",
        es: "Presion: 8.3 - 12 MPa",
      },
    },
    models: ["SYG5521THB 630S", "SYM5552THB 710SA"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20220512/6_over%2060m%20Truck-mounted%20Concrete%20Pump%20(-112652.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-pompe-a-beton-stationnaire-serie-40-50",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "Pompe a beton stationnaire serie 40/50",
      en: "40/50 Series Trailer Pump",
      es: "Bomba Montada en Remolque Serie 40/50",
    },
    shortTitle: {
      fr: "Pompe stationnaire serie 40/50",
      en: "40/50 Series Pump",
      es: "Bomba Serie 40/50",
    },
    description: {
      fr: "Pompe a beton stationnaire serie 40/50 modeles officiels",
      en: "Official 40/50 series trailer pump models",
      es: "Modelos oficiales de bomba en remolque serie 40/50",
    },
    specs: {
      portee: {
        fr: "Puissance moteur: 49 - 73.6 kW",
        en: "Engine Rated Power: 49 - 73.6 kW",
        es: "Potencia del motor: 49 - 73.6 kW",
      },
      pression: {
        fr: "Pression de sortie max: 6 - 10 MPa",
        en: "Max. Output Pressure: 6 - 10 MPa",
        es: "Presion de salida max: 6 - 10 MPa",
      },
      sortie: {
        fr: "Debit max: 40 - 59 m3/h",
        en: "Max. Output Quantity: 40 - 59 m3/h",
        es: "Caudal max: 40 - 59 m3/h",
      },
    },
    models: ["HBT5008C-6Y"],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20240415/2_103240.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-pompe-a-beton-stationnaire-serie-80",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "Pompe a beton stationnaire serie 80",
      en: "80 Series Trailer Pump",
      es: "Bomba Montada en Remolque Serie 80",
    },
    shortTitle: {
      fr: "Pompe stationnaire serie 80",
      en: "80 Series Pump",
      es: "Bomba Serie 80",
    },
    description: {
      fr: "Pompe a beton stationnaire serie 80 modeles officiels",
      en: "Official 80 series trailer pump models",
      es: "Modelos oficiales de bomba en remolque serie 80",
    },
    specs: {
      portee: {
        fr: "Puissance moteur: 180 kW",
        en: "Engine Rated Power: 180 kW",
        es: "Potencia del motor: 180 kW",
      },
      pression: {
        fr: "Pression de sortie max: 18 MPa",
        en: "Max. Output Pressure: 18 MPa",
        es: "Presion de salida max: 18 MPa",
      },
      sortie: {
        fr: "Debit max: 85 m3/h",
        en: "Max. Output Quantity: 85 m3/h",
        es: "Caudal max: 85 m3/h",
      },
    },
    models: ["HBT8018C-5S"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/80m%C2%B3_h%20series%20T-190802?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-pompe-a-beton-stationnaire-serie-90",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "Pompe a beton stationnaire serie 90",
      en: "90 Series Trailer Pump",
      es: "Bomba Montada en Remolque Serie 90",
    },
    shortTitle: {
      fr: "Pompe stationnaire serie 90",
      en: "90 Series Pump",
      es: "Bomba Serie 90",
    },
    description: {
      fr: "Pompe a beton stationnaire serie 90 modeles officiels",
      en: "Official 90 series trailer pump models",
      es: "Modelos oficiales de bomba en remolque serie 90",
    },
    specs: {
      portee: {
        fr: "Puissance moteur: 2x180 kW",
        en: "Engine Rated Power: 2x180 kW",
        es: "Potencia del motor: 2x180 kW",
      },
      pression: {
        fr: "Pression de sortie max: 28 MPa",
        en: "Max. Output Pressure: 28 MPa",
        es: "Presion de salida max: 28 MPa",
      },
      sortie: {
        fr: "Debit max: 95 m3/h",
        en: "Max. Output Quantity: 95 m3/h",
        es: "Caudal max: 95 m3/h",
      },
    },
    models: ["HBT9028CH-5S"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20210207/HBT9028CH-5S-171715.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-pompe-a-beton-stationnaire-serie-120",
    category: "pompes-beton",
    brand: "SANY",
    title: {
      fr: "Pompe a beton stationnaire serie 120",
      en: "120 Series Trailer Pump",
      es: "Bomba Montada en Remolque Serie 120",
    },
    shortTitle: {
      fr: "Pompe stationnaire serie 120",
      en: "120 Series Pump",
      es: "Bomba Serie 120",
    },
    description: {
      fr: "Pompe a beton stationnaire serie 120 modeles officiels",
      en: "Official 120 series trailer pump models",
      es: "Modelos oficiales de bomba en remolque serie 120",
    },
    specs: {
      portee: {
        fr: "Puissance moteur: 297 kW",
        en: "Engine Rated Power: 297 kW",
        es: "Potencia del motor: 297 kW",
      },
      pression: {
        fr: "Pression de sortie max: 21 MPa",
        en: "Max. Output Pressure: 21 MPa",
        es: "Presion de salida max: 21 MPa",
      },
      sortie: {
        fr: "Debit max: 120 m3/h",
        en: "Max. Output Quantity: 120 m3/h",
        es: "Caudal max: 120 m3/h",
      },
    },
    models: ["HBT12020C-5S"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/120m%C2%B3_h%20series%20-190841?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-tout-terrain-de-plus-de-300t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue tout-terrain de plus de 300T",
      en: "Over 300T All-terrain Crane",
      es: "Grua Todoterreno de mas de 300T",
    },
    shortTitle: {
      fr: "Grue tout-terrain >300T",
      en: "Over 300T All-terrain",
      es: "Grua Todoterreno >300T",
    },
    description: {
      fr: "Grues tout-terrain de plus de 300T modeles officiels",
      en: "Official over 300T all-terrain crane models",
      es: "Modelos oficiales de grua todoterreno de mas de 300T",
    },
    specs: {
      portee: {
        fr: "Capacite de levage max: >300 T",
        en: "Max. Lifting Capacity: >300 T",
        es: "Capacidad de elevacion max: >300 T",
      },
      pression: {
        fr: "Longueur max de fleche: >=70 m",
        en: "Max. Boom Length: >=70 m",
        es: "Longitud max de pluma: >=70 m",
      },
      sortie: {
        fr: "Hauteur de levage max: >=115 m",
        en: "Max. Lifting Height: >=115 m",
        es: "Altura de elevacion max: >=115 m",
      },
    },
    models: [
      "SAC3500T7",
      "SAC4500T7-8",
      "SAC5000T7-8",
      "SAC6000T8-8",
      "SAC7000T7-8",
      "SAC8000C7-8",
      "SAC8000T7-8",
      "SAC9000C8-8",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20220627/SAC4500S-000818.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-terrain-accidente-de-moins-de-50t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue terrain accidente de moins de 50T",
      en: "Below 50T Rough-terrain Crane",
      es: "Grua de Terreno Irregular de menos de 50T",
    },
    shortTitle: {
      fr: "Grue terrain accidente <50T",
      en: "Below 50T Rough-terrain",
      es: "Grua Terreno Irregular <50T",
    },
    description: {
      fr: "Grues terrain accidente de moins de 50T modeles officiels",
      en: "Official below 50T rough-terrain crane models",
      es: "Modelos oficiales de grua de terreno irregular de menos de 50T",
    },
    specs: {
      portee: {
        fr: "Capacite de levage max: 30 - 50 T",
        en: "Max. Lifting Capacity: 30 - 50 T",
        es: "Capacidad de elevacion max: 30 - 50 T",
      },
      pression: {
        fr: "Longueur max de fleche: 31.5 - 35 m",
        en: "Max. Boom Length: 31.5 - 35 m",
        es: "Longitud max de pluma: 31.5 - 35 m",
      },
      sortie: {
        fr: "Hauteur de levage max: 38 - 52.3 m",
        en: "Max. Lifting Height: 38 - 52.3 m",
        es: "Altura de elevacion max: 38 - 52.3 m",
      },
    },
    models: ["SIC130", "SIC130EV", "SRC300T", "SRC400T"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/30~50T%20Rough-te-193902?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-terrain-accidente-de-plus-de-80t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue terrain accidente de plus de 80T",
      en: "Over 80T Rough-terrain Crane",
      es: "Grua de Terreno Irregular de mas de 80T",
    },
    shortTitle: {
      fr: "Grue terrain accidente >80T",
      en: "Over 80T Rough-terrain",
      es: "Grua Terreno Irregular >80T",
    },
    description: {
      fr: "Grues terrain accidente de plus de 80T modeles officiels",
      en: "Official over 80T rough-terrain crane models",
      es: "Modelos oficiales de grua de terreno irregular de mas de 80T",
    },
    specs: {
      portee: {
        fr: "Capacite de levage max: >80 T",
        en: "Max. Lifting Capacity: >80 T",
        es: "Capacidad de elevacion max: >80 T",
      },
      pression: {
        fr: "Longueur max de fleche: >=47 m",
        en: "Max. Boom Length: >=47 m",
        es: "Longitud max de pluma: >=47 m",
      },
      sortie: {
        fr: "Hauteur de levage max: >=63 m",
        en: "Max. Lifting Height: >=63 m",
        es: "Altura de elevacion max: >=63 m",
      },
    },
    models: ["SRC900T", "SRC1100T", "SRC1100T5", "SRC1300T"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/over%2080T%20Rough--193946?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-chenilles-treillis-moins-de-100t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue sur chenilles treillis de moins de 100T",
      en: "Below 100T Lattice Boom Crawler crane",
      es: "Grua sobre Orugas de Celosia de menos de 100T",
    },
    shortTitle: {
      fr: "Chenilles treillis <100T",
      en: "Lattice Crawler <100T",
      es: "Orugas celosia <100T",
    },
    description: {
      fr: "Grues treillis sur chenilles de moins de 100T modeles officiels",
      en: "Official below 100T lattice boom crawler crane models",
      es: "Modelos oficiales de grua de celosia sobre orugas de menos de 100T",
    },
    specs: {
      portee: {
        fr: "Longueur max de fleche: <=65 m",
        en: "Max. Boom Length: <=65 m",
        es: "Longitud max de pluma: <=65 m",
      },
      pression: {
        fr: "Capacite de levage max: <=100 T",
        en: "Max. Lifting Capacity: <=100 T",
        es: "Capacidad de elevacion max: <=100 T",
      },
      sortie: {
        fr: "Moment de levage max: <=800 t.m",
        en: "Maximum Lifting Moment: <=800 t.m",
        es: "Momento max de elevacion: <=800 t.m",
      },
    },
    models: [
      "SCC450A-6",
      "SCC600A-5",
      "SCE600A",
      "SCE600A Chain-track",
      "SCE600A three-bar track pad",
      "SCS600A",
      "SCC750A-5",
      "SCC750HD/Q-A",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20230329/02_144704.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-chenilles-treillis-135-180t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue sur chenilles treillis de 135 - 180T",
      en: "135 - 180T Lattice Boom Crawler Crane",
      es: "Grua sobre Orugas de Celosia de 135 - 180T",
    },
    shortTitle: {
      fr: "Chenilles treillis 135 - 180T",
      en: "Lattice Crawler 135 - 180T",
      es: "Orugas celosia 135 - 180T",
    },
    description: {
      fr: "Grues treillis sur chenilles de 135 - 180T modeles officiels",
      en: "Official 135 - 180T lattice boom crawler crane models",
      es: "Modelos oficiales de grua de celosia sobre orugas de 135 - 180T",
    },
    specs: {
      portee: {
        fr: "Longueur max de fleche: 76 - 82 m",
        en: "Max. Boom Length: 76 - 82 m",
        es: "Longitud max de pluma: 76 - 82 m",
      },
      pression: {
        fr: "Capacite de levage max: 135 - 180 T",
        en: "Max. Lifting Capacity: 135 - 180 T",
        es: "Capacidad de elevacion max: 135 - 180 T",
      },
      sortie: {
        fr: "Moment de levage max: 668 - 1056 t.m",
        en: "Maximum Lifting Moment: 668 - 1056 t.m",
        es: "Momento max de elevacion: 668 - 1056 t.m",
      },
    },
    models: [
      "SCC1350A-5",
      "SCE1350A",
      "SCE1350A-EV",
      "SCA1350A",
      "SCI1500A",
      "SCC1500A-8",
      "SCS1500A",
      "SCC1800A",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/135~180T%20Lattic-200835?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-chenilles-treillis-200-320t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue sur chenilles treillis de 200 - 320T",
      en: "200 - 320T Lattice Boom Crawler Crane",
      es: "Grua sobre Orugas de Celosia de 200 - 320T",
    },
    shortTitle: {
      fr: "Chenilles treillis 200 - 320T",
      en: "Lattice Crawler 200 - 320T",
      es: "Orugas celosia 200 - 320T",
    },
    description: {
      fr: "Grues treillis sur chenilles de 200 - 320T modeles officiels",
      en: "Official 200 - 320T lattice boom crawler crane models",
      es: "Modelos oficiales de grua de celosia sobre orugas de 200 - 320T",
    },
    specs: {
      portee: {
        fr: "Longueur max de fleche: 85 - 92 m",
        en: "Max. Boom Length: 85 - 92 m",
        es: "Longitud max de pluma: 85 - 92 m",
      },
      pression: {
        fr: "Capacite de levage max: 200 - 320 T",
        en: "Max. Lifting Capacity: 200 - 320 T",
        es: "Capacidad de elevacion max: 200 - 320 T",
      },
      sortie: {
        fr: "Moment de levage max: 1152 - 1820 t.m",
        en: "Maximum Lifting Moment: 1152 - 1820 t.m",
        es: "Momento max de elevacion: 1152 - 1820 t.m",
      },
    },
    models: [
      "SCC2000A",
      "SCC2000A-EV",
      "SCC2500A",
      "SCI2600A",
      "SCA2600A",
      "SCC2800A",
      "SCE2800A",
      "SCC3200T",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/200~320T%20Lattic-200913?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-chenilles-treillis-plus-de-350t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue sur chenilles treillis de plus de 350T",
      en: "Over 350T Lattice Boom Crawler Crane",
      es: "Grua sobre Orugas de Celosia de mas de 350T",
    },
    shortTitle: {
      fr: "Chenilles treillis >350T",
      en: "Lattice Crawler >350T",
      es: "Orugas celosia >350T",
    },
    description: {
      fr: "Grues treillis sur chenilles de plus de 350T modeles officiels",
      en: "Official over 350T lattice boom crawler crane models",
      es: "Modelos oficiales de grua de celosia sobre orugas de mas de 350T",
    },
    specs: {
      portee: {
        fr: "Longueur max de fleche: >=84 m",
        en: "Max. Boom Length: >=84 m",
        es: "Longitud max de pluma: >=84 m",
      },
      pression: {
        fr: "Capacite de levage max: >=350 T",
        en: "Max. Lifting Capacity: >=350 T",
        es: "Capacidad de elevacion max: >=350 T",
      },
      sortie: {
        fr: "Moment de levage max: >=2380 t.m",
        en: "Maximum Lifting Moment: >=2380 t.m",
        es: "Momento max de elevacion: >=2380 t.m",
      },
    },
    models: [
      "SCC4000A-6",
      "SCC6000A-1",
      "SCC3500A-8",
      "SCC3500A-6",
      "SCE4000A-1",
      "SCA4000A",
      "SCE4800A",
      "SCC5000A-1",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/350~800T%20Lattic-201047?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-chenilles-telescopique-25-40t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue sur chenilles a fleche telescopique de 25 - 40T",
      en: "25 - 40T Telescopic Boom Crawler Crane",
      es: "Grua sobre Orugas con Pluma Telescopica de 25 - 40T",
    },
    shortTitle: {
      fr: "Chenilles telescopique 25 - 40T",
      en: "Telescopic Crawler 25 - 40T",
      es: "Orugas telescopica 25 - 40T",
    },
    description: {
      fr: "Grues sur chenilles telescopiques de 25 - 40T modeles officiels",
      en: "Official 25 - 40T telescopic boom crawler crane models",
      es: "Modelos oficiales de grua sobre orugas telescopica de 25 - 40T",
    },
    specs: {
      portee: {
        fr: "Longueur max de fleche: 40 - 45 m",
        en: "Max. Boom Length: 40 - 45 m",
        es: "Longitud max de pluma: 40 - 45 m",
      },
      pression: {
        fr: "Capacite de levage max: 25 - 40 T",
        en: "Max. Lifting Capacity: 25 - 40 T",
        es: "Capacidad de elevacion max: 25 - 40 T",
      },
      sortie: {
        fr: "Moment de levage max: 100 - 150 t.m",
        en: "Maximum Lifting Moment: 100 - 150 t.m",
        es: "Momento max de elevacion: 100 - 150 t.m",
      },
    },
    models: [
      "SCC300TB",
      "SCC400TB",
      "SCC400TB-EV",
      "SCE400TB",
      "STB300T5-1",
      "STB500T5-EV",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/25~40T%20Telescop-201110?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-montee-sur-camion-de-moins-de-35t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue montee sur camion de moins de 35T",
      en: "Below 35T Truck-mounted crane",
      es: "Grua Montada en Camion de menos de 35T",
    },
    shortTitle: {
      fr: "Grue sur camion <35T",
      en: "Truck-mounted <35T",
      es: "Grua en camion <35T",
    },
    description: {
      fr: "Grues montees sur camion de moins de 35T modeles officiels",
      en: "Official below 35T truck-mounted crane models",
      es: "Modelos oficiales de grua montada en camion de menos de 35T",
    },
    specs: {
      portee: {
        fr: "Longueur max de fleche: 25 - 33 m",
        en: "Max. Boom Length: 25 - 33 m",
        es: "Longitud max de pluma: 25 - 33 m",
      },
      pression: {
        fr: "Hauteur de levage max: 25 - 45 m",
        en: "Max. Lifting Height: 25 - 45 m",
        es: "Altura de elevacion max: 25 - 45 m",
      },
      sortie: {
        fr: "Capacite de levage max: 10 - 32 T",
        en: "Max. Lifting Capacity: 10 - 32 T",
        es: "Capacidad de elevacion max: 10 - 32 T",
      },
    },
    models: ["SPC180T", "SPC250T4", "SPC320"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200902/Truck-mounted%20c-190538.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-montee-sur-camion-de-plus-de-35t",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue montee sur camion de plus de 35T",
      en: "Over 35T Truck-mounted Crane",
      es: "Grua Montada en Camion de mas de 35T",
    },
    shortTitle: {
      fr: "Grue sur camion >35T",
      en: "Truck-mounted >35T",
      es: "Grua en camion >35T",
    },
    description: {
      fr: "Grues montees sur camion de plus de 35T modeles officiels",
      en: "Official over 35T truck-mounted crane models",
      es: "Modelos oficiales de grua montada en camion de mas de 35T",
    },
    specs: {
      portee: {
        fr: "Longueur max de fleche: >=35 m",
        en: "Max. Boom Length: >=35 m",
        es: "Longitud max de pluma: >=35 m",
      },
      pression: {
        fr: "Hauteur de levage max: >=43 m",
        en: "Max. Lifting Height: >=43 m",
        es: "Altura de elevacion max: >=43 m",
      },
      sortie: {
        fr: "Capacite de levage max: >35 T",
        en: "Max. Lifting Capacity: >35 T",
        es: "Capacidad de elevacion max: >35 T",
      },
    },
    models: ["SPC400"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200902/Truck-mounted%20c-174645.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-chargeuse-a-fleche-rigide",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue chargeuse a fleche rigide",
      en: "Stiff Boom Crane",
      es: "Grua de Pluma Rigida",
    },
    shortTitle: {
      fr: "Fleche rigide",
      en: "Stiff Boom",
      es: "Pluma rigida",
    },
    description: {
      fr: "Grues chargeuses a fleche rigide modeles officiels",
      en: "Official stiff boom crane models",
      es: "Modelos oficiales de grua de pluma rigida",
    },
    specs: {
      portee: {
        fr: "Longueur de fleche: 10.4 - 21.6 m",
        en: "Boom Length: 10.4 - 21.6 m",
        es: "Longitud de pluma: 10.4 - 21.6 m",
      },
      pression: {
        fr: "Capacite de levage max: 3.2 - 22 T",
        en: "Max. Lifting Capacity: 3.2 - 22 T",
        es: "Capacidad de elevacion max: 3.2 - 22 T",
      },
      sortie: {
        fr: "Poids total: 1.2 - 6.8 T",
        en: "Overall Weight: 1.2 - 6.8 T",
        es: "Peso total: 1.2 - 6.8 T",
      },
    },
    models: [
      "SPS45000",
      "SPS8000",
      "SPS12500",
      "SPS16000",
      "SPS17500",
      "SPS20000",
      "SPS25000",
      "SPS30000",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/Stiff%20Boom%20cran-201153?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-grue-chargeuse-a-fleche-articulee",
    category: "grues",
    brand: "SANY",
    title: {
      fr: "Grue chargeuse a fleche articulee",
      en: "Knuckle Boom Crane",
      es: "Grua de Pluma Articulada",
    },
    shortTitle: {
      fr: "Fleche articulee",
      en: "Knuckle Boom",
      es: "Pluma articulada",
    },
    description: {
      fr: "Grues chargeuses a fleche articulee modeles officiels",
      en: "Official knuckle boom crane models",
      es: "Modelos oficiales de grua de pluma articulada",
    },
    specs: {
      portee: {
        fr: "Capacite de levage max: 3.3 - 21.5 T",
        en: "Max. Lifting Capacity: 3.3 - 21.5 T",
        es: "Capacidad de elevacion max: 3.3 - 21.5 T",
      },
      pression: {
        fr: "Poids total: 0.7 - 7.5 T",
        en: "Overall Weight: 0.7 - 7.5 T",
        es: "Peso total: 0.7 - 7.5 T",
      },
      sortie: {
        fr: "Portee hydraulique max: 9.6 - 16 m",
        en: "Max. Hydraulic Outreach: 9.6 - 16 m",
        es: "Alcance hidraulico max: 9.6 - 16 m",
      },
    },
    models: [
      "SPK70002",
      "SPK74002",
      "SPK6500",
      "SPK8500",
      "SPK10000",
      "SPK15500",
      "SPK12000",
      "SPK18500",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/Knuckle%20boom%20cr-201210?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-mini-excavatrice-electrique",
    category: "excavation",
    brand: "SANY",
    title: {
      fr: "Mini excavatrice electrique",
      en: "Electric Mini Excavator",
      es: "Mini Excavadora Electrica",
    },
    shortTitle: {
      fr: "Mini electrique",
      en: "Electric Mini",
      es: "Mini electrica",
    },
    description: {
      fr: "Mini excavatrice electrique modeles officiels",
      en: "Official electric mini excavator models",
      es: "Modelos oficiales de mini excavadora electrica",
    },
    specs: {
      portee: {
        fr: "Capacite du godet: 0.04 m3",
        en: "Bucket Capacity: 0.04 m3",
        es: "Capacidad de cuchara: 0.04 m3",
      },
      pression: {
        fr: "Puissance moteur: 10 kW",
        en: "Engine Power: 10 kW",
        es: "Potencia del motor: 10 kW",
      },
      sortie: {
        fr: "Poids de fonctionnement: 1.95 T",
        en: "Operating Weight: 1.95 T",
        es: "Peso operativo: 1.95 T",
      },
    },
    models: ["SY19E"],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20230626/02_204441.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-petite-excavatrice-5-5-7-5t",
    category: "excavation",
    brand: "SANY",
    title: {
      fr: "Petite excavatrice de 5.5 - 7.5T",
      en: "5.5 - 7.5T Small Excavator",
      es: "Excavadora Pequena de 5.5 - 7.5T",
    },
    shortTitle: {
      fr: "Petite excavatrice 5.5 - 7.5T",
      en: "Small 5.5 - 7.5T",
      es: "Pequena 5.5 - 7.5T",
    },
    description: {
      fr: "Petites excavatrices de 5.5 - 7.5T modeles officiels",
      en: "Official 5.5 - 7.5T small excavator models",
      es: "Modelos oficiales de excavadora pequena de 5.5 - 7.5T",
    },
    specs: {
      portee: {
        fr: "Capacite du godet: 0.21 - 0.28 m3",
        en: "Bucket Capacity: 0.21 - 0.28 m3",
        es: "Capacidad de cuchara: 0.21 - 0.28 m3",
      },
      pression: {
        fr: "Puissance moteur: 36 - 45.4 kW",
        en: "Engine Power: 36 - 45.4 kW",
        es: "Potencia del motor: 36 - 45.4 kW",
      },
      sortie: {
        fr: "Poids de fonctionnement: 5.78 - 7.28 T",
        en: "Operating Weight: 5.78 - 7.28 T",
        es: "Peso operativo: 5.78 - 7.28 T",
      },
    },
    models: [
      "SY55C",
      "SY60C(Tier4 F & Stage V)",
      "SY65W",
      "SY75C",
      "SY75C(Tier4 F & Stage V)",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200819/5T~7.5T-Small-E-170029.5T-Small-Excavator?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-petite-excavatrice-8-13-5t",
    category: "excavation",
    brand: "SANY",
    title: {
      fr: "Petite excavatrice de 8 - 13.5T",
      en: "8 - 13.5T Small Excavator",
      es: "Excavadora Pequena de 8 - 13.5T",
    },
    shortTitle: {
      fr: "Petite excavatrice 8 - 13.5T",
      en: "Small 8 - 13.5T",
      es: "Pequena 8 - 13.5T",
    },
    description: {
      fr: "Petites excavatrices de 8 - 13.5T modeles officiels",
      en: "Official 8 - 13.5T small excavator models",
      es: "Modelos oficiales de excavadora pequena de 8 - 13.5T",
    },
    specs: {
      portee: {
        fr: "Capacite du godet: 0.28 - 0.6 m3",
        en: "Bucket Capacity: 0.28 - 0.6 m3",
        es: "Capacidad de cuchara: 0.28 - 0.6 m3",
      },
      pression: {
        fr: "Puissance moteur: 53.7 - 73 kW",
        en: "Engine Power: 53.7 - 73 kW",
        es: "Potencia del motor: 53.7 - 73 kW",
      },
      sortie: {
        fr: "Poids de fonctionnement: 8.8 - 16.8 T",
        en: "Operating Weight: 8.8 - 16.8 T",
        es: "Peso operativo: 8.8 - 16.8 T",
      },
    },
    models: [
      "SY80U",
      "SY95C(Tier4 F & Stage V)",
      "SY135C(Tier4 F & Stage V)",
      "SY135C",
      "SY135F",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/7.5T~13.5T%20Smal-181433?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-petite-excavatrice-15-5t",
    category: "excavation",
    brand: "SANY",
    title: {
      fr: "Petite excavatrice de 15.5T",
      en: "15.5T Small Excavator",
      es: "Excavadora Pequena de 15.5T",
    },
    shortTitle: {
      fr: "Petite excavatrice 15.5T",
      en: "Small 15.5T",
      es: "Pequena 15.5T",
    },
    description: {
      fr: "Petites excavatrices de 15.5T modeles officiels",
      en: "Official 15.5T small excavator models",
      es: "Modelos oficiales de excavadora pequena de 15.5T",
    },
    specs: {
      portee: {
        fr: "Capacite du godet: 0.22 - 0.7 m3",
        en: "Bucket Capacity: 0.22 - 0.7 m3",
        es: "Capacidad de cuchara: 0.22 - 0.7 m3",
      },
      pression: {
        fr: "Puissance moteur: 78 - 120 kW",
        en: "Engine Power: 78 - 120 kW",
        es: "Potencia del motor: 78 - 120 kW",
      },
      sortie: {
        fr: "Poids de fonctionnement: 13.5 - 16 T",
        en: "Operating Weight: 13.5 - 16 T",
        es: "Peso operativo: 13.5 - 16 T",
      },
    },
    models: ["SY155U(Tier4 F & Stage V)", "SY155H"],
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20230228/SAT40C-02_091941.jpg?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-compacteur-monocylindre-traction-simple",
    category: "terrassement",
    brand: "SANY",
    title: {
      fr: "Compacteur monocylindre a traction simple",
      en: "Single Drum Roller (Single Drive)",
      es: "Rodillo Monocilindrico de Traccion Simple",
    },
    shortTitle: {
      fr: "Monocylindre traction simple",
      en: "Single Drum (Single Drive)",
      es: "Monocilindrico traccion simple",
    },
    description: {
      fr: "Compacteurs monocylindres a traction simple officiels SANY",
      en: "Official SANY single drum roller (single drive) range",
      es: "Gama oficial SANY de rodillo monocilindrico de traccion simple",
    },
    specs: {
      portee: {
        fr: "Force centrifuge: 246/124 - 416/295 kN",
        en: "Centrifugal Force: 246/124 - 416/295 kN",
        es: "Fuerza centrifuga: 246/124 - 416/295 kN",
      },
      pression: {
        fr: "Puissance nominale: 93 - 147 kW",
        en: "Rated Power: 93 - 147 kW",
        es: "Potencia nominal: 93 - 147 kW",
      },
      sortie: {
        fr: "Poids de fonctionnement: 10000 - 26000 kg",
        en: "Operating Weight: 10000 - 26000 kg",
        es: "Peso operativo: 10000 - 26000 kg",
      },
    },
    models: [],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20250704/SSR-800-480-AC_112921.png?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
  {
    id: "sany-compacteur-monocylindre-double-traction",
    category: "terrassement",
    brand: "SANY",
    title: {
      fr: "Compacteur monocylindre a double traction",
      en: "Single Drum Roller (Dual Drive)",
      es: "Rodillo Monocilindrico de Doble Traccion",
    },
    shortTitle: {
      fr: "Monocylindre double traction",
      en: "Single Drum (Dual Drive)",
      es: "Monocilindrico doble traccion",
    },
    description: {
      fr: "Compacteurs monocylindres a double traction modeles officiels",
      en: "Official single drum roller (dual drive) models",
      es: "Modelos oficiales de rodillo monocilindrico de doble traccion",
    },
    specs: {
      portee: {
        fr: "Force centrifuge: 246/124 - 420/310 kN",
        en: "Centrifugal Force: 246/124 - 420/310 kN",
        es: "Fuerza centrifuga: 246/124 - 420/310 kN",
      },
      pression: {
        fr: "Puissance nominale: 93 - 180 kW",
        en: "Rated Power: 93 - 180 kW",
        es: "Potencia nominal: 93 - 180 kW",
      },
      sortie: {
        fr: "Poids de fonctionnement: 10000 - 26000 kg",
        en: "Operating Weight: 10000 - 26000 kg",
        es: "Peso operativo: 10000 - 26000 kg",
      },
    },
    models: [
      "SSR140C-10S",
      "SSR120C-10S(Euro III)",
      "SSR212",
      "SSR100C-10S (Euro II)",
      "SSR100C-10 (Euro III)",
      "SSR120C-10S(ISUZU)",
      "SSR120C-10S (Euro II)",
      "SSR120C-10S (Euro III)",
    ],
    image:
      "https://sanyglobal-img.sany.com.cn/prod/20250704/SSR-800-480_112242.png?x-oss-process=image/format,webp",
    featured: false,
    available: true,
  },
];
