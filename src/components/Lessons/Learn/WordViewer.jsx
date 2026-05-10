// Learn/WordViewer.jsx
import { useState, useEffect } from 'react';
import styles from './Learn.module.css';
import { FaVolumeUp } from 'react-icons/fa';

export default function WordViewer({ lesson, onComplete }) {
  const words = lesson.words;
  const [index, setIndex] = useState(0);
  
  // 1. حالة (State) لتخزين الأصوات الإنجليزية المتاحة
  const [englishVoices, setEnglishVoices] = useState([]);

  // 2. تحميل الأصوات ملي كيتحل المكون (حيت المتصفح كيتعطل باش يجيبهم)
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      
      // نختارو غير الأصوات ديال الإنجليزية (أمريكا أو بريطانيا) لي الجودة ديالهم مقبولة
      // غادي نركزو على الأصوات ديال Google, Microsoft, و Apple (حيت هما لي زوينين)
      const goodVoices = allVoices.filter(v => 
        v.lang.startsWith("en") && 
        (v.name.includes("Google") || v.name.includes("Microsoft") || v.name.includes("Apple") || v.name.includes("Samantha") || v.name.includes("Daniel"))
      );

      // يلا مالقيناش هاد الماركات، نعزلو أي صوت إنجليزي وصافي
      setEnglishVoices(goodVoices.length > 0 ? goodVoices : allVoices.filter(v => v.lang.startsWith("en")));
    };

    loadVoices();
    // هاد السطر ضروري حيت الأصوات كيتشارجاو من بعد ما كيتفتح الموقع
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleSpeak = (text) => {
    // نوقفو أي صوت كان خدام قبل
    window.speechSynthesis.cancel(); 

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.85; // 0.85 أحسن من 0.7 باش مايجيش الصوت ثقيل وممل

    // 3. نختارو صوت عشوائي من الليستة باش كل مرة يبان صوت مبدل (مرة راجل مرة مرا)
    if (englishVoices.length > 0) {
      const randomVoice = englishVoices[Math.floor(Math.random() * englishVoices.length)];
      utter.voice = randomVoice;
    }

    window.speechSynthesis.speak(utter);
  };

  const handleNext = () => {
    if (index < words.length - 1) setIndex(index + 1);
    else onComplete();
  };

  const word = words[index];

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>كلمات جديدة</div>
        
        <div className={styles.speakerBtn} onClick={() => handleSpeak(word.en)}>
           <FaVolumeUp />
        </div>
        
        <h1 className={styles.mainWord}>{word.en}</h1>
        <h2 className={styles.subWord}>{word.darija}</h2>
        <p style={{color: '#a0aab5', marginTop: '20px', fontWeight: 'bold'}}>النطق: /{word.pronunciation}/</p>
      </div>

      <div className={styles.footerArea}>
        <div className={styles.footerContent} style={{justifyContent: 'center'}}>
          <button 
            className={styles.actionButton} 
            onClick={handleNext}
            style={{ width: '100%', maxWidth: '300px' }}
          >
            تابع
          </button>
        </div>
      </div>
    </>
  );
}