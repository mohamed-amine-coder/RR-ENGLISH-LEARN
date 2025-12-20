
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle, FaCheckCircle, FaFire, FaUserFriends, FaMicrophoneAlt, FaArrowLeft } from 'react-icons/fa';
import { auth } from '../../Auth/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './Login'; 
import styles from './HeroLanding.module.css';

const slides = [
  { id: 1, img: "/Hello.png" },
  { id: 2, img: "/Msg.png" },
  { id: 3, img: "/Speak.png" },
];

const HomeLanding = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* === اليسار: الهاتف (دليل بصري) === */}
        <div className={styles.visualSide}>
          <div className={styles.phoneFrame}>
            <div className={styles.notch}></div>
            <div className={styles.screen}>
              {slides.map((slide, index) => (
                <img 
                  key={slide.id}
                  src={slide.img} 
                  alt="App Screen" 
                  className={`${styles.slideImg} ${index === activeSlide ? styles.active : ''}`}
                  onError={(e) => e.target.src = "https://placehold.co/400x800/0077ff/ffffff?text=RR+English"}
                />
              ))}
            </div>
            {/* شريط متحرك يشرح الصورة */}
            <div className={styles.floatingCaption}>
              {activeSlide === 0 && "1. فهم القواعد بالدارجة 🧠"}
              {activeSlide === 1 && "2. تمارين ممتعة وتفاعلية 🎮"}
              {activeSlide === 2 && "3. هضر مع ناس بحالك 🗣️"}
            </div>
          </div>
          <div className={styles.blob}></div>
        </div>

        {/* === اليمين: الرسالة القوية (The Hook) === */}
        <div className={styles.contentSide}>
          
          {/* المقارنة الصادمة (The Enemy) */}
          <div className={styles.antiInstitute}>
            <span className={styles.badWay}><FaTimesCircle /> ماشي معهد </span>
            <span className={styles.badWay}><FaTimesCircle /> ماشي حفاظة مملة</span>
            <span className={styles.goodWay}><FaCheckCircle /> أول منصة تفاعلية 100%</span>
          </div>

          <h1 className={styles.title}>
            نسى الطرق القديمة. <br />
            <span className={styles.highlight}>هنا، الإنجليزية ديال بصح.</span>
          </h1>

          <p className={styles.subtitle}>
            لأول مرة فالمغرب، منهجية كتجمع ليك كلشي فبلاصة وحدة:
            <br/>
            <strong>تعلم بالدارجة</strong> + <strong>طبق فالتمارين</strong> + 
            <span className={styles.uniqueValue}> طبق داكشي لي قريتي فمحادثات حقيقية</span> 
            مع متعلم بحالك وأستاذة كتشرف عليكم بجوج.
          </p>

          {/* الدليل على القوة (The Proof) */}
          <div className={styles.powerPoints}>
            <div className={styles.pointItem}>
              <div className={styles.pIcon}><FaFire color="#ff7b00"/></div>
              <div>
                <h4>بدون ملل</h4>
                <p>الدروس مصممة بحال اللعب، باش عمرك تعيا.</p>
              </div>
            </div>
            <div className={styles.pointItem}>
              <div className={styles.pIcon}><FaUserFriends color="#0077ff"/></div>
              <div>
                <h4>شريك النجاح</h4>
                <p>ماشي بوحدك. ديما معاك "Binôme" (شريك) فالحصة.</p>
              </div>
            </div>
            <div className={styles.pointItem}>
              <div className={styles.pIcon}><FaMicrophoneAlt color="#29b864"/></div>
              <div>
                <h4>تكلم وحيد العقدة</h4>
                <p>أستاذة كتسمع وكتصحح، فجو عائلي ومحترم.</p>
              </div>
            </div>
          </div>

          {/* منطقة الدخول (The Door) */}
          <div className={styles.actionArea}>
            {!loading && (
              <>
                {!user ? (
                  <div className={styles.loginBox}>
                    <p className={styles.ctaText}>🔥 جرب الطريقة الجديدة دابا (فابور)</p>
                    <Login />
                  </div>
                ) : (
                  <div className={styles.welcomeBack}>
                    <h3>أهلاً بك مجدداً!</h3>
                    <p>مستعد تزيد تطور مستواك؟</p>
                    <Link to="/lessons/learn" className={styles.resumeBtn}>
                      إكمال التعلم <FaArrowLeft />
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default HomeLanding;