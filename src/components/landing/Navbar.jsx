import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, db } from "../../Auth/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { 
  FaShieldAlt, FaBars, FaUser, FaTimes, 
  FaHome, FaBookOpen, FaDumbbell, FaMicrophoneAlt // 🆕 الأيقونات الجديدة
} from "react-icons/fa";
import Logo from "../../../public/RR-LOGO.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false); // دالة مساعدة

  // 1. إغلاق القائمة أوتوماتيكياً عند الانتقال
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // 2. منع السكرول (Scroll) في الخلفية
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  // 3. جلب بيانات المستخدم والدور
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          setRole(docSnap.exists() ? docSnap.data().role : null);
        } catch (error) {
          console.error("خطأ في جلب الدور:", error);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <h2>مرحباً بك في RR-ENGLISH 👋</h2>
        <p>أول منصة رقمية لتعلم الانجليزية بالداريجة من الصفر</p>
        <p>جاري تجهيز الدروس...</p>
      </div>
    );
  }

  return (
    <>
      <nav className={styles.navbar} aria-label="Main Navigation">
        <div className={styles.logo}>
          <img 
            src={Logo} 
            alt="RR-English Logo" 
            className={styles.logoImg} 
          />
          <div className={styles.logoText}>
            <span className={styles.brandName}>RR-ENGLISH</span>
            <span className={styles.tagline}>المعلومة بلغتنا</span>
          </div>
        </div>

        {user && (
          <>
            {/* زر القائمة (همبرغر/إغلاق) */}
            <button 
              className={styles.menuToggle} 
              aria-label={menuOpen ? "Close Menu" : "Open Menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* الخلفية المعتمة (Overlay) */}
            <div 
              className={`${styles.navOverlay} ${menuOpen ? styles.show : ""}`} 
              onClick={closeMenu}
            />

            <div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
              {/* 🆕 الروابط الإنجليزية مع الأيقونات */}
              <Link to="/" onClick={closeMenu}>
                <FaHome size={16} /> Home
              </Link>
              <Link to="/lessons/learn" onClick={closeMenu}>
                <FaBookOpen size={16} /> Learn
              </Link>
              <Link to="/lessons/practice" onClick={closeMenu}>
                <FaDumbbell size={16} /> Practice
              </Link>
              <Link to="/speak-with-me" onClick={closeMenu}>
                <FaMicrophoneAlt size={16} /> Speak
              </Link>
              
              {/* زر البروفايل */}
              <Link to="/profile" className={styles.profileLink} onClick={closeMenu}>
                <FaUser size={16} />
                <span>Profile</span>
              </Link>

              {role === "admin" && (
                <Link to="/admin" className={styles.adminWrapper} onClick={closeMenu}>
                  <button className={styles.adminBtn} aria-label="Admin Panel">
                    <FaShieldAlt size={18} />
                    Admin
                  </button>
                </Link>
              )}
            </div>
          </>
        )}
      </nav>
    </>
  );
}