import React from 'react';
import styles from './AppPreview.module.css';
import { FaBookOpen, FaDumbbell, FaHeadset, FaStar, FaCheck } from 'react-icons/fa';

const features = [
  {
    id: 'learn',
    icon: <FaBookOpen />,
    badge: "الأساس",
    title: "دروس تفاعلية",
    desc: "شرح بالدارجة، نطق صوتي، وقواعد مبسطة.",
    details: ["+800 كلمة", "شرح القواعد", "أمثلة واقعية"],
    image: "/images/screenshot-learn.png",
    color: "#0077ff",
    bg: "#eef7ff"
  },
  {
    id: 'practice',
    icon: <FaDumbbell />,
    badge: "التطبيق",
    title: "تمارين ذكية",
    desc: "كويزات وألعاب لترسيخ المعلومات.",
    details: ["تصحيح فوري", "تتبع التقدم", "أنواع مختلفة"],
    image: "/images/screenshot-practice.png",
    color: "#ff7b00",
    bg: "#fff8f0"
  },
  {
    id: 'speak',
    icon: <FaHeadset />,
    badge: "الطلاقة",
    title: "Speak With Me",
    desc: "حصص مباشرة أسبوعية لكسر حاجز الخوف.",
    details: ["مجموعات صغيرة", "أستاذة مختصة", "بدون كاميرا"],
    image: "/images/screenshot-speak.png",
    color: "#29b864",
    bg: "#f0fdf4"
  }
];

const FeaturesGrid = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>كل ما تحتاجه في مكان واحد</h2>
        <p>منهجية متكاملة لضمان النتيجة</p>
      </div>

      <div className={styles.grid}>
        {features.map((item) => (
          <div key={item.id} className={styles.card} style={{'--accent-color': item.color}}>
            
            {/* الجزء العلوي: الأيقونة والعنوان */}
            <div className={styles.cardTop}>
              <div className={styles.iconBox} style={{background: item.color}}>
                {item.icon}
              </div>
              <span className={styles.badge} style={{color: item.color, background: item.bg}}>
                {item.badge}
              </span>
            </div>

            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.desc}</p>

            {/* تفاصيل إضافية تظهر كلمسات صغيرة */}
            <div className={styles.tagsWrapper}>
              {item.details.map((detail, i) => (
                <span key={i} className={styles.tag}>
                  <FaCheck size={10} /> {detail}
                </span>
              ))}
            </div>

            {/* الصورة في الأسفل (نصف ظاهرة) */}
            <div className={styles.imageContainer}>
              <img 
                src={item.image} 
                alt={item.title} 
                onError={(e) => e.target.src = `https://placehold.co/400x300/${item.color.replace('#','')}/ffffff?text=${item.title}`}
              />
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;