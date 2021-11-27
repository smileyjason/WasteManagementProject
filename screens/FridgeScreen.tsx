import * as React from 'react';
import styles from '../styles/ScreenStyles';
import { DataTable } from 'react-native-paper';
import { Button } from 'react-native-paper';

import { Text, View } from '../components/Themed';


export default function FridgeScreen() {
  const AddIngredient = () => {

  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fridge</Text>
      <Text style={styles.description}>Add your Ingredients to your Fridge for Menu Personalization!</Text>

      <Button icon="plus" mode="contained" onPress={AddIngredient}>
      Add Ingredient
      </Button>

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

      <Button icon="plus" mode="contained" onPress={AddIngredient}>
      Add to Grocery List
      </Button>

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

    </View>
  );
}


