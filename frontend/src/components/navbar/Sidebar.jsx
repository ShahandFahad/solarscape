import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ links, toggleSideBar }) {
  return (
    <nav className="sidebar-nav">
      <ul className="nav-section">
        {/* Iterate over menu items */}
        {/* 
          Using Object.entries():
          Transforms object entries into an array of [key, value] pairs.
          Use map on this array to create links: 
        */}
        {Object.entries(links).map(([label, path]) => (
          <li className="nav-item" key={label}>
            {/* on click navigate and toggle hide sidebar */}
            <Link
              onClick={toggleSideBar}
              className="nav-link"
              key={path}
              to={path}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
