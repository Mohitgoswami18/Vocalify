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

const App = () => {
  return (
    // Unprotected Routes
    <>
        <Routes>
          <Route path="/" element={<LandingLayout></LandingLayout>}></Route>
          <Route path="/auth/signup" element={<Signup></Signup>}></Route>
          <Route path="/auth/login" element={<Login></Login>}></Route>
          <Route path="/sso-callback" element={<SsoCallback></SsoCallback>}></Route>
        </Routes>
      <SignedIn>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analyze" element={<AnalyzeVoice />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </SignedIn>
    </>
  );
};

export default App;
