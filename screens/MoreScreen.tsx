import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function MoreScreen({ navigation }: RootTabScreenProps<'MoreTab'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>More</Text>
      <Button 
        onPress = {() => navigation.navigate('TipsScreen')} 
        title = 'Sustainability Tips'
      />
      <Button 
        onPress = {() => navigation.navigate('ResourcesScreen')} 
        title = 'Resources and Guides'
      />
      <Button 
        onPress = {() => navigation.navigate('CouponsScreen')} 
        title = 'Coupons and Student Deals'
      />
      <Button 
        onPress = {() => navigation.navigate('SettingsScreen')} 
        title = 'Settings'
      />
      <Button 
        onPress = {() => navigation.navigate('HelpScreen')} 
        title = 'Help'
      />
      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
