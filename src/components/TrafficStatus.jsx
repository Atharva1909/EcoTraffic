import React, { useState } from 'react';
import { calculateRoadMetrics } from '../data/trafficData';
import { MapPin, Navigation, Clock, CloudFog, BarChart3 } from 'lucide-react';

export default function TrafficStatus({ roads, isOptimized }) {
  const currentStateKey = isOptimized ? 'optimized' : 'baseline';
  const [metricView, setMetricView] = useState('congestion'); // 'congestion' | 'vehicles' | 'co2'

  const roadList = roads.map((road) => ({
    ...road,
    metrics: calculateRoadMetrics(road, currentStateKey),
    baselineMetrics: calculateRoadMetrics(road, 'baseline'),
    optimizedMetrics: calculateRoadMetrics(road, 'optimized')
  }));

  // Max values for chart scaling
  const maxCongestion = 100;
  const maxVehicles = Math.max(...roadList.map(r => r.metrics.vehicleCount)) * 1.15;
  const maxCO2 = Math.max(...roadList.map(r => r.metrics.totalCO2)) * 1.15;

  return (
    <section className="section-container" id="traffic-status">
      <div className="section-header-row">
        <div>
          <span className="section-pill">Sector Telemetry</span>
          <h3 className="section-title">Corridor Traffic & Emission Status</h3>
          <p className="section-subtitle">
            Real-time sector monitoring tracking vehicle volumes, transit velocities, and localized carbon generation.
          </p>
        </div>

        {/* Chart View Toggle */}
        <div className="toggle-button-group" role="group" aria-label="Chart metric selector">
          <button 
            type="button" 
            className={`btn-toggle ${metricView === 'congestion' ? 'active' : ''}`}
            onClick={() => setMetricView('congestion')}
          >
            Congestion %
          </button>
          <button 
            type="button" 
            className={`btn-toggle ${metricView === 'vehicles' ? 'active' : ''}`}
            onClick={() => setMetricView('vehicles')}
          >
            Vehicles
          </button>
          <button 
            type="button" 
            className={`btn-toggle ${metricView === 'co2' ? 'active' : ''}`}
            onClick={() => setMetricView('co2')}
          >
            CO₂ Impact
          </button>
        </div>
      </div>

      {/* Road cards list */}
      <div className="roads-grid">
        {roadList.map((road) => {
          const { metrics } = road;
          const levelColor = 
            metrics.trafficLevel === 'High' ? 'badge-high' : 
            metrics.trafficLevel === 'Medium' ? 'badge-medium' : 'badge-low';

          return (
            <div key={road.id} className="road-card">
              <div className="road-card-header">
                <div className="road-title-wrap">
                  <div className="road-icon-pin">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="road-name">{road.name}</h4>
                    <span className="road-category">{road.category} • {road.lengthKm} km</span>
                  </div>
                </div>

                <span className={`traffic-level-badge ${levelColor}`}>
                  <span className="level-dot"></span>
                  {metrics.trafficLevel}
                </span>
              </div>

              {/* Congestion Progress Bar */}
              <div className="road-progress-wrap">
                <div className="progress-labels">
                  <span>Congestion Index</span>
                  <strong>{metrics.congestionPct}%</strong>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className={`progress-bar-fill ${metrics.congestionPct > 60 ? 'fill-red' : metrics.congestionPct > 35 ? 'fill-amber' : 'fill-green'}`} 
                    style={{ width: `${metrics.congestionPct}%` }}
                  />
                </div>
              </div>

              {/* Road metrics items */}
              <div className="road-stats-row">
                <div className="road-stat-item">
                  <span className="stat-label">Vehicle Count</span>
                  <span className="stat-num">{metrics.vehicleCount}</span>
                  <span className="stat-unit">veh/hr</span>
                </div>

                <div className="road-stat-item">
                  <span className="stat-label">Average Speed</span>
                  <span className="stat-num">{metrics.avgSpeed}</span>
                  <span className="stat-unit">km/h</span>
                </div>

                <div className="road-stat-item">
                  <span className="stat-label">Est. CO₂</span>
                  <span className="stat-num">{metrics.totalCO2}</span>
                  <span className="stat-unit">kg/hr</span>
                </div>

                <div className="road-stat-item">
                  <span className="stat-label">Idle Delay</span>
                  <span className="stat-num">{metrics.idleTimeMinutes}</span>
                  <span className="stat-unit">min</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traffic Level Visual Bar Chart */}
      <div className="chart-card">
        <div className="chart-header">
          <div className="chart-title-group">
            <BarChart3 size={18} className="text-emerald" />
            <h4 className="chart-title">
              Corridor Comparison: {metricView === 'congestion' ? 'Congestion Level (%)' : metricView === 'vehicles' ? 'Vehicle Volume (Vehicles/hr)' : 'CO₂ Emissions (kg/hr)'}
            </h4>
          </div>
          <span className="chart-state-indicator">
            {isOptimized ? 'Displaying Optimized Telemetry' : 'Displaying Baseline Telemetry'}
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="bar-chart-container" role="region" aria-label="Corridor traffic bar chart">
          <div className="bar-chart-bars">
            {roadList.map((road) => {
              let value = 0;
              let maxValue = 100;
              let unit = '';
              let barColor = 'var(--primary-blue)';

              if (metricView === 'congestion') {
                value = road.metrics.congestionPct;
                maxValue = maxCongestion;
                unit = '%';
                barColor = value > 60 ? '#ef4444' : value > 35 ? '#f59e0b' : '#10b981';
              } else if (metricView === 'vehicles') {
                value = road.metrics.vehicleCount;
                maxValue = maxVehicles;
                unit = ' veh';
                barColor = '#3b82f6';
              } else {
                value = road.metrics.totalCO2;
                maxValue = maxCO2;
                unit = ' kg';
                barColor = '#10b981';
              }

              const heightPct = Math.round((value / maxValue) * 100);

              return (
                <div key={road.id} className="bar-column">
                  <div className="bar-track">
                    <span className="bar-value-top">{value}{unit}</span>
                    <div 
                      className="bar-fill" 
                      style={{ 
                        height: `${Math.max(10, heightPct)}%`,
                        backgroundColor: barColor 
                      }}
                      title={`${road.name}: ${value}${unit}`}
                    />
                  </div>
                  <span className="bar-label" title={road.name}>{road.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chart-footer-note">
          <Clock size={14} />
          <span>Calculated across 5 arterial sectors under 1-hour observation window. Status refreshes synchronously with simulation.</span>
        </div>
      </div>
    </section>
  );
}
