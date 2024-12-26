import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashNav from './dashnav';
import './dash.css';

const Dash = () => {
  const navigate = useNavigate();

  const handlePromptClick = (promptId) => {
    navigate(`/builder/${promptId}`);
  };

  return (
    <div className="dashboard">
      <DashNav />

      <div className="main-content">

        {/* My Prompts Section */}
        <section className="prompt-section">
          <h2>My Prompts</h2>
          <div className="prompt-scroll">
            <div className="prompt-card new-prompt">
              <Plus size={24} />
            </div>
            <div 
              className="prompt-card"
              onClick={() => handlePromptClick('pp')}
            >
              <span>PP</span>
            </div>
            <div 
              className="prompt-card"
              onClick={() => handlePromptClick('study')}
            >
              <span>Study</span>
            </div>
            <div className="prompt-card empty"></div>
          </div>
        </section>

        {/* Popular Section */}
        <section className="prompt-section">
          <h2>Popular</h2>
          <div className="prompt-scroll">
            <div 
              className="prompt-card"
              onClick={() => handlePromptClick('fortnite')}
            >
              <span>Fortnite</span>
            </div>
            <div 
              className="prompt-card"
              onClick={() => handlePromptClick('study-popular')}
            >
              <span>Study</span>
            </div>
            <div className="prompt-card empty"></div>
          </div>
        </section>
      </div>

      {/* Wave Background */}
      <div className="wave-background"></div>
    </div>
  );
};

export default Dash;