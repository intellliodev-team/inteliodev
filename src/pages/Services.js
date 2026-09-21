// Services.jsx — Intelliodev.io · Modern Burgundy + Cream
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import ServiceCard from '../components/ServiceCard';
import {
  containerVariants,
  fadeUpVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './Services.css';

/* ── Inline SVG Icons ──────────────────────────── */
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconCloud = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);
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
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
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
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

/* ── Floating Decorative Icon ─────────────────── */
const FloatingIcon = ({ type }) => {
  const icons = {
    code: IconCode,
    cloud: IconCloud,
    rocket: IconRocket,
    spark: IconSpark,
    target: IconTarget,
    layers: IconLayers,
    shield: IconShield,
    zap: IconZap,
  };
  const IconCmp = icons[type] || IconSpark;
  return <IconCmp />;
};

const Services = () => {
  const services = servicesData;
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });

  useEffect(() => {
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

  /* ── Animation Variants ─────────────────────── */
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
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <main className="services-page">
      {/* Scroll Progress Bar */}
      <motion.div
        className="services-scroll-progress"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        className="services-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? 'visible' : 'hidden'}
      >
        {/* Background Layers */}
        <div className="services-header-bg" aria-hidden="true">
          <div className="services-header-bg-aurora aurora-1" />
          <div className="services-header-bg-aurora aurora-2" />
          <div className="services-header-bg-aurora aurora-3" />
          <div className="services-header-bg-grid" />
          <div className="services-header-bg-dots">
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

        {/* Floating Icons */}
        <div className="services-floating-icons" aria-hidden="true">
          {['code', 'cloud', 'rocket', 'spark', 'target', 'layers', 'shield', 'zap'].map(
            (type, i) => (
              <motion.div
                key={i}
                className="floating-icon"
                custom={i}
                variants={floatingIconVariants}
                animate="animate"
                style={{
                  left: `${8 + i * 12}%`,
                  top: `${12 + (i % 4) * 18}%`,
                }}
              >
                <FloatingIcon type={type} />
              </motion.div>
            )
          )}
        </div>

        <div className="container">
          <motion.div
            className="services-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Section Header */}
            <motion.div
              className="services-section-header"
              variants={sectionHeaderVariants}
            >
              <h2 className="section-title">
                Comprehensive <span className="text-gradient">Solutions</span>
              </h2>
              <p className="section-subtitle">
                Discover our full range of services designed to meet your unique
                business needs and drive measurable results.
              </p>
              <div className="section-divider">
                <span />
                <span />
                <span />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Services Grid ─────────────────────────────────────────────────── */}
      <section className="services-list">
        <div className="container">
          <motion.div
            className="services-grid-responsive"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Services;