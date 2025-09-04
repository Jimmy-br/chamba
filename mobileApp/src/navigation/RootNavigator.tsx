import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack.tsx';
import MainTabs from './MainTabs.tsx';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type RootNavigatorProps = {
  user: FirebaseAuthTypes.User | null;
};

const Stack = createNativeStackNavigator();

const RootNavigator: React.FC<RootNavigatorProps> = ({ user }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainApp" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
