import React from 'react';
import { AlertTriangle, Cpu, Globe2, ArrowDown, CheckCircle2 } from 'lucide-react';
import { AWARENESS_STEPS } from '../data/trafficData';

const stepIcons = [AlertTriangle, Cpu, Globe2];

export default function AwarenessSection() {
  const chainSteps = [
    { label: 'Traffic Data', desc: 'Sector volume & speed telemetry' },
    { label: 'Traffic Analysis', desc: 'Congestion & bottleneck mapping' },
    { label: 'Environmental Impact', desc: 'CO₂ & idle fuel waste formulas' },
    { label: 'Optimization Simulation', desc: 'Synchronized green-wave signals' },
    { label: 'Sustainable Awareness', desc: 'Informed commuter choices' }
  ];

  return (
    <section className="section-container" id="why-ecotraffic">
      <div className="section-header-row">
        <div>
          <span className="section-pill">Academic Perspective</span>
          <h3 className="section-title">Why EcoTraffic?</h3>
          <p className="section-subtitle">
            Demonstrating how computing technology acts as an environmental catalyst in smart city sustainability.
          </p>
        </div>
      </div>

      {/* 3 Core Pillars: Problem, Technology, Impact */}
      <div className="awareness-pillars-grid">
        {AWARENESS_STEPS.map((item, idx) => {
          const Icon = stepIcons[idx] || AlertTriangle;
          return (
            <div key={item.step} className="pillar-card">
              <div className="pillar-top-row">
                <span className="pillar-number">{item.step}</span>
                <div className="pillar-icon-box">
                  <Icon size={20} />
                </div>
              </div>
              <span className="pillar-phase-name">{item.title}</span>
              <h4 className="pillar-heading">{item.summary}</h4>
              <p className="pillar-desc">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* Academic Viva 5-Step Logic Flow Chain */}
      <div className="viva-chain-card">
        <div className="viva-header">
          <span className="viva-tag">College Viva Framework</span>
          <h4 className="viva-title">Technology-to-Sustainability Pipeline</h4>
          <p className="viva-desc">
            How raw sensor data is transformed into tangible carbon reduction and societal climate awareness:
          </p>
        </div>

        <div className="chain-flow-horizontal">
          {chainSteps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="chain-step-node">
                <div className="node-number">{index + 1}</div>
                <div className="node-content">
                  <span className="node-label">{step.label}</span>
                  <span className="node-sub">{step.desc}</span>
                </div>
              </div>

              {index < chainSteps.length - 1 && (
                <div className="chain-arrow-separator" aria-hidden="true">
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
