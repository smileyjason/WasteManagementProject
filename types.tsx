/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

 import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
 import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
 import { NativeStackScreenProps } from '@react-navigation/native-stack';
 
 declare global {
   namespace ReactNavigation {
     interface RootParamList extends RootStackParamList {}
   }
 }
 
 export type RootStackParamList = {
   Root: NavigatorScreenParams<RootTabParamList> | undefined;
   Modal: undefined;
   NotFound: undefined;
 
   TipsScreen: undefined;
   ResourcesScreen: undefined;
   CouponsScreen: undefined;
   SettingsScreen: undefined;
   HelpScreen: undefined;
   SearchRecipesScreen: undefined;
   RecipeScreen: {id: string};
 };
 
 export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
   RootStackParamList,
   Screen
 >;
 
 export type RootTabParamList = {
   HomeScreen: undefined;
   FridgeScreen: undefined;
   Menu: undefined;
   RecipesTab: undefined;
   MoreTab: undefined;
   TipsScreen: undefined;
   MealPlanningScreen: undefined;
   ResourcesScreen: undefined;
   CouponsScreen: undefined;
   SettingsScreen: undefined;
   HelpScreen: undefined;
   HomeTabScreen: undefined;
   SearchRecipesScreen: undefined;
   RecipeScreen: {id: string};
 };
 
 export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
   BottomTabScreenProps<RootTabParamList, Screen>,
   NativeStackScreenProps<RootStackParamList>
 >;
