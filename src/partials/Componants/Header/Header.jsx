import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Dashboard</h1>
          <p>Hello Orlando, welcome back!</p>
        </div>

        <div className="header-search">
          <input type="text" placeholder="Search anything" />
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>

        <div className="header-icons">
          <button className="icon-button">
            <i className="fa-solid fa-bell"></i>
          </button>
          <button className="icon-button">
            <i className="fa-solid fa-gear"></i>
          </button>
          <div className="user-profile">
            <div className="profile-image">
              <i class="fa-solid fa-user"></i>
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
