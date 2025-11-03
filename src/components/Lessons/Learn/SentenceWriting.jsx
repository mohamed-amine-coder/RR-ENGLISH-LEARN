import { useState } from 'react';
import styles from './Learn.module.css';
import { FaArrowRight, FaPenFancy, FaExchangeAlt } from 'react-icons/fa';

export default function SentenceWriting({ lesson, onComplete }) {
  const sentences = lesson.sentences;
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);

  const current = sentences[index];

  function handleSubmit(e) {
    e.preventDefault();
    const isCorrect = input.trim().toLowerCase() === current.en.toLowerCase();
    setFeedback(isCorrect ? "✅ صحيح!" : `❌ غلط! الجواب هو: ${current.en}`);
  }

  function handleNext() {
    setInput('');
    setFeedback(null);
    if (index < sentences.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  }

  return (
    <div className={`${styles.card} ${styles.slideIn}`}>
      <div className={styles.sentenceHeader}>
        <FaPenFancy className={styles.icon} />
        <h2>كتب الجملة بالإنجليزية</h2>
      </div>

      <div className={styles.sentencePrompt}>
        <FaExchangeAlt className={styles.icon} />
        <p>{current.darija}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formBlock}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب الجملة هنا"
          rows={3}
          className={styles.textarea}
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
