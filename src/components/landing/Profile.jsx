// src/components/landing/Profile.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Auth/firebaseConfig"; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { 
  FaUserCircle, FaCrown, FaEnvelope, FaCalendarAlt, 
  FaPhone, FaPen, FaSave, FaFire, FaStar, FaChevronLeft
} from "react-icons/fa";
import styles from "./Profile.module.css";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ displayName: "", phoneNumber: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            let endDate = data.subscriptionEndDate?.toDate ? data.subscriptionEndDate.toDate() : new Date(data.subscriptionEndDate);
            
            const profileData = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: data.name || currentUser.displayName || "مستخدم",
              phoneNumber: data.phoneNumber || "",
              role: data.role || 'free',
              planType: data.planType || 'none',
              createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString('ar-MA') : '---',
              subscriptionEndDate: endDate,
              lastLessonLearn: data.lastLessonLearn || 0,
              lastLessonPractice: data.lastLessonPractice || 0,
              streak: data.streak || 1, 
              xp: data.xp || 0,
            };
            setUserData(profileData);
            setEditForm({ displayName: profileData.displayName, phoneNumber: profileData.phoneNumber });
          }
        } catch (error) { console.error("Error:", error); }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "users", userData.uid), {
        name: editForm.displayName,
        phoneNumber: editForm.phoneNumber
      });
      setUserData({ ...userData, ...editForm });
      setIsEditing(false);
    } catch (error) { alert("Error updating profile"); }
  };

  if (loading) return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );

  const daysLeft = userData?.subscriptionEndDate ? Math.ceil((new Date(userData.subscriptionEndDate) - new Date()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.dashboardContainer}>
        
        {/* Left Side: Avatar & Main Stats */}
        <div className={styles.sidebar}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <FaUserCircle className={styles.avatarIcon} />
              <button className={styles.editIconButton} onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
                {isEditing ? <FaSave /> : <FaPen />}
              </button>
            </div>
            {isEditing ? (
              <input 
                className={styles.nameInput}
                value={editForm.displayName}
                onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
              />
            ) : (
              <h2 className={styles.userName}>{userData.displayName}</h2>
            )}
            <span className={styles.userEmail}>{userData.email}</span>
          </div>

          <div className={styles.statsVertical}>
             <div className={styles.statPill} data-type="streak">
                <FaFire /> <span>{userData.streak} أيام متتالية</span>
             </div>
             <div className={styles.statPill} data-type="xp">
                <FaStar /> <span>{userData.xp} نقطة (XP)</span>
             </div>
          </div>
        </div>

        {/* Right Side: Details & Progress */}
        <div className={styles.contentArea}>
          
          {/* Subscription Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>حالة الاشتراك</h3>
              <span className={styles.badge} data-premium={userData.role === 'premium'}>
                {userData.role === 'premium' ? <><FaCrown /> Premium</> : "Free Plan"}
              </span>
            </div>
            {userData.role === 'premium' ? (
              <div className={styles.subDetail}>
                <p>باقة <strong>{userData.planType}</strong> تنتهي بعد <strong>{daysLeft} يوم</strong></p>
                <div className={styles.progressBar}><div style={{width: `${(daysLeft/30)*100}%`}}></div></div>
              </div>
            ) : (
              <button className={styles.upgradeBtn}>ترقية الحساب الآن <FaChevronLeft /></button>
            )}
          </div>

          {/* Progress Grid */}
          <div className={styles.grid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>دروس Learn</span>
              <span className={styles.statValue}>{userData.lastLessonLearn}</span>
              <div className={styles.miniBar}><div style={{width: `${(userData.lastLessonLearn/20)*100}%`, background: '#2563eb'}}></div></div>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>تمارين Practice</span>
              <span className={styles.statValue}>{userData.lastLessonPractice}</span>
              <div className={styles.miniBar}><div style={{width: `${(userData.lastLessonPractice/20)*100}%`, background: '#10b981'}}></div></div>
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.card}>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <FaPhone />
                {isEditing ? (
                  <input value={editForm.phoneNumber} onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})} />
                ) : (
                  <span>{userData.phoneNumber || "أضف رقم هاتفك"}</span>
                )}
              </div>
              <div className={styles.infoItem}>
                <FaCalendarAlt />
                <span>عضو منذ: {userData.createdAt}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}