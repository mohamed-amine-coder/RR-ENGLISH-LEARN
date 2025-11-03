import styles from './Learn.module.css';
import { FaArrowRight, FaQuoteRight } from 'react-icons/fa';

export default function SentenceViewer({ lesson, onComplete }) {
  const sentences = lesson.sentences;

  return (
    <div className={`${styles.card} ${styles.slideIn}`}>
      <div className={styles.sentenceHeader}>
        <FaQuoteRight className={styles.icon} />
        <h2>جمل تطبيقية</h2>
      </div>

      <div className={styles.sentenceList}>
        {sentences.map((s, i) => (
          <div key={i} className={styles.sentenceBlock}>
            <p><strong>🇬🇧 :</strong> {s.en}</p>
            <p><strong>🇲🇦 :</strong> {s.darija}</p>
          </div>
        ))}
      </div>

      <button className={styles.nextButton} onClick={onComplete}>
        التالي <FaArrowRight />
      </button>
    </div>
  );
}
