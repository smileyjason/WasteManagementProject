import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { List, Searchbar, Button, Checkbox, Divider, Caption, Paragraph } from 'react-native-paper';
import { app, db } from '../firebase';
import { typesenseSearch} from '../typesense/typesense';

export default function SearchRecipesScreen({ navigation, route }: RootTabScreenProps<'SearchRecipesScreen'>) {
  type DocumentType = {id: string, label: string}[];

  const [expanded, setExpanded] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [searchIng, setSearchIng] = React.useState("");
  const [searchNoIng, setSearchNoIng] = React.useState("");
  const [results, setResults] = React.useState<{id: string, label: string}[]>();
  const [noResults, setNoResults] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  const onChangeSearch = (searchValue: string) => setSearch(searchValue);
  const onChangeSearchIng = (searchValue: string) => setSearchIng(searchValue);
  const onChangeSearchNoIng = (searchValue: string) => setSearchNoIng(searchValue);

  const mealTypes = [
    "Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Appetizers", 
    "Salad", "Side dishes", "Soups and stews"
  ];

  const cookingStyle = [
    "Air-fryer", "BBQ and grilling", "Family dinner", "Cooking for two", "Leftover recipes", "Quick and easy",
    "Slow cooker", "Make-Ahead"
  ];

  const cuisines = [
    "Chinese", "Filipino", "Greek", "Indian", "Italian", "Japanese",
    "Mexican", "Russian", "Spanish", "Thai"
  ];

  const dietaryRestrictions = [
    "Diabetic Recipes", "Gluten-Free", "Keto",
    "Vegan", "Vegetarian", "Lactose-Free"
  ];

  const [checkedMeal, setMealChecked] = React.useState(mealTypes.map(() => {return false;}));
  const [checkedCookingStyle, setCookingStyleChecked] = React.useState(cookingStyle.map(() => {return false;}));
  const [checkedCuisines, setCuisinesChecked] = React.useState(cuisines.map(() => {return false;}));
  const [checkedDietary, setDietaryChecked] = React.useState(dietaryRestrictions.map(() => {return false;}));
  
  const recipeButton = (l: {id: string, label: string}) => {
    return (
      <View >
          <Button 
            mode="text" 
            uppercase={false} 
            onPress={() => navigation.navigate('RecipeScreen', {id: l.id as string})} 
            >
              {l.label}
          </Button>
          <Divider/>
      </View>
    )
  }

  const onClickSearchAll = () => {
    setResults([]);

    const searchValue = (search === "" && searchNoIng === "")
    ? "*" : search + "-" + searchNoIng.replaceAll(" ", "-");

    const filterIng = searchIng === "" ? [] : [`ingredients:${searchIng}`];

    const filterListMeal: string[] = [];
      mealTypes.forEach((item, index) => {
        if (checkedMeal[index]) {
          filterListMeal.push(`meal_type:${item}`);
        }
      });

      const filterListCuisine: string[] = [];
      cuisines.forEach((item, index) => {
        if (checkedCuisines[index]) {
          filterListCuisine.push(`cuisine:${item}`);
        }
      });

      const filterListCookingStyle: string[] = [];
      cookingStyle.forEach((item, index) => {
        if (checkedCookingStyle[index]) {
          filterListCookingStyle.push(`cooking_style:${item}`);
        }
      });

      const filterListDietary: string[] = [];
      dietaryRestrictions.forEach((item, index) => {
        if (checkedDietary[index]) {
          filterListDietary.push(`dietary_restrictions:${item}`);
        }
      });

      const filter = [
        ...filterIng,
        ...filterListMeal,
        ...filterListCookingStyle,
        ...filterListCuisine,
        ...filterListDietary
      ].join(' && ');

      console.log(filter);
    
    (async () => {
        await typesenseSearch(route.params.typesense, 'recipes', searchValue, "title, ingredients", filter).then((results) => {

          if (results.length > 0 ) {
            let temp: DocumentType = [];
            results.forEach((item: any) => {
              let id = item.document.document_id as string;
              let title = item.document.title as string;
              temp.push({id: id, label: title})
            });
  
            setResults(temp);
            setNoResults(false);
          } else {
            console.log("No results");
            setNoResults(true);
            setResults([]);
          }
          
        });
    })()
  }

  const onClickClearAll = () => {
    setSearch("");
    setSearchIng("");
    setSearchNoIng("");
    setMealChecked(checkedMeal.map(() => {return false;}));
    setCookingStyleChecked(checkedCookingStyle.map(() => {return false;}));
    setCuisinesChecked(checkedCuisines.map(() => {return false;}));
    setDietaryChecked(checkedDietary.map(() => {return false;}));
  }


  const displayItems = (itemsList: string[], checked: boolean[], setChecked: React.Dispatch<React.SetStateAction<boolean[]>>) => {
    let checkboxItems = itemsList.map((item, index) => {
      return (
        <Checkbox.Item
          key={item}
          label={item}
          position="leading"
          status={checked[index] ? 'checked' : 'unchecked'}
          onPress={() => {
            let newChecked = [...checked];
            newChecked[index] = !checked[index];
            setChecked(newChecked);
          }}
        />
      )
    });

    return checkboxItems;
  }

  return (
    <React.Fragment>

      <List.Section>
        <List.Accordion title="Search by recipe" id="0">
          <Searchbar
            placeholder="Search"
            autoComplete={false}
            onChangeText={onChangeSearch}
            value={search}
          />
        </List.Accordion>

        <List.Accordion title="Ingredients" id="1">
          <Paragraph>Include these ingredients:</Paragraph>
          <Searchbar
            autoComplete={false}
            onChangeText={onChangeSearchIng}
            value={searchIng}
          />
          <Paragraph>Do not include these ingredients:</Paragraph>
          <Searchbar
            autoComplete={false}
            onChangeText={onChangeSearchNoIng}
            value={searchNoIng}
          />
        </List.Accordion>
        <List.Accordion title="Cuisines" id="2">
          { displayItems(cuisines, checkedCuisines, setCuisinesChecked) }
        </List.Accordion>
        <List.Accordion title="Meals" id="3">
          { displayItems(mealTypes, checkedMeal, setMealChecked) }
        </List.Accordion>
        <List.Accordion title="Dietary Restrictions" id="7">
        { displayItems(dietaryRestrictions, checkedDietary, setDietaryChecked) }
        </List.Accordion>
        <List.Accordion title="Cooking Style" id="8">
          { displayItems(cookingStyle, checkedCookingStyle, setCookingStyleChecked) }
        </List.Accordion>
    </List.Section>

      <Button
            onPress={() => onClickSearchAll()}
            mode="text"
            uppercase={false}
          >
            Search
      </Button>

      <Button
            onPress={() => onClickClearAll()}
            mode="text"
            uppercase={false}
          >
            Clear all
      </Button>


      {
          results?.map((l, i) => (
             recipeButton(l)
          ))
      }
      {
        noResults ? <Paragraph>No recipes match the search</Paragraph> : <></>
      }
    </React.Fragment>

  );
}