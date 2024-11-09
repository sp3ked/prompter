import React from "react";
import { Home, User, ShoppingCart, Bell, LogOut } from "lucide-react";
import "./dashnav.css";

const DashNavbar = ({ onOpenCart, showAccount, setShowAccount }) => {
  return (
    <nav className="dash-navbar">
      <div className="nav-header">
        <img src="/SSblue.png" alt="Logo" className="nav-logo" />
      </div>
      <div className="nav-items">
        <button className="nav-item" onClick={() => setShowAccount(false)}>
          <Home size={24} />
          <span className="nav-title">Home</span>
        </button>
        <button onClick={onOpenCart} className="nav-item">
          <ShoppingCart size={24} />
          <span className="nav-title">Cart</span>
        </button>
        <button className="nav-item">
          <Bell size={24} />
          <span className="nav-title">Notifications</span>
        </button>
      </div>
      <div className="bottom-nav-items">
        <button onClick={() => setShowAccount(!showAccount)} className="nav-item">
          <User size={24} />
          <span className="nav-title">Account</span>
        </button>
        <button className="nav-item logout-icon">
          <LogOut size={24} />
          <span className="nav-title">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default DashNavbar;