import React from "react";
import logo from "../../assets/images/logo.png";
import "./footerstyle.css";
import { Link } from "react-router-dom";
export default function PublicFooter() {
  return (
    <div class="footer-wrapper border-gradient-top">
      <div class="footer-title-link">
        <img alt="logo" class="footer-logo" src={logo} />
      </div>
      <div class="footer-links">
        <span class="footer-link">CUIST FYP, All Rights Reserved 2024.</span>
        {/* 
        <a class="footer-link" href="/about-us">
          About
        </a>
        <a class="footer-link" href="/about-us">
          Contact
        </a>
        <a class="footer-link" href="/login">
          Login
        </a>
        <a class="footer-link" href="/signup">
          Signup
        </a>
        <button class="footer-link btn-text mobile-hide">
          <a class="footer-link" href="/about-us">
            Send feedback
          </a>
        </button>
      
      */}
      </div>
    </div>
  );
}
