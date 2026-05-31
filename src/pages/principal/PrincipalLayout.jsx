import { useState } from "react";
import { Outlet } from "react-router-dom";
import PrincipalSidebar from "./components/PrincipalSidebar";
import PrincipalNavbar from "./components/PrincipalNavbar";
import "./Principal.css";

export default function PrincipalLayout() {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  return (
    <div className="principal-dashboard-wrapper">
      <PrincipalSidebar collapsed={sidebarHidden} />

      <main className="principal-main-content">
        <PrincipalNavbar onToggleSidebar={() => setSidebarHidden(!sidebarHidden)} />

        <div className="principal-page-wrapper">
           <Outlet context={{ sidebarHidden }} />
        </div>
      </main>
    </div>
  );
}
