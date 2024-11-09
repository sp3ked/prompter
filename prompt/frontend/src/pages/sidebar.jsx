import React from "react";
import { Link } from "react-router-dom";
import logo from "/SuperShopTextBlue.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={logo} />
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/dashboard" className="sidebar-link">
            Dashboard
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/host" className="sidebar-link">
            Host
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/rent" className="sidebar-link">
            Rent
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/" className="signout">
            Sign out
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
