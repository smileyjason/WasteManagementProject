import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function HelpScreen({ navigation }: RootTabScreenProps<'HelpScreen'>) {
  return (
    <View style={styles.container_left}>
      <Text style={styles.title}>HELP</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.description}>Learn about the app's features and our mission</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.description}>#Video walkthrough of the app</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.left_title}>Our Mission</Text>
      <Text style={styles.description}>Text on our mission</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.left_title}>Our Values</Text>
      <Text style={styles.description}>Text on our values</Text>
    </View>
  );
}
