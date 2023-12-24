import React from "react";

export default function Sidebar({ navItems }) {
  return (
    <nav className="sidebar-nav">
      <ul className="nav-section">
        {/* Iterate over menu items */}
        {navItems.map((item) => {
          return (
            <li className="nav-item" key={item}>
              <a className="nav-link" href="##">
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
