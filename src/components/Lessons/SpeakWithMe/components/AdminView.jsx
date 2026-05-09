import React from 'react';
import { FaCog, FaUsers } from 'react-icons/fa';
import styles from '../speakWithMeTwStyles';

function AdminView() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.adminStatsBar}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>المستخدمين</span>
          <span className={styles.statNumber}>124</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>المدخول (تقديري)</span>
          <span className={styles.statNumber} style={{ color: '#29b864' }}>
            30,450 DH
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>المجموعات النشطة</span>
          <span className={styles.statNumber} style={{ color: '#0077ff' }}>
            5
          </span>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaCog className={styles.cardIcon} />
            <h3>إدارة سريعة</h3>
          </div>
          <div className={styles.adminLinks}>
            <button className={styles.adminActionBtn}>إدارة المستخدمين</button>
            <button className={styles.adminActionBtn}>جدول الحصص</button>
            <button className={styles.adminActionBtn}>التقارير المالية</button>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaUsers className={styles.cardIcon} />
            <h3>حالة المجموعات</h3>
          </div>
          <ul className={styles.groupsList}>
            <li>
              <span>G1 - Beginner</span> <span className={styles.statusDot} style={{ background: 'green' }} />
            </li>
            <li>
              <span>G2 - Intermediate</span>{' '}
              <span className={styles.statusDot} style={{ background: 'green' }} />
            </li>
            <li>
              <span>G3 - Turbo</span> <span className={styles.statusDot} style={{ background: 'orange' }} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminView;
