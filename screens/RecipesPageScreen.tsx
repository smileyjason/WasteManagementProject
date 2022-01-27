import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

//import { Card, ListItem, Icon } from 'react-native-elements';
import { Searchbar, Button } from 'react-native-paper';
import { ScrollView } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import { StyleSheet } from 'react-native';

import { Card, Divider } from 'react-native-paper';

const recipeStyles = StyleSheet.create({
  card: {
    width: "80%", 
    backgroundColor: '#C4C4C4',
    marginBottom: '15px'
  },
  list: {
    backgroundColor: '#C4C4C4',
    marginTop: '5px',
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
            list.map((l, i) => (
              <View style={recipeStyles.list}>
                <Button mode="text" uppercase={false} onPress={() => navigation.navigate('RecipeScreen')}>
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