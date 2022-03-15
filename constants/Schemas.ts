/*export type RecipesSchema = {
    title: string,
    ingredients: string[],
    instructions: string,
    picture_link: string,
    bookmarked: boolean,
    daily_menu: boolean
};*/

export const RecipesSchema = {
  name: 'recipes',
  num_documents: 0,
  fields: [
    {
      name: 'doc_num',
      type: 'int32',
      facet: false
    },
      {
      name: 'document_id',
      type: 'string',
      facet: false
    },
    {
      name: 'title',
      type: 'string',
      facet: false
    },
    {
      name: 'ingredients',
      type: 'string[]',
      facet: false
    },
    {
      name: 'instructions',
      type: 'string',
      facet: false
    }
  ],
  default_sorting_field: 'doc_num'
} 