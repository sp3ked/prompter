import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import DashNavbar from "./dashnav";
import DashContent from "./dashcontent";
import "./dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const cartRef = useRef(null);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard">
      <DashNavbar 
        onOpenCart={handleOpenCart} 
        showAccount={showAccount}
        setShowAccount={setShowAccount}
      />
      <DashContent
        initialSearchQuery={searchQuery}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartRef={cartRef}
        showAccount={showAccount}
        setShowAccount={setShowAccount}
      />
    </div>
  );
};

export default Dashboard;