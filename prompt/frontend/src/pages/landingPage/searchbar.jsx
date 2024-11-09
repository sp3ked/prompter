import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./section1.css";

const SearchBar = () => {
  const placeholders = [
    "Smart home devices...",
    "Laptops...",
    "Headphones...",
    "Gaming consoles...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsScrolling(true);
      setTimeout(() => {
        setPlaceholderIndex(
          (prevIndex) => (prevIndex + 1) % placeholders.length,
        );
        setIsScrolling(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header>
      <form onSubmit={handleSearch} className="searchbar">
        <input
          type="text"
          placeholder={placeholders[placeholderIndex]}
          className={isScrolling ? "scroll-out" : "scroll-in"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
