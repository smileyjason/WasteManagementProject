import * as React from 'react';
import styles from '../styles/ScreenStyles';
import { DataTable } from 'react-native-paper';
import { Modal, Portal, Button, Card, Divider, TextInput } from 'react-native-paper';
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
  const [visibleFridge, setVisibleFridge] = React.useState(false);
  const [visibleGrocery, setVisibleGrocery] = React.useState(false);

  const showModalFridge = () => setVisibleFridge(true);
  const showModalGrocery = () => setVisibleGrocery(true);
  const hideModalFridge = () => setVisibleFridge(false);
  const hideModalGrocery = () => setVisibleGrocery(false);

  const [text, setText] = React.useState("");
  const containerStyle = {alignItems: 'center'};

  const addIngredientFridge = () => null; {/* modify list */}
  const addIngredientGrocery = () => null; {/* modify list */}

  return (
    <ScrollView>
      <Portal>
        <Modal visible={visibleFridge} onDismiss={hideModalFridge} contentContainerStyle={containerStyle}>
          <Card style={fridgeStyles.card}>
            <Card.Title
              title="Add an Ingredient to Your Fridge"
              subtitle=""
            />
            <Divider />
            <TextInput
              label="Ingredient"
              value={text}
              onChangeText={text => setText(text)}
            />
            <TextInput
              label="Date (dd/mm/yyyy)"
              value={text}
              onChangeText={text => setText(text)}
            />
            <Button icon="plus" mode="contained" onPress={addIngredientFridge} color = '#90EE90'>
            Add Ingredient to Fridge
            </Button>
          </Card>
        </Modal>
        <Modal visible={visibleGrocery} onDismiss={hideModalGrocery} contentContainerStyle={containerStyle}>
          <Card style={fridgeStyles.card}>
            <Card.Title
              title="Add an Ingredient to Your Grocery List"
              subtitle=""
            />
            <Divider />
            <TextInput
              label="Ingredient"
              value={text}
              onChangeText={text => setText(text)}
            />
            <Button icon="plus" mode="contained" onPress={addIngredientGrocery} color = '#90EE90'>
            Add Ingredient to Grocery List
            </Button>
          </Card>
        </Modal>
      </Portal>
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

            <Button icon="plus" mode="contained" onPress={showModalFridge} color = '#90EE90'>
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

            <Button icon="plus" mode="contained" onPress={showModalGrocery} color = '#90EE90'>
            Add to Grocery List
            </Button>

          </Card.Content>
        </Card>


        

      </View>
    </ScrollView>
  );
}


