import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Searchbar, Button } from 'react-native-paper';
import { ScrollView } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import { StyleSheet } from 'react-native';

import { Card, Divider } from 'react-native-paper';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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

  const list = [
    {
      id: 'breakfast-recipe',
      label: 'Breakfast Recipe'
    },
    {
      id: 'lunch-recipe',
      label: 'Lunch Recipe'
    },
    {
      id: 'dinner-recipe',
      label: 'Dinner Recipe'
    },
  ];

  const [documents, setDocuments] = React.useState<{id: string, label: string}[]>();

  React.useEffect(() => {
    (async () => {

      let temp: {id: string, label: string}[] = [];

      const querySnapshot = await getDocs(collection(db, "recipes"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        temp.push({id: doc.id, label: doc.data().title});
      });

      setDocuments(temp);

    })()
  
      return () => {
         // 👍 
      }
    }, [])

    console.log(documents);

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
              documents?.map((l, i) => (
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
        </Card.Content>
      </Card>

      {/* Recent Card */}
      <Card style={recipeStyles.card}>
        <Card.Title
          title="Recent"
        />
        <Divider />
        <Card.Content>
        </Card.Content>
      </Card>
      </View>
    </ScrollView>
  );
}