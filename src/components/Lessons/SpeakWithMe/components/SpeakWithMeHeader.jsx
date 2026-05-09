import React from 'react';
import styles from '../speakWithMeTwStyles';

function SpeakWithMeHeader({ role }) {
  const subtitle =
    role === 'free'
      ? 'المكان فين لسانك كيتطلق، والخوف كيختفي.'
      : 'فضاء التدريب المباشر والمواكبة.';

  return (
    <div className={styles.headerSection}>
      {role === 'premium' && <div className={styles.badge}>💎 عضوية مميزة</div>}
      {role === 'admin' && <div className={styles.badgeAdmin}>🔒 Admin Zone</div>}

      <h1 className={styles.mainTitle}>
        Speak With Me <span style={{ fontSize: '1.5rem' }}>🎙️</span>
      </h1>
      <p className={styles.subTitle}>{subtitle}</p>
    </div>
  );
}

export default SpeakWithMeHeader;
