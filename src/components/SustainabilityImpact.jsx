import React from 'react';
import { CloudFog, Fuel, Clock, TrendingDown, Info, CheckCircle2 } from 'lucide-react';

export default function SustainabilityImpact({ baselineTotals, optimizedTotals, isOptimized }) {
  // Reduction calculations
  const co2ReductionPct = Math.round(((baselineTotals.totalCO2 - optimizedTotals.totalCO2) / baselineTotals.totalCO2) * 100);
  const fuelSavedLiters = baselineTotals.totalFuelWasted - optimizedTotals.totalFuelWasted;
  const fuelSavedPct = Math.round((fuelSavedLiters / baselineTotals.totalFuelWasted) * 100);
  const idleTimeSavedMinutes = Math.round((baselineTotals.avgIdleTime - optimizedTotals.avgIdleTime) * 10) / 10;
  const idleTimeSavedPct = Math.round((idleTimeSavedMinutes / baselineTotals.avgIdleTime) * 100);

  // Comparison metrics for side-by-side visual chart
  const comparisonData = [
    {
      label: 'CO₂ Emissions',
      unit: 'kg/hr',
      current: baselineTotals.totalCO2,
      optimized: optimizedTotals.totalCO2,
      reduction: `${co2ReductionPct}%`,
      max: Math.max(baselineTotals.totalCO2, optimizedTotals.totalCO2) * 1.15
    },
    {
      label: 'Fuel Wasted in Idling',
      unit: 'Litres/hr',
      current: baselineTotals.totalFuelWasted,
      optimized: optimizedTotals.totalFuelWasted,
      reduction: `${fuelSavedPct}%`,
      max: Math.max(baselineTotals.totalFuelWasted, optimizedTotals.totalFuelWasted) * 1.15
    },
    {
      label: 'Average Idle Time',
      unit: 'Minutes',
      current: baselineTotals.avgIdleTime,
      optimized: optimizedTotals.avgIdleTime,
      reduction: `${idleTimeSavedPct}%`,
      max: Math.max(baselineTotals.avgIdleTime, optimizedTotals.avgIdleTime) * 1.2
    },
    {
      label: 'Congestion Index',
      unit: '%',
      current: baselineTotals.avgCongestion,
      optimized: optimizedTotals.avgCongestion,
      reduction: `${baselineTotals.avgCongestion - optimizedTotals.avgCongestion}%`,
      max: 100
    }
  ];

  return (
    <section className="section-container" id="sustainability-impact">
      <div className="section-header-row">
        <div>
          <span className="section-pill section-pill-green">Environmental Impact</span>
          <h3 className="section-title">Sustainability Analysis & Carbon Footprint</h3>
          <p className="section-subtitle">
            How traffic gridlock directly accelerates urban fuel combustion, greenhouse gas accumulation, and localized climate strain.
          </p>
        </div>
      </div>

      {/* 4 Impact metric summary cards */}
      <div className="impact-cards-grid">
        <div className="impact-card">
          <div className="impact-card-top">
            <span className="impact-label">Total CO₂ Emissions</span>
            <CloudFog className="impact-icon icon-emerald" size={22} />
          </div>
          <div className="impact-stat-row">
            <span className="impact-val">{isOptimized ? optimizedTotals.totalCO2 : baselineTotals.totalCO2}</span>
            <span className="impact-unit">kg/hr</span>
          </div>
          <p className="impact-explanation">
            Combustion byproduct from vehicle propulsion and prolonged stationary idling across sectors.
          </p>
          <div className="impact-footer-badge">
            <TrendingDown size={14} />
            <span>Up to {co2ReductionPct}% potential reduction</span>
          </div>
        </div>

        <div className="impact-card">
          <div className="impact-card-top">
            <span className="impact-label">Fuel Wasted in Congestion</span>
            <Fuel className="impact-icon icon-amber" size={22} />
          </div>
          <div className="impact-stat-row">
            <span className="impact-val">{isOptimized ? optimizedTotals.totalFuelWasted : baselineTotals.totalFuelWasted}</span>
            <span className="impact-unit">Litres/hr</span>
          </div>
          <p className="impact-explanation">
            Petroleum burned while stationary with zero productive transport distance gained.
          </p>
          <div className="impact-footer-badge badge-amber-text">
            <span>Saves ~{fuelSavedLiters} L/hr when optimized</span>
          </div>
        </div>

        <div className="impact-card">
          <div className="impact-card-top">
            <span className="impact-label">Average Commuter Idle Time</span>
            <Clock className="impact-icon icon-blue" size={22} />
          </div>
          <div className="impact-stat-row">
            <span className="impact-val">{isOptimized ? optimizedTotals.avgIdleTime : baselineTotals.avgIdleTime}</span>
            <span className="impact-unit">min / corridor</span>
          </div>
          <p className="impact-explanation">
            Non-productive travel delay caused by bottleneck choke points and unsynchronized traffic signals.
          </p>
          <div className="impact-footer-badge badge-blue-text">
            <span>{idleTimeSavedMinutes} min saved per corridor</span>
          </div>
        </div>

        <div className="impact-card highlight-card">
          <div className="impact-card-top">
            <span className="impact-label">Potential Emission Reduction</span>
            <CheckCircle2 className="impact-icon icon-emerald" size={22} />
          </div>
          <div className="impact-stat-row">
            <span className="impact-val">-{co2ReductionPct}%</span>
            <span className="impact-unit">CO₂ Cut</span>
          </div>
          <p className="impact-explanation">
            Achieved via synchronized signal green-waves, transit prioritization, and commuter load balancing.
          </p>
          <div className="impact-footer-badge">
            <span>~{baselineTotals.totalCO2 - optimizedTotals.totalCO2} kg CO₂ saved every hour</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Chart */}
      <div className="comparison-chart-container">
        <div className="chart-header">
          <div>
            <h4 className="chart-title">Comparative Analysis: Current Traffic vs. Optimized Traffic</h4>
            <p className="chart-sub">
              Direct comparison demonstrating how smart operational adjustments improve ecological efficiency.
            </p>
          </div>

          <div className="chart-legend-row">
            <div className="legend-item">
              <span className="legend-swatch swatch-current"></span>
              <span>Current Traffic (Baseline)</span>
            </div>
            <div className="legend-item">
              <span className="legend-swatch swatch-optimized"></span>
              <span>Optimized Traffic (Target)</span>
            </div>
          </div>
        </div>

        {/* Grouped Comparative Bars */}
        <div className="grouped-chart-list">
          {comparisonData.map((item, index) => {
            const currentPct = Math.round((item.current / item.max) * 100);
            const optimizedPct = Math.round((item.optimized / item.max) * 100);

            return (
              <div key={index} className="comparison-metric-row">
                <div className="comparison-metric-meta">
                  <span className="comparison-metric-title">{item.label}</span>
                  <span className="comparison-saving-badge">
                    <TrendingDown size={12} />
                    <span>-{item.reduction}</span>
                  </span>
                </div>

                <div className="dual-bars-wrapper">
                  {/* Current Traffic Bar */}
                  <div className="single-bar-line">
                    <span className="bar-tag">Current</span>
                    <div className="bar-track-horizontal">
                      <div 
                        className="bar-fill-horizontal fill-current" 
                        style={{ width: `${currentPct}%` }}
                      >
                        <span className="bar-text-val">{item.current} {item.unit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Optimized Traffic Bar */}
                  <div className="single-bar-line">
                    <span className="bar-tag">Optimized</span>
                    <div className="bar-track-horizontal">
                      <div 
                        className="bar-fill-horizontal fill-optimized" 
                        style={{ width: `${optimizedPct}%` }}
                      >
                        <span className="bar-text-val">{item.optimized} {item.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Formula & Academic Note */}
        <div className="formula-callout">
          <div className="formula-icon-box">
            <Info size={18} />
          </div>
          <div className="formula-text">
            <strong>Calculation Methodology (College Viva Model):</strong>
            <code>estimatedEmission = (vehicles × idleTime × idleFactor) + (vehicles × distance × transitFactor)</code>
            <p className="formula-sub">
              *Prototype estimates based on sample traffic data. The optimized values represent modeled reduction estimates for academic demonstration and not real-world measured sensors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
