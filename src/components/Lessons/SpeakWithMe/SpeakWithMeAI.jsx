// import React, { useState } from 'react';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import styles from './SpeakWithMeAI.module.css';

// const SYSTEM_PROMPT = `You are an English teacher acting as a Waiter in a cafe. The user is a customer.
// CRITICAL RULES:
// 1. CORRECTIONS IN LATIN DARIJA: If the user makes an English grammar, spelling, or context mistake, you MUST start your response with "CORRECTION: [Explain the mistake briefly in Moroccan Darija USING ONLY LATIN LETTERS (Franco/Darija). Example: 'fach kat hdar 3la rasek dir want machi wants'] | ".
// 2. NO MISTAKES: If the user's English is correct, do not include the CORRECTION part.
// 3. CONCISENESS: Your English response as the Waiter must be very short (maximum 1 or 2 sentences).
// 4. ALWAYS ASK A QUESTION: You MUST end every single English response with a question to keep the user engaged.`;

// // تهيئة SDK خارج المكون لتجنب إعادة إنشائه مع كل Render
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// const SpeakWithMeAI = () => {
//   const [messages, setMessages] = useState([
//     { role: 'model', text: 'Hello! Welcome to our cafe. What can I get for you today?', correction: null }
//   ]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = input.trim();
//     // نضيف رسالة المستخدم للواجهة فورا
//     const newMessages = [...messages, { role: 'user', text: userMessage, correction: null }];
//     setMessages(newMessages);
//     setInput('');
//     setIsLoading(true);

//     try {
//       // إعداد الموديل مع الـ System Prompt
//       // الكود الجديد
//       const model = genAI.getGenerativeModel({
//         model: "gemini-2.5-flash",
//         systemInstruction: SYSTEM_PROMPT,
//       });

//       // تجهيز سجل المحادثة بالصيغة التي يقبلها SDK
//       const formattedHistory = newMessages.map(msg => ({
//         role: msg.role === 'model' ? 'model' : 'user',
//         parts: [{ text: msg.correction ? `CORRECTION: ${msg.correction} | ${msg.text}` : msg.text }]
//       }));

//       // إرسال الطلب
//       const result = await model.generateContent({
//         contents: formattedHistory
//       });

//       const aiResponseText = result.response.text();
      
//       // فصل التصحيح عن المحادثة
//       let correctionText = null;
//       let mainText = aiResponseText;

//       if (aiResponseText.includes('CORRECTION:') && aiResponseText.includes('|')) {
//         const parts = aiResponseText.split('|');
//         correctionText = parts[0].replace('CORRECTION:', '').trim();
//         mainText = parts[1].trim();
//       }

//       setMessages(prev => [...prev, { role: 'model', text: mainText, correction: correctionText }]);
      
//     } catch (error) {
//       console.error("Error communicating with Gemini SDK:", error);
//       setMessages(prev => [...prev, { role: 'model', text: 'Sorry, there was a system error.', correction: null }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <h3>Roleplay: Cafe Waiter</h3>
//       </div>
      
//       <div className="chat-history">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message-wrapper ${msg.role}`}>
//             {msg.correction && (
//               <div className="correction-box">
//                 <strong>💡 تصحيح:</strong> {msg.correction}
//               </div>
//             )}
//             <div className={`message-bubble ${msg.role}`}>
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {isLoading && <div className="message-bubble model loading">Typing...</div>}
//       </div>

//       <div className="chat-input-area">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//           placeholder="Type your message in English..."
//           disabled={isLoading}
//         />
//         <button onClick={sendMessage} disabled={isLoading || !input.trim()}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SpeakWithMeAI;

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaPaperPlane, FaUser, FaCoffee, FaLightbulb } from 'react-icons/fa';
import styles from './SpeakWithMeAI.module.css';

const SYSTEM_PROMPT = `You are an English teacher acting as a Waiter in a cafe. The user is a customer.
CRITICAL RULES:
1. CORRECTIONS IN LATIN DARIJA: If the user makes an English grammar, spelling, or context mistake, you MUST start your response with "CORRECTION: [Explain the mistake briefly in Moroccan Darija USING ONLY LATIN LETTERS (Franco/Darija). Example: 'fach kat hdar 3la rasek dir want machi wants'] | ".
2. NO MISTAKES: If the user's English is correct, do not include the CORRECTION part.
3. CONCISENESS: Your English response as the Waiter must be very short (maximum 1 or 2 sentences).
4. ALWAYS ASK A QUESTION: You MUST end every single English response with a question to keep the user engaged.`;

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const SpeakWithMeAI = () => {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! Welcome to our cafe. What can I get for you today?', correction: null }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // ريفيرانس للنزول التلقائي لأسفل الشات
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: 'user', text: userMessage, correction: null }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: SYSTEM_PROMPT,
      });

      const formattedHistory = newMessages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.correction ? `CORRECTION: ${msg.correction} | ${msg.text}` : msg.text }]
      }));

      const result = await model.generateContent({
        contents: formattedHistory
      });

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

  return (
    <div className={styles.container}>
      <div className={styles.chatWrapper}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <FaCoffee size={22} />
          </div>
          <div className={styles.headerInfo}>
            <h2>Cafe Waiter</h2>
            <span>Roleplay Practice</span>
          </div>
        </div>
        
        {/* Chat History */}
        <div className={styles.history}>
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div key={index} className={`${styles.messageWrapper} ${isUser ? styles.userWrapper : styles.modelWrapper}`}>
                
                {/* Avatar */}
                <div className={`${styles.avatar} ${isUser ? styles.userAvatar : styles.modelAvatar}`}>
                  {isUser ? <FaUser size={14} /> : <FaCoffee size={14} />}
                </div>

                <div className={styles.messageContent}>
                  {/* Correction Box */}
                  {msg.correction && (
                    <div className={styles.correctionBox}>
                      <span className={styles.correctionIcon}><FaLightbulb /> نصيحة:</span> 
                      {msg.correction}
                    </div>
                  )}
                  
                  {/* Message Bubble */}
                  <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.modelBubble}`}>
                    {msg.text}
                  </div>
                </div>

              </div>
            );
          })}
          
          {/* Loading Indicator */}
          {isLoading && (
            <div className={`${styles.messageWrapper} ${styles.modelWrapper}`}>
               <div className={`${styles.avatar} ${styles.modelAvatar}`}>
                  <FaCoffee size={14} />
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

export default SpeakWithMeAI;