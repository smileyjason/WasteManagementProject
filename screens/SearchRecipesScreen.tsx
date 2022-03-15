import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { List, Searchbar, Button, Title, Checkbox, Card, Headline, Divider } from 'react-native-paper';
import { collection, doc, getDoc, getDocs, query, where, updateDoc, orderBy, limit } from "firebase/firestore";
import { app, db } from '../firebase';
import { getAllRecipes } from '../hooks/getRecipes';
import { typesenseSearch } from '../typesense/populateTypesense';
import { RecipesSchema } from '../constants/Schemas';

export default function SearchRecipesScreen({ navigation, route }: RootTabScreenProps<'SearchRecipesScreen'>) {
  type DocumentType = {id: string, label: string}[];

  const [expanded, setExpanded] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [checked, setChecked] = React.useState([false, false, false, false]);
  const [results, setResults] = React.useState<{id: string, label: string}[]>();
  //const [typesense, setTypesense] = React.useState<any>(null);

  const handlePress = () => setExpanded(!expanded);

  const onChangeSearch = (searchValue: string) => setSearch(searchValue);

  const ingredients = [
    "Broccoli", "Asparagus", "Red Peppers", "Eggplant", "Cheese", "Chicken"
  ]
  
  const recipeButton = (l: {id: string, label: string}) => {
    return (
      <View >
          <Button 
            mode="text" 
            uppercase={false} 
            onPress={() => navigation.navigate('RecipeScreen', {id: l.id as string})} 
            >
              {l.label}
          </Button>
          <Divider/>
      </View>
    )
  }

  const onClickSearch = () => {
    setResults([]);
    
    (async () => {
     /* await searchByField(route.params.typesense, {q: search, field: "title"}).then((results) => {
        let temp: DocumentType = [];
        results.forEach((item: any) => {
          console.log(item);
          let id = item.document.document_id as string;
          let title = item.document.title as string;
          temp.push({id: id, label: title})
        });

        setResults(temp);

        
      });*/
      const query = search === "" ? "*" : search;

      const filterList: string[] = [];
        ingredients.forEach((item, index) => {
          console.log(item);
          if (checked[index]) {
            filterList.push(`ingredients:${item}`);
          }
        });

        const filter = filterList.join(' && ')

        await typesenseSearch(route.params.typesense, 'recipes', query, "title, ingredients", filter).then((results) => {
          let temp: DocumentType = [];
          console.log(">>>> returned results");
          console.log(results);
          if (results.length >= 0 ) {
            results.forEach((item: any) => {
              console.log(item);
              let id = item.document.document_id as string;
              let title = item.document.title as string;
              temp.push({id: id, label: title});
            });
          }
  
          setResults(temp);
        });
    })()
  }

  return (
    <React.Fragment>
      <Title>Keyword</Title>
      <Searchbar
        placeholder="Search"
        autoComplete={false}
        onChangeText={onChangeSearch}
        value={search}
      />

      <List.AccordionGroup>
          <List.Accordion title="Ingredients" id="1">
            <View>
              {
                ingredients.map((item, index) => {
                  return (
                    <Checkbox.Item
                      key={item}
                      label={item}
                      position="leading"
                      status={checked[index] ? 'checked' : 'unchecked'}
                      onPress={() => {
                        let newChecked = [...checked];
                        newChecked[index] = !checked[index];
                        setChecked(newChecked);
                      }}
                    />
                  )
                })
              }
            </View>
          </List.Accordion>
          <List.Accordion title="Cuisine" id="2">
            <List.Item title="Item 2" />
          </List.Accordion>
          <List.Accordion title="Breakfast Recipes" id="3">
            <List.Item title="Item 3" />
          </List.Accordion>
          <List.Accordion title="Lunch Recipes" id="4">
            <List.Item title="Item 4" />
          </List.Accordion>
          <List.Accordion title="Dinner Recipes" id="5">
            <List.Item title="Item 5" />
          </List.Accordion>
          <List.Accordion title="Snack Recipes" id="6">
            <List.Item title="Item 6" />
          </List.Accordion>
          <List.Accordion title="Dessert Recipes" id="7">
            <List.Item title="Item 7" />
          </List.Accordion>
          <List.Accordion title="Cooking Style" id="8">
            <List.Item title="Item 8" />
          </List.Accordion>
        </List.AccordionGroup>


      <Button
        onPress={() => onClickSearch()}
        mode="text"
        uppercase={false}
      >
        Search
      </Button>

      {
          results?.map((l, i) => (
             recipeButton(l)
          ))
      }
    </React.Fragment>

  );
}
//left={props => <List.Icon {...props} icon="folder" />}

//Do you want to be able to open multiple accordians?
//If yest, use this instead:

/**
 *  <List.Section >
        <List.Accordion
          title="Ingredients">
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Cuisine">
            <List.Item title="First item" />
        </List.Accordion>

        <List.Accordion
          title="Breakfast Recipes">
            <List.Item title="First item" />
        </List.Accordion>

        <List.Accordion
          title="Lunch Recipes">
            <List.Item title="First item" />
        </List.Accordion>

        <List.Accordion
          title="Dinner Recipes">
            <List.Item title="First item" />
        </List.Accordion>

        <List.Accordion
          title="Snack Recipes">
            <List.Item title="First item" />
        </List.Accordion>

        <List.Accordion
          title="Dessert Recipes">
            <List.Item title="First item" />
        </List.Accordion>

        <List.Accordion
          title="Cooking Style">
            <List.Item title="First item" />
        </List.Accordion>
        
      </List.Section>
 */