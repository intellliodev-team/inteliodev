// Blogs.jsx — Intelliodev.io · Modern Burgundy + Cream
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
import './Blogs.css';

const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

const DEFAULT_BLOG_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%23F8E8E9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="32" fill="%23990011">INTELLIODEV</text></svg>`;

/* ── Inline SVG Icons ──────────────────────────── */
const IconSpark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);
const IconPen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);
const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
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
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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

const FloatingIcon = ({ type }) => {
  const icons = {
    pen: IconPen,
    book: IconBook,
    lightbulb: IconLightbulb,
    target: IconTarget,
    spark: IconSpark,
  };
  const IconCmp = icons[type] || IconSpark;
  return <IconCmp />;
};

/* ── Image helpers ─────────────────────────────── */
const getImageUrl = (imagePath) => {
  if (!imagePath) return DEFAULT_BLOG_IMAGE;
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('data:')
  ) {
    return imagePath;
  }
  if (imagePath.startsWith('/uploads')) {
    const baseUrl = API_BASE_URL.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  }
  return DEFAULT_BLOG_IMAGE;
};

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = DEFAULT_BLOG_IMAGE;
};

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All Posts');

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });

  const filters = ['All Posts', 'Technology', 'Business', 'Innovation'];

  useEffect(() => {
    fetchBlogs();
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

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/blogs`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        setBlogs([]);
      } else {
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blog posts. Please refresh the page.');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs =
    activeFilter === 'All Posts'
      ? blogs
      : blogs.filter(
          (b) =>
            (b.category || '').toLowerCase() === activeFilter.toLowerCase()
        );

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

  const blogCardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -8, scale: 0.92 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    hover: {
      y: -14,
      scale: 1.025,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const imageRevealVariants = {
    hidden: { scale: 1.3, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (error) {
    return (
      <main className="blogs-page">
        <div className="blogs-error-container">
          <div className="blogs-error-icon">
            <IconAlert />
          </div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="blogs-error-btn"
          >
            Refresh Page
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="blogs-page">
      <motion.div
        className="blogs-scroll-progress"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: 'left',
        }}
      />

      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        className="blogs-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? 'visible' : 'hidden'}
      >
        <div className="blogs-header-bg" aria-hidden="true">
          <div className="blogs-header-bg-aurora aurora-1" />
          <div className="blogs-header-bg-aurora aurora-2" />
          <div className="blogs-header-bg-aurora aurora-3" />
          <div className="blogs-header-bg-grid" />
          <div className="blogs-header-bg-dots">
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                className="bhd-dot"
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

        <div className="blogs-floating-icons" aria-hidden="true">
          {['pen', 'book', 'lightbulb', 'target', 'spark'].map((type, i) => (
            <motion.div
              key={i}
              className="floating-icon"
              custom={i}
              variants={floatingIconVariants}
              animate="animate"
              style={{
                left: `${10 + i * 15}%`,
                top: `${14 + (i % 4) * 16}%`,
              }}
            >
              <FloatingIcon type={type} />
            </motion.div>
          ))}
        </div>

        <div className="container">
          <motion.div
            className="blogs-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="blogs-pre-pill-wrapper"
              variants={pageHeaderTitle}
            >
              
            </motion.div>

            <motion.h1
              variants={pageHeaderTitle}
              className="blogs-main-heading"
            >
              <span className="heading-light">
                Latest {' '}
                <span className="heading-gradient">Blogs</span>
              </span>
              
            </motion.h1>

            <motion.p
              variants={pageHeaderSubtitle}
              className="blogs-header-subtitle"
            >
              Explore expert insights, industry trends, and innovative ideas
              from our team of technology and digital consulting professionals.
            </motion.p>

            <motion.div
              className="header-gradient-line"
              variants={gradientLineVariants}
              animate="animate"
            />

            <motion.div className="blogs-filter-group" variants={fadeUpVariants}>
              {filters.map((f) => (
                <motion.button
                  key={f}
                  className={`filter-btn ${
                    activeFilter === f ? 'active' : ''
                  }`}
                  onClick={() => setActiveFilter(f)}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {f}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Blog Grid ────────────────────────────────────────────────────── */}
      <section className="blogs-list">
        <div className="container">
          <motion.div
            className="blogs-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            {/* <span className="section-badge">Latest Insights</span>
            <h2 className="section-title">
              Featured <span className="text-gradient">Stories</span>
            </h2>
            <p className="section-subtitle">
              Discover our latest insights, thought leadership, and expert
              perspectives on technology and business innovation.
            </p> */}
            <div className="section-divider">
              <span />
              <span />
              <span />
            </div>
          </motion.div>

          {loading ? (
            <SkeletonGrid type="blog" count={6} />
          ) : filteredBlogs.length === 0 ? (
            <motion.div
              className="no-blogs"
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
                <IconPen />
              </motion.div>
              <h3>No Blog Posts Yet</h3>
              <p>Check back soon for new content.</p>
            </motion.div>
          ) : (
            <motion.div
              className="blogs-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {filteredBlogs.map((blog, i) => {
                const imageUrl = getImageUrl(
                  blog.featuredImage || blog.image
                );

                return (
                  <motion.article
                    key={blog._id || i}
                    className="blog-card"
                    custom={i}
                    variants={blogCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: false, amount: 0.1 }}
                    onClick={() =>
                      navigate(`/blogs/${blog.slug || blog._id}`)
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Corner accent */}
                    <span className="blog-card-corner" aria-hidden="true" />

                    {/* Floating number badge */}
                    <span className="blog-card-index" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* ── Image block ── */}
                    <div className="blog-card-image">
                      <motion.img
                        src={imageUrl}
                        alt={blog.title || 'Blog post'}
                        onError={handleImageError}
                        loading="lazy"
                        variants={imageRevealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                      />

                      <span
                        className="blog-card-image-veil"
                        aria-hidden="true"
                      />

                      {/* Read time chip — bottom-left corner of image */}
                      <span className="blog-image-readtime">
                        <span className="blog-image-readtime-icon">
                          <IconClock />
                        </span>
                        {blog.readTime || '5 min read'}
                      </span>

                      {/* Arrow button — bottom-right corner of image */}
                      <span className="blog-image-arrow" aria-hidden="true">
                        <IconArrow />
                      </span>
                    </div>

                    {/* ── Body ── */}
                    <div className="blog-content">
                      {/* Category tag + date row */}
                      <div className="blog-tag-row">
                        <motion.span
                          className="blog-category"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25, duration: 0.4 }}
                          viewport={{ once: false }}
                        >
                          {blog.category || 'Technology'}
                        </motion.span>
                        <span className="blog-date">
                          <span className="blog-meta-icon">
                            <IconCalendar />
                          </span>
                          {new Date(
                            blog.publishedDate || blog.createdAt
                          ).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="blog-title">
                        {blog.title || 'Untitled Post'}
                      </h3>

                      {/* Excerpt */}
                      <p className="blog-excerpt">
                        {blog.excerpt ||
                          (blog.description
                            ? blog.description.substring(0, 130) + '...'
                            : 'No description available.')}
                      </p>

                      {/* Author row */}
                      <div className="blog-author-row">
                        <span className="blog-author-avatar">
                          <IconUser />
                        </span>
                        <span className="blog-author-name">
                          {blog.author || 'Intelliodev Team'}
                        </span>
                      </div>
                    </div>

                    {/* Bottom animated underline */}
                    <span className="blog-card-underline" aria-hidden="true" />
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

export default Blogs;