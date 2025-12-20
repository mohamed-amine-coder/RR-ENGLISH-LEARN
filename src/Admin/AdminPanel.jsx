
import React, { useEffect, useState, useMemo } from "react";
import { db } from "../Auth/firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import styles from "./AdminPanel.module.css";
import { 
  FaSearch, FaUsers, FaMars, FaVenus, FaTrash, FaSyncAlt, 
  FaPhone, FaWhatsapp, FaChartPie, FaCrown, FaLayerGroup, FaCalendarCheck 
} from 'react-icons/fa';

const ROLE_OPTIONS = ["free", "premium", "admin"];
const PLAN_OPTIONS = ["none", "start", "pro", "turbo"];

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // --- جلب البيانات (نفس اللوجيك السابق) ---
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const usersData = snapshot.docs.map(doc => {
        const data = doc.data();
        let endDate = "";
        if (data.subscriptionEndDate) {
           const dateObj = data.subscriptionEndDate.toDate ? data.subscriptionEndDate.toDate() : new Date(data.subscriptionEndDate);
           endDate = dateObj.toISOString().split('T')[0];
        }
        return {
          id: doc.id,
          ...data,
          role: data.role || 'free',
          gender: data.gender || 'unknown',
          planType: data.planType || 'none',
          subscriptionEndDate: endDate,
          phoneNumber: data.phoneNumber || '',
          whatsappGroup: data.whatsappGroup || '',
        };
      });
      setUsers(usersData);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  // --- دوال التحديث ---
  const updateDbField = async (userId, field, value) => {
    try {
      const userRef = doc(db, "users", userId);
      const payload = field === 'subscriptionEndDate' && value 
        ? { [field]: Timestamp.fromDate(new Date(value)) }
        : { [field]: value };
      await updateDoc(userRef, payload);
    } catch (e) { console.error("Error:", e); }
  };

  const handleChange = (userId, field, value) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, [field]: value } : u));
  };

  const quickRenew = (userId) => {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    const dateStr = today.toISOString().split('T')[0];
    handleChange(userId, 'subscriptionEndDate', dateStr);
    updateDbField(userId, 'subscriptionEndDate', dateStr);
    handleChange(userId, 'role', 'premium');
    updateDbField(userId, 'role', 'premium');
  };

  const handleDeleteUser = async (userId, name) => {
    if (window.confirm(`حذف ${name} نهائياً؟`)) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers(prev => prev.filter(u => u.id !== userId));
      } catch (e) { alert("فشل الحذف");
        console.error("Delete error:", e);
       }
    }
  };

  const getDaysLeft = (dateStr) => {
    if (!dateStr) return -999;
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // --- الإحصائيات ---
  const stats = useMemo(() => {
    return {
      total: users.length,
      premium: users.filter(u => u.role === 'premium').length,
      plans: {
        start: users.filter(u => u.planType === 'start' && u.role === 'premium').length,
        pro: users.filter(u => u.planType === 'pro' && u.role === 'premium').length,
        turbo: users.filter(u => u.planType === 'turbo' && u.role === 'premium').length,
      }
    };
  }, [users]);

  // --- الفلترة ---
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(user => 
      (user.name && user.name.toLowerCase().includes(term)) ||
      (user.phoneNumber && user.phoneNumber.includes(term)) ||
      (user.whatsappGroup && user.whatsappGroup.toLowerCase().includes(term))
    );
  }, [users, searchTerm]);

  if (loading) return <div className={styles.loading}>جاري تحميل البيانات...</div>;

  return (
    <div className={styles.container}>
      
      {/* 1. Header Stats */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.iconBox}><FaUsers /></div>
          <div><h3>{stats.total}</h3><p>المسجلين</p></div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.iconBox} style={{background:'#e6f8ec', color:'#25D366'}}><FaCrown /></div>
          <div><h3>{stats.premium}</h3><p>النشطين</p></div>
        </div>
        <div className={styles.plansCard}>
          <span>Start: <strong>{stats.plans.start}</strong></span>
          <span>Pro: <strong>{stats.plans.pro}</strong></span>
          <span>Turbo: <strong>{stats.plans.turbo}</strong></span>
        </div>
      </div>

      {/* 2. Search & Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="ابحث عن مشترك..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles.refreshBtn} onClick={fetchUsers}><FaSyncAlt /> تحديث</button>
      </div>

      {/* 3. Cards Grid (The Main View) */}
      <div className={styles.cardsGrid}>
        {filteredUsers.map(user => {
          const daysLeft = getDaysLeft(user.subscriptionEndDate);
          const isActive = user.role === 'premium' && daysLeft >= 0;

          return (
            <div key={user.id} className={`${styles.userCard} ${isActive ? styles.activeCard : ''}`}>
              
              {/* Header: Name, Gender, Role, Delete */}
              <div className={styles.cardHeader}>
                <div className={styles.userInfo}>
                  <div className={styles.avatar}>
                    {user.gender === 'female' ? <FaVenus color="#ec4899" /> : user.gender === 'male' ? <FaMars color="#3b82f6" /> : '?'}
                  </div>
                  <div>
                    <h3 className={styles.userName}>{user.name || 'بدون اسم'}</h3>
                    <span className={styles.userEmail}>{user.email}</span>
                  </div>
                </div>
                
                <div className={styles.headerActions}>
                  <select
                    value={user.role}
                    onChange={e => { handleChange(user.id, 'role', e.target.value); updateDbField(user.id, 'role', e.target.value); }}
                    className={`${styles.roleBadge} ${styles[user.role]}`}
                  >
                    {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <button className={styles.deleteIcon} onClick={() => handleDeleteUser(user.id, user.name)}><FaTrash /></button>
                </div>
              </div>

              <hr className={styles.divider} />

              {/* Body: Inputs Grid */}
              <div className={styles.cardBody}>
                
                {/* Contact Section */}
                <div className={styles.fieldGroup}>
                  <label><FaPhone /> الهاتف</label>
                  <div className={styles.inputWithAction}>
                    <input 
                      type="text" 
                      value={user.phoneNumber} 
                      onChange={(e) => handleChange(user.id, 'phoneNumber', e.target.value)}
                      onBlur={(e) => updateDbField(user.id, 'phoneNumber', e.target.value)}
                      placeholder="06..."
                    />
                    {user.phoneNumber && (
                      <a href={`https://wa.me/${user.phoneNumber.replace('+','')}`} target="_blank" className={styles.waBtn}><FaWhatsapp /></a>
                    )}
                  </div>
                </div>

                {/* Plan Section */}
                <div className={styles.fieldGroup}>
                  <label><FaLayerGroup /> الباقة & الفوج</label>
                  <div className={styles.rowInputs}>
                    <select 
                      value={user.planType}
                      onChange={(e) => { handleChange(user.id, 'planType', e.target.value); updateDbField(user.id, 'planType', e.target.value); }}
                    >
                      {PLAN_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <input 
                      type="text" 
                      value={user.whatsappGroup} 
                      placeholder="G1.."
                      onChange={(e) => handleChange(user.id, 'whatsappGroup', e.target.value)}
                      onBlur={(e) => updateDbField(user.id, 'whatsappGroup', e.target.value)}
                    />
                  </div>
                </div>

                {/* Subscription Date */}
                <div className={styles.fieldGroup}>
                  <label><FaCalendarCheck /> تاريخ الانتهاء</label>
                  <div className={styles.rowInputs}>
                    <input 
                      type="date" 
                      value={user.subscriptionEndDate}
                      onChange={(e) => { handleChange(user.id, 'subscriptionEndDate', e.target.value); updateDbField(user.id, 'subscriptionEndDate', e.target.value); }}
                    />
                    <button className={styles.quickRenew} onClick={() => quickRenew(user.id)}>+30</button>
                  </div>
                  
                  {user.role === 'premium' && (
                    <div className={`${styles.daysLeft} ${daysLeft < 3 ? styles.urgent : ''}`}>
                      {daysLeft >= 0 ? `🟢 باقي ${daysLeft} يوم` : `🔴 منتهي (${Math.abs(daysLeft)} يوم)`}
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}