import { useState } from 'react';
import styles from './Learn.module.css';
import { FaArrowRight, FaBookOpen, FaExchangeAlt, FaVolumeUp } from 'react-icons/fa';

export default function WordViewer({ lesson, onComplete }) {
  const words = lesson.words;
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < words.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  };

  const word = words[index];

  return (
    <div className={`${styles.card} ${styles.slideIn}`}>
      <div className={styles.wordHeader}>
        <FaBookOpen className={styles.icon} />
        <h2>{word.en}</h2>
      </div>

      <div className={styles.wordDetails}>
        <div className={styles.detailRow}>
          <FaExchangeAlt className={styles.icon} />
          <span>{word.darija}</span>
        </div>
        <div className={styles.detailRow}>
          <FaVolumeUp className={styles.icon} />
          <span className={styles.pronunciation}>{word.pronunciation}</span>
        </div>
      </div>

      <button className={styles.nextButton} onClick={handleNext}>
        التالي <FaArrowRight />
      </button>
    </div>
  );
}
