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

import { db } from "../../../Auth/firebaseConfig"; // 👈 حيدنا auth حيت useUser غيتكلف
import { doc, updateDoc, collection, getDocs, query, orderBy, increment } from "firebase/firestore"; 
import { useUser } from "../../../Auth/useUser"; // 👈 استيراد الروبيني المركزي
import { FaBookOpen } from "react-icons/fa"; // حيدنا FaTimes حيت مامستعملاش

const Practice = () => {
  // 1. جلب البيانات من الروبيني
  const { userData, loading: userLoading, isAuthenticated } = useUser();
  
  const [isLoadingLessons, setIsLoadingLessons] = useState(true); 
  const [lessons, setLessons] = useState([]); 
  const [lessonIndex, setLessonIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [introDone, setIntroDone] = useState(false); 
  
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
    } finally {
      setIsLoadingLessons(false);
    }
  };

  // 2. التحكم في بداية التمرين بناءً على بيانات المستخدم
  useEffect(() => {
    if (isAuthenticated && userData && lessons.length > 0) {
      const lastLesson = userData.lastLessonPractice || 0;
      
      if (userData.role === 'free' && lastLesson >= FREE_LESSONS_LIMIT) {
        setLessonIndex(FREE_LESSONS_LIMIT - 1); 
      } else {
        setLessonIndex(lastLesson);
      }
      setStep(0); 
      setIntroDone(false); 
    }
  }, [userData, lessons, isAuthenticated]);

  // جلب التمارين فاش كيتفتح المكون
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
          lastLessonPractice: newLessonIndex,
          xp: increment(5) 
        });
        // 👈 حيدنا setUserXp حيت onSnapshot فـ useUser غيحدث القيمة أوتوماتيكياً
      } catch (error) { console.error("Error saving progress: ", error); }
  };

  const handleNextStep = () => setStep(step + 1);
  const handleAnswer = () => setScore(score + 1);

  const handleNextLesson = () => {
    const nextIndex = lessonIndex + 1;
    if (userData?.role === 'free' && nextIndex >= FREE_LESSONS_LIMIT) {
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

  if (showUpgrade) return <UpgradePlan />;
  
  // 5. حماية المسار
  if (!isAuthenticated) return <div className={styles.container} style={{ justifyContent: 'center', alignItems:'center' }}><h2>المرجو تسجيل الدخول</h2></div>;
  if (!currentLesson) return <div className={styles.container} style={{ justifyContent: 'center', alignItems:'center' }}><h2>خطأ: لم يتم العثور على التمرين.</h2></div>;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.progressContainer}>
          <div className={styles.progressFill} style={{ width: `${progressPercent}%` }}></div>
        </div>

        {/* 6. عرض النقط مباشرة من userData */}
        <div style={{ fontWeight: '900', color: '#f4c150', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1.2rem', margin: '0 10px', direction: 'ltr' }}>
          <span>{userData?.xp || 0}</span> 🌟
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