import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements';

export default function RecipesPageScreen({ navigation }: RootTabScreenProps<'RecipesTab'>) {

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
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Card containerStyle={{
          width: "80%", backgroundColor: '#C4C4C4'
        }}>
          <Card.Title>My Daily Menu</Card.Title>
          <Card.Divider/>

          {
            list.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{l.label}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))
          }
      </Card>

      <Card containerStyle={{
          width: "80%", backgroundColor: '#C4C4C4'
        }}>
          <Card.Title>Search Our Cookbook</Card.Title>
          <Card.Divider/>

      </Card>

      <Card containerStyle={{
          width: "80%", backgroundColor: '#C4C4C4'
        }}>
          <Card.Title>Bookmarks</Card.Title>
          <Card.Divider/>

      </Card>

      <Card containerStyle={{
          width: "80%", backgroundColor: '#C4C4C4'
        }}>
          <Card.Title>Recent</Card.Title>
          <Card.Divider/>

      </Card>
    </View>
  );
}

/**
 * <SearchBar
            placeholder="Type Here..."
            onChangeText={() => updateSearch()}
            value={search}
          />
 */
