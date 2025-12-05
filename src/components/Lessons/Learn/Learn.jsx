import { useState, useEffect } from 'react';
import { lessons } from './LearnData';
import WordViewer from './WordViewer';
import WordQuiz from './WordQuiz';
import SentenceViewer from './SentenceViewer';
import WordWriting from './WordWriting';
import SentenceWriting from './SentenceWriting';
import styles from './Learn.module.css';
import UpgradePlan from '../../landing/UpgradePlan'; 
import { db, auth } from '../../../Auth/firebaseConfig'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { onAuthStateChanged } from 'firebase/auth';
import { FaTimes } from 'react-icons/fa';

export default function Learn() {
  const [isLoading, setIsLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [userRole, setUserRole] = useState('free'); 
  const [showUpgrade, setShowUpgrade] = useState(false);

  const [lessonIndex, setLessonIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0); // 0 to 6

  const FREE_LESSONS_LIMIT = 15; 
  const currentLesson = lessons[lessonIndex];
  const userId = firebaseUser?.uid || "fallback_id";

  // حساب التقدم الكلي في الدرس (تقريبي)
  const totalSteps = 6; 
  const progressPercent = (stepIndex / totalSteps) * 100;

  const handleNextStep = () => {
    if (stepIndex < 5) {
      setStepIndex(prev => prev + 1);
    }
  };

  const goToNextLesson = () => {
    const nextIndex = lessonIndex + 1;
    if (userRole === 'free' && nextIndex >= FREE_LESSONS_LIMIT) {
      setShowUpgrade(true);
      return;
    }
    if (lessonIndex < lessons.length - 1) {
      setLessonIndex(prev => prev + 1);
      setStepIndex(0);
      setShowUpgrade(false);
    } else {
      setStepIndex(6); // Finish screen
    }
  };

  // 🔴 هاهي دالة الحفظ رجعات (كانت ناقصة)
  const saveProgress = async () => {
    // ما تحفظش إلا كان جاري التحميل أو المستخدم ما كاينش
    if (isLoading || !firebaseUser || userId === "fallback_id") return;

    try {
      const docRef = doc(db, "users", userId);
      // الحفظ فـ Firestore
      await updateDoc(docRef, {
        lastLessonLearn: lessonIndex, // حفظ رقم الدرس الحالي
      });
      console.log("✅ Progress Saved:", lessonIndex);
    } catch (error) {
      console.error("❌ Error saving progress: ", error);
    }
  };

  // 🔴 هاهي دالة التحميل رجعات (كانت ناقصة)
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
        
        // جيب الدور
        const role = data.role || 'free';
        setUserRole(role);

        // جيب آخر درس
        const lastLesson = data.lastLessonLearn;

        if (typeof lastLesson === 'number' && lastLesson >= 0) {
          // التحقق من Limit
          if (role === 'free' && lastLesson >= FREE_LESSONS_LIMIT) {
             setLessonIndex(FREE_LESSONS_LIMIT - 1); 
          } else {
             setLessonIndex(lastLesson);
          }
          // ديما بدا من الخطوة 0 فاش يرجع
          setStepIndex(0); 
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading learn progress: ", error);
      setIsLoading(false);
    }
  };

  // المراقبة عند بدء التشغيل
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setFirebaseUser(currentUser);
      if (currentUser) {
        loadProgress(currentUser.uid);
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // الحفظ عند تغير الدرس
  useEffect(() => {
    saveProgress();
  }, [lessonIndex, userId]); // يحفظ فقط عند تغير رقم الدرس


  if (isLoading) return <div className={styles.container} style={{
      display: 'flex',
      justifyContent: 'center',
      fontWeight: '900',
    }}>جار التحميل...</div>
  if (showUpgrade) return <UpgradePlan />;
  if (!firebaseUser) return <div className={styles.container}>المرجو تسجيل الدخول</div>;

  return (
    <div className={styles.container}>
      
      {/* Top Bar */}
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
            <div style={{fontSize: '4rem'}}>🎉</div>
            <h2 style={{color: 'var(--primary-color)', margin: '20px 0'}}>أحسنت! أكملت الدرس</h2>
            <div className={styles.footerArea}>
              <div className={styles.footerContent} style={{justifyContent: 'center'}}>
                 <button className={styles.actionButton} onClick={goToNextLesson}>
                   {userRole === 'free' && (lessonIndex + 1) >= FREE_LESSONS_LIMIT 
                     ? "فتح الدرس التالي (Premium) 🔒" 
                     : "الدرس التالي"
                   }
                 </button>
              </div>
            </div>
          </div>
        )}

        {stepIndex === 6 && (
           <div className={styles.cardBody}>
             <h2>🏆 مبروك! ساليتي جميع الدروس</h2>
           </div>
        )}
      </div>
    </div>
  );
}