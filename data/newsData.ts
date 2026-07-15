export type PortableTextBlock = Record<string, unknown> & {
  _key?: string;
  _type: string;
};

export type ArticleContent = string | PortableTextBlock[];

export interface NewsArticle {
  id: string;
  title: string;
  titleEn?: string;
  titleEs?: string;
  excerpt: string;
  excerptEn?: string;
  excerptEs?: string;
  content?: ArticleContent;
  contentEn?: ArticleContent;
  contentEs?: ArticleContent;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author?: string;
}

import type { Language } from "@/data/translations";

/**
 * Picks the localized variant of an actualité field, falling back to FR
 * when the requested locale has no translation.
 */
export function localizeArticleField(
  article: NewsArticle,
  field: "title" | "excerpt",
  language: Language,
): string | undefined;
export function localizeArticleField(
  article: NewsArticle,
  field: "content",
  language: Language,
): ArticleContent | undefined;
export function localizeArticleField(
  article: NewsArticle,
  field: "title" | "excerpt" | "content",
  language: Language,
): string | ArticleContent | undefined {
  if (language === "en") {
    const key = `${field}En` as const;
    const val = article[key];
    if (typeof val === "string" && val.trim() !== "") return val;
    if (Array.isArray(val) && val.length > 0) return val;
  } else if (language === "es") {
    const key = `${field}Es` as const;
    const val = article[key];
    if (typeof val === "string" && val.trim() !== "") return val;
    if (Array.isArray(val) && val.length > 0) return val;
  }
  return article[field];
}

export const newsArticles: NewsArticle[] = [
  {
    id: "partenariat-sany-2019",
    title: "Un Partenariat Stratégique au Service des Professionnels Marocains",
    excerpt:
      "En tant que distributeur exclusif SANY au Maroc, nous mettons à disposition une gamme complète d'équipements performants, robustes et innovants.",
    content: `
      <p>En tant que distributeur exclusif SANY au Maroc, nous mettons à disposition des entreprises de construction, des acteurs des travaux publics et des professionnels de l'industrie une gamme complète d'équipements performants, robustes et innovants.</p>
      <p>Ce partenariat nous permet d'offrir au marché marocain :</p>
      <ul>
        <li>Des équipements à haute performance</li>
        <li>Des technologies modernes adaptées aux grands chantiers</li>
        <li>Un excellent rapport qualité/prix</li>
        <li>Une disponibilité rapide des machines et pièces de rechange</li>
      </ul>
    `,
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1769983236/BC3A1478_1_ggrtgj.jpg",
    category: "Partenariats",
    date: "12 Mai 2019",
    readTime: "4 min",
    author: "Direction Forges de Bazas",
  },
  {
    id: "sib-2024",
    title: "FORGES DE BAZAS participe au Salon SIB 2024 (20 au 24 novembre 2024)",
    excerpt:
      "Cette participation s'inscrit pleinement dans notre stratégie de proximité avec les professionnels du marché et notre volonté de présenter des solutions fiables et performantes.",
    content: `
      <p>FORGES DE BAZAS a eu le plaisir de participer au Salon International du Bâtiment (SIB) 2024, qui s'est tenu du 20 au 24 novembre 2024, un événement majeur réunissant les acteurs clés du secteur du BTP, de l'industrie et des équipements professionnels.</p>

      <h2>Une présence stratégique</h2>
      <p>Cette participation s'inscrit pleinement dans notre stratégie de proximité avec les professionnels du marché et notre volonté de présenter des solutions fiables, performantes et adaptées aux besoins du terrain. Le salon a été une excellente opportunité pour mettre en avant notre expertise dans les engins lourds, équipements de manutention et solutions industrielles, ainsi que les marques que nous représentons.</p>

      <h2>Des échanges fructueux</h2>
      <p>Tout au long du salon, nos équipes ont échangé avec de nombreux professionnels, partenaires et clients, identifiant de nouvelles opportunités de collaboration et des projets à fort potentiel. Ces échanges ont permis de mieux comprendre les enjeux actuels du marché et de proposer des solutions concrètes, orientées performance et durabilité.</p>

      <h2>Notre engagement</h2>
      <p>La participation au SIB 2024 confirme l'engagement de FORGES DE BAZAS à accompagner ses clients à chaque étape de leurs projets, en leur offrant un accompagnement personnalisé, un service de qualité et des équipements répondant aux standards les plus exigeants.</p>

      <p>Nous remercions l'ensemble des visiteurs, partenaires et collaborateurs qui ont contribué au succès de cette édition et restons à votre disposition pour donner suite aux échanges initiés lors du salon.</p>
    `,
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1769983236/BC3A1478_1_ggrtgj.jpg",
    category: "Événements",
    date: "5 novembre 2024",
    readTime: "3 min",
    author: "Direction Forges de Bazas",
  },
  {
    id: "portes-ouvertes-agadir",
    title: "Journée Portes Ouvertes à Agadir",
    excerpt:
      "Cet événement a été une opportunité unique pour découvrir nos engins industriels, nos solutions de manutention et nos services sur mesure adaptés aux besoins du marché régional.",
    content: `
      <p>FORGES DE BAZAS a organisé une journée portes ouvertes à Agadir, rassemblant des professionnels du BTP, de l'industrie et de la manutention. Cet événement a été une opportunité unique pour découvrir nos engins industriels, nos solutions de manutention et nos services sur mesure adaptés aux besoins du marché régional.</p>

      <h2>Découverte de nos équipements</h2>
      <p>Les visiteurs ont pu bénéficier de présentations techniques, explorer nos équipements de pointe et échanger directement avec nos équipes commerciales et techniques sur des projets concrets et des opportunités de collaboration.</p>

      <h3>Au programme de la journée :</h3>
      <ul>
        <li>Démonstrations en direct de nos engins industriels et de manutention</li>
        <li>Présentations techniques détaillées par nos experts</li>
        <li>Sessions de questions-réponses avec nos équipes commerciales</li>
        <li>Découverte de nos solutions BTP adaptées au marché régional</li>
      </ul>

      <h2>Proximité et accompagnement</h2>
      <p>Cette initiative illustre l'engagement de FORGES DE BAZAS à renforcer la proximité avec ses clients et partenaires, en proposant un accompagnement personnalisé et des solutions adaptées aux exigences du terrain.</p>

      <p>Nous remercions chaleureusement tous les participants pour leur présence et leur confiance, et restons à leur disposition pour toute demande concernant nos engins industriels et solutions BTP.</p>
    `,
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1769476613/WhatsApp_Image_2026-01-26_at_16.30.32_iic1ve.jpg",
    category: "Événements",
    date: "10 octobre 2025",
    readTime: "3 min",
    author: "Service Communication",
  },
  {
    id: "lancement-rayonnage",
    title: "Lancement Officiel de l'Activité Rayonnage chez FORGES DE BAZAS",
    excerpt:
      "Découvrez nos nouvelles solutions de stockage industriel, rayonnages métalliques et systèmes d'organisation d'entrepôt adaptés aux besoins des entreprises.",
    content: `
      <p>FORGES DE BAZAS est fier d'annoncer le lancement officiel de son activité rayonnage. Cette nouvelle offre permet désormais de proposer des solutions complètes de stockage industriel, incluant des rayonnages métalliques et des systèmes d'organisation d'entrepôt, adaptés aux besoins des secteurs industriel, logistique et BTP.</p>

      <h2>Des solutions complètes de stockage</h2>
      <p>Grâce à cette nouvelle activité, nos clients bénéficient de solutions de stockage sur mesure, conçues pour optimiser à la fois la sécurité et l'efficacité des espaces. Cette offre s'appuie sur l'expertise technique reconnue de FORGES DE BAZAS et sur un service client personnalisé.</p>

      <p>Notre gamme de rayonnage comprend :</p>
      <ul>
        <li>Rayonnages lourds pour charges industrielles</li>
        <li>Rayonnages semi-lourds pour entrepôts et ateliers</li>
        <li>Rayonnages légers pour bureaux et archives</li>
        <li>Systèmes de stockage sur mesure</li>
        <li>Solutions complètes d'organisation d'entrepôt</li>
      </ul>

      <h2>Un accompagnement complet</h2>
      <p>Avec ce lancement, FORGES DE BAZAS renforce son engagement à fournir des solutions globales pour les secteurs de l'industrie et de la logistique. Nous accompagnons nos clients à chaque étape de leurs projets, qu'il s'agisse de rayonnages lourds, semi-lourds ou légers.</p>

      <p>Nos services incluent :</p>
      <ul>
        <li>Étude et conseil personnalisé pour optimiser vos espaces</li>
        <li>Installation professionnelle par nos équipes qualifiées</li>
        <li>Suivi technique et maintenance</li>
        <li>Formation à une utilisation en toute sécurité</li>
      </ul>

      <h2>Découvrez nos solutions</h2>
      <p>Nous invitons toutes les entreprises intéressées à découvrir notre offre de rayonnage et à bénéficier d'un accompagnement sur mesure afin d'optimiser leurs espaces de stockage et améliorer leur productivité industrielle.</p>
    `,
    image:
      "https://res.cloudinary.com/doflwt77p/image/upload/v1769983267/190619-352-2-print_1_txunfn.jpg",
    category: "Entreprise",
    date: "Septembre 2025",
    readTime: "4 min",
    author: "Direction Forges de Bazas",
  },
  {
    id: "nouveau-partenariat-sany",
    title: "Nouveau Partenariat Stratégique avec SANY",
    excerpt:
      "Forges de Bazas renforce sa position de leader en devenant distributeur exclusif de SANY au Maroc.",
    content: `
      <p>Nous sommes fiers d'annoncer notre nouveau partenariat stratégique avec SANY, l'un des leaders mondiaux dans la fabrication d'équipements de construction et de manutention.</p>

      <h2>Un partenariat d'excellence</h2>
      <p>Ce partenariat marque une étape importante dans notre développement et renforce notre position de leader sur le marché marocain. En tant que distributeur exclusif de SANY au Maroc, nous proposons désormais une gamme encore plus complète d'équipements de haute qualité.</p>

      <h3>Notre nouvelle offre SANY comprend :</h3>
      <ul>
        <li>Pelles hydrauliques de toutes tailles</li>
        <li>Grues mobiles et sur chenilles</li>
        <li>Engins de terrassement</li>
        <li>Équipements de levage</li>
        <li>Machines de construction routière</li>
      </ul>

      <h2>Un engagement qualité</h2>
      <p>SANY est reconnu mondialement pour la qualité et la fiabilité de ses équipements. Tous les produits sont accompagnés d'une garantie complète et d'un service après-vente assuré par nos équipes de techniciens qualifiés.</p>

      <p>Ce partenariat s'inscrit dans notre volonté constante d'offrir à nos clients les meilleures solutions du marché, alliant performance, fiabilité et innovation.</p>
    `,
    image:
      "https://media.licdn.com/dms/image/v2/D4E22AQHI3d82yqy_Qw/feedshare-shrink_800/feedshare-shrink_800/0/1732612533649?e=2147483647&v=beta&t=ssrFiLLRAyMFKQGn4a0NPjDHBxlZYlcfKMgy3IBA4qk",
    category: "Partenariats",
    author: "Direction Forges de Bazas",
    date: "15 Novembre 2024",
    readTime: "5 min",
  },
  {
    id: "contrat-maintenance-full-service",
    title: "Maintenance préventive : Nouveau contrat Full Service",
    excerpt:
      "Optimisez la disponibilité de votre parc avec notre nouveau contrat de maintenance tout inclus.",
    content: `
      <p>La disponibilité de vos équipements est cruciale pour la continuité de vos opérations. Pour vous garantir une productivité maximale sans interruption, Forges de Bazas lance son nouveau contrat de maintenance : le <strong>Full Service</strong>.</p>

      <h2>Qu'est-ce que le Contrat Full Service ?</h2>
      <p>Le contrat Full Service est une solution de maintenance préventive et curative tout inclus, conçue pour décharger complètement nos clients de la gestion technique de leur flotte d'engins industriels et de construction. Il s'applique à tous les équipements neufs ou récents que nous distribuons.</p>

      <h3>Les Avantages Clés de la Formule Full Service :</h3>
      <ul>
        <li><strong>Maintenance Préventive Planifiée :</strong> Nous établissons un calendrier d'interventions régulières (vidanges, filtres, contrôle des points critiques) basé sur les heures d'utilisation réelles pour prévenir l'usure prématurée.</li>
        <li><strong>Réparations Curatives Incluses :</strong> Tous les coûts de réparation, y compris la main d'œuvre et les pièces de rechange d'origine (hors abus ou dommages externes), sont couverts par le contrat.</li>
        <li><strong>Garantie de Disponibilité :</strong> Le contrat inclut un engagement de temps d'intervention rapide de nos techniciens sur site, minimisant ainsi le temps d'immobilisation de vos machines.</li>
        <li><strong>Budget Maîtrisé :</strong> En optant pour un forfait mensuel fixe, vous éliminez les coûts imprévus de réparation. Cela facilite la budgétisation et garantit un meilleur retour sur investissement de votre parc.</li>
      </ul>

      <h2>Un Partenariat de Longue Durée</h2>
      <p>En choisissant le Full Service, vous confiez vos équipements aux mains de nos experts formés et certifiés par les fabricants (SANY, etc.). Nous utilisons exclusivement des pièces d'origine, préservant ainsi la performance et la valeur résiduelle de votre matériel.</p>

      <h3>Une Approche Proactive</h3>
      <p>Grâce aux systèmes de télémétrie intégrés à nos machines, nous pouvons surveiller l'état de santé de votre équipement à distance. Cela nous permet d'identifier les signaux faibles et d'intervenir de manière proactive, avant qu'une simple anomalie ne se transforme en panne coûteuse. Cette maintenance prédictive est la clé d'une exploitation sans souci.</p>

      <p>Contactez notre équipe de services pour une évaluation personnalisée de votre parc et découvrez comment le contrat Full Service peut optimiser votre Taux de Disponibilité Opérationnelle (TDO).</p>
    `,
    image:
      "https://toyotaforklift.scene7.com/is/image/toyotamh/1-maintenance%20plans-1?ts=1704947931099&dpr=off",
    category: "Services",
    author: "Service Maintenance",
    date: "18 Août 2024",
    readTime: "4 min",
  },
];
