import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { useEffect, useState } from "react";
import { collection, addDoc, updateDoc, serverTimestamp, deleteField   } from "firebase/firestore"; 
import {recipesData} from '../recipes';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native';

export default function RecipeScreen( { navigation, route }: RootTabScreenProps<'RecipeScreen'>) {


  const [document, setDocument] = React.useState<any>({
    title: "",
    ingredients: [],
    instructions: "",
    picture_link: "",
    bookmarked: false,
    daily_menu: false
  });


    React.useEffect(() => {
      (async () => {
        const docRef = doc(db, "recipes", route.params.id);
        const docSnap = await getDoc(docRef);
        const data = await docSnap.data();
        console.log(data);
        setDocument(data);

        await updateDoc(docRef, {
          last_viewed: serverTimestamp()
        });


        const querySnapshot = await getDocs(collection(db, "recipes"));
        querySnapshot.forEach((item) => {
          //deleteDoc(doc(db, "recipes", item.id));
          const docRef = doc(db, "recipes", item.id);
          if (item.data().cuisine === null) {
            updateDoc(docRef, {
              cuisine: ""
            });
          }
          
        });


        /*var count = 0;
        for (const property in recipesData) {

          try {
            const docRef = await addDoc(collection(db, "recipes"), {...recipesData[property]});
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }*/

      })()
  
      return () => {
      }
    }, [])

  const addBookmark = () => {
    (async () => {
        const docRef = doc(db, "recipes", route.params.id);
        await updateDoc(docRef, {
          bookmarked: !document.bookmarked
        });

    })()

    setDocument({
        ...document,
        bookmarked: !document.bookmarked
    });

  }

  const addDailyMenu = () => {
    (async () => {
        const docRef = doc(db, "recipes", route.params.id);
        await updateDoc(docRef, {
          daily_menu: !document.daily_menu
        });

    })()

    setDocument({
      ...document,
      daily_menu: !document.daily_menu
  });

  }


  //In the RecipesPageScreen, you just retrieve the titles of the recipe and send that to this when it is clicked on
  //Then in here, you retrieve all the recipe info from the database
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>{document.title}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Button 
          mode="text" 
          uppercase={false} 
          onPress={() => addBookmark()}
        >
            { document.bookmarked ? "Unbookmark" : "Bookmark" }
        </Button>

        <Button 
          mode="text" 
          uppercase={false} 
          onPress={() => addDailyMenu()}
        >
            { document.daily_menu ? "Remove from Daily Menu" : "Add to Daily Menu" }
        </Button>

       {
          document.ingredients.map((item: string) => {
            return (
              <Text style={styles.description}>{item}</Text>
            );
          })
        }

      <Text style={styles.description}>{document.instructions}</Text>
    </View>
    </ScrollView>
  );
}