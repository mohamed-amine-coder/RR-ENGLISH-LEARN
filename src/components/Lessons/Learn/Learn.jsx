import { useState } from 'react';
import { lessons } from './LearnData';
import WordViewer from './WordViewer';
import WordQuiz from './WordQuiz';
import SentenceViewer from './SentenceViewer';
import WordWriting from './WordWriting';
import SentenceWriting from './SentenceWriting';
import styles from './Learn.module.css';

export default function Learn() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const currentLesson = lessons[lessonIndex];

  const handleNextStep = () => {
    if (stepIndex < 4) {
      setStepIndex(stepIndex + 1);
    } else {
      setStepIndex(5); // نهاية الدرس، عرض زر "تابع الدرس الموالي"
    }
  };

  const goToNextLesson = () => {
    if (lessonIndex < lessons.length - 1) {
      setLessonIndex(prev => prev + 1); // نزيدو الدرس
      setStepIndex(0); // نرجعو لأول مرحلة
    } else {
      setStepIndex(6); // نهاية جميع الدروس
    }
  };

  return (
    <div className={`${styles.transitionWrapper} ${styles.fadeIn}`}>
      {stepIndex === 0 && <WordViewer lesson={currentLesson} onComplete={handleNextStep} />}
      {stepIndex === 1 && <WordQuiz lesson={currentLesson} onComplete={handleNextStep} />}
      {stepIndex === 2 && <SentenceViewer lesson={currentLesson} onComplete={handleNextStep} />}
      {stepIndex === 3 && <WordWriting lesson={currentLesson} onComplete={handleNextStep} />}
      {stepIndex === 4 && <SentenceWriting lesson={currentLesson} onComplete={handleNextStep} />}

      {stepIndex === 5 && (
        <div className={styles.card}>
          <h2>🎉 كملتي الدرس {lessonIndex + 1}</h2>
          {lessonIndex < lessons.length - 1 ? (
            <button className={styles.nextButton} onClick={goToNextLesson}>
              تابع الدرس {lessonIndex + 2}
            </button>
          ) : (
            <button className={styles.nextButton} onClick={() => setStepIndex(6)}>
              عرض النتيجة النهائية
            </button>
          )}
        </div>
      )}

      {stepIndex === 6 && (
        <div className={styles.card}>
          <h2>🏆 مبروك محمد</h2>
          <p>كملتي جميع الدروس بنجاح. المنصة ديالك غادي تكون عالمية إن شاء الله 🇲🇦</p>
        </div>
      )}
    </div>
  );
}
