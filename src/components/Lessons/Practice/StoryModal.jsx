// Practice/StoryModal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./Practice.module.css";
import CustomAudioPlayer from "./CustomAudioPlayer";

const StoryModal = ({ intro, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.storyModal} onClick={(e) => e.stopPropagation()}>
        
        {/* رأس المودال (Header) */}
        <div className={styles.modalHeader}>
          <h3>📖 النص المرجعي</h3>
          <button className={styles.closeModalBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        {/* محتوى المودال (Body) */}
        <div className={styles.modalBody}>
          <img src={intro.image} alt="Story" className={styles.storyImage} />
          
          <div className={styles.audioContainer}>
            <div className={styles.audioLabel}>🎧 استمع للنص:</div>
            <CustomAudioPlayer audioSrc={intro.audio} />
          </div>

          <div className={styles.storyText}>
            <p style={{ margin: 0 }}>{intro.story}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoryModal;