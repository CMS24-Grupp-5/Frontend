import React from "react";
import "./Header.css";
import Symbol from "../../../images/Symbol.svg";

const Header = ({ onMenuClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-mobil">
          <img src={Symbol} className="logo" alt="" />
          <h3>Dashboard</h3>
          <button className="menu-toggle" onClick={onMenuClick}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className="header-title">
          <h1>Dashboard</h1>
          <p>Hello Orlando, welcome back!</p>
        </div>

        <div className="header-icons">
          <div className="header-search">
            <input type="text" placeholder="Search anything" />
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </div>
          <button className="icon-button">
            <i className="fa-solid fa-bell"></i>
          </button>
          <button className="icon-button">
            <i className="fa-solid fa-gear"></i>
          </button>
          <div className="user-profile">
            <div className="profile-image">
              <i className="fa-solid fa-user"></i>
            </div>

            <div className="profile-info">
              <span className="user-name">Orlando Laurentius</span>
              <span className="user-role">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
