import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Searchbar, Button } from 'react-native-paper';
import { ScrollView } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import RecipeStyles from '../styles/RecipeStyles';

import { Card, Divider } from 'react-native-paper';
import { collection, doc, getDoc, getDocs, query, where, updateDoc, orderBy, limit, addDoc } from "firebase/firestore";
import { app, db } from '../firebase';
import { getAllRecipes } from '../hooks/getRecipes';
import { setTypesenseCollection, typesenseSearch} from '../typesense/typesense';
import { RecipesSchema } from '../constants/Schemas';
import { recipesData } from '../recipes';

export default function RecipesPageScreen({ navigation }: RootTabScreenProps<'RecipesTab'>) {
  const [search, setSearch] = React.useState("");

  const onChangeSearch = (searchValue: string) => setSearch(searchValue);

  type DocumentType = {id: string, label: string}[];

  const [documents, setDocuments] = React.useState<{id: string, label: string}[]>();
  const [dailyMenu, setDailyMenu] = React.useState<DocumentType>();
  const [bookmarks, setBookmarks] = React.useState<DocumentType>();
  const [recent, setRecent] = React.useState<DocumentType>();

  const [typesense, setTypesense] = React.useState<any>(null);

  /*navigation.addListener('focus', () => {
    console.log("unsubscribe");
    loadData();
  });*/

  React.useEffect(() => {
    loadTypsenseCollection();
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("unsubscribe");
      loadData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  async function loadData() {
    let temp: {id: string, label: string}[] = [];

    /*const querySnapshot = await getDocs(collection(db, "recipes"));
    querySnapshot.forEach((doc) => {
      temp.push({id: doc.id, label: doc.data().title});
    });

    setDocuments(temp);*/


    const q_DailyMenu = query(collection(db, "recipes"), where("daily_menu", "==", true));
    temp = [];
    const querySnapshot_DailyMenu = await getDocs(q_DailyMenu);
    querySnapshot_DailyMenu.forEach((doc) => {
      temp.push({id: doc.id, label: doc.data().title});
    });

    setDailyMenu(temp);

    const q_Bookmark = query(collection(db, "recipes"), where("bookmarked", "==", true));
    temp = [];
    const querySnapshot_Bookmark = await getDocs(q_Bookmark);
    querySnapshot_Bookmark.forEach((doc) => {
      temp.push({id: doc.id, label: doc.data().title});
    });

    setBookmarks(temp);

    const q_Recent = query(collection(db, "recipes"), orderBy("last_viewed", "desc"), limit(4));
    temp = [];
    const querySnapshot_Recent = await getDocs(q_Recent);
    querySnapshot_Recent.forEach((doc) => {
      temp.push({id: doc.id, label: doc.data().title});
    });

    setRecent(temp);
  }

  async function loadTypsenseCollection() {
    let temp: any[] = [];

    const querySnapshot1 = await getDocs(collection(db, "recipes"));
    querySnapshot1.forEach((doc) => {
      temp.push(doc.data());
    });

    console.log(temp)

    /*setDocuments(temp);*/
    let initialDocuments: {
      doc_num: number,
      document_id: string, 
      title: string,
      ingredients: string[],
      instructions: string,
      meal_type: string[],
      dietary_restrictions: string[],
      cooking_style: string[],
      cuisine: string
    }[] = [];
    const querySnapshot = await getDocs(collection(db, "recipes"));
    let index = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      initialDocuments.push({ 
        doc_num: index,
        document_id: doc.id, 
        title: data.title,
        ingredients: data.ingredients,
        instructions: data.instructions,
        meal_type: data.meal_type,
        cooking_style: data.cooking_style,
        dietary_restrictions: data.dietary_restrictions,
        cuisine: data.cuisine
      });
      index = index = 1;
    });


    await setTypesenseCollection(RecipesSchema, initialDocuments)
      .then((result) => {
        console.log(result);
        setTypesense(result);
      })

  }

  /*React.useEffect(() => {
    (async () => {

      let temp: {id: string, label: string}[] = [];

      const querySnapshot = await getDocs(collection(db, "recipes"));
      querySnapshot.forEach((doc) => {
        temp.push({id: doc.id, label: doc.data().title});
      });

      setDocuments(temp);

      const q_Bookmark = query(collection(db, "recipes"), where("bookmarked", "==", true));
      temp = [];
      const querySnapshot_Bookmark = await getDocs(q_Bookmark);
      querySnapshot_Bookmark.forEach((doc) => {
        temp.push({id: doc.id, label: doc.data().title});
      });

      setBookmarks(temp);

      const q_Recent = query(collection(db, "recipes"), orderBy("last_viewed", "desc"), limit(4));
      temp = [];
      const querySnapshot_Recent = await getDocs(q_Recent);
      querySnapshot_Recent.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        temp.push({id: doc.id, label: doc.data().title});
      });

      setRecent(temp);

      let initialDocuments: {
        doc_num: number,
        document_id: string, 
        title: string,
        ingredients: string[],
        instructions: string,
      }[] = [];
      const querySnapshot = await getDocs(collection(db, "recipes"));
      let index = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        initialDocuments.push({ 
          doc_num: index,
          document_id: doc.id, 
          title: data.title,
          ingredients: data.ingredients,
          instructions: data.instructions,
        });
        index = index = 1;
      });


      await setTypesenseCollection(RecipesSchema, initialDocuments)
        .then((result) => {
          console.log(result);
          setTypesense(result);
        })
      
      

    })()
  
      return () => {
         // 👍 
      }
    }, [navigation])*/

    const recipeButton = (l: {id: string, label: string}) => {
      return (
        <View style={RecipeStyles.list}>
            <Button 
              mode="text" 
              uppercase={false} 
              onPress={() => navigation.navigate('RecipeScreen', {id: l.id as string})} 
              labelStyle = {RecipeStyles.buttonlabel}>
                {l.label}
            </Button>
            <Divider />
        </View>
      )
    }

    const onClickSearch = () => {
      setDocuments([]);
      
      (async () => {
        await typesenseSearch(typesense, 'recipes', search, "title, ingredients", "").then((results) => {
          if (results.length >= 0 ) {
            let temp: DocumentType = [];
            results.forEach((item: any) => {
              console.log(item);
              let id = item.document.document_id as string;
              let title = item.document.title as string;
              temp.push({id: id, label: title})
            });
  
            setDocuments(temp);
          }

          if (results.length >= 0 ) {
            console.log("No results")
          }
          
        });

        /*await multiSearch(typesense, {q: {}, field: "ingredients"}).then((results) => {
          let temp: DocumentType = [];
          console.log(results);
          if (results.length >= 0 ) {
            results.forEach((item: any) => {
              console.log(item);
              let id = item.document.document_id as string;
              let title = item.document.title as string;
              temp.push({id: id, label: title});
            });
          }
  
          setDocuments(temp);
        });*/
      })()
    }

  return (
    <ScrollView>
      <View style={styles.container}>

        {/* Title */}
        <ScreenTitle 
          title = "Recipes" 
          subtitle = ""
          helpMessage = "You can search for and keep track of recipes in the Recipes tab."/>

      {/* Daily Menu Card */}
      <Card style={RecipeStyles.card}>
        <Card.Title
          title="My Daily Menu"
          subtitle="Based on the items in your fridge"
        />
        <Divider />
        <Card.Content>
          {
              dailyMenu?.map((l, i) => (
                recipeButton(l)
              ))
          }
        </Card.Content>
      </Card>

      {/* Search Our Cookbook Card */}
      <Card style={RecipeStyles.card}>
        <Card.Title
          title="Search Our Cookbook"
        />
        <Divider />
        <Card.Content>
          <Searchbar
            placeholder="Search"
            autoComplete={false}
            onChangeText={onChangeSearch}
            value={search}
          />

          <Button
            onPress={() => onClickSearch()}
            mode="text"
            uppercase={false}
            labelStyle = {RecipeStyles.buttonlabel}
          >
            Search
          </Button>

          {
              documents?.map((l, i) => (
                recipeButton(l)
              ))
          }

          <Button
            onPress={() => navigation.navigate('SearchRecipesScreen', {typesense: typesense})}
            mode="text"
            uppercase={false}
            labelStyle = {RecipeStyles.buttonlabel}
          >
            Search using filters
          </Button>
        </Card.Content>
      </Card>

      {/* Bookmarks Card */}
      <Card style={RecipeStyles.card}>
        <Card.Title
          title="Bookmarks"
        />
        <Divider />
        <Card.Content>
          {
              bookmarks?.map((l, i) => (
                recipeButton(l)
              ))
          }
        </Card.Content>
      </Card>

      {/* Recent Card */}
      <Card style={RecipeStyles.card}>
        <Card.Title
          title="Recent"
        />
        <Divider />
        <Card.Content>
          {
              recent?.map((l, i) => (
                recipeButton(l)
              ))
          }
        </Card.Content>
      </Card>
      </View>
    </ScrollView>
  );
}