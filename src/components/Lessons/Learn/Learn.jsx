// src/components/Lessons/Learn/Learn.jsx
import { useState, useEffect } from 'react';
import WordViewer from './WordViewer';
import WordQuiz from './WordQuiz';
import SentenceViewer from './SentenceViewer';
import WordWriting from './WordWriting';
import SentenceWriting from './SentenceWriting';
import styles from './Learn.module.css';
import UpgradePlan from '../../landing/UpgradePlan'; 
import { db } from '../../../Auth/firebaseConfig'; // حيدنا auth حيت مبقيناش محتاجينها
import { doc, updateDoc, collection, getDocs, query, orderBy, increment } from 'firebase/firestore'; 
import { useUser } from '../../../Auth/useUser'; // 👈 استيراد الروبيني المركزي
import { FaTimes, FaTrophy } from 'react-icons/fa';

export default function Learn() {
  // 1. جلب البيانات من الروبيني
  const { userData, loading: userLoading, isAuthenticated } = useUser();
  
  const [isLoadingLessons, setIsLoadingLessons] = useState(true);
  const [lessons, setLessons] = useState([]); 
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0); 

  const FREE_LESSONS_LIMIT = 15; 
  const currentLesson = lessons.length > 0 ? lessons[lessonIndex] : null;
  const totalSteps = 6; 
  const progressPercent = (stepIndex / totalSteps) * 100;

  // جلب قائمة الدروس من Firestore
  const fetchLessons = async () => {
    try {
      const q = query(collection(db, "learn_lessons"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      const fetchedLessons = [];
      querySnapshot.forEach((doc) => fetchedLessons.push(doc.data()));
      setLessons(fetchedLessons);
    } catch (error) {
      console.error("Error fetching lessons: ", error);
    } finally {
      setIsLoadingLessons(false);
    }
  };

  // 2. التحكم في بداية الدرس بناءً على بيانات المستخدم
  useEffect(() => {
    if (isAuthenticated && userData && lessons.length > 0) {
      const lastLesson = userData.lastLessonLearn || 0;
      
      // حماية الحساب المجاني
      if (userData.role === 'free' && lastLesson >= FREE_LESSONS_LIMIT) {
         setLessonIndex(FREE_LESSONS_LIMIT - 1); 
      } else {
         setLessonIndex(lastLesson);
      }
      setStepIndex(0); 
    }
  }, [userData, lessons, isAuthenticated]);

  // جلب الدروس فاش كيتفتح المكون
  useEffect(() => {
    if (isAuthenticated) {
      fetchLessons();
    }
  }, [isAuthenticated]);

  // 3. حفظ التقدم وزيادة الـ XP
  const saveProgress = async (newLessonIndex) => {
    if (!userData?.uid) return;
    try {
      const docRef = doc(db, "users", userData.uid);
      await updateDoc(docRef, { 
        lastLessonLearn: newLessonIndex,
        xp: increment(5) 
      });
      // ملاحظة: ما بقاش خاصنا نديرو setUserXp يدوياً، حيت onSnapshot فـ useUser غيحدث القيمة أوتوماتيكياً
    } catch (error) {
      console.error("Error saving progress: ", error);
    }
  };

  const handleNextStep = () => {
    if (stepIndex < 5) setStepIndex(prev => prev + 1);
  };

  const goToNextLesson = () => {
    const nextIndex = lessonIndex + 1;
    if (userData?.role === 'free' && nextIndex >= FREE_LESSONS_LIMIT) {
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

  // 4. حالة التحميل المركزية
  if (userLoading || isLoadingLessons) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loaderWrapper}>
          <div className={styles.customSpinner}></div>
          <div className={styles.textWrapper}>
            <h2 className={styles.mainTitle}>جارِ التحميل...</h2>
            <p className={styles.subTitle}>كنجمعو ليك الدروس، شوية د الصبر 🚀</p>
          </div>
        </div>
      </div>
    );
  }

  // 5. حماية المسار
  if (!isAuthenticated) {
    return <div className={styles.container} style={{justifyContent: 'center', alignItems: 'center'}}><h2>المرجو تسجيل الدخول</h2></div>;
  }

  if (showUpgrade) return <UpgradePlan />;
  if (!currentLesson) return <div className={styles.container} style={{justifyContent: 'center', alignItems: 'center'}}><h2>خطأ: لم يتم العثور على الدرس.</h2></div>;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.progressContainer}>
          <div className={styles.progressFill} style={{ width: `${progressPercent}%` }}></div>
        </div>
        
        {/* 6. عرض النقط مباشرة من userData */}
        <div style={{ fontWeight: '900', color: '#f4c150', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1.2rem', direction: 'ltr' }}>
          <span>{userData?.xp || 0}</span> 🌟
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
            <p style={{color: '#58cc02', fontSize: '1.2rem', fontWeight: 'bold'}}>+5 نقط XP 🌟</p>
            <div className={styles.footerArea}>
              <div className={styles.footerContent} style={{justifyContent: 'center'}}>
                 <button className={styles.actionButton} onClick={goToNextLesson}>
                   {userData?.role === 'free' && (lessonIndex + 1) >= FREE_LESSONS_LIMIT ? "فتح الدرس التالي 🔒" : "الدرس التالي"}
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