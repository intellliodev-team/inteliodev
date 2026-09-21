// About.jsx — Intelliodev.io · Modern Burgundy + Cream
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Counter from '../components/Counter';
import {
  containerVariants,
  fadeUpVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './About.css';

/* ── Inline SVG Icons ──────────────────────────── */
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
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const IconBuilding = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M12 6h.01M12 10h.01M12 14h.01" />
  </svg>
);
const IconRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
const IconLightbulb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2v.3h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" />
  </svg>
);
const IconHandshake = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M11 17l-5-5a2 2 0 1 1 3-3l1 1 3-3 3 3 1-1a2 2 0 1 1 3 3l-5 5-2-2-2 2z" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/* ── Floating Decorative Icon ─────────────────── */
const FloatingIcon = ({ type }) => {
  const icons = {
    building: IconBuilding,
    spark: IconSpark,
    rocket: IconRocket,
    target: IconTarget,
    star: IconStar,
    eye: IconEye,
  };
  const IconCmp = icons[type] || IconSpark;
  return <IconCmp />;
};

/* ── Data ──────────────────────────────────────── */
const coreValues = [
  {
    Icon: IconLightbulb,
    title: 'Innovation',
    desc: 'Pushing boundaries with creative solutions that redefine industry standards.',
  },
  {
    Icon: IconHandshake,
    title: 'Integrity',
    desc: 'Building trust through honesty, transparency, and ethical practices.',
  },
  {
    Icon: IconUsers,
    title: 'Collaboration',
    desc: 'Working together to achieve excellence and deliver exceptional results.',
  },
  {
    Icon: IconStar,
    title: 'Excellence',
    desc: 'Delivering quality in everything we do with unwavering commitment.',
  },
];

const companyPillars = [
  {
    Icon: IconTarget,
    kicker: 'Purpose',
    title: 'Our Mission',
    desc: 'To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital economy.',
  },
  {
    Icon: IconEye,
    kicker: 'Future',
    title: 'Our Vision',
    desc: 'To be the global leader in technology consulting, creating sustainable value for clients through digital transformation and strategic innovation.',
  },
];

const aboutHighlights = [
  { Icon: IconRocket, label: 'Agile Delivery', desc: 'Ship faster with iterative sprints.' },
  { Icon: IconShield, label: 'Enterprise Grade', desc: 'Security-first architecture.' },
  { Icon: IconHeart, label: 'Client First', desc: 'Long-term partnerships, not projects.' },
];

const About = () => {
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

  const statNumberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    hover: {
      y: -6,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <main className="about-page">
      {/* Scroll Progress Bar */}
      <motion.div
        className="about-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left',
        }}
      />

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        className="about-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? 'visible' : 'hidden'}
      >
        {/* Background Layers */}
        <div className="about-header-bg" aria-hidden="true">
          <div className="about-header-bg-aurora aurora-1" />
          <div className="about-header-bg-aurora aurora-2" />
          <div className="about-header-bg-aurora aurora-3" />
          <div className="about-header-bg-grid" />
          <div className="about-header-bg-dots">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="ahd-dot"
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

        {/* Floating Decorative Icons */}
        <div className="about-floating-icons" aria-hidden="true">
          {['building', 'spark', 'rocket', 'target', 'star', 'eye'].map(
            (type, i) => (
              <motion.div
                key={i}
                className="floating-icon"
                custom={i}
                variants={floatingIconVariants}
                animate="animate"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${14 + i * 12}%`,
                }}
              >
                <FloatingIcon type={type} />
              </motion.div>
            )
          )}
        </div>

        <div className="container">
          <motion.div
            className="about-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Pre-pill */}
            <motion.div
              className="about-pre-pill-wrapper"
              variants={pageHeaderTitle}
            >
              
            </motion.div>

           <motion.div
            className="about-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              About <span className="text-gradient">Intelliodev</span>
            </h2>
            <p className="section-subtitle">
              A global technology partner building modern digital experiences.
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

      {/* ── Company Info + Mission & Vision ───────────────────────────────── */}
      <section className="about-mission">
        <div className="container">
          

          <div className="mission-grid">
            {/* Left — Company narrative */}
            <motion.div
              className="mission-content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="mission-label">Who We Are</span>
              <h2>Building the future, one solution at a time.</h2>
              <p>
                Founded in 2014, Intelliodev has grown into a trusted global
                technology consultancy. We partner with startups, enterprises,
                and everything in between — delivering web, mobile, and cloud
                solutions that scale.
              </p>
              <p>
                Our cross-functional teams combine deep engineering expertise
                with strategic product thinking, ensuring every engagement
                creates measurable business value.
              </p>

              {/* Highlights row */}
              <div className="about-highlights">
                {aboutHighlights.map((h, i) => {
                  const IconCmp = h.Icon;
                  return (
                    <motion.div
                      key={h.label}
                      className="highlight-chip"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={defaultViewport}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <span className="highlight-chip-icon">
                        <IconCmp />
                      </span>
                      <div>
                        <span className="highlight-chip-label">{h.label}</span>
                        <span className="highlight-chip-desc">{h.desc}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right — Mission / Vision cards */}
            <motion.div
              className="mission-cards"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {companyPillars.map((p, i) => {
                const IconCmp = p.Icon;
                return (
                  <motion.div
                    key={p.title}
                    className="mission-card"
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                    whileHover="hover"
                  >
                    <span className="mission-card-rail" />
                    <span className="mission-card-shine" />
                    <div className="mission-card-icon">
                      <IconCmp />
                    </div>
                    <span className="mission-card-kicker">{p.kicker}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Company Stats Bar ─────────────────────────────────────────────── */}
      <section className="about-company-stats">
        <div className="container">
          <motion.div
            className="company-stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={containerVariants}
          >
            {[
              { value: '2014', label: 'Founded', suffix: '' },
              { value: '50', label: 'Team Members', suffix: '+' },
              { value: '20', label: 'Countries Served', suffix: '+' },
              { value: '200', label: 'Projects Delivered', suffix: '+' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="company-stat"
                custom={i}
                variants={fadeUpVariants}
                whileHover={{ y: -5 }}
              >
                <h3>
                  <Counter value={`${s.value}${s.suffix}`} />
                </h3>
                <p>{s.label}</p>
                <span className="company-stat-rail" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────────── */}
      <section className="about-values">
        <div className="container">
          <motion.div
            className="about-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Our Core <span className="text-gradient">Values</span>
            </h2>
            <p className="section-subtitle">
              The principles that guide every decision we make.
            </p>
            <div className="section-divider">
              <span />
              <span />
              <span />
            </div>
          </motion.div>

          <motion.div
            className="values-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {coreValues.map((val, i) => {
              const IconCmp = val.Icon;
              return (
                <motion.div
                  key={val.title}
                  className="value-card"
                  custom={i}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <span className="value-card-rail" />
                  <span className="value-card-shine" />
                  <div className="value-icon-wrapper">
                    <IconCmp />
                  </div>
                  <h3>{val.title}</h3>
                  <p>{val.desc}</p>
                  <div className="value-progress">
                    <span />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;