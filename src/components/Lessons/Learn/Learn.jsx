// // import { useState, useEffect } from 'react';
// // import { lessons } from './LearnData';
// // import WordViewer from './WordViewer';
// // import WordQuiz from './WordQuiz';
// // import SentenceViewer from './SentenceViewer';
// // import WordWriting from './WordWriting';
// // import SentenceWriting from './SentenceWriting';
// // import styles from './Learn.module.css';
// // import UpgradePlan from '../../landing/UpgradePlan'; 
// // import { db, auth } from '../../../Auth/firebaseConfig'; 
// // import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
// // import { onAuthStateChanged } from 'firebase/auth';
// // import { FaTimes } from 'react-icons/fa';

// // export default function Learn() {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [firebaseUser, setFirebaseUser] = useState(null);
// //   const [userRole, setUserRole] = useState('free'); 
// //   const [showUpgrade, setShowUpgrade] = useState(false);

// //   const [lessonIndex, setLessonIndex] = useState(0);
// //   const [stepIndex, setStepIndex] = useState(0); // 0 to 6

// //   const FREE_LESSONS_LIMIT = 15; 
// //   const currentLesson = lessons[lessonIndex];
// //   const userId = firebaseUser?.uid || "fallback_id";

// //   // حساب التقدم الكلي في الدرس (تقريبي)
// //   const totalSteps = 6; 
// //   const progressPercent = (stepIndex / totalSteps) * 100;

// //   const handleNextStep = () => {
// //     if (stepIndex < 5) {
// //       setStepIndex(prev => prev + 1);
// //     }
// //   };

// //   const goToNextLesson = () => {
// //     const nextIndex = lessonIndex + 1;
// //     if (userRole === 'free' && nextIndex >= FREE_LESSONS_LIMIT) {
// //       setShowUpgrade(true);
// //       return;
// //     }
// //     if (lessonIndex < lessons.length - 1) {
// //       setLessonIndex(prev => prev + 1);
// //       setStepIndex(0);
// //       setShowUpgrade(false);
// //     } else {
// //       setStepIndex(6); // Finish screen
// //     }
// //   };

// //   // 🔴 هاهي دالة الحفظ رجعات (كانت ناقصة)
// //   const saveProgress = async () => {
// //     // ما تحفظش إلا كان جاري التحميل أو المستخدم ما كاينش
// //     if (isLoading || !firebaseUser || userId === "fallback_id") return;

// //     try {
// //       const docRef = doc(db, "users", userId);
// //       // الحفظ فـ Firestore
// //       await updateDoc(docRef, {
// //         lastLessonLearn: lessonIndex, // حفظ رقم الدرس الحالي
// //       });
// //       console.log("✅ Progress Saved:", lessonIndex);
// //     } catch (error) {
// //       console.error("❌ Error saving progress: ", error);
// //     }
// //   };

// //   // 🔴 هاهي دالة التحميل رجعات (كانت ناقصة)
// //   const loadProgress = async (currentUserId) => {
// //     if (!currentUserId) {
// //       setIsLoading(false);
// //       return;
// //     }

// //     try {
// //       const docRef = doc(db, "users", currentUserId);
// //       const docSnap = await getDoc(docRef);

// //       if (docSnap.exists()) {
// //         const data = docSnap.data();
        
// //         // جيب الدور
// //         const role = data.role || 'free';
// //         setUserRole(role);

// //         // جيب آخر درس
// //         const lastLesson = data.lastLessonLearn;

// //         if (typeof lastLesson === 'number' && lastLesson >= 0) {
// //           // التحقق من Limit
// //           if (role === 'free' && lastLesson >= FREE_LESSONS_LIMIT) {
// //              setLessonIndex(FREE_LESSONS_LIMIT - 1); 
// //           } else {
// //              setLessonIndex(lastLesson);
// //           }
// //           // ديما بدا من الخطوة 0 فاش يرجع
// //           setStepIndex(0); 
// //         }
// //       }
// //       setIsLoading(false);
// //     } catch (error) {
// //       console.error("Error loading learn progress: ", error);
// //       setIsLoading(false);
// //     }
// //   };

// //   // المراقبة عند بدء التشغيل
// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
// //       setFirebaseUser(currentUser);
// //       if (currentUser) {
// //         loadProgress(currentUser.uid);
// //       } else {
// //         setIsLoading(false);
// //       }
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   // الحفظ عند تغير الدرس
// //   useEffect(() => {
// //     saveProgress();
// //   }, [lessonIndex, userId]); // يحفظ فقط عند تغير رقم الدرس


// //   if (isLoading) return <div className={styles.container} style={{
// //       display: 'flex',
// //       justifyContent: 'center',
// //       fontWeight: '900',
// //     }}>جار التحميل...</div>
// //   if (showUpgrade) return <UpgradePlan />;
// //   if (!firebaseUser) return <div className={styles.container}>المرجو تسجيل الدخول</div>;

// //   return (
// //     <div className={styles.container}>
      
// //       {/* Top Bar */}
// //       <div className={styles.topBar}>
// //         <button className={styles.closeButton}><FaTimes /></button>
// //         <div className={styles.progressContainer}>
// //           <div className={styles.progressFill} style={{ width: `${progressPercent}%` }}></div>
// //         </div>
// //       </div>

// //       <div className={styles.learnCard}>
// //         {stepIndex === 0 && <WordViewer lesson={currentLesson} onComplete={handleNextStep} />}
// //         {stepIndex === 1 && <WordQuiz lesson={currentLesson} onComplete={handleNextStep} />}
// //         {stepIndex === 2 && <SentenceViewer lesson={currentLesson} onComplete={handleNextStep} />}
// //         {stepIndex === 3 && <WordWriting lesson={currentLesson} onComplete={handleNextStep} />}
// //         {stepIndex === 4 && <SentenceWriting lesson={currentLesson} onComplete={handleNextStep} />}

// //         {stepIndex === 5 && (
// //           <div className={styles.cardBody}>
// //             <div style={{fontSize: '4rem'}}>🎉</div>
// //             <h2 style={{color: 'var(--primary-color)', margin: '20px 0'}}>أحسنت! أكملت الدرس</h2>
// //             <div className={styles.footerArea}>
// //               <div className={styles.footerContent} style={{justifyContent: 'center'}}>
// //                  <button className={styles.actionButton} onClick={goToNextLesson}>
// //                    {userRole === 'free' && (lessonIndex + 1) >= FREE_LESSONS_LIMIT 
// //                      ? "فتح الدرس التالي (Premium) 🔒" 
// //                      : "الدرس التالي"
// //                    }
// //                  </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {stepIndex === 6 && (
// //            <div className={styles.cardBody}>
// //              <h2>🏆 مبروك! ساليتي جميع الدروس</h2>
// //            </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useEffect } from 'react';
// import WordViewer from './WordViewer';
// import WordQuiz from './WordQuiz';
// import SentenceViewer from './SentenceViewer';
// import WordWriting from './WordWriting';
// import SentenceWriting from './SentenceWriting';
// import styles from './Learn.module.css';
// import UpgradePlan from '../../landing/UpgradePlan'; 
// import { db, auth } from '../../../Auth/firebaseConfig'; 
// import { doc, getDoc, updateDoc, collection, getDocs, query, orderBy } from 'firebase/firestore'; 
// import { onAuthStateChanged } from 'firebase/auth';
// import { FaTimes } from 'react-icons/fa';

// export default function Learn() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [lessons, setLessons] = useState([]); 
//   const [firebaseUser, setFirebaseUser] = useState(null);
//   const [userRole, setUserRole] = useState('free'); 
//   const [showUpgrade, setShowUpgrade] = useState(false);

//   const [lessonIndex, setLessonIndex] = useState(0);
//   const [stepIndex, setStepIndex] = useState(0); 

//   const FREE_LESSONS_LIMIT = 15; 
//   const currentLesson = lessons.length > 0 ? lessons[lessonIndex] : null;

//   const totalSteps = 6; 
//   const progressPercent = (stepIndex / totalSteps) * 100;

//   const fetchLessons = async () => {
//     try {
//       const q = query(collection(db, "learn_lessons"), orderBy("id", "asc"));
//       const querySnapshot = await getDocs(q);
      
//       const fetchedLessons = [];
//       querySnapshot.forEach((doc) => {
//         fetchedLessons.push(doc.data());
//       });
      
//       setLessons(fetchedLessons);
//     } catch (error) {
//       console.error("❌ Error fetching lessons: ", error);
//     }
//   };

//   const loadProgress = async (currentUserId) => {
//     if (!currentUserId) {
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const docRef = doc(db, "users", currentUserId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const role = data.role || 'free';
//         setUserRole(role);

//         const lastLesson = data.lastLessonLearn;

//         if (typeof lastLesson === 'number' && lastLesson >= 0) {
//           if (role === 'free' && lastLesson >= FREE_LESSONS_LIMIT) {
//              setLessonIndex(FREE_LESSONS_LIMIT - 1); 
//           } else {
//              setLessonIndex(lastLesson);
//           }
//           setStepIndex(0); 
//         }
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error loading learn progress: ", error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setFirebaseUser(currentUser);
      
//       if (currentUser) {
//         await fetchLessons();
//         await loadProgress(currentUser.uid);
//       } else {
//         setIsLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const saveProgress = async (newLessonIndex) => {
//     if (!firebaseUser?.uid) return;

//     try {
//       const docRef = doc(db, "users", firebaseUser.uid);
//       await updateDoc(docRef, {
//         lastLessonLearn: newLessonIndex,
//       });
//     } catch (error) {
//       console.error("❌ Error saving progress: ", error);
//     }
//   };

//   const handleNextStep = () => {
//     if (stepIndex < 5) {
//       setStepIndex(prev => prev + 1);
//     }
//   };

//   const goToNextLesson = () => {
//     const nextIndex = lessonIndex + 1;
//     if (userRole === 'free' && nextIndex >= FREE_LESSONS_LIMIT) {
//       setShowUpgrade(true);
//       return;
//     }
    
//     if (lessonIndex < lessons.length - 1) {
//       setLessonIndex(nextIndex);
//       setStepIndex(0);
//       setShowUpgrade(false);
//       saveProgress(nextIndex); 
//     } else {
//       setStepIndex(6); 
//     }
//   };

//   if (isLoading || (firebaseUser && lessons.length === 0)) return (
//     <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900' }}>
//       جار التحميل...
//     </div>
//   );
  
//   if (showUpgrade) return <UpgradePlan />;
//   if (!firebaseUser) return <div className={styles.container}>المرجو تسجيل الدخول</div>;
//   if (!currentLesson) return <div className={styles.container}>خطأ: لم يتم العثور على الدرس.</div>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.topBar}>
//         <button className={styles.closeButton}><FaTimes /></button>
//         <div className={styles.progressContainer}>
//           <div className={styles.progressFill} style={{ width: `${progressPercent}%` }}></div>
//         </div>
//       </div>

//       <div className={styles.learnCard}>
//         {stepIndex === 0 && <WordViewer lesson={currentLesson} onComplete={handleNextStep} />}
//         {stepIndex === 1 && <WordQuiz lesson={currentLesson} onComplete={handleNextStep} />}
//         {stepIndex === 2 && <SentenceViewer lesson={currentLesson} onComplete={handleNextStep} />}
//         {stepIndex === 3 && <WordWriting lesson={currentLesson} onComplete={handleNextStep} />}
//         {stepIndex === 4 && <SentenceWriting lesson={currentLesson} onComplete={handleNextStep} />}

//         {stepIndex === 5 && (
//           <div className={styles.cardBody}>
//             <div style={{fontSize: '4rem'}}>🎉</div>
//             <h2 style={{color: 'var(--primary-color)', margin: '20px 0'}}>أكملت الدرس بنجاح</h2>
//             <div className={styles.footerArea}>
//               <div className={styles.footerContent} style={{justifyContent: 'center'}}>
//                  <button className={styles.actionButton} onClick={goToNextLesson}>
//                    {userRole === 'free' && (lessonIndex + 1) >= FREE_LESSONS_LIMIT 
//                      ? "فتح الدرس التالي (Premium) 🔒" 
//                      : "الدرس التالي"
//                    }
//                  </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {stepIndex === 6 && (
//            <div className={styles.cardBody}>
//              <h2>🏆 أكملت جميع الدروس</h2>
//            </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import WordViewer from './WordViewer';
import WordQuiz from './WordQuiz';
import SentenceViewer from './SentenceViewer';
import WordWriting from './WordWriting';
import SentenceWriting from './SentenceWriting';
import styles from './Learn.module.css';
import UpgradePlan from '../../landing/UpgradePlan'; 
import { db, auth } from '../../../Auth/firebaseConfig'; 
import { doc, getDoc, updateDoc, collection, getDocs, query, orderBy } from 'firebase/firestore'; 
import { onAuthStateChanged } from 'firebase/auth';
import { FaTimes, FaTrophy } from 'react-icons/fa';

export default function Learn() {
  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useState([]); 
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [userRole, setUserRole] = useState('free'); 
  const [showUpgrade, setShowUpgrade] = useState(false);

  const [lessonIndex, setLessonIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0); 

  const FREE_LESSONS_LIMIT = 15; 
  const currentLesson = lessons.length > 0 ? lessons[lessonIndex] : null;
  const totalSteps = 6; 
  const progressPercent = (stepIndex / totalSteps) * 100;

  const fetchLessons = async () => {
    try {
      const q = query(collection(db, "learn_lessons"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      const fetchedLessons = [];
      querySnapshot.forEach((doc) => {
        fetchedLessons.push(doc.data());
      });
      setLessons(fetchedLessons);
    } catch (error) {
      console.error("Error fetching lessons: ", error);
    }
  };

  const loadProgress = async (currentUserId) => {
    if (!currentUserId) {
      setIsLoading(false);
      return;
    }
    try {
      const docRef = doc(db, "users", currentUserId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const role = data.role || 'free';
        setUserRole(role);
        const lastLesson = data.lastLessonLearn;
        if (typeof lastLesson === 'number' && lastLesson >= 0) {
          if (role === 'free' && lastLesson >= FREE_LESSONS_LIMIT) {
             setLessonIndex(FREE_LESSONS_LIMIT - 1); 
          } else {
             setLessonIndex(lastLesson);
          }
          setStepIndex(0); 
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading learn progress: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser);
      if (currentUser) {
        await fetchLessons();
        await loadProgress(currentUser.uid);
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const saveProgress = async (newLessonIndex) => {
    if (!firebaseUser?.uid) return;
    try {
      const docRef = doc(db, "users", firebaseUser.uid);
      await updateDoc(docRef, { lastLessonLearn: newLessonIndex });
    } catch (error) {
      console.error("Error saving progress: ", error);
    }
  };

  const handleNextStep = () => {
    if (stepIndex < 5) setStepIndex(prev => prev + 1);
  };

  const goToNextLesson = () => {
    const nextIndex = lessonIndex + 1;
    if (userRole === 'free' && nextIndex >= FREE_LESSONS_LIMIT) {
      setShowUpgrade(true);
      return;
    }
    if (lessonIndex < lessons.length - 1) {
      setLessonIndex(nextIndex);
      setStepIndex(0);
      setShowUpgrade(false);
      saveProgress(nextIndex); 
    } else {
      setStepIndex(6); 
    }
  };

  if (isLoading || (firebaseUser && lessons.length === 0)) return (
    <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h2>جار التحميل...</h2>
    </div>
  );
  
  if (showUpgrade) return <UpgradePlan />;
  if (!firebaseUser) return <div className={styles.container} style={{justifyContent: 'center', alignItems: 'center'}}><h2>المرجو تسجيل الدخول</h2></div>;
  if (!currentLesson) return <div className={styles.container} style={{justifyContent: 'center', alignItems: 'center'}}><h2>خطأ: لم يتم العثور على الدرس.</h2></div>;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button className={styles.closeButton}><FaTimes /></button>
        <div className={styles.progressContainer}>
          <div className={styles.progressFill} style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className={styles.learnCard}>
        {stepIndex === 0 && <WordViewer lesson={currentLesson} onComplete={handleNextStep} />}
        {stepIndex === 1 && <WordQuiz lesson={currentLesson} onComplete={handleNextStep} />}
        {stepIndex === 2 && <SentenceViewer lesson={currentLesson} onComplete={handleNextStep} />}
        {stepIndex === 3 && <WordWriting lesson={currentLesson} onComplete={handleNextStep} />}
        {stepIndex === 4 && <SentenceWriting lesson={currentLesson} onComplete={handleNextStep} />}

        {stepIndex === 5 && (
          <div className={styles.cardBody}>
            <FaTrophy size={80} color="#f4c150" style={{marginBottom: '20px'}}/>
            <h2 style={{color: '#3c3c3c', fontSize: '2rem'}}>أكملت الدرس بنجاح</h2>
            <div className={styles.footerArea}>
              <div className={styles.footerContent} style={{justifyContent: 'center'}}>
                 <button className={styles.actionButton} onClick={goToNextLesson}>
                   {userRole === 'free' && (lessonIndex + 1) >= FREE_LESSONS_LIMIT ? "فتح الدرس التالي 🔒" : "الدرس التالي"}
                 </button>
              </div>
            </div>
          </div>
        )}

        {stepIndex === 6 && (
           <div className={styles.cardBody}>
             <FaTrophy size={100} color="#f4c150" style={{marginBottom: '20px'}}/>
             <h2 style={{fontSize: '2rem'}}>أكملت جميع الدروس!</h2>
           </div>
        )}
      </div>
    </div>
  );
}