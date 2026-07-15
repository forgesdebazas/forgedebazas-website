import { type SchemaTypeDefinition } from 'sanity'
import { actualiteType } from './actualiteType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [actualiteType],
}
