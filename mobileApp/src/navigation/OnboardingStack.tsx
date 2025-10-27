import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import LocationScreen from '../screens/LocationScreen';
import MainTabs from './MainTabs';

export type OnboardingStackParamList = {
  UserDetails: undefined;
  Location: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}
