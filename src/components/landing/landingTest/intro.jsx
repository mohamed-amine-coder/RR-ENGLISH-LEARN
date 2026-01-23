import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../../Auth/authService"; 
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../Auth/firebaseConfig'; 

// استيراد الصور
import homeImage from '../../../assets/intro-img-1.jpg'; // صورة الهيرو (Hero)
import platformImage from '../../../assets/intro-img-2.jpg'; // صورة المنصة (Features)
import callImage from '../../../assets/intro-img-3.jpg'; // صورة المكالمة (Call)

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Load Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAction = async () => {
    if (user) {
      navigate("/start");
    } else {
      try {
        await signInWithGoogle();
      } catch (error) {
        console.error("Login Failed:", error);
      }
    }
  };

  if (loading) return null; 

  return (
    <div className="lp-container" dir="rtl">
      <style>{`
        :root {
          --blue: #0056b3;
          --orange: #ff8c00;
          --white: #ffffff;
          --light-gray: #f4f7fa;
          --dark-text: #1a1a1a;
          --gray-text: #505050;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Tajawal', sans-serif; color: var(--dark-text); line-height: 1.6; background: var(--white); overflow-x: hidden; }
        .wrapper { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

        /* --- Hero Section --- */
        .hero { padding: 40px 0; display: flex; align-items: center; gap: 40px; flex-wrap: wrap; }
        .hero-text { flex: 1.2; min-width: 300px; }
        /* كلاس موحد للإطارات ديال الصور */
        .img-box { 
          flex: 1; 
          min-width: 300px; 
          height: 380px; /* طول موحد */
          border-radius: 30px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          overflow: hidden; /* باش الصورة ما تخرجش من الجناب */
          box-shadow: 0 15px 40px rgba(0,0,0,0.08); /* ظل خفيف */
          background: #f0f0f0;
        }
        
        /* كلاس موحد للصور باش متبقاش تعاود الستايل */
        .responsive-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .img-box:hover .responsive-img { transform: scale(1.05); } /* زووم خفيف عند التحويم */

        .hero h1 { 
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900; 
          line-height: 1.2; 
          margin-bottom: 20px; 
        }
        .hero h1 span { color: var(--orange); }
        .hero p { font-size: 1.1rem; color: var(--gray-text); margin-bottom: 30px; max-width: 95%; }

        /* --- Comparison --- */
        .comparison { padding: 60px 0; background: var(--light-gray); text-align: center; margin-top: 40px; border-radius: 40px; }
        .comp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
        .comp-card { background: white; padding: 30px; border-radius: 25px; text-align: right; box-shadow: 0 5px 20px rgba(0,0,0,0.03); transition: 0.3s; }
        .comp-card:hover { transform: translateY(-5px); }
        .comp-card.bad { border-top: 6px solid #ff4d4d; }
        .comp-card.good { border-top: 6px solid var(--blue); transform: scale(1.02); z-index: 2; border: 2px solid rgba(0, 86, 179, 0.1); }
        .comp-card h3 { font-size: 20px; margin-bottom: 15px; font-weight: 900; }
        .comp-list { list-style: none; }
        .comp-list li { margin-bottom: 12px; display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 500; }
        
        /* --- Features --- */
        .feature-block { padding: 80px 0; display: flex; align-items: center; gap: 50px; flex-wrap: wrap; }
        .feature-block.reverse { flex-direction: row-reverse; }
        .feature-text { flex: 1; min-width: 300px; }
        .feature-block h2 { font-size: 28px; font-weight: 900; margin-bottom: 20px; color: var(--blue); }
        .feature-block p { font-size: 17px; color: var(--gray-text); margin-bottom: 20px; line-height: 1.8; }
        .feature-block ul li { margin-bottom: 10px; font-size: 16px; display: flex; align-items: center; gap: 10px; font-weight: 700; color: var(--dark-text); }
        .feature-block ul li::before { content: "✦"; color: var(--orange); font-size: 20px; }

        /* --- Buttons --- */
        .btn { padding: 12px 30px; border-radius: 12px; font-weight: 700; font-size: 16px; cursor: pointer; transition: 0.3s; border: none; font-family: 'Tajawal', sans-serif; display: inline-block; text-decoration: none; }
        
        .btn-blue {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 9999;
          background: linear-gradient(45deg, var(--blue), #007bff);
          color: white;
          padding: 15px 35px;
          border-radius: 50px;
          font-weight: 900;
          font-size: 18px;
          box-shadow: 0 10px 25px rgba(0, 86, 179, 0.4);
          animation: pulse-blue 2s infinite; 
        }
        .btn-blue:hover { transform: translateY(-5px) scale(1.05); animation: none; background: var(--orange); }

        @keyframes pulse-blue {
          0% { box-shadow: 0 0 0 0 rgba(0, 86, 179, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(0, 86, 179, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 86, 179, 0); }
        }

        .btn-header { padding: 10px 25px; font-size: 15px; border: 2px solid var(--blue); background: transparent; color: var(--blue); border-radius: 50px; font-weight: 700; }
        .btn-header:hover { background: var(--blue); color: white; }

        @media (max-width: 768px) {
          .comp-grid { grid-template-columns: 1fr; }
          .hero, .feature-block { text-align: center; padding: 40px 0; gap: 30px; }
          .img-box { height: 280px; width: 100%; }
          .comp-card.good { transform: scale(1); }
          .feature-block ul li { justify-content: center; }
          .wrapper { padding: 0 20px; }
          .btn-blue { padding: 12px 25px; font-size: 16px; bottom: 20px; left: 20px; }
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="hero wrapper">
        <div className="hero-text">
          <h1>{user ? `مرحباً، ${user.displayName?.split(' ')[0] || 'صديقي'}!` : "خسرتي فلوسك ووقتك؟"} <br /><span>لونكلي مابقاتش "حفاظة"</span></h1>
          <p>
            حبس عليا داك السيستيم القديم. فـ RR ENGLISH، قلبنا الآية: قرا وقتما بغيتي، وطبق داكشي اللي تعلمتي فحصص حية مع أستاذة وشريك ديالك.
          </p>
          {/* الزر العائم الذكي */}
          <button className="btn btn-blue" onClick={handleAction}>
            {user ? "كمل القراية دابا 🚀" : "جربها من دبا نيت 🤩"}
          </button>
        </div>
        
        {/* HERO IMAGE */}
        <div className="img-box">
          <img src={homeImage} alt="Happy Moroccan Student" className="responsive-img" />
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="wrapper feature-block">
        <div className="feature-text">
          <h2>المنصة ديالك.. 24/24</h2>
          <p>تخيل يكون عندك أستاذ فجيبك. دروس فالانجلزية تقراها وقت ما بغيتي ، شرح بالداريجة كيبسط ليك أصعب الأمور.</p>
          <ul>
            <li>كويزات وتحديات ممتعة وبالداريجة</li>
            <li>تسجيلات صوتية نقية</li>
            <li>مفاجآت ونقاط فكل مستوى</li>
          </ul>
        </div>
        
        {/* PLATFORM IMAGE */}
        <div className="img-box">
          <img src={platformImage} alt="RR English Platform Dashboard" className="responsive-img" loading="lazy" />
        </div>
      </section>

      {/* --- COMPARISON SECTION --- */}
      <section className="comparison">
        <div className="wrapper">
          <h2 style={{fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900}}>علاش RR ENGLISH هي الحل؟</h2>
          <div className="comp-grid">
            <div className="comp-card bad">
              <h3>المعهد والدورات العادية</h3>
              <ul className="comp-list bad-list">
                <li><span style={{color:'#ff4d4d', fontSize:'20px'}}>✕</span> سوايع محددة (خاصك تحرك) 😢.</li>
                <li><span style={{color:'#ff4d4d', fontSize:'20px'}}>✕</span> كتاب غليظ وقواعد معقدة 😟.</li>
                <li><span style={{color:'#ff4d4d', fontSize:'20px'}}>✕</span> حصص اونلاين فيها عشرات الطلبة 😕 .</li>
                <li><span style={{color:'#ff4d4d', fontSize:'20px'}}>✕</span> قليل فين كتهضر فالحصة 😤.</li>
              </ul>
            </div>
            <div className="comp-card good">
              <h3>RR ENGLISH</h3>
              <ul className="comp-list good-list">
                <li><span style={{color:'var(--blue)', fontSize:'20px'}}>✓</span> قرا 24/24 ساعة من تليفونك.</li>
                <li><span style={{color:'var(--blue)', fontSize:'20px'}}>✓</span> شرح بالداريجة.</li>
                <li><span style={{color:'var(--blue)', fontSize:'20px'}}>✓</span> ملخصات للدروس بأفضل جودة .</li>
                <li><span style={{color:'var(--blue)', fontSize:'20px'}}>✓</span> حصص (التحدث Speaking) مع طالب(ة) مثلك + الاستاذ(ة) فقط .</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPEAKING FEATURE --- */}
      <section className="wrapper feature-block reverse">
        <div className="feature-text">
          <h2>حيد "الدهشة" نهائياً</h2>
          <p>مابقيتيش غاتخجل تغلط. فالحصص ديالنا، كاين متعلم بحالك وأستاذة كتشرف عليكم باش طلق لسانك فجو عائلي.</p>
          <ul>
            <li>تركيز 100% على الـ Speaking</li>
            <li>تصحيح فوري للنطق</li>
            <li>شريك (Binôme) كيحفزك</li>
          </ul>
        </div>

        {/* CALL IMAGE */}
        <div className="img-box">
          <img src={callImage} alt="Students talking video call" className="responsive-img" loading="lazy" />
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section style={{background: 'var(--blue)', padding: '80px 0', textAlign: 'center', color: 'white', marginTop: '60px', borderTopLeftRadius:'60px', borderTopRightRadius:'60px'}}>
        <div className="wrapper">
          <h2 style={{fontSize: '32px', fontWeight: 900, marginBottom: '20px'}}>واجد تخرج "البريطاني" اللي فيك؟</h2>
          <p style={{fontSize: '18px', opacity: 0.9, marginBottom: '40px', maxWidth: '600px', margin: '0 auto'}}>
            انضم لآلاف المغاربة اللي اختارو يفكرو بطريقة ذكية ويبداو رحلة تعلم ممتعة.
          </p>
        </div>
      </section>
    </div>
  );
}