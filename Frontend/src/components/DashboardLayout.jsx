import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6 flex-1">
          <Outlet />
        </div>

        <footer className="py-4 text-center text-xs text-gray-400">
          © 2026 Vocalify. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default DashboardLayout;
