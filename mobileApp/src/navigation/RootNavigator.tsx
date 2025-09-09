import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import RoleSelectionScreen from '../screens/Auth/RoleSelectionScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterClientScreen from '../screens/Auth/RegisterClientScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import RegisterWorkerScreen from '../screens/Auth/RegisterWorkerScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {
        user ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="RegisterClient" component={RegisterClientScreen} />
            <Stack.Screen name="RegisterWorker" component={RegisterWorkerScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )
      }
    </Stack.Navigator>
  );
}
