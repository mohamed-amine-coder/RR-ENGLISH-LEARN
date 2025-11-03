import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../Auth/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import { signInWithGoogle } from "../../Auth/authService";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // جلب الدور من Firestore مباشرة
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setRole(docSnap.data().role);
        else setRole(null);
      } else {
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginDirect = async () => {
    try {
      const loggedUser = await signInWithGoogle();
      console.log("✅ تسجيل الدخول ناجح:", loggedUser);
      alert("تم تسجيل الدخول بنجاح!");
      navigate("/start"); // الصفحة اللي بغيت بعد الدخول
    } catch (error) {
      console.error("فشل تسجيل الدخول:", error);
      alert("فشل تسجيل الدخول!");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("✅ تم تسجيل الخروج!");
      navigate("/");
    } catch (error) {
      console.error("فشل تسجيل الخروج:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <h1>RR-English</h1>

      {user ? (
        <div className={styles["nav-links"]}>
          <Link to="/">Home</Link>
          <Link to="/lessons/learn">Learn</Link>
          <Link to="/lessons/practice">Practice</Link>

          {role === "admin" && (
            <Link to="/admin">
              <button className={styles.adminBtn}><FaShieldAlt size={20}/></button>
            </Link>
          )}

          <button className={styles.logoutBtn} onClick={handleLogout}>
            <FiLogOut />
          </button>
        </div>
      ) : (
        <button className={styles.loginBtn} onClick={handleLoginDirect}>
          <FcGoogle className={styles.icon} />
          <span>سجل دخولك وابدأ الدروس</span>
        </button>
      )}
    </nav>
  );
}
