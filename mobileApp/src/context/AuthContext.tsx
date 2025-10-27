import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AppUser =
  | (FirebaseAuthTypes.User & { role?: 'client' | 'worker' | 'admin' })
  | { role: 'guest' }
  | null;

type AuthContextType = {
  user: AppUser;
  setUser: (user: AppUser) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser>(null);

  // 🔹 Sincroniza automáticamente el usuario de Firebase con el contexto
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // rol se agrega luego en el flujo de registro
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const signOut = async () => {
    if (user && user.role === 'guest') {
      setUser(null);
    } else {
      await auth().signOut();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export function useLoggedUser(): FirebaseAuthTypes.User & { role?: "client" | "worker" | "admin" } {
  const { user } = useAuth();
  if (!user || !('uid' in user)) {
    throw new Error("User is not logged in");
  }
  return user;
}
