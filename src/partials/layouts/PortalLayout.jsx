import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Componants/Header/Header"; // Lägg till importen här!

const PortalLayout = () => {
  return (
    <div className="portal-layout">
      <Header />
      <Outlet />
    </div>
  );
};

export default PortalLayout;
