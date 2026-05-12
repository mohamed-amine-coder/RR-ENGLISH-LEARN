import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribeAuth;
    let unsubscribeFirestore;

    // Listen to auth state changes
    unsubscribeAuth = onAuthStateChanged(auth, async (authUser) => {
      try {
        if (authUser) {
          setUser(authUser);
          
          // Set up real-time listener for Firestore user data
          const userDocRef = doc(db, "users", authUser.uid);
          unsubscribeFirestore = onSnapshot(
            userDocRef,
            (docSnap) => {
              if (docSnap.exists()) {
                setUserData(docSnap.data());
              } else {
                setUserData(null);
              }
              setLoading(false);
            },
            (err) => {
              console.error("Error fetching user data:", err);
              setError(err.message);
              setLoading(false);
            }
          );
        } else {
          // User logged out
          setUser(null);
          setUserData(null);
          setLoading(false);
          if (unsubscribeFirestore) {
            unsubscribeFirestore();
          }
        }
      } catch (err) {
        console.error("Auth error:", err);
        setError(err.message);
        setLoading(false);
      }
    });

    // Cleanup subscriptions
    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  const value = {
    user, // Firebase auth user
    userData, // User data from Firestore
    loading,
    error,
    isAuthenticated: !!user,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
