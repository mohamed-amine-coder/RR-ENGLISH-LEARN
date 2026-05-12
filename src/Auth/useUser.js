// import { useContext } from "react";
// import { UserContext } from "./UserContext";

// /**
//  * Custom hook to access user and user data from UserContext
//  * @returns {Object} { user, userData, loading, error, isAuthenticated }
//  */
// export const useUser = () => {
//   const context = useContext(UserContext);
  
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
  
//   return context;
// };

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
