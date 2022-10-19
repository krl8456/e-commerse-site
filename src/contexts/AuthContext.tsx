import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
interface contextValue {
  currentUser?: string;
  signup(email: string, password: string): any;
}

const AuthContext = React.createContext<contextValue | any>(null);




export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
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
    login
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
