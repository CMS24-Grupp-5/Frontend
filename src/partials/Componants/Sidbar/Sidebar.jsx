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
            <i className="fa-solid fa-grip"></i> Dashboard
          </li>
          <li>
            <i className="fa-solid fa-calendar-check"></i> Bookings
          </li>
          <li>
            <i className="fa-solid fa-file-invoice"></i> Invoices
          </li>
          <li>
            <i className="fa-solid fa-inbox"></i> Inbox
          </li>
          <li>
            <i className="fa-solid fa-calendar"></i> Calendar
          </li>
          <li>
            <i className="fa-solid fa-calendar-days"></i> Events
          </li>
          <li>
            <i className="fa-solid fa-dollar-sign"></i> Financials
          </li>
          <li>
            <i className="fa-solid fa-image"></i> Gallery
          </li>
          <li>
            <i className="fa-solid fa-star"></i> Feedback
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
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
