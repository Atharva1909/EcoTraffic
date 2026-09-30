import React from 'react';
import { Gauge, Activity, CloudFog, Car, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function OverviewCards({ currentStats, baselineStats, isOptimized }) {
  // Calculate relative differences
  const congestionDiff = currentStats.avgCongestion - baselineStats.avgCongestion;
  const speedDiff = Math.round((currentStats.avgSpeed - baselineStats.avgSpeed) * 10) / 10;
  const co2Diff = currentStats.totalCO2 - baselineStats.totalCO2;
  const co2PercentReduction = Math.round(((baselineStats.totalCO2 - currentStats.totalCO2) / baselineStats.totalCO2) * 100);
  const vehiclesDiff = currentStats.totalVehicles - baselineStats.totalVehicles;

  return (
    <div className="overview-grid">
      {/* 1. Congestion Level */}
      <div className="metric-card">
        <div className="metric-header">
          <span className="metric-label">Current Congestion</span>
          <div className="metric-icon-wrap icon-amber">
            <Gauge size={20} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-value">{currentStats.avgCongestion}%</span>
          <span className={`status-pill ${currentStats.avgCongestion > 60 ? 'pill-red' : currentStats.avgCongestion > 35 ? 'pill-amber' : 'pill-green'}`}>
            {currentStats.congestionLevel}
          </span>
        </div>
        <div className="metric-footer">
          {isOptimized ? (
            <span className="diff-badge diff-positive">
              <ArrowDownRight size={14} />
              <span>{Math.abs(congestionDiff)}% reduction</span>
            </span>
          ) : (
            <span className="text-secondary">Measured vs 45 km/h urban free flow</span>
          )}
        </div>
      </div>

      {/* 2. Average Speed */}
      <div className="metric-card">
        <div className="metric-header">
          <span className="metric-label">Average Vehicle Speed</span>
          <div className="metric-icon-wrap icon-blue">
            <Activity size={20} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-value">{currentStats.avgSpeed}</span>
          <span className="metric-unit">km/h</span>
        </div>
        <div className="metric-footer">
          {isOptimized ? (
            <span className="diff-badge diff-positive">
              <ArrowUpRight size={14} />
              <span>+{speedDiff} km/h (+{Math.round((speedDiff / baselineStats.avgSpeed) * 100)}%) faster</span>
            </span>
          ) : (
            <span className="text-secondary">Heavy signal wait times observed</span>
          )}
        </div>
      </div>

      {/* 3. Estimated CO2 Emissions */}
      <div className="metric-card">
        <div className="metric-header">
          <span className="metric-label">Estimated CO₂ Emissions</span>
          <div className="metric-icon-wrap icon-green">
            <CloudFog size={20} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-value">{currentStats.totalCO2.toLocaleString()}</span>
          <span className="metric-unit">kg/hr</span>
        </div>
        <div className="metric-footer">
          {isOptimized ? (
            <span className="diff-badge diff-positive">
              <ArrowDownRight size={14} />
              <span>-{co2PercentReduction}% lower emissions</span>
            </span>
          ) : (
            <span className="text-secondary">Stop-and-go idling adds 154 kg/hr</span>
          )}
        </div>
      </div>

      {/* 4. Vehicles Monitored */}
      <div className="metric-card">
        <div className="metric-header">
          <span className="metric-label">Vehicles Monitored</span>
          <div className="metric-icon-wrap icon-purple">
            <Car size={20} />
          </div>
        </div>
        <div className="metric-value-row">
          <span className="metric-value">{currentStats.totalVehicles.toLocaleString()}</span>
          <span className="metric-unit">active</span>
        </div>
        <div className="metric-footer">
          {isOptimized ? (
            <span className="diff-badge diff-neutral">
              <ArrowDownRight size={14} />
              <span>{Math.abs(vehiclesDiff)} diverted to transit</span>
            </span>
          ) : (
            <span className="text-secondary">Across 5 monitored urban sectors</span>
          )}
        </div>
      </div>
    </div>
  );
}
