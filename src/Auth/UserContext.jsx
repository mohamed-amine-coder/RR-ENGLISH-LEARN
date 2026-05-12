// import React, { createContext, useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc, onSnapshot } from "firebase/firestore";
// import { auth, db } from "./firebaseConfig";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let unsubscribeAuth;
//     let unsubscribeFirestore;

//     // Listen to auth state changes
//     unsubscribeAuth = onAuthStateChanged(auth, async (authUser) => {
//       try {
//         if (authUser) {
//           setUser(authUser);
          
//           // Set up real-time listener for Firestore user data
//           const userDocRef = doc(db, "users", authUser.uid);
//           unsubscribeFirestore = onSnapshot(
//             userDocRef,
//             (docSnap) => {
//               if (docSnap.exists()) {
//                 setUserData(docSnap.data());
//               } else {
//                 setUserData(null);
//               }
//               setLoading(false);
//             },
//             (err) => {
//               console.error("Error fetching user data:", err);
//               setError(err.message);
//               setLoading(false);
//             }
//           );
//         } else {
//           // User logged out
//           setUser(null);
//           setUserData(null);
//           setLoading(false);
//           if (unsubscribeFirestore) {
//             unsubscribeFirestore();
//           }
//         }
//       } catch (err) {
//         console.error("Auth error:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     });

//     // Cleanup subscriptions
//     return () => {
//       if (unsubscribeAuth) unsubscribeAuth();
//       if (unsubscribeFirestore) unsubscribeFirestore();
//     };
//   }, []);

//   const value = {
//     user, // Firebase auth user
//     userData, // User data from Firestore
//     loading,
//     error,
//     isAuthenticated: !!user,
//   };

//   return (
//     <UserContext.Provider value={value}>
//       {children}
//     </UserContext.Provider>
//   );
// };

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