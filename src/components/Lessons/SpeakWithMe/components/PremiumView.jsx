import React from 'react';
import { FaCrown, FaCalendarAlt, FaWhatsapp, FaLock } from 'react-icons/fa';
import styles from '../speakWithMeTwStyles';

function PremiumView({ name }) {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.welcomeCard}>
        <div className={styles.welcomeText}>
          <h2>زارتنا البركة 😍 مرحبا بيك {name}! 👋</h2>
          <p>راك دبا فالمسار الصحيح للطلاقة. بالتوفيق فحصص هذا الأسبوع.</p>
        </div>
        <div className={styles.statusBadge}>
          <FaCrown /> اشتراك نشط
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaCalendarAlt className={styles.cardIcon} style={{ color: '#0077ff' }} />
            <h3>برنامجك الأسبوعي</h3>
          </div>
          <div className={styles.cardBody}>
            <p className={styles.highlightText}>
              يتم نشر جدول الحصص وروابط الدخول أسبوعياً وبشكل حصري في{' '}
              <strong>مجموعتك الخاصة على واتساب</strong>.
            </p>

            <div className={styles.topicBox}>
              <span>نظام الحصص:</span>
              <strong>مواضيع متجددة أسبوعياً (سفر، عمل، حياة يومية...) تحت إشراف أساتذة مختصين.</strong>
            </div>

            <p className={styles.note}>🔔 تأكد من تفعيل إشعارات المجموعة لكي لا تفوت موعد حصتك القادمة.</p>
          </div>
        </div>

        <div className={styles.actionCard}>
          <div className={styles.cardHeader}>
            <FaWhatsapp className={styles.cardIcon} style={{ color: '#25D366' }} />
            <h3>مجموعتك الخاصة</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.rulesBox}>
              <h4>ميثاق المجموعة (Code of Conduct):</h4>
              <ul className={styles.rulesList}>
                <li>
                  🤝 <strong>الاحترام:</strong> حنا هنا باش نعاونو بعضياتنا، كلنا كنتعلمو.
                </li>
                <li>
                  ✨ <strong>الخطأ:</strong> مسموح ومطلوب! إلا ماغلطتيش ماغاتعلمش.
                </li>
                <li>
                  ⏰ <strong>الالتزام:</strong> الحضور فالوقت كيبين الجدية ديالك.
                </li>
              </ul>
            </div>
            <button
              onClick={() => window.open('https://chat.whatsapp.com/YOUR_GROUP_LINK', '_blank')}
              className={styles.whatsappFullBtn}
            >
              ماعرفتيش مجموعتك WhatsApp ؟
            </button>
            <div className={styles.secureBadge}>
              <FaLock size={10} /> مجموعة خاصة ومشفرة
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumView;
