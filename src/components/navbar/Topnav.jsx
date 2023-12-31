import React from "react";
import { Link } from "react-router-dom";

export default function Topnav({ links }) {
  return (
    <nav className="header-nav">
      <ul className="nav-section">
        {/* Iterate over menu items */}
        {/* {navItems.map((item) => {
          return (
            <li className="nav-item" key={item}>
              <a className="nav-link" href="##">
                {item}
              </a>
            </li>
          );
        })} */}

        {/* 
          Using Object.entries():
          Transforms object entries into an array of [key, value] pairs.
          Use map on this array to create links: 
        */}

        {Object.entries(links).map(([label, path]) => (
          <li className="nav-item" key={label}>
            <Link className="nav-link" key={path} to={path}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
