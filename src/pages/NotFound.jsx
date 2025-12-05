import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCompass } from 'react-icons/fa';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <div className={styles.iconWrapper}>
          <FaCompass size={50} />
        </div>
        
        <h1 className={styles.title}>أوووبس! فين غادي؟ 😅</h1>
        
        <p className={styles.message}>
          هاد الصفحة اللي كتقلب عليها ماكيناش، أو يمكن تمسحات.
          <br />
          ما تخافش، الطريق باينة من هنا.
        </p>

        <Link to="/" className={styles.homeButton}>
          <FaHome />
          رجع للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;