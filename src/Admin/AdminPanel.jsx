import React, { useEffect, useState } from "react";
import { db } from "../Auth/firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import styles from "./AdminPanel.module.css";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role: newRole });
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleGenderChange = async (userId, newGender) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { gender: newGender });
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, gender: newGender } : u));
  };

  return (
    <div className={styles.container}>
      <h2>لوحة إدارة المستخدمين</h2>
      {loading ? <p>جاري التحميل...</p> : null}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد</th>
            <th>الجنس</th>
            <th>الدور</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.gender}
                  onChange={e => handleGenderChange(user.id, e.target.value)}
                >
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </td>
              <td>
                <select
                  value={user.role}
                  onChange={e => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
