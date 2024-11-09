import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/SuperShopTextBlue.png"; // Make sure this path is correct

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [buttonAnimate, setButtonAnimate] = useState(false);
  const [roundPosition, setRoundPosition] = useState({
    top: "5px",
    left: "10px",
  });
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleMouseEnter = (event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const buttonX = event.clientX - buttonRect.left;
    const buttonY = event.clientY - buttonRect.top;

    setButtonAnimate(true);
    setRoundPosition({
      top: buttonY < 24 ? "0px" : buttonY > 30 ? "48px" : "5px",
      left: `${buttonX}px`,
    });
  };

  const handleMouseLeave = (event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const buttonX = event.clientX - buttonRect.left;
    const buttonY = event.clientY - buttonRect.top;

    setButtonAnimate(false);
    setRoundPosition({
      top: buttonY < 24 ? "0px" : buttonY > 30 ? "48px" : "5px",
      left: `${buttonX}px`,
    });
  };

  return (
    <nav
      className={`nav ${scrolled ? "scrolled" : ""} ${
        isLoginPage ? "login-page-nav" : ""
      }`}
    >
      <Link className="logo" to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <div className="cent-navv">
        <Link className="navv-item" to="/shop1">
          <span>Shop</span>
        </Link>
        <Link className="navv-item" to="/shop2">
          <span>Shop</span>
        </Link>
        <Link className="navv-item" to="/shop3">
          <span>Shop</span>
        </Link>
      </div>
      <div className="login-button-container">
        <Link
          to="/login"
          className={`primary-button ${buttonAnimate ? "animate" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>Login</span>
          <div
            className="round"
            style={{
              top: roundPosition.top,
              left: roundPosition.left,
              width: "1px",
              height: "1px",
            }}
          ></div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
