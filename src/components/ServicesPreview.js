// ServicesPreview.jsx — Intelliodev.io · Services (Modern Burgundy & Cream)
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import ServiceCard from './ServiceCard';
import './styles/ServicesPreview.css';

const ServicesPreview = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 });
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

  const featuredSlugs = [
    'saas-product-development',
    'custom-software-development',
    'ai-engineered-marketing',
  ];
  const featuredServices = featuredSlugs
    .map((slug) => servicesData.find((s) => s.slug === slug))
    .filter(Boolean);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const eyebrowVariants = {
    hidden: { opacity: 0, y: -14, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const wordContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -25 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', stiffness: 150, damping: 14 },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={sectionRef} className="services-preview" id="services">
      {/* Top animated beam */}
      <span className="sp-beam-top" aria-hidden="true" />

      {/* Background layers */}
      <div className="services-bg" aria-hidden="true">
        <div className="services-grid-lines" />
        <div className="services-spotlight" />
        <div className="services-orb services-orb-1" />
        <div className="services-orb services-orb-2" />
        <div className="services-orb services-orb-3" />
      </div>

      {/* Floating decorative dots */}
      <span className="sp-float-dot sp-dot-1" aria-hidden="true" />
      <span className="sp-float-dot sp-dot-2" aria-hidden="true" />
      <span className="sp-float-dot sp-dot-3" aria-hidden="true" />

      <div className="services-container">
        {/* Header */}
        <motion.div
          ref={headingRef}
          className="services-header"
          initial="hidden"
          animate={isHeadingInView ? 'visible' : 'hidden'}
        >
          

          <motion.h2 className="services-title" variants={wordContainerVariants}>
            <span className="line">
              <motion.span variants={wordVariants} className="word">
                Engineering
              </motion.span>{' '}
              <motion.span variants={wordVariants} className="word accent">
                the systems
              </motion.span>
            </span>
            <span className="line">
              <motion.span variants={wordVariants} className="word">
                that power
              </motion.span>{' '}
              <motion.span variants={wordVariants} className="word accent-light">
                modern business.
              </motion.span>
            </span>
          </motion.h2>

          <motion.p className="services-subtitle" variants={subtitleVariants}>
            From SaaS platforms and custom software to AI-driven marketing —
            we ship production-grade systems built for US-scale reliability,
            compliance, and speed.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={gridRef}
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isGridInView ? 'visible' : 'hidden'}
        >
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.slug}
              custom={index}
              variants={cardVariants}
              className="service-card-wrapper"
            >
              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="services-action"
          variants={buttonVariants}
          initial="hidden"
          animate={isGridInView ? 'visible' : 'hidden'}
        >
          <motion.button
            className="view-all-btn"
            onClick={() => navigate('/services')}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="btn-border-ring" aria-hidden="true" />
            <span className="btn-glow" aria-hidden="true" />
            <span className="btn-label" style={{color:'#990011'}}>View All Services</span>
            <span className="btn-arrow">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{color:'#990011'}}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            <span className="btn-shine" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;