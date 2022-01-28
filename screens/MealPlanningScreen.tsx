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

const mealStyles = StyleSheet.create({
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
    color: '#000000'
  }
});

export default function MealPlanningScreen({ navigation }: RootTabScreenProps<'MealPlanningScreen'>) {
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
          title = "Meal Planning" 
          subtitle = "Breakfast, lunch, dinner, or midnight snack, we got you covered!"
          helpMessage = "You can organize your meal prep here."
        />

        <Card style={mealStyles.card}>
          <Card.Title
            title="My Menu"
          />
          <Divider/>

          <Card.Content>
            {
              list.map((l, i) => (
                <View style={mealStyles.list}>
                  <Button 
                    mode="text" 
                    uppercase={false} 
                    onPress={() => navigation.navigate('RecipeScreen')} 
                    labelStyle = {mealStyles.buttonlabel}>
                      {l.label}
                  </Button>
                  <Divider />
                </View>
              ))
            }
            <Button icon="plus" mode="contained" color = '#90EE90'>
            Add a Meal
            </Button>
          </Card.Content>
        </Card>

        <Card style={mealStyles.card}>
          <Card.Title
            title="Weekly Meal Planning"
          />
          <Divider/>
        </Card>

      </View>
    </ScrollView>
  );
}
