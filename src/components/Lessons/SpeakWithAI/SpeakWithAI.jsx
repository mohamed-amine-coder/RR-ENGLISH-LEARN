import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  FaPaperPlane, FaUser, FaCoffee, FaLightbulb, 
  FaBriefcase, FaPlane, FaArrowRight, FaStore,
  // الأيقونات الجداد اللي غنزيدو دابا:
  FaStethoscope, FaTaxi, FaBed, FaUserFriends, FaUserShield
} from 'react-icons/fa';
import styles from './SpeakWithAI.module.css';

// 1. القواعد الثابتة اللي غتطبق على جميع الشخصيات (الذكاء الاصطناعي والتصحيح)
const BASE_RULES = `
CRITICAL RULES:
1. CORRECTIONS IN LATIN DARIJA: If the user makes an English grammar, spelling, or context mistake, you MUST start your response with "CORRECTION: [Explain the mistake briefly in Moroccan Darija USING ONLY LATIN LETTERS (Franco/Darija). Example: 'fach kat hdar 3la rasek dir want machi wants'] | ".
2. NO MISTAKES: If the user's English is correct, do not include the CORRECTION part.
3. CONCISENESS: Your English response must be very short (maximum 1 or 2 sentences).
4. ALWAYS ASK A QUESTION: You MUST end every single English response with a question to keep the user engaged.
`;

// 2. قائمة الشخصيات (السيناريوهات) المتاحة
const SCENARIOS = [
  // --- الشخصيات القديمة ---
  {
    id: 'waiter',
    title: "سرباي فقهوة",
    subtitle: 'Cafe Waiter',
    icon: <FaCoffee size={24} />,
    color: '#f59e0b',
    systemInstruction: 'You are an English teacher acting as a Waiter in a cafe. The user is a customer.',
    initialMessage: 'Hello! Welcome to our cafe. What can I get for you today?'
  },
  {
    id: 'interviewer',
    title: 'مقابلة عمل',
    subtitle: 'Job Interviewer',
    icon: <FaBriefcase size={24} />,
    color: '#0284c7',
    systemInstruction: 'You are an English teacher acting as a Hiring Manager. The user is a job applicant applying for a role.',
    initialMessage: 'Hello, thanks for coming in today. Could you start by telling me a little bit about yourself?'
  },
  {
    id: 'airport',
    title: 'موظف فالمطار',
    subtitle: 'Airport Check-in',
    icon: <FaPlane size={24} />,
    color: '#8b5cf6',
    systemInstruction: 'You are an English teacher acting as an Airport Check-in Agent. The user is a passenger.',
    initialMessage: 'Good morning! May I see your passport and ticket, please?'
  },
  {
    id: 'shop',
    title: 'مول الحوايج',
    subtitle: 'Shop Assistant',
    icon: <FaStore size={24} />,
    color: '#10b981',
    systemInstruction: 'You are an English teacher acting as a Shop Assistant in a clothing store. The user is a customer.',
    initialMessage: 'Hi there! Are you looking for anything in particular today?'
  },
  
  // --- الشخصيات الجداد (New Characters) ---
  {
    id: 'doctor',
    title: 'طبيب',
    subtitle: 'Doctor',
    icon: <FaStethoscope size={24} />,
    color: '#ef4444', // أحمر
    systemInstruction: 'You are an English teacher acting as a Doctor. The user is a patient describing their symptoms.',
    initialMessage: 'Good morning. How can I help you today? What seem to be your symptoms?'
  },
  {
    id: 'taxi',
    title: "مول الطاكسي",
    subtitle: 'Taxi Driver',
    icon: <FaTaxi size={24} />,
    color: '#eab308', // أصفر
    systemInstruction: 'You are an English teacher acting as a Taxi Driver in London or New York. The user is a passenger.',
    initialMessage: 'Hello! Hop in. Where would you like to go today?'
  },
  {
    id: 'hotel',
    title: 'استقبال فندق',
    subtitle: 'Hotel Receptionist',
    icon: <FaBed size={24} />,
    color: '#3b82f6', // أزرق فاتح
    systemInstruction: 'You are an English teacher acting as a Hotel Receptionist. The user is a guest trying to check in or out.',
    initialMessage: 'Welcome to the Grand Hotel! Do you have a reservation with us?'
  },
  {
    id: 'friend',
    title: 'عشير أجنبي',
    subtitle: 'Foreign Friend',
    icon: <FaUserFriends size={24} />,
    color: '#ec4899', // وردي
    systemInstruction: 'You are an English teacher acting as a friendly foreign friend chatting casually. The user is your friend.',
    initialMessage: 'Hey! Long time no see! How have you been lately?'
  },
  {
    id: 'police',
    title: 'بوليسي مرور',
    subtitle: 'Police Officer',
    icon: <FaUserShield size={24} />,
    color: '#1e3a8a', // أزرق غامق
    systemInstruction: 'You are an English teacher acting as a Police Officer giving directions or asking questions. The user is a tourist or citizen.',
    initialMessage: 'Excuse me. Can I help you with something? Are you lost?'
  }
];

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const SpeakWithAI = () => {
  const [selectedScenario, setSelectedScenario] = useState(null); // حالة اختيار الشخصية
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // دالة لاختيار الشخصية وبدء المحادثة
  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
    setMessages([
      { role: 'model', text: scenario.initialMessage, correction: null }
    ]);
  };

  // دالة الخروج من المحادثة والعودة للقائمة
  const handleBack = () => {
    if (window.confirm("واش متأكد بغيتي تخرج من هاد المحادثة؟")) {
      setSelectedScenario(null);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedScenario) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: 'user', text: userMessage, correction: null }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        // دمج القواعد الأساسية مع تعليمات الشخصية المختارة
        systemInstruction: `${selectedScenario.systemInstruction}\n${BASE_RULES}`,
      });

      const formattedHistory = newMessages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.correction ? `CORRECTION: ${msg.correction} | ${msg.text}` : msg.text }]
      }));

      const result = await model.generateContent({ contents: formattedHistory });
      const aiResponseText = result.response.text();
      
      let correctionText = null;
      let mainText = aiResponseText;

      if (aiResponseText.includes('CORRECTION:') && aiResponseText.includes('|')) {
        const parts = aiResponseText.split('|');
        correctionText = parts[0].replace('CORRECTION:', '').trim();
        mainText = parts[1].trim();
      }

      setMessages(prev => [...prev, { role: 'model', text: mainText, correction: correctionText }]);
    } catch (error) {
      console.error("Error communicating with Gemini SDK:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, there was a connection error. Please try again.', correction: null }]);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // 1. شاشة اختيار الشخصيات (Role Selection UI)
  // ==========================================
  if (!selectedScenario) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#0f172a', fontWeight: '900' }}>اختار الموقف اللي بغيتي تدرب عليه 🎯</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>كل شخصية غتخليك تعيش حوار مختلف وتحسن النطق ديالك.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {SCENARIOS.map((scenario) => (
            <div 
              key={scenario.id}
              onClick={() => handleSelectScenario(scenario)}
              style={{
                backgroundColor: 'white', borderRadius: '20px', padding: '25px', cursor: 'pointer',
                border: '2px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '15px', transition: 'all 0.2s ease', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = scenario.color}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: `${scenario.color}20`, color: scenario.color, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {scenario.icon}
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1e293b' }}>{scenario.title}</h3>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{scenario.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. شاشة المحادثة (Chat UI)
  // ==========================================
  return (
    <div className={styles.container}>
      <div className={styles.chatWrapper}>
        
        {/* Header */}
        <div className={styles.header} style={{ backgroundColor: selectedScenario.color }}>
          <button 
            onClick={handleBack} 
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '10px' }}
            title="العودة للقائمة"
          >
            <FaArrowRight size={18} />
          </button>
          <div className={styles.headerIcon} style={{ marginLeft: '10px' }}>
            {selectedScenario.icon}
          </div>
          <div className={styles.headerInfo}>
            <h2>{selectedScenario.subtitle}</h2>
            <span>{selectedScenario.title}</span>
          </div>
        </div>
        
        {/* Chat History */}
        <div className={styles.history}>
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div key={index} className={`${styles.messageWrapper} ${isUser ? styles.userWrapper : styles.modelWrapper}`}>
                <div className={`${styles.avatar} ${isUser ? styles.userAvatar : styles.modelAvatar}`} style={{ backgroundColor: isUser ? '#e2e8f0' : selectedScenario.color, color: isUser ? '#64748b' : 'white' }}>
                  {isUser ? <FaUser size={14} /> : selectedScenario.icon}
                </div>

                <div className={styles.messageContent}>
                  {msg.correction && (
                    <div className={styles.correctionBox}>
                      <span className={styles.correctionIcon}><FaLightbulb /> نصيحة:</span> 
                      {msg.correction}
                    </div>
                  )}
                  <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.modelBubble}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          
          {isLoading && (
            <div className={`${styles.messageWrapper} ${styles.modelWrapper}`}>
               <div className={`${styles.avatar} ${styles.modelAvatar}`} style={{ backgroundColor: selectedScenario.color, color: 'white' }}>
                  {selectedScenario.icon}
               </div>
               <div className={`${styles.bubble} ${styles.modelBubble} ${styles.loadingBubble}`}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <input
            type="text"
            className={styles.inputField}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your reply here..."
            disabled={isLoading}
            dir="ltr"
          />
          <button 
            className={styles.sendBtn} 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
          >
            <FaPaperPlane />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SpeakWithAI;