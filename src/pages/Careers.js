// Careers.jsx — Intelliodev.io · Modern Burgundy + Cream
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { SkeletonGrid } from '../components/SkeletonLoader';
import {
  containerVariants,
  fadeUpVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './Careers.css';

const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

/* ── Inline SVG Icons ──────────────────────────── */
const IconRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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
const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconDollar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* ── Floating Icon ─────────────────────────────── */
const FloatingIcon = ({ type }) => {
  const icons = {
    rocket: IconRocket,
    briefcase: IconBriefcase,
    spark: IconSpark,
    target: IconTarget,
    lightbulb: IconLightbulb,
    globe: IconGlobe,
  };
  const IconCmp = icons[type] || IconSpark;
  return <IconCmp />;
};

/* ── Data ──────────────────────────────────────── */
const perksData = [
  { Icon: IconRocket, label: 'Fast Growth' },
  { Icon: IconGlobe, label: 'Remote-Friendly' },
  { Icon: IconHeart, label: 'Great Benefits' },
  { Icon: IconUsers, label: 'Strong Culture' },
];

const Careers = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });

  useEffect(() => {
    fetchJobs();
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

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/jobs`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        setJobs([]);
      } else {
        const openJobs = data.filter((job) => {
          const isActive = job.activeJob !== false;
          const isOpen =
            job.status === 'Open' ||
            job.status === undefined ||
            job.status === null;
          return isActive && isOpen;
        });
        setJobs(openJobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load job listings. Please refresh the page.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

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

  const perkVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.85 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.25 + i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const jobCardVariants = {
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
      y: -8,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  if (error) {
    return (
      <main className="careers-page">
        <div className="careers-error-container">
          <div className="careers-error-icon">
            <IconAlert />
          </div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="careers-error-btn"
          >
            Refresh Page
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="careers-page">
      {/* Scroll Progress */}
      <motion.div
        className="careers-scroll-progress"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        className="careers-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? 'visible' : 'hidden'}
      >
        <div className="careers-header-bg" aria-hidden="true">
          <div className="careers-header-bg-aurora aurora-1" />
          <div className="careers-header-bg-aurora aurora-2" />
          <div className="careers-header-bg-aurora aurora-3" />
          <div className="careers-header-bg-grid" />
          <div className="careers-header-bg-dots">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="chd-dot"
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

        <div className="careers-floating-icons" aria-hidden="true">
          {['rocket', 'briefcase', 'spark', 'target', 'lightbulb', 'globe'].map(
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
            className="careers-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="careers-pre-pill-wrapper"
              variants={pageHeaderTitle}
            >
              
            </motion.div>

            <motion.h1
              variants={pageHeaderTitle}
              className="careers-main-heading"
            >
              <span className="heading-light">
                Build Your{' '}
                {/* <span className="heading-highlight">Build Your</span>{' '} */}
                <span className="heading-gradient">Career</span>
              </span>
            </motion.h1>

            <motion.p
              variants={pageHeaderSubtitle}
              className="careers-header-subtitle"
            >
              Join a team of passionate innovators and technology leaders who
              are shaping the future of digital transformation.
            </motion.p>

            <motion.div
              className="header-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

            <motion.div className="careers-perks-bar">
              {perksData.map((perk, i) => {
                const IconCmp = perk.Icon;
                return (
                  <motion.div
                    key={perk.label}
                    className="careers-perk-item"
                    custom={i}
                    variants={perkVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -4, scale: 1.05 }}
                  >
                    <span className="perk-icon">
                      <IconCmp />
                    </span>
                    <span>{perk.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Jobs List ─────────────────────────────────────────────────────── */}
      <section className="careers-list">
        {/* Animated section background */}
        <div className="careers-list-bg" aria-hidden="true">
          <div className="clb-aurora clb-aurora-1" />
          <div className="clb-aurora clb-aurora-2" />
          <div className="clb-aurora clb-aurora-3" />
          <div className="clb-grid" />
          <div className="clb-dots">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="clb-dot"
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

        <div className="container careers-list-content">
          <motion.div
            className="careers-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            {/* <span className="section-badge">Open Positions</span>
            <h2 className="section-title">
              Find Your <span className="text-gradient">Opportunity</span>
            </h2>
            <p className="section-subtitle">
              We're looking for talented individuals who are passionate about
              technology and innovation to join our growing team.
            </p> */}
            <div className="section-divider">
              <span />
              <span />
              <span />
            </div>
          </motion.div>

          {loading ? (
            <SkeletonGrid type="career" count={3} />
          ) : jobs.length === 0 ? (
            <motion.div
              className="no-jobs"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="no-content-icon-wrap"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <IconBriefcase />
              </motion.div>
              <h3>No Open Positions</h3>
              <p>Check back later for new opportunities.</p>
            </motion.div>
          ) : (
            <motion.div
              className="jobs-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {jobs.map((job, i) => {
                const jobType = (job.type || 'Full Time')
                  .toLowerCase()
                  .replace(/\s+/g, '-');

                return (
                  <motion.article
                    key={job._id || i}
                    className="job-card"
                    custom={i}
                    variants={jobCardVariants}
                    whileHover="hover"
                    onClick={() => navigate(`/careers/${job._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="job-card-rail" aria-hidden="true" />
                    <span className="job-card-shine" aria-hidden="true" />

                    {/* Top: badge + index */}
                    <div className="job-card-top">
                      <span className={`job-type ${jobType}`}>
                        {job.type || 'Full Time'}
                      </span>
                      <span className="job-card-index" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="job-title">
                      {job.title || 'Untitled Position'}
                    </h3>

                    {/* Department chip */}
                    <div className="job-dept-row">
                      <span className="job-dept-badge">
                        {job.department || 'General'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="job-description">
                      {job.description ||
                        (job.summary
                          ? job.summary.substring(0, 130) + '...'
                          : 'No description available.')}
                    </p>

                    {/* Info grid */}
                    <div className="job-info-grid">
                      <div className="job-info-tile">
                        <span className="job-info-icon">
                          <IconMapPin />
                        </span>
                        <div className="job-info-text">
                          <span className="job-info-label">Location</span>
                          <span className="job-info-value">
                            {job.location || 'Remote'}
                          </span>
                        </div>
                      </div>
                      <div className="job-info-tile">
                        <span className="job-info-icon">
                          <IconBriefcase />
                        </span>
                        <div className="job-info-text">
                          <span className="job-info-label">Level</span>
                          <span className="job-info-value">
                            {job.experienceLevel || 'Mid-Level'}
                          </span>
                        </div>
                      </div>
                      {job.salary && (
                        <div className="job-info-tile job-info-tile-full">
                          <span className="job-info-icon">
                            <IconDollar />
                          </span>
                          <div className="job-info-text">
                            <span className="job-info-label">Salary</span>
                            <span className="job-info-value">{job.salary}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="job-footer">
                      <span className="job-posted">
                        <span className="job-posted-icon">
                          <IconCalendar />
                        </span>
                        {new Date(
                          job.postedDate || job.createdAt || Date.now()
                        ).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <motion.button
                        className="job-apply-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/careers/${job._id}`);
                        }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <span className="btn-shine" />
                        <span>Apply Now</span>
                        <span className="job-apply-arrow">
                          <IconArrow />
                        </span>
                      </motion.button>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Careers;