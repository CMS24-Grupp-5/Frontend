import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-subtitle">Sidan kunde inte hittas</p>
        <p className="notfound-text">
          Sidan du letar efter finns inte, eller så har den flyttats.
        </p>
        <a href="/" className="notfound-link">
          Till startsidan
        </a>
      </div>
    </div>
  );
};

export default NotFound;
