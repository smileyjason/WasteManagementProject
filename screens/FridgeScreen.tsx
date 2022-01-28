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

const fridgeStyles = StyleSheet.create({
  card: {
    width: "80%", 
    backgroundColor: '#C4C4C4',
    marginBottom: '15px'
  },
  list: {
    backgroundColor: '#C4C4C4',
    marginTop: '5px',
  }
});

export default function FridgeScreen({ navigation }: RootTabScreenProps<'FridgeScreen'>) {
  const AddIngredient = () => {

  }
  
  return (
    <ScrollView>
      <View style={styles.container}>
        
        {/* Title */}
        <ScreenTitle 
          title = "Fridge" 
          subtitle = "Add your ingredients to your virtual Fridge for menu personalization!"
          helpMessage = "You can manage the contents of your fridge in the Fridge tab."
        />

        <Card style={fridgeStyles.card}>
          <Card.Title
            title="Ingredients"
            subtitle=""
          />
          <Divider />

          <Card.Content>
            {/*Need to implement DataTable in a way that's not hard-coded*/}
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Ingredient</DataTable.Title>
                <DataTable.Title numeric>Days in Fridge</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                <DataTable.Cell numeric>159</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <Button icon="plus" mode="contained" onPress={AddIngredient} color = '#90EE90'>
            Add Ingredient
            </Button>

          </Card.Content>
        </Card>

        <Card style={fridgeStyles.card}>
          <Card.Title
            title="Grocery List"
            subtitle=""
          />
          <Divider />

          <Card.Content>
            {/*Need to implement DataTable in a way that's not hard-coded*/}
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Grocery List</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                <DataTable.Cell numeric>159</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <Button icon="plus" mode="contained" onPress={AddIngredient} color = '#90EE90'>
            Add to Grocery List
            </Button>

          </Card.Content>
        </Card>


        

      </View>
    </ScrollView>
  );
}


