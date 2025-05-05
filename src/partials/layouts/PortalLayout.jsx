import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Componants/Header/Header";
import Sidebar from "../Componants/Sidbar/Sidebar";
import Footer from "../Componants/Footer/Footer";

const PortalLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="portal-layout">
      <Sidebar isOpen={sidebarOpen} />
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="page-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PortalLayout;
