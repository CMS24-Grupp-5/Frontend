import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">Copyright © 2025 Petradraw</div>

      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Term and conditions</a>
        <a href="#">Contact</a>
      </div>

      <div className="footer-icons">
        <i className="fa-regular fa-circle-question"></i>
        <i className="fa-regular fa-circle-xmark"></i>
        <i className="fa-regular fa-window-restore"></i>
        <i className="fa-regular fa-clone"></i>
      </div>
    </footer>
  );
};

export default Footer;
