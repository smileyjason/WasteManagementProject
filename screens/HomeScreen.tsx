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
import HomeStyles from '../styles/HomeStyles';
import SustainabilityTip from '../components/SustainabilityTip';

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

        <SustainabilityTip tip = "Storing greens with paper towel can help them last longer!"/>

        <Card style={HomeStyles.card}>
          <Card.Title
            title="Meal Planning"
          />

        <Divider/>
          <Card.Content>
            {
              list.map((l, i) => (
                <View style={HomeStyles.list}>
                  <Button 
                    mode="text" 
                    uppercase={false} 
                    onPress={() => navigation.navigate('RecipeScreen')} 
                    labelStyle = {HomeStyles.buttonlabel}>
                      {l.label}
                  </Button>
                  <Divider />
                </View>
              ))
            }
          </Card.Content>
        </Card>

        <Card style={HomeStyles.card}>
          <Card.Title
            title="Near Expiry Dates"
          />
        </Card>

      </View>
    </ScrollView>

  );
}
