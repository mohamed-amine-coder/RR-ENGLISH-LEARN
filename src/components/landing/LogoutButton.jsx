import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../../Auth/firebaseConfig";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutButton.module.css";

export default function LogoutButton() {
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // نخفي نافذة التأكيد قبل الخروج
      setConfirming(false);
      await signOut(auth);
      alert("✅ تم تسجيل الخروج بنجاح!");
      navigate("/");
    } catch (error) {
      console.error("❌ فشل تسجيل الخروج:", error);
      alert("حدث خطأ أثناء تسجيل الخروج!");
    }
  };

  return (
    <div className={styles.wrapper}>
      {!confirming ? (
        <button
          className={styles.logoutBtn}
          onClick={() => setConfirming(true)}
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
