import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
