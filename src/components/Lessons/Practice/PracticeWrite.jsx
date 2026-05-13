// Practice/PracticeWrite.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./Practice.module.css";
import FeedbackFooter from "./FeedbackFooter";

const PracticeWrite = ({ questions, onNext, onAnswer }) => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); 
  const [isShaking, setIsShaking] = useState(false); 
  const [attempts, setAttempts] = useState(0); 
  const inputRef = useRef(null);

  const cleanText = (text) => text.trim().toLowerCase().replace(/[.,?!]/g, "");

  const handleCheck = () => {
    if (!input.trim() || status !== 'idle') return;
    const isCorrect = cleanText(input) === cleanText(questions[current].answer);

    if (isCorrect) {
      setStatus("correct");
      onAnswer();
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); 
      setAttempts(prev => prev + 1); 
    }
  };

  const handleContinue = () => {
    setInput("");
    setStatus("idle");
    setAttempts(0); 
    if (current + 1 < questions.length) setCurrent(current + 1);
    else onNext();
  };

  // اللائحة ديال العبارات الكوميدية
  const funnyMessages = [
    { text: "💡 أودي ركز شوية.. غالبا غير خطأ مطبعي، عاود!", color: "#eab308" }, 
    { text: "👀 واش متأكد؟ قرا السؤال مزيان أ صاحبي، راه ساهل!", color: "#d97706" }, 
    { text: "😅 لا لا.. هادشي مخدامش، زيد فكر شوية راه باغي لك غا مصلحتك!", color: "#ea580c" }, 
    { text: "🤔 واش كتجرب الزهر ولا شنو؟ يالاه كتب داكشي مقاد!", color: "#f97316" }, 
    { text: "🤦‍♂️ وا عباد الله! راه الجواب باين، غير ركز معايا الدماغ.", color: "#ef4444" }, 
    { text: "😤 واش غنبقاو هنا للصباح؟ يالاه دير عقلك وجاوب صحيح!", color: "#dc2626" }, 
    { text: "🙄 دابا واش نتا كتقرأ ولا كتفلى؟ أجي لسطر وكتب الجواب!", color: "#b91c1c" }, 
    { text: "🥱 بديت كنعس أ المعلم... فيق معانا وجاوب!", color: "#991b1b" }, 
    { text: "🚨 وا الكارثة هادي! راه ساهلة، غير تهجى الكلمة مزيان!", color: "#7f1d1d" }, 
    { text: "🧘‍♂️ كنتنفس الصعداء باش منتعصبش... عاود فكر يرحم والديك.", color: "#c026d3" }, 
    { text: "🎭 واش كاميرا خفية هادي ولا شنو؟", color: "#a21caf" }, 
    { text: "🥶 تجمدت بلاصتي وتسنيتك تجاوب... والو؟", color: "#0369a1" }, 
    { text: "🧩 راه إلى ماجاوبتيش غنباتو هنا، الكود ديالي مكيسمحش ليا ندوزك!", color: "#4f46e5" }, 
    { text: "😭 واش بغيتيني نبكي؟ جاوب أصاحبي راه عييت!", color: "#be123c" }, 
    { text: "🕵️‍♂️ أنا عقت بيك... كديرها بلعاني باش تشوفني شنو غنقول ياك؟", color: "#4c1d95" }, 
    { text: "🤨 الفضول غيقتل المش... جاوب راك عارف الجواب!", color: "#5b21b6" }, 
    { text: "🤖 واش كاتجرب واش الروبوتات كيعياو؟ راه كنعياو أودي!", color: "#1e3a8a" }, 
    { text: "👨‍💻 المطور لي قادني راه كيبكي فواحد القنت دابا بسبابك.", color: "#1e40af" }, 
    { text: "🛑 هادي راه محاولة اغتيال للصبر ديالي ماشي قراية!", color: "#831843" }, 
    { text: "☕ سير شرب كاس د أتاي ورجع... الدماغ عندك مبلوكي دابا.", color: "#881337" }, 
    { text: "📡 صافي مشا ليا الريزو معاك... جاوب ولا طفي البيسي.", color: "#111827" }, 
    { text: "👋 كون كانت عندي يد كون خرجت من الشاشة عطيتك علاش كتقلب.", color: "#1f2937" }, 
    { text: "🔥 أنا كنحس بالسيرفور غادي يطرطق بسباب هاد المحاولات دياولك!", color: "#b45309" }, 
    { text: "🚑 وا الحاج! وا الحاجة! عتقو الروح راه هادشي بزاف.", color: "#9f1239" }, 
    { text: "🤐 سالات الهضرة... غنبقى نشوف فيك وتشوف فيا.", color: "#3f3f46" }, 
    { text: "⏳ كان ياما كان، واحد المتعلم حلف ما يجاوب صحيح...", color: "#52525b" }, 
    { text: "📜 واش كتقلب ليا على الكود سورس؟ راه ماغانعطيكش الجواب!", color: "#064e3b" }, 
    { text: "📉 السهم ديال الصبر ديالي نزل لتحت الصفر.", color: "#14532d" }, 
    { text: "🚷 من اللخر، الميساجات قراب يساليوا، والجواب ماغاديش يبان!", color: "#450a0a" }, 
    // 👈 العبارة الأخيرة لي غتعطيه الجواب حرفياً
    { text: `هاك الجواب وذنوبك على راسك: "${questions[current].answer}"`, color: "#000000" },
    { text: `أوليلي ... وتا كتب الجواب هاهو قدامك: "${questions[current].answer}"`, color: "#4c1d95" }, 
    { text: ` 🙄 "${questions[current].answer}"`, color: "#4c1d95" },

  ];

  const getFunnyMessage = () => {
    if (attempts === 0) return null;
    const index = Math.min(attempts - 1, funnyMessages.length - 1);
    return funnyMessages[index];
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && status !== 'idle') {
        handleContinue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, current, questions.length]);

  useEffect(() => { inputRef.current?.focus(); }, [current]);

  const messageInfo = getFunnyMessage();

  return (
    <>
      <div className={styles.cardBody}>
        <div className={styles.instructionTitle}>اكتب الجواب بالإنجليزي</div>
        <h2 className={styles.questionText} style={{direction: 'rtl'}}>{questions[current].question}</h2>
        
        <input
          ref={inputRef}
          type="text"
          className={`${styles.writeInput} ${isShaking ? styles.shake : ''}`}
          style={attempts > 0 && status === 'idle' ? { borderColor: messageInfo?.color, backgroundColor: '#fffcf2' } : {}}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
          disabled={status !== "idle"}
          onKeyDown={(e) => e.key === 'Enter' && status === 'idle' && handleCheck()}
        />

        {/* 👈 هنا فين استعملنا key={attempts} و كلاس الأنيمايشن باش تعاود الحركة مع كل محاولة */}
        {attempts > 0 && status === 'idle' && messageInfo && (
          <div 
            key={attempts} 
            className={styles.animatedMessage}
            style={{ color: messageInfo.color, fontWeight: 'bold', marginTop: '15px', fontSize: '1.1rem', textAlign: 'center' }}
          >
            {messageInfo.text}
          </div>
        )}
      </div>

      <FeedbackFooter 
        status={status}
        correctAnswer={questions[current].answer}
        onCheck={handleCheck}
        onNext={handleContinue}
        disabledCheck={!input.trim()}
      />
    </>
  );
};

export default PracticeWrite;