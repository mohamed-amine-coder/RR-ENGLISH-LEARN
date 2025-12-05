import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../../Auth/authService";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("✅ تسجيل الدخول ناجح:", user);

      // توجه المستخدم مباشرة للـ StartSection
      navigate("/start");
    } catch (error) {
      console.error(error);
      // alert("فشل تسجيل الدخول!");
    }
  };



  return (
      <button className={styles.googleBtn} onClick={handleLogin}>
        <FcGoogle className={styles.icon} />
        <span>سجل دخولك مجانا</span>
      </button>
  );
};

export default Login;
