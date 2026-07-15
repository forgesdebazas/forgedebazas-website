import { defineField, defineType } from 'sanity'

const portableArticleContent = [
  {
    type: 'block',
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'H1', value: 'h1' },
      { title: 'H2', value: 'h2' },
      { title: 'H3', value: 'h3' },
      { title: 'Citation', value: 'blockquote' },
    ],
    lists: [
      { title: 'Liste à puces', value: 'bullet' },
      { title: 'Liste numérotée', value: 'number' },
    ],
    marks: {
      decorators: [
        { title: 'Gras', value: 'strong' },
        { title: 'Italique', value: 'em' },
      ],
      annotations: [
        {
          name: 'link',
          type: 'object',
          title: 'Lien',
          fields: [
            defineField({
              name: 'href',
              type: 'url',
              title: 'URL',
            }),
          ],
        },
      ],
    },
  },
  {
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Texte alternatif',
      }),
      defineField({
        name: 'caption',
        type: 'string',
        title: 'Légende',
      }),
    ],
  },
]




/*
pour toyota supprimer les produit de solution automatisé et remlplacer avec https://tmhe-media.azureedge.net/published/29512_768x400_toyota%20mh.jpg Support fiable sur toute la durée du projet
Grâce à notre offre de support système, vous maximisez la disponibilité de votre système Autopilot, garantissant stabilité et retour sur investissement optimal.   https://tmhe-media.azureedge.net/published/13872_768x400_toyota%20mh.jpg Logiciel d'automatisation
Le logiciel d’automatisation intelligent de Toyota gère les flux de commandes et le trafic des chariots AGV Toyota. https://tmhe-media.azureedge.net/published/22456_768x400_toyota%20mh.jpg Gestion de projets d’automatisation
Notre équipe d’experts en automatisation vous accompagne avec des stratégies, des idées et des solutions pour automatiser vos opérations. https://tmhe-media.azureedge.net/published/13998_768x400_toyota%20mh.jpg Navettes semi-automatisées
Système de stockage en profondeur, haute densité avec utilisation de 80 % de l’espace. https://tmhe-media.azureedge.net/published/44130_768x400_toyota%20mh.jpg Chariot élévateur à contrepoids automatisé Toyota
Ce chariot AGV polyvalent et adaptable est conçu pour répondre à de multiples besoins dans les différents flux opérationnels de votre entrepôt. Il peut prendre en charge tous les types de palettes, qu'elles soient de type Euro ou à fond fixe. https://tmhe-media.azureedge.net/published/13632_768x400_toyota%20mh.jpg Transpalettes, gerbeurs et chariots à mât rétractable automatisés
Conçus pour automatiser les opérations répétitives de manutention de palettes, ces chariots AGV permettent le transport automatisé de palettes, l’empilage en bloc, la gestion de palettes mixtes et le stockage en grande hauteur.
https://tmhe-media.azureedge.net/published/13651_768x400_toyota%20mh.jpg Tracteur de remorquage automatisé
Manutention automatisée de palettes et d'articles sans fourches, idéale pour les livraisons en flux tendu et les tournées de livraison. https://tmhe-media.azureedge.net/published/27435_768x400_toyota%20mh.jpg Transporteur horizontal automatisé
Transporteur automatisé de palettes individuelles sans fourches, idéal pour le transport d'un point A à un point B.
*/







export const actualiteType = defineType({
  name: 'actualite',
  title: 'Actualité',
  type: 'document',
  groups: [
    { name: 'fr', title: '🇫🇷 Français', default: true },
    { name: 'en', title: '🇬🇧 English' },
    { name: 'es', title: '🇪🇸 Español' },
    { name: 'meta', title: 'Métadonnées' },
  ],
  fields: [
    // ── Français (par défaut) ──
    defineField({
      name: 'title',
      title: 'Titre (FR)',
      type: 'string',
      group: 'fr',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait (FR)',
      type: 'text',
      rows: 3,
      group: 'fr',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenu (FR)',
      type: 'array',
      of: portableArticleContent,
      group: 'fr',
    }),

    // ── English ──
    defineField({
      name: 'titleEn',
      title: 'Title (EN)',
      type: 'string',
      group: 'en',
    }),
    defineField({
      name: 'excerptEn',
      title: 'Excerpt (EN)',
      type: 'text',
      rows: 3,
      group: 'en',
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (EN)',
      type: 'array',
      of: portableArticleContent,
      group: 'en',
    }),

    // ── Español ──
    defineField({
      name: 'titleEs',
      title: 'Título (ES)',
      type: 'string',
      group: 'es',
    }),
    defineField({
      name: 'excerptEs',
      title: 'Extracto (ES)',
      type: 'text',
      rows: 3,
      group: 'es',
    }),
    defineField({
      name: 'contentEs',
      title: 'Contenido (ES)',
      type: 'array',
      of: portableArticleContent,
      group: 'es',
    }),

    // ── Métadonnées ──
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'meta',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Partenariats', value: 'Partenariats' },
          { title: 'Événements', value: 'Événements' },
          { title: 'Entreprise', value: 'Entreprise' },
          { title: 'Services', value: 'Services' },
          { title: 'Innovation', value: 'Innovation' },
          { title: 'Projets', value: 'Projets' },
          { title: 'Formation', value: 'Formation' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date de publication',
      type: 'date',
      group: 'meta',
      options: {
        dateFormat: 'DD MMMM YYYY',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture',
      type: 'string',
      group: 'meta',
      description: 'Exemple: "4 min"',
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      group: 'meta',
      initialValue: 'Direction Forges de Bazas',
    }),
    defineField({
      name: 'image',
      title: 'Image de couverture',
      type: 'image',
      group: 'meta',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'image',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `par ${author}` }
    },
  },
})
