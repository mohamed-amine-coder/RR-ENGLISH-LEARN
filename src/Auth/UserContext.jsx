import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        // الربط المباشر مع الوثيقة اللي شفت في الصورة
        const userRef = doc(db, "users", user.uid);
        
        const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              uid: user.uid,
              email: user.email,
              name: data.name || "مستخدم جديد", // استعملنا name كيف كاين فFirestore
              role: data.role || "free",
              phoneNumber: data.phoneNumber || "",
              lastLessonLearn: data.lastLessonLearn || 0,
              lastLessonPractice: data.lastLessonPractice || 0,
              createdAt: data.createdAt || "",
              // حقول احتياطية إلا بغيتي تزيدهم من بعد
              xp: data.xp || 0,
              streak: data.streak || 0,
              subscriptionEndDate: data.subscriptionEndDate || null
            });
          }
          setLoading(false);
        }, (error) => {
          console.error("Firestore Snapshot Error:", error);
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        setIsAuthenticated(false);
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);