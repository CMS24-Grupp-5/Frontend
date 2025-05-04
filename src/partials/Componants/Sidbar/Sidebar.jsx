import React from "react";
import "./Sidebar.css";
import Symbol from "../../../images/Symbol.svg";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={Symbol} className="logo" alt="" />
        <span>Ventixe</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <i className="fa-solid fa-grip"></i> <span> Dashboard</span>
          </li>
          <li>
            <i className="fa-solid fa-calendar-check"></i>{" "}
            <span> Bookings</span>
          </li>
          <li>
            <i className="fa-solid fa-file-invoice"></i> <span> Invoices</span>
          </li>
          <li>
            <i className="fa-solid fa-inbox"></i> <span> Inbox </span>
          </li>
          <li>
            <i className="fa-solid fa-calendar"></i> <span> Calendar </span>
          </li>
          <li>
            <i className="fa-solid fa-calendar-days"></i> <span> Events </span>
          </li>
          <li>
            <i className="fa-solid fa-dollar-sign"></i>{" "}
            <span> Financials </span>
          </li>
          <li>
            <i className="fa-solid fa-image"></i> <span> Gallery </span>
          </li>
          <li>
            <i className="fa-solid fa-star"></i> <span> Feedback </span>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="upgrade-box">
          <img src="/assets/img/upgrade.png" alt="Upgrade" />
          <p>
            Experience enhanced features and a smoother interface with the
            latest version of Ventixe
          </p>
          <button className="upgrade-btn">Try New Version</button>
        </div>
        <button className="logout-btn">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
          <span> Sign Out </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
