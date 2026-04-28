// // Practice.jsx
// import React, { useState, useEffect } from "react"; 
// import PracticeIntro from "./PracticeIntro";
// import PracticeQuiz from "./PracticeQuiz";
// import PracticeWrite from "./PracticeWrite";
// import PracticeTF from "./PracticeTF";
// import PracticeResult from "./PracticeResult";
// import { lessonsData } from "./PracticeData";
// import styles from "./Practice.module.css";
// import UpgradePlan from "../../landing/UpgradePlan"; 

// import { db, auth } from "../../../Auth/firebaseConfig"; 
// import { doc, getDoc, updateDoc } from "firebase/firestore"; 
// import { onAuthStateChanged } from "firebase/auth";
// import { FaTimes, FaBookOpen } from "react-icons/fa"; // أيقونات جديدة

// const Practice = () => {
//   const [isLoading, setIsLoading] = useState(true); 
//   const [lessonIndex, setLessonIndex] = useState(0);
//   const [step, setStep] = useState(0);
//   const [score, setScore] = useState(0);
//   const [introDone, setIntroDone] = useState(false);
//   const [firebaseUser, setFirebaseUser] = useState(null);
//   const [userRole, setUserRole] = useState('free');
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [showStory, setShowStory] = useState(false); // 🆕 للتحكم في نافذة القصة

//   const currentLesson = lessonsData[lessonIndex];
  
//   // حساب عدد التمارين الفعلي (بدون الانترو والنتيجة)
//   const totalExercises = currentLesson.quiz.length + currentLesson.write.length + currentLesson.tf.length;
  
//   const FREE_LESSONS_LIMIT = 5; 
//   const userId = firebaseUser?.uid || "fallback_id"; 

//   const handleNextStep = () => setStep(step + 1);
//   const handleAnswer = () => setScore(score + 1);

//   const handleNextLesson = () => {
//     const nextIndex = lessonIndex + 1;

//     // Check Paywall
//     if (userRole === 'free' && nextIndex >= FREE_LESSONS_LIMIT) {
//       setShowUpgrade(true);
//       return;
//     }

//     if (lessonIndex + 1 < lessonsData.length) {
//       setLessonIndex(lessonIndex + 1);
//       setStep(0);
//       setScore(0);
//       setIntroDone(false);
//       setShowUpgrade(false);
//     } else {
//       alert("لقد أكملت جميع الدروس!");
//     }
//   };

//   // Firebase Logic
//   const saveProgress = async () => {
//       if (isLoading || userId === "fallback_id") return; 
//       try {
//         const docRef = doc(db, "users", userId); 
//         await updateDoc(docRef, { lastLessonPractice: lessonIndex });
//       } catch (error) { console.error("Error saving progress: ", error); }
//   };

//   const loadProgress = async (currentUserId) => {
//     if (!currentUserId || currentUserId === "fallback_id") { setIsLoading(false); return; }
//     try {
//       const docRef = doc(db, "users", currentUserId); 
//       const docSnap = await getDoc(docRef); 
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const role = data.role || 'free';
//         setUserRole(role);
//         const lastLesson = data.lastLessonPractice; 
//         if (typeof lastLesson === 'number' && lastLesson > 0) { 
//            if (role === 'free' && lastLesson >= FREE_LESSONS_LIMIT) {
//              setLessonIndex(FREE_LESSONS_LIMIT - 1); 
//            } else {
//              setLessonIndex(lastLesson);
//            }
//            setStep(0); 
//            setIntroDone(true); 
//         }
//       } 
//       setIsLoading(false); 
//     } catch (error) { console.error("Error loading", error); setIsLoading(false); }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//         setFirebaseUser(currentUser);
//         if (currentUser) loadProgress(currentUser.uid); else setIsLoading(false);
//     });
//     return () => unsubscribe(); 
//   }, []);

//   useEffect(() => { saveProgress(); }, [lessonIndex, step, userId]); 

//   // --- RENDER ---

//   if (isLoading) return <div className={styles.container}>جاري التحميل...</div>;
//   if (showUpgrade) return <UpgradePlan />;
//   if (!firebaseUser) return <div className={styles.container}>المرجو تسجيل الدخول</div>;

//   return (
//     <div className={styles.container}>
      
//       {/* 1. الشريط العلوي (Top Bar) */}
//       <div className={styles.topBar}>
//         <button className={styles.closeButton}><FaTimes /></button>
        
//         {/* Progress Bar */}
//         <div className={styles.progressContainer}>
//           <div className={styles.progressFill} style={{ width: introDone ? `${((step + 1) / 4) * 100}%` : '5%' }}></div>
//         </div>

//         {/* زر إظهار القصة (يظهر فقط أثناء التمارين) */}
//         {introDone && step < 3 && (
//           <button 
//             className={styles.storyToggleBtn} 
//             onClick={() => setShowStory(true)}
//           >
//             <FaBookOpen /> النص
//           </button>
//         )}
//       </div>

//       {/* 2. البطاقة الرئيسية */}
//       <div className={styles.practiceCard}>
//         {!introDone ? (
//           <PracticeIntro
//             title={currentLesson.intro.title}
//             story={currentLesson.intro.story}
//             image={currentLesson.intro.image}
//             audio={currentLesson.intro.audio}
//             onNext={() => setIntroDone(true)}
//             showButton={true}
//           />
//         ) : (
//           <>
//             {step === 0 && <PracticeQuiz questions={currentLesson.quiz} onNext={handleNextStep} onAnswer={handleAnswer} />}
//             {step === 1 && <PracticeWrite questions={currentLesson.write} onNext={handleNextStep} onAnswer={handleAnswer} />}
//             {step === 2 && <PracticeTF questions={currentLesson.tf} onNext={handleNextStep} onAnswer={handleAnswer} />}
//             {step === 3 && <PracticeResult score={score} total={totalExercises} onNext={handleNextLesson} />}
//           </>
//         )}
//       </div>

//       {/* 3. نافذة القصة المنبثقة (Modal) */}
//       {/* {showStory && (
//         <div className={styles.modalOverlay} onClick={() => setShowStory(false)}>
//           <div className={styles.storyModal} onClick={(e) => e.stopPropagation()}>
//             <div className={styles.modalHeader}>
//               <h3>📖 النص المرجعي</h3>
//               <button className={styles.closeModalBtn} onClick={() => setShowStory(false)}>
//                 <FaTimes />
//               </button>
//             </div>
            
//             <div className={styles.modalBody}>
//               <img 
//                 src={currentLesson.intro.image} 
//                 alt="Story" 
//                 style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px'}} 
//               />
//               <p>{currentLesson.intro.story}</p>
              
//               <div style={{marginTop: '20px', width: '100%'}}>
//                  <audio controls style={{width: '100%'}}>
//                     <source src={currentLesson.intro.audio} type="audio/mpeg" />
//                  </audio>
//               </div>
//             </div>
//           </div>
//         </div>
//       )} */}

//     {showStory && (
//       <div className={styles.modalOverlay} onClick={() => setShowStory(false)}>
//         <div className={styles.storyModal} onClick={(e) => e.stopPropagation()}>
//           <div className={styles.modalHeader}>
//             <h3>📖 النص المرجعي</h3>
//             <button className={styles.closeModalBtn} onClick={() => setShowStory(false)}>
//               <FaTimes />
//             </button>
//           </div>
          
//           <div className={styles.modalBody}>
//             <img src={currentLesson.intro.image} alt="Story" className={styles.storyImage} />
            
//             {/* الصوت في المودال */}
//             <audio controls className={styles.audioPlayer}>
//                 <source src={currentLesson.intro.audio} type="audio/mpeg" />
//             </audio>

//             <div className={styles.storyText}>
//               <p style={{margin:0}}>{currentLesson.intro.story}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )}

//     </div>
//   );
// };

// export default Practice;

import React, { useState, useEffect } from "react"; 
import PracticeIntro from "./PracticeIntro";
import PracticeQuiz from "./PracticeQuiz";
import PracticeWrite from "./PracticeWrite";
import PracticeTF from "./PracticeTF";
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
  
  const FREE_LESSONS_LIMIT = 5; 

  const fetchLessons = async () => {
    try {
      const q = query(collection(db, "practice_lessons"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      
      const fetchedLessons = [];
      querySnapshot.forEach((doc) => {
        fetchedLessons.push(doc.data());
      });
      
      setLessons(fetchedLessons);
    } catch (error) {
      console.error("❌ Error fetching practice lessons: ", error);
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
        
        const lastLesson = data.lastLessonPractice; 
        if (typeof lastLesson === 'number' && lastLesson > 0) { 
           if (role === 'free' && lastLesson >= FREE_LESSONS_LIMIT) {
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
      } catch (error) { 
        console.error("Error saving progress: ", error); 
      }
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

  if (isLoading || (firebaseUser && lessons.length === 0)) return <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', fontWeight: '900' }}>جاري التحميل...</div>;
  if (showUpgrade) return <UpgradePlan />;
  if (!firebaseUser) return <div className={styles.container}>المرجو تسجيل الدخول</div>;
  if (!currentLesson) return <div className={styles.container}>خطأ: لم يتم العثور على التمرين.</div>;

  return (
    <div className={styles.container}>
      
      <div className={styles.topBar}>
        <button className={styles.closeButton}><FaTimes /></button>
        
        <div className={styles.progressContainer}>
          <div className={styles.progressFill} style={{ width: introDone ? `${((step + 1) / 4) * 100}%` : '5%' }}></div>
        </div>

        {introDone && step < 3 && (
          <button 
            className={styles.storyToggleBtn} 
            onClick={() => setShowStory(true)}
          >
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
            showButton={true}
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
              <img src={currentLesson.intro.image} alt="Story" className={styles.storyImage} style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px'}} />
              
              <audio controls className={styles.audioPlayer} style={{width: '100%', marginBottom: '15px'}}>
                  <source src={currentLesson.intro.audio} type="audio/mpeg" />
              </audio>

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