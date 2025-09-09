import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import LoginScreen from '../screens/Auth/LoginScreen.tsx';
import RegisterClientScreen from '../screens/Auth/RegisterClientScreen.tsx';
import RegisterWorkerScreen from '../screens/Auth/RegisterWorkerScreen.tsx';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen.tsx';
import RoleSelectionScreen from '../screens/Auth/RoleSelectionScreen.tsx';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ title: 'Selecciona rol' }} />
      <Stack.Screen name="RegisterClient" component={RegisterClientScreen} options={{ title: 'Registro cliente' }} />
      <Stack.Screen name="RegisterWorker" component={RegisterWorkerScreen} options={{ title: 'Registro trabajador' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Recuperar contraseña' }} />
    </Stack.Navigator>
  );
}
