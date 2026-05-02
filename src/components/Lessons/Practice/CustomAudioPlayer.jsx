import React, { useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import styles from './Practice.module.css';

const CustomAudioPlayer = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // تشغيل أو إيقاف الصوت
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // تحديث الشريط ملي كيكون الصوت خدام
  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration) {
      setProgress((current / duration) * 100);
    }
  };

  // تقديم وتأخير الصوت من الشريط
  const handleSeek = (e) => {
    const seekValue = e.target.value;
    const seekTo = (seekValue / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTo;
    setProgress(seekValue);
  };

  // ملي يسالي الصوت، يرجع زر التشغيل
  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className={styles.customPlayer}>
      {/* المكون الأصلي مخفي */}
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleEnded} 
      />
      
      {/* الزر ديالنا */}
      <button className={styles.playBtn} onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay style={{marginLeft: '4px'}} />}
      </button>

      {/* الشريط ديالنا */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={progress} 
        onChange={handleSeek} 
        className={styles.progressBar} 
      />
    </div>
  );
};

export default CustomAudioPlayer;