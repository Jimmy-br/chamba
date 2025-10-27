import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { getImageUrl } from '../../config/cloudinary';
import { useAuth } from '../../context/AuthContext';

export default function RoleSelectionScreen({ navigation }: any) {
   const { setUser } = useAuth();

   const handleGuest = () => {
    setUser({ role: 'guest' });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Imagen en la parte superior */}
      <ImageBackground
        source={{ uri: getImageUrl('ProfessionalLandscaper_cfs4rk', 400, 600) }}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <View style={styles.imageOverlay} />
      </ImageBackground>

      {/* Contenido principal debajo de la imagen */}
      <View style={styles.container}>
        <Text style={styles.title}>SERVICIOS PROFESIONALES, A TU ALCANCE</Text>
        <Text style={styles.subtitle}>
          Escoge una opción para iniciar. Puedes agregar otra cuenta en cualquier momento
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#00bcd4' }]}
            onPress={() => navigation.navigate('Register', { role: 'client' })}
          >
            <Text style={styles.buttonText}>Soy cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#00bcd4' }]}
            onPress={() => navigation.navigate('Register', { role: 'worker' })}
          >
            <Text style={styles.buttonText}>Soy trabajador</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inlineText}>
          <Text style={styles.subtitle}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleGuest}>
          <Text style={styles.skip}>Continuar como invitado</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 450,
    justifyContent: 'flex-end',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  link: {
    color: '#00bcd4',
    textAlign: 'center',
    marginBottom: 20,
  },
  skip: {
    color: '#00bcd4',
    textAlign: 'left',
    fontSize: 14,
  },
  inlineText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
