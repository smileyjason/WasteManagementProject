import * as React from 'react';
import styles from '../styles/ScreenStyles';

import { Text, View } from '../components/Themed';
import { Searchbar } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
import ScreenTitle from '../components/ScreenTitle';
import CuratedGuideLink from '../components/CuratedGuideLink';
import PopularResourceLink from '../components/PopularResourcesLink';
import { StyleSheet } from 'react-native';

interface CuratedGuide {
  title: string;
}

interface PopularResoure {
  title: string;
  blurb: string;
  websiteTitle: string;
}

const myStyles = StyleSheet.create({
  parentBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  curatedLinkContainer: {
    paddingTop: '10px',
  },
  popularLinkContainer: {
    paddingTop: '10px',
    paddingBottom: '5px',
  },
  content: {
    width: '95%',
  }
});

const dummyCuratedResources = [
  {
    title: "Engineers Without Borders Student Guide",
  },
  {
    title: "University of Toronto - Food on Campus",
  }
];

const dummyPopularResources = [
  {
    title: "Meal Prep 101",
    blurb: "Step-by-step fundamentals of planning your meals.",
    websiteTitle: "Budgetbytes.com",
  },
  {
    title: "Essential Spices for Students",
    blurb: "Ten seasonings every college student should keep on hand.",
    websiteTitle: "Publix.com",
  }
];

export default function ResourcesScreen({ navigation }: RootTabScreenProps<'ResourcesScreen'>) {
  const [search, setSearch] = React.useState("");

  const curatedLinkList = dummyCuratedResources.map((resource : CuratedGuide) => {
    return (
      <View style = {myStyles.curatedLinkContainer}>
        <CuratedGuideLink title={resource.title} onPress={() => {return null;}}/>
      </View>
    );
  });

  const popularLinkList = dummyPopularResources.map((resource : PopularResoure) => {
    return (
      <View style = {myStyles.popularLinkContainer}>
        <PopularResourceLink title={resource.title} blurb={resource.blurb} 
          websiteTitle={resource.websiteTitle} onPress={() => {return null;}}/>
      </View>
    );
  });

  return (
    <View style={myStyles.parentBox}>
      <View style={myStyles.titleContainer}>
        <ScreenTitle title="Resources and Guides" subtitle="Expert resources to help you plan meals"
        helpMessage="HELP" />
      </View>
      <View style={myStyles.content}>
        <View>
          <Searchbar 
          placeholder="Search Resources and Guides"
          autoComplete={false}
          onChangeText={() => {return null;}}
          value={search}
          />
        </View>
        <View style={myStyles.curatedLinkContainer}>
          <Text style={styles.title}>Curated Guides</Text>
          {curatedLinkList}
        </View>
        <View style={myStyles.popularLinkContainer}>
          <Text style={styles.title}>Popular Resources</Text>
          {popularLinkList}
        </View>
      </View>
    </View>
  );
}

