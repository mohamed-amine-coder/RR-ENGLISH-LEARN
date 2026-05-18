// src/components/Navbar/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../Auth/useUser"; // الـ Hook اللي كيجيب لينا حالة المستخدم
import Login from "./Login"; // المكون ديال تسجيل الدخول
import { 
  FaShieldAlt, FaBars, FaUser, FaTimes, FaRobot,
  FaHome, FaBookOpen, FaBrain, FaMicrophoneAlt 
} from "react-icons/fa";
import Logo from "../../../public/RR-LOGO.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  // جلب البيانات من الـ Context
  const { userData, loading, isAuthenticated } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  // سد المينيو أوتوماتيكياً فاش تبدل الصفحة
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // حبس السكرول ديال الصفحة فاش يكون المينيو مفتوح
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  // 1. حالة التحميل: فاش يلاه كيتحل السيت وكنتسناو Firebase يجاوبنا
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
        {/* اللوغو ديما باين سواء مسجل ولا لا */}
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

        {/* --- الجزء الجديد --- */}
        {/* 2. إيلا كان المستخدم مازال مادار Login (غير مسجل) */}
        {!isAuthenticated && (
          <div className={styles.authSection}>
            <Login />
          </div>
        )}

        {/* 3. إيلا كان المستخدم مسجل دخول (Authenticated) */}
        {isAuthenticated && userData && (
          <>
            {/* زر القائمة (Toggle) كيبان غير للمسجلين */}
            <button 
              className={styles.menuToggle} 
              aria-label={menuOpen ? "Close Menu" : "Open Menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* الغطاء الخلفي (Overlay) */}
            <div 
              className={`${styles.navOverlay} ${menuOpen ? styles.show : ""}`} 
              onClick={closeMenu}
            />

            {/* الروابط الخاصة بالمنصة */}
            <div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
              <Link to="/" onClick={closeMenu}>
                <FaHome size={16} /> Home
              </Link>
              <Link to="/lessons/learn" onClick={closeMenu}>
                <FaBookOpen size={16} /> Learn
              </Link>
              <Link to="/lessons/practice" onClick={closeMenu}>
                <FaBrain size={16} /> Practice
              </Link>
              <Link to="/speak-with-me" onClick={closeMenu}>
                <FaMicrophoneAlt size={16} /> Speak
              </Link>
              <Link to="/speak-with-ai" onClick={closeMenu}>
                <FaRobot size={16} /> AI-Chat
              </Link>
              
              {/* رابط البروفايل بسمية المستخدم */}
              <Link to="/profile" className={styles.profileLink} onClick={closeMenu}>
                <FaUser size={16} />
                <span>{userData.name || "Profile"}</span>
              </Link>

              {/* إيلا كان المستخدم Admin كيبان ليه هاد الزر */}
              {userData.role === "admin" && (
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