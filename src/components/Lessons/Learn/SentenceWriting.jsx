// Learn/SentenceWriting.jsx
import { useState, useRef, useEffect } from 'react';
import styles from './Learn.module.css';
import { FaPen } from 'react-icons/fa'; // أيقونة القلم
import FeedbackFooter from './FeedbackFooter'; 

export default function SentenceWriting({ lesson, onComplete }) {
  // 👈 هنا صلحنا المشكل، ولينا كنجيبو الجمل (sentences) ماشي الكلمات
  const sentences = lesson.sentences; 
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState("idle");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);

  const currentSentence = sentences[index];

  useEffect(() => {
    inputRef.current?.focus();
  }, [index]);

  const handleCheck = () => {
    if (!input.trim()) return;
    
    // كنقارنو الجملة اللي دخل المستخدم مع الجملة الصحيحة (حيّدنا حساسية الحروف الكبيرة/الصغيرة)
    const isCorrect = input.trim().toLowerCase() === currentSentence.en.toLowerCase();
    
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
        <div className={styles.instructionTitle}>ترجم هاد الجملة للإنجليزية ✍️</div>
        
        {/* 👈 البطاقة الجديدة بستايل أخضر مزرق فاتح (Teal) باش تميز على الكلمات */}
        <div className={styles.wordBox} style={{
          background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)', 
          borderColor: '#99f6e4', 
          boxShadow: '0 8px 25px rgba(20, 184, 166, 0.15)'
        }}>
          <FaPen className={styles.wordBoxIconBg} style={{color: 'rgba(153, 246, 228, 0.5)'}} />
          
          <div className={styles.wordBoxContent}>
            <h2 className={styles.subWord} style={{fontSize: '2rem', color: '#0f766e', marginBottom: '30px', fontWeight: '800'}}>
              {currentSentence.darija}
            </h2>
            
            {/* استعملنا Textarea حيت الجمل كيكونو طوال */}
            <textarea
              ref={inputRef}
              className={`${styles.writeTextarea} ${isShaking ? styles.shake : ''}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="in english ..."
              disabled={status === "correct"}
              onKeyDown={(e) => {
                // هاد الكود كيخلي ملي تكليكي على Enter يدير تحقق بلا ماينزل سطر جديد
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  status === 'idle' ? handleCheck() : handleNext();
                }
              }}
              style={{
                borderColor: status === 'idle' ? '#5eead4' : '', 
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
              }}
            />
          </div>
        </div>
      </div>

      <FeedbackFooter 
        status={status}
        correctAnswer={currentSentence.en}
        onCheck={handleCheck}
        onNext={handleNext}
        disabledCheck={!input.trim()}
      />
    </>
  );
}