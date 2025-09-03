import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = { uid: string; email?: string | null } | null;

type AuthContextType = {
  user: User;
  signIn: (dummy?: boolean) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({ user: null, signIn: () => {}, signOut: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const signIn = () => setUser({ uid: 'demo', email: 'demo@chamba.app' });
  const signOut = () => setUser(null);

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
