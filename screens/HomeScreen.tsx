import * as React from 'react';
import styles from '../styles/ScreenStyles';
import { DataTable } from 'react-native-paper';
import { Card, Divider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
import { ScrollView } from 'react-native';
import { collection,  getDocs, query, where } from "firebase/firestore";
import { Text, View } from '../components/Themed';
import { db } from '../firebase';
import ScreenTitle from '../components/ScreenTitle';
import HomeStyles from '../styles/HomeStyles';
import SustainabilityTip from '../components/SustainabilityTip';
import { StyleSheet } from 'react-native';

const recipeStyles = StyleSheet.create({
  card: {
    width: "80%", 
    backgroundColor: '#C4C4C4',
    marginBottom: '15px'
  },
  list: {
    backgroundColor: '#C4C4C4',
    marginTop: '5px',
  },
  buttonlabel: {
    color: '#006400'
  }
});
export default function HomeScreen({ navigation }: RootTabScreenProps<'HomeScreen'>) {

  type DocumentType = {id: string, label: string}[];
  const [dailyMenu, setDailyMenu] = React.useState<DocumentType>();

  React.useEffect(() => {
    //loadTypsenseCollection();
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("unsubscribe");
      loadData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);


  async function loadData() {
    let temp: {id: string, label: string}[] = [];

    /*const querySnapshot = await getDocs(collection(db, "recipes"));
    querySnapshot.forEach((doc) => {
      temp.push({id: doc.id, label: doc.data().title});
    });

    setDocuments(temp);*/

    const q_DailyMenu = query(collection(db, "recipes"), where("daily_menu", "==", true));
    temp = [];
    const querySnapshot_DailyMenu = await getDocs(q_DailyMenu);
    querySnapshot_DailyMenu.forEach((doc) => {
      temp.push({id: doc.id, label: doc.data().title});
    });

    setDailyMenu(temp);

  }

  const recipeButton = (l: {id: string, label: string}) => {
    return (

        <View style={HomeStyles.list}>
        <Button 
          mode="text" 
          uppercase={false} 
          onPress={() => navigation.navigate('RecipeScreen', {id: l.id as string})} 
          labelStyle = {HomeStyles.buttonlabel}>
            {l.label}
        </Button>
        <Divider />
        </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Title */}
        <ScreenTitle 
          title = "Home" 
          subtitle = "Welcome!"
          helpMessage = "You can keep track of your recent activity here."
        />

        <SustainabilityTip tip = "Storing greens with paper towel can help them last longer!"/>

        <Card style={HomeStyles.card}>
          <Card.Title
            title="Meal Planning"
          />

        <Divider/>
          <Card.Content>
            {
              dailyMenu?.map((l, i) => (
                recipeButton(l)
              ))
            }
          </Card.Content>
        </Card>

        <Card style={HomeStyles.card}>
          <Card.Title
            title="Near Expiry Dates"
          />
        </Card>

      </View>
    </ScrollView>

  );
}
