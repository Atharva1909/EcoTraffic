import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, AlertCircle, TrendingDown } from 'lucide-react';

export default function Hero({ isOptimized, onOptimize, onReset }) {
  return (
    <section className="hero-section" id="dashboard">
      <div className="hero-inner">
        <div className="hero-pill-badge">
          <span className="pill-dot"></span>
          <span>College Sustainability Assignment • Prototype Solution</span>
        </div>

        <h2 className="hero-headline">
          Smarter traffic decisions can reduce congestion, fuel waste and unnecessary emissions.
        </h2>

        <p className="hero-description">
          Urban traffic congestion forces vehicles into repeated stop-and-go idling, burning millions of litres of fuel 
          needlessly and generating toxic carbon emissions. <strong>EcoTraffic</strong> models corridor-level telemetry to 
          quantify environmental impacts and demonstrate how intelligent traffic optimization promotes sustainable mobility.
        </p>

        {/* Live Simulation Banner */}
        <div className={`hero-status-card ${isOptimized ? 'status-optimized' : 'status-baseline'}`}>
          <div className="status-content">
            <div className="status-header-line">
              {isOptimized ? (
                <div className="status-badge-live badge-green">
                  <CheckCircle2 size={16} />
                  <span>Simulation Active: Traffic Conditions Optimized</span>
                </div>
              ) : (
                <div className="status-badge-live badge-amber">
                  <AlertCircle size={16} />
                  <span>Baseline Traffic Conditions: Elevated Congestion</span>
                </div>
              )}
              <span className="sample-data-note">Prototype estimates based on sample traffic data</span>
            </div>

            <p className="status-subtext">
              {isOptimized ? (
                <>
                  <strong className="highlight-green">Simulation complete:</strong> Adaptive signaling and eco-routing have reduced average idling times by <strong>47%</strong> and estimated network CO₂ emissions by <strong>29%</strong>.
                </>
              ) : (
                <>
                  Current telemetry shows unoptimized signal timing across 5 critical urban sectors, resulting in excessive vehicle idling, elevated fuel consumption, and unnecessary emissions.
                </>
              )}
            </p>
          </div>

          <div className="status-actions">
            {!isOptimized ? (
              <button 
                type="button" 
                className="btn-primary-action" 
                onClick={onOptimize}
              >
                <Sparkles size={18} />
                <span>Optimize Traffic Now</span>
              </button>
            ) : (
              <button 
                type="button" 
                className="btn-secondary-action" 
                onClick={onReset}
              >
                <span>Reset to Baseline</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
