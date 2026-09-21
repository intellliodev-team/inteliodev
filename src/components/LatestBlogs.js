// LatestBlogs.jsx — Modern 2025 Redesign
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SkeletonGrid } from './SkeletonLoader';
import { getImageUrl, handleImageError } from '../utils/imageUtils';
import './LatestBlogs.css';

const LatestBlogs = ({ loading, blogs }) => {
  const navigate = useNavigate();

  // ── Animation variants ────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.92,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 15,
        duration: 0.7,
      },
    },
  };

  // Read time
  const getReadTime = (content) => {
    if (!content) return '2 min read';
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  return (
    <section className="home-blogs">
      {/* ── Sophisticated Background ──────────────────────── */}
      <div className="blogs-bg-container">
        <div className="blogs-aurora blogs-aurora-1"></div>
        <div className="blogs-aurora blogs-aurora-2"></div>
        <div className="blogs-aurora blogs-aurora-3"></div>
        <div className="blogs-digital-grid"></div>
        <div className="blogs-radial-spotlight"></div>
        <div className="blogs-scanline"></div>
        <div className="blogs-particles">
          <div className="blogs-particle teal-blur-1"></div>
          <div className="blogs-particle lime-blur-2"></div>
          <div className="blogs-particle teal-blur-3"></div>
          <div className="blogs-particle lime-blur-4"></div>
          <div className="blogs-particle teal-blur-5"></div>
          <div className="blogs-particle lime-blur-6"></div>
        </div>
        <div className="blogs-gradient-overlay"></div>
      </div>

      <div className="container">
        {/* ── Section Header ──────────────────────────────── */}
        <motion.div
          className="section-header-blogs"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.7,
            type: 'spring',
            stiffness: 80,
            damping: 15,
          }}
        >
          <motion.span
            className="blogs-badge"
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="badge-pulse"></span>
            <i className="fas fa-newspaper badge-icon"></i>
            Latest Insights
            <span className="badge-shine"></span>
          </motion.span>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 40, clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)' }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: 'spring',
              stiffness: 80,
              damping: 15,
            }}
          >
            <span className="highlight-blog">Insights</span>
            <span className="amp">&amp;</span>
            <span className="highlight-blog-alt">Innovation</span>
          </motion.h2>

          <motion.div
            className="title-underline"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '120px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.6,
              duration: 0.7,
              type: 'spring',
              stiffness: 120,
            }}
          />

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Thought leadership and technical articles from our engineering team.
          </motion.p>
        </motion.div>

        {loading ? (
          <SkeletonGrid type="blog" count={3} />
        ) : (
          <motion.div
            className="blogs-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {blogs.slice(0, 3).map((blog, index) => (
              <motion.div
                key={blog._id}
                className={`blog-card card-${index % 3}`}
                variants={itemVariants}
                onClick={() => navigate(`/blogs/${blog.slug || blog._id}`)}
                style={{ cursor: 'pointer' }}
                whileHover={{
                  scale: 1.02,
                  y: -10,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    duration: 0.3,
                  },
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Card decorations */}
                <div className="blog-card-glow"></div>
                <div className="blog-card-border"></div>
                <span className="blog-card-corner blog-corner-tl"></span>
                <span className="blog-card-corner blog-corner-tr"></span>
                <span className="blog-card-corner blog-corner-bl"></span>
                <span className="blog-card-corner blog-corner-br"></span>

                {/* Image */}
                <div className="blog-image">
                  <img
                    src={getImageUrl(blog.featuredImage || blog.image)}
                    alt={blog.title}
                    onError={handleImageError}
                    loading="lazy"
                  />
                  <div className="blog-image-overlay"></div>
                  <span className="blog-image-badge">
                    <i className="fas fa-star"></i>
                    Featured
                  </span>

                  {/* Floating index number */}
                  <span className="blog-index-badge">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-category">
                      {blog.category || 'Technology'}
                    </span>
                    <span className="blog-date">
                      {new Date(
                        blog.publishedDate || blog.createdAt
                      ).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <motion.h3
                    whileHover={{
                      color: '#00C2A8',
                      x: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {blog.title}
                  </motion.h3>

                  <p>
                    {blog.excerpt ||
                      blog.description ||
                      blog.summary ||
                      'Discover insights from our latest article.'}
                  </p>

                  <div className="blog-card-footer">
                    <motion.span
                      className="read-more-label"
                      whileHover={{ gap: '14px' }}
                    >
                      Read More
                      <motion.span
                        className="read-more-arrow"
                        whileHover={{
                          x: 8,
                          scale: 1.2,
                          transition: { duration: 0.3 },
                        }}
                      >
                        &rarr;
                      </motion.span>
                    </motion.span>

                    <span className="read-time-badge">
                      <i className="fas fa-clock"></i>
                      {getReadTime(blog.content || blog.body)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── View All ────────────────────────────────────── */}
        <div className="text-center section-action">
          <motion.button
            className="view-all-btn"
            onClick={() => navigate('/blogs')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              type: 'spring',
              stiffness: 80,
              damping: 15,
            }}
            whileHover={{
              scale: 1.05,
              y: -3,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
              },
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All Articles
            <motion.span className="btn-arrow" whileHover={{ x: 8 }}>
              &rarr;
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;