import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { collection, setDoc } from "firebase/firestore"; 

export async function getData (){

    console.log("in get data")
    //const recipesCol = collection(db, 'recipes');
    const docRef = doc(db, "recipes", "p3pKOD6jIHEcjf20CCXohP8uqkG5dGi");
    const docSnap = await getDoc(docRef);
    //.then((response) =>{
    //    console.log(response);
    //});

    //const cityList = docSnap.docs.map(doc => console.log(doc.data()));


    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return "";
    }

  }