import React from "react";
import "../user/NotFound/NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">Obehörig åtkomst</h1>
        <p className="notfound-subtitle">
          Du har inte behörighet att se denna sida.
        </p>
        <p className="notfound-text">
          Det verkar som om du saknar rätt behörighet eller inte är inloggad.
        </p>
        <a href="/" className="notfound-link">
          Gå till startsidan
        </a>
      </div>
    </div>
  );
};

export default NotFound;
