import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { enableScreens } from 'react-native-screens';
import RootNavigator from './src/navigation/RootNavigator.tsx';

enableScreens(true);

function App() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    // Escuchar cambios de sesión
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (currentUser) {
        console.log('Usuario logueado:', currentUser.email);
      } else {
        console.log('No hay usuario logueado');
      }
    });

    //Verificar token de notificaciones (FCM)
    messaging()
      .getToken()
      .then(token => {
        console.log('Token FCM:', token);
      });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
        <RootNavigator user={user} />
    </NavigationContainer>
  );
}

export default App;
