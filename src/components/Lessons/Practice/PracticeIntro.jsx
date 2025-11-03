import React from "react";
import styles from "./Practice.module.css";
import { FaArrowRight } from "react-icons/fa";

const PracticeIntro = ({ title, story, image, audio, onNext, showButton }) => {
  return (
    <div className={styles.intro}>
        <div className={styles.title}>
          <h3>{title}</h3>
        </div>
        
          <div className={styles.text_element}>

            <div className={styles.story}>
              <p>{story}</p>
              <div className={styles.audio}>
                <audio controls>
                  <source src={audio} type="audio/mpeg" />
                </audio>
              </div>
            </div>

              <div className={styles.image}>
                <img src={image} alt="Story visual" />
              </div>
        </div>
      {showButton && ( // ✅ زر يظهر فقط إذا showButton = true
        <button className={styles.nextBtn} onClick={onNext}>
          التالي <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default PracticeIntro;
