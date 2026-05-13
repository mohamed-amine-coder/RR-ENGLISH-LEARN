
// src/components/Navbar/LogoutButton.jsx
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../../Auth/firebaseConfig";
import { useUser } from "../../Auth/useUser"; // 👈 استيراد الروبيني
import { useNavigate } from "react-router-dom";
import styles from "./LogoutButton.module.css";

export default function LogoutButton() {
  const { isAuthenticated } = useUser(); // 👈 كنشوفو واش المستخدم داخل
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setConfirming(false);
      // فاش كدير signOut، الروبيني (useUser) غيحس بها فالبلاصة 
      // وغيمسح userData ويوقف الـ Listener ديال Firestore تلقائياً
      await signOut(auth);
      
      // نصيحة: فـ "Vibe coding" حاول تبعد على alert بزاف واستعمل Toast إلا قدرتي
      navigate("/");
    } catch (error) {
      console.error("❌ فشل تسجيل الخروج:", error);
      alert("حدث خطأ أثناء تسجيل الخروج!");
    }
  };

  // إلا ما كانش المستخدم مسجل، ما كاين لاش نبينو الزر أصلاً
  if (!isAuthenticated) return null;

  return (
    <div className={styles.wrapper}>
      {!confirming ? (
        <button
          className={styles.logoutBtn}
          onClick={() => setConfirming(true)}
          aria-label="تسجيل الخروج"
        >
          <FiLogOut size={18} />
          <span>تسجيل الخروج</span>
        </button>
      ) : (
        <div className={styles.confirmBox}>
          <p>واش متأكد بغيتي تخرج؟</p>
          <div className={styles.actions}>
            <button className={styles.yesBtn} onClick={handleLogout}>
              نعم
            </button>
            <button
              className={styles.noBtn}
              onClick={() => setConfirming(false)}
            >
              لا
            </button>
          </div>
        </div>
      )}
    </div>
  );
}