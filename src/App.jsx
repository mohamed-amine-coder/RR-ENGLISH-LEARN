
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./Admin/AdminPanel.jsx"
import AdminRoute from "./routes/AdminRoute";
import Profile from "./components/landing/Profile.jsx";
import Navbar from "./components/landing/Navbar.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Learn from "./components/Lessons/Learn/Learn.jsx";
import Practice from "./components/Lessons/Practice/Practice.jsx";
import SpeakWithMe from "./components/Lessons/SpeakWithMe/SpeakWithMe.jsx";
import Login from "./components/landing/Login.jsx";
import UpgradePlan from "./components/landing/UpgradePlan.jsx";
import NotFound from "./pages/NotFound.jsx";
import StartSection from "./components/landing/StartSection.jsx";
import ScrollToTop from "./components/landing/ScrollToTop.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lessons/learn" element={<Learn />} />
        <Route path="/lessons/practice" element={<Practice />} />
        <Route path="/speak-with-me" element={<SpeakWithMe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/start" element={<StartSection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upgrade-plan" element={<UpgradePlan />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<AdminRoute> <AdminPanel /> </AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
