import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import OnboardingStack from './OnboardingStack';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
      {user ? (
        user.role === 'client' || user.role === 'worker' ? (
          // Flujo post-registro -> usar OnboardingStack
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
        ) : (
          // Invitado o admin -> directo MainTabs
          <Stack.Screen name="Main" component={MainTabs} />
        )
      ) : (
        // Si no hay usuario -> flujo de auth
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
