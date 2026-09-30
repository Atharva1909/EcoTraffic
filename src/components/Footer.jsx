import React from 'react';
import { Leaf, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <div className="footer-icon">
                <Leaf size={18} />
              </div>
              <span className="footer-title">EcoTraffic</span>
            </div>
            <p className="footer-subtitle">
              Sustainable Traffic & Awareness Dashboard — College Assignment Prototype
            </p>
          </div>

          <button 
            type="button" 
            className="btn-back-top" 
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-disclaimer">
            Academic Demonstration Model • All emission figures, vehicle volumes, and speed calculations are prototype estimates based on standard urban vehicular emission factors. No external APIs or proprietary tracking required.
          </p>
          <p className="footer-credits">
            Built with React & Vite • 100% Client-Side Execution
          </p>
        </div>
      </div>
    </footer>
  );
}
