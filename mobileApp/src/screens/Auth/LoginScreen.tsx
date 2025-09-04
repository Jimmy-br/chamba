import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }
    try {
      setLoading(true);
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      setUser(userCredential.user); // Guardamos en el AuthContext
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle} />
        <Text style={styles.logoText}>LOGOTIPO</Text>
      </View>

      {/* Título */}
      <Text style={styles.title}>Bienvenid@</Text>

      {/* Input Email */}
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="correo@ejemplo.com"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/* Input Password */}
      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setSecureText(!secureText)}
        >
          <Icon name={secureText ? 'visibility-off' : 'visibility'} size={22} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Botón Login */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </Text>
      </TouchableOpacity>

      {/* Link forgot password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgothPassword')}>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b0000', 
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00bcd4',
    marginBottom: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    color: '#fff',
  },
  iconButton: {
    padding: 10,
  },
  button: {
    backgroundColor: '#00bcd4',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  forgotText: {
    color: '#00bcd4',
    textAlign: 'center',
    marginTop: 10,
  },
});
