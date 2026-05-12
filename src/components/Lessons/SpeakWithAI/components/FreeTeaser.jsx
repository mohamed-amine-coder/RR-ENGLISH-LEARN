import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCrown, FaPaperPlane } from 'react-icons/fa';
import styles from '../SpeakWithAI.module.css';

export default function FreeTeaser({ selectedScenario }) {
  const navigate = useNavigate();

  const mockMessages = selectedScenario?.mockMessages || [
    { role: 'model', text: 'مرحبا، كيفاش نقدر نعاونك اليوم؟', correction: null },
    { role: 'user', text: 'بغيت نتعلم.', correction: null },
    { role: 'model', text: 'مزيان، يلاه نبداو!', correction: '💡 نصيحة: حاول تستعمل جمل أطول شوية.' },
    { role: 'user', text: 'واخا.', correction: null },
  ];

  return (
    <div className={styles.teaserArea}>
      
      {/* ---------------- واجهة المحادثة الوهمية ---------------- */}
      {/* استعملنا الـ class الجديد اللي درنا فيه الضبابية */}
      <div className={`${styles.chatArea} ${styles.fakeChatContainer}`}>
        
        <div className={styles.chatHeader} style={{ borderBottomColor: selectedScenario?.color || '#ccc' }}>
          <div className={styles.chatHeaderIcon} style={{ color: selectedScenario?.color || '#ccc', backgroundColor: `${selectedScenario?.color || '#ccc'}20` }}>
            {selectedScenario?.icon || '👑'}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>{selectedScenario?.subtitle || 'محادثة ذكية'}</h2>
            <span style={{ fontSize: '13px', color: '#64748b' }}>{selectedScenario?.title || 'AI Assistant'}</span>
          </div>
        </div>

        <div className={styles.messagesContainer} style={{ overflowY: 'hidden' }}>
          {mockMessages.map((msg, idx) => {
             const isUser = msg.role === 'user';
             return (
               <div key={idx} className={isUser ? styles.msgWrapperUser : styles.msgWrapperModel}>
                 
                 {!isUser && msg.correction && (
                   <div className={styles.correctionBubble}>
                     {msg.correction}
                   </div>
                 )}
                 
                 <div 
                   className={isUser ? styles.msgUser : styles.msgModel} 
                   style={{ 
                     backgroundColor: !isUser ? `${selectedScenario?.color || '#ccc'}15` : '', 
                     borderColor: !isUser ? `${selectedScenario?.color || '#ccc'}40` : '' 
                   }}
                 >
                   {msg.text}
                 </div>
               </div>
             )
          })}
        </div>

        <div className={styles.inputContainer}>
          <input 
            type="text" 
            value="I am typing a message..." 
            readOnly
            dir="ltr"
          />
          <button style={{ backgroundColor: selectedScenario?.color || '#ccc' }}>
            <FaPaperPlane />
          </button>
        </div>
      </div>

      {/* ---------------- رسالة القفل فوق المحادثة الوهمية ---------------- */}
      <div className={styles.teaserOverlay}>
        <FaLock size={50} color="#ffb703" style={{ marginBottom: '15px' }} />
        <h2>تحدث مع {selectedScenario?.title} 👑</h2>
        <p>
          هاد الميزة مفتوحة للمشتركين. تقدر تهضر مع {selectedScenario?.title + " "} 
          و يصحح ليك أخطاءك بالدارجة فالبلاصة!
        </p>
        <button className={styles.upgradeBtn} onClick={() => navigate('/upgrade-plan')}>
          <FaCrown /> اكتشف الباقات دابا
        </button>
      </div>
    </div>
  );
}