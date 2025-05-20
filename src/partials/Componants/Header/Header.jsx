import React from "react";
import "./Header.css";
import Symbol from "../../../images/Symbol.svg";
import UserProfileBox from "../../pages/auth/Profile/UserProfileBox";

const Header = ({ onMenuClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-mobil">
          <img src={Symbol} className="logo" alt="Logo" />
          <h3>Dashboard</h3>
          <button className="menu-toggle" onClick={onMenuClick}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        <div className="header-title">
          <h1>Dashboard</h1>
          <p>Hej, välkommen tillbaka!</p>
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
          <UserProfileBox />
        </div>
      </div>
    </header>
  );
};

export default Header;
