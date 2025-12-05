
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Auth/firebaseConfig"; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; // زدت updateDoc
import { onAuthStateChanged } from "firebase/auth";
import { 
  FaUserCircle, FaCrown, FaBookOpen, FaTasks, FaEnvelope, 
  FaCalendarAlt, FaPhone, FaPen, FaSave, FaFire, FaMedal 
} from "react-icons/fa";
import styles from "./Profile.module.css";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 🆕 State لوضع التعديل
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
            
            // تحويل التاريخ
            let endDate = null;
            if (data.subscriptionEndDate) {
               const dateObj = data.subscriptionEndDate.toDate ? data.subscriptionEndDate.toDate() : new Date(data.subscriptionEndDate);
               endDate = dateObj;
            }

            const profileData = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: data.name || currentUser.displayName || "مستخدم",
              phoneNumber: data.phoneNumber || "",
              role: data.role || 'free',
              planType: data.planType || 'none',
              whatsappGroup: data.whatsappGroup || '-',
              createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString('ar-MA') : 'غير معروف',
              subscriptionEndDate: endDate,
              lastLessonLearn: data.lastLessonLearn || 0,
              lastLessonPractice: data.lastLessonPractice || 0,
              streak: data.streak || 1, // 🆕 عداد الأيام (افتراضي 1)
            };

            setUserData(profileData);
            setEditForm({ displayName: profileData.displayName, phoneNumber: profileData.phoneNumber }); // ملء الفورم
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🆕 دالة حفظ التعديلات
  const handleSave = async () => {
    if (!userData) return;
    try {
      const docRef = doc(db, "users", userData.uid);
      await updateDoc(docRef, {
        name: editForm.displayName,
        phoneNumber: editForm.phoneNumber
      });
      
      setUserData({ ...userData, displayName: editForm.displayName, phoneNumber: editForm.phoneNumber });
      setIsEditing(false);
      alert("تم تحديث المعلومات بنجاح ✅");
    } catch (error) {
      alert("حدث خطأ أثناء الحفظ ❌");
      console.error("Error updating profile:", error);
    }
  };

  const getDaysLeft = (date) => {
    if (!date) return 0;
    const diff = new Date(date) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) return <div className={styles.loading}>جارٍ تحميل بياناتك...</div>;
  if (!userData) return <div className={styles.error}>يرجى تسجيل الدخول.</div>;

  const roleInfo = userData.role === 'premium' 
    ? { text: "Premium", color: "#b45309", bg: "#fffbeb", icon: <FaCrown /> }
    : { text: "Free", color: "#495057", bg: "#e9ecef", icon: <FaUserCircle /> };

  const daysLeft = getDaysLeft(userData.subscriptionEndDate);

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        
        {/* Header & Avatar */}
        <div className={styles.header}>
          <div className={styles.avatar}>
            <FaUserCircle size={80} color="var(--primary-color)" />
            {/* 🆕 زر التعديل */}
            <button className={styles.editBtn} onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
              {isEditing ? <FaSave /> : <FaPen />}
            </button>
          </div>
          
          {isEditing ? (
            <input 
              type="text" 
              className={styles.editInput} 
              value={editForm.displayName}
              onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
            />
          ) : (
            <h2 className={styles.name}>{userData.displayName}</h2>
          )}

          <div className={styles.roleBadge} style={{ color: roleInfo.color, backgroundColor: roleInfo.bg }}>
            {roleInfo.icon} <span>{roleInfo.text}</span>
          </div>
        </div>

        {/* 🆕 Gamification Bar (التحفيز) */}
        {/* <div className={styles.gamificationBar}>
           <div className={styles.streakBadge}>
             <FaFire color="#ff7b00" /> {userData.streak} أيام متتالية
           </div>
           <div className={styles.levelBadge}>
             <FaMedal color="#FFD700" /> المستوى 1
           </div>
        </div> */}

        {/* Subscription Info */}
        {userData.role === 'premium' && (
          <div className={styles.subscriptionBox}>
            <h3 className={styles.subTitle}>اشتراكك الحالي</h3>
            <div className={styles.subGrid}>
              <div className={styles.subItem}>
                <span className={styles.subLabel}>الباقة</span>
                <span className={styles.subValue}>{userData.planType}</span>
              </div>
              <div className={styles.subItem}>
                <span className={styles.subLabel}>الأيام المتبقية</span>
                <span className={styles.subValue} style={{color: daysLeft < 5 ? 'red' : 'green'}}>
                  {daysLeft > 0 ? `${daysLeft} يوم` : 'منتهي'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Personal Info */}
        <div className={styles.infoSection}>
          <div className={styles.infoRow}>
            <FaEnvelope className={styles.icon} />
            <span>{userData.email}</span>
          </div>
          <div className={styles.infoRow}>
            <FaPhone className={styles.icon} />
            {isEditing ? (
              <input 
                type="text" 
                className={styles.editInputSmall} 
                value={editForm.phoneNumber}
                placeholder="رقم الهاتف"
                onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})}
              />
            ) : (
              <span>{userData.phoneNumber || "لم يحدد"}</span>
            )}
          </div>
          <div className={styles.infoRow}>
            <FaCalendarAlt className={styles.icon} />
            <span>انضممت: {userData.createdAt}</span>
          </div>
        </div>

        {/* Progress Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <div className={styles.statIcon} style={{background: '#e3f2fd', color: '#1976d2'}}>
              <FaBookOpen size={24} />
            </div>
            <div className={styles.statInfo}>
              <h4>دروس (Learn)</h4>
              <p>واصل للدرس: <strong>{userData.lastLessonLearn || 0}</strong></p>
            </div>
          </div>

          <div className={styles.statBox}>
            <div className={styles.statIcon} style={{background: '#e8f5e9', color: '#388e3c'}}>
              <FaTasks size={24} />
            </div>
            <div className={styles.statInfo}>
              <h4>تمارين (Practice)</h4>
              <p>واصل للمستوى: <strong>{userData.lastLessonPractice || 0}</strong></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}