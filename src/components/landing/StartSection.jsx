import React from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaBrain, FaArrowLeft } from "react-icons/fa";
import styles from "./StartSection.module.css";

export default function StartSection() {
  return (
    <section className={styles.container}>
      
      {/* الترويسة الترحيبة */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          مرحباً بيك يا بطل! <span className={styles.wave}>👋</span>
        </h1>
        <p className={styles.subtitle}>
          تهنى من عقدة "لونجلي". حنا هنا باش نعاونوك تفهم، تحفظ، وتدوي بطلاقة.
          <br />
          <strong>شنو بان ليك نبداو اليوم؟</strong>
        </p>
      </div>

      {/* شبكة الاختيارات */}
      <div className={styles.grid}>
        
        {/* بطاقة التعلم */}
        <Link to="/lessons/learn" className={styles.card}>
          <div className={styles.iconWrapper} style={{background: 'rgba(0, 119, 255, 0.1)', color: 'var(--primary-color)'}}>
            <FaBookOpen size={28} />
          </div>
          <div className={styles.cardContent}>
            <h3>دروس وكلمات (Learn)</h3>
            <p>تعلم مفردات جديدة، جمل متداولة، ونطق صحيح مع الشرح بالدارجة.</p>
          </div>
          <div className={styles.arrowIcon}>
            <FaArrowLeft />
          </div>
        </Link>

        {/* بطاقة التمارين */}
        <Link to="/lessons/practice" className={styles.card}>
          <div className={styles.iconWrapper} style={{background: 'rgba(255, 123, 0, 0.1)', color: 'var(--secondary-color)'}}>
            <FaBrain size={28} />
          </div>
          <div className={styles.cardContent}>
            <h3>تمارين وتحديات (Practice)</h3>
            <p>اختبر راسك فكويزات، تمارين كتابية، وألعاب ذكية باش ترسخ المعلومة.</p>
          </div>
          <div className={styles.arrowIcon}>
            <FaArrowLeft />
          </div>
        </Link>

      </div>
    </section>
  );
}