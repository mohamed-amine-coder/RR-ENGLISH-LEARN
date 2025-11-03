import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig"; // تأكد من المسار صحيح

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        gender: "unknown",
        role: "free",
        lastLessonLearn: 0,
        lastLessonPractice: 0,
        createdAt: new Date().toISOString(),
      });
    }

    // **مهم:** نرجع user باش try/catch فـ Login.jsx يعرف أن العملية نجحت
    return user;
  } catch (error) {
    console.error("❌ خطأ في تسجيل الدخول:", error);
    throw error; // خليه باش catch فـ Login.jsx يمسك الخطأ
  }
};
