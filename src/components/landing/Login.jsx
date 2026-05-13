// src/components/Login/Login.jsx
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../../Auth/authService";
import { useUser } from "../../Auth/useUser"; 
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useUser(); 

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/start");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/start");
    } catch (error) {
      console.error("❌ خطأ في الدخول:", error);
    }
  };

  if (loading) return <div className={styles.spinnerSmall}></div>;

  if (isAuthenticated) return null;

  return (
    <button className={styles.googleBtn} onClick={handleLogin}>
      <FcGoogle className={styles.icon} />
      <span>سجل دخولك مجانا</span>
    </button>
  );
};

export default Login;