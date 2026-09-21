// CTASection.jsx — Complete Rebuild (Compact Banner · Burgundy + Cream)
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './CTASection.css';

const CTASection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const variants = {
    wrap: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      },
    },
    eyebrow: {
      hidden: { opacity: 0, y: -10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.1 },
      },
    },
    title: {
      hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, delay: 0.2 },
      },
    },
    sub: {
      hidden: { opacity: 0, y: 15 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.3 },
      },
    },
    actions: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.4 },
      },
    },
    meta: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.6, delay: 0.55 },
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="cta2-section"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Background */}
      <div className="cta2-bg" aria-hidden="true">
        <motion.div className="cta2-orb cta2-orb-1" style={{ y: y1 }} />
        <motion.div className="cta2-orb cta2-orb-2" style={{ y: y2 }} />
        <div className="cta2-grid" />
        <div className="cta2-scan" />
        <div className="cta2-dots">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="cta2-dot"
              style={{
                left: `${(i * 43) % 100}%`,
                top: `${(i * 61) % 100}%`,
                animationDelay: `${(i % 7) * 0.6}s`,
                animationDuration: `${6 + (i % 5)}s`,
                background:
                  i % 2 === 0 ? 'var(--primary)' : 'var(--primary-light)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="cta2-container">
        <motion.div
          className="cta2-wrap"
          variants={variants.wrap}
          style={{
            transform: `perspective(1200px) rotateX(${mouse.y * 0.6}deg) rotateY(${
              mouse.x * 0.6
            }deg)`,
          }}
        >
          {/* Decor */}
          <span className="cta2-border" aria-hidden="true" />
          <span className="cta2-corner cta2-tl" aria-hidden="true" />
          <span className="cta2-corner cta2-br" aria-hidden="true" />
          <span className="cta2-shine" aria-hidden="true" />

          {/* LEFT — Copy */}
          <div className="cta2-left">
            <motion.span className="cta2-eyebrow" variants={variants.eyebrow}>
              <span className="cta2-eyebrow-dot" />
              READY WHEN YOU ARE
              <span className="cta2-eyebrow-shine" />
            </motion.span>

            <motion.h2 className="cta2-title" variants={variants.title}>
              Let&apos;s ship something
              <br />
              <span className="cta2-hl">worth talking about.</span>
            </motion.h2>

            <motion.p className="cta2-sub" variants={variants.sub}>
              One 30-minute call. No pitch deck. We&apos;ll map your next
              release and tell you exactly what we&apos;d build first.
            </motion.p>

            <motion.div className="cta2-meta" variants={variants.meta}>
              <span className="cta2-meta-item">
                <span className="cta2-meta-dot" />
                30-min intro call
              </span>
              <span className="cta2-meta-item">
                <span className="cta2-meta-dot" />
                No commitment
              </span>
              <span className="cta2-meta-item">
                <span className="cta2-meta-dot" />
                Replies in 24h
              </span>
            </motion.div>
          </div>

          {/* RIGHT — Actions */}
          <motion.div className="cta2-actions" variants={variants.actions}>
            <motion.button
              className="cta2-btn cta2-btn-primary"
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="cta2-btn-label">Book the call</span>
              <motion.span
                className="cta2-btn-arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
              <span className="cta2-btn-shine" />
            </motion.button>

            <motion.button
              className="cta2-btn cta2-btn-ghost"
              onClick={() => navigate('/services')}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>See our work</span>
              <motion.span
                className="cta2-btn-arrow"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4,
                }}
              >
                →
              </motion.span>
            </motion.button>

            <div className="cta2-stats">
              <div className="cta2-stat">
                <span className="cta2-stat-num">47+</span>
                <span className="cta2-stat-lbl">Shipped</span>
              </div>
              <span className="cta2-stat-sep" />
              <div className="cta2-stat">
                <span className="cta2-stat-num">98%</span>
                <span className="cta2-stat-lbl">Retention</span>
              </div>
              <span className="cta2-stat-sep" />
              <div className="cta2-stat">
                <span className="cta2-stat-num">12y</span>
                <span className="cta2-stat-lbl">Avg. senior</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTASection;