import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import LoginScreen from '../screens/Auth/LoginScreen.tsx';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen.tsx';
import RoleSelectionScreen from '../screens/Auth/RoleSelectionScreen.tsx';
import RegisterScreen from '../screens/Auth/RegisterScreen.tsx';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ title: 'Selecciona rol' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Recuperar contraseña' }} />
    </Stack.Navigator>
  );
}
