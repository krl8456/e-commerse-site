import React, { useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
interface contextValue {
  currentUser?: string;
  signup(email: string, password: string): any;
  login(email: string, password: string): any;
  logout(): any;
}

const AuthContext = React.createContext<contextValue | any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth);
  }



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
    logout
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
