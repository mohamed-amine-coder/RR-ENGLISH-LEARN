
import React, { useState } from 'react';
// تأكد أنك متبث المكتبة: npm install react-icons
import { FaWhatsapp, FaCheckCircle, FaCrown, FaUnlockAlt, FaFire, FaClock } from 'react-icons/fa';

const UpgradePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(2);
  const [hoveredPlan, setHoveredPlan] = useState(null); // زدنا هادي باش نديرو تأثير الهوفر بالكود

  const plans = [
    { 
      id: 1, 
      name: 'Start',
      sessions: '1 حصة فالسيمانة',
      totalSessions: '4 حصص فالشهر',
      price: 99, 
      originalPrice: 149,
      badge: 'اقتصادي',
      color: '#4CAF50'
    },
    { 
      id: 2, 
      name: 'Pro',
      sessions: '2 حصص فالسيمانة',
      totalSessions: '8 حصص فالشهر',
      price: 149, 
      originalPrice: 199,
      badge: 'الأكثر طلباً 🔥',
      popular: true,
      color: '#0077ff'
    },
    { 
      id: 3, 
      name: 'Turbo',
      sessions: '3 حصص فالسيمانة',
      totalSessions: '12 حصة فالشهر',
      price: 199, 
      originalPrice: 249,
      badge: 'أفضل قيمة 💎',
      color: '#ff7b00'
    }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan);

  const handleSubscribe = () => {
    const phoneNumber = "212718090887"; 
    const message = `السلام عليكم، بغيت نستافد من تخفيض *عرض ${currentPlan.name}* بـ *${currentPlan.price} درهم* واش باقي متاح ؟`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* 1. مقدمة */}
        <div style={styles.introHeader}>
          <div style={styles.iconWrapper}><FaUnlockAlt size={24} color="#0077ff" /></div>
          <h2 style={styles.title}>إلا كان الفابور داير هكا، كيفاش غايكون المدفوع؟ هادشي غير 1% 😍</h2>
          <p style={styles.subtitle}>
            راك جربتي الطريقة وشتي السهولة. دابا تخيل معايا تفتح <strong>المنصة كاملة</strong> وتستافد من:
          </p>
          
          <div style={styles.bigStats}>
            <div style={styles.statBox}>
              <strong style={styles.statNumber}>+2000</strong> <span style={styles.statLabel}>كلمة</span>
            </div>
            <div style={styles.statBox}>
              <strong style={styles.statNumber}>+3000</strong> <span style={styles.statLabel}>جملة</span>
            </div>
            <div style={styles.statBox}>
              <strong style={styles.statNumber}>+500</strong> <span style={styles.statLabel}>نص</span>
            </div>
            <div style={styles.statBox}>
              <strong style={styles.statNumber}>+500</strong> <span style={styles.statLabel}>تسجيل صوتي</span>
            </div>
          </div>
        </div>

        {/* 2. المفاجأة الكبرى */}
        <div style={styles.surpriseBox}>
          <div style={styles.surpriseHeader}>
            <FaCrown color="#FFD700" /> <span>المفاجأة الكبرى: Speak With Me</span>
          </div>
          <p style={{margin: 0, fontSize: '0.95rem', color: '#555'}}>
            ماشي غير الدروس! الاشتراك كيعطيك حق الوصول لحصص مباشرة فين غاطبق هادشي كامل مع 
            <strong> متعلم بحالك وأستاذ\ة كتشرف عليكم</strong>.
          </p>
        </div>

        {/* 3. العرض المحدود */}
        <div style={styles.offerBanner}>
          <FaClock />
          <span>تخفيض -50 درهم صالح لأول 500 مشترك</span>
        </div>

        {/* 4. شبكة العروض */}
        <div style={styles.grid}>
          {plans.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{
                ...styles.planCard,
                borderColor: selectedPlan === plan.id ? plan.color : '#eee',
                backgroundColor: selectedPlan === plan.id ? `${plan.color}08` : '#fff',
                transform: selectedPlan === plan.id || hoveredPlan === plan.id ? 'scale(1.03)' : 'scale(1)',
                boxShadow: selectedPlan === plan.id ? `0 10px 30px -10px ${plan.color}40` : 'none'
              }}
            >
              {plan.badge && (
                <div style={{...styles.badge, backgroundColor: plan.color}}>
                  {plan.badge}
                </div>
              )}
              
              <h3 style={{...styles.planName, color: plan.color}}>{plan.name}</h3>
              
              <div style={styles.priceTag}>
                <span style={styles.originalPrice}>{plan.originalPrice} DH</span>
                <div style={{display:'flex', alignItems:'baseline', gap:'5px', justifyContent:'center'}}>
                  <span style={styles.currency}>{plan.price}</span>
                  <span style={styles.unit}>DH</span>
                </div>
              </div>

              <div style={styles.details}>
                <p style={{fontWeight: 'bold', color: '#333', fontSize:'0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'}}>
                  <FaCheckCircle style={{color: plan.color}}/> 
                  {plan.sessions}
                </p>
                <p style={{fontSize: '0.8rem', color: '#666', marginTop: '5px'}}>
                  {/* ({plan.totalSessions}) */}
                </p>
              </div>

              {/* Radio Circle */}
              <div style={{
                ...styles.radio,
                borderColor: selectedPlan === plan.id ? plan.color : '#ccc',
                background: selectedPlan === plan.id ? plan.color : 'transparent'
              }}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <div style={styles.summary}>
            باختيارك لـ <strong>{currentPlan.name}</strong>، راك غادي تستفد من <strong style={{backgroundColor: selectedPlan ? plans.find(plan => plan.id === selectedPlan)?.color : '#000', padding: '2px 6px', borderRadius: '4px', color: '#fff'}}>{plans.find(plan => plan.id === selectedPlan)?.totalSessions} + فتح جميع دروس المنصة في Learn & Practice</strong> 
          </div>
          
          <button 
            style={styles.whatsappButton}
            onClick={handleSubscribe}
          >
            <FaWhatsapp size={24} />
              تواصل معانا
          </button>
          <p style={styles.guarantee}>جميع الحقوق محفوظة © 2024</p>
        </div>

      </div>
    </div>
  );
};

// الستايلات الصحيحة (بدون Selectors معقدة)
const styles = {
  container: {
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    direction: 'rtl',
    fontFamily: 'var(--font-family)',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
    padding: '40px',
    maxWidth: '900px',
    width: '100%',
    textAlign: 'center',
  },
  
  // Intro
  introHeader: { marginBottom: '30px' },
  iconWrapper: {
    width: '60px',
    height: '60px',
    background: '#e3f2fd',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 15px',
  },
  title: { fontSize: '1.8rem', fontWeight: '900', color: '#333', margin: '0 0 10px 0' },
  subtitle: { fontSize: '1.1rem', color: '#666', lineHeight: '1.6', maxWidth:'600px', margin:'0 auto' },
  
  // Stats
  bigStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '30px 0',
    flexWrap: 'wrap',
  },
  statBox: {
    background: '#f9f9f9',
    padding: '15px 25px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #eee',
    minWidth: '100px',
  },
  statNumber: { fontSize: '1.5rem', color: '#0077ff', display: 'block', direction: 'ltr' },
  statLabel: { fontSize: '0.9rem', color: '#555' },

  // Surprise Box
  surpriseBox: {
    background: 'linear-gradient(135deg, #fff8f0 0%, #fff 100%)',
    border: '2px solid #ffecb3',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  surpriseHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#ff8f00',
    marginBottom: '8px',
  },

  // Offer Banner
  offerBanner: {
    background: '#ffebee',
    color: '#c62828',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '30px',
    border: '1px dashed #ef5350',
  },

  // Grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  planCard: {
    border: '2px solid #eee',
    borderRadius: '20px',
    padding: '25px 15px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '280px',
  },
  badge: {
    position: 'absolute',
    top: '-12px',
    color: '#fff',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  planName: { fontSize: '1.4rem', fontWeight: '900', marginBottom: '10px' },
  
  priceTag: { marginBottom: '15px' },
  originalPrice: { textDecoration: 'line-through', color: '#999', fontSize: '1rem', display: 'block' },
  currency: { fontSize: '2.2rem', fontWeight: '900', color: '#333', lineHeight: '1' },
  unit: { fontSize: '1rem', color: '#555', fontWeight:'700' },
  
  details: { marginBottom: '20px', width: '100%' },
  radio: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid #ccc',
    marginTop: 'auto',
  },
  
  // CTA
  ctaSection: { borderTop: '1px solid #eee', paddingTop: '30px' },
  summary: { fontSize: '1.1rem', color: '#333', marginBottom: '20px' },
  whatsappButton: {
    backgroundColor: '#25D366',
    border: 'none',
    color: '#fff',
    padding: '18px 40px',
    borderRadius: '50px',
    fontSize: '1.2rem',
    fontWeight: '800',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)',
    transition: 'transform 0.2s',
    width: '100%',
    justifyContent: 'center',
    maxWidth: '400px',
  },
  guarantee: { fontSize: '0.8rem', color: '#999', marginTop: '15px' }
};

export default UpgradePlan;