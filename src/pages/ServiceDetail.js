// ServiceDetail.jsx — Intelliodev.io · Modern Burgundy + Cream
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import {
  containerVariants,
  fadeUpVariants,
  defaultViewport,
} from '../utils/animationVariants';
import './ServiceDetail.css';

/* ── Inline SVG Icons ──────────────────────────── */
const IconRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const IconSpark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);
const IconLightbulb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2v.3h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" />
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconMinus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconTrend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconHeadset = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconPenTool = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);
const IconTestTube = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M9 2v6l-3 10a2 2 0 0 0 1.8 3h8.4a2 2 0 0 0 1.8-3l-3-10V2" />
    <line x1="8" y1="2" x2="16" y2="2" />
    <line x1="7.5" y1="14" x2="16.5" y2="14" />
  </svg>
);

const FloatingIcon = ({ type }) => {
  const icons = {
    rocket: IconRocket,
    spark: IconSpark,
    lightbulb: IconLightbulb,
    target: IconTarget,
    zap: IconZap,
    layers: IconLayers,
    code: IconCode,
    globe: IconGlobe,
  };
  const IconCmp = icons[type] || IconSpark;
  return <IconCmp />;
};

/* Data mapping */
const benefitIcons = [IconTrend, IconShield, IconUsers, IconHeadset, IconZap];
const processIcons = [IconSearch, IconPenTool, IconCode, IconTestTube, IconRocket];

const ServiceDetail = () => {
  const { slug } = useParams();
  const [activeFaq, setActiveFaq] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const service = servicesData.find((s) => s.slug === slug);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  /* ── Animation Variants ─────────────────────── */
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const headerContentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15,
      },
    },
  };

  const floatingIconVariants = {
    animate: (i) => ({
      y: [0, -16 - i * 4, 0],
      x: [0, i % 2 === 0 ? 12 : -12, 0],
      rotate: [0, i * 5, 0],
      transition: {
        duration: 4 + i * 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.2,
      },
    }),
  };

  const gradientLineVariants = {
    animate: {
      width: ['0%', '100%', '0%'],
      opacity: [0.3, 1, 0.3],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <main className="service-detail-page">
      {/* Scroll Progress Bar */}
      <motion.div
        className="service-scroll-progress"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          HERO
         ══════════════════════════════════════════════════════════════════ */}
      <motion.section
        className="service-hero"
        variants={pageVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        <div className="service-hero-bg" aria-hidden="true">
          <div className="service-hero-bg-aurora aurora-1" />
          <div className="service-hero-bg-aurora aurora-2" />
          <div className="service-hero-bg-aurora aurora-3" />
          <div className="service-hero-bg-grid" />
          <div className="service-hero-bg-dots">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="shd-dot"
                style={{
                  left: `${(i * 43) % 100}%`,
                  top: `${(i * 59) % 100}%`,
                  animationDelay: `${(i % 9) * 0.7}s`,
                  animationDuration: `${6 + (i % 5)}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="service-floating-icons" aria-hidden="true">
          {['rocket', 'spark', 'lightbulb', 'target', 'zap', 'layers', 'code', 'globe'].map((type, i) => (
            <motion.div
              key={i}
              className="floating-icon"
              custom={i}
              variants={floatingIconVariants}
              animate="animate"
              style={{
                left: `${8 + i * 12}%`,
                top: `${14 + (i % 4) * 18}%`,
              }}
            >
              <FloatingIcon type={type} />
            </motion.div>
          ))}
        </div>

        <div className="container">
          <motion.div
            className="service-hero-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            

            <motion.h1
              variants={headerContentVariants}
              className="service-main-heading"
            >
              <span className="heading-highlight">{service.title}</span>
              <span className="heading-gradient" style={{fontSize:50}}>Service</span>
            </motion.h1>

            <motion.p
              variants={headerContentVariants}
              className="service-hero-description"
            >
              {service.description}
            </motion.p>

            <motion.div
              className="hero-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

            <motion.div
              className="service-hero-actions"
              variants={headerContentVariants}
            >
              
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — EDITORIAL OVERVIEW
         ══════════════════════════════════════════════════════════════════ */}
      <section className="sd-overview">
        <div className="sd-overview-bg" aria-hidden="true">
          <div className="sd-ov-aurora sd-ov-aurora-1" />
          <div className="sd-ov-aurora sd-ov-aurora-2" />
          <div className="sd-ov-grid" />
        </div>

        <div className="container sd-overview-inner">
          <motion.div
            className="sd-ov-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.5 }}
          >
           
          </motion.div>

          <div className="sd-ov-grid-layout">
            <motion.div
              className="sd-ov-number"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>01</span>
              <div className="sd-ov-number-line" />
            </motion.div>

            <motion.div
              className="sd-ov-main"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="sd-ov-title">
                What We <span className="text-dra">Offer</span>
              </h2>
              <p className="sd-ov-desc">{service.overview}</p>
            </motion.div>

            <motion.div
              className="sd-ov-stats"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              {[
                { number: '10+', label: 'Years Experience' },
                { number: '200+', label: 'Projects Delivered' },
                { number: '98%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="sd-ov-stat"
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className="sd-ov-stat-num">{stat.number}</span>
                  <div className="sd-ov-stat-text">
                    <span className="sd-ov-stat-label">{stat.label}</span>
                    <span className="sd-ov-stat-bar" />
                  </div>
                  <span className="sd-ov-stat-arrow">
                    <IconArrow />
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — ADVANTAGES (Full-Width Editorial Rows)
         ══════════════════════════════════════════════════════════════════ */}
      <section className="sd-advantages">
        <div className="sd-adv-bg" aria-hidden="true">
          <div className="sd-adv-aurora-1" />
          <div className="sd-adv-aurora-2" />
        </div>

        <div className="container sd-adv-inner">
          <div className="sd-section-header">
           
            <motion.h2
              className="sd-section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              The <span className="text-dra" >Advantages</span> We Bring
            </motion.h2>
            <motion.p
              className="sd-section-sub"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Every engagement is built on a foundation of proven strengths.
            </motion.p>
          </div>

          <div className="sd-adv-list">
            {service.benefits.map((benefit, i) => {
              const Icon = benefitIcons[i % benefitIcons.length];
              return (
                <motion.div
                  key={i}
                  className="sd-adv-row"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ x: 8 }}
                >
                  <span className="sd-adv-bar" />

                  <span className="sd-adv-index">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="sd-adv-icon">
                    <Icon />
                  </div>

                  <div className="sd-adv-body">
                    <h3 className="sd-adv-title">{benefit}</h3>
                    <p className="sd-adv-text">
                      Backed by senior engineers, best-practice processes, and
                      a relentless focus on measurable outcomes.
                    </p>
                  </div>

                  <span className="sd-adv-arrow">
                    <IconArrow />
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — TECHNOLOGIES (Modern Grid Tiles)
         ══════════════════════════════════════════════════════════════════ */}
      <section className="sd-tech">
        <div className="sd-tech-bg" aria-hidden="true">
          <div className="sd-tech-aurora" />
          <div className="sd-tech-grid" />
        </div>

        <div className="container sd-tech-inner">
          <div className="sd-section-header">
            
            <motion.h2
              className="sd-section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              Built With <span className="text-dra">Modern Tools</span>
            </motion.h2>
            <motion.p
              className="sd-section-sub"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We use the right tool for every job — no compromises.
            </motion.p>
          </div>

          <div className="sd-tech-grid-tiles">
            {service.technologies.map((tech, i) => (
              <motion.div
                key={i}
                className="sd-tech-tile"
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
              >
                <span className="sd-tech-tile-rail" />
                <span className="sd-tech-tile-shine" />

                <span className="sd-tech-tile-index">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="sd-tech-tile-icon">
                  <IconSpark />
                </div>

                <span className="sd-tech-tile-name">{tech}</span>

                <span className="sd-tech-tile-line" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — PROCESS (Centered Modern Timeline)
         ══════════════════════════════════════════════════════════════════ */}
      <section className="sd-process">
        <div className="sd-process-bg" aria-hidden="true">
          <div className="sd-proc-aurora-1" />
          <div className="sd-proc-aurora-2" />
        </div>

        <div className="container sd-process-inner">
          <div className="sd-section-header">
            
            <motion.h2
              className="sd-section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              How We <span className="text-dra">Deliver</span>
            </motion.h2>
            <motion.p
              className="sd-section-sub"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              A battle-tested framework that keeps you in the loop every step.
            </motion.p>
          </div>

          <div className="sd-proc-timeline">
            <span className="sd-proc-timeline-line" aria-hidden="true" />

            {service.process.map((step, index) => {
              const Icon = processIcons[index % processIcons.length];
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className={`sd-proc-item ${isEven ? 'left' : 'right'}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="sd-proc-card">
                    <span className="sd-proc-card-rail" />
                    <span className="sd-proc-card-shine" />

                    <div className="sd-proc-card-head">
                      <span className="sd-proc-card-icon">
                        <Icon />
                      </span>
                      <span className="sd-proc-card-num">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="sd-proc-card-title">{step}</h3>
                    <p className="sd-proc-card-text">
                      {index === 0 &&
                        'We begin by understanding your vision, goals, and requirements to ensure alignment.'}
                      {index === 1 &&
                        'Our team creates detailed architectural designs and prototypes for your approval.'}
                      {index === 2 &&
                        'We build your solution using agile methodologies with regular progress updates.'}
                      {index === 3 &&
                        'Comprehensive testing ensures quality, performance, and reliability.'}
                      {index === 4 &&
                        'Seamless deployment with ongoing support and maintenance.'}
                    </p>
                  </div>

                  <motion.div
                    className="sd-proc-marker"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.2,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <span className="sd-proc-marker-inner" />
                    <span className="sd-proc-marker-ring" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — FAQ (Modern Split + Numbered Cards)
         ══════════════════════════════════════════════════════════════════ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="sd-faq">
          <div className="container">
            <div className="sd-faq-grid">
              <div className="sd-faq-side">
                
                <motion.h2
                  className="sd-faq-heading"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.6, delay: 0.05 }}
                >
                  Frequently Asked{' '}
                  <span className="text-dra">Questions</span>
                </motion.h2>
                <motion.p
                  className="sd-faq-sub"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Common inquiries about our {service.title.toLowerCase()}{' '}
                  service.
                </motion.p>

                <motion.div
                  className="sd-faq-side-visual"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <span className="sd-faq-side-visual-icon">
                    <IconHeadset />
                  </span>
                  <div>
                    <span className="sd-faq-side-visual-title">
                      Still have questions?
                    </span>
                    <span className="sd-faq-side-visual-sub">
                      Our team responds within hours.
                    </span>
                  </div>
                  <Link to="/contact" className="sd-faq-side-visual-cta">
                    Talk to us
                    <span className="sd-faq-side-visual-arrow">
                      <IconArrow />
                    </span>
                  </Link>
                </motion.div>
              </div>

              <div className="sd-faq-list">
                {service.faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className={`sd-faq-item ${
                      activeFaq === index ? 'active' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <motion.div
                      className="sd-faq-question"
                      onClick={() => toggleFaq(index)}
                      whileHover={{ x: 4 }}
                    >
                      <div className="sd-faq-question-row">
                        <span className="sd-faq-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="sd-faq-q-text">{faq.question}</h3>
                      </div>
                      <motion.span
                        className="sd-faq-toggle"
                        animate={{ rotate: activeFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        {activeFaq === index ? <IconMinus /> : <IconPlus />}
                      </motion.span>
                    </motion.div>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          className="sd-faq-answer"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p>{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — CTA (Wide + Slim, fully animated)
         ══════════════════════════════════════════════════════════════════ */}
      <section className="sd-cta">
        <div className="container">
          <motion.div
            className="sd-cta-box"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
          >
            <div className="sd-cta-bg" aria-hidden="true">
              <div className="sd-cta-aurora sd-cta-aurora-1" />
              <div className="sd-cta-aurora sd-cta-aurora-2" />
              <div className="sd-cta-grid" />
              <div className="sd-cta-dots">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className="sd-cta-dot"
                    style={{
                      left: `${(i * 37) % 100}%`,
                      top: `${(i * 61) % 100}%`,
                      animationDelay: `${(i % 6) * 0.7}s`,
                      animationDuration: `${6 + (i % 4)}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <span className="sd-cta-rail" aria-hidden="true" />
            <span className="sd-cta-shine" aria-hidden="true" />

            <div className="sd-cta-content">
              <div className="sd-cta-left">
                <span className="sd-cta-badge">
                  <span className="sd-cta-badge-dot" />
                  Ready to Start?
                </span>
                <h2 className="sd-cta-heading">
                  Let&apos;s Build Something{' '}
                  <span className="text-dra">Exceptional</span>
                </h2>
                <p className="sd-cta-text">
                  Ready to transform your ideas into production-ready
                  solutions? Let&apos;s set up a consulting session with our
                  engineering leads.
                </p>
              </div>

              <div className="sd-cta-right">
                <Link to="/contact" className="sd-cta-btn sd-cta-btn-primary">
                  <span className="btn-shine" />
                  <span className="sd-cta-btn-icon">
                    <IconRocket />
                  </span>
                  <span>Get Started</span>
                  <span className="sd-cta-btn-arrow">
                    <IconArrow />
                  </span>
                </Link>
                <Link to="/projects" className="sd-cta-btn sd-cta-btn-ghost">
                  <span>View Our Work</span>
                  <span className="sd-cta-btn-arrow">
                    <IconArrow />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;