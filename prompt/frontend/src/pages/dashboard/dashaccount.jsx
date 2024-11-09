import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./dashaccount.css";

const ProfilePage = () => {
  const navigate = useNavigate();

  const settingsItems = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
  ];

  return (
    <div className="profile-page">
      <header className="profile-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ChevronLeft size={24} />
          <span>Back</span>
        </button>
        <h1>Profile</h1>
      </header>
      <div className="profile-content">
        <h2>Settings</h2>
        <ul className="settings-list">
          {settingsItems.map((item) => (
            <li key={item.id} className="settings-item">
              <span>{item.title}</span>
              <ChevronRight size={20} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;