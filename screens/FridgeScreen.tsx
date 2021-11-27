import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';

export default function FridgeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fridge</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}


