require("dotenv").config();

const Typesense = require("typesense");

/*module.exports = (async () => {
    console.log('here')
    const TYPESENSE_CONFIG = {
        nodes: [
            {
                host: process.env.TYPESENSE_HOST,
                port: process.env.TYPESENSE_PORT,
                protocol: process.env.TYPESENSE_PROTOCOL,
            },
        ],
        apiKey: process.env.TYPESENSE_ADMIN_API_KEY
    }

    const typesense = new Typesense.typesense(TYPESENSE_CONFIG);

    let schema = {
        name: 'companies',
        num_documents: 0,
        fields: [
          {
            name: 'company_name',
            type: 'string',
            facet: false
          },
          {
            name: 'num_employees',
            type: 'int32',
            facet: false
          },
          {
            name: 'country',
            type: 'string',
            facet: true
          }
        ],
        default_sorting_field: 'num_employees'
      } 

      let documents = [
        {
          id: '124',
          company_name: 'Stark Industries',
          num_employees: 5215,
          country: 'USA'
        },
        {
          id: '125',
          company_name: 'Acme Corp',
          num_employees: 1002,
          country: 'France'
        },
        {
          id: '127',
          company_name: 'Stark Corp',
          num_employees: 1031,
          country: 'USA'
        },
        {
          id: '126',
          company_name: 'Doofenshmirtz Inc',
          num_employees: 2,
          country: 'Tri-State Area'
        }
      ]

    try {
        // Delete if the collection already exists from a previous example run
        const collection = await typesense.collections('companies').retrieve();
        //await typesense.collections('companies').delete()
        console.log("Found existing collection");
        console.log(JSON.stringify(collection, null, 2));

        if ((await collection).num_documents !== document.length) {
            await typesense.collections('companies').delete();
        }
    } catch (error) {
        // do nothing
        console.log(error);
    }

    console.log("Creating schema...");
    console.log(JSON.stringify(schema, null, 2));

    await typesense.collections().create(schema);

    console.log("Populating collection...");

    try {

        // Index documents
        await Promise.all(
            documents.map((document) => {
            return typesense.collections('companies').documents().create(document)
            })
        )

    } catch (error) {

    }
    

})*/

/*export async function searchByField(typesense, collection, query) {
  try {
    // Search for documents
    let searchResults = [];
    searchResults = await typesense.collections(collection).documents().search({
      q: query.q,
      query_by: query.field
    })
    console.log(searchResults)

    return searchResults.hits;
  } catch (error) {
    console.log("in error");
    return [];
  }
}*/



export async function typesenseSearch(typesense, collection, query, field, filter) {
  try {
    // Search for documents
    /*let searchResults = [];
    let searchRequests = {
      'searches': [
        {
          'collection': 'recipes',
          'q': 'Cheese'
        },
        {
          'collection': 'recipes',
          'q': 'Chicken'
        },
      ]
    }
    
    // Search parameters that are common to all searches go here
    let commonSearchParams =  {
        'query_by': 'ingredients',
    }
    
    searchResults = await typesense.multiSearch.perform(searchRequests, commonSearchParams)
    
    console.log("searchResults");
    console.log(searchResults);

    
    if (searchResults.length > 0) {
      let hits = [];
      searchResults.forEach((result) => {
        hits.push(...result.hits);
      });

      return hits;
    } else {
      return [];
    }*/

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


  let typesense = new Typesense.Client(TYPESENSE_CONFIG);

    /*try {
      // Delete if the collection already exists from a previous example run

      console.log(">>>>>>>>>>>>>>>>>");

      await typesense.collections.retrieve().then((result) => {
        console.log(result);
      })

      await typesense.collections('recipes').delete()
      
    } catch (error) {
      // do nothing
    }*/
  
    try {
      // create a collection
      await typesense.collections().create(schema)
  
      // Index documents
      await Promise.all(
        documents.map((document) => {
          return typesense.collections('recipes').documents().create(document)
        })
      )


    } catch (error) {
      //console.log(error)
    }

    return typesense;

}


async function runExample () {

    const TYPESENSE_CONFIG = {
        nodes: [
            {
                host: process.env.TYPESENSE_HOST,
                port: process.env.TYPESENSE_PORT,
                protocol: process.env.TYPESENSE_PROTOCOL,
            },
        ],
        apiKey: process.env.TYPESENSE_ADMIN_API_KEY
    }

    //const typesense = new Typesense.typesense(TYPESENSE_CONFIG);

    let typesense = new Typesense.Client(TYPESENSE_CONFIG)

    let schema = {
        name: 'companies',
        num_documents: 0,
        fields: [
          {
            name: 'company_name',
            type: 'string',
            facet: false
          },
          {
            name: 'num_employees',
            type: 'int32',
            facet: false
          },
          {
            name: 'country',
            type: 'string',
            facet: true
          }
        ],
        default_sorting_field: 'num_employees'
      } 

      let documents = [
        {
          id: '124',
          company_name: 'Stark Industries',
          num_employees: 5215,
          country: 'USA'
        },
        {
          id: '125',
          company_name: 'Acme Corp',
          num_employees: 1002,
          country: 'France'
        },
        {
          id: '127',
          company_name: 'Stark Corp',
          num_employees: 1031,
          country: 'USA'
        },
        {
          id: '126',
          company_name: 'Doofenshmirtz Inc',
          num_employees: 2,
          country: 'Tri-State Area'
        }
      ]

      try {
        // Delete if the collection already exists from a previous example run
        
        await typesense.collections('companies').delete()
      } catch (error) {
        // do nothing
      }
    
      try {
        // create a collection
        await typesense.collections().create(schema)
    
        // Index documents
        await Promise.all(
          documents.map((document) => {
            return typesense.collections('companies').documents().create(document)
          })
        )

        //searchByField(typesense, {q: "Stark", field: "company_name"});
    
        // Search for documents
        /*let searchResults = []
        searchResults = await typesense.collections('companies').documents().search({
          q: 'Stark',
          query_by: 'company_name'
        })
        console.log(searchResults)
        console.log(searchResults.hits[0].document)
    
        // Search for non-existent
        searchResults = await typesense.collections('companies').documents().search({
          q: 'Non Existent',
          query_by: 'company_name'
        })
        console.log(searchResults)
    
        // Search for more documents
        searchResults = await typesense.collections('companies').documents().search({
          q: 'Inc',
          query_by: 'company_name',
          filter_by: 'num_employees:<100',
          sort_by: 'num_employees:desc'
        })
        console.log(searchResults)*/
    
        // Do multiple searches
        let searchResults = await typesense.multiSearch.perform(
          {
            searches: [
              {
                q: 'Inc'
              },
              {
                q: 'Acme'
              }
            ]
          },
          {
            query_by: 'company_name',
            collection: 'companies'
          }
        )
        console.log(searchResults)
      } catch (error) {
        console.log(error)
      } finally {
        // Cleanup
        typesense.collections('companies').delete()
      }

}

//runExample();
//setTypesenseCollection();