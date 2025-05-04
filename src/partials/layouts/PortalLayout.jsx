import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Componants/Header/Header";
import Sidebar from "../Componants/Sidbar/Sidebar";

const PortalLayout = () => {
  return (
    <div className="portal-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default PortalLayout;
