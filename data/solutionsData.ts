import {
  Package,
  Truck,
  HardHat,
  Zap,
  Anchor,
  Mountain,
  MoveVertical,
  LucideIcon,
} from "lucide-react";
import { LocalizedText } from "@/lib/types";

export interface Solution {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  fullDescription: LocalizedText;
  image: string;
  icon: LucideIcon;
  features: LocalizedText[];
}

export const solutions: Solution[] = [
  {
    id: "manutention",
    title: {
      fr: "Manutention",
      en: "Material Handling",
      es: "Manipulación",
    },
    subtitle: {
      fr: "Solutions clé-en-main pour les entrepôts et la logistique",
      en: "Turnkey solutions for warehouses and logistics",
      es: "Soluciones llave en mano para almacenes y logística",
    },
    description: {
      fr: "Solutions clé-en-main pour les entrepôts, plateformes logistiques et centres de distribution. Nous optimisons vos flux avec des équipements performants et connectés.",
      en: "Turnkey solutions for warehouses, logistics platforms and distribution centers. We optimize your flows with high-performance, connected equipment.",
      es: "Soluciones llave en mano para almacenes, plataformas logísticas y centros de distribución. Optimizamos sus flujos con equipos de alto rendimiento y conectados.",
    },
    fullDescription: {
      fr: "Optimisez votre chaîne logistique avec nos solutions de manutention de pointe. Que vous gériez un petit entrepôt ou une grande plateforme de distribution, nos équipements TOYOTA Material Handling vous garantissent fiabilité, ergonomie et productivité.",
      en: "Optimize your supply chain with our cutting-edge material handling solutions. Whether you manage a small warehouse or a large distribution platform, our TOYOTA Material Handling equipment guarantees reliability, ergonomics and productivity.",
      es: "Optimice su cadena de suministro con nuestras soluciones de manipulación de materiales de vanguardia. Ya sea que gestione un pequeño almacén o una gran plataforma de distribución, nuestros equipos TOYOTA Material Handling le garantizan fiabilidad, ergonomía y productividad.",
    },
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1772558432/manutention_ihkkzn.jpg",
    icon: Truck,
    features: [
      {
        fr: "Chariots frontaux électriques et thermiques",
        en: "Electric and thermal front forklifts",
        es: "Carretillas frontales eléctricas y térmicas",
      },
      {
        fr: "Gerbeurs et transpalettes électriques",
        en: "Electric stackers and pallet trucks",
        es: "Apiladores y transpaletas eléctricas",
      },
      {
        fr: "Préparateurs de commande horizontaux et verticaux",
        en: "Horizontal and vertical order pickers",
        es: "Preparadores de pedidos horizontales y verticales",
      },
      {
        fr: "Chariots à mât rétractable",
        en: "Reach trucks",
        es: "Carretillas retráctiles",
      },
      {
        fr: "Solutions d'automatisation (AGV)",
        en: "Automation solutions (AGV)",
        es: "Soluciones de automatización (AGV)",
      },
      {
        fr: "Gestion de flotte I_Site",
        en: "I_Site fleet management",
        es: "Gestión de flota I_Site",
      },
    ],
  },
  {
    id: "rayonnage",
    title: {
      fr: "Rayonnage",
      en: "Racking",
      es: "Estanterías",
    },
    subtitle: {
      fr: "Optimisez votre espace de stockage",
      en: "Optimize your storage space",
      es: "Optimice su espacio de almacenamiento",
    },
    description: {
      fr: "Découvrez nos solutions de rayonnage robustes et modulables, conçues pour optimiser votre espace de stockage et simplifier votre organisation au quotidien.",
      en: "Discover our robust and modular racking solutions, designed to optimize your storage space and simplify your daily organization.",
      es: "Descubra nuestras soluciones de estanterías robustas y modulares, diseñadas para optimizar su espacio de almacenamiento y simplificar su organización diaria.",
    },
    fullDescription: {
      fr: "Maximisez votre capacité de stockage grâce à nos systèmes de rayonnage intelligents. Nous concevons et installons des structures adaptées à vos produits, de la charge légère à la charge lourde.",
      en: "Maximize your storage capacity with our intelligent racking systems. We design and install structures adapted to your products, from light to heavy loads.",
      es: "Maximice su capacidad de almacenamiento con nuestros sistemas de estanterías inteligentes. Diseñamos e instalamos estructuras adaptadas a sus productos, desde cargas ligeras hasta pesadas.",
    },
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1772558428/rayonage_wf9dar.jpg",
    icon: Package,
    features: [
      {
        fr: "Rayonnage à palettes (Rack conventionnel)",
        en: "Pallet racking (Conventional rack)",
        es: "Estanterías para palets (Rack convencional)",
      },
      {
        fr: "Rayonnage par accumulation (Drive-in)",
        en: "Drive-in racking",
        es: "Estanterías por acumulación (Drive-in)",
      },
      {
        fr: "Rayonnage dynamique et mobile",
        en: "Dynamic and mobile racking",
        es: "Estanterías dinámicas y móviles",
      },
      {
        fr: "Plateformes de stockage et mezzanines",
        en: "Storage platforms and mezzanines",
        es: "Plataformas de almacenamiento y mezzanines",
      },
      {
        fr: "Rayonnage mi-lourd et léger pour picking",
        en: "Medium and light racking for picking",
        es: "Estanterías semi-pesadas y ligeras para picking",
      },
      {
        fr: "Cantilever pour charges longues",
        en: "Cantilever for long loads",
        es: "Cantilever para cargas largas",
      },
    ],
  },
  {
    id: "solutions-automatisees",
    title: {
      fr: "Solutions Automatisées",
      en: "Automated Solutions",
      es: "Soluciones Automatizadas",
    },
    subtitle: {
      fr: "Automatisation, stockage intelligent et manutention continue",
      en: "Automation, smart storage and continuous handling",
      es: "Automatización, almacenamiento inteligente y manutención continua",
    },
    description: {
      fr: "",
      en: "Integrated solutions to modernize and optimize logistics flows with Toyota automated solutions, industrial racking, Pick-to-Light systems and roller conveyors.",
      es: "Soluciones integradas para modernizar y optimizar los flujos logísticos con soluciones automatizadas Toyota, estanterías industriales, sistemas Pick-to-Light y transportadores de rodillos.",
    },
    fullDescription: {
      fr: "Nous accompagnons les entreprises dans la modernisation et l'optimisation de leurs flux logistiques grâce à des solutions intégrées alliant automatisation, stockage intelligent et manutention continue. Notre offre comprend les solutions automatisées Toyota, conçues pour améliorer la productivité, la sécurité et la performance opérationnelle des entrepôts. Elle s'appuie également sur une gamme complète de systèmes de rayonnage industriels, adaptés à tous les besoins de stockage, du picking manuel aux installations à haute densité. Pour optimiser la préparation des commandes, nous proposons des systèmes Pick-to-Light, permettant un guidage visuel rapide et précis des opérateurs, réduisant ainsi les erreurs et augmentant la cadence de traitement. Enfin, nos convoyeurs à rouleaux assurent un transfert fluide et efficace des marchandises entre les différentes zones de l'entrepôt, contribuant à l'automatisation des flux internes et à la réduction des manipulations manuelles. Grâce à cette combinaison de technologies innovantes, nous concevons des solutions sur mesure permettant d'améliorer la performance logistique, d'optimiser l'espace de stockage et de soutenir la croissance de nos clients.",
      en: "We support companies in modernizing and optimizing their logistics flows through integrated solutions combining automation, smart storage and continuous handling. Our offer includes Toyota automated solutions designed to improve warehouse productivity, safety and operational performance. It also relies on a complete range of industrial racking systems adapted to every storage need, from manual picking to high-density installations. To optimize order preparation, we provide Pick-to-Light systems that give operators fast and precise visual guidance, reducing errors and increasing processing rates. Finally, our roller conveyors ensure smooth and efficient transfer of goods between warehouse areas, contributing to internal flow automation and reducing manual handling. Through this combination of innovative technologies, we design tailored solutions that improve logistics performance, optimize storage space and support our customers' growth.",
      es: "Acompañamos a las empresas en la modernización y optimización de sus flujos logísticos mediante soluciones integradas que combinan automatización, almacenamiento inteligente y manutención continua. Nuestra oferta incluye soluciones automatizadas Toyota, diseñadas para mejorar la productividad, la seguridad y el rendimiento operativo de los almacenes. También se apoya en una gama completa de sistemas de estanterías industriales, adaptados a todas las necesidades de almacenamiento, desde el picking manual hasta instalaciones de alta densidad. Para optimizar la preparación de pedidos, ofrecemos sistemas Pick-to-Light que proporcionan una guía visual rápida y precisa a los operadores, reduciendo errores y aumentando el ritmo de tratamiento. Por último, nuestros transportadores de rodillos aseguran una transferencia fluida y eficaz de mercancías entre las distintas zonas del almacén, contribuyendo a la automatización de los flujos internos y a la reducción de manipulaciones manuales. Gracias a esta combinación de tecnologías innovadoras, diseñamos soluciones a medida que mejoran el rendimiento logístico, optimizan el espacio de almacenamiento y apoyan el crecimiento de nuestros clientes.",
    },
    image:
      "https://tmhe-media.azureedge.net/published/44168_2500x700_toyota%20mh.jpg",
    icon: Zap,
    features: [
      {
        fr: "Solutions automatisées Toyota",
        en: "Toyota automated solutions",
        es: "Soluciones automatizadas Toyota",
      },
      {
        fr: "Systèmes de rayonnage industriel",
        en: "Industrial racking systems",
        es: "Sistemas de estanterías industriales",
      },
      {
        fr: "Systèmes Pick-to-Light",
        en: "Pick-to-Light systems",
        es: "Sistemas Pick-to-Light",
      },
      {
        fr: "Convoyeurs à rouleaux",
        en: "Roller conveyors",
        es: "Transportadores de rodillos",
      },
    ],
  },
  {
    id: "levage",
    title: {
      fr: "Levage",
      en: "Lifting",
      es: "Elevación",
    },
    subtitle: {
      fr: "Solutions performantes pour vos chantiers les plus exigeants",
      en: "Lifting solutions for demanding construction sites",
      es: "Soluciones de elevación para obras exigentes",
    },
    description: {
      fr: "Des équipements de levage adaptés à tous vos besoins, des grues mobiles aux solutions spécialisées. Nous vous accompagnons dans le choix, la location ou l’achat de matériels fiables, robustes et à haute performance.",
      en: "Lifting equipment adapted to all your needs, from mobile cranes to specialized solutions. We support you in choosing, renting, or purchasing reliable, robust, and high-performance equipment.",
      es: "Equipos de elevación adaptados a todas sus necesidades, desde grúas móviles hasta soluciones especializadas. Le acompañamos en la elección, alquiler o compra de equipos fiables, robustos y de alto rendimiento.",
    },
    fullDescription: {
      fr: "Pour vos opérations de levage les plus complexes, faites confiance à notre expertise. Nous proposons une gamme complète d'équipements de levage répondant aux normes de sécurité les plus strictes.",
      en: "For your most complex lifting operations, trust our expertise. We offer a complete range of lifting equipment meeting the strictest safety standards.",
      es: "Para sus operaciones de elevación más complejas, confíe en nuestra experiencia. Ofrecemos una gama completa de equipos de elevación que cumplen con las normas de seguridad más estrictas.",
    },
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1776770308/253cdf25a2b9228c1503755d70550c69_oupnqh.webp",
    icon: MoveVertical,
    features: [
      {
        fr: "Grues tout-terrain",
        en: "All-terrain cranes",
        es: "Grúas todoterreno",
      },
      {
        fr: "Grues sur pneus",
        en: "Rough terrain cranes",
        es: "Grúas sobre neumáticos",
      },
      {
        fr: "Grues sur chenilles",
        en: "Crawler cranes",
        es: "Grúas sobre orugas",
      },
      {
        fr: "Grues à flèche",
        en: "Boom cranes",
        es: "Grúas de pluma",
      },
      {
        fr: "Grues montées sur camion",
        en: "Truck-mounted cranes",
        es: "Grúas montadas sobre camión",
      },
    ],
  },
  {
    id: "terrassement",
    title: {
      fr: "Terrassement & Construction",
      en: "Earthmoving & Construction",
      es: "Movimiento de tierras y construcción",
    },
    subtitle: {
      fr: "Matériels lourds pour les chantiers de BTP",
      en: "Heavy equipment for construction sites",
      es: "Equipos pesados para obras de construcción",
    },
    description: {
      fr: "Matériels lourds pour les chantiers de BTP et les projets d'infrastructure. Nous fournissons des équipements robustes pour garantir la réussite de vos projets.",
      en: "Heavy equipment for construction sites and infrastructure projects. We provide robust equipment to ensure the success of your projects.",
      es: "Equipos pesados para obras de construcción y proyectos de infraestructura. Proporcionamos equipos robustos para garantizar el éxito de sus proyectos.",
    },
    fullDescription: {
      fr: "Les chantiers de terrassement et de construction exigent des machines robustes et performantes. En partenariat avec SANY, nous vous offrons des engins capables d'affronter les terrains les plus difficiles.",
      en: "Earthmoving and construction sites require robust and high-performance machines. In partnership with SANY, we offer you equipment capable of tackling the most difficult terrain.",
      es: "Las obras de movimiento de tierras y construcción requieren máquinas robustas y de alto rendimiento. En asociación con SANY, le ofrecemos equipos capaces de enfrentar los terrenos más difíciles.",
    },
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/SY950H_1920_108-190929?x-oss-process=image/format,webp",
    icon: HardHat,
    features: [
      {
        fr: "Pelles hydrauliques sur chenilles et sur pneus",
        en: "Crawler and wheeled hydraulic excavators",
        es: "Excavadoras hidráulicas sobre orugas y neumáticos",
      },
      {
        fr: "Chargeuses sur pneus",
        en: "Wheel loaders",
        es: "Cargadoras de ruedas",
      },
      {
        fr: "Tractopelles",
        en: "Backhoe loaders",
        es: "Retroexcavadoras",
      },
      {
        fr: "Niveleuses et compacteurs",
        en: "Graders and compactors",
        es: "Motoniveladoras y compactadores",
      },
      { fr: "Bulldozers", en: "Bulldozers", es: "Bulldozers" },
      {
        fr: "Bétonnières et pompes à béton",
        en: "Concrete mixers and concrete pumps",
        es: "Hormigoneras y bombas de hormigón",
      },
      {
        fr: "Service après-vente sur chantier",
        en: "On-site after-sales service",
        es: "Servicio postventa en obra",
      },
    ],
  },
  {
    id: "mines",
    title: {
      fr: "Mines & Carrières",
      en: "Mines & Quarries",
      es: "Minas y Canteras",
    },
    subtitle: {
      fr: "Machines pour environnements extrêmes",
      en: "Machines for extreme environments",
      es: "Máquinas para entornos extremos",
    },
    description: {
      fr: "Machines puissantes et résistantes pour les environnements extrêmes. Nos équipements sont conçus pour résister aux conditions les plus difficiles.",
      en: "Powerful and resistant machines for extreme environments. Our equipment is designed to withstand the most difficult conditions.",
      es: "Máquinas potentes y resistentes para entornos extremos. Nuestros equipos están diseñados para resistir las condiciones más difíciles.",
    },
    fullDescription: {
      fr: "L'industrie minière requiert une fiabilité absolue. Nos équipements pour mines et carrières sont conçus pour fonctionner en continu dans des conditions extrêmes.",
      en: "The mining industry requires absolute reliability. Our equipment for mines and quarries is designed to operate continuously in extreme conditions.",
      es: "La industria minera requiere una fiabilidad absoluta. Nuestros equipos para minas y canteras están diseñados para funcionar continuamente en condiciones extremas.",
    },
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/q_auto/f_auto/v1775225678/1741160864383_smlp5b.jpg",
    icon: Mountain,
    features: [
      {
        fr: "Pelles minières de grand tonnage",
        en: "Large tonnage mining excavators",
        es: "Excavadoras mineras de gran tonelaje",
      },
      {
        fr: "Dumpers rigides et articulés",
        en: "Rigid and articulated dump trucks",
        es: "Volquetes rígidos y articulados",
      },
      {
        fr: "Concasseurs et cribleurs mobiles",
        en: "Mobile crushers and screeners",
        es: "Trituradoras y cribas móviles",
      },
      {
        fr: "Foreuses de surface",
        en: "Surface drilling rigs",
        es: "Perforadoras de superficie",
      },
      {
        fr: "Systèmes de convoyage",
        en: "Conveying systems",
        es: "Sistemas de transporte",
      },
      {
        fr: "Contrats de maintenance Full Service",
        en: "Full Service maintenance contracts",
        es: "Contratos de mantenimiento Full Service",
      },
    ],
  },
  {
    id: "portuaire",
    title: {
      fr: "Portuaire",
      en: "Port Operations",
      es: "Operaciones Portuarias",
    },
    subtitle: {
      fr: "Équipements pour terminaux maritimes",
      en: "Equipment for maritime terminals",
      es: "Equipos para terminales marítimos",
    },
    description: {
      fr: "Équipements lourds dédiés aux environnements portuaires. Location ou vente d'engins performants, robustes et adaptés aux exigences logistiques.",
      en: "Heavy equipment dedicated to port environments. Rental or sale of high-performance, robust equipment adapted to logistics requirements.",
      es: "Equipos pesados dedicados a entornos portuarios. Alquiler o venta de equipos de alto rendimiento, robustos y adaptados a los requisitos logísticos.",
    },
    fullDescription: {
      fr: "La fluidité des opérations portuaires est cruciale. Nous fournissons des équipements de manutention de conteneurs et de vrac reconnus pour leur rapidité et leur robustesse.",
      en: "The fluidity of port operations is crucial. We supply container and bulk handling equipment recognized for its speed and robustness.",
      es: "La fluidez de las operaciones portuarias es crucial. Suministramos equipos de manipulación de contenedores y graneles reconocidos por su rapidez y robustez.",
    },
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1772756322/pnou-001_jmjo80.jpg",
    icon: Anchor,
    features: [
      {
        fr: "Reach stackers (Manutention de conteneurs pleins)",
        en: "Reach stackers (Full container handling)",
        es: "Reach stackers (Manipulación de contenedores llenos)",
      },
      {
        fr: "Empty container handlers (Conteneurs vides)",
        en: "Empty container handlers",
        es: "Manipuladores de contenedores vacíos",
      },
      {
        fr: "Chariots cavaliers (Straddle carriers)",
        en: "Straddle carriers",
        es: "Portacontenedores de pórtico",
      },
      {
        fr: "Tracteurs de terminal",
        en: "Terminal tractors",
        es: "Tractores de terminal",
      },
      {
        fr: "Grues portuaires mobiles",
        en: "Mobile harbor cranes",
        es: "Grúas portuarias móviles",
      },
      {
        fr: "Formation des opérateurs portuaires",
        en: "Port operator training",
        es: "Formación de operadores portuarios",
      },
    ],
  },
  {
    id: "transport",
    title: {
      fr: "Transport",
      en: "Transport",
      es: "Transporte",
    },
    subtitle: {
      fr: "Camions pour transport d'équipements lourds",
      en: "Trucks for heavy equipment transport",
      es: "Camiones para transporte de equipos pesados",
    },
    description: {
      fr: "Vente de camions adaptés au transport d'équipements lourds. Des solutions robustes pour les professionnels du BTP et de l'industrie.",
      en: "Sale of trucks adapted for heavy equipment transport. Robust solutions for construction and industry professionals.",
      es: "Venta de camiones adaptados para el transporte de equipos pesados. Soluciones robustas para profesionales de la construcción e industria.",
    },
    fullDescription: {
      fr: "Le transport de charges lourdes et d'engins nécessite des véhicules spécifiques. Nous proposons une gamme de camions et de remorques conçus pour la logistique industrielle et le BTP.",
      en: "Transporting heavy loads and equipment requires specific vehicles. We offer a range of trucks and trailers designed for industrial logistics and construction.",
      es: "El transporte de cargas pesadas y equipos requiere vehículos específicos. Ofrecemos una gama de camiones y remolques diseñados para logística industrial y construcción.",
    },
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1768325136/Dump-Truck-Truck-SANY-Group-01-13-2026_06_24_PM_fow0o6.png",
    icon: Truck,
    features: [
      {
        fr: "Tracteurs routiers 4x2, 6x4",
        en: "Road tractors 4x2, 6x4",
        es: "Tractores de carretera 4x2, 6x4",
      },
      {
        fr: "Camions porteurs avec grue auxiliaire",
        en: "Carrier trucks with auxiliary crane",
        es: "Camiones portadores con grúa auxiliar",
      },
      {
        fr: "Semi-remorques porte-engins",
        en: "Equipment flatbed semi-trailers",
        es: "Semirremolques porta-equipos",
      },
      {
        fr: "Plateaux extensibles",
        en: "Extendable platforms",
        es: "Plataformas extensibles",
      },
      {
        fr: "Bennes TP",
        en: "Construction dump trucks",
        es: "Volquetes de construcción",
      },
      {
        fr: "Solutions de financement",
        en: "Financing solutions",
        es: "Soluciones de financiación",
      },
    ],
  },
  {
    id: "energie",
    title: {
      fr: "Énergie",
      en: "Energy",
      es: "Energía",
    },
    subtitle: {
      fr: "Groupes électrogènes et solutions off-grid",
      en: "Power generators and off-grid solutions",
      es: "Grupos electrógenos y soluciones off-grid",
    },
    description: {
      fr: "Groupes électrogènes et solutions off-grid pour les sites isolés ou en soutien au réseau. Une énergie fiable en toutes circonstances.",
      en: "Power generators and off-grid solutions for remote sites or grid support. Reliable energy in all circumstances.",
      es: "Grupos electrógenos y soluciones off-grid para sitios remotos o apoyo a la red. Energía confiable en todas las circunstancias.",
    },
    fullDescription: {
      fr: "Garantissez la continuité de vos opérations avec nos solutions d'énergie. Que ce soit pour alimenter un chantier isolé, sécuriser un data center ou pallier aux coupures réseau.",
      en: "Ensure the continuity of your operations with our energy solutions. Whether powering an isolated site, securing a data center, or bridging network outages.",
      es: "Garantice la continuidad de sus operaciones con nuestras soluciones de energía. Ya sea alimentando un sitio aislado, asegurando un centro de datos o compensando cortes de red.",
    },
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1768324809/Generated_Image_January_13_2026_-_6_16PM_iqwyal.png",
    icon: Zap,
    features: [
      {
        fr: "Groupes électrogènes diesel (10kVA à 2500kVA)",
        en: "Diesel generators (10kVA to 2500kVA)",
        es: "Grupos electrógenos diésel (10kVA a 2500kVA)",
      },
      {
        fr: "Mâts d'éclairage mobiles",
        en: "Mobile lighting towers",
        es: "Torres de iluminación móviles",
      },
      {
        fr: "Solutions hybrides (Solaire + Diesel)",
        en: "Hybrid solutions (Solar + Diesel)",
        es: "Soluciones híbridas (Solar + Diésel)",
      },
      {
        fr: "Inverseurs de source automatiques",
        en: "Automatic transfer switches",
        es: "Inversores de fuente automáticos",
      },
      {
        fr: "Cuves à carburant grande capacité",
        en: "Large capacity fuel tanks",
        es: "Tanques de combustible de gran capacidad",
      },
      {
        fr: "Maintenance 24/7",
        en: "24/7 Maintenance",
        es: "Mantenimiento 24/7",
      },
    ],
  },
];

export default solutions;
