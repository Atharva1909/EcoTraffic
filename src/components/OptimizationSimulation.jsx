import React, { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, Sliders, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

export default function OptimizationSimulation({ isOptimized, onOptimize, onReset, baselineTotals, optimizedTotals }) {
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      onOptimize();
      setIsSimulating(false);
    }, 450); // subtle smooth calculation feedback
  };

  const co2Saved = baselineTotals.totalCO2 - optimizedTotals.totalCO2;
  const fuelSaved = baselineTotals.totalFuelWasted - optimizedTotals.totalFuelWasted;
  const timeSaved = Math.round((baselineTotals.avgIdleTime - optimizedTotals.avgIdleTime) * 10) / 10;
  const speedGain = Math.round((optimizedTotals.avgSpeed - baselineTotals.avgSpeed) * 10) / 10;

  return (
    <section className="section-container" id="simulation">
      <div className="simulation-box">
        <div className="simulation-header-block">
          <div className="simulation-badge">
            <Zap size={15} />
            <span>Interactive Experiment</span>
          </div>
          <h3 className="simulation-main-title">Interactive Traffic Optimization Simulation</h3>
          <p className="simulation-description">
            Test how software-coordinated traffic algorithms impact urban emissions. Click below to simulate intelligent signal synchronization, adaptive bottleneck diversion, and public transport priority across the 5 monitored corridors.
          </p>
        </div>

        {/* Primary Interactive Action Area */}
        <div className="simulation-control-card">
          <div className="control-left">
            <h4 className="control-title">Simulation Control Panel</h4>
            <p className="control-desc">
              Status: <strong>{isOptimized ? 'Optimized Scenario Active' : 'Baseline Traffic State'}</strong>
            </p>
          </div>

          <div className="control-actions">
            {!isOptimized ? (
              <button
                type="button"
                className="btn-sim-primary"
                onClick={handleRunSimulation}
                disabled={isSimulating}
              >
                <Sparkles size={18} />
                <span>{isSimulating ? 'Optimizing Corridors...' : 'Optimize Traffic'}</span>
              </button>
            ) : (
              <div className="button-group-dual">
                <button
                  type="button"
                  className="btn-sim-reset"
                  onClick={onReset}
                >
                  <RotateCcw size={16} />
                  <span>Reset Baseline</span>
                </button>
                <button
                  type="button"
                  className="btn-sim-optimized-active"
                  disabled
                >
                  <CheckCircle2 size={16} />
                  <span>Conditions Optimized</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Simulation Result Message (Requested in instructions) */}
        {isOptimized && (
          <div className="simulation-alert-success" role="status">
            <div className="alert-icon-wrap">
              <CheckCircle2 size={24} />
            </div>
            <div className="alert-content">
              <h5 className="alert-headline">Simulation Complete</h5>
              <p className="alert-body">
                Simulation complete: optimized traffic can potentially reduce congestion and emissions.
              </p>
              <span className="alert-disclaimer">
                *Notice: This is a prototype simulation using sample data to demonstrate technology-assisted sustainability benefits.
              </span>
            </div>
          </div>
        )}

        {/* Simulated Interventions Breakdown (Viva Explanation Aid) */}
        <div className="interventions-grid">
          <div className="intervention-item">
            <div className="intervention-icon-box">
              <Sliders size={18} />
            </div>
            <div>
              <h5 className="intervention-title">1. Adaptive Signal Coordination</h5>
              <p className="intervention-text">
                Dynamic green-wave signals adjust phase length according to live queue lengths, reducing standstill vehicle delays by up to 45%.
              </p>
            </div>
          </div>

          <div className="intervention-item">
            <div className="intervention-icon-box">
              <Zap size={18} />
            </div>
            <div>
              <h5 className="intervention-title">2. Bottleneck Eco-Routing</h5>
              <p className="intervention-text">
                Re-routing suggestions divert 10–15% of arterial flow to adjacent low-density links, preventing highway junction choke points.
              </p>
            </div>
          </div>

          <div className="intervention-item">
            <div className="intervention-icon-box">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h5 className="intervention-title">3. Public Transit Prioritization</h5>
              <p className="intervention-text">
                Dedicated signal priority for high-occupancy buses shifts commuter volume away from single-occupancy personal vehicles.
              </p>
            </div>
          </div>
        </div>

        {/* Quantified Outcomes Summary */}
        <div className="outcomes-strip">
          <div className="outcome-col">
            <span className="outcome-label">CO₂ Prevented</span>
            <span className="outcome-val text-emerald">
              {isOptimized ? `-${co2Saved} kg/hr` : '0 kg/hr'}
            </span>
          </div>
          <div className="outcome-col">
            <span className="outcome-label">Fuel Conserved</span>
            <span className="outcome-val text-amber">
              {isOptimized ? `~${fuelSaved} L/hr` : '0 L/hr'}
            </span>
          </div>
          <div className="outcome-col">
            <span className="outcome-label">Speed Enhancement</span>
            <span className="outcome-val text-blue">
              {isOptimized ? `+${speedGain} km/h` : '0 km/h'}
            </span>
          </div>
          <div className="outcome-col">
            <span className="outcome-label">Idle Delay Cut</span>
            <span className="outcome-val text-purple">
              {isOptimized ? `-${timeSaved} min` : '0 min'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
