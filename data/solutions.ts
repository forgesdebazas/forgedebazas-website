import {
  Package,
  Truck,
  HardHat,
  Zap,
  Anchor,
  Mountain,
  MoveVertical,
  Factory,
  Bot,
  LucideIcon,
} from "lucide-react";

export interface Solution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription?: string; // For the detailed page
  image: string;
  icon: LucideIcon;
  features: string[];
}

export const solutions: Solution[] = [
  {
    id: "manutention",
    title: "Manutention",
    subtitle: "Solutions clé-en-main pour les entrepôts et la logistique",
    description:
      "Solutions clé-en-main pour les entrepôts, plateformes logistiques et centres de distribution. Nous optimisons vos flux avec des équipements performants et connectés.",
    fullDescription:
      "Optimisez votre chaîne logistique avec nos solutions de manutention de pointe. Que vous gériez un petit entrepôt ou une grande plateforme de distribution, nos équipements TOYOTA Material Handling vous garantissent fiabilité, ergonomie et productivité. De la simple transpalette au chariot tridirectionnel automatisé, nous avons la solution adaptée à chaque flux.",
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1772558432/manutention_ihkkzn.jpg",
    icon: Truck,
    features: [
      "Chariots frontaux électriques et thermiques",
      "Gerbeurs et transpalettes électriques",
      "Préparateurs de commande horizontaux et verticaux",
      "Chariots à mât rétractable",
      "Solutions d'automatisation (AGV)",
      "Gestion de flotte I_Site",
    ],
  },
  {
    id: "rayonnage",
    title: "Rayonnage",
    subtitle: "Optimisez votre espace de stockage",
    description:
      "Découvrez nos solutions de rayonnage robustes et modulables, conçues pour optimiser votre espace de stockage et simplifier votre organisation au quotidien.",
    fullDescription:
      "Maximisez votre capacité de stockage grâce à nos systèmes de rayonnage intelligents. Nous concevons et installons des structures adaptées à vos produits, de la charge légère à la charge lourde. Nos ingénieurs étudient votre espace pour proposer la configuration la plus efficiente, garantissant sécurité et accessibilité.",
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1772558428/rayonage_wf9dar.jpg",
    icon: Package,
    features: [
      "Rayonnage à palettes (Rack conventionnel)",
      "Rayonnage par accumulation (Drive-in)",
      "Rayonnage dynamique et mobile",
      "Plateformes de stockage et mezzanines",
      "Rayonnage mi-lourd et léger pour picking",
      "Cantilever pour charges longues",
    ],
  },
  {
    id: "solutions-automatisees",
    title: "Solutions Automatisées",
    subtitle: "Automatisation, stockage intelligent et manutention continue",
    description: "",
    fullDescription:
      "Nous accompagnons les entreprises dans la modernisation et l'optimisation de leurs flux logistiques grâce à des solutions intégrées alliant automatisation, stockage intelligent et manutention continue. Notre offre comprend les solutions automatisées Toyota, les systèmes de rayonnage industriels, les systèmes Pick-to-Light et les convoyeurs à rouleaux afin d'améliorer la performance logistique, d'optimiser l'espace de stockage et de soutenir la croissance de nos clients.",
    image:
      "https://tmhe-media.azureedge.net/published/44168_2500x700_toyota%20mh.jpg",
    icon: Zap,
    features: [
      "Solutions automatisées Toyota",
      "Systèmes de rayonnage industriel",
      "Systèmes Pick-to-Light",
      "Convoyeurs à rouleaux",
    ],
  },
  {
    id: "levage",
    title: "Levage",
    subtitle: "Solutions performantes pour vos chantiers les plus exigeants",
    description:
      "Des équipements de levage adaptés à tous vos besoins, des grues mobiles aux solutions spécialisées. Nous vous accompagnons dans le choix, la location ou l’achat de matériels fiables, robustes et à haute performance.",
    fullDescription:
      "Pour vos opérations de levage les plus complexes, faites confiance à notre expertise. Nous proposons une gamme complète d'équipements de levage répondant aux normes de sécurité les plus strictes. Que ce soit pour l'industrie ou le BTP, nos solutions garantissent précision et puissance.",
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1776770308/253cdf25a2b9228c1503755d70550c69_oupnqh.webp",
    icon: MoveVertical,
    features: [
      "Grues tout-terrain",
      "Grues sur pneus",
      "Grues sur chenilles",
      "Grues à flèche",
      "Grues montées sur camion",
    ],
  },
  {
    id: "terrassement",
    title: "Terrassement & Construction",
    subtitle: "Matériels lourds pour les chantiers de BTP",
    description:
      "Matériels lourds pour les chantiers de BTP et les projets d’infrastructure. Nous fournissons des équipements robustes pour garantir la réussite de vos projets.",
    fullDescription:
      "Les chantiers de terrassement et de construction exigent des machines robustes et performantes. En partenariat avec SANY, nous vous offrons des engins capables d'affronter les terrains les plus difficiles. Puissance hydraulique, confort opérateur et efficacité énergétique sont au cœur de notre gamme.",
    image:
      "https://sanyglobal-img.sany.com.cn/product/goods/20200817/SY950H_1920_108-190929?x-oss-process=image/format,webp",
    icon: HardHat,
    features: [
      "Pelles hydrauliques sur chenilles et sur pneus",
      "Chargeuses sur pneus",
      "Tractopelles",
      "Niveleuses et compacteurs",
      "Bulldozers",
      "Bétonnières et pompes à béton",
      "Service après-vente sur chantier",
    ],
  },
  {
    id: "mines",
    title: "Mines & Carrières",
    subtitle: "Machines pour environnements extrêmes",
    description:
      "Machines puissantes et résistantes pour les environnements extrêmes. Nos équipements sont conçus pour résister aux conditions les plus difficiles.",
    fullDescription:
      "L'industrie minière requiert une fiabilité absolue. Nos équipements pour mines et carrières sont conçus pour fonctionner en continu dans des conditions extrêmes (poussière, chaleur, charges lourdes). Maximisez votre extraction et réduisez vos temps d'arrêt avec nos solutions heavy-duty.",
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/q_auto/f_auto/v1775225678/1741160864383_smlp5b.jpg",
    icon: Mountain,
    features: [
      "Pelles minières de grand tonnage",
      "Dumpers rigides et articulés",
      "Concasseurs et cribleurs mobiles",
      "Foreuses de surface",
      "Systèmes de convoyage",
      "Contrats de maintenance Full Service",
    ],
  },
  {
    id: "portuaire",
    title: "Portuaire",
    subtitle: "Équipements pour terminaux maritimes",
    description:
      "Équipements lourds dédiés aux environnements portuaires. Location ou vente d’engins performants, robustes et adaptés aux exigences logistiques.",
    fullDescription:
      "La fluidité des opérations portuaires est cruciale. Nous fournissons des équipements de manutention de conteneurs et de vrac reconnus pour leur rapidité et leur robustesse. De la mise à quai au stockage dans le terminal, nos solutions assurent une cadence élevée.",
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1772756322/pnou-001_jmjo80.jpg",
    icon: Anchor,
    features: [
      "Reach stackers (Manutention de conteneurs pleins)",
      "Empty container handlers (Conteneurs vides)",
      "Chariots cavaliers (Straddle carriers)",
      "Tracteurs de terminal",
      "Grues portuaires mobiles",
      "Formation des opérateurs portuaires",
    ],
  },
  {
    id: "transport",
    title: "Transport",
    subtitle: "Camions pour transport d'équipements lourds",
    description:
      "Vente de camions adaptés au transport d’équipements lourds. Des solutions robustes pour les professionnels du BTP et de l’industrie.",
    fullDescription:
      "Le transport de charges lourdes et d'engins nécessite des véhicules spécifiques. Nous proposons une gamme de camions et de remorques conçus pour la logistique industrielle et le BTP. Robustesse du châssis, puissance moteur et sécurité sont nos priorités.",
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1768325136/Dump-Truck-Truck-SANY-Group-01-13-2026_06_24_PM_fow0o6.png",
    icon: Truck,
    features: [
      "Tracteurs routiers 4x2, 6x4",
      "Camions porteurs avec grue auxiliaire",
      "Semi-remorques porte-engins",
      "Plateaux extensibles",
      "Bennes TP",
      "Solutions de financement",
    ],
  },
  {
    id: "energie",
    title: "Energie",
    subtitle: "Groupes électrogènes et solutions OFF-GRID",
    description:
      "Groupes électrogènes et solutions off-grid pour les sites isolés ou en soutien au réseau. Une énergie fiable en toutes circonstances.",
    fullDescription:
      "Garantissez la continuité de vos opérations avec nos solutions d'énergie. Que ce soit pour alimenter un chantier isolé, sécuriser un data center ou pallier aux coupures réseau, nos groupes électrogènes offrent une fiabilité à toute épreuve. Nous proposons également des solutions hybrides et solaires.",
    image: "https://res.cloudinary.com/doflwt77p/image/upload/v1772372419/jenerator-seti-bilesenleri-2a_jzdpq2.jpg",
    icon: Zap,
    features: [
      "Groupes électrogènes diesel (10kVA à 2500kVA)",
      "Mâts d'éclairage mobiles",
      "Solutions hybrides (Solaire + Diesel)",
      "Inverseurs de source automatiques",
      "Cuves à carburant grande capacité",
      "Maintenance 24/7",
    ],
  },
];
