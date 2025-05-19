// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigators/appNavigator';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
