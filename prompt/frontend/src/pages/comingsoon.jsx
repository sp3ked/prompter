import React from "react";
import "../src/comingsoon.css";

const ComingSoon = () => {
  return (
    <div className="comingSoonContainer">
      <div className="comingSoonContent">
        <a href="#" className="button1">
          <span>Pyras</span>
          <i></i>
        </a>
        <h2 className="comingSoonText">Coming Soon</h2>
        <h3 className="comingSoonText2">Q2 2024</h3>
      </div>
      <footer className="comingSoonFooter">
        <a
          href="https://twitter.com/PyrasAi"
          className="footerLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </footer>
    </div>
  );
};

export default ComingSoon;
