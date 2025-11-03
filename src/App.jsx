import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./Admin/AdminPanel.jsx"
import AdminRoute from "./routes/AdminRoute";
import Navbar from "./components/landing/Navbar.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Learn from "./components/Lessons/Learn/Learn.jsx";
import Practice from "./components/Lessons/Practice/Practice.jsx";
import Login from "./components/landing/Login.jsx";
import StartSection from "./components/landing/StartSection.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lessons/learn" element={<Learn />} />
        <Route path="/lessons/practice" element={<Practice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/start" element={<StartSection />} />
        <Route path="/admin" element={<AdminRoute> <AdminPanel /> </AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
