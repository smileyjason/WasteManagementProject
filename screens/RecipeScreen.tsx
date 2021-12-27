import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Card, ListItem, Icon } from 'react-native-elements';
import { List, Searchbar, Subheading, Headline, Button } from 'react-native-paper';


export default function RecipeScreen({ navigation }: RootTabScreenProps<'RecipeScreen'>) {

  //In the RecipesPageScreen, you just retrieve the titles of the recipe and send that to this when it is clicked on
  //Then in here, you retrieve all the recipe info from the database
  return (
    <View style={styles.container}>
      <Text style={styles.title}>[Recipe Name]</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text style={styles.title}>Details (i.e. servings, total time)</Text>
      <Text style={styles.title}>Ingredients</Text>
      <Text style={styles.title}>Directions</Text>
    </View>
  );
}
//<Headline>[Recipe Name and Image]</Headline>