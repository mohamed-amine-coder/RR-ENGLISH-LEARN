import { useState } from 'react';
import styles from './Learn.module.css';
import { FaArrowRight, FaQuestionCircle } from 'react-icons/fa';

export default function WordQuiz({ lesson, onComplete }) {
  const words = lesson.words;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const currentWord = words[index];

  const options = shuffle([
    currentWord.darija,
    ...getRandomDistractors(words, currentWord.darija),
  ]);

  function handleSelect(option) {
    setSelected(option);
    setFeedback(option === currentWord.darija ? "✅ صحيح!" : "❌ غلط!");
  }

  function handleNext() {
    setSelected(null);
    setFeedback(null);
    if (index < words.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  }

  return (
    <div className={`${styles.card} ${styles.slideIn}`}>
      <div className={styles.quizHeader}>
        {/* <FaQuestionCircle className={styles.icon} /> */}
        <h2 style={{direction: "rtl"}}>شنو كتعني <br /> <strong>{currentWord.en}</strong></h2>
      </div>

      <ul className={styles.options}>
        {options.map((opt, i) => (
          <li key={i} className={styles.optionItem}>
            <button
              className={`${styles.optionButton} ${selected === opt ? styles.selected : ''}`}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>

      {feedback && <p className={styles.feedback}>{feedback}</p>}
      {selected && (
        <button className={styles.nextButton} onClick={handleNext}>
          التالي <FaArrowRight />
        </button>
      )}
    </div>
  );
}

function getRandomDistractors(words, correct) {
  const distractors = words
    .map(w => w.darija)
    .filter(d => d !== correct);
  return shuffle(distractors).slice(0, 3);
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
