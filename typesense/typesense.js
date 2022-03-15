require("dotenv").config();

const Typesense = require("typesense");

export async function typesenseSearch(typesense, collection, query, field, filter) {
  try {

    // Search for documents
    let searchResults = [];
    searchResults = await typesense.collections(collection).documents().search({
      q: query,
      filter_by: filter,
      query_by: field
    })
    console.log(searchResults)

    return searchResults.hits;

  } catch (error) {
    console.log(error)
    console.log("in error");
    return [];
  }
}

export async function setTypesenseCollection (schema, documents) {
  console.log(process.env);

  const TYPESENSE_CONFIG = {
      nodes: [
          {
              host: 'localhost',
              port: '8108',
              protocol: 'http',
          },
      ],
      apiKey: 'xyz'
  }


  let typsensePopulated = true;
  let typesense = new Typesense.Client(TYPESENSE_CONFIG);
    try {

      const collection = await typesense.collections("recipes").retrieve();
      console.log("Found exisitng collection of recipes");
      console.log(JSON.stringify(collection, null, 2));

      if ((await collection).num_documents !== documents.length) {
        console.log("Collection has different number fo documents than data");
        console.log("Deleting collection");
        await typesense.collection("recipes").delete();
        typsensePopulated = false;
      }


    } catch (error) {
      //console.log(error)
    }

    if (!typsensePopulated) {
      try {
        console.log("Creating schema");
        console.log(JSON.stringify(schema, null, 2));
  
        // create a collection
        await typesense.collections().create(schema);
  
        console.log("Populating collection...");
      
        // Index documents
        await Promise.all(
          documents.map((document) => {
            return typesense.collections('recipes').documents().create(document)
          })
        )
      } catch (error) {
        //console.log(error)
      }
    }

    return typesense;

}