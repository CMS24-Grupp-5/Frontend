import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Symbol from "../../../images/Symbol.svg";
import { useProfile } from "../../../contexts/ProfileContext";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { profile } = useProfile();

  const releData = JSON.parse(localStorage.getItem("role"));
  const role = releData.role || "Användare";

  const firstName = profile?.firstName || "Förnamn";
  const lastName = profile?.lastName || "";

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
          <div
            className="user-profile clickable"
            onClick={() => navigate("/profile")}
          >
            <div className="profile-image">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="profile-info">
              <span className="user-name">
                {firstName} {lastName}
              </span>
              <span className="user-role">{role}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
