/**
 * EcoTraffic - Sample Traffic & Sustainability Dataset
 * Transparent mathematical models for college prototype demonstration
 *
 * Formulas Used:
 * - Idle Emission (kg CO2) = vehicles * idleTimeMinutes * 0.014 kg/min
 * - Transit Emission (kg CO2) = vehicles * lengthKm * 0.14 kg/km
 * - Total CO2 (kg/hr) = Idle Emission + Transit Emission
 * - Fuel Wasted (Litres/hr) = vehicles * idleTimeMinutes * 0.015 L/min
 * - Congestion Level (%) = (1 - (avgSpeed / FreeFlowSpeed[45 km/h])) * 100
 */

export const INITIAL_ROADS = [
  {
    id: 'road-1',
    name: 'Main Road',
    category: 'Arterial Corridor',
    lengthKm: 4.2,
    baseline: {
      trafficLevel: 'High',
      vehicleCount: 540,
      avgSpeed: 16, // km/h
      idleTimeMinutes: 14 // minutes stuck in idling/signals
    },
    optimized: {
      trafficLevel: 'Medium',
      vehicleCount: 460,
      avgSpeed: 25,
      idleTimeMinutes: 7
    }
  },
  {
    id: 'road-2',
    name: 'College Road',
    category: 'Institutional Avenue',
    lengthKm: 2.8,
    baseline: {
      trafficLevel: 'Medium',
      vehicleCount: 310,
      avgSpeed: 23,
      idleTimeMinutes: 8
    },
    optimized: {
      trafficLevel: 'Low',
      vehicleCount: 260,
      avgSpeed: 33,
      idleTimeMinutes: 4
    }
  },
  {
    id: 'road-3',
    name: 'Market Road',
    category: 'Commercial Hub',
    lengthKm: 3.1,
    baseline: {
      trafficLevel: 'High',
      vehicleCount: 470,
      avgSpeed: 14,
      idleTimeMinutes: 16
    },
    optimized: {
      trafficLevel: 'Medium',
      vehicleCount: 395,
      avgSpeed: 22,
      idleTimeMinutes: 8
    }
  },
  {
    id: 'road-4',
    name: 'Highway Junction',
    category: 'Expressway Interchange',
    lengthKm: 5.5,
    baseline: {
      trafficLevel: 'High',
      vehicleCount: 680,
      avgSpeed: 27,
      idleTimeMinutes: 13
    },
    optimized: {
      trafficLevel: 'Medium',
      vehicleCount: 580,
      avgSpeed: 38,
      idleTimeMinutes: 6
    }
  },
  {
    id: 'road-5',
    name: 'Station Road',
    category: 'Transit Terminal Link',
    lengthKm: 2.6,
    baseline: {
      trafficLevel: 'Medium',
      vehicleCount: 380,
      avgSpeed: 20,
      idleTimeMinutes: 10
    },
    optimized: {
      trafficLevel: 'Low',
      vehicleCount: 315,
      avgSpeed: 30,
      idleTimeMinutes: 5
    }
  }
];

export const EMISSION_CONSTANTS = {
  FREE_FLOW_SPEED_KMH: 45,
  IDLE_CO2_KG_PER_MIN: 0.014,     // ~14g CO2/min idling per mixed urban vehicle
  TRANSIT_CO2_KG_PER_KM: 0.14,    // ~140g CO2/km in moderate moving speed
  IDLE_FUEL_LITERS_PER_MIN: 0.015 // ~0.015L of petrol/diesel per idling min (~0.9L/hr)
};

/**
 * Calculates environmental metrics for a given road state
 */
export function calculateRoadMetrics(road, state) {
  const idleCO2 = road[state].vehicleCount * road[state].idleTimeMinutes * EMISSION_CONSTANTS.IDLE_CO2_KG_PER_MIN;
  const transitCO2 = road[state].vehicleCount * road.lengthKm * EMISSION_CONSTANTS.TRANSIT_CO2_KG_PER_KM;
  const totalCO2 = Math.round(idleCO2 + transitCO2);
  const fuelWasted = Math.round(road[state].vehicleCount * road[state].idleTimeMinutes * EMISSION_CONSTANTS.IDLE_FUEL_LITERS_PER_MIN);
  
  const congestionPct = Math.min(
    95,
    Math.max(15, Math.round((1 - road[state].avgSpeed / EMISSION_CONSTANTS.FREE_FLOW_SPEED_KMH) * 100))
  );

  return {
    ...road[state],
    totalCO2,
    idleCO2: Math.round(idleCO2),
    transitCO2: Math.round(transitCO2),
    fuelWasted,
    congestionPct
  };
}

/**
 * Calculates aggregate network metrics for the whole area
 */
export function calculateNetworkTotals(roads, state = 'baseline') {
  let totalVehicles = 0;
  let totalSpeedWeighted = 0;
  let totalIdleTimeWeighted = 0;
  let totalCO2 = 0;
  let totalFuelWasted = 0;
  let totalCongestion = 0;

  roads.forEach((road) => {
    const metrics = calculateRoadMetrics(road, state);
    totalVehicles += metrics.vehicleCount;
    totalSpeedWeighted += metrics.avgSpeed * metrics.vehicleCount;
    totalIdleTimeWeighted += metrics.idleTimeMinutes * metrics.vehicleCount;
    totalCO2 += metrics.totalCO2;
    totalFuelWasted += metrics.fuelWasted;
    totalCongestion += metrics.congestionPct;
  });

  const avgSpeed = Math.round((totalSpeedWeighted / totalVehicles) * 10) / 10;
  const avgIdleTime = Math.round((totalIdleTimeWeighted / totalVehicles) * 10) / 10;
  const avgCongestion = Math.round(totalCongestion / roads.length);

  return {
    totalVehicles,
    avgSpeed,
    avgIdleTime,
    totalCO2,
    totalFuelWasted,
    avgCongestion,
    congestionLevel: avgCongestion > 60 ? 'High' : avgCongestion > 35 ? 'Moderate' : 'Low'
  };
}

export const SUSTAINABLE_TIPS = [
  {
    id: 1,
    title: 'Use Public Transit',
    desc: 'Opt for buses, metro, or local trains for daily commutes. A full commuter bus displaces up to 40 cars.',
    impact: 'Cuts per-capita emissions by up to 65%',
    icon: 'Bus'
  },
  {
    id: 2,
    title: 'Carpool When Possible',
    desc: 'Share rides with colleagues or classmates heading along the same corridor to halve individual fuel footprint.',
    impact: 'Reduces up to 50% vehicle volume per commute',
    icon: 'Users'
  },
  {
    id: 3,
    title: 'Walk or Cycle for Short Trips',
    desc: 'Over 30% of urban vehicle trips are under 3 km. Choosing active mobility eliminates engine cold-start emissions.',
    impact: '100% zero tailpipe emissions',
    icon: 'Bike'
  },
  {
    id: 4,
    title: 'Avoid Unnecessary Vehicle Idling',
    desc: 'Switch off vehicle ignition at red lights exceeding 20-30 seconds and during railway crossing waits.',
    impact: 'Saves 0.9L fuel per hour of idling avoided',
    icon: 'PowerOff'
  },
  {
    id: 5,
    title: 'Travel During Off-Peak Hours',
    desc: 'Shifting travel window by 20–30 minutes avoids peak bottle-necks, ensuring steady speeds and minimal brake wear.',
    impact: 'Smooths traffic flow & lowers idling by 40%',
    icon: 'Clock'
  }
];

export const AWARENESS_STEPS = [
  {
    step: '01',
    title: 'The Challenge',
    summary: 'Traffic Congestion & Idling Waste',
    description: 'Stop-and-go urban traffic forces vehicles to idle, causing excessive fuel burn, elevated greenhouse emissions, and toxic local particulate matter.'
  },
  {
    step: '02',
    title: 'The Technology',
    summary: 'Data-Driven Traffic Insights',
    description: 'IoT loop detectors and speed telemetry track corridor density. Software simulations test dynamic signal timing and eco-routing before on-road deployment.'
  },
  {
    step: '03',
    title: 'The Impact',
    summary: 'Cleaner, Sustainable Mobility',
    description: 'Empowering city managers with optimization and citizens with awareness shifts commuting behaviors, directly cutting urban carbon footprints.'
  }
];
