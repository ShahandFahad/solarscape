import React from "react";
import logo from "../../assets/images/logo.png";
import "./footerstyle.css";
export default function PublicFooter() {
  return (
    <div className="footer-wrapper border-gradient-top">
      <div className="footer-title-link">
        <img alt="logo" className="footer-logo" src={logo} />
      </div>
      <div className="footer-links">
        <span className="footer-link">
          CUIST FYP, All Rights Reserved 2024.
        </span>
        {/* 
        <a className="footer-link" href="/about-us">
          About
        </a>
        <a className="footer-link" href="/about-us">
          Contact
        </a>
        <a className="footer-link" href="/login">
          Login
        </a>
        <a className="footer-link" href="/signup">
          Signup
        </a>
        <button className="footer-link btn-text mobile-hide">
          <a className="footer-link" href="/about-us">
            Send feedback
          </a>
        </button>
      
      */}
      </div>
    </div>
  );
}
