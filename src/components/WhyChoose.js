// WhyChoose.jsx — Intelliodev.io · Why Choose Us
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import './WhyChoose.css';

/* ── Inline SVG icons ─────────────────────────────── */
const IconCubes = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconBolt = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="8" y1="9" x2="16" y2="9" />
    <line x1="8" y1="13" x2="13" y2="13" />
  </svg>
);

const IconHeadset = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const WhyChoose = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 });
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const handleMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y - rect.height / 2) / rect.height) * 6;
    const ry = ((x - rect.width / 2) / rect.width) * 6;
    card.style.setProperty('--rx', `${rx}deg`);
    card.style.setProperty('--ry', `${ry}deg`);
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
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
    hidden: { opacity: 0, y: 30, rotateX: -22 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', stiffness: 140, damping: 15 },
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

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const whyData = [
    {
      Icon: IconCubes,
      title: 'Custom Software Engineering',
      description:
        'Purpose-built platforms, APIs, and internal tools engineered for your exact workflows — not templates. Scalable, secure, and shipped production-ready.',
    },
    {
      Icon: IconBolt,
      title: 'Rapid, Agile Delivery',
      description:
        'Two-week sprints, weekly demos, and continuous deployment. You see progress every week and can redirect priorities without friction.',
    },
    {
      Icon: IconChat,
      title: 'Direct US-Aligned Communication',
      description:
        'Work directly with senior engineers in your time zone. Daily standups, shared Slack, and full code transparency — no agency black boxes.',
    },
    {
      Icon: IconHeadset,
      title: 'Long-Term Partnership',
      description:
        'Post-launch monitoring, cloud ops, security audits, and iterative feature work. We stay accountable for outcomes, not just deliverables.',
    },
  ];

  const headlineWords = ['Why', 'teams', 'choose', 'IntellioDev'];

  return (
    <section ref={sectionRef} className="why-section" id="why-us">
      <div className="why-bg" aria-hidden="true">
        <div className="why-grid-lines" />
        <div className="why-spotlight" />
        <div className="why-orb why-orb-1" />
        <div className="why-orb why-orb-2" />
        <div className="why-orb why-orb-3" />
        <div
          className="why-mouse-glow"
          style={{
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,
          }}
        />
      </div>

      <div className="why-container">
        <motion.div
          ref={headingRef}
          className="why-header"
          initial="hidden"
          animate={isHeadingInView ? 'visible' : 'hidden'}
        >
          

          <motion.h2 className="why-title" variants={wordContainerVariants}>
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={`word ${
                  i === headlineWords.length - 1 ? 'accent' : ''
                }`}
              >
                {word}
                {i < headlineWords.length - 1 && '\u00A0'}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p className="why-subtitle" variants={subtitleVariants}>
            We combine senior US-aligned engineering, transparent communication,
            and production-grade delivery — so you get software that ships on
            time and keeps working at scale.
          </motion.p>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="why-grid"
          variants={gridVariants}
          initial="hidden"
          animate={isGridInView ? 'visible' : 'hidden'}
        >
          {whyData.map((item, index) => {
            const IconComponent = item.Icon;
            return (
              <motion.div
                key={index}
                className="why-card"
                custom={index}
                variants={cardVariants}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
              >
                <span className="card-border-ring" aria-hidden="true" />
                <span className="card-aurora" aria-hidden="true" />
                <span className="card-bar" aria-hidden="true" />
                <span className="card-spot" aria-hidden="true" />
                <span className="card-shine" aria-hidden="true" />

                <span className="card-particles" aria-hidden="true">
                  <i /><i /><i /><i /><i /><i />
                </span>

                <span className="card-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="card-corner-tl" aria-hidden="true" />
                <span className="card-corner-br" aria-hidden="true" />

                <div className="card-body">
                  <div className="card-icon-wrap">
                    <span className="card-icon-ring" aria-hidden="true" />
                    <span className="card-icon-glow" aria-hidden="true" />
                    <span className="card-icon">
                      <IconComponent />
                    </span>
                  </div>

                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="why-cta"
          variants={ctaVariants}
          initial="hidden"
          animate={isGridInView ? 'visible' : 'hidden'}
        >
          <div className="cta-inner">
            <div className="cta-text">
              <h3>Ready to build something serious?</h3>
              <p>Talk to a senior engineer — not a sales rep.</p>
            </div>

            <motion.button
              className="cta-btn"
              onClick={() => navigate('/contact')}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="btn-border-ring" aria-hidden="true" />
              <span>Book a discovery call</span>
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
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              <span className="btn-shine" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;