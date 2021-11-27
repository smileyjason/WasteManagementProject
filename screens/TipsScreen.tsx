import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TipsScreen({ navigation }: RootTabScreenProps<'TipsScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sustainability Tips</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

