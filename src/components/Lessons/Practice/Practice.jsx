import React, { useState, useEffect } from "react"; 
import PracticeIntro from "./PracticeIntro";
import PracticeQuiz from "./PracticeQuiz";
import PracticeWrite from "./PracticeWrite";
import PracticeTF from "./PracticeTF";
import CustomAudioPlayer from "./CustomAudioPlayer";
import PracticeResult from "./PracticeResult";
import styles from "./Practice.module.css";
import UpgradePlan from "../../landing/UpgradePlan"; 

import { db, auth } from "../../../Auth/firebaseConfig"; 
import { doc, getDoc, updateDoc, collection, getDocs, query, orderBy } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { FaTimes, FaBookOpen } from "react-icons/fa";

const Practice = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [lessons, setLessons] = useState([]); 
  const [lessonIndex, setLessonIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [userRole, setUserRole] = useState('free');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showStory, setShowStory] = useState(false); 

  const currentLesson = lessons.length > 0 ? lessons[lessonIndex] : null;
  const totalExercises = currentLesson ? (currentLesson.quiz.length + currentLesson.write.length + currentLesson.tf.length) : 0;
  
  // Progress Logic
  // step ranges from 0 to 3 (Intro doesn't count in exercises progress)
  const totalSections = 4; // 0:Quiz, 1:Write, 2:TF, 3:Result
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
        const lastLesson = data.lastLessonPractice; 
        if (typeof lastLesson === 'number' && lastLesson >= 0) { 
           if (data.role === 'free' && lastLesson >= FREE_LESSONS_LIMIT) {
             setLessonIndex(FREE_LESSONS_LIMIT - 1); 
           } else {
             setLessonIndex(lastLesson);
           }
           setStep(0); 
           setIntroDone(true); 
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
        await updateDoc(docRef, { lastLessonPractice: newLessonIndex });
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

  if (isLoading || (firebaseUser && lessons.length === 0)) return <div className={styles.container} style={{ justifyContent: 'center', alignItems:'center' }}><h2>جار التحميل...</h2></div>;
  if (showUpgrade) return <UpgradePlan />;
  if (!firebaseUser) return <div className={styles.container} style={{ justifyContent: 'center', alignItems:'center' }}><h2>المرجو تسجيل الدخول</h2></div>;
  if (!currentLesson) return <div className={styles.container} style={{ justifyContent: 'center', alignItems:'center' }}><h2>خطأ: لم يتم العثور على التمرين.</h2></div>;

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button className={styles.closeButton}><FaTimes /></button>
        <div className={styles.progressContainer}>
          <div className={styles.progressFill} style={{ width: `${progressPercent}%` }}></div>
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
            {step === 3 && <PracticeResult score={score} total={totalExercises} onNext={handleNextLesson} />}
          </>
        )}
      </div>

      {/* {showStory && (
        <div className={styles.modalOverlay} onClick={() => setShowStory(false)}>
          <div className={styles.storyModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>📖 النص المرجعي</h3>
              <button className={styles.closeModalBtn} onClick={() => setShowStory(false)}><FaTimes /></button>
            </div>
            <div className={styles.modalBody}>
              <img src={currentLesson.intro.image} alt="Story" className={styles.storyImage} />
              <audio controls className={styles.audioPlayer}>
                  <source src={currentLesson.intro.audio} type="audio/mpeg" />
              </audio>
              <div className={styles.storyText}>{currentLesson.intro.story}</div>
            </div>
          </div>
        </div>
      )} */}
      {showStory && (
        <div className={styles.modalOverlay} onClick={() => setShowStory(false)}>
          <div className={styles.storyModal} onClick={(e) => e.stopPropagation()}>
            
            <div className={styles.modalHeader}>
              <h3>📖 النص المرجعي</h3>
              <button className={styles.closeModalBtn} onClick={() => setShowStory(false)}>
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <img src={currentLesson.intro.image} alt="Story" className={styles.storyImage} />
              
              {/* المكون الصوتي الجديد */}
              <div className={styles.audioContainer}>
                <div className={styles.audioLabel}>
                  🎧 استمع للنص:
                </div>
                
                {/* هنا عيطنا على المشغل ديالنا */}
                <CustomAudioPlayer audioSrc={currentLesson.intro.audio} />
                
              </div>

              <div className={styles.storyText}>
                <p style={{margin:0}}>{currentLesson.intro.story}</p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
export default Practice;