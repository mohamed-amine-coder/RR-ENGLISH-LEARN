import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCrown } from 'react-icons/fa';
import styles from '../SpeakWithAI.module.css';

export default function FreeTeaser({ selectedScenario }) {
  const navigate = useNavigate();

  return (
    <div className={styles.teaserArea}>
      {/* عرض السكرين شوت الديناميكية مع تأثير الضباب */}
      {selectedScenario?.screenshot ? (
        <img 
          src={selectedScenario.screenshot} 
          alt={selectedScenario.title} 
          className={styles.teaserImage} 
        />
      ) : (
        <div className={styles.teaserPlaceholder}>صورة توضيحية</div>
      )}

      {/* رسالة القفل فوق الصورة */}
      <div className={styles.teaserOverlay}>
        <FaLock size={50} color="#ffb703" style={{ marginBottom: '15px' }} />
        <h2>تحدث مع {selectedScenario?.title} 👑</h2>
        <p>
          هاد الميزة حصرية للمشتركين. تقدر تهضر بالصوت مع {selectedScenario?.title + " "} 
          و يصحح ليك أخطاءك بالدارجة فالبلاصة!
        </p>
        <button className={styles.upgradeBtn} onClick={() => navigate('/upgrade')}>
          <FaCrown /> اكتشف الباقات دابا
        </button>
      </div>
    </div>
  );
}