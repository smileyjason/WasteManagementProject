import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Searchbar, Button } from 'react-native-paper';
import { ScrollView } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import { StyleSheet } from 'react-native';

import { Card, Divider } from 'react-native-paper';
import { collection, doc, getDoc, getDocs, query, where, updateDoc, orderBy, limit } from "firebase/firestore";
import { app, db } from '../firebase';
import { getAllRecipes } from '../hooks/getRecipes';

const recipeStyles = StyleSheet.create({
  card: {
    width: "80%", 
    backgroundColor: '#C4C4C4',
    marginBottom: '15px'
  },
  list: {
    backgroundColor: '#C4C4C4',
    marginTop: '5px',
  },
  buttonlabel: {
    color: '#006400'
  }
});

export default function RecipesPageScreen({ navigation }: RootTabScreenProps<'RecipesTab'>) {
  const [search, setSearch] = React.useState("");

  const onChangeSearch = (searchValue: string) => setSearch(searchValue);

  type DocumentType = {id: string, label: string}[];

  const [documents, setDocuments] = React.useState<{id: string, label: string}[]>();
  const [dailyMenu, setDailyMenu] = React.useState<DocumentType>();
  const [bookmarks, setBookmarks] = React.useState<DocumentType>();
  const [recent, setRecent] = React.useState<DocumentType>();

  /*async function searchTitle(term: string) {

    // reverse term
    const termR = term.split("").reverse().join("");
  
    // define queries
    const titles = postRef.orderBy('title').startAt(term).endAt(term + '~').get();
    const titlesR = postRef.orderBy('titleRev').startAt(termR).endAt(termR + '~').get();
  
    // get queries
    const [titleSnap, titlesRSnap] = await Promise.all([
      titles,
      titlesR
    ]);
    return (titleSnap.docs).concat(titlesRSnap.docs);
  }*/

  navigation.addListener('focus', () => {
    console.log("unsubscribe");
    loadData();
  });

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

  React.useEffect(() => {
    (async () => {

      /*let temp: {id: string, label: string}[] = [];

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

      setRecent(temp);*/
      

    })()
  
      return () => {
         // 👍 
      }
    }, [navigation])

    const recipeButton = (l: {id: string, label: string}) => {
      return (
        <View style={recipeStyles.list}>
            <Button 
              mode="text" 
              uppercase={false} 
              onPress={() => navigation.navigate('RecipeScreen', {id: l.id as string})} 
              labelStyle = {recipeStyles.buttonlabel}>
                {l.label}
            </Button>
            <Divider />
        </View>
      )
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
      <Card style={recipeStyles.card}>
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
      <Card style={recipeStyles.card}>
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
            onPress={() => navigation.navigate('SearchRecipesScreen')}
            mode="text"
            uppercase={false}
            labelStyle = {recipeStyles.buttonlabel}
          >
            Search using filters
          </Button>
        </Card.Content>
      </Card>

      {/* Bookmarks Card */}
      <Card style={recipeStyles.card}>
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
      <Card style={recipeStyles.card}>
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