// TrustedBySection.jsx — Intelliodev.io · Trusted By
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './TrustedBySection.css';

const COMPANIES = [
  { name: 'Google', logo: 'https://cdn.simpleicons.org/google/990011', color: '#990011', url: 'https://about.google', industry: 'Search & Cloud' },
  { name: 'Microsoft', logo: 'https://cdn.simpleicons.org/microsoft/990011', color: '#B7283A', url: 'https://microsoft.com', industry: 'Enterprise Software' },
  { name: 'Amazon', logo: 'https://cdn.simpleicons.org/amazon/990011', color: '#990011', url: 'https://aws.amazon.com', industry: 'Cloud & Commerce' },
  { name: 'Meta', logo: 'https://cdn.simpleicons.org/meta/990011', color: '#B7283A', url: 'https://about.meta.com', industry: 'Social & AI' },
  { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/990011', color: '#990011', url: 'https://apple.com', industry: 'Consumer Tech' },
  { name: 'Netflix', logo: 'https://cdn.simpleicons.org/netflix/990011', color: '#B7283A', url: 'https://netflix.com', industry: 'Streaming' },
  { name: 'Tesla', logo: 'https://cdn.simpleicons.org/tesla/990011', color: '#990011', url: 'https://tesla.com', industry: 'EV & Energy' },
  { name: 'NVIDIA', logo: 'https://cdn.simpleicons.org/nvidia/990011', color: '#B7283A', url: 'https://nvidia.com', industry: 'AI & GPU' },
  { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe/990011', color: '#990011', url: 'https://stripe.com', industry: 'Fintech' },
  { name: 'Shopify', logo: 'https://cdn.simpleicons.org/shopify/990011', color: '#B7283A', url: 'https://shopify.com', industry: 'E-commerce' },
  { name: 'Slack', logo: 'https://cdn.simpleicons.org/slack/990011', color: '#990011', url: 'https://slack.com', industry: 'Team Collaboration' },
  { name: 'Spotify', logo: 'https://cdn.simpleicons.org/spotify/990011', color: '#B7283A', url: 'https://spotify.com', industry: 'Audio Streaming' },
  { name: 'Airbnb', logo: 'https://cdn.simpleicons.org/airbnb/990011', color: '#990011', url: 'https://airbnb.com', industry: 'Travel' },
  { name: 'Uber', logo: 'https://cdn.simpleicons.org/uber/990011', color: '#B7283A', url: 'https://uber.com', industry: 'Mobility' },
  { name: 'Adobe', logo: 'https://cdn.simpleicons.org/adobe/990011', color: '#990011', url: 'https://adobe.com', industry: 'Creative Software' },
  { name: 'Salesforce', logo: 'https://cdn.simpleicons.org/salesforce/990011', color: '#B7283A', url: 'https://salesforce.com', industry: 'CRM' },
  { name: 'IBM', logo: 'https://cdn.simpleicons.org/ibm/990011', color: '#990011', url: 'https://ibm.com', industry: 'Enterprise AI' },
  { name: 'Oracle', logo: 'https://cdn.simpleicons.org/oracle/990011', color: '#B7283A', url: 'https://oracle.com', industry: 'Database & Cloud' },
];

const TrustedBySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const mid = Math.ceil(COMPANIES.length / 2);
  const row1 = COMPANIES.slice(0, mid);
  const row2 = COMPANIES.slice(mid);

  const row1Items = [...row1, ...row1, ...row1];
  const row2Items = [...row2, ...row2, ...row2];

  const renderCard = (company, key, rowKey) => {
    const uniqueKey = `${rowKey}-${key}`;
    const isHovered = hoveredIndex === uniqueKey;

    return (
      <motion.a
        key={uniqueKey}
        href={company.url}
        target="_blank"
        rel="noopener noreferrer"
        className="tb-card"
        onMouseEnter={() => setHoveredIndex(uniqueKey)}
        onMouseLeave={() => setHoveredIndex(null)}
        whileHover={{ y: -6, scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        style={{ '--brand': company.color }}
      >
        <div className={`tb-card-inner ${isHovered ? 'is-hovered' : ''}`}>
          <span className="tb-card-border" aria-hidden="true" />
          <span className="tb-card-glow" aria-hidden="true" />
          <span className="tb-card-shine" aria-hidden="true" />

          <div className="tb-logo-wrap">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="tb-logo-img"
              loading="lazy"
              draggable="false"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('.tb-logo-fallback')) {
                  const span = document.createElement('span');
                  span.className = 'tb-logo-fallback';
                  span.textContent = company.name.charAt(0);
                  parent.appendChild(span);
                }
              }}
            />
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.span
                className="tb-card-name"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.22 }}
              >
                {company.name}
              </motion.span>
            )}
          </AnimatePresence>

          <span className="tb-card-dot" aria-hidden="true" />
        </div>
      </motion.a>
    );
  };

  return (
    <section className="trusted-by-section" ref={sectionRef} id="trusted-by">
      <div className="tb-bg" aria-hidden="true">
        <div className="tb-aurora tb-aurora-1" />
        <div className="tb-aurora tb-aurora-2" />
        <div className="tb-grid" />
        <div className="tb-dots">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="tb-dot"
              style={{
                left: `${(i * 41) % 100}%`,
                top: `${(i * 57) % 100}%`,
                animationDelay: `${(i % 9) * 0.8}s`,
                animationDuration: `${7 + (i % 6)}s`,
                background: i % 2 === 0 ? 'var(--primary)' : 'var(--primary-light)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="tb-container">
        {/* Header */}
        <motion.div
          className="tb-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          

          <motion.h2
            className="tb-title"
            initial={{ opacity: 0, y: 26 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            Powering <span className="tb-gradient-text">world-class teams</span>
          </motion.h2>

          <motion.p
            className="tb-subtitle"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.4 }}
          >
            500+ organizations trust <strong>IntellioDev</strong> for digital
            transformation, innovative software, and cutting-edge technology.
          </motion.p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          className="tb-marquee"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="tb-marquee-row">
            <div className="tb-marquee-track tb-track-left">
              {row1Items.map((c, i) => renderCard(c, i, 'r1'))}
            </div>
          </div>

          <div className="tb-divider" aria-hidden="true">
            <span className="tb-divider-line" />
            <motion.span
              className="tb-divider-dot"
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="tb-divider-line" />
          </div>

          <div className="tb-marquee-row">
            <div className="tb-marquee-track tb-track-right">
              {row2Items.map((c, i) => renderCard(c, i, 'r2'))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="tb-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { value: '500+', label: 'US clients served' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '10+', label: 'Years shipping' },
            { value: '24/7', label: 'Engineering support' },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="tb-stat">
                <span className="tb-stat-value">{s.value}</span>
                <span className="tb-stat-label">{s.label}</span>
              </div>
              {i < 3 && <span className="tb-stat-sep" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;