// import { useState, useRef } from 'react';
// import styles from './Learn.module.css';
// import { FaCheck, FaTimes } from 'react-icons/fa';

// export default function WordWriting({ lesson, onComplete }) {
//   const words = lesson.words;
//   const [index, setIndex] = useState(0);
//   const [input, setInput] = useState('');
//   const [status, setStatus] = useState("idle");
//   const [isShaking, setIsShaking] = useState(false);
//   const inputRef = useRef(null);

//   const currentWord = words[index];

//   const handleCheck = () => {
//     if (!input.trim()) return;
//     const isCorrect = input.trim().toLowerCase() === currentWord.en.toLowerCase();
    
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
//     if (index < words.length - 1) {
//       setIndex(index + 1);
//       setTimeout(() => inputRef.current?.focus(), 100);
//     } else {
//       onComplete();
//     }
//   };

//   return (
//     <>
//       <div className={styles.cardBody}>
//         <div className={styles.instructionTitle}>اكتب الكلمة بالإنجليزية</div>
//         <h2 className={styles.subWord} style={{fontSize: '2rem'}}>{currentWord.darija}</h2>
        
//         <input
//           ref={inputRef}
//           type="text"
//           className={`${styles.writeInput} ${isShaking ? styles.shake : ''}`}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type in English"
//           disabled={status === "correct"}
//           onKeyDown={(e) => e.key === 'Enter' && (status === 'idle' ? handleCheck() : handleNext())}
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
//                  <h3>{status === 'correct' ? 'ممتاز!' : 'الجواب الصحيح:'}</h3>
//                  {status === 'wrong' && <p style={{margin:0, fontWeight:'bold', direction:'ltr'}}>{currentWord.en}</p>}
//               </div>
//             </div>
//           )}
          
//           {status === 'idle' || status === 'wrong' ? (
//              <button className={styles.actionButton} onClick={status === 'wrong' ? handleNext : handleCheck}>
//                {status === 'wrong' ? 'تابع' : 'تحقق'}
//              </button>
//           ) : (
//              <button className={styles.actionButton} onClick={handleNext}>تابع</button>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import styles from './Learn.module.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function WordWriting({ lesson, onComplete }) {
  const words = lesson.words;
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState("idle");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);

  const currentWord = words[index];

  useEffect(() => {
    inputRef.current?.focus();
  }, [index]);

  const handleCheck = () => {
    if (!input.trim()) return;
    const isCorrect = input.trim().toLowerCase() === currentWord.en.toLowerCase();
    
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
    if (index < words.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  };

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>اكتب الكلمة بالإنجليزية</div>
        <h2 className={styles.subWord}>{currentWord.darija}</h2>
        
        <input
          ref={inputRef}
          type="text"
          className={`${styles.writeInput} ${isShaking ? styles.shake : ''}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type in English"
          disabled={status === "correct"}
          onKeyDown={(e) => e.key === 'Enter' && (status === 'idle' ? handleCheck() : handleNext())}
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
                 {status === 'wrong' && <p>{currentWord.en}</p>}
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