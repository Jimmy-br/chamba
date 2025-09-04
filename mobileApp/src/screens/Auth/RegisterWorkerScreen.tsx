import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../context/AuthContext';

export default function RegisterWorkerScreen({ navigation }: any) {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPass) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }
    if (password !== confirmPass) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // Guardamos el rol en Firestore
      await firestore().collection('users').doc(userCredential.user.uid).set({
        email,
        role: 'worker',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      setUser(userCredential.user);
      Alert.alert('Éxito', 'Cuenta de trabajador creada correctamente');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagen de portada */}
      <Image
        source={{ uri: 'https://via.placeholder.com/300x200.png?text=Trabajador' }}
        style={styles.image}
      />

      <Text style={styles.title}>Registro trabajador</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPass}
        onChangeText={setConfirmPass}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cargando...' : 'Crear mi cuenta'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1b0000', justifyContent: 'center' },
  image: { width: '100%', height: 200, resizeMode: 'cover', marginBottom: 20, borderRadius: 10 },
  title: { fontSize: 24, color: '#fff', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#fff', borderRadius: 6, padding: 10, marginBottom: 15, color: '#fff' },
  button: { backgroundColor: '#00bcd4', padding: 15, borderRadius: 30, alignItems: 'center', marginVertical: 10 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  link: { color: '#00bcd4', textAlign: 'center', marginTop: 10 },
});
