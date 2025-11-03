import { useState } from 'react';
import styles from './Learn.module.css';
import { FaArrowRight, FaPen, FaExchangeAlt } from 'react-icons/fa';

export default function WordWriting({ lesson, onComplete }) {
  const words = lesson.words;
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);

  const currentWord = words[index];

  function handleSubmit(e) {
    e.preventDefault();
    const isCorrect = input.trim().toLowerCase() === currentWord.en.toLowerCase();
    setFeedback(isCorrect ? "✅ صحيح!" : `❌ غلط! الجواب هو: ${currentWord.en}`);
  }

  function handleNext() {
    setInput('');
    setFeedback(null);
    if (index < words.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  }

  return (
    <div className={`${styles.card} ${styles.slideIn}`}>
      <div className={styles.wordHeader}>
        <FaPen className={styles.icon} />
        <h2>كتب الكلمة بالإنجليزية</h2>
      </div>

      <div className={styles.wordPrompt}>
        <FaExchangeAlt className={styles.icon} />
        <p>{currentWord.darija}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formBlock}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب هنا"
          className={styles.inputField}
        />
        <button type="submit" disabled={!!feedback} className={styles.checkButton}>
          تحقق
        </button>
      </form>

      {feedback && <p className={styles.feedback}>{feedback}</p>}
      {feedback && (
        <button className={styles.nextButton} onClick={handleNext}>
          التالي <FaArrowRight />
        </button>
      )}
    </div>
  );
}
