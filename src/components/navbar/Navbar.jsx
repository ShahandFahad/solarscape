import React, { useState } from "react";
import "./navbar.css";
import logo from "../../assets/images/logo.png";
import Sidebar from "./Sidebar";
import Topnav from "./Topnav";

export default function Navbar() {
  const [displaySidebar, setdisplaySidebar] = useState(""); // By default hide side bar
  // convert this to object: diplay key in name and link in href
  // const navItems = ["Home", "About", "Contact", "Sign up", "Login"]; // Menu items

  // App links: map over this display name in lable and links in to attribute
  const links = {
    Home: "/",
    About: "/about",
    Contact: "/contact",
    "Sign up": "/signup",
    Login: "/login",
  }; // Menu items

  // Toggle sidebar when hamburger button is clicked
  const toggleSideBar = (e) => {
    setdisplaySidebar(displaySidebar === "" ? "nav-open" : ""); // Toggle class
    // console.log(`Hide Side Bar: ${hideSidebar}`); // log result
  };

  return (
    <div className={displaySidebar}>
      <div className="header-wrap">
        {/* Toggle Sidebar and Logo*/}
        <div>
          {/* Toggle Sidebar */}
          <button
            aria-label="Main menu"
            className="header-nav-toggle btn-text"
            onClick={toggleSideBar}
            tabIndex="0"
          >
            <span className="material-icons-extended">
              {/* Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                style={{ width: "24px", height: "24px" }}
              >
                <path
                  fillRule="evenodd"
                  d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm0 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          {/* Logo */}
          <a className="header-title-link" href="/">
            <img alt="Solor Scape, Logo" className="header-logo" src={logo} />
          </a>
        </div>
        {/* Top Navbar */}
        <Topnav links={links} />
        {/* Sidebar */}
        {/* 
          Passing the toggle function when side link is clicked it navigated and hide the side the side bar
         */}
        <Sidebar links={links} toggleSideBar={toggleSideBar} />
      </div>
      {/* Display a mask over whole screen when side bar is open */}
      <div
        className="nav-mask"
        onClick={toggleSideBar}
        role="button"
        tabIndex="0"
      ></div>
    </div>
  );
}
