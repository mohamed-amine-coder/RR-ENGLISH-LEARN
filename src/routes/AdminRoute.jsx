
// src/routes/AdminRoute.jsx

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../Auth/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function AdminRoute({ children }) {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // 1. المستخدم غير مسجل الدخول (Auth is ready, but no user)
        setUserRole("guest");
        setLoading(false);
        return;
      }
      
      // 2. المستخدم مسجل الدخول، جلب دور وصلاحيات المستخدم
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // توحيد الدور إلى أحرف صغيرة للتأكد من المقارنة الصحيحة
          setUserRole(data.role ? data.role.toLowerCase() : 'none');
          setUserName(data.name || 'المسؤول');
        } else {
          // لم يتم العثور على وثيقة في Firestore
          setUserRole("none");
          setUserName('المستخدم غير معروف');
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole("none"); // في حالة وجود خطأ في جلب البيانات
      } finally {
        setLoading(false);
      }
    });

    // تنظيف المشترك (Cleanup subscription)
    return () => unsubscribe();
  }, []);

  // 🛡️ 1. صلاحيات العرض: حالة التحميل
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: '#007bff' }}>
          ✨ جاري التحقق من صلاحيات **{userName || 'المسؤول'}**، يرجى الانتظار...
        </p>
      </div>
    );
  }

  // ⛔ 2. صلاحيات الرفض: إذا لم يكن الدور 'admin'
  if (userRole !== "admin") {
    // يمكنك تخصيص رسالة خطأ أكثر تفصيلاً هنا
    console.warn(`Access denied for role: ${userRole}`);
    return <Navigate to="/start" replace={true} />; 
  }

  // ✅ 3. صلاحيات القبول: إذا كان الدور 'admin'
  return children;
}