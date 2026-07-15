export interface RayonnageElement {
  id: string;
  title: string;
  description: string;
  advantages: string[];
  images: [string, string];
}

export const rayonnageElements: RayonnageElement[] = [
  {
    id: "rayonnage-autoportant",
    title: "Rayonnage Autoportant",
    description:
      "Le système autoportant offre une solution de stockage performante, combinant capacité élevée et efficacité opérationnelle.",
    advantages: [
      "Grande capacité de stockage, exploitant pleinement la hauteur disponible.",
      "Optimisation des coûts et des délais de mise en œuvre.",
      "Pas besoin de construction préalable de bâtiment.",
      "Sécurité et fiabilité garanties grâce à des structures métalliques de haute qualité et des produits de grande valeur.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062713/Sans_titre_-_1-02_plyema.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062632/Sans_titre_-_1-01_jcyae8.png",
    ],
  },
  {
    id: "rayonnage-conventionnel",
    title: "Rayonnage Conventionnel",
    description:
      "Rayonnage pour palettes en simple profondeur, offrant un accès direct à chaque unité de charge. Conçu selon la charge, la hauteur d'entrepôt et les caractéristiques des chariots élévateurs, il garantit flexibilité et sécurité. La gamme est modulable et adaptée à tous types de palettes et configurations.",
    advantages: [
      "Accès direct à chaque palette.",
      "Sélectivité maximale des références.",
      "Adaptable à tout espace et type de palette.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062713/Sans_titre_-_1-03_fdgabx.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062714/Sans_titre_-_1-04_vzzg0i.png",
    ],
  },
  {
    id: "rayonnage-par-accumulation",
    title: "Rayonnage par Accumulation",
    description:
      "Système de stockage conçu pour maximiser l'utilisation de l'espace en supprimant les allées de circulation, permettant un gain de jusqu'à 85 % de surface de stockage. Idéal pour le stockage de produits homogènes et de grandes séries de production, ce système offre également une modularité facilitant l'adaptation aux besoins futurs de l'entrepôt.",
    advantages: [
      "Optimisation maximale de l'espace sans allées entre les palettes.",
      "Stockage de plusieurs palettes en profondeur pour un volume accru.",
      "Gestion efficace des références avec un emplacement dédié par module.",
      "Structures métalliques robustes garantissant sécurité et fiabilité.",
      "Accès rapide et mécanisable : compatible avec systèmes automatisés ou chariots guidés pour améliorer la productivité.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062665/Sans_titre_-_1-06_hcbrms.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062715/Sans_titre_-_1-05_mvmdb7.png",
    ],
  },
  {
    id: "rayonnage-semi-lourd",
    title: "Rayonnage Semi-Lourd",
    description:
      "Ce rayonnage est conçu pour le stockage de produits de poids et dimensions moyens à élevés, avec un chargement manuel sur plusieurs niveaux. Il permet d'exploiter pleinement la hauteur de l'entrepôt, grâce à des niveaux réglables tous les 50 mm. Chaque travée peut être configurée indépendamment, offrant une grande flexibilité pour adapter l'espace de stockage à différents types de produits.",
    advantages: [
      "Optimisation de l'espace en hauteur.",
      "Flexibilité grâce aux niveaux réglables et travées modulables.",
      "Accès facile et direct aux produits.",
      "Adapté aux charges moyennes et lourdes.",
      "Installation simple et évolutive selon les besoins de l'entrepôt.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062665/Sans_titre_-_1-07_wmxbro.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062666/Sans_titre_-_1-08_g7akrf.png",
    ],
  },
  {
    id: "rayonnage-lourd-dynamique",
    title: "Rayonnage Lourd Dynamique",
    description:
      "Rayonnages dynamiques pour palettes, équipés de chemins à rouleaux légèrement inclinés permettant aux charges de se déplacer par gravité. Ce système assure un flux constant et contrôlé des marchandises.",
    advantages: [
      "Idéal pour les produits périssables.",
      "Rotation FIFO (premier entré, premier sorti) garantie.",
      "Optimisation de l'espace sans allées supplémentaires.",
      "Réduction des délais de préparation des commandes.",
      "Protection des palettes et de la structure contre les dommages.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062666/Sans_titre_-_1-09_tencoe.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062667/Sans_titre_-_1-10_aogjr3.png",
    ],
  },
  {
    id: "rayonnage-mi-lourd-dynamique",
    title: "Rayonnage Mi-Lourd Dynamique",
    description:
      "Solution optimisée pour le stockage de produits de taille moyenne, combinant fonctionnement gravitationnel et ergonomie pour un picking rapide et efficace.",
    advantages: [
      "Réduction du temps de préparation jusqu'à 75 %.",
      "Optimisation de l'espace et diminution des allées.",
      "Installation simple, sans énergie ni maintenance complexe.",
      "Adapté à l'industrie, la logistique, le commerce de gros et le secteur pharmaceutique.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062668/Sans_titre_-_1-12_rhk3q0.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062667/Sans_titre_-_1-11_mx1oey.png",
    ],
  },
  {
    id: "passerelle",
    title: "Passerelle",
    description:
      "Système de stockage optimisant la hauteur de l'entrepôt pour maximiser le volume. Des passerelles surélevées reliées par des escaliers permettent un accès facile à tous les niveaux.",
    advantages: [
      "Accès direct à chaque niveau sans matériel de levage.",
      "Modulaire : facile à étendre ou à reconfigurer.",
      "Adaptable à différents types de charges et poids.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062669/Sans_titre_-_1-14_txcckx.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062668/Sans_titre_-_1-13_lgdt7k.png",
    ],
  },
  {
    id: "mezzanine",
    title: "Mezzanine",
    description:
      "Structure modulaire sur mesure qui exploite pleinement la hauteur de l'entrepôt, doublant ou triplant l'espace disponible. Facile à monter, sans travaux de génie civil, et facilement déplaçable si nécessaire.",
    advantages: [
      "Optimisation de l'espace.",
      "Polyvalente et adaptable.",
      "Possibilité d'installer un bureau ou un loft sur la structure.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062677/Sans_titre_-_1-16_k7paay.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062670/Sans_titre_-_1-15_dznba7.png",
    ],
  },
  {
    id: "radio-shuttle-atox",
    title: "Radio Shuttle ATOX",
    description:
      "Le Radio Shuttle ATOX est un système automatisé pour le stockage de palettes, piloté à distance et conçu pour des opérations rapides et sécurisées. Il permet d'exploiter pleinement les rayonnages compacts, sans limiter la profondeur ni la rotation des stocks, et fonctionne en LIFO ou FIFO selon les besoins.",
    advantages: [
      "Stockage haute capacité jusqu'à 1 200 kg.",
      "Suppression des allées entre palettes pour optimiser l'espace et la rotation.",
      "Manœuvres rapides et sûres grâce au pilotage à distance et aux guides de centrage.",
      "Fiabilité et qualité ATOX.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062712/Sans_titre_-_1-18_otwy8d.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062713/Sans_titre_-_1-17_bhoxtj.png",
    ],
  },
  {
    id: "rayonnage-eco-sl4000",
    title: "Rayonnage Eco SL4000",
    description:
      "Système d'étagères légères sans vis, polyvalent et facile à monter, adapté à tous types d'espaces, professionnels ou domestiques.",
    advantages: [
      "Montage rapide, sans outils.",
      "Peut se transformer en tables ou établis.",
      "Utilisation flexible pour le professionnel ou la maison.",
      "Combinable de multiples façons avec les mêmes éléments.",
      "Possibilité de créer des passerelles surélevées.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062714/Sans_titre_-_1-19_c1gbmo.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062667/Sans_titre_-_1-20_gjrsit.png",
    ],
  },
  {
    id: "systemes-pick-to-light",
    title: "Systèmes Pick-to-Light",
    description:
      "Les systèmes pick-to-light et put-to-light optimisent les flux de travail en entrepôt. Le pick-to-light facilite la préparation rapide et précise des commandes, tandis que le put-to-light permet de consolider et vérifier efficacement les produits. Ces solutions sont idéales pour améliorer la productivité et la fiabilité des opérations logistiques.",
    advantages: [
      "Accélération et précision des opérations de préparation et de vérification.",
      "Réduction des erreurs de picking et de consolidation.",
      "Flexibilité pour s'adapter à différents types d'entrepôts et de flux.",
      "Optimisation de l'efficacité et de la productivité de l'entrepôt.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062663/Sans_titre_-_1-21_bcxjp2.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062664/Sans_titre_-_1-22_cbdli5.png",
    ],
  },
  {
    id: "convoyeurs-a-rouleaux",
    title: "Convoyeurs à Rouleaux",
    description:
      "Les convoyeurs à rouleaux ATOX offrent une manutention rapide et flexible, avec sections motorisées et libres, adaptées aux trajets droits, courbes ou en pente. Ils peuvent s'intégrer facilement à d'autres systèmes automatisés pour une gestion optimisée des flux.",
    advantages: [
      "Maintenance simple et efficacité maximale.",
      "Itinéraires polyvalents et adaptables.",
      "Intégration facile avec d'autres systèmes automatisés.",
      "Fiabilité et qualité ATOX.",
    ],
    images: [
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062665/Sans_titre_-_1-23_kyn0xs.png",
      "https://res.cloudinary.com/doflwt77p/image/upload/v1773062676/Sans_titre_-_1-24_vl6h89.png",
    ],
  },
];
