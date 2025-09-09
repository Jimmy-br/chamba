import React, { useState } from 'react';
import {
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ScrollView,
  ImageBackground
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function RegisterClientScreen({ navigation }: any) {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

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

      await firestore().collection('users').doc(userCredential.user.uid).set({
        email,
        role: 'client',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      setUser(userCredential.user);
      Alert.alert('Éxito', 'Cuenta de cliente creada correctamente');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1b0000' }}>
      {/* Imagen de portada */}
      <ImageBackground
        source={{ uri: 'https://res.cloudinary.com/<tu_cloud_name>/image/upload/v1725900000/ClientHeader.png' }}
        style={styles.image}
      >
        <View style={styles.overlay} />
      </ImageBackground>

      <View style={styles.container}>
        <Text style={styles.title}>Ingresa para ofrecer un servicio</Text>

        {/* Botón Google */}
        <TouchableOpacity style={styles.googleBtn}>
          <Text style={styles.googleText}>Continúa con Google</Text>
        </TouchableOpacity>

        <Text style={styles.separator}>o continúa con</Text>

        {/* Inputs */}
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

         {/* Contraseña */}
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputWithIcon}
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? "visibility" : "visibility-off"} size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Validaciones visibles */}
        <Text style={styles.validation}>- Al menos 8 caracteres</Text>
        <Text style={styles.validation}>- Al menos 1 letra mayúscula</Text>
        <Text style={styles.validation}>- Al menos 1 letra minúscula</Text>
        <Text style={styles.validation}>- Al menos 1 número</Text>

        {/* Confirmar contraseña */}
        <Text style={styles.label}>Confirmar contraseña</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputWithIcon}
            placeholderTextColor="#aaa"
            secureTextEntry={!showConfirmPass}
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowConfirmPass(!showConfirmPass)}
          >
            <Icon name={showConfirmPass ? "visibility" : "visibility-off"} size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Botón Crear cuenta */}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Cargando...' : 'Crear mi cuenta'}
          </Text>
        </TouchableOpacity>

        {/* Links */}
        <View style={styles.inlineText}>
          <Text style={styles.subtitle}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 220, justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 20 },
  googleBtn: { backgroundColor: '#fff', padding: 12, borderRadius: 25, alignItems: 'center', marginBottom: 15 },
  googleText: { color: '#000', fontWeight: '600' },
  separator: { textAlign: 'center', color: '#aaa', marginBottom: 15 },
  validation: { fontSize: 12, color: '#bbb', marginLeft: 5, marginBottom: 4 },
  button: { backgroundColor: '#00bcd4', padding: 15, borderRadius: 30, alignItems: 'center', marginVertical: 20 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  link: { color: '#00bcd4', textAlign: 'center', marginBottom: 20 },
  inlineText: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#ddd', textAlign: 'center', marginBottom: 20 },

  label: {
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },

  input: { 
    borderWidth: 1, 
    borderColor: '#fff', 
    borderRadius: 8, 
    padding: 12, 
    marginBottom: 12, 
    color: '#fff' 
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    marginBottom: 15,
  },

  inputWithIcon: {
    flex: 1,
    padding: 10,
    color: '#fff',
  },

  iconContainer: {
    paddingHorizontal: 10,
  },
});
