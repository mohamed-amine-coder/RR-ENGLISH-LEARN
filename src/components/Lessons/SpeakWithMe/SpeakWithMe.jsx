
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../Auth/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { 
  FaUserSecret, FaCommentDots, FaRocket, 
  FaWhatsapp, FaCrown, FaArrowLeft, FaUserShield, FaUsers, FaCalendarAlt, FaCog, FaMicrophoneAlt, FaLock 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './SpeakWithMe.module.css';

function SpeakWithMe() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          setUserData(docSnap.exists() ? docSnap.data() : { role: 'free', name: user.displayName || 'المتعلم' });
        } catch (error) {
          console.error("Error:", error);
          setUserData({ role: 'free', name: 'المتعلم' });
        }
      } else {
        setUserData({ role: 'free', name: 'زائر' });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className={styles.loader}>جارٍ تحميل البيانات... ⏳</div>;

  const { role: rawRole, name } = userData || { role: 'free', name: 'زائر' };
  const role = rawRole ? rawRole.toLowerCase() : 'free';

  return (
    <div className={styles.container}>
      
      {/* Header Common */}
      <div className={styles.headerSection}>
        {role === 'premium' && <div className={styles.badge}>💎 عضوية مميزة</div>}
        {role === 'admin' && <div className={styles.badgeAdmin}>🔒 Admin Zone</div>}
        
        <h1 className={styles.mainTitle}>
          Speak With Me <span style={{fontSize:'1.5rem'}}>🎙️</span>
        </h1>
        <p className={styles.subTitle}>
          {role === 'free' ? "المكان فين لسانك كيتطلق، والخوف كيختفي." : "فضاء التدريب المباشر والمواكبة."}
        </p>
      </div>

      {/* --- 1. حالة FREE (تسويق) --- */}
      {role === 'free' && (
        <div className={styles.marketingContainer}>
          <div className={styles.visualSection}>
            <div className={styles.imageFrame}>
              <img 
                src="/images/speak-call.png" 
                alt="Live Session Mockup" 
                className={styles.mockupImage}
                // onError={(e) => e.target.src = "https://placehold.co/600x400/0077ff/ffffff?text=Live+Call+Mockup"}
                onError={(e) => e.target.src = "/SpeakX3.png"}
              />
              <div className={styles.floatingTag}>🔴 مباشر</div>
            </div>
            
            <div className={styles.visualText}>
              <h2>أجواء عائلية، ماشي قسم</h2>
              <p>
                تخيل راسك فمكالمة مع صحابك. نتا + متعلم آخر بحالك + الأستاذة.
                <br />
                <strong>الهدف؟</strong> تهضرو فمواضيع حقيقية وتغلطو كيف بغيتو.
              </p>
            </div>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.iconBox} style={{background: '#e3f2fd', color: '#1976d2'}}><FaUserSecret /></div>
              <h3>بدون كاميرا</h3>
              <p>غير الصوت. خد راحتك، وهضر وانت مرتاح فبيتك، فالقهوة، فالمكتبة أو فينما كنتي.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconBox} style={{background: '#fff3e0', color: '#f57c00'}}><FaUsers /></div>
              <h3>مجموعات صغيرة (VIP)</h3>
              <p>فقط 2 متعلمين فالحصة. يعني عندك الوقت الكافي باش تدوي وتعبر.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.iconBox} style={{background: '#f3e5f5', color: '#7b1fa2'}}><FaMicrophoneAlt /></div>
              <h3>تصحيح فوري</h3>
              <p>الأستاذ\ة كتسمع وكتصحح ليك النطق والجمل بلا ما تحرجك.</p>
            </div>
          </div>

          {/* <div className={styles.ctaBox}>
            <div className={styles.ctaContent}>
              <h2>بغيتي تجرب هاد الشعور؟ 😍</h2>
              <p>استفد من <strong>8 حصص شهرية</strong> ابتداءً من 149 درهم فقط.</p>
              <Link to="/upgrade-plan" className={styles.upgradeBtn}>
                احجز مقعدك الآن <FaArrowLeft />
              </Link>
            </div>
          </div> */}
          <div className={styles.ctaBox}>
  <div className={styles.ctaContent}>
    <h2>بغيتي تجرب هاد الشعور 😍؟</h2>
    <p>
      تخيل راسك كدوي وتفهم بلا ما تبلوكا. هاد الخدمة صممناها باش تعطيك <strong>الثقة الكاملة</strong> فجميع المهارات.
      <br />
      والمزيانة هي أنك <strong>نتا اللي كتختار عدد الحصص</strong> والوقت اللي كيناسبك.
    </p>
    <Link to="/upgrade-plan" className={styles.upgradeBtn}>
      اكتشف الخيارات المتاحة <FaArrowLeft />
    </Link>
  </div>
</div>
        </div>
      )}

      {/* --- 2. حالة PREMIUM (منظم وأنيق) --- */}
      {role === 'premium' && (
        <div className={styles.dashboardContainer}>
          
          {/* بطاقة الترحيب */}
          <div className={styles.welcomeCard}>
            <div className={styles.welcomeText}>
              <h2>زارتنا البركة 😍 مرحبا بيك {name}! 👋</h2>
              <p>راك دبا فالمسار الصحيح للطلاقة. بالتوفيق فحصص هذا الأسبوع.</p>
            </div>
            <div className={styles.statusBadge}>
              <FaCrown /> اشتراك نشط
            </div>
          </div>

          {/* الشبكة الخاصة بالمعلومات */}
          <div className={styles.dashboardGrid}>
            
            {/* الكارد 1: معلومات الحصة */}
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <FaCalendarAlt className={styles.cardIcon} style={{color:'#0077ff'}} />
                <h3>برنامج الأسبوع</h3>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.highlightText}>
                  يتم نشر جدول الحصص وروابط الدخول أسبوعياً وبشكل حصري في <strong>مجموعتك الخاصة على واتساب</strong>.
                </p>
                
                <div className={styles.topicBox}>
                  <span>نظام الحصص:</span>
                  <strong>مواضيع متجددة أسبوعياً (سفر، عمل، حياة يومية...) تحت إشراف أساتذة مختصين.</strong>
                </div>
                
                <p className={styles.note}>
                  🔔 تأكد من تفعيل إشعارات المجموعة لكي لا تفوت موعد حصتك القادمة.
                </p>
              </div>
            </div>

            {/* الكارد 2: الإجراءات (واتساب) */}
            <div className={styles.actionCard}>
              <div className={styles.cardHeader}>
                <FaWhatsapp className={styles.cardIcon} style={{color:'#25D366'}} />
                <h3>مجموعتك الخاصة</h3>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.rulesBox}>
                  <h4>ميثاق المجموعة (Code of Conduct):</h4>
                  <ul className={styles.rulesList}>
                    <li>🤝 <strong>الاحترام:</strong> حنا هنا باش نعاونو بعضياتنا، كلنا كنتعلمو.</li>
                    <li>✨ <strong>الخطأ:</strong> مسموح ومطلوب! إلا ماغلطتيش ماغاتعلمش.</li>
                    <li>⏰ <strong>الالتزام:</strong> الحضور فالوقت كيبين الجدية ديالك.</li>
                  </ul>
                </div>
                <button 
                  onClick={() => window.open('https://chat.whatsapp.com/YOUR_GROUP_LINK', '_blank')}
                  className={styles.whatsappFullBtn}
                >
                   ماعرفتيش مجموعتك  WhatsApp ؟  
                </button>
                <div className={styles.secureBadge}>
                  <FaLock size={10} /> مجموعة خاصة ومشفرة
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- 3. حالة ADMIN (لوحة قيادة حقيقية) --- */}
      {role === 'admin' && (
        <div className={styles.dashboardContainer}>
          
          <div className={styles.adminStatsBar}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>المستخدمين</span>
              <span className={styles.statNumber}>124</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>المدخول (تقديري)</span>
              <span className={styles.statNumber} style={{color:'#29b864'}}>3,450 DH</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>المجموعات النشطة</span>
              <span className={styles.statNumber} style={{color:'#0077ff'}}>5</span>
            </div>
          </div>

          <div className={styles.dashboardGrid}>
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <FaCog className={styles.cardIcon} />
                <h3>إدارة سريعة</h3>
              </div>
              <div className={styles.adminLinks}>
                <button className={styles.adminActionBtn}>إدارة المستخدمين</button>
                <button className={styles.adminActionBtn}>جدول الحصص</button>
                <button className={styles.adminActionBtn}>التقارير المالية</button>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <FaUsers className={styles.cardIcon} />
                <h3>حالة المجموعات</h3>
              </div>
              <ul className={styles.groupsList}>
                <li><span>G1 - Beginner</span> <span className={styles.statusDot} style={{background:'green'}}></span></li>
                <li><span>G2 - Intermediate</span> <span className={styles.statusDot} style={{background:'green'}}></span></li>
                <li><span>G3 - Turbo</span> <span className={styles.statusDot} style={{background:'orange'}}></span></li>
              </ul>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default SpeakWithMe;