import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Card, ListItem, Icon } from 'react-native-elements';
import { List, Searchbar, Subheading, Headline, Button } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { Dialog, Portal, Paragraph } from 'react-native-paper';

export default function RecipesPageScreen({ navigation }: RootTabScreenProps<'RecipesTab'>) {
  const [search, setSearch] = React.useState("");
  const [help, setHelp] = React.useState(false);

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
      <Text style={styles.title}>Recipes</Text>
      <IconButton
        icon="help"
        size={20}
        onPress={() => setHelp(true)}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Portal>
        <Dialog visible={help} onDismiss={() => setHelp(false)}>
          <Dialog.Content>
            <Paragraph>You can search for and keep track of recipes in the Recipes tab.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setHelp(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

        <Card containerStyle={{
          width: "80%", backgroundColor: '#C4C4C4'
        }}>
          <Card.Title>
            My Daily Menu
            
          </Card.Title>
          <Card.FeaturedSubtitle>
            Based on the items in your fridge
          </Card.FeaturedSubtitle>
          <Card.Divider/>

          {
            list.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <Button mode="text" uppercase={false} onPress={() => navigation.navigate('RecipeScreen')}>
                    {l.label}
                  </Button>
                </ListItem.Content>
              </ListItem>
            ))
          }

        <Button
          onPress={() => navigation.navigate('MealPlanningScreen')}
          mode="text"
          uppercase={false}
        >
          Go to meal planning
        </Button>
      </Card>

      <Card containerStyle={{
          width: "80%", backgroundColor: '#C4C4C4'
        }}>
          <Card.Title>Search Our Cookbook</Card.Title>
          <Card.Divider/>

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
    </ScrollView>
  );
}