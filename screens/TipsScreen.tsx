import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Card, Divider } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';

const tipStyles = StyleSheet.create({
  card: {
    width: "80%", 
    backgroundColor: '#99D98C',
    marginBottom: '10px'
  },

});

export default function TipsScreen({ navigation }: RootTabScreenProps<'TipsScreen'>) {
  return (
    <ScrollView>
      <View style={styles.container}>

        {/* Title */}
        <ScreenTitle 
          title = "Tips" 
          subtitle = ""
          helpMessage = "Please find Useful Tips below!"/>

      {/* Tip Card */}
      <Card style={tipStyles.card}>
        <Card.Title
          title="Sustainability Tip 1"
          subtitle="This tip is very useful"
        />
        <Divider />
        <Card.Content>
          <Text>
            Test text1 ...
          </Text>
        </Card.Content>
      </Card>
      <Card style={tipStyles.card}>
        <Card.Title
          title="Sustainability Tip 2"
          subtitle="This tip is very useful"
        />
        <Divider />
        <Card.Content>
          <Text>
            Test text2 ...
          </Text>
        </Card.Content>
      </Card>
      </View>
    </ScrollView>
  );
}

