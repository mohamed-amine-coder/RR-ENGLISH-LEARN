import React, { useState } from "react";
import PracticeIntro from "./PracticeIntro";
import PracticeQuiz from "./PracticeQuiz";
import PracticeWrite from "./PracticeWrite";
import PracticeTF from "./PracticeTF";
import PracticeResult from "./PracticeResult";
import PracticeProgress from "./PracticeProgress";
import { lessonsData } from "./PracticeData";
import styles from "./Practice.module.css";

const Practice = () => {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [introDone, setIntroDone] = useState(false); // ✅ state جديد

  const currentLesson = lessonsData[lessonIndex];
  const totalSteps = 5; // Quiz + Write + TF + Result + counted intro step

  const handleNextStep = () => setStep(step + 1);
  const handleAnswer = () => setScore(score + 1);

  const handleNextLesson = () => {
    if (lessonIndex + 1 < lessonsData.length) {
      setLessonIndex(lessonIndex + 1);
      setStep(0);
      setScore(0);
      setIntroDone(false); // reset intro for next lesson
    } else {
      alert("لقد أكملت جميع الدروس!");
    }
  };

  return (
    <div className={styles.container}>
      {/* Intro ثابت */}
      <div className={styles.introSticky}>
        
        <PracticeIntro
          title={currentLesson.intro.title}
          story={currentLesson.intro.story}
          image={currentLesson.intro.image}
          audio={currentLesson.intro.audio}
          onNext={() => setIntroDone(true)} // ✅ زر سيظهر مرة واحدة
          showButton={!introDone} // ✅ نخفيه بعد الضغط
        />
      </div>
      <br />
        <PracticeProgress step={step} totalSteps={totalSteps} />

      <div className={styles.lessonContent}>
        {introDone && step === 0 && (
          <PracticeQuiz
            questions={currentLesson.quiz}
            onNext={handleNextStep}
            onAnswer={handleAnswer}
          />
        )}
        {step === 1 && (
          <PracticeWrite
            questions={currentLesson.write}
            onNext={handleNextStep}
            onAnswer={handleAnswer}
          />
        )}
        {step === 2 && (
          <PracticeTF
            questions={currentLesson.tf}
            onNext={handleNextStep}
            onAnswer={handleAnswer}
          />
        )}
        {step === 3 && (
          <PracticeResult
            score={score}
            total={currentLesson.quiz.length + currentLesson.write.length + currentLesson.tf.length}
            onNext={handleNextLesson}
          />
        )}
      </div>
    </div>
  );
};

export default Practice;
