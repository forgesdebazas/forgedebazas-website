import { groq } from 'next-sanity'

export const GET_ALL_ACTUALITES_QUERY = groq`
  *[_type == "actualite"] | order(date desc) {
    _id,
    title,
    titleEn,
    titleEs,
    "id": slug.current,
    "image": image.asset->url,
    category,
    date,
    readTime,
    author,
    excerpt,
    excerptEn,
    excerptEs,
    content,
    contentEn,
    contentEs
  }
`

export const GET_LATEST_ACTUALITES_QUERY = groq`
  *[_type == "actualite"] | order(date desc) [0...3] {
    _id,
    title,
    titleEn,
    titleEs,
    "id": slug.current,
    "image": image.asset->url,
    category,
    date,
    readTime,
    author,
    excerpt,
    excerptEn,
    excerptEs
  }
`

export const GET_ACTUALITE_BY_SLUG_QUERY = groq`
  *[_type == "actualite" && slug.current == $slug][0] {
    _id,
    title,
    titleEn,
    titleEs,
    "id": slug.current,
    "image": image.asset->url,
    category,
    date,
    readTime,
    author,
    excerpt,
    excerptEn,
    excerptEs,
    content,
    contentEn,
    contentEs
  }
`
