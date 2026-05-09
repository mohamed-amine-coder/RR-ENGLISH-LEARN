import React from 'react';
import { FaCrown, FaUsers } from 'react-icons/fa';
import styles from '../AdminPanel.module.css';

function StatsBar({ stats }) {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.statCard}>
        <div className={styles.iconBox}>
          <FaUsers />
        </div>
        <div>
          <h3>{stats.total}</h3>
          <p>المسجلين</p>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.iconBox} style={{ background: '#e6f8ec', color: '#25D366' }}>
          <FaCrown />
        </div>
        <div>
          <h3>{stats.premium}</h3>
          <p>النشطين</p>
        </div>
      </div>
      <div className={styles.plansCard}>
        <span>
          Start: <strong>{stats.plans.start}</strong>
        </span>
        <span>
          Pro: <strong>{stats.plans.pro}</strong>
        </span>
        <span>
          Turbo: <strong>{stats.plans.turbo}</strong>
        </span>
      </div>
    </div>
  );
}

export default StatsBar;
