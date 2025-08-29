import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

function App() {
  useEffect(() => {
    // Verificar que Firebase Auth funciona
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Usuario logueado:', user.email);
      } else {
        console.log('No hay usuario logueado');
      }
    });

    // Verificar que Firebase Messaging funciona (solo Android)
    messaging()
      .getToken()
      .then(token => {
        console.log('Token FCM:', token);
      });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🚀 Chamba App con Firebase funcionando</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default App;
