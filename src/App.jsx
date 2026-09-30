import React, { useState, useMemo } from 'react';
import { INITIAL_ROADS, calculateNetworkTotals } from './data/trafficData';
import Header from './components/Header';
import Hero from './components/Hero';
import OverviewCards from './components/OverviewCards';
import TrafficStatus from './components/TrafficStatus';
import SustainabilityImpact from './components/SustainabilityImpact';
import OptimizationSimulation from './components/OptimizationSimulation';
import SustainableTips from './components/SustainableTips';
import AwarenessSection from './components/AwarenessSection';
import Footer from './components/Footer';

export default function App() {
  const [isOptimized, setIsOptimized] = useState(false);

  // Compute baseline and optimized totals
  const baselineTotals = useMemo(() => calculateNetworkTotals(INITIAL_ROADS, 'baseline'), []);
  const optimizedTotals = useMemo(() => calculateNetworkTotals(INITIAL_ROADS, 'optimized'), []);

  const currentTotals = isOptimized ? optimizedTotals : baselineTotals;

  const handleOptimize = () => {
    setIsOptimized(true);
  };

  const handleReset = () => {
    setIsOptimized(false);
  };

  const handleToggle = () => {
    setIsOptimized((prev) => !prev);
  };

  return (
    <div className="app-wrapper">
      <Header 
        isOptimized={isOptimized} 
        onToggleOptimize={handleToggle} 
      />

      <main className="main-content">
        {/* Hero Section */}
        <Hero 
          isOptimized={isOptimized} 
          onOptimize={handleOptimize} 
          onReset={handleReset} 
        />

        {/* 1. Traffic Overview Cards */}
        <OverviewCards 
          currentStats={currentTotals} 
          baselineStats={baselineTotals} 
          isOptimized={isOptimized} 
        />

        {/* 2. Simple Traffic Optimization Simulation (Main Interactive Feature) */}
        <OptimizationSimulation 
          isOptimized={isOptimized} 
          onOptimize={handleOptimize} 
          onReset={handleReset} 
          baselineTotals={baselineTotals} 
          optimizedTotals={optimizedTotals} 
        />

        {/* 3. Traffic Status (Road-by-Road & Visual Chart) */}
        <TrafficStatus 
          roads={INITIAL_ROADS} 
          isOptimized={isOptimized} 
        />

        {/* 4. Sustainability Impact (Side-by-Side Comparison Chart & Formulas) */}
        <SustainabilityImpact 
          baselineTotals={baselineTotals} 
          optimizedTotals={optimizedTotals} 
          isOptimized={isOptimized} 
        />

        {/* 5. Sustainable Travel Tips (5 Compact practical recommendations) */}
        <SustainableTips />

        {/* 6. Awareness Section ("Why EcoTraffic?" & Viva 5-Step Logic Flow) */}
        <AwarenessSection />
      </main>

      <Footer />
    </div>
  );
}
