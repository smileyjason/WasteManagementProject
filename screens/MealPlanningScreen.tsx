import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function MealPlanningScreen({ navigation }: RootTabScreenProps<'MealPlanningScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Planning</Text>
      <Text style={styles.title}>This page should contain the "Menu"</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
