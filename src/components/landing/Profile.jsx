// // src/components/landing/Profile.jsx
// import React, { useEffect, useState } from "react";
// import { auth, db } from "../../Auth/firebaseConfig"; 
// import { doc, getDoc, updateDoc } from "firebase/firestore"; 
// import { onAuthStateChanged } from "firebase/auth";
// import { 
//   FaUserCircle, FaCrown, FaEnvelope, FaCalendarAlt, 
//   FaPhone, FaPen, FaSave, FaFire, FaStar, FaChevronLeft
// } from "react-icons/fa";
// import styles from "./Profile.module.css";

// export default function Profile() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({ displayName: "", phoneNumber: "" });

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         try {
//           const docRef = doc(db, "users", currentUser.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             let endDate = data.subscriptionEndDate?.toDate ? data.subscriptionEndDate.toDate() : new Date(data.subscriptionEndDate);
            
//             const profileData = {
//               uid: currentUser.uid,
//               email: currentUser.email,
//               displayName: data.name || currentUser.displayName || "مستخدم",
//               phoneNumber: data.phoneNumber || "",
//               role: data.role || 'free',
//               planType: data.planType || 'none',
//               createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString('ar-MA') : '---',
//               subscriptionEndDate: endDate,
//               lastLessonLearn: data.lastLessonLearn || 0,
//               lastLessonPractice: data.lastLessonPractice || 0,
//               streak: data.streak || 1, 
//               xp: data.xp || 0,
//             };
//             setUserData(profileData);
//             setEditForm({ displayName: profileData.displayName, phoneNumber: profileData.phoneNumber });
//           }
//         } catch (error) { console.error("Error:", error); }
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleSave = async () => {
//     try {
//       await updateDoc(doc(db, "users", userData.uid), {
//         name: editForm.displayName,
//         phoneNumber: editForm.phoneNumber
//       });
//       setUserData({ ...userData, ...editForm });
//       setIsEditing(false);
//     } catch (error) { alert("Error updating profile"); }
//   };

//   if (loading) return (
//     <div className={styles.loaderWrapper}>
//       <div className={styles.spinner}></div>
//     </div>
//   );

//   const daysLeft = userData?.subscriptionEndDate ? Math.ceil((new Date(userData.subscriptionEndDate) - new Date()) / (1000 * 60 * 60 * 24)) : 0;

//   return (
//     <div className={styles.mainWrapper}>
//       <div className={styles.dashboardContainer}>
        
//         {/* Left Side: Avatar & Main Stats */}
//         <div className={styles.sidebar}>
//           <div className={styles.avatarSection}>
//             <div className={styles.avatarWrapper}>
//               <FaUserCircle className={styles.avatarIcon} />
//               <button className={styles.editIconButton} onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
//                 {isEditing ? <FaSave /> : <FaPen />}
//               </button>
//             </div>
//             {isEditing ? (
//               <input 
//                 className={styles.nameInput}
//                 value={editForm.displayName}
//                 onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
//               />
//             ) : (
//               <h2 className={styles.userName}>{userData.displayName}</h2>
//             )}
//             <span className={styles.userEmail}>{userData.email}</span>
//           </div>

//           <div className={styles.statsVertical}>
//              <div className={styles.statPill} data-type="streak">
//                 <FaFire /> <span>{userData.streak} أيام متتالية</span>
//              </div>
//              <div className={styles.statPill} data-type="xp">
//                 <FaStar /> <span>{userData.xp} نقطة (XP)</span>
//              </div>
//           </div>
//         </div>

//         {/* Right Side: Details & Progress */}
//         <div className={styles.contentArea}>
          
//           {/* Subscription Card */}
//           <div className={styles.card}>
//             <div className={styles.cardHeader}>
//               <h3>حالة الاشتراك</h3>
//               <span className={styles.badge} data-premium={userData.role === 'premium'}>
//                 {userData.role === 'premium' ? <><FaCrown /> Premium</> : "Free Plan"}
//               </span>
//             </div>
//             {userData.role === 'premium' ? (
//               <div className={styles.subDetail}>
//                 <p>باقة <strong>{userData.planType}</strong> تنتهي بعد <strong>{daysLeft} يوم</strong></p>
//                 <div className={styles.progressBar}><div style={{width: `${(daysLeft/30)*100}%`}}></div></div>
//               </div>
//             ) : (
//               <button className={styles.upgradeBtn}>ترقية الحساب الآن <FaChevronLeft /></button>
//             )}
//           </div>

//           {/* Progress Grid */}
//           <div className={styles.grid}>
//             <div className={styles.statCard}>
//               <span className={styles.statLabel}>دروس Learn</span>
//               <span className={styles.statValue}>{userData.lastLessonLearn}</span>
//               <div className={styles.miniBar}><div style={{width: `${(userData.lastLessonLearn/20)*100}%`, background: '#2563eb'}}></div></div>
//             </div>
//             <div className={styles.statCard}>
//               <span className={styles.statLabel}>تمارين Practice</span>
//               <span className={styles.statValue}>{userData.lastLessonPractice}</span>
//               <div className={styles.miniBar}><div style={{width: `${(userData.lastLessonPractice/20)*100}%`, background: '#10b981'}}></div></div>
//             </div>
//           </div>

//           {/* Contact Info */}
//           <div className={styles.card}>
//             <div className={styles.infoList}>
//               <div className={styles.infoItem}>
//                 <FaPhone />
//                 {isEditing ? (
//                   <input value={editForm.phoneNumber} onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})} />
//                 ) : (
//                   <span>{userData.phoneNumber || "أضف رقم هاتفك"}</span>
//                 )}
//               </div>
//               <div className={styles.infoItem}>
//                 <FaCalendarAlt />
//                 <span>عضو منذ: {userData.createdAt}</span>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { db } from "../../Auth/firebaseConfig"; 
import { doc, updateDoc } from "firebase/firestore"; 
import { useUser } from "../../Auth/useUser"; 
import { 
  FaUserCircle, FaCrown, FaCalendarAlt, FaWhatsapp,
  FaPhone, FaPen, FaSave, FaFire, FaStar, FaChevronLeft,
  FaVenusMars, FaGraduationCap
} from "react-icons/fa";
import styles from "./Profile.module.css";

export default function Profile() {
  const { userData, loading, isAuthenticated } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  
  // الفورم دابا فيه كاع الحقول اللي قابلة للتعديل
  const [editForm, setEditForm] = useState({ 
    displayName: "", 
    phoneNumber: "",
    gender: "",
    whatsappGroup: ""
  });

  useEffect(() => {
    if (userData) {
      setEditForm({ 
        displayName: userData.name || "", 
        phoneNumber: userData.phoneNumber || "",
        gender: userData.gender || "unknown",
        whatsappGroup: userData.whatsappGroup || ""
      });
    }
  }, [userData]);

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", userData.uid);
      await updateDoc(userRef, {
        name: editForm.displayName,
        phoneNumber: editForm.phoneNumber,
        gender: editForm.gender,
        whatsappGroup: editForm.whatsappGroup
      });
      setIsEditing(false);
    } catch (error) { 
      alert("Error updating profile"); 
    }
  };

  if (loading) return (
    <div className={styles.loaderWrapper}><div className={styles.spinner}></div></div>
  );

  if (!isAuthenticated) return <div className="text-center p-10">يرجى تسجيل الدخول</div>;

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.dashboardContainer}>
        
        {/* --- Sidebar (ثابتة) --- */}
        <div className={styles.sidebar}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <FaUserCircle className={styles.avatarIcon} />
              <button className={styles.editIconButton} onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
                {isEditing ? <FaSave /> : <FaPen size={14} />}
              </button>
            </div>
            {isEditing ? (
              <input 
                className={styles.nameInput}
                value={editForm.displayName}
                onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
              />
            ) : (
              <h2 className={styles.userName}>{userData.name}</h2>
            )}
            <span className={styles.userEmail}>{userData.email}</span>
          </div>

          <div className={styles.statsVertical}>
             <div className={styles.statPill} data-type="streak">
                <FaFire /> <span>{userData.streak || 0} أيام متتالية</span>
             </div>
             <div className={styles.statPill} data-type="xp">
                <FaStar /> <span>{userData.xp || 0} XP</span>
             </div>
          </div>
        </div>

        {/* --- Content Area --- */}
        <div className={styles.contentArea}>
          
          {/* 1. قسم الاشتراك (Premium/Free) */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3><FaCrown className="ml-2 text-yellow-500" /> نظام الاشتراك</h3>
              <span className={styles.badge} data-premium={userData.role === 'premium'}>
                {userData.role === 'premium' ? "Premium Account" : "Free Account"}
              </span>
            </div>
            {userData.role !== 'premium' && (
              <button className={styles.upgradeBtn}>ترقية للحصول على ميزات الـ AI <FaChevronLeft /></button>
            )}
          </div>

          {/* 2. شبكة التقدم الدراسي (Progress) */}
          <div className={styles.grid}>
            <div className={styles.statCard}>
              <div className="flex justify-between items-center mb-2">
                <span className={styles.statLabel}>مستوى القراءة (Learn)</span>
                <FaGraduationCap className="text-blue-500" />
              </div>
              <span className={styles.statValue}>{userData.lastLessonLearn}</span>
              <div className={styles.miniBar}><div style={{width: `${(userData.lastLessonLearn/20)*100}%`, background: '#2563eb'}}></div></div>
            </div>
            <div className={styles.statCard}>
               <div className="flex justify-between items-center mb-2">
                <span className={styles.statLabel}>مستوى التمارين (Practice)</span>
                <FaStar className="text-green-500" />
              </div>
              <span className={styles.statValue}>{userData.lastLessonPractice}</span>
              <div className={styles.miniBar}><div style={{width: `${(userData.lastLessonPractice/20)*100}%`, background: '#10b981'}}></div></div>
            </div>
          </div>

          {/* 3. المعلومات الشخصية (Personal Info) - هادو اللي تزدادو */}
          <div className={styles.card}>
            <h3 className="mb-4 text-sm font-bold text-gray-500">المعلومات الإضافية</h3>
            <div className={styles.infoList}>
              
              {/* الهاتف */}
              <div className={styles.infoItem}>
                <FaPhone className="text-gray-400" />
                {isEditing ? (
                  <input className="border-b w-full outline-none" value={editForm.phoneNumber} onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})} />
                ) : (
                  <span>الهاتف: {userData.phoneNumber || "غير مسجل"}</span>
                )}
              </div>

              {/* الجنس */}
              <div className={styles.infoItem}>
                <FaVenusMars className="text-gray-400" />
                {isEditing ? (
                  <select className="border-b w-full" value={editForm.gender} onChange={(e) => setEditForm({...editForm, gender: e.target.value})}>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                    <option value="unknown">غير محدد</option>
                  </select>
                ) : (
                  <span>الجنس: {userData.gender === 'male' ? 'ذكر' : userData.gender === 'female' ? 'أنثى' : 'غير محدد'}</span>
                )}
              </div>

              {/* جروب واتساب */}
              <div className={styles.infoItem}>
                <FaWhatsapp className="text-green-500" />
                {isEditing ? (
                  <input className="border-b w-full outline-none" value={editForm.whatsappGroup} onChange={(e) => setEditForm({...editForm, whatsappGroup: e.target.value})} />
                ) : (
                  <span>مجموعة واتساب: {userData.whatsappGroup || "لم تنضم لأي مجموعة بعد"}</span>
                )}
              </div>

              {/* تاريخ الانضمام */}
              <div className={styles.infoItem}>
                <FaCalendarAlt className="text-gray-400" />
                <span>عضو منذ: {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('ar-MA') : '---'}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}