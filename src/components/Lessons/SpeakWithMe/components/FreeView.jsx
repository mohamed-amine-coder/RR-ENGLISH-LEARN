import React from 'react';
import { FaUserSecret, FaUsers, FaMicrophoneAlt, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from '../speakWithMeTwStyles';
const prototypeSheets = [
  { id: 1, src: '/Reading1.jpg', alt: 'Course prototype sheet 1' },
  { id: 2, src: '/Reading1.jpg', alt: 'Course prototype sheet 2' },
  { id: 3, src: '/Reading1.jpg', alt: 'Course prototype sheet 3' },
];

function FreeView() {
  return (
    <div className={styles.marketingContainer}>
      <div className={styles.visualSection}>
        <div className={styles.imageFrame}>
          <img
            src="/images/speak-call.png"
            alt="Live Session Mockup"
            className={styles.mockupImage}
            onError={(e) => {
              e.target.src = '/SpeakX3.png';
            }}
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
          <div className={styles.iconBox} style={{ background: '#e3f2fd', color: '#1976d2' }}>
            <FaUserSecret />
          </div>
          <h3>بدون كاميرا</h3>
          <p>غير الصوت. خد راحتك، وهضر وانت مرتاح فبيتك، فالقهوة، فالمكتبة أو فينما كنتي.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.iconBox} style={{ background: '#fff3e0', color: '#f57c00' }}>
            <FaUsers />
          </div>
          <h3>مجموعات صغيرة (VIP)</h3>
          <p>فقط 2 متعلمين فالحصة. يعني عندك الوقت الكافي باش تدوي وتعبر.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.iconBox} style={{ background: '#f3e5f5', color: '#7b1fa2' }}>
            <FaMicrophoneAlt />
          </div>
          <h3>تصحيح فوري</h3>
          <p>الأستاذ\ة كتسمع وكتصحح ليك النطق والجمل بلا ما تحرجك.</p>
        </div>
      </div>

      <div className={styles.prototypeSection}>
        <div className={styles.prototypeHeader}>
          <h2>نماذج من محتوى الكورس</h2>
          <p>أوراق تجريبية بتنسيق قريب من A4 باش تاخد فكرة على شكل الدروس.</p>
        </div>

        <div className={styles.prototypeGrid}>
          {prototypeSheets.map((sheet) => (
            <div key={sheet.id} className={styles.prototypeCard}>
              <img
                src={sheet.src}
                alt={sheet.alt}
                className={styles.prototypeImage}
                onError={(e) => {
                  e.target.src = '/SpeakX3.png';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.ctaBox}>
        <div className={styles.ctaContent}>
          <h2>بغيتي تجرب هاد الشعور 😍؟</h2>
          <p>
            تخيل راسك كدوي وتفهم بلا ما تبلوكا. هاد الخدمة صممناها باش تعطيك
            <strong> الثقة الكاملة</strong> فجميع المهارات.
            <br />
            والمزيانة هي أنك <strong>نتا اللي كتختار عدد الحصص</strong> والوقت اللي كيناسبك.
          </p>
          <Link to="/upgrade-plan" className={styles.upgradeBtn}>
            اكتشف الخيارات المتاحة <FaArrowLeft />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FreeView;
