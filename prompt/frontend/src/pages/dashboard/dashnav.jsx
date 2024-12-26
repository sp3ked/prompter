import React from 'react';
import { Settings, User, Search } from 'lucide-react';

const DashNav = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <span className="logo">chainer</span>
        <span className="nav-item">My Prompts</span>
        <span className="nav-item">Learn</span>
      </div>
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      <div className="nav-right">
        <Settings className="nav-icon" size={20} />
        <User className="nav-icon" size={20} />
      </div>
    </nav>
  );
};

export default DashNav;