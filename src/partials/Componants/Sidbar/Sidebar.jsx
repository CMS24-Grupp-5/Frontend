import React from "react";
import "./Sidebar.css";
import Symbol from "../../../images/Symbol.svg";

const Sidebar = ({ isOpen }) => {
  const Logout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/";
  };
  return (
    <aside className={`sidebar ${isOpen ? `` : "open"}`}>
      <div className="sidebar-logo">
        <a href="/">
          <img src={Symbol} className="logo" alt="" />
          <span>Ventixe</span>
        </a>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <a href="/">
            <li>
              <i className="fa-solid fa-grip"></i> <span>Dashboard</span>
            </li>
          </a>
          <a href="/bookings">
            <li>
              <i className="fa-solid fa-calendar-check"></i>{" "}
              <span>Bookings</span>
            </li>
          </a>

          {/* <li>
            <i className="fa-solid fa-file-invoice"></i> <span> Invoices</span>
          </li> */}
          {/* <li>
            <i className="fa-solid fa-inbox"></i> <span> Inbox </span>
          </li> */}
          {/* <li>
            <i className="fa-solid fa-calendar"></i> <span> Calendar </span>
          </li> */}
          <a href="/events">
            <li>
              <i className="fa-solid fa-calendar-days"></i>{" "}
              <span> Events </span>
            </li>
          </a>
          <li>
            <i className="fa-solid fa-dollar-sign"></i>{" "}
            <span> Financials </span>
          </li>
          <a href="/gallery">
            <li>
              <i className="fa-solid fa-image"></i> <span> Gallery </span>
            </li>
          </a>
          <li>
            <i className="fa-solid fa-star"></i> <span> Feedback </span>
          </li>
        </ul>
      </nav>
      <button onClick={Logout} className="logout-btn">
        <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
        <span> Sign Out </span>
      </button>
      {/* 
      <div className="sidebar-footer">
        <div className="upgrade-box">
          <img src="/assets/img/upgrade.png" alt="Upgrade" />
          <p>
            Experience enhanced features and a smoother interface with the
            latest version of Ventixe
          </p>
          <button className="upgrade-btn">Try New Version</button>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
