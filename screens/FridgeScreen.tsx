import * as React from 'react';
import styles from '../styles/ScreenStyles';
import { DataTable } from 'react-native-paper';
import { Modal, Portal, Button, Card, Divider, TextInput } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
import { ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import { StyleSheet } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { app, db } from '../firebase';

const fridgeStyles = StyleSheet.create({
  card: {
    width: "80%",
    backgroundColor: '#C4C4C4',
    marginBottom: 15
  },
  list: {
    backgroundColor: '#C4C4C4',
    marginTop: 5,
  }
});

export default function FridgeScreen({ navigation }: RootTabScreenProps<'FridgeScreen'>) {
  // react variables
  const [visibleFridge, setVisibleFridge] = React.useState(false);
  const [visibleGrocery, setVisibleGrocery] = React.useState(false);

  const showModalFridge = () => setVisibleFridge(true);
  const showModalGrocery = () => setVisibleGrocery(true);
  const hideModalFridge = () => setVisibleFridge(false);
  const hideModalGrocery = () => setVisibleGrocery(false);

  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [fridge, setFridge] = React.useState<{ id: string, label: string, amount: string }[]>();
  const [groceries, setGroceries] = React.useState<{ id: string, label: string, amount: string }[]>();
  const [newInFridge, setNewInFridge] = React.useState(0);
  const [newInGrocery, setNewInGrocery] = React.useState(0);
  const containerStyle = { alignItems: 'center' };

  // add input ingredients to fridge and database
  function addIngredientFridge() {
    const IngredientData = {
      name: name,
      date: date,
      amount: amount
    }
    console.log(IngredientData);
    addDoc(collection(db, "fridge ingredients"), {
      name: name,
      date: date,
      amount: amount
    }).then(r => {});
    setNewInFridge(newInFridge + 1); // modify list and add to database

  }

  // add input ingredients to grocery list and database
  function addIngredientGrocery() {
    const GroceryData = {
      name: name,
      amount: amount
    }
    console.log(GroceryData); // modify list and add to database
    addDoc(collection(db, "groceries"), {
      name: name,
      amount: amount
    });
    setNewInGrocery(newInGrocery + 1);
  }

  React.useEffect(() => {
    (async () => {

      let temp: { id: string, label: string, amount: string }[] = [];

      const querySnapshot = await getDocs(collection(db, "fridge ingredients"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        temp.push({ id: doc.id, label: doc.data().name, amount: doc.data().amount });
      });

      setFridge(temp);

    })()

    return () => {
      // 👍
    }
  }, [newInFridge])

  console.log(fridge);

  React.useEffect(() => {
    (async () => {

      let temp: { id: string, label: string, amount: string }[] = [];

      const querySnapshot = await getDocs(collection(db, "groceries"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        temp.push({ id: doc.id, label: doc.data().name, amount: doc.data().amount });
      });

      setGroceries(temp);

    })()

    return () => {
      // 👍
    }
  }, [newInGrocery])

  console.log(groceries);

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
              value={name}
              onChangeText={name => setName(name)}
              autoComplete = "off"
            />
            <TextInput
              label="Date (dd/mm/yyyy)"
              value={date}
              onChangeText={date => setDate(date)}
              autoComplete = "off"
            />
            <TextInput
              label="Amount"
              value={amount}
              onChangeText={amount => setAmount(amount)}
              autoComplete = "off"
            />
            <Button icon="plus" mode="contained" onPress={()=> {addIngredientFridge() , setName('') , setAmount('') , setDate('')}} color='#90EE90'>
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
              value={name}
              onChangeText={name => setName(name)}
              autoComplete = "off"
            />
            <TextInput
              label="Amount"
              value={amount}
              onChangeText={amount => setAmount(amount)}
              autoComplete = "off"
            />
            <Button icon="plus" mode="contained" onPress={()=> {addIngredientGrocery() , setAmount(''), setName('')}} color='#90EE90'>
              Add Ingredient to Grocery List
            </Button>
          </Card>
        </Modal>
      </Portal>
      <View style={styles.container}>

        {/* Title */}
        <ScreenTitle
          title="Fridge"
          subtitle="Add your ingredients to your virtual Fridge for menu personalization!"
          helpMessage="You can manage the contents of your fridge in the Fridge tab."
        />

        <Card style={fridgeStyles.card}>
          <Card.Title
            title="Ingredients"
            subtitle=""
          />
          <Divider />

          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Fridge</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
              </DataTable.Header>
              {
                fridge?.map((l, i) => (
                  <View style={fridgeStyles.list}>
                    <DataTable.Row>
                      <DataTable.Cell>{l.label}</DataTable.Cell>
                      <DataTable.Cell numeric>{l.amount}</DataTable.Cell>
                    </DataTable.Row>
                    <Divider />
                  </View>
                ))
              }
            </DataTable>
            <Button icon="plus" mode="contained" onPress={showModalFridge} color='#90EE90'>
              Add to Fridge
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
                <DataTable.Title>Groceries</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
              </DataTable.Header>
              {
                groceries?.map((l, i) => (
                  <View style={fridgeStyles.list}>
                    <DataTable.Row>
                      <DataTable.Cell>{l.label}</DataTable.Cell>
                      <DataTable.Cell numeric>{l.amount}</DataTable.Cell>
                    </DataTable.Row>
                    <Divider />
                  </View>
                ))
              }
            </DataTable>

            <Button icon="plus" mode="contained" onPress={showModalGrocery} color='#90EE90'>
              Add to Grocery List
            </Button>

          </Card.Content>
        </Card>




      </View>
    </ScrollView>
  );
}


