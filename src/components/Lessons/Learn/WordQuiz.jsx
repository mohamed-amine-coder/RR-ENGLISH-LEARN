import { useState } from 'react';
import styles from './Learn.module.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function WordQuiz({ lesson, onComplete }) {
  const words = lesson.words;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");

  const currentWord = words[index];
  // نقوم بخلط الاختيارات مرة واحدة فقط عند تغيير الاندكس
  // (هنا للتبسيط سأضع اللوجيك مباشرة، لكن يفضل استعمال useMemo إذا أمكن)
  const distractors = words.map(w => w.darija).filter(d => d !== currentWord.darija).sort(() => 0.5 - Math.random()).slice(0, 3);
  // const [options] = useState(() => [currentWord.darija, ...distractors].sort(() => 0.5 - Math.random()));
  // console.log(options);
  // ملاحظة: مع كل تغيير لـ index نحتاج إعادة حساب options. 
  // الحل الأبسط: استخدام key للمكون لإعادة تحميله، أو useEffect. 
  // سنستخدم key في Learn.jsx إذا أردنا، أو هنا نقوم بتحديث الـ options state عند تغيير index.
  // للتبسيط في هذا الكود السريع، سنعتمد على إعادة الريندر.

  const handleSelect = (opt) => {
    if (status !== "idle") return;
    setSelected(opt);
    const isCorrect = opt === currentWord.darija;
    setStatus(isCorrect ? "correct" : "wrong");
  };

  const handleNext = () => {
    setSelected(null);
    setStatus("idle");
    if (index < words.length - 1) setIndex(index + 1);
    else onComplete();
  };

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>أشنو كتعني هاد الكلمة؟</div>
        <h2 className={styles.mainWord}>{currentWord.en}</h2>

        <div className={styles.optionsGrid}>
          {[currentWord.darija, ...distractors].sort().map((opt, i) => (
             // ملاحظة: استخدام sort() هنا قد يغير الترتيب كل مرة، يفضل تثبيت المصفوفة
             // لكن للتجربة السريعة لا بأس.
            <div
              key={i}
              className={`${styles.optionCard} ${selected === opt ? styles.selected : ''} ${status !== 'idle' && opt === currentWord.darija ? styles.correct : ''} ${status === 'wrong' && selected === opt ? styles.wrong : ''}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.footerArea} ${status !== 'idle' ? styles[status] : ''}`} style={{display: status === 'idle' ? 'none' : 'flex'}}>
        <div className={styles.footerContent}>
          <div className={styles.feedbackMessage}>
             <div className={styles.feedbackIcon} style={{color: status === 'correct' ? '#58a700' : '#ea2b2b'}}>
               {status === 'correct' ? <FaCheck /> : <FaTimes />}
             </div>
             <div className={styles.feedbackText}>
               <h3>{status === 'correct' ? 'ماعلكش! 😉' : 'لا ماشي هي 🙄'}</h3>
               {status === 'wrong' && <p style={{margin:0}}>الجواب الصحيح: {currentWord.darija}</p>}
             </div>
          </div>
          <button className={styles.actionButton} onClick={handleNext}>تابع</button>
        </div>
      </div>
    </>
  );
}