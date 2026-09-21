// Proof.jsx — Intelliodev.io · Editorial Split Layout
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Proof.css';
import CTASection from './CTASection';

/* ── Inline SVG Icons ─────────────────────────────── */
const IconRocket = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 15c-1 3-1 4-2 5 1-1 2-1 5-2" />
    <path d="M9 19 5 15l8-11c4-2 7-1 7-1s1 3-1 7L9 19z" />
    <circle cx="14" cy="9" r="1.5" />
  </svg>
);

const IconChart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="21" x2="21" y2="21" />
    <polyline points="3 15 9 9 13 13 21 5" />
    <polyline points="17 5 21 5 21 9" />
  </svg>
);

const IconInsights = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const IconCogs = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconSparkle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2" />
  </svg>
);

const Proof = () => {
  const sectionRef = useRef(null);
  const counterRefs = useRef([]);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      animateCounters();
    }
  }, [isInView]);

  const animateCounters = () => {
    counterRefs.current.forEach((ref) => {
      if (!ref) return;
      const target = parseInt(ref.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        ref.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else ref.textContent = target;
      };
      requestAnimationFrame(tick);
    });
  };

  const heroMetrics = [
    {
      id: '01',
      value: 47,
      suffix: '+',
      label: 'Products shipped to production',
      Icon: IconRocket,
      accent: 'primary',
    },
    {
      id: '02',
      value: 12,
      suffix: 'yrs',
      label: 'Average senior engineer tenure',
      Icon: IconChart,
      accent: 'light',
    },
  ];

  const pillars = [
    {
      Icon: IconInsights,
      tag: 'Pillar 01',
      title: 'Psychology-first engineering',
      body: 'Every interface decision is grounded in behavioral research — not guesswork. We design for how humans actually decide.',
      points: [
        'Cognitive load audits',
        'Friction mapping',
        'Decision-architecture reviews',
      ],
    },
    {
      Icon: IconCogs,
      tag: 'Pillar 02',
      title: 'Automation that compounds',
      body: "We don't ship one-off tools. We build systems that learn, scale, and quietly remove work from your team's plate.",
      points: [
        'AI-native pipelines',
        'Self-healing infra',
        'Quarterly compounding reviews',
      ],
    },
  ];

  const ribbon = [
    { step: '01', label: 'Discover', sub: 'Behavioral research' },
    { step: '02', label: 'Build', sub: 'Full-stack delivery' },
    { step: '03', label: 'Automate', sub: 'AI + systems' },
    { step: '04', label: 'Grow', sub: 'Compounding results' },
  ];

  return (
    <motion.section
      className="proof-section"
      ref={sectionRef}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {/* Background */}
      <div className="proof-bg-container">
        <div className="proof-aurora proof-aurora-1" />
        <div className="proof-aurora proof-aurora-2" />
        <div className="proof-grid" />
        <div className="proof-spotlight" />
        <div className="proof-dots">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="proof-dot"
              style={{
                left: `${(i * 41) % 100}%`,
                top: `${(i * 57) % 100}%`,
                animationDelay: `${(i % 8) * 0.7}s`,
                animationDuration: `${7 + (i % 6)}s`,
                background:
                  i % 2 === 0 ? 'var(--primary)' : 'var(--primary-light)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="proof-container">
        {/* Eyebrow */}
        <motion.div
          className="proof-eyebrow-row"
          initial={{ opacity: 0, y: -12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <span className="proof-eyebrow">
            <span className="eyebrow-dot" />
            THE PROOF
            <span className="eyebrow-shine" />
          </span>
          <span className="proof-eyebrow-line" />
          <span className="proof-eyebrow-meta">EST. 2013 · USA</span>
        </motion.div>

        {/* Split Hero */}
        <div className="proof-split">
          {/* LEFT */}
          <motion.div
            className="proof-left"
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="proof-headline">
              We build the <span className="hl-primary">boring systems</span>
              <br />
              that make <span className="hl-light">ambitious ideas</span>
              <br />
              actually ship.
            </h2>

            <p className="proof-lede">
              Most agencies sell you a redesign and disappear. We embed a
              senior team, rebuild the wiring underneath, and hand you systems
              that keep paying for themselves long after the invoice clears.
            </p>

            <div className="proof-metrics">
              {heroMetrics.map((m, i) => {
                const IconCmp = m.Icon;
                return (
                  <motion.div
                    key={m.id}
                    className={`proof-metric metric-${m.accent}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.35 + i * 0.15,
                      type: 'spring',
                      stiffness: 110,
                    }}
                  >
                    <span className="metric-icon">
                      <IconCmp />
                    </span>
                    <div className="metric-value-row">
                      <span
                        className="metric-value"
                        ref={(el) => (counterRefs.current[i] = el)}
                        data-target={m.value}
                      >
                        0
                      </span>
                      <span className="metric-suffix">{m.suffix}</span>
                    </div>
                    <span className="metric-label">{m.label}</span>
                    <span className="metric-id">{m.id}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="proof-right"
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {pillars.map((p, i) => {
              const IconCmp = p.Icon;
              return (
                <motion.div
                  key={p.tag}
                  className="pillar-card"
                  initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                  animate={
                    isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.15,
                    type: 'spring',
                    stiffness: 110,
                  }}
                  whileHover={{ y: -6, scale: 1.01 }}
                >
                  <span className="pillar-corner pillar-tl" />
                  <span className="pillar-corner pillar-br" />
                  <div className="pillar-glow" />

                  <div className="pillar-head">
                    <span className="pillar-icon">
                      <IconCmp />
                    </span>
                    <span className="pillar-tag">{p.tag}</span>
                  </div>

                  <h3 className="pillar-title">{p.title}</h3>
                  <p className="pillar-body">{p.body}</p>

                  <ul className="pillar-points">
                    {p.points.map((pt, j) => (
                      <li key={j}>
                        <span className="point-bullet" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Ribbon */}
        <motion.div
          className="proof-ribbon"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.6 }}
        >
          <div className="ribbon-track">
            {ribbon.map((r, i) => (
              <React.Fragment key={r.step}>
                <div className="ribbon-item">
                  <span className="ribbon-step">{r.step}</span>
                  <div className="ribbon-text">
                    <span className="ribbon-label">{r.label}</span>
                    <span className="ribbon-sub">{r.sub}</span>
                  </div>
                </div>
                {i < ribbon.length - 1 && (
                  <span className="ribbon-arrow" aria-hidden="true">
                    <IconArrow />
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
          <span className="ribbon-shine" />
        </motion.div>

        {/* Signature */}
        <motion.div
          className="proof-signature"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.65 }}
        >
          <span className="signature-spark">
            <IconSparkle />
          </span>
          <span className="signature-text">
            Built by engineers who shipped before they consulted.
          </span>
          <span className="signature-mark">IntellioDev</span>
        </motion.div>

        <CTASection />
      </div>
    </motion.section>
  );
};

export default Proof;