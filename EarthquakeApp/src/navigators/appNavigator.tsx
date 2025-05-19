// src/navigators/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/homeScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);
