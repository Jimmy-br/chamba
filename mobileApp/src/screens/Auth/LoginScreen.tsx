import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
      <Button title="Entrar (demo)" onPress={() => signIn()} />
      <Button title="Crear cuenta" onPress={() => navigation.navigate('Register')} />
      <Button title="¿Olvidaste tu contraseña?" onPress={() => navigation.navigate('ForgotPassword')} />
    </View>
  );
}
