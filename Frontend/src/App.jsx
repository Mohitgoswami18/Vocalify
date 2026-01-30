import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AnalyzeVoice from "./components/AnalyzeVoice";
import History from "./components/History";
import Profile from "./components/Profile";
import Landing from "./components/LandingPage.jsx"
import Feature from "./components/FeatureSection.jsx"
import AnalyticSection from "./components/AnalyticSection.jsx"
import BeforeAfterSection from "./components/BeforeAfterSection.jsx"
import Testimonal from "./components/Testimonal.jsx"
import Footer from "./components/Footer.jsx"
import PricingSection from "./components/PricingSection.jsx"

const App = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyze" element={<AnalyzeVoice />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
