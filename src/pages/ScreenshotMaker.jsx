import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function ScreenshotMaker() {
  // حالة (State) ديال المدخلات
  const [color, setColor] = useState('#ef4444');
  const [characterName, setCharacterName] = useState('Doctor');
  const [characterSubtitle, setCharacterSubtitle] = useState('طبيب');
  const [aiMessage, setAiMessage] = useState('Good morning. How can I help you today? What seem to be your symptoms?');
  const [userMessage, setUserMessage] = useState('I have a headache and my throat is paining me.');
  const [correction, setCorrection] = useState('fach kat hdar 3la s7tak, sta3mal "I have a sore throat" f blast "My throat is paining me"');

  const previewRef = useRef(null);

  // دالة تحميل الصورة
  const handleDownload = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // باش تخرج الصورة واضحة (High Quality)
        backgroundColor: '#f8fafc'
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${characterName.toLowerCase()}-screenshot.png`;
      link.click();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '40px', padding: '40px', fontFamily: 'sans-serif', direction: 'rtl' }}>
      
      {/* ----------------- لوحة التحكم (المدخلات) ----------------- */}
      <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2>🛠️ صانع السكرين شوت</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label>لون الشخصية (Hex): </label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>اسم الشخصية (بالانجليزية): </label>
          <input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>لقب الشخصية (بالعربية): </label>
          <input type="text" value={characterSubtitle} onChange={(e) => setCharacterSubtitle(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>رسالة الذكاء الاصطناعي: </label>
          <textarea value={aiMessage} onChange={(e) => setAiMessage(e.target.value)} style={textareaStyle} dir="ltr" />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>رسالة المستخدم: </label>
          <textarea value={userMessage} onChange={(e) => setUserMessage(e.target.value)} style={textareaStyle} dir="ltr" />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>النصيحة / التصحيح (بالدارجة): </label>
          <textarea value={correction} onChange={(e) => setCorrection(e.target.value)} style={textareaStyle} />
        </div>

        <button onClick={handleDownload} style={{ padding: '15px 20px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', width: '100%', fontSize: '16px', fontWeight: 'bold' }}>
          📸 تحميل الصورة
        </button>
      </div>

      {/* ----------------- المعاينة (الصورة لي غتحمل) ----------------- */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        
        {/* هاد المربع هو لي غيتم تصويره */}
        <div 
          ref={previewRef}
          style={{ width: '380px', backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', borderBottom: `2px solid ${color}` }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${color}20`, display: 'flex', justifyContent: 'center', alignItems: 'center', color: color, fontWeight: 'bold', fontSize: '20px' }}>
              {characterName.charAt(0)}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#0f172a' }}>{characterName}</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>{characterSubtitle}</span>
            </div>
          </div>

          {/* Chat Area */}
          <div style={{ padding: '20px', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '15px', minHeight: '300px' }}>
            
            {/* رسالة الذكاء الاصطناعي */}
            <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
              <div style={{ backgroundColor: 'white', color: '#1e293b', padding: '12px 16px', borderRadius: '15px 15px 15px 0', border: `1px solid ${color}40`, fontSize: '14px', lineHeight: '1.5', direction: 'ltr', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                {aiMessage}
              </div>
            </div>

            {/* رسالة المستخدم */}
            <div style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
              <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '12px 16px', borderRadius: '15px 15px 0 15px', fontSize: '14px', lineHeight: '1.5', direction: 'ltr' }}>
                {userMessage}
              </div>
            </div>

            {/* التصحيح (النصيحة) ورسالة جديدة من AI */}
            {correction && (
              <div style={{ alignSelf: 'flex-start', maxWidth: '85%', marginTop: '10px' }}>
                <div style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '10px 12px', borderRadius: '10px', fontSize: '13px', marginBottom: '8px', fontWeight: 'bold', direction: 'rtl', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  💡 نصيحة: {correction}
                </div>
                <div style={{ backgroundColor: 'white', color: '#1e293b', padding: '12px 16px', borderRadius: '15px 15px 15px 0', border: `1px solid ${color}40`, fontSize: '14px', lineHeight: '1.5', direction: 'ltr', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  Understood. Let's practice that. Please say it again correctly.
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// ستايلات بسيطة للمدخلات
const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '5px' };
const textareaStyle = { ...inputStyle, minHeight: '80px', resize: 'vertical' };