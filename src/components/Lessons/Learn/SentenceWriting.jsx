// import { useState } from 'react';
// import styles from './Learn.module.css';
// import { FaCheck, FaTimes } from 'react-icons/fa';

// export default function SentenceWriting({ lesson, onComplete }) {
//   const sentences = lesson.sentences;
//   const [index, setIndex] = useState(0);
//   const [input, setInput] = useState('');
//   const [status, setStatus] = useState("idle");
//   const [isShaking, setIsShaking] = useState(false);

//   const current = sentences[index];

//   const cleanText = (t) => t.trim().toLowerCase().replace(/[.,?!]/g, "");

//   const handleCheck = () => {
//     if (!input.trim()) return;
//     const isCorrect = cleanText(input) === cleanText(current.en);
    
//     if (isCorrect) {
//       setStatus("correct");
//     } else {
//       setStatus("wrong");
//       setIsShaking(true);
//       setTimeout(() => setIsShaking(false), 500);
//     }
//   };

//   const handleNext = () => {
//     setInput('');
//     setStatus("idle");
//     if (index < sentences.length - 1) {
//       setIndex(index + 1);
//     } else {
//       onComplete();
//     }
//   };

//   return (
//     <>
//       <div className={styles.cardBody}>
//         <div className={styles.instructionTitle}>ترجم الجملة</div>
//         <h2 className={styles.subWord} style={{marginBottom: '30px'}}>{current.darija}</h2>

//         <textarea
//           className={`${styles.writeTextarea} ${isShaking ? styles.shake : ''}`}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type the sentence in English..."
//           disabled={status === "correct"}
//         />
//       </div>

//       <div className={`${styles.footerArea} ${status !== 'idle' ? styles[status] : ''}`}>
//         <div className={styles.footerContent}>
//           {status !== 'idle' && (
//             <div className={styles.feedbackMessage}>
//               <div className={styles.feedbackIcon} style={{color: status === 'correct' ? '#58a700' : '#ea2b2b'}}>
//                  {status === 'correct' ? <FaCheck /> : <FaTimes />}
//               </div>
//               <div className={styles.feedbackText}>
//                  <h3>{status === 'correct' ? 'صحيح!' : 'الجواب:'}</h3>
//                  {status === 'wrong' && <p style={{margin:0, direction:'ltr'}}>{current.en}</p>}
//               </div>
//             </div>
//           )}
          
//           <button 
//             className={styles.actionButton} 
//             onClick={status === 'wrong' || status === 'correct' ? handleNext : handleCheck}
//           >
//             {status === 'wrong' || status === 'correct' ? 'تابع' : 'تحقق'}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import styles from './Learn.module.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function SentenceWriting({ lesson, onComplete }) {
  const sentences = lesson.sentences;
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState("idle");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);

  const current = sentences[index];

  useEffect(() => {
    inputRef.current?.focus();
  }, [index]);

  const cleanText = (t) => t.trim().toLowerCase().replace(/[.,?!]/g, "");

  const handleCheck = () => {
    if (!input.trim()) return;
    const isCorrect = cleanText(input) === cleanText(current.en);
    
    if (isCorrect) {
      setStatus("correct");
    } else {
      setStatus("wrong");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleNext = () => {
    setInput('');
    setStatus("idle");
    if (index < sentences.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  };

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>ترجم الجملة</div>
        <h2 className={styles.subWord} style={{marginBottom: '30px'}}>{current.darija}</h2>

        <textarea
          ref={inputRef}
          className={`${styles.writeTextarea} ${isShaking ? styles.shake : ''}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type the sentence in English..."
          disabled={status === "correct"}
        />
      </div>

      <div className={`${styles.footerArea} ${status !== 'idle' ? styles[status] : ''}`}>
        <div className={styles.footerContent}>
          {status !== 'idle' ? (
            <div className={styles.feedbackMessage}>
              <div className={styles.feedbackIcon} style={{color: status === 'correct' ? '#58a700' : '#ea2b2b'}}>
                 {status === 'correct' ? <FaCheck /> : <FaTimes />}
              </div>
              <div className={styles.feedbackText}>
                 <h3>{status === 'correct' ? 'عمل ممتاز!' : 'الجواب الصحيح:'}</h3>
                 {status === 'wrong' && <p>{current.en}</p>}
              </div>
            </div>
          ) : <div />}
          
          <button 
            className={`${styles.actionButton} ${status === 'wrong' ? styles.wrongState : ''}`} 
            onClick={status === 'idle' ? handleCheck : handleNext}
            disabled={status === 'idle' && !input.trim()}
          >
            {status === 'idle' ? 'تحقق' : 'تابع'}
          </button>
        </div>
      </div>
    </>
  );
}