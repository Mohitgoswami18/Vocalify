import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AnalyzeVoice from "./components/AnalyzeVoice";
import History from "./components/History";
import Profile from "./components/Profile";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import LandingLayout from "./components/LandingLayout.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import NotFound from "./components/NotFound.jsx";
import SsoCallback from "./components/SsoCallback.jsx";
import AnalysisResult from "./components/AnalysisResult.jsx";
import LearnMoreMetrics from "./components/LearnMoreMetrics.jsx";
import RecordPractice from "./components/LiveRecording.jsx";

const App = () => {
  return (
    // Unprotected Routes
    <>
      <Routes>
        <Route path="/" element={<LandingLayout></LandingLayout>}></Route>
        <Route path="/auth/signup" element={<Signup></Signup>}></Route>
        <Route path="/auth/login" element={<Login></Login>}></Route>
        <Route
          path="/sso-callback"
          element={<SsoCallback></SsoCallback>}
        ></Route>
        <Route path="/help/analysis-metrics" element={<LearnMoreMetrics />} />
      </Routes>
      <SignedIn>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/:username/dashboard" element={<Dashboard />} />
            <Route path="/:username/analyze" element={<AnalyzeVoice />} />
            <Route path="/:username/history" element={<History />} />
            <Route path="/:username/profile" element={<Profile />} />
            <Route path="/:username/recording" element={<RecordPractice />} />
            <Route
              path="/:username/analysisResult"
              element={<AnalysisResult />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SignedIn>
    </>
  );
};

export default App;
