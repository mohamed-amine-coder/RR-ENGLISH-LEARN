// src/components/Lessons/Learn/Learn.jsx
import { useState, useEffect } from 'react';
import WordViewer from './WordViewer';
import WordQuiz from './WordQuiz';
import SentenceViewer from './SentenceViewer';
import WordWriting from './WordWriting';
import SentenceWriting from './SentenceWriting';
import styles from './Learn.module.css';
import UpgradePlan from '../../landing/UpgradePlan'; 
// 🔴 زدنا increment هنا باش نزيدو النقط فـ Firebase
import { db, auth } from '../../../Auth/firebaseConfig'; 
import { doc, getDoc, updateDoc, collection, getDocs, query, orderBy, increment } from 'firebase/firestore'; 
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
  
  // 🆕 حالة (State) جديدة لتخزين النقط
  const [userXp, setUserXp] = useState(0); 

  const FREE_LESSONS_LIMIT = 15; 
  const currentLesson = lessons.length > 0 ? lessons[lessonIndex] : null;
  const totalSteps = 6; 
  const progressPercent = (stepIndex / totalSteps) * 100;

  const fetchLessons = async () => {
    try {
      const q = query(collection(db, "learn_lessons"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      const fetchedLessons = [];
      querySnapshot.forEach((doc) => fetchedLessons.push(doc.data()));
      setLessons(fetchedLessons);
    } catch (error) {
      console.error("Error fetching lessons: ", error);
    }
  };

  const loadProgress = async (currentUserId) => {
    if (!currentUserId) { setIsLoading(false); return; }
    try {
      const docRef = doc(db, "users", currentUserId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserRole(data.role || 'free');
        setUserXp(data.xp || 0); // 🆕 جلب النقط ديالو من Firebase

        const lastLesson = data.lastLessonLearn;
        if (typeof lastLesson === 'number' && lastLesson >= 0) {
          if (data.role === 'free' && lastLesson >= FREE_LESSONS_LIMIT) {
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
      // 🆕 الحفظ ديال الدرس الجديد + زيادة 5 نقط فـ قاعدة البيانات
      await updateDoc(docRef, { 
        lastLessonLearn: newLessonIndex,
        xp: increment(5) 
      });
      setUserXp(prev => prev + 5); // 🆕 تحديث النقط فالشاشة قدامو
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

  // if (isLoading || (firebaseUser && lessons.length === 0)) return <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h2>جار التحميل...</h2></div>;
  if (isLoading || (firebaseUser && lessons.length === 0)) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loaderWrapper}>
          {/* هادا هو الـ Spinner اللي كيدور بشكل عصري */}
          <div className={styles.customSpinner}></div>
          
          {/* النصوص */}
          <div className={styles.textWrapper}>
            <h2 className={styles.mainTitle}>جارِ التحميل...</h2>
            <p className={styles.subTitle}>كنجمعو ليك الدروس، شوية د الصبر 🚀</p>
          </div>
        </div>
      </div>
    );
  }
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
        
        {/* 🆕 عرض النقط فالأعلى */}
        <div style={{ fontWeight: '900', color: '#f4c150', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1.2rem', direction: 'ltr' }}>
          <span>{userXp}</span> 🌟
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
            <p style={{color: '#58cc02', fontSize: '1.2rem', fontWeight: 'bold'}}>+5 نقط XP 🌟</p> {/* 🆕 خبرناه بلي ربح 5 نقط */}
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