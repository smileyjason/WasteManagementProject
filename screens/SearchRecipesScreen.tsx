import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { List, Searchbar, Button, Title, Checkbox, Card, Headline } from 'react-native-paper';

export default function SearchRecipesScreen({ navigation }: RootTabScreenProps<'SearchRecipesScreen'>) {
  const [expanded, setExpanded] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [checked, setChecked] = React.useState([false, false, false, false]);


  const handlePress = () => setExpanded(!expanded);

  const onChangeSearch = (searchValue: string) => setSearch(searchValue);

  const ingredients = [
    "Broccoli", "Asparagus", "Red Peppers", "Eggplant"
  ]

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
          <List.Accordion title="Breakfast Recipies" id="3">
            <List.Item title="Item 3" />
          </List.Accordion>
          <List.Accordion title="Lunch Recipies" id="4">
            <List.Item title="Item 4" />
          </List.Accordion>
          <List.Accordion title="Dinner Recipies" id="5">
            <List.Item title="Item 5" />
          </List.Accordion>
          <List.Accordion title="Snack Recipies" id="6">
            <List.Item title="Item 6" />
          </List.Accordion>
          <List.Accordion title="Dessert Recipies" id="7">
            <List.Item title="Item 7" />
          </List.Accordion>
          <List.Accordion title="Cooking Style" id="8">
            <List.Item title="Item 8" />
          </List.Accordion>
        </List.AccordionGroup>


      <Button
          onPress={() => console.log()}
          mode="text"
          uppercase={false}
        >
          Search
      </Button>
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
          title="Breakfast Recipies">
            <List.Item title="First item" />
        </List.Accordion>

        <List.Accordion
          title="Lunch Recipies">
            <List.Item title="First item" />
        </List.Accordion>

        <List.Accordion
          title="Dinner Recipies">
            <List.Item title="First item" />
        </List.Accordion>

        <List.Accordion
          title="Snack Recipies">
            <List.Item title="First item" />
        </List.Accordion>

        <List.Accordion
          title="Dessert Recipies">
            <List.Item title="First item" />
        </List.Accordion>

        <List.Accordion
          title="Cooking Style">
            <List.Item title="First item" />
        </List.Accordion>
        
      </List.Section>
 */