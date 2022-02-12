import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { useEffect, useState } from "react";
import { getRecipe } from '../hooks/getRecipes';

export default function RecipeScreen( { navigation, route }: RootTabScreenProps<'RecipeScreen'>) {


  const [documents, setDocuments] = React.useState<any>({
    title: "",
    ingredients: [],
    instructions: "",
    picture_link: ""
  });


    React.useEffect(() => {
      (async () => {
        const docRef = doc(db, "recipes", route.params.id);
        const docSnap = await getDoc(docRef);
        const data = await docSnap.data();
        console.log(data);
        setDocuments(data);

      })()
  
      return () => {
         // 👍 
      }
    }, [])


  //In the RecipesPageScreen, you just retrieve the titles of the recipe and send that to this when it is clicked on
  //Then in here, you retrieve all the recipe info from the database
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{documents.title}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

       {
          documents.ingredients.map((item: string) => {
            return (
              <Text style={styles.description}>{item}</Text>
            );
          })
        }

      <Text style={styles.description}>{documents.instructions}</Text>
    </View>
  );
}