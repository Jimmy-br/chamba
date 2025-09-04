import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function RoleSelectionScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Imagen de portada */}
      <Image
        source={{ uri: 'https://via.placeholder.com/400x300.png?text=Servicios' }}
        style={styles.image}
      />

      {/* Texto principal */}
      <Text style={styles.title}>SERVICIOS PROFESIONALES, A TU ALCANCE</Text>
      <Text style={styles.subtitle}>
        Escoge una opción para iniciar. Puedes agregar otra cuenta en cualquier momento
      </Text>

      {/* Botones de selección */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#00bcd4' }]}
          onPress={() => navigation.navigate('RegisterClient')}
        >
          <Text style={styles.buttonText}>Soy cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#009688' }]}
          onPress={() => navigation.navigate('RegisterWorker')}
        >
          <Text style={styles.buttonText}>Soy trabajador</Text>
        </TouchableOpacity>
      </View>

      {/* Link alternativos */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes una cuenta? Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('Saltado')}>
        <Text style={styles.skip}>Saltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1b0000', padding: 20, justifyContent: 'flex-end' },
  image: { position: 'absolute', top: 0, width: '100%', height: '55%', resizeMode: 'cover' },
  title: { fontSize: 20, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#ddd', textAlign: 'center', marginBottom: 20 },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  button: { flex: 1, marginHorizontal: 5, padding: 15, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { color: '#00bcd4', textAlign: 'center', marginBottom: 10 },
  skip: { color: '#aaa', textAlign: 'center', fontSize: 12 },
});
