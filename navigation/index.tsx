/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import FridgeScreen from '../screens/FridgeScreen';
import MoreScreen from '../screens/MoreScreen';
import RecipesPageScreen from '../screens/RecipesPageScreen';
import MealPlanningScreen from '../screens/MealPlanningScreen';

import TipsScreen from '../screens/TipsScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import CouponsScreen from '../screens/CouponsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import HelpButton from '../components/HelpButton';
import SearchRecipesScreen from '../screens/SearchRecipesScreen';
import RecipeScreen from '../screens/RecipeScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="TipsScreen" component={TipsScreen}/>
      <Stack.Screen name="ResourcesScreen" component={ResourcesScreen}/>
      <Stack.Screen name="CouponsScreen" component={CouponsScreen}/>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
      <Stack.Screen name="HelpScreen" component={HelpScreen}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="SearchRecipesScreen" component={SearchRecipesScreen}/>
      <Stack.Screen name="RecipeScreen" component={RecipeScreen}/>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="RecipesTab"
        component={RecipesPageScreen}
        options={({ navigation }: RootTabScreenProps<'RecipesTab'>) => ({
          title: 'Recipes',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="FridgeScreen"
        component={FridgeScreen}
        options={({ navigation }: RootTabScreenProps<'FridgeScreen'>) => ({
          title: 'Fridge',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      />
      
      <BottomTab.Screen
        name="MealPlanningScreen"
        component={MealPlanningScreen}
        options={{
          title: 'Meal Planning',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
        />
      <BottomTab.Screen
        name="MoreTab"
        component={MoreScreen}
        options={({ navigation }: RootTabScreenProps<'MoreTab'>) => ({
          title: 'More',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
