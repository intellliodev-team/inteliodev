// Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // ── Animation variants ─────────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.15 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 45, rotateX: -30 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', stiffness: 130, damping: 14 },
    },
  };

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    },
  });

  const trustVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.55 },
    },
  };

  const trustItem = {
    hidden: { opacity: 0, y: 14, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 18 },
    },
  };

  // Services marquee items
  const services = [
    'Custom Software',
    'Mobile Apps',
    'Web Platforms',
    'AI & ML',
    'System Integration',
    'Cloud & DevOps',
    'Data Engineering',
    'API Development',
  ];

  return (
    <section className="hero" ref={heroRef}>
      {/* ── Ambient background layers ─────────────────────────── */}
      <div className="hero-bg">
        <div className="hero-grid-lines" />
        <div className="hero-spotlight" />
        <div className="hero-noise" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-orb hero-orb-4" />
      </div>

      {/* Entrance overlay */}
      <motion.div
        className="hero-entrance"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="hero-container">
        <div className="hero-content">
          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -22, scale: 0.85 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, type: 'spring', stiffness: 220, damping: 18 }}
          >
            <span className="hero-badge-dot" />
            <span>US-BASED SOFTWARE ENGINEERING PARTNER</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="hero-title"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <span className="line">
              <motion.span variants={wordVariants} className="word">Software</motion.span>{' '}
              <motion.span variants={wordVariants} className="word accent">Built for</motion.span>
            </span>
            <span className="line">
              <motion.span variants={wordVariants} className="word">American</motion.span>{' '}
              <motion.span variants={wordVariants} className="word lime">Businesses.</motion.span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="hero-sub"
            variants={fadeUp(0.35)}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            IntellioDev partners with US companies to design, engineer, and scale
            high-performance <strong>web platforms</strong>, <strong>mobile apps</strong>,{' '}
            <strong>AI systems</strong>, and <strong>enterprise integrations</strong> — shipped
            fast, built to last, and tailored to the way you work.
          </motion.p>

          {/* Service pills */}
          <motion.div
            className="hero-services"
            variants={fadeUp(0.45)}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {['Web', 'Mobile Apps', 'AI & ML', 'Integration', 'Cloud'].map((s) => (
              <motion.span
                key={s}
                className="service-pill"
                whileHover={{ y: -3, scale: 1.05, borderColor: 'rgba(0, 194, 168, 0.6)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            variants={fadeUp(0.55)}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <motion.button
              className="btn-primary"
              onClick={() => navigate('/contact')}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>Start Your Project</span>
              <span className="btn-arrow">→</span>
              <span className="btn-shine" />
            </motion.button>

            <motion.button
              className="btn-ghost"
              onClick={() => navigate('/services')}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>Explore Services</span>
            </motion.button>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            className="hero-trust"
            variants={trustVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {[
              'US Clients · Remote-First',
              'Enterprise-Grade Security',
              'Fixed-Scope Delivery',
              '24/7 Engineering Support',
            ].map((label) => (
              <motion.div
                key={label}
                className="trust-item"
                variants={trustItem}
                whileHover={{ x: 6, color: '#F4F7F6' }}
              >
                <span className="trust-check">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom services marquee ─────────────────────────────── */}
      <motion.div
        className="hero-marquee"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div className="marquee-track">
          {[...services, ...services].map((s, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot" />
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;