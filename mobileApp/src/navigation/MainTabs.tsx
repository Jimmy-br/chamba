import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabsParamList } from './types';
import HomeScreen from '../screens/HomeScreen.tsx';
import ServicesScreen from '../screens/ServicesScreen.tsx';
import FavoritesScreen from '../screens/FavoritesScreen.tsx';
import ProfileScreen from '../screens/ProfileScreen.tsx';

const Tab = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Services" component={ServicesScreen} options={{ title: 'Servicios' }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
