import React from 'react';
import { Leaf, Activity, Sparkles, RotateCcw } from 'lucide-react';

export default function Header({ isOptimized, onToggleOptimize, activeSection }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand identity */}
        <div className="brand-group">
          <div className="brand-logo" aria-hidden="true">
            <Leaf className="logo-icon" size={24} />
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">EcoTraffic</h1>
              <span className="badge-tag">Academic Prototype</span>
            </div>
            <p className="brand-subtitle">Technology for cleaner and smarter mobility</p>
          </div>
        </div>

        {/* Minimal Navigation */}
        <nav className="site-nav" aria-label="Main Navigation">
          <button 
            type="button" 
            className="nav-link" 
            onClick={() => scrollTo('dashboard')}
          >
            Dashboard
          </button>
          <button 
            type="button" 
            className="nav-link" 
            onClick={() => scrollTo('traffic-status')}
          >
            Traffic Insights
          </button>
          <button 
            type="button" 
            className="nav-link" 
            onClick={() => scrollTo('sustainability-impact')}
          >
            Impact
          </button>
          <button 
            type="button" 
            className="nav-link" 
            onClick={() => scrollTo('sustainable-tips')}
          >
            Sustainable Tips
          </button>
        </nav>

        {/* Quick simulation status & action */}
        <div className="header-action-group">
          <button 
            type="button" 
            className={`btn-header-simulate ${isOptimized ? 'btn-optimized' : 'btn-baseline'}`}
            onClick={onToggleOptimize}
            title={isOptimized ? "Reset simulation to baseline traffic" : "Run traffic optimization simulation"}
          >
            {isOptimized ? (
              <>
                <RotateCcw size={16} />
                <span>Reset Baseline</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Optimize Traffic</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
