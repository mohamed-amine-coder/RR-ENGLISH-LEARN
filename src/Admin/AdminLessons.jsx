import React, { useState, useEffect } from 'react';
import { db } from '../Auth/firebaseConfig'; // تأكد من مسار الـ config ديالك
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import styles from './AdminLessons.module.css';

const AdminLessons = () => {
  const [activeTab, setActiveTab] = useState('learn_lessons');
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);

  // 1. جلب الدروس
  const fetchLessons = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, activeTab));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLessons(list.sort((a, b) => a.id.localeCompare(b.id)));
    } catch (err) {
      alert("Error fetching data!");
    }
    setLoading(false);
  };

  useEffect(() => { fetchLessons(); }, [activeTab]);

  // 2. مسح درس
  const handleDelete = async (id) => {
    if (window.confirm("تمسح هاد الدرس؟")) {
      await deleteDoc(doc(db, activeTab, id));
      fetchLessons();
    }
  };

  // 3. حفظ (إضافة أو تعديل)
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // تحويل الـ JSON string لـ Object حقيقي (إلا كان كاين)
      const lessonData = { ...currentLesson };
      if (typeof lessonData.sentences === 'string') lessonData.sentences = JSON.parse(lessonData.sentences);
      if (typeof lessonData.words === 'string') lessonData.words = JSON.parse(lessonData.words);
      if (typeof lessonData.quiz === 'string') lessonData.quiz = JSON.parse(lessonData.quiz);

      await setDoc(doc(db, activeTab, lessonData.id), lessonData);
      setShowModal(false);
      fetchLessons();
    } catch (err) {
      alert("Error saving: تأكد من صيغة الـ JSON صحيحة");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>إدارة محتوى RR English</h1>
        <button 
          className={`${styles.btn} ${styles.btnAdd}`}
          onClick={() => {
            setCurrentLesson({ id: `lesson_${lessons.length + 1}`, description: '', sentences: '[]', words: '[]' });
            setShowModal(true);
          }}
        >
          + درس جديد
        </button>
      </div>

      <div className={styles.tabBar}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'learn_lessons' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('learn_lessons')}
        >
          Learn Lessons
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'practice_lessons' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('practice_lessons')}
        >
          Practice Lessons
        </button>
      </div>

      <div className={styles.tableCard}>
        {loading ? <p style={{padding: '20px'}}>جاري التحميل...</p> : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>العنوان / الوصف</th>
                <th>العمليات</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map(lesson => (
                <tr key={lesson.id}>
                  <td>{lesson.id}</td>
                  <td>{lesson.description || lesson.intro?.title || "بدون عنوان"}</td>
                  <td>
                    <button 
                      className={`${styles.btn} ${styles.btnEdit}`}
                      onClick={() => {
                        // تحويل الـ Arrays لـ Strings باش يسهل تعديلهم فـ Textarea
                        const editData = { ...lesson };
                        if (editData.sentences) editData.sentences = JSON.stringify(editData.sentences, null, 2);
                        if (editData.words) editData.words = JSON.stringify(editData.words, null, 2);
                        if (editData.quiz) editData.quiz = JSON.stringify(editData.quiz, null, 2);
                        setCurrentLesson(editData);
                        setShowModal(true);
                      }}
                    >تعديل</button>
                    <button className={`${styles.btn} ${styles.btnDelete}`} onClick={() => handleDelete(lesson.id)}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <form className={styles.modal} onSubmit={handleSave}>
            <h2>{currentLesson.id ? 'تعديل الدرس' : 'إضافة درس'}</h2>
            
            <div className={styles.formGroup}>
              <label>Lesson ID (Unique):</label>
              <input 
                value={currentLesson.id} 
                onChange={e => setCurrentLesson({...currentLesson, id: e.target.value})}
                required
              />
            </div>

            {activeTab === 'learn_lessons' ? (
              <>
                <div className={styles.formGroup}>
                  <label>Description (Darija):</label>
                  <input 
                    value={currentLesson.description} 
                    onChange={e => setCurrentLesson({...currentLesson, description: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Sentences (JSON Array):</label>
                  <textarea 
                    rows="5"
                    value={currentLesson.sentences} 
                    onChange={e => setCurrentLesson({...currentLesson, sentences: e.target.value})}
                  />
                </div>
              </>
            ) : (
              <div className={styles.formGroup}>
                <label>Quiz (JSON Array):</label>
                <textarea 
                  rows="10"
                  value={currentLesson.quiz} 
                  onChange={e => setCurrentLesson({...currentLesson, quiz: e.target.value})}
                />
              </div>
            )}

            <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
              <button type="submit" className={`${styles.btn} ${styles.btnAdd}`}>حفظ التغييرات</button>
              <button type="button" className={`${styles.btn}`} onClick={() => setShowModal(false)}>إلغاء</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminLessons;