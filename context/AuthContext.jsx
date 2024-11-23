"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";
const auth = getAuth(firebase_app);
const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);
export const signOut = () => {
  return auth.signOut();
};
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="flex flex-col items-center py-10 font-bold text-5xl">
          Loading . . .
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
