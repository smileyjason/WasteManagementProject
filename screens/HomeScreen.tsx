import * as React from 'react';
import styles from '../styles/ScreenStyles';
import { DataTable } from 'react-native-paper';
import { Card, Divider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
import { ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import { StyleSheet } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';


const homeStyles = StyleSheet.create({
  card: {
    width: "80%", 
    backgroundColor: '#90EE90',
    marginBottom: 15
  },
  list: {
    backgroundColor: '#C4C4C4',
    marginTop: 5,
  },
  buttonlabel: {
    color: '#000000'
  }
});

export default function HomeScreen({ navigation }: RootTabScreenProps<'HomeScreen'>) {

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
          title = "Home" 
          subtitle = "Welcome!"
          helpMessage = "You can keep track of your recent activity here."
        />

        <Card style={homeStyles.card}>
          <Card.Title
            title="Did you know..."
            subtitle="Storing greens with paper towel can help them stay fresh longer?"
          />

          <Divider />

          <Card.Content>
            <Button icon="thumb-up" mode="outlined" color = '#000000'>
            Yes
            </Button>
            <Button icon="thumb-down" mode="outlined" color = '#000000'>
            No
            </Button>
          </Card.Content>
        </Card>

        <Card style={homeStyles.card}>
          <Card.Title
            title="Meal Planning"
          />

        <Divider/>
          <Card.Content>
            {
              list.map((l, i) => (
                <View style={homeStyles.list}>
                  <Button 
                    mode="text" 
                    uppercase={false} 
                    onPress={() => navigation.navigate('RecipeScreen')} 
                    labelStyle = {homeStyles.buttonlabel}>
                      {l.label}
                  </Button>
                  <Divider />
                </View>
              ))
            }
          </Card.Content>
        </Card>

        <Card style={homeStyles.card}>
          <Card.Title
            title="Near Expiry Dates"
          />
        </Card>

      </View>
    </ScrollView>

  );
}
