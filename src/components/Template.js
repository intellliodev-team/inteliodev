// Template.jsx — Intelliodev.io · 8-Screen Horizontal Showcase
import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import "./Template.css";

/* ── SPHERE DATA ─────────────────────────────────────── */
const radii = [
  1, 0.6, 0.8, 0.4, 0.9, 0.7, 0.9, 0.3, 0.2, 0.5, 0.6, 0.4, 0.5, 0.6, 0.7,
  0.3, 0.4, 0.8, 0.7, 0.5, 0.4, 0.6, 0.35, 0.38, 0.9, 0.3, 0.6, 0.4, 0.2,
  0.35, 0.5, 0.15, 0.2, 0.25, 0.4, 0.8, 0.76, 0.8, 1, 0.8, 0.7, 0.8, 0.3,
  0.5, 0.6, 0.55, 0.42, 0.75, 0.66, 0.6, 0.7, 0.5, 0.6, 0.35, 0.35, 0.35,
  0.8, 0.6, 0.7, 0.8, 0.4, 0.89, 0.3, 0.3, 0.6, 0.4, 0.2, 0.52, 0.5, 0.15,
  0.2, 0.25, 0.4, 0.8, 0.76, 0.8, 1, 0.8, 0.7, 0.8, 0.3, 0.5, 0.6, 0.8,
  0.7, 0.75, 0.66, 0.6, 0.7, 0.5, 0.6, 0.35, 0.35, 0.35, 0.8, 0.6, 0.7,
  0.8, 0.4, 0.89, 0.3,
];

const positions = [
  { x: 0, y: 0, z: 0 }, { x: 1.2, y: 0.9, z: -0.5 }, { x: 1.8, y: -0.3, z: 0 },
  { x: -1, y: -1, z: 0 }, { x: -1, y: 1.62, z: 0 }, { x: -1.65, y: 0, z: -0.4 },
  { x: -2.13, y: -1.54, z: -0.4 }, { x: 0.8, y: 0.94, z: 0.3 }, { x: 0.5, y: -1, z: 1.2 },
  { x: -0.16, y: -1.2, z: 0.9 }, { x: 1.5, y: 1.2, z: 0.8 }, { x: 0.5, y: -1.58, z: 1.4 },
  { x: -1.5, y: 1, z: 1.15 }, { x: -1.5, y: -1.5, z: 0.99 }, { x: -1.5, y: -1.5, z: -1.9 },
  { x: 1.85, y: 0.8, z: 0.05 }, { x: 1.5, y: -1.2, z: -0.75 }, { x: 0.9, y: -1.62, z: 0.22 },
  { x: 0.45, y: 2, z: 0.65 }, { x: 2.5, y: 1.22, z: -0.2 }, { x: 2.35, y: 0.7, z: 0.55 },
  { x: -1.8, y: -0.35, z: 0.85 }, { x: -1.02, y: 0.2, z: 0.9 }, { x: 0.2, y: 1, z: 1 },
  { x: -2.88, y: 0.7, z: 1 }, { x: -2, y: -0.95, z: 1.5 }, { x: -2.3, y: 2.4, z: -0.1 },
  { x: -2.5, y: 1.9, z: 1.2 }, { x: -1.8, y: 0.37, z: 1.2 }, { x: -2.4, y: 1.42, z: 0.05 },
  { x: -2.72, y: -0.9, z: 1.1 }, { x: -1.8, y: -1.34, z: 1.67 }, { x: -1.6, y: 1.66, z: 0.91 },
  { x: -2.8, y: 1.58, z: 1.69 }, { x: -2.97, y: 2.3, z: 0.65 }, { x: 1.1, y: -0.2, z: -1.45 },
  { x: -4, y: 1.78, z: 0.38 }, { x: 0.12, y: 1.4, z: -1.29 }, { x: -1.64, y: 1.4, z: -1.79 },
  { x: -3.5, y: -0.58, z: 0.1 }, { x: -0.1, y: -1, z: -2 }, { x: -4.5, y: 0.55, z: -0.5 },
  { x: -3.87, y: 0, z: 1 }, { x: -4.6, y: -0.1, z: 0.65 }, { x: -3, y: 1.5, z: -0.7 },
  { x: -0.5, y: 0.2, z: -1.5 }, { x: -1.3, y: -0.45, z: -1.5 }, { x: -3.35, y: 0.25, z: -1.5 },
  { x: -4.76, y: -1.26, z: 0.4 }, { x: -4.32, y: 0.85, z: 1.4 }, { x: -3.5, y: -1.82, z: 0.9 },
  { x: -3.6, y: -0.6, z: 1.46 }, { x: -4.55, y: -1.5, z: 1.63 }, { x: -3.8, y: -1.15, z: 2.1 },
  { x: -2.9, y: -0.25, z: 1.86 }, { x: -2.2, y: -0.4, z: 1.86 }, { x: -5.1, y: -0.24, z: 1.86 },
  { x: -5.27, y: 1.24, z: 0.76 }, { x: -5.27, y: 2, z: -0.4 }, { x: -6.4, y: 0.4, z: 1 },
  { x: -5.15, y: 0.95, z: 2 }, { x: -6.2, y: 0.5, z: -0.8 }, { x: -4, y: 0.08, z: 1.8 },
  { x: 2, y: -0.95, z: 1.5 }, { x: 2.3, y: 2.4, z: -0.1 }, { x: 2.5, y: 1.9, z: 1.2 },
  { x: 1.8, y: 0.37, z: 1.2 }, { x: 3.24, y: 0.6, z: 1.05 }, { x: 2.72, y: -0.9, z: 1.1 },
  { x: 1.8, y: -1.34, z: 1.67 }, { x: 1.6, y: 1.99, z: 0.91 }, { x: 2.8, y: 1.58, z: 1.69 },
  { x: 2.97, y: 2.3, z: 0.65 }, { x: -1.3, y: -0.2, z: -2.5 }, { x: 4, y: 1.78, z: 0.38 },
  { x: 1.72, y: 1.4, z: -1.29 }, { x: 2.5, y: -1.2, z: -2 }, { x: 3.5, y: -0.58, z: 0.1 },
  { x: 0.1, y: 0.4, z: -2.42 }, { x: 4.5, y: 0.55, z: -0.5 }, { x: 3.87, y: 0, z: 1 },
  { x: 4.6, y: -0.1, z: 0.65 }, { x: 3, y: 1.5, z: -0.7 }, { x: 2.3, y: 0.6, z: -2.6 },
  { x: 4, y: 1.5, z: -1.6 }, { x: 3.35, y: 0.25, z: -1.5 }, { x: 4.76, y: -1.26, z: 0.4 },
  { x: 4.32, y: 0.85, z: 1.4 }, { x: 3.5, y: -1.82, z: 0.9 }, { x: 3.6, y: -0.6, z: 1.46 },
  { x: 4.55, y: -1.5, z: 1.63 }, { x: 3.8, y: -1.15, z: 2.1 }, { x: 2.9, y: -0.25, z: 1.86 },
  { x: 2.2, y: -0.4, z: 1.86 }, { x: 5.1, y: -0.24, z: 1.86 }, { x: 5.27, y: 1.24, z: 0.76 },
  { x: 5.27, y: 2, z: -0.4 }, { x: 6.4, y: 0.4, z: 1 }, { x: 5.15, y: 0.95, z: 2 },
  { x: 6.2, y: 0.5, z: -0.8 }, { x: 4, y: 0.08, z: 1.8 },
];

/* ── SCREEN DATA ─────────────────────────────────────── */
const SCREENS = [
  {
    id: 1, number: "01", title: "AI Engineering",
    subtitle: "Artificial Intelligence", tagline: "Automation · Machine Learning",
    description: "Custom AI models, ML pipelines and autonomous workflow automation that cut manual work and give your team a permanent capacity boost.",
    skills: ["Python", "LangChain", "TensorFlow", "PyTorch"],
    metrics: [
      { label: "Automation", value: "80%", numeric: 80 },
      { label: "Cost cut", value: "60%", numeric: 60 },
      { label: "Accuracy", value: "97%", numeric: 97 },
    ],
    mockup: "code", filename: "ai-pipeline.py",
    code: `# AI Pipeline — IntellioDev
import intelliodev as id

pipeline = id.ai.train(
    model="custom-llm",
    data=company.docs,
    epochs=50,
    gpu="A100-80GB"
)
pipeline.deploy("production")
# → 80% manual work removed`,
  },
  {
    id: 2, number: "02", title: "SaaS Product",
    subtitle: "Multi-Tenant Platform", tagline: "Billing · Permissions · Scale",
    description: "End-to-end SaaS builds with multi-tenant architecture, subscription billing, role-based access and infrastructure built to scale from day one.",
    skills: ["React", "Node.js", "PostgreSQL", "Stripe"],
    metrics: [
      { label: "Tenants", value: "10k+", numeric: 10 },
      { label: "Uptime", value: "99.9%", numeric: 99 },
      { label: "Response", value: "45ms", numeric: 45 },
    ],
    mockup: "dashboard", filename: "dashboard.app",
  },
  {
    id: 3, number: "03", title: "Web Platform",
    subtitle: "Modern Web Development", tagline: "Performance · SEO · Scale",
    description: "High-performance, responsive web applications built on modern standards — optimized for Core Web Vitals, SEO and enterprise reliability.",
    skills: ["React", "Next.js", "TypeScript", "Node.js"],
    metrics: [
      { label: "Lighthouse", value: "100", numeric: 100 },
      { label: "Load time", value: "0.8s", numeric: 8 },
      { label: "Bundle", value: "-45%", numeric: 45 },
    ],
    mockup: "browser", filename: "intelliodev.io",
  },
  {
    id: 4, number: "04", title: "Mobile App",
    subtitle: "iOS · Android", tagline: "Cross-Platform Native",
    description: "Native and cross-platform mobile applications that keep your brand in your customers' pockets — smooth, offline-capable and app-store ready.",
    skills: ["Flutter", "React Native", "Firebase", "GraphQL"],
    metrics: [
      { label: "Platforms", value: "2", numeric: 2 },
      { label: "Code share", value: "90%", numeric: 90 },
      { label: "Rating", value: "4.9", numeric: 49 },
    ],
    mockup: "mobile", filename: "app.tsx",
  },
  {
    id: 5, number: "05", title: "Cloud & DevOps",
    subtitle: "AWS · Azure · GCP", tagline: "CI/CD · Infrastructure",
    description: "Secure, scalable cloud migrations, CI/CD pipelines and Infrastructure-as-Code — engineered for 99.9% uptime with automated failover.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    metrics: [
      { label: "Uptime", value: "99.9%", numeric: 99 },
      { label: "Deploy", value: "3min", numeric: 3 },
      { label: "Cost", value: "-40%", numeric: 40 },
    ],
    mockup: "terminal", filename: "deploy.sh",
    code: `$ intelliodev deploy --prod
→ Building containers... ✓ 42s
→ Pushing to registry...   ✓ 18s
→ Rolling update 12/12 pods ✓
→ Health check: PASSED
→ Uptime 99.9% | Lat 45ms
✓ Deployed in 3m 12s`,
  },
  {
    id: 6, number: "06", title: "Data Analytics",
    subtitle: "Business Intelligence", tagline: "Dashboards · Reports · KPIs",
    description: "Real-time analytics dashboards, custom reporting pipelines and KPI tracking that turn raw data into decisions your team can actually act on.",
    skills: ["BigQuery", "Looker", "Python", "dbt"],
    metrics: [
      { label: "Data points", value: "10M+", numeric: 10 },
      { label: "Refresh", value: "Live", numeric: 100 },
      { label: "Dashboards", value: "24", numeric: 24 },
    ],
    mockup: "chart", filename: "analytics.dash",
  },
  {
    id: 7, number: "07", title: "UI/UX Design",
    subtitle: "Product Design System", tagline: "Research · Prototype · Ship",
    description: "User-centered design systems, interactive prototypes and research-driven interfaces — built to increase conversions and reduce friction.",
    skills: ["Figma", "Prototyping", "Design Systems", "Testing"],
    metrics: [
      { label: "Conversion", value: "+65%", numeric: 65 },
      { label: "Retention", value: "+40%", numeric: 40 },
      { label: "Speed", value: "Fast", numeric: 95 },
    ],
    mockup: "kanban", filename: "design.fig",
  },
  {
    id: 8, number: "08", title: "Custom Software",
    subtitle: "Enterprise Engineering", tagline: "Full IP Ownership · Production",
    description: "Production-grade custom software engineered to your exact business logic — with full IP ownership, clean code and enterprise scalability from day one.",
    skills: ["React", "Node.js", "PostgreSQL", "Docker"],
    metrics: [
      { label: "IP", value: "100%", numeric: 100 },
      { label: "Uptime", value: "99.9%", numeric: 99 },
      { label: "Ship", value: "Fast", numeric: 92 },
    ],
    mockup: "code", filename: "enterprise.ts",
    code: `// Enterprise System — IntellioDev
export class Platform {
  async bootstrap() {
    await this.auth.init();
    await this.billing.setup();
    await this.tenants.scale();
    await this.monitoring.watch();
    return this.launch();
  }
}
// → Full IP ownership, production-ready`,
  },
];

const COLORS = {
  primary: 0x990011,
  primaryLight: 0xb7283a,
  primaryDark: 0x5a0008,
  white: 0xffffff,
  warmWhite: 0xfff8f5,
};

/* ── ANIMATED COUNTER HOOK ───────────────────────────── */
const useCountUp = (target, active, duration = 1400) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
};

/* ── METRIC CARD ────────────────────────────────────── */
const MetricCard = ({ metric, active, index }) => {
  const count = useCountUp(metric.numeric, active, 1400 + index * 150);
  const pct = Math.min(count / Math.max(metric.numeric, 1), 1);
  const ringLen = 2 * Math.PI * 20;

  const displayValue = (() => {
    const v = metric.value;
    if (v.includes("%")) return `${count}%`;
    if (v.includes("ms")) return `${count}ms`;
    if (v.includes("min")) return `${count}min`;
    if (v === "0.8s") return `${(count / 10).toFixed(1)}s`;
    if (v.includes("k")) return `${count}k+`;
    if (v.includes("M")) return `${count}M+`;
    if (v === "4.9") return `${(count / 10).toFixed(1)}`;
    if (v.startsWith("+")) return `+${count}%`;
    if (v.startsWith("-")) return `-${count}%`;
    return `${count}`;
  })();

  return (
    <div className="metric-item" style={{ animationDelay: `${index * 0.12}s` }}>
      <svg className="metric-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(153,0,17,0.12)" strokeWidth="3" />
        <circle
          cx="24" cy="24" r="20" fill="none"
          stroke="url(#metricGrad)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={ringLen}
          strokeDashoffset={ringLen * (1 - pct)}
          transform="rotate(-90 24 24)"
          style={{ transition: "stroke-dashoffset 0.15s linear" }}
        />
        <defs>
          <linearGradient id="metricGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#990011" />
            <stop offset="100%" stopColor="#D14A5C" />
          </linearGradient>
        </defs>
      </svg>
      <div className="metric-text">
        <span className="metric-value">{displayValue}</span>
        <span className="metric-label">{metric.label}</span>
      </div>
    </div>
  );
};

/* ── MOCKUPS ──────────────────────────────────────────── */
const MockupCode = ({ filename, code }) => (
  <>
    <div className="code-header">
      <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
      <span className="code-filename">{filename}</span>
      <span className="code-badge">IntellioDev IDE</span>
    </div>
    <div className="code-editor">
      <div className="code-lines">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i}>{String(i + 1).padStart(2, "0")}</span>
        ))}
      </div>
      <pre className="code-body"><code>{code}</code></pre>
    </div>
    <div className="code-statusbar">
      <span className="sb-item">⎇ main</span>
      <span className="sb-item">TypeScript</span>
      <span className="sb-item">UTF-8</span>
      <span className="sb-item sb-right">✓ No issues</span>
    </div>
  </>
);

const MockupDashboard = ({ filename }) => (
  <>
    <div className="code-header">
      <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
      <span className="code-filename">{filename}</span>
      <span className="code-badge code-badge-live">● Live</span>
    </div>
    <div className="mockup-dashboard">
      <div className="dash-sidebar">
        <div className="dash-logo">ID</div>
        <div className="dash-nav active" /><div className="dash-nav" />
        <div className="dash-nav" /><div className="dash-nav" /><div className="dash-nav" />
      </div>
      <div className="dash-main">
        <div className="dash-topbar">
          <span className="dash-title">Overview</span>
          <div className="dash-user">
            <span className="dash-user-dot" />
            <span className="dash-user-label">Production</span>
          </div>
        </div>
        <div className="dash-row">
          <div className="dash-card accent-1">
            <span className="dash-value">10,248</span>
            <span className="dash-label">Tenants</span>
            <span className="dash-trend">↑ 12%</span>
          </div>
          <div className="dash-card accent-2">
            <span className="dash-value">99.9%</span>
            <span className="dash-label">Uptime</span>
            <span className="dash-trend">↑ 0.3%</span>
          </div>
          <div className="dash-card accent-3">
            <span className="dash-value">$284K</span>
            <span className="dash-label">MRR</span>
            <span className="dash-trend">↑ 24%</span>
          </div>
        </div>
        <div className="dash-graph">
          <div className="dash-graph-head">
            <span>Revenue trend</span>
            <span className="dash-graph-value">+32.4%</span>
          </div>
          <div className="dash-bars">
            {[40, 65, 85, 55, 75, 95, 70, 88].map((h, i) => (
              <div key={i} className="dash-bar" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

const MockupBrowser = ({ filename }) => (
  <>
    <div className="code-header">
      <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
      <div className="browser-url">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>https://{filename}</span>
      </div>
    </div>
    <div className="mockup-browser">
      <div className="browser-nav">
        <span className="browser-logo">Intellio<span>Dev</span></span>
        <div className="browser-links">
          <span>Home</span><span>Services</span><span>Work</span><span>Contact</span>
        </div>
      </div>
      <div className="browser-hero">
        <div className="browser-tag">New · v2.0</div>
        <div className="browser-h1">Build faster</div>
        <div className="browser-h1 accent">Ship smarter</div>
        <div className="browser-sub">Production-grade web applications built on modern standards</div>
        <div className="browser-btn">Get started →</div>
      </div>
      <div className="browser-grid">
        {[0, 1, 2].map((i) => (
          <div key={i} className="browser-block">
            <div className={`browser-icon ${i === 1 ? "accent" : ""}`} />
            <div className="browser-block-line" />
            <div className="browser-block-line short" />
          </div>
        ))}
      </div>
    </div>
  </>
);

const MockupMobile = ({ filename }) => (
  <>
    <div className="code-header">
      <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
      <span className="code-filename">{filename}</span>
      <span className="code-badge">iOS · Android</span>
    </div>
    <div className="mockup-mobile">
      <div className="mobile-frame side">
        <div className="mobile-notch" />
        <div className="mobile-screen light">
          <div className="mobile-status light"><span>9:41</span><span>●●●</span></div>
          <div className="mobile-h1 light" />
          <div className="mobile-line light" />
          <div className="mobile-line light short" />
          <div className="mobile-card light">
            <div className="mobile-avatar light" />
            <div className="mobile-info">
              <div className="mobile-line light" />
              <div className="mobile-line light short" />
            </div>
          </div>
          <div className="mobile-card light">
            <div className="mobile-avatar light" />
            <div className="mobile-info">
              <div className="mobile-line light" />
              <div className="mobile-line light short" />
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-frame">
        <div className="mobile-notch" />
        <div className="mobile-screen">
          <div className="mobile-status"><span>9:41</span><span>●●● ▮▮</span></div>
          <div className="mobile-h1" />
          <div className="mobile-hero-card">
            <div className="mobile-hero-glow" />
            <span className="mobile-hero-label">Balance</span>
            <span className="mobile-hero-value">$12,480</span>
          </div>
          <div className="mobile-card">
            <div className="mobile-avatar" />
            <div className="mobile-info">
              <div className="mobile-line" /><div className="mobile-line short" />
            </div>
            <span className="mobile-amt">+$240</span>
          </div>
          <div className="mobile-card">
            <div className="mobile-avatar alt" />
            <div className="mobile-info">
              <div className="mobile-line" /><div className="mobile-line short" />
            </div>
            <span className="mobile-amt">+$180</span>
          </div>
          <div className="mobile-card">
            <div className="mobile-avatar" />
            <div className="mobile-info">
              <div className="mobile-line" /><div className="mobile-line short" />
            </div>
            <span className="mobile-amt">+$920</span>
          </div>
          <div className="mobile-nav-bar">
            <span className="active" /><span /><span /><span />
          </div>
        </div>
      </div>
    </div>
  </>
);

const MockupTerminal = ({ filename, code }) => (
  <>
    <div className="code-header">
      <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
      <span className="code-filename">{filename}</span>
      <span className="code-badge code-badge-live">● Running</span>
    </div>
    <div className="terminal-wrap">
      <pre className="code-body terminal-body">
        <code>{code}</code>
        <span className="terminal-cursor">▊</span>
      </pre>
    </div>
    <div className="terminal-footer">
      <div className="term-chip"><span className="term-chip-dot" />AWS us-east-1</div>
      <div className="term-chip"><span className="term-chip-dot green" />12 pods ready</div>
      <div className="term-chip"><span className="term-chip-dot" />CPU 42%</div>
    </div>
  </>
);

const MockupChart = ({ filename }) => (
  <>
    <div className="code-header">
      <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
      <span className="code-filename">{filename}</span>
      <span className="code-badge code-badge-live">● Real-time</span>
    </div>
    <div className="mockup-chart">
      <div className="chart-title">
        <div className="chart-title-left">
          <span className="chart-label">Real-Time Analytics</span>
          <span className="chart-sublabel">Last 30 days · Live</span>
        </div>
        <span className="chart-value">+240%</span>
      </div>
      <svg viewBox="0 0 400 140" className="chart-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B7283A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#990011" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#990011" />
            <stop offset="100%" stopColor="#D14A5C" />
          </linearGradient>
        </defs>
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          <line x1="0" y1="35" x2="400" y2="35" />
          <line x1="0" y1="70" x2="400" y2="70" />
          <line x1="0" y1="105" x2="400" y2="105" />
        </g>
        <path
          d="M0,120 C40,90 80,105 120,75 C160,50 200,70 240,40 C280,20 320,30 360,15 L400,10"
          fill="none" stroke="url(#chartLine)" strokeWidth="3.5" strokeLinecap="round"
        />
        <path
          d="M0,120 C40,90 80,105 120,75 C160,50 200,70 240,40 C280,20 320,30 360,15 L400,10 L400,140 L0,140 Z"
          fill="url(#chartGrad)"
        />
        <circle cx="360" cy="15" r="6" fill="#D14A5C" />
        <circle cx="360" cy="15" r="12" fill="#D14A5C" opacity="0.35">
          <animate attributeName="r" values="6;22;6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="chart-stats">
        <div className="chart-stat">
          <span className="chart-stat-value">10M+</span>
          <span className="chart-stat-label">Data points</span>
          <span className="chart-stat-trend">↑ 24%</span>
        </div>
        <div className="chart-stat">
          <span className="chart-stat-value">Live</span>
          <span className="chart-stat-label">Refresh</span>
          <span className="chart-stat-trend">● Active</span>
        </div>
        <div className="chart-stat">
          <span className="chart-stat-value">24</span>
          <span className="chart-stat-label">Dashboards</span>
          <span className="chart-stat-trend">↑ 6</span>
        </div>
      </div>
    </div>
  </>
);

const MockupKanban = ({ filename }) => (
  <>
    <div className="code-header">
      <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
      <span className="code-filename">{filename}</span>
      <span className="code-badge">Design Sprint</span>
    </div>
    <div className="mockup-kanban">
      <div className="kanban-col">
        <div className="kanban-head">
          <span className="kanban-dot" />Research <span className="kanban-count">3</span>
        </div>
        <div className="kanban-card">
          <div className="kanban-line" /><div className="kanban-line short" />
          <div className="kanban-tags"><span className="tag-1">UX</span><span className="tag-2">User</span></div>
        </div>
        <div className="kanban-card">
          <div className="kanban-line" />
          <div className="kanban-tags"><span className="tag-3">Data</span></div>
        </div>
        <div className="kanban-card">
          <div className="kanban-line" /><div className="kanban-line short" />
        </div>
      </div>
      <div className="kanban-col">
        <div className="kanban-head">
          <span className="kanban-dot active" />Wireframe <span className="kanban-count">4</span>
        </div>
        <div className="kanban-card active">
          <div className="kanban-line" />
          <div className="kanban-tags"><span className="tag-1">UI</span><span className="tag-3">Figma</span></div>
        </div>
        <div className="kanban-card">
          <div className="kanban-line" /><div className="kanban-line short" />
          <div className="kanban-tags"><span className="tag-2">Flow</span></div>
        </div>
        <div className="kanban-card"><div className="kanban-line" /></div>
      </div>
      <div className="kanban-col">
        <div className="kanban-head">
          <span className="kanban-dot done" />Handoff <span className="kanban-count">2</span>
        </div>
        <div className="kanban-card done">
          <div className="kanban-line" />
          <div className="kanban-tags"><span className="tag-2">Dev</span></div>
        </div>
        <div className="kanban-card"><div className="kanban-line short" /></div>
      </div>
    </div>
  </>
);

const MockupRenderer = ({ type, filename, code }) => {
  switch (type) {
    case "dashboard": return <MockupDashboard filename={filename} />;
    case "browser": return <MockupBrowser filename={filename} />;
    case "mobile": return <MockupMobile filename={filename} />;
    case "terminal": return <MockupTerminal filename={filename} code={code} />;
    case "chart": return <MockupChart filename={filename} />;
    case "kanban": return <MockupKanban filename={filename} />;
    case "code":
    default: return <MockupCode filename={filename} code={code} />;
  }
};

/* ── MAIN COMPONENT ─────────────────────────────────── */
const Template = () => {
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const rootRef = useRef(null);

  const [loadingComplete, setLoadingComplete] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scrollFraction, setScrollFraction] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const scrollTimeoutRef = useRef(null);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const spheresRef = useRef([]);
  const groupRef = useRef(null);
  const animationFrameRef = useRef(null);

  /* THREE.JS */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      25, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.z = 32;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, alpha: true, premultipliedAlpha: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.6;
    controlsRef.current = controls;

    const material = new THREE.MeshStandardMaterial({
      color: COLORS.primary,
      emissive: COLORS.primaryDark,
      emissiveIntensity: 0.6,
      roughness: 0.35,
      metalness: 0.15,
      transparent: true,
      opacity: 1,
    });

    const group = new THREE.Group();
    groupRef.current = group;
    const spheres = [];

    positions.forEach((pos, index) => {
      const radius = radii[index];
      const geometry = new THREE.SphereGeometry(radius, 64, 64);
      const sphere = new THREE.Mesh(geometry, material.clone());
      sphere.position.set(pos.x, pos.y, pos.z);
      sphere.userData = { originalPosition: { ...pos }, radius };
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      spheres.push(sphere);
      group.add(sphere);
    });

    scene.add(group);
    spheresRef.current = spheres;

    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const spotLight = new THREE.SpotLight(COLORS.warmWhite, 0.9);
    spotLight.position.set(14, 24, 30);
    spotLight.castShadow = true;
    scene.add(spotLight);
    const d1 = new THREE.DirectionalLight(0xffffff, 0.4);
    d1.position.set(0, -4, 0);
    scene.add(d1);
    const rim = new THREE.DirectionalLight(COLORS.primaryLight, 0.45);
    rim.position.set(-15, 10, -20);
    scene.add(rim);

    const initY = -25;
    const revR = 4;
    const revDur = 0.9;

    spheres.forEach((sphere) => { sphere.position.y = initY; });
    spheres.forEach((sphere, i) => {
      const delay = i * 0.006;
      gsap.timeline()
        .to(sphere.position, {
          duration: revDur / 2, y: revR, ease: "power1.out", delay,
          onUpdate: function () {
            const p = this.progress();
            sphere.position.z = sphere.userData.originalPosition.z + Math.sin(p * Math.PI) * revR;
          },
        })
        .to(sphere.position, {
          duration: revDur / 2, y: initY / 5, ease: "power1.out",
          onUpdate: function () {
            const p = this.progress();
            sphere.position.z = sphere.userData.originalPosition.z - Math.sin(p * Math.PI) * revR;
          },
        })
        .to(sphere.position, {
          duration: 0.4,
          x: sphere.userData.originalPosition.x,
          y: sphere.userData.originalPosition.y,
          z: sphere.userData.originalPosition.z,
          ease: "power1.out",
          onComplete: () => {
            gsap.to(sphere.material, { opacity: 0, duration: 0.5, ease: "power2.out" });
          },
        });
    });

    const hideTimeout = setTimeout(() => {
      setLoadingComplete(true);
      setTimeout(() => { spheres.forEach((s) => { s.visible = false; }); }, 800);
    }, (revDur + 1.0) * 1000);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(hideTimeout);
      window.removeEventListener("resize", onResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  /* CURSOR */
  useEffect(() => {
    if (!loadingComplete) return;
    if (window.innerWidth < 1199) return;

    gsap.set(".circle", { xPercent: -50, yPercent: -50 });
    gsap.set(".circle-follow", { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(".circle", "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(".circle", "y", { duration: 0.6, ease: "power3" });
    const xF = gsap.quickTo(".circle-follow", "x", { duration: 0.6, ease: "power3" });
    const yF = gsap.quickTo(".circle-follow", "y", { duration: 0.6, ease: "power3" });

    const handleMove = (e) => {
      xTo(e.clientX); yTo(e.clientY);
      xF(e.clientX); yF(e.clientY);
      const me = document.querySelector(".mouse-effect");
      if (me) me.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [loadingComplete]);

  /* AUTO SCROLL */
  useEffect(() => {
    if (!loadingComplete || !isAutoPlay) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      setActiveScreen((prev) => {
        const next = (prev + 1) % SCREENS.length;
        const target = next * (container.scrollWidth / SCREENS.length);
        container.scrollTo({ left: target, behavior: "smooth" });
        return next;
      });
    }, 5500);

    return () => clearInterval(interval);
  }, [loadingComplete, isAutoPlay]);

  /* UI AUTO-HIDE */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !loadingComplete) return;

    const hideUI = () => {
      setShowUI(false);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setShowUI(true), 2000);
    };

    container.addEventListener("scroll", hideUI, { passive: true });
    container.addEventListener("wheel", hideUI, { passive: true });
    container.addEventListener("touchmove", hideUI, { passive: true });

    return () => {
      container.removeEventListener("scroll", hideUI);
      container.removeEventListener("wheel", hideUI);
      container.removeEventListener("touchmove", hideUI);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [loadingComplete]);

  /* SCROLL LISTENER */
  const handleScroll = useCallback((e) => {
    const container = e.target;
    const scrollLeft = container.scrollLeft;
    const screenW = container.scrollWidth / SCREENS.length;
    const index = Math.round(scrollLeft / screenW);
    setActiveScreen(index);

    const frac = scrollLeft / screenW - index;
    setScrollFraction(frac);

    const total = container.scrollWidth - container.clientWidth;
    setProgress(total > 0 ? (scrollLeft / total) * 100 : 0);
  }, []);

  /* RENDER */
  return (
    <div className="template-root" ref={rootRef}>
      {/* Background */}
      <div className="bg-anim" aria-hidden="true">
        <div className="bg-beam bg-beam-1" />
        <div className="bg-beam bg-beam-2" />
        <div className="bg-beam bg-beam-3" />
        <div className="bg-beam bg-beam-4" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="bg-orb bg-orb-4" />
        <div className="bg-orb bg-orb-5" />
        <div className="bg-grid" />
        <div className="bg-dots">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="bg-dot"
              style={{
                left: `${(i * 43) % 100}%`,
                top: `${(i * 61) % 100}%`,
                animationDelay: `${(i % 9) * 0.6}s`,
                animationDuration: `${5 + (i % 5)}s`,
                background:
                  i % 4 === 0 ? "var(--primary)"
                    : i % 4 === 1 ? "var(--primary-light)"
                    : i % 4 === 2 ? "#D14A5C" : "#E56B7A",
              }}
            />
          ))}
        </div>
      </div>

      <div className="mouse-effect">
        <div className="circle"></div>
        <div className="circle-follow"></div>
      </div>

      <canvas className="webgl" ref={canvasRef}></canvas>

      <div
        className="scroll-container"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {SCREENS.map((s, i) => {
          const isActive = activeScreen === i;
          const distance = Math.abs(i - activeScreen + scrollFraction);
          const scale = Math.max(0.92, 1 - distance * 0.08);
          const opacity = Math.max(0.4, 1 - distance * 0.35);
          const blur = Math.min(6, distance * 6);

          return (
            <section
              key={s.id}
              id={`screen-${i}`}
              className={`screen screen-${i + 1} ${isActive ? "active" : ""}`}
            >
              <div
                className="screen-content"
                style={{
                  transform: `scale(${scale})`,
                  opacity: opacity,
                  filter: `blur(${blur}px)`,
                  transition:
                    "transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease, filter 0.5s ease",
                }}
              >
              

                {/* MAIN SPLIT */}
                <div className="screen-split">
                  <div className="screen-left">
                    <h1 className="screen-title">{s.title}</h1>
                    <p className="screen-desc">{s.description}</p>

                    <div className="screen-skills">
                      {s.skills.map((skill, idx) => (
                        <span key={idx} className="skill-chip">{skill}</span>
                      ))}
                    </div>

                    <div className="screen-metrics">
                      {s.metrics.map((m, idx) => (
                        <MetricCard key={idx} metric={m} active={isActive} index={idx} />
                      ))}
                    </div>
                  </div>

                  <div className="screen-right">
                    <div className="laptop-mockup">
                      <div className={`laptop-screen mockup-${s.mockup}`}>
                        <MockupRenderer
                          type={s.mockup}
                          filename={s.filename}
                          code={s.code}
                        />
                      </div>
                      <div className="laptop-base">
                        <div className="laptop-notch" />
                      </div>
                    </div>

                    <span className="float-dot fd-1" aria-hidden="true" />
                    <span className="float-dot fd-2" aria-hidden="true" />
                    <span className="float-dot fd-3" aria-hidden="true" />
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="screen-bottom">
                  <div className="left-desc">
                    <h1>{s.number}</h1>
                    
                  </div>

                 

                  
                  </div>
                </div>
            </section>
          );
        })}
      </div>

      {/* UI overlay */}
      <div className={`ui-overlay ${showUI ? "visible" : "hidden"}`}>
        <div className="scroll-indicator">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="dots-row">
            {SCREENS.map((_, i) => (
              <span
                key={i}
                className={`dot ${activeScreen === i ? "active" : ""}`}
                onClick={() => {
                  const c = scrollContainerRef.current;
                  if (c) {
                    const screenW = c.scrollWidth / SCREENS.length;
                    c.scrollTo({ left: i * screenW, behavior: "smooth" });
                  }
                }}
              ></span>
            ))}
          </div>
        </div>

        <button
          className="autoplay-btn"
          onClick={() => setIsAutoPlay((p) => !p)}
          title={isAutoPlay ? "Pause autoscroll" : "Play autoscroll"}
        >
          {isAutoPlay ? "❚❚" : "▶"}
        </button>
      </div>
    </div>
  );
};

export default Template;