// Projects.jsx — Intelliodev.io · Modern Burgundy + Cream
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { renderTechBadge } from '../utils/techIconMap';
import { SkeletonGrid } from '../components/SkeletonLoader';
import {
  containerVariants,
  fadeUpVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './Projects.css';

const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

const DEFAULT_PROJECT_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23F8E8E9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="32" fill="%23990011">INTELLIODEV</text></svg>`;

/* ── Inline SVG Icons ──────────────────────────── */
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const IconMobile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconSpark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);
const IconCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const IconLaptop = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <line x1="2" y1="20" x2="22" y2="20" />
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
const IconRotate = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

const FloatingIcon = ({ type }) => {
  const icons = {
    target: IconTarget,
    code: IconCode,
    rocket: IconRocket,
    mobile: IconMobile,
    zap: IconZap,
    spark: IconSpark,
  };
  const IconCmp = icons[type] || IconSpark;
  return <IconCmp />;
};

/* ── Helpers ──────────────────────────────────── */
const getImageUrl = (imagePath) => {
  if (!imagePath) return DEFAULT_PROJECT_IMAGE;
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL.replace('/api', '')}${imagePath}`;
};

const handleImageError = (e) => {
  e.target.src = DEFAULT_PROJECT_IMAGE;
};

const getCategoryIcon = (category) => {
  const catLower = category?.toLowerCase() || '';
  if (catLower.includes('web') || catLower.includes('ecommerce'))
    return IconCart;
  if (
    catLower.includes('saas') ||
    catLower.includes('analytics') ||
    catLower.includes('dashboard')
  )
    return IconChart;
  if (catLower.includes('mobile') || catLower.includes('fitness'))
    return IconMobile;
  return IconLaptop;
};

const getProjectEntryVariant = (index) => {
  const col = index % 3;
  if (col === 0)
    return {
      hidden: { opacity: 0, x: -40, y: 20 },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { type: 'spring', stiffness: 80, damping: 14 },
      },
    };
  if (col === 1)
    return {
      hidden: { opacity: 0, y: 55, scale: 0.96 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 80, damping: 14 },
      },
    };
  return {
    hidden: { opacity: 0, x: 40, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 14 },
    },
  };
};

const filterOptions = [
  'All Projects',
  'Web Development',
  'Mobile Apps',
  'SaaS Solutions',
];

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });

  useEffect(() => {
    fetchProjects();
    window.scrollTo(0, 0);
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

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/projects`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    activeFilter === 'All Projects'
      ? projects
      : projects.filter((p) => {
          const cat = (p.category || '').toLowerCase();
          const filter = activeFilter.toLowerCase();
          if (filter.includes('web')) return cat.includes('web');
          if (filter.includes('mobile')) return cat.includes('mobile');
          if (filter.includes('saas')) return cat.includes('saas');
          return true;
        });

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

  return (
    <main className="projects-page">
      {/* Scroll Progress Bar */}
      <motion.div
        className="projects-scroll-progress"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        className="projects-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? 'visible' : 'hidden'}
      >
        {/* Background Layers */}
        <div className="projects-header-bg" aria-hidden="true">
          <div className="projects-header-bg-aurora aurora-1" />
          <div className="projects-header-bg-aurora aurora-2" />
          <div className="projects-header-bg-aurora aurora-3" />
          <div className="projects-header-bg-grid" />
          <div className="projects-header-bg-dots">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="phd-dot"
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
        <div className="projects-floating-icons" aria-hidden="true">
          {['target', 'code', 'rocket', 'mobile', 'zap', 'spark'].map(
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
            className="projects-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
           

            {/* Main Heading */}
            <motion.h1
              variants={pageHeaderTitle}
              className="projects-main-heading"
            >
             
                
              <span className="heading-gradient" style={{fontSize:50}}>Projects</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={pageHeaderSubtitle}
              className="projects-header-subtitle"
            >
              Explore our portfolio of innovative digital solutions that have
              helped businesses transform, grow, and succeed in the digital age.
            </motion.p>

            {/* Animated Gradient Line */}
            <motion.div
              className="header-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

           
          </motion.div>
        </div>
      </motion.div>

      {/* ── Projects Grid ─────────────────────────────────────────────────── */}
      <section className="projects-list">
        {/* Animated Section Background */}
        <div className="projects-list-bg" aria-hidden="true">
          <div className="plb-aurora plb-aurora-1" />
          <div className="plb-aurora plb-aurora-2" />
          <div className="plb-aurora plb-aurora-3" />
          <div className="plb-grid" />
          <div className="plb-dots">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="plb-dot"
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

        <div className="container projects-list-content">
         

          {/* Error Display */}
          {error && (
            <motion.div
              className="error-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="error-message">
                <span className="error-icon">
                  <IconAlert />
                </span>
                <h3>Failed to load projects</h3>
                <p>{error}</p>
                <button onClick={fetchProjects} className="retry-btn">
                  <span className="retry-icon">
                    <IconRotate />
                  </span>
                  Retry
                </button>
              </div>
            </motion.div>
          )}

          {loading ? (
            <SkeletonGrid type="project" count={6} />
          ) : (
            <motion.div
              className="projects-grid-full"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {filteredProjects.length === 0 && !error ? (
                <motion.p className="no-projects" variants={fadeUpVariants}>
                  No projects available yet.
                </motion.p>
              ) : (
                filteredProjects.map((project, i) => {
                  const CategoryIcon = getCategoryIcon(project.category);
                  return (
                    <motion.article
                      key={project._id || i}
                      className="project-card"
                      variants={getProjectEntryVariant(i)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.1 }}
                      onClick={() => navigate(`/projects/${project._id}`)}
                      style={{ cursor: 'pointer' }}
                      whileHover={{ y: -10 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                    >
                      <span className="project-card-rail" aria-hidden="true" />
                      <span className="project-card-shine" aria-hidden="true" />

                      <div className="project-image-container">
                        <img
                          src={getImageUrl(project.image)}
                          alt={project.title}
                          onError={handleImageError}
                          loading="lazy"
                        />
                        <span className="project-image-veil" aria-hidden="true" />

                        <div className="project-category-overlay-icon">
                          <CategoryIcon />
                        </div>
                        <div className="project-category-overlay-label">
                          {project.category || 'WEB APPLICATION'}
                        </div>

                        <span className="project-card-index" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="project-content">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>

                        <div className="project-tech-badges">
                          {project.technologies &&
                            project.technologies
                              .slice(0, 4)
                              .map((tech) => renderTechBadge(tech))}
                          {project.technologies &&
                            project.technologies.length > 4 && (
                              <span className="tech-badge more-badge">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                        </div>

                        <div className="project-card-footer">
                          <span className="view-details-label">
                            View Details
                          </span>
                          <div className="arrow-circle-button">
                            <IconArrow />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })
              )}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Projects;