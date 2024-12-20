import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../assets/images/logo.png";
import Sidebar from "./Sidebar";
import Topnav from "./Topnav";

export default function Navbar() {
  const [displaySidebar, setdisplaySidebar] = useState(""); // By default hide side bar
  // Initial Sate of the Nav bar is set to this
  const [links, setLinks] = useState({
    Explore: "/service",
    "Sign up": "/signup",
    Login: "/login",
  });

  // Update state on Login, When User is logged in, Changed the naviagation to this
  useEffect(() => {
    // Incase if user is admin
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("UserID") &&
      localStorage.getItem("UserRole") === "admin"
    ) {
      setLinks({
        "Admin Panel": "/admin",
        Home: "/",
        Explore: "/service",
        Profile: "/profile",
        Logout: "/logout",
      }); // Menu items
    } else if (
      localStorage.getItem("token") &&
      localStorage.getItem("UserID")
    ) {
      setLinks({
        Home: "/",
        Explore: "/service",
        Profile: "/profile",
        Logout: "/logout",
      });
    }
  }, []);
  // Toggle sidebar when hamburger button is clicked
  const toggleSideBar = (e) => {
    setdisplaySidebar(displaySidebar === "" ? "nav-open" : ""); // Toggle class
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
