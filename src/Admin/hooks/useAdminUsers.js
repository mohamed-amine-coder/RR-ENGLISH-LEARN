import { useCallback, useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../Auth/firebaseConfig';
import { normalizeUserDoc } from '../utils/adminUsers';

function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const usersCollection = collection(db, 'users');
      const snapshot = await getDocs(usersCollection);
      setUsers(snapshot.docs.map(normalizeUserDoc));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateDbField = useCallback(async (userId, field, value) => {
    try {
      const userRef = doc(db, 'users', userId);
      const payload =
        field === 'subscriptionEndDate' && value
          ? { [field]: Timestamp.fromDate(new Date(value)) }
          : { [field]: value };
      await updateDoc(userRef, payload);
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  const setFieldLocal = useCallback((userId, field, value) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, [field]: value } : user)));
  }, []);

  const setFieldAndSync = useCallback(
    (userId, field, value) => {
      setFieldLocal(userId, field, value);
      updateDbField(userId, field, value);
    },
    [setFieldLocal, updateDbField]
  );

  const quickRenew = useCallback(
    (userId) => {
      const today = new Date();
      today.setDate(today.getDate() + 30);
      const dateStr = today.toISOString().split('T')[0];
      setFieldAndSync(userId, 'subscriptionEndDate', dateStr);
      setFieldAndSync(userId, 'role', 'premium');
    },
    [setFieldAndSync]
  );

  const deleteUser = useCallback(async (userId, name) => {
    if (!window.confirm(`حذف ${name} نهائياً؟`)) return;
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      alert('فشل الحذف');
      console.error('Delete error:', error);
    }
  }, []);

  return {
    users,
    loading,
    refreshUsers: fetchUsers,
    setFieldLocal,
    setFieldAndSync,
    quickRenew,
    deleteUser,
  };
}

export default useAdminUsers;
