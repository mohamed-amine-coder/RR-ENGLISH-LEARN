// src/components/SpeakWithAI/SpeakWithAI.jsx
import React, { useState } from 'react';
import { useUser } from '../../../Auth/useUser'; // 👈 استيراد الروبيني المركزي
import { SCENARIOS } from './scenariosData';

import Sidebar from './components/Sidebar';
import FreeTeaser from './components/FreeTeaser';
import PremiumChat from './components/PremiumChat';

import styles from './SpeakWithAI.module.css';

export default function SpeakWithAI() {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  
  // 1. جلب البيانات من Context (عوض Firebase مباشرة)
  const { userData, loading, isAuthenticated } = useUser();

  // 2. حالة التحميل المركزية
  if (loading) return (
    <div className={styles.loadingScreen}>
      <div className={styles.loaderBox}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );

  // 3. تحديد الرتبة (إلى ما كانش مسجل كاع، كيتعتبر free أوتوماتيكياً)
  const userRole = userData?.role || 'free';

  // 4. حماية إضافية (اختيارية): إلى بغيتي تمنع شي حد ما مسجلش من الدخول لهاد الصفحة نهائياً
  if (!isAuthenticated) {
    return (
      <div className={styles.loadingScreen}>
        <h2>المرجو تسجيل الدخول لاكتشاف هذه الميزة</h2>
      </div>
    );
  }

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