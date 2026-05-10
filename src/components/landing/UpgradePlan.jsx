import React from 'react';
import { FaCheckCircle, FaWhatsapp, FaArrowRight, FaQuestionCircle, FaStar, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function UpgradePlan() {
  const navigate = useNavigate();
  const whatsappNumber = "212600000000"; // 🔴 دير رقمك هنا

  const handleSubscribe = (planName) => {
    const message = `مرحباً! بغيت نبدا نتعلم الإنجليزية واختاريت *${planName}*. كيفاش نقدر نخلص عافاك؟`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={styles.container}>
      
      {/* رأس الصفحة: التركيز على النتيجة */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <FaArrowRight /> رجوع
        </button>
        <h1 style={styles.title}>مستعد تهضر بالإنجليزية بثقة؟ 🚀</h1>
        <p style={styles.subtitle}>استثمر فمستقبلك بأقل تكلفة. اختار الخطة لي تناسبك وبدا اليوم.</p>
      </div>

      {/* البطاقات */}
      <div style={styles.cardsContainer}>
        
        {/* الباقة 1: التعلم الذاتي */}
        <div style={styles.card}>
          <div style={styles.cardTop}>
            <h2 style={styles.planName}>التعلم المستقل</h2>
            <p style={styles.planTarget}>مثالية للبداية والمراجعة بالوتيرة ديالك</p>
          </div>
          
          <div style={styles.priceBox}>
            <span style={styles.price}>49</span>
            <span style={styles.currency}>درهم / للشهر</span>
          </div>
          
          <ul style={styles.featuresList}>
            <li style={styles.featureItem}>
              <FaCheckCircle color="#1cb0f6" size={18} style={{marginTop: '4px'}}/> 
              <span><b>تعلم على خاطرك:</b> دخول مفتوح لجميع الدروس والتمارين.</span>
            </li>
            <li style={styles.featureItem}>
              <FaCheckCircle color="#1cb0f6" size={18} style={{marginTop: '4px'}}/> 
              <span><b>طور الاستماع:</b> قصص تفاعلية ومقاطع صوتية ممتعة.</span>
            </li>
            <li style={styles.featureItem}>
              <FaCheckCircle color="#1cb0f6" size={18} style={{marginTop: '4px'}}/> 
              <span><b>راجع فأي وقت:</b> تحميل جميع الملخصات (PDF) لتليفونك.</span>
            </li>
          </ul>

          <button style={styles.basicBtn} onClick={() => handleSubscribe('باقة التعلم المستقل (49 درهم)')}>
            ابــــدأ الآن
          </button>
        </div>

        {/* الباقة 2: التحدث المباشر (الأكثر إقناعاً) */}
        <div style={{...styles.card, ...styles.proCard}}>
          <div style={styles.badge}><FaStar color="#fff" size={14}/> الأكثر مبيعاً</div>
          <div style={styles.cardTop}>
            <h2 style={{...styles.planName, color: '#58cc02'}}>الممارسة والتحدث</h2>
            <p style={styles.planTarget}>أحسن خطوة باش تهرس عقدة النطق وتزعم</p>
          </div>
          
          <div style={styles.priceBox}>
            <span style={{...styles.price, color: '#58cc02'}}>149</span>
            <span style={styles.currency}>درهم / للشهر</span>
          </div>
          
          <ul style={styles.featuresList}>
            <li style={styles.featureItem}>
              <FaCheckCircle color="#58cc02" size={18} style={{marginTop: '4px'}}/> 
              <span>جميع ميزات باقة <b>"التعلم المستقل"</b>.</span>
            </li>
            <li style={styles.featureItem}>
              <FaCheckCircle color="#58cc02" size={18} style={{marginTop: '4px'}}/> 
              <span><b>4 حصص مكالمات واتساب</b> (ساعة ونصف كل أسبوع).</span>
            </li>
            <li style={styles.featureItem}>
              <FaCheckCircle color="#58cc02" size={18} style={{marginTop: '4px'}}/> 
              <span><b>بيئة مريحة وبدون إحراج:</b> مجموعات صغيرة (5 طلبة فقط).</span>
            </li>
            <li style={styles.featureItem}>
              <FaCheckCircle color="#58cc02" size={18} style={{marginTop: '4px'}}/> 
              <span><b>تصحيح الأخطاء بلطافة:</b> من طرف ميسرة لغة متفوقة.</span>
            </li>
            <li style={styles.featureItem}>
              <FaCheckCircle color="#58cc02" size={18} style={{marginTop: '4px'}}/> 
              <span><b>مواضيع من الحياة:</b> (السفر، العمل، التعارف...).</span>
            </li>
          </ul>

          <button style={styles.proBtn} onClick={() => handleSubscribe('باقة الممارسة والتحدث Pro (149 درهم)')}>
            <FaWhatsapp size={22} /> احجز مقعدك الآن
          </button>
        </div>

      </div>

      {/* الأسئلة الشائعة - مصاغة بطريقة تبني الثقة */}
      <div style={styles.faqSection}>
        <h3 style={styles.faqTitle}><FaShieldAlt color="#1cb0f6" /> عندك شي تساؤل؟ حنا نجاوبوك:</h3>
        
        <div style={styles.faqGrid}>
          <div style={styles.faqItem}>
            <h4 style={styles.faqQ}>أنا مبتدئ بزاف وعندي مشكل فالحشمة، واش هادشي غيصلح ليا؟</h4>
            <p style={styles.faqA}>أكيد! المنصة ديالنا مصممة خصيصاً ليك. فحصص الواتساب غتكون مع ناس فنفس المستوى ديالك (5 أشخاص فقط)، والميسرة مهمتها هي تخليك ترتاح وتزعم تهضر بدون أي إحراج أو خوف من الخطأ.</p>
          </div>
          
          <div style={styles.faqItem}>
            <h4 style={styles.faqQ}>كيفاش غنخلص الاشتراك ديالي؟</h4>
            <p style={styles.faqA}>العملية ساهلة وآمنة. يكفي تضغط على زر الاشتراك، غيحولك للواتساب ديالنا، وغنعطيوك المعلومات باش تخلص بكل سهولة (عبر CIH، التجاري، وافابنك، أو أي وكالة كاش بلوس/وفاكاش).</p>
          </div>
          
          <div style={styles.faqItem}>
            <h4 style={styles.faqQ}>واش أنا ملزم نجدد الاشتراك كل شهر؟</h4>
            <p style={styles.faqA}>لا نهائياً. الاشتراك ديالنا شهري وبدون أي التزامات. كتقرا شهر بشهر، وتقدر توقف الاشتراك ديالك فأي وقت بكل حرية.</p>
          </div>
          
          <div style={styles.faqItem}>
            <h4 style={styles.faqQ}>شنو كيوقع يلا غبت على شي حصة ديال الواتساب؟</h4>
            <p style={styles.faqA}>كنحاولو نتفهمو ظروف الطلبة. الميسرة كتحط ملخص ديال داكشي لي تناقش فالمجموعة باش تبقى ديما متبع معانا وما يفوتك والو.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

// === Styles ===
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
    minHeight: '100vh',
    fontFamily: 'var(--font-family), sans-serif',
    direction: 'rtl',
    backgroundColor: '#f8fafc' // خلفية مريحة جدا للعين
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    position: 'relative'
  },
  backButton: {
    position: 'absolute',
    right: '0',
    top: '0',
    background: 'none',
    border: 'none',
    color: '#64748b',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  title: {
    fontSize: '2.2rem',
    color: '#0f172a',
    fontWeight: '900',
    margin: '0 0 10px 0',
    lineHeight: '1.4'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#475569',
    margin: '0'
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '25px',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: '60px'
  },
  card: {
    flex: '1 1 320px',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '24px',
    padding: '35px 30px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  },
  proCard: {
    borderColor: '#58cc02',
    borderWidth: '2px',
    boxShadow: '0 20px 25px -5px rgba(88, 204, 2, 0.1), 0 8px 10px -6px rgba(88, 204, 2, 0.1)'
  },
  badge: {
    position: 'absolute',
    top: '-16px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#58cc02',
    color: '#fff',
    padding: '6px 20px',
    borderRadius: '20px',
    fontSize: '0.95rem',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 6px rgba(88, 204, 2, 0.2)'
  },
  cardTop: {
    textAlign: 'center',
    marginBottom: '25px'
  },
  planName: {
    fontSize: '1.6rem',
    color: '#1e293b',
    fontWeight: '800',
    margin: '0 0 8px 0'
  },
  planTarget: {
    fontSize: '0.95rem',
    color: '#64748b',
    margin: '0',
    fontWeight: '600'
  },
  priceBox: {
    textAlign: 'center',
    marginBottom: '30px',
    backgroundColor: '#f8fafc',
    padding: '15px',
    borderRadius: '16px'
  },
  price: {
    fontSize: '3.5rem',
    fontWeight: '900',
    color: '#0f172a',
    lineHeight: '1'
  },
  currency: {
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: '700',
    marginLeft: '5px'
  },
  featuresList: {
    listStyle: 'none',
    padding: '0',
    margin: '0 0 35px 0',
    flex: '1'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '1.05rem',
    color: '#334155',
    fontWeight: '500',
    marginBottom: '16px',
    lineHeight: '1.5'
  },
  basicBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '16px',
    fontSize: '1.2rem',
    fontWeight: '800',
    cursor: 'pointer',
    backgroundColor: '#f1f5f9',
    color: '#0f172a',
    border: 'none',
    borderBottom: '4px solid #cbd5e1',
    transition: 'all 0.1s ease'
  },
  proBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '16px',
    fontSize: '1.2rem',
    fontWeight: '800',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#58cc02',
    color: '#fff',
    border: 'none',
    borderBottom: '4px solid #46a302',
    transition: 'all 0.1s ease'
  },
  faqSection: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
  },
  faqTitle: {
    fontSize: '1.6rem',
    color: '#0f172a',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontWeight: '800'
  },
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '25px'
  },
  faqItem: {
    backgroundColor: '#f8fafc',
    padding: '25px',
    borderRadius: '20px',
    border: '1px solid #f1f5f9'
  },
  faqQ: {
    fontSize: '1.15rem',
    color: '#0f172a',
    margin: '0 0 12px 0',
    fontWeight: '800',
    lineHeight: '1.4'
  },
  faqA: {
    fontSize: '1rem',
    color: '#475569',
    margin: '0',
    lineHeight: '1.7'
  }
};