// src/components/Lessons/Practice/Practice.jsx
import React, { useState, useEffect } from "react"; 
import PracticeIntro from "./PracticeIntro";
import PracticeQuiz from "./PracticeQuiz";
import PracticeWrite from "./PracticeWrite";
import PracticeTF from "./PracticeTF";
import PracticeResult from "./PracticeResult";
import StoryModal from "./StoryModal"; 
import styles from "./Practice.module.css";
import UpgradePlan from "../../landing/UpgradePlan"; 

// 🔴 زدنا increment
import { db, auth } from "../../../Auth/firebaseConfig"; 
import { doc, getDoc, updateDoc, collection, getDocs, query, orderBy, increment } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { FaTimes, FaBookOpen } from "react-icons/fa";

const Practice = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [lessons, setLessons] = useState([]); 
  const [lessonIndex, setLessonIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [introDone, setIntroDone] = useState(false); 
  
  // 🆕 حالة (State) لتخزين النقط
  const [userXp, setUserXp] = useState(0); 

  const [firebaseUser, setFirebaseUser] = useState(null);
  const [userRole, setUserRole] = useState('free');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showStory, setShowStory] = useState(false); 

  const currentLesson = lessons.length > 0 ? lessons[lessonIndex] : null;
  const totalExercises = currentLesson ? (currentLesson.quiz.length + currentLesson.write.length + currentLesson.tf.length) : 0;
  
  const totalSections = 4;
  const progressPercent = introDone ? ((step) / (totalSections - 1)) * 100 : 0;

  const FREE_LESSONS_LIMIT = 5; 

  const fetchLessons = async () => {
    try {
      const q = query(collection(db, "practice_lessons"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      const fetchedLessons = [];
      querySnapshot.forEach((doc) => fetchedLessons.push(doc.data()));
      setLessons(fetchedLessons);
    } catch (error) {
      console.error("Error fetching practice lessons: ", error);
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
        setUserXp(data.xp || 0); // 🆕 جلب النقط

        const lastLesson = data.lastLessonPractice; 
        if (typeof lastLesson === 'number' && lastLesson >= 0) { 
           if (data.role === 'free' && lastLesson >= FREE_LESSONS_LIMIT) {
             setLessonIndex(FREE_LESSONS_LIMIT - 1); 
           } else {
             setLessonIndex(lastLesson);
           }
           setStep(0); 
           setIntroDone(false); 
        }
      } 
      setIsLoading(false); 
    } catch (error) { 
      console.error("Error loading progress", error); 
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
        // 🆕 زيادة 5 نقط فالتمرين
        await updateDoc(docRef, { 
          lastLessonPractice: newLessonIndex,
          xp: increment(5) 
        });
        setUserXp(prev => prev + 5); // 🆕 تحديث محلي
      } catch (error) { console.error("Error saving progress: ", error); }
  };

  const handleNextStep = () => setStep(step + 1);
  const handleAnswer = () => setScore(score + 1);

  const handleNextLesson = () => {
    const nextIndex = lessonIndex + 1;
    if (userRole === 'free' && nextIndex >= FREE_LESSONS_LIMIT) {
      setShowUpgrade(true);
      return;
    }
    if (lessonIndex < lessons.length - 1) {
      setLessonIndex(nextIndex);
      setStep(0);
      setScore(0);
      setIntroDone(false);
      setShowUpgrade(false);
      saveProgress(nextIndex); 
    } else {
      alert("🏆 لقد أكملت جميع التمارين!");
    }
  };

  // if (isLoading || (firebaseUser && lessons.length === 0)) return <div className={styles.container} style={{ justifyContent: 'center', alignItems:'center' }}><h2>جار التحميل...</h2></div>;
  if (isLoading || (firebaseUser && lessons.length === 0)) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loaderWrapper}>
          {/* هادا هو الـ Spinner اللي كيدور */}
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
  if (!firebaseUser) return <div className={styles.container} style={{ justifyContent: 'center', alignItems:'center' }}><h2>المرجو تسجيل الدخول</h2></div>;
  if (!currentLesson) return <div className={styles.container} style={{ justifyContent: 'center', alignItems:'center' }}><h2>خطأ: لم يتم العثور على التمرين.</h2></div>;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.progressContainer}>
          <div className={styles.progressFill} style={{ width: `${progressPercent}%` }}></div>
        </div>

        {/* 🆕 عرض النقط */}
        <div style={{ fontWeight: '900', color: '#f4c150', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1.2rem', margin: '0 10px', direction: 'ltr' }}>
          <span>{userXp}</span> 🌟
        </div>
        
        {introDone && step < 3 && (
          <button className={styles.storyToggleBtn} onClick={() => setShowStory(true)}>
            <FaBookOpen /> النص
          </button>
        )}
      </div>

      <div className={styles.practiceCard}>
        {!introDone ? (
          <PracticeIntro
            title={currentLesson.intro.title}
            story={currentLesson.intro.story}
            image={currentLesson.intro.image}
            audio={currentLesson.intro.audio}
            onNext={() => setIntroDone(true)}
          />
        ) : (
          <>
            {step === 0 && <PracticeQuiz questions={currentLesson.quiz} onNext={handleNextStep} onAnswer={handleAnswer} />}
            {step === 1 && <PracticeWrite questions={currentLesson.write} onNext={handleNextStep} onAnswer={handleAnswer} />}
            {step === 2 && <PracticeTF questions={currentLesson.tf} onNext={handleNextStep} onAnswer={handleAnswer} />}
            {step === 3 && (
               <div>
                  <PracticeResult score={score} total={totalExercises} onNext={handleNextLesson} />
                  <p style={{textAlign: 'center', color: '#58cc02', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '-10px'}}>+5 نقط XP 🌟</p>
               </div>
            )}
          </>
        )}
      </div>

      {showStory && (
        <StoryModal 
          intro={currentLesson.intro} 
          onClose={() => setShowStory(false)} 
        />
      )}

    </div>
  );
};

export default Practice;