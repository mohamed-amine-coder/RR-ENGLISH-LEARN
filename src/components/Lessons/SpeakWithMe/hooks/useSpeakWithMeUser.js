import { useEffect, useMemo, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../../Auth/firebaseConfig';

function useSpeakWithMeUser() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            setUserData({ role: 'free', name: user.displayName || 'المتعلم' });
          }
        } catch (error) {
          console.error('Error:', error);
          setUserData({ role: 'free', name: 'المتعلم' });
        }
      } else {
        setUserData({ role: 'free', name: 'زائر' });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const normalizedUser = useMemo(() => {
    const { role: rawRole, name } = userData || { role: 'free', name: 'زائر' };
    return {
      role: rawRole ? rawRole.toLowerCase() : 'free',
      name,
    };
  }, [userData]);
  
  return { loading, ...normalizedUser };
}

export default useSpeakWithMeUser;
