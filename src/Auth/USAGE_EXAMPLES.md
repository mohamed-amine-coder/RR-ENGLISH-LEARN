/**
 * USAGE EXAMPLES FOR useUser HOOK
 * 
 * Import the hook in any component:
 * import { useUser } from "@/Auth/useUser";
 */

// Example 1: Basic usage in a component
import { useUser } from "@/Auth/useUser";

function UserProfile() {
  const { user, userData, loading, error, isAuthenticated } = useUser();

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!isAuthenticated) return <p>Please log in</p>;

  return (
    <div>
      <h1>Welcome, {userData?.name || user?.displayName}</h1>
      <p>Email: {userData?.email || user?.email}</p>
      <p>Plan: {userData?.role}</p>
      <p>Last Lesson: {userData?.lastLessonLearn}</p>
    </div>
  );
}

// Example 2: Conditional rendering based on plan
function PremiumFeature() {
  const { userData, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <p>Please sign up to access this feature</p>;
  }

  if (userData?.role !== "premium") {
    return <p>Upgrade to premium to access this feature</p>;
  }

  return <div>Premium content here</div>;
}

// Example 3: Using in conjunction with other data
function LessonProgress() {
  const { userData } = useUser();

  return (
    <div>
      <p>Lessons Completed: {userData?.lastLessonLearn}</p>
      <p>Practices Completed: {userData?.lastLessonPractice}</p>
      <p>Member since: {new Date(userData?.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

/**
 * CONTEXT STRUCTURE
 * 
 * user: Firebase auth user object
 *   - uid
 *   - displayName
 *   - email
 *   - photoURL
 *   - etc.
 * 
 * userData: Firestore user document
 *   - name
 *   - email
 *   - gender
 *   - role (free, premium, etc.)
 *   - lastLessonLearn
 *   - lastLessonPractice
 *   - createdAt
 *   - (any other fields you add to the users collection)
 * 
 * loading: boolean - true while fetching data
 * error: string | null - error message if fetch fails
 * isAuthenticated: boolean - shorthand for !!user
 * 
 * FEATURES
 * ✅ Single source of truth for user data
 * ✅ Real-time updates via Firestore onSnapshot
 * ✅ Automatic cleanup on logout
 * ✅ Loading and error states
 * ✅ No multiple Firestore reads - data is fetched once and cached in context
 * ✅ Works across all components that need user data
 */
