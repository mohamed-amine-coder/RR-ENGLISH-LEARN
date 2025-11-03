// src/routes/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../Auth/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function AdminRoute({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      const user = auth.currentUser;
      if (!user) {
        setRole("none");
        setLoading(false);
        return;
      }
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setRole(docSnap.data().role);
      else setRole("none");
      setLoading(false);
    };
    checkRole();
  }, []);

  if (loading) return <p>جاري التحقق...</p>;
  if (role !== "admin") return <Navigate to="/start" />;

  return children;
}
