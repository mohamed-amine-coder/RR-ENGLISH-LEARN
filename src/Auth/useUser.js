import { useContext } from "react";
import { UserContext } from "./UserContext";

/**
 * Custom hook to access user and user data from UserContext
 * @returns {Object} { user, userData, loading, error, isAuthenticated }
 */
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  
  return context;
};
