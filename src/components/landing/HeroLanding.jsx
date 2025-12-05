// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBookOpen, FaDumbbell, FaHeadset, FaUserGraduate, FaArrowLeft } from 'react-icons/fa';
// import { auth } from '../../Auth/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
// import Login from './Login'; 
// import styles from './HeroLanding.module.css';

// // صور توضيحية للمراحل (تتغير تلقائياً)
// const slides = [
//   { id: 1, img: "/Hello.png" },
//   { id: 2, img: "/Msg.png" },
//   { id: 3, img: "/Speak.png" },
// ];

// const HomeLanding = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeSlide, setActiveSlide] = useState(0);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (u) => {
//       setUser(u);
//       setLoading(false);
//     });
    
//     // تغيير الصورة كل 3 ثواني
//     const interval = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % slides.length);
//     }, 3000);

//     return () => {
//       unsubscribe();
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
        
//         {/* === اليسار: صورة المنصة (تتحرك) === */}
//         <div className={styles.visualSide}>
//           <div className={styles.phoneFrame}>
//             <div className={styles.notch}></div>
//             <div className={styles.screen}>
//               {slides.map((slide, index) => (
//                 <img 
//                   key={slide.id}
//                   src={slide.img} 
//                   alt="App Screen" 
//                   className={`${styles.slideImg} ${index === activeSlide ? styles.active : ''}`}
//                   onError={(e) => e.target.src = "https://placehold.co/400x800/0077ff/ffffff?text=RR+ENGLISH"}
//                 />
//               ))}
//             </div>
//           </div>
//           {/* دائرة خلفية جمالية */}
//           <div className={styles.blob}></div>
//         </div>

//         {/* === اليمين: الترحيب + الخطوات + الدخول === */}
//         <div className={styles.contentSide}>
          
//           <div className={styles.header}>
//             <span className={styles.badge}>🚀 المنصة المغربية رقم #1</span>
//             <h1 className={styles.title}>
//               الإنجليزية ساهلة... <br />
//               <span className={styles.highlight}>يلا قريتيها بذكاء.</span>
//             </h1>
//             <p className={styles.subtitle}>
//               واخا تكون ما كتعرف والو فالانجليزية، أو عندك مشكل فالقراية <br />
//               منهجية <strong>RR ENGLISH</strong> مصممة للمبتدئين باش يتعلمو خطوة بخطوة، وبلا تعقيد.
//             </p>
//           </div>

//           {/* الخطوات الثلاث (مرتبة ونظيفة) */}
//           <div className={styles.stepsList}>
            
//             {/* Step 1 */}
//             <div className={`${styles.stepCard} ${activeSlide === 0 ? styles.highlightStep : ''}`}>
//               <div className={styles.iconBox} style={{background: '#e3f2fd', color: '#1976d2'}}>
//                 <FaBookOpen />
//               </div>
//               <div className={styles.stepText}>
//                 <h3>1. Learn (تعلم)</h3>
//                 <p>بدا من لاباز. تعلم مفردات وجمل جديدة بشرح مبسط بالدارجة.</p>
//               </div>
//             </div>

//             {/* Step 2 */}
//             <div className={`${styles.stepCard} ${activeSlide === 1 ? styles.highlightStep : ''}`}>
//               <div className={styles.iconBox} style={{background: '#fff3e0', color: '#f57c00'}}>
//                 <FaDumbbell />
//               </div>
//               <div className={styles.stepText}>
//                 <h3>2. Practice (طبق)</h3>
//                 <p>رسخ المعلومة عبر نصوص، تسجيلات، وكويزات تفاعلية.</p>
//               </div>
//             </div>

//             {/* Step 3 */}
//             <div className={`${styles.stepCard} ${activeSlide === 2 ? styles.highlightStep : ''}`}>
//               <div className={styles.iconBox} style={{background: '#e8f5e9', color: '#388e3c'}}>
//                 <FaHeadset />
//               </div>
//               <div className={styles.stepText}>
//                 <h3>3. Speak (تكلم)</h3>
//                 <p>حصص Live أسبوعية مع أستاذة ومتعلمين بحالك لكسر الخوف.</p>
//               </div>
//             </div>

//           </div>

//           {/* منطقة الإجراء (Login Area) */}
//           <div className={styles.actionArea}>
//             {!loading && (
//               <>
//                 {!user ? (
//                   <div className={styles.loginBox}>
//                     <p className={styles.ctaText}>عجباتك الفكرة؟ بدا التجربة دابا 👇</p>
//                     <Login />
//                   </div>
//                 ) : (
//                   <div className={styles.welcomeBack}>
//                     <div className={styles.userIcon}><FaUserGraduate /></div>
//                     <div>
//                       <h3>أهلاً بك مجدداً!</h3>
//                       <Link to="/lessons/learn" className={styles.resumeBtn}>
//                         إكمال التعلم <FaArrowLeft />
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default HomeLanding;


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