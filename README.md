# EcoTraffic – Sustainable Traffic & Awareness Dashboard

> **College Sustainability Assignment Prototype**  
> *"Technology for cleaner and smarter mobility."*

---

## 1. Project Objective

**EcoTraffic** is an academic software prototype developed to demonstrate how computer technology, real-time traffic analysis, and optimization algorithms can tackle urban mobility challenges. The project showcases how technology drives awareness of traffic-related environmental impacts (carbon emissions, fuel wastage, and vehicle idling) and promotes sustainable travel decisions.

---

## 2. The Sustainability Problem

Urban traffic congestion is not merely a logistical inconvenience—it is a critical driver of environmental degradation:
- **Excessive Fuel Combustion:** Stop-and-go driving and prolonged idling burn petroleum inefficiently, consuming fuel while achieving zero transport distance.
- **Elevated Greenhouse Gas (GHG) Emissions:** An idling automobile emits approximately 14 grams of $\text{CO}_2$ per minute. Monitored across thousands of vehicles at gridlocked junctions, this generates hundreds of kilograms of excess emissions every hour.
- **Urban Heat and Air Toxicity:** Concentrated idling worsens localized particulate matter ($\text{PM}_{2.5}$ / $\text{PM}_{10}$) and nitrogen oxides ($\text{NO}_x$), degrading air quality near institutional, commercial, and residential corridors.

---

## 3. Technology & Pipeline Chain

During a college viva or demonstration, EcoTraffic illustrates the complete 5-step sustainable computing pipeline:

$$\text{Traffic Data} \longrightarrow \text{Traffic Analysis} \longrightarrow \text{Environmental Impact} \longrightarrow \text{Optimization Simulation} \longrightarrow \text{Sustainable Awareness}$$

1. **Traffic Data:** Ingests sector telemetry across 5 arterial corridors (vehicle counts, transit velocity, bottleneck idle times).
2. **Traffic Analysis:** Evaluates corridor density and speed drops relative to free-flow thresholds ($45\text{ km/h}$).
3. **Environmental Impact:** Applies transparent mathematical models to calculate fuel wastage and carbon output.
4. **Optimization Simulation:** Simulates adaptive green-wave signal timing and transit prioritization to measure environmental savings.
5. **Sustainable Awareness:** Translates data into actionable commuter habits (public transit, carpooling, idle shutoff).

---

## 4. Key Features

- **Dynamic Overview Telemetry:** Real-time summary cards displaying Congestion Level, Average Vehicle Speed ($\text{km/h}$), Estimated $\text{CO}_2$ Emissions ($\text{kg/hr}$), and Vehicles Monitored.
- **Sector Breakdown & Visual Charts:** Corridor-level monitoring for 5 urban areas:
  - *Main Road* (Arterial Corridor)
  - *College Road* (Institutional Avenue)
  - *Market Road* (Commercial Hub)
  - *Highway Junction* (Expressway Interchange)
  - *Station Road* (Transit Terminal Link)
  Includes an interactive bar chart toggling between Congestion %, Vehicle Volume, and $\text{CO}_2$ impact.
- **Sustainability Impact & Comparative Analysis:**
  - Quantifies total $\text{CO}_2$, wasted fuel in litres, and commuter idle time.
  - Side-by-side grouped comparative chart: **Current Traffic** vs. **Optimized Traffic**.
- **Interactive Traffic Optimization Simulation:**
  - One-click **"Optimize Traffic"** simulation button with smooth calculation feedback.
  - Dynamically recalculates network emissions and updates all dashboard metrics, status badges, and charts.
  - Displays the prompt-specified confirmation message:
    > *"Simulation complete: optimized traffic can potentially reduce congestion and emissions."*
  - Reversible via a **"Reset Baseline"** button for easy presentation during college viva presentations.
- **Actionable Sustainable Tips:** 5 practical commuter practices with quantifiable carbon benefits (Transit, Carpooling, Active Mobility, Idle Avoidance, Off-Peak Scheduling).
- **"Why EcoTraffic?" Educational Section:** 3-step structured breakdown of the Problem, Technology, and Impact.
- **Zero External Dependencies / Local-First:** No databases, no paid third-party APIs, and no login/signup required.

---

## 5. Mathematical Model & Formulas

To ensure academic transparency and easy viva explanations, calculations follow standard urban mobility emission factors:

$$\text{Estimated Idle }\text{CO}_2\text{ (kg)} = \text{Vehicles} \times \text{Idle Time (min)} \times 0.014\text{ kg/min}$$

$$\text{Estimated Transit }\text{CO}_2\text{ (kg)} = \text{Vehicles} \times \text{Corridor Length (km)} \times 0.14\text{ kg/km}$$

$$\text{Total }\text{CO}_2\text{ (kg/hr)} = \text{Estimated Idle }\text{CO}_2 + \text{Estimated Transit }\text{CO}_2$$

$$\text{Fuel Wasted (Litres/hr)} = \text{Vehicles} \times \text{Idle Time (min)} \times 0.015\text{ L/min}$$

$$\text{Congestion Index (\%)} = \max\left(15, \min\left(95, \left(1 - \frac{\text{Average Speed}}{45\text{ km/h}}\right) \times 100\right)\right)$$

*Note: All values are prototype estimates based on representative urban sample traffic data for educational demonstration.*

---

## 6. Technology Stack

- **Framework:** React 18
- **Build Tool / Bundler:** Vite 5
- **Styling:** Modern, clean, responsive custom CSS (`src/styles.css`) using CSS variables, Flexbox, and CSS Grid (light green/blue sustainability aesthetic)
- **Icons:** `lucide-react`
- **Charts:** Custom, interactive, high-performance responsive SVG / CSS bar charts
- **Data:** Local static dataset (`src/data/trafficData.js`)

---

## 7. How to Install & Run

### Prerequisites
- Node.js (version 18+ recommended)
- npm (comes bundled with Node.js)

### Installation
In the project root directory, run:

```bash
npm install
```

### Running Locally
To launch the development server:

```bash
npm run dev
```

Open your browser at the local URL displayed (default: `http://localhost:5173`).

### Production Build
To create a production build:

```bash
npm run build
```

---

## 8. College Viva / Demonstration Script (3-Minute Guide)

1. **Introduction (30s):** Introduce *EcoTraffic* as an environmental tech dashboard showing that traffic congestion is a major source of idle fuel waste and carbon emissions.
2. **Baseline State (45s):** Point to the 4 overview cards showing high congestion ($68\%$), low speeds ($19.8\text{ km/h}$), and elevated $\text{CO}_2$ ($488\text{ kg/hr}$). Scroll to the Sector Telemetry to show how Market Road and Main Road suffer severe idle delays.
3. **Simulation Demonstration (60s):** Scroll to the **Interactive Traffic Optimization Simulation** and click **"Optimize Traffic"**. Explain how adaptive signal coordination reduces intersection delay by $47\%$, lowering emissions by $29\%$ ($\sim 140\text{ kg/hr}$ saved).
4. **Impact & Tips (45s):** Show the side-by-side comparison chart and conclude with the 5 practical sustainable travel tips and the 5-step Technology-to-Sustainability pipeline.
