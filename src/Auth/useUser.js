import { useUser as useUserContext } from './UserContext';

/**
 * Hook مخصص لجلب بيانات المستخدم الحالية
 * returns: { userData, loading, isAuthenticated }
 */
export const useUser = () => {
  const context = useUserContext();
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
