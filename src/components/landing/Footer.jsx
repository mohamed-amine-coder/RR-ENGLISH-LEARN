
import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaEnvelope, FaInstagram, FaCode, FaLaptopCode } from "react-icons/fa"; // أيقونات جديدة
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Auth/firebaseConfig";
import LogoutButton from "./LogoutButton";
import styles from "./Footer.module.css";

export default function Footer() {
  const [user, setUser] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <footer className={styles.footer}>
      
      {/* 1. قسم التواصل الاجتماعي والاتصال */}
      <div className={styles.topSection}>
        <h3 className={styles.brandTitle}>RR ENGLISH</h3>
        
        {user && (
          <div className={styles.logoutArea}>
            <LogoutButton />
          </div>
        )}

        <div className={styles.socialIcons}>
          <a href="mailto:rrenglish66@gmail.com" title="Email Support">
            <FaEnvelope size={20} />
          </a>
          <a href="https://wa.me/+212718090887" target="_blank" rel="noopener noreferrer" title="WhatsApp Support">
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>

      {/* 2. الروابط القانونية */}
      {/* <div className={styles.linksSection}>
        <a className={styles.footerLink}>سياسة الخصوصية</a>
        <span className={styles.dot}>•</span>
        <a className={styles.footerLink}>شروط الاستخدام</a>
      </div> */}

      {/* 3. 🆕 قسم المطورين (Team Credits) */}
      <div className={styles.devSection}>
        <p className={styles.devLabel}>Technical Team & Development:</p>
        <div className={styles.devsList}>
          
          {/* البروفايل ديالك (Lead Dev) */}
          {/* <a href="https://www.instagram.com/rr_coder/" target="_blank" rel="noreferrer" className={styles.devTag}>
            <FaInstagram className={styles.devIcon} /> 
            <span><strong>[the coder]</strong> (Lead Dev)</span>
          </a> */}

          {/* عنصر إضافي باش تبان "فرقة" */}
          <div className={styles.devTag} style={{cursor: 'default', opacity: 0.8}}>
            <FaLaptopCode className={styles.devIcon} /> 
            <span>RR Studio</span>
          </div>

        </div>
      </div>

      {/* 4. حقوق النشر */}
      <div className={styles.copyright}>
        <p>© {currentYear} RR ENGLISH. All rights reserved.</p>
      </div>
    </footer>
  );
}