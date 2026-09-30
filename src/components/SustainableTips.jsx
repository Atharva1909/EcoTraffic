import React from 'react';
import { Bus, Users, Bike, PowerOff, Clock, Sparkles } from 'lucide-react';
import { SUSTAINABLE_TIPS } from '../data/trafficData';

const iconMap = {
  Bus: Bus,
  Users: Users,
  Bike: Bike,
  PowerOff: PowerOff,
  Clock: Clock
};

export default function SustainableTips() {
  return (
    <section className="section-container" id="sustainable-tips">
      <div className="section-header-row">
        <div>
          <span className="section-pill section-pill-green">Actionable Mobility</span>
          <h3 className="section-title">Sustainable Travel Practices</h3>
          <p className="section-subtitle">
            Everyday commuter choices that collectively lower congestion, petroleum consumption, and urban air pollution.
          </p>
        </div>
      </div>

      <div className="tips-grid">
        {SUSTAINABLE_TIPS.map((tip) => {
          const IconComponent = iconMap[tip.icon] || Sparkles;
          return (
            <div key={tip.id} className="tip-card">
              <div className="tip-icon-header">
                <div className="tip-icon-box">
                  <IconComponent size={20} />
                </div>
                <span className="tip-badge">Tip #{tip.id}</span>
              </div>

              <h4 className="tip-title">{tip.title}</h4>
              <p className="tip-desc">{tip.desc}</p>

              <div className="tip-impact-tag">
                <span className="impact-dot"></span>
                <span>{tip.impact}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
