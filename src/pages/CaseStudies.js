// CaseStudies.jsx — Intelliodev.io · Modern Burgundy + Cream
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  containerVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './CaseStudies.css';

const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

const getMediaBaseUrl = () => API_BASE_URL.replace('/api', '');

const getMediaUrl = (path) => {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:')
  ) {
    return path;
  }
  const baseUrl = getMediaBaseUrl();
  if (path.startsWith('/')) {
    return `${baseUrl}${path}`;
  }
  return `${baseUrl}/${path}`;
};

/* ── Inline SVG Icons ──────────────────────────── */
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);
const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
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
const IconLightbulb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2v.3h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" />
  </svg>
);
const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="100%" height="100%">
    <polygon points="8 5 19 12 8 19 8 5" />
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.83z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IconFolder = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const FloatingIcon = ({ type }) => {
  const icons = {
    trophy: IconTrophy,
    chart: IconChart,
    rocket: IconRocket,
    spark: IconSpark,
    target: IconTarget,
    lightbulb: IconLightbulb,
  };
  const IconCmp = icons[type] || IconSpark;
  return <IconCmp />;
};

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });

  useEffect(() => {
    fetchCaseStudies();
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

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/case-studies`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        setCaseStudies([]);
      } else {
        setCaseStudies(data);
      }
    } catch (error) {
      console.error('Error fetching case studies:', error);
      setError('Failed to load case studies. Please refresh the page.');
      setCaseStudies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveVideoUrl(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.94 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  if (error) {
    return (
      <main className="case-studies-page">
        <div className="case-studies-error-container">
          <div className="case-studies-error-icon">
            <IconAlert />
          </div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="case-studies-error-btn"
          >
            Refresh Page
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="case-studies-page">
      <motion.div
        className="case-studies-scroll-progress"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        className="case-studies-hero"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? 'visible' : 'hidden'}
      >
        <div className="case-studies-hero-bg" aria-hidden="true">
          <div className="case-studies-hero-bg-aurora aurora-1" />
          <div className="case-studies-hero-bg-aurora aurora-2" />
          <div className="case-studies-hero-bg-aurora aurora-3" />
          <div className="case-studies-hero-bg-grid" />
          <div className="case-studies-hero-bg-dots">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="cshd-dot"
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

        <div className="case-studies-floating-icons" aria-hidden="true">
          {['trophy', 'chart', 'rocket', 'spark', 'target', 'lightbulb'].map(
            (type, i) => (
              <motion.div
                key={i}
                className="floating-icon"
                custom={i}
                variants={floatingIconVariants}
                animate="animate"
                style={{
                  left: `${10 + i * 14}%`,
                  top: `${14 + (i % 4) * 16}%`,
                }}
              >
                <FloatingIcon type={type} />
              </motion.div>
            )
          )}
        </div>

        <div className="container">
          <motion.div
            className="case-studies-hero-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="case-studies-pre-pill-wrapper"
              variants={pageHeaderTitle}
            >
             
            </motion.div>

           <motion.div
            className="case-studies-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            
            <h2 className="section-title">
              Our <span className="text-gradient">Case Studies</span>
            </h2>
            <p className="section-subtitle">
              Explore real-world examples of how we've helped businesses
              transform and achieve remarkable results.
            </p>
            
          </motion.div>

            <motion.div
              className="case-studies-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Grid Section ─────────────────────────────────────────────────── */}
      <section className="case-studies-grid-section">
        <div className="case-studies-section-bg" aria-hidden="true">
          <div className="csb-aurora csb-aurora-1" />
          <div className="csb-aurora csb-aurora-2" />
          <div className="csb-aurora csb-aurora-3" />
          <div className="csb-grid" />
          <div className="csb-dots">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="csb-dot"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 61) % 100}%`,
                  animationDelay: `${(i % 10) * 0.6}s`,
                  animationDuration: `${7 + (i % 5)}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container case-studies-grid-content">
          

          {loading ? (
            <div className="loading-container">
              <motion.div
                className="loading-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              >
                <IconSpark />
              </motion.div>
              <p>Loading case studies...</p>
            </div>
          ) : caseStudies.length === 0 ? (
            <motion.div
              className="empty-message"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.6 }}
            >
              <div className="empty-icon-wrap">
                <IconFolder />
              </div>
              <h3>No case studies available</h3>
              <p>Please check back later for our success stories.</p>
            </motion.div>
          ) : (
            <motion.div
              className="case-studies-grid-container"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {caseStudies.map((study, i) => (
                <CaseStudyCard
                  key={study._id || i}
                  study={study}
                  index={i}
                  variants={cardVariants}
                  getMediaUrl={getMediaUrl}
                  onPlay={() =>
                    setActiveVideoUrl(getMediaUrl(study.video))
                  }
                  onClickDetails={() =>
                    navigate(`/case-studies/${study.slug || study._id}`)
                  }
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────────────── */}
      <section className="case-studies-cta">
        <div className="container">
          <motion.div
            className="cta-wrapper"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="cta-box"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="cta-box-bg" aria-hidden="true">
                <div className="cta-box-aurora cta-aurora-1" />
                <div className="cta-box-aurora cta-aurora-2" />
                <div className="cta-box-grid" />
                <div className="cta-box-dots">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={i}
                      className="cta-box-dot"
                      style={{
                        left: `${(i * 41) % 100}%`,
                        top: `${(i * 57) % 100}%`,
                        animationDelay: `${(i % 6) * 0.7}s`,
                        animationDuration: `${6 + (i % 4)}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <span className="cta-box-rail" aria-hidden="true" />
              <span className="cta-box-shine" aria-hidden="true" />

              <div className="cta-box-content">
                <span className="cta-badge">Ready to Start?</span>
                <h2>Ready to Write Your Success Story?</h2>
                <p>
                  Let's collaborate to build something exceptional that
                  elevates your business and drives measurable results.
                </p>
                <motion.button
                  onClick={() => navigate('/contact')}
                  className="cta-btn"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="btn-shine" />
                  <span className="cta-btn-icon">
                    <IconRocket />
                  </span>
                  <span>Let's Talk</span>
                  <span className="cta-btn-arrow">
                    <IconArrow />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Video Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            className="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoUrl(null)}
          >
            <motion.div
              className="video-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="video-modal-close"
                onClick={() => setActiveVideoUrl(null)}
                aria-label="Close"
              >
                <IconClose />
              </button>
              <video
                src={activeVideoUrl}
                controls
                autoPlay
                className="modal-video-element"
                onError={() => setActiveVideoUrl(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   CASE STUDY CARD
   ══════════════════════════════════════════════════════════════════════════ */
const CaseStudyCard = ({
  study,
  index,
  variants,
  getMediaUrl,
  onPlay,
  onClickDetails,
}) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && study.video && !videoError) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setVideoError(true));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) videoRef.current.pause();
  };

  const videoUrl = getMediaUrl(study.video);

  return (
    <motion.article
      className="case-study-card"
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: false, amount: 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClickDetails}
      style={{ cursor: 'pointer' }}
    >
      <span className="case-study-card-rail" aria-hidden="true" />
      <span className="case-study-card-shine" aria-hidden="true" />

      <div className="case-study-media-wrapper">
        {videoUrl && !videoError ? (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="case-study-video-preview"
            onError={() => setVideoError(true)}
          />
        ) : (
          <div className="case-study-placeholder">
            <span className="placeholder-icon">
              <IconPlay />
            </span>
            <span>Video Preview</span>
          </div>
        )}

        <span className="video-overlay-gradient" aria-hidden="true" />

        <div className="industry-badge-pill">
          <span className="industry-badge-icon">
            <IconTag />
          </span>
          {study.industry || 'Technology'}
        </div>

        <span className="case-study-card-index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div
          className="play-button-overlay-container"
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
        >
          <motion.div
            className="play-button-pulse-ring"
            animate={
              isHovered
                ? { scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }
                : {}
            }
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
          <motion.button
            className="play-button-circle"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            aria-label="Play video"
          >
            <span className="play-icon">
              <IconPlay />
            </span>
          </motion.button>
        </div>
      </div>

      <div className="case-study-body">
        <h3 className="case-study-title">
          {study.title || 'Case Study'}
        </h3>
        <p className="case-study-desc">
          {study.description ||
            'Learn how we helped this client achieve remarkable results.'}
        </p>

        <div className="case-study-footer">
          <span className="case-study-meta">
            <span className="case-study-meta-icon">
              <IconCalendar />
            </span>
            {study.completionDate
              ? new Date(study.completionDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })
              : 'Recent'}
          </span>
          <button
            className="watch-case-study-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClickDetails();
            }}
          >
            <span>View Study</span>
            <span className="watch-case-study-arrow">
              <IconArrow />
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default CaseStudies;