import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../Auth/firebaseConfig';
import { SCENARIOS } from './scenariosData';

import Sidebar from './components/Sidebar';
import FreeTeaser from './components/FreeTeaser';
import PremiumChat from './components/PremiumChat';

import styles from './SpeakWithAI.module.css';

export default function SpeakWithAI() {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [userRole, setUserRole] = useState(null); // 'free', 'premium', 'admin'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setUserRole(userDoc.exists() ? userDoc.data().role : 'free');
      } else {
        setUserRole('free');
      }
      setLoading(false);
    };
    fetchUserRole();
  }, []);

  if (loading) return <div className={styles.loadingScreen}>جاري التحميل...</div>;

  return (
    <div className={styles.layoutContainer} dir="rtl">
      
      {/* القائمة الجانبية لتغيير الشخصيات */}
      <Sidebar 
        scenarios={SCENARIOS} 
        selectedScenario={selectedScenario} 
        onSelectScenario={setSelectedScenario} 
      />
      
      {/* عرض الشاشة بناءً على رتبة المستخدم */}
      <div className={styles.mainContent}>
        {userRole === 'free' ? (
          <FreeTeaser selectedScenario={selectedScenario} />
        ) : (
          <PremiumChat selectedScenario={selectedScenario} />
        )}
      </div>

    </div>
  );
}