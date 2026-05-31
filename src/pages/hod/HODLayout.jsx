import { useState } from "react";
import { Outlet } from "react-router-dom";
import HODSidebar from "./components/HODSidebar";
import HODNavbar from "./components/HODNavbar";
import "./HOD.css";

export default function HODLayout() {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  return (
    <div className="hod-dashboard-wrapper">
      <HODSidebar collapsed={sidebarHidden} />

      <main className="hod-main-content">
        <HODNavbar onToggleSidebar={() => setSidebarHidden(!sidebarHidden)} />

        <div className="hod-page-wrapper">
           <Outlet context={{ sidebarHidden }} />
        </div>
      </main>
    </div>
  );
}
