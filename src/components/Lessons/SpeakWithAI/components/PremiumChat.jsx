import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaPaperPlane } from 'react-icons/fa';
import styles from '../SpeakWithAI.module.css';

// كنجيبو القواعد الأساسية اللي عرفناها فملف قاعدة البيانات
import { BASE_RULES } from '../scenariosData'; 

// إعداد Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function PremiumChat({ selectedScenario }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  // 1. فاش كيختار المستخدم شخصية جديدة، كنمسحو المحادثة وكنبداو بالرسالة الترحيبية ديال الشخصية
  useEffect(() => {
    if (selectedScenario) {
      setMessages([{ role: 'model', text: selectedScenario.initialMessage, correction: null }]);
      setInput(''); // تفريغ حقل الإدخال
    }
  }, [selectedScenario]);

  // 2. هاد الـ effect كيهبط الشات لتحت أوتوماتيكياً فاش كيتزاد شي ميساج جديد
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 3. دالة إرسال الرسالة لـ Gemini
  const sendMessage = async () => {
    if (!input.trim() || !selectedScenario) return;

    const userMessage = input.trim();
    
    // كنزيدو رسالة المستخدم فالشاشة
    const newMessages = [...messages, { role: 'user', text: userMessage, correction: null }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // إعداد الموديل مع تعليمات الشخصية + القواعد الأساسية (التصحيح بالدارجة)
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: `${selectedScenario.systemInstruction}\n${BASE_RULES}`,
      });

      // كنجهزو تاريخ المحادثة باش Gemini يعقل على السياق
      const formattedHistory = messages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.correction ? `CORRECTION: ${msg.correction} | ${msg.text}` : msg.text }]
      }));
      
      // كنزيدو الميساج الجديد ديال المستخدم
      formattedHistory.push({ role: 'user', parts: [{ text: userMessage }] });

      // كنطلبو الجواب من Gemini
      const result = await model.generateContent({ contents: formattedHistory });
      const aiResponseText = result.response.text();
      
      let correctionText = null;
      let mainText = aiResponseText;

// كنقلبو واش Gemini صيفط لينا شي تصحيح (حسب القواعد اللي عطيناه)
if (aiResponseText.includes('CORRECTION:') && aiResponseText.includes('|')) {
  const parts = aiResponseText.split('|');
  const extractedCorrection = parts[0].replace('CORRECTION:', '').trim();
  
  // إذا كان التصحيح هو "None"، غنردوه null باش مايبانش فـ الشاشة
  if (extractedCorrection.toLowerCase() === 'none') {
    correctionText = null;
  } else {
    correctionText = extractedCorrection;
  }
  
  mainText = parts[1].trim();
}

      // كنزيدو جواب الذكاء الاصطناعي فالشاشة
      setMessages(prev => [...prev, { role: 'model', text: mainText, correction: correctionText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: '(الأسبقية للمشتركين) الروبو كياخد استراحة، عاود صيفط ميساج من بعد 15 ثانية', correction: null }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedScenario) return null;

  return (
    <div className={styles.chatArea}>
      {/* ---------------- الهيدر ديال المحادثة ---------------- */}
      <div className={styles.chatHeader} style={{ borderBottomColor: selectedScenario.color }}>
        <div className={styles.chatHeaderIcon} style={{ color: selectedScenario.color, backgroundColor: `${selectedScenario.color}20` }}>
          {selectedScenario.icon}
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>{selectedScenario.subtitle}</h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>{selectedScenario.title}</span>
        </div>
      </div>
      
      {/* ---------------- منطقة عرض الرسائل ---------------- */}
      <div className={styles.messagesContainer}>
        {messages.map((msg, idx) => {
           const isUser = msg.role === 'user';
           return (
             <div key={idx} className={isUser ? styles.msgWrapperUser : styles.msgWrapperModel}>
               
               {/* إذا كان هناك تصحيح، كنعرضوه فوق رسالة الـ AI */}
               {!isUser && msg.correction && (
                 <div className={styles.correctionBubble}>
                   💡 نصيحة: {msg.correction}
                 </div>
               )}
               
               {/* فقاعة الرسالة */}
               <div 
                 className={isUser ? styles.msgUser : styles.msgModel} 
                 style={{ 
                   backgroundColor: !isUser ? `${selectedScenario.color}15` : '', 
                   borderColor: !isUser ? `${selectedScenario.color}40` : '' 
                 }}
               >
                 {msg.text}
               </div>
             </div>
           )
        })}
        
        {/* مؤشر الكتابة (Typing Indicator) */}
        {isLoading && (
          <div className={styles.msgWrapperModel}>
            <div className={styles.msgModel} style={{ backgroundColor: `${selectedScenario.color}15`, borderColor: `${selectedScenario.color}40` }}>
              ...يكتب
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ---------------- حقل الإدخال (Input) ---------------- */}
      <div className={styles.inputContainer}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message here..." 
          dir="ltr"
          disabled={isLoading} // باش مايقدرش يكتب ومزال ماوصلش الجواب
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || !input.trim()}
          style={{ backgroundColor: selectedScenario.color }} // لون الزر كيمشي مع لون الشخصية
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}