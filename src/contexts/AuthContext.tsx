import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
  Auth,
  UserCredential
} from "firebase/auth";
import { auth } from "../firebase";
interface contextValue {
  currentUser?: User;
  signup(
    email: string,
    password: string
  ): (auth: Auth, email: string, password: string) => Promise<UserCredential>;
  login(
    email: string,
    password: string
  ): (auth: Auth, email: string, password: string) => Promise<UserCredential>;
  logout(): () => Promise<void>;
}

const AuthContext = React.createContext<contextValue | any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateEmail = (email: string) => {
    return currentUser?.updateEmail(email);
  };

  const updatePassword = (password: string) => {
    return currentUser?.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
