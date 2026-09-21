// CareerDetail.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import './CareerDetail.css';

const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

const CareerDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [activeSection, setActiveSection] = useState('description');

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  useEffect(() => {
    fetchJobDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);

      const sections = ['description', 'responsibilities', 'requirements', 'benefits'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/jobs/${slug}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error('Job opening not found');
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data || !data._id) throw new Error('Invalid job data received');
      setJob(data);
    } catch (err) {
      console.error('Error loading job details:', err);
      setError(err.message || 'Error loading job opening.');
    } finally {
      setLoading(false);
    }
  };

  const getJobBenefits = () => {
    const defaults = [
      { icon: 'fa-heart-pulse', title: 'Health & Wellness', description: 'Comprehensive health, dental, and vision insurance options for you and your family.' },
      { icon: 'fa-coins', title: 'Financial Security', description: '401(k) retirement plan with corporate matching contributions and competitive compensation.' },
      { icon: 'fa-laptop-house', title: 'Work Anywhere', description: 'Flexible remote-first work environment with home office stipends and equipment provided.' },
      { icon: 'fa-umbrella-beach', title: 'Work-Life Balance', description: 'Generous paid time off (PTO), flexible hours, and observed annual holidays.' },
      { icon: 'fa-graduation-cap', title: 'Learning & Growth', description: 'Ongoing learning budgets for professional courses, certifications, and conferences.' },
      { icon: 'fa-users', title: 'Great Culture', description: 'Collaborative team environment with regular social events and team building activities.' },
    ];

    if (job?.benefits) {
      if (typeof job.benefits === 'string') {
        const arr = job.benefits.split('\n').filter((b) => b.trim());
        return arr.map((b, i) => ({
          icon: defaults[i % defaults.length].icon,
          title: b.split(':')[0]?.trim() || `Benefit ${i + 1}`,
          description: b.split(':')[1]?.trim() || b,
        }));
      }
      if (Array.isArray(job.benefits)) {
        return job.benefits.map((b, i) => ({
          icon: defaults[i % defaults.length].icon,
          title: typeof b === 'string' ? b : b.title || `Benefit ${i + 1}`,
          description: typeof b === 'string' ? b : b.description || b,
        }));
      }
    }
    return defaults;
  };

  const getResponsibilities = () => {
    if (job?.responsibilities) {
      if (typeof job.responsibilities === 'string') return job.responsibilities.split('\n').filter((r) => r.trim());
      if (Array.isArray(job.responsibilities)) return job.responsibilities;
    }
    return [
      'Collaborate with cross-functional teams to deliver high-quality solutions.',
      'Participate in the full software development lifecycle from planning to deployment.',
      'Write clean, maintainable, and efficient code following best practices.',
      'Troubleshoot, debug, and optimize existing systems and applications.',
      'Stay current with emerging technologies and industry trends.',
    ];
  };

  const getRequirements = () => {
    if (job?.requirements) {
      if (typeof job.requirements === 'string') return job.requirements.split('\n').filter((r) => r.trim());
      if (Array.isArray(job.requirements)) return job.requirements;
    }
    return [
      "Bachelor's degree in Computer Science, Engineering, or related field.",
      '3+ years of experience in software development or related role.',
      'Strong knowledge of modern programming languages and frameworks.',
      'Excellent problem-solving and analytical skills.',
      'Strong communication and teamwork abilities.',
    ];
  };

  const jobBenefits = getJobBenefits();
  const responsibilities = getResponsibilities();
  const requirements = getRequirements();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };
  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };
  const staggerBenefits = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };
  const benefitCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };
  const listItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <i className="fas fa-spinner"></i>
        </motion.div>
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="error-container">
        <div className="error-icon-wrap">
          <i className="fas fa-triangle-exclamation"></i>
        </div>
        <h2>Error loading job opening</h2>
        <p>{error || 'The requested career opportunity could not be found.'}</p>
        <button onClick={() => navigate('/careers')} className="btn-primary">
          <i className="fas fa-arrow-left"></i>
          Back to Careers
        </button>
      </div>
    );
  }

  return (
    <main className="career-detail-page">
      {/* Scroll Progress */}
      <motion.div
        className="career-scroll-progress"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* HERO SECTION */}
      <section className="career-hero" ref={heroRef}>
        <motion.div className="career-hero-bg" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="career-hero-bg-gradient"></div>
          <div className="career-hero-grid"></div>
          <div className="career-hero-orb career-hero-orb-1"></div>
          <div className="career-hero-orb career-hero-orb-2"></div>
        </motion.div>

        <div className="container">
          <motion.div
            className="career-hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Breadcrumb */}
            <motion.div className="career-breadcrumb" variants={fadeInUp}>
              <Link to="/careers">
                <i className="fas fa-briefcase"></i>
                Careers
              </Link>
              <span className="separator">/</span>
              <span className="current">{job.title || 'Position'}</span>
            </motion.div>

            {/* Badge */}
            <motion.div className="career-badge" variants={fadeInUp}>
              <span className="badge-icon">
                <i className="fas fa-circle-check"></i>
              </span>
              <span>{job.type || 'FULL TIME'}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 className="career-main-heading" variants={fadeInUp}>
              {job.title || 'Untitled Position'}
            </motion.h1>

            {/* Meta */}
            <motion.div className="career-meta-grid" variants={staggerContainer}>
              <motion.div className="meta-item" variants={fadeInUp}>
                <span className="meta-icon-wrap">
                  <i className="fas fa-building"></i>
                </span>
                <span>{job.department || 'General'}</span>
              </motion.div>
              <motion.div className="meta-item" variants={fadeInUp}>
                <span className="meta-icon-wrap">
                  <i className="fas fa-location-dot"></i>
                </span>
                <span>{job.location || 'Remote'}</span>
              </motion.div>
              <motion.div className="meta-item" variants={fadeInUp}>
                <span className="meta-icon-wrap">
                  <i className="fas fa-user-graduate"></i>
                </span>
                <span>{job.experienceLevel || 'Mid-Level'}</span>
              </motion.div>
              {job.salary && (
                <motion.div className="meta-item" variants={fadeInUp}>
                  <span className="meta-icon-wrap">
                    <i className="fas fa-sack-dollar"></i>
                  </span>
                  <span>{job.salary}</span>
                </motion.div>
              )}
              <motion.div className="meta-item" variants={fadeInUp}>
                <span className="meta-icon-wrap">
                  <i className="fas fa-calendar-days"></i>
                </span>
                <span>
                  {new Date(job.postedDate || job.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className="career-gradient-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* ═══════ HERO ACTIONS — APPLY BUTTON ═══════ */}
            <motion.div className="career-hero-actions" variants={fadeInUp}>
              <Link to={`/careers/${slug}/apply`} className="btn-primary btn-apply">
                <i className="fas fa-paper-plane"></i>
                Apply Now
                <i className="fas fa-arrow-right btn-arrow"></i>
              </Link>
              <Link to="/careers" className="btn-secondary">
                <i className="fas fa-arrow-left"></i>
                All Positions
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="career-hero-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </section>

      {/* STICKY SECTION NAV */}
      <nav className="section-nav">
        <div className="section-nav-inner">
          {[
            { id: 'description', label: 'About', icon: 'fa-circle-info' },
            { id: 'responsibilities', label: 'Responsibilities', icon: 'fa-list-check' },
            { id: 'requirements', label: 'Requirements', icon: 'fa-clipboard-check' },
            { id: 'benefits', label: 'Benefits', icon: 'fa-gift' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`section-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
              {activeSection === item.id && (
                <motion.span
                  className="nav-active-bg"
                  layoutId="activeNavBg"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* JOB DETAILS */}
      <section className="career-details">
        <div className="container">
          <div className="career-layout">
            <motion.div
              className="career-main"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {/* Description */}
              <motion.div id="description" className="detail-block" variants={fadeInUp}>
                <div className="detail-block-inner">
                  <span className="block-label">
                    <span className="label-dot"></span>
                    About the Role
                  </span>
                  <h2>
                    <span className="heading-icon-wrap">
                      <i className="fas fa-file-lines"></i>
                    </span>
                    Role Description
                  </h2>
                  <p>{job.description || 'No description available for this position.'}</p>
                </div>
              </motion.div>

              {/* Responsibilities */}
              <motion.div id="responsibilities" className="detail-block" variants={fadeInUp}>
                <div className="detail-block-inner">
                  <span className="block-label">
                    <span className="label-dot"></span>
                    What You'll Do
                  </span>
                  <h2>
                    <span className="heading-icon-wrap">
                      <i className="fas fa-tasks"></i>
                    </span>
                    Key Responsibilities
                  </h2>
                  <ul className="detail-list">
                    {responsibilities.map((resp, index) => (
                      <motion.li
                        key={index}
                        variants={listItemVariants}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <span className="list-icon">
                          <i className="fas fa-check"></i>
                        </span>
                        <span>{resp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div id="requirements" className="detail-block" variants={fadeInUp}>
                <div className="detail-block-inner">
                  <span className="block-label">
                    <span className="label-dot"></span>
                    What You'll Need
                  </span>
                  <h2>
                    <span className="heading-icon-wrap">
                      <i className="fas fa-award"></i>
                    </span>
                    Role Requirements
                  </h2>
                  <ul className="detail-list">
                    {requirements.map((req, index) => (
                      <motion.li
                        key={index}
                        variants={listItemVariants}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <span className="list-icon">
                          <i className="fas fa-check"></i>
                        </span>
                        <span>{req}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div id="benefits" className="detail-block" variants={fadeInUp}>
                <div className="detail-block-inner">
                  <span className="block-label">
                    <span className="label-dot"></span>
                    What We Offer
                  </span>
                  <h2>
                    <span className="heading-icon-wrap">
                      <i className="fas fa-heart"></i>
                    </span>
                    Benefits & Perks
                  </h2>
                  <motion.div
                    className="benefits-grid"
                    variants={staggerBenefits}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    {jobBenefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="benefit-card"
                        variants={benefitCardVariants}
                        whileHover={{ y: -6 }}
                        onHoverStart={() => setHoveredBenefit(index)}
                        onHoverEnd={() => setHoveredBenefit(null)}
                      >
                        <motion.div
                          className="benefit-icon-wrapper"
                          animate={hoveredBenefit === index ? { scale: 1.1, rotate: -5 } : {}}
                        >
                          <i className={`fas ${benefit.icon}`}></i>
                        </motion.div>
                        <div className="benefit-content">
                          <h4>{benefit.title}</h4>
                          <p>{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* SIDEBAR */}
            <motion.aside
              className="career-sidebar"
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="sidebar-card">
                <div className="sidebar-header">
                  <motion.div
                    className="sidebar-icon"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <i className="fas fa-rocket"></i>
                  </motion.div>
                  <h3>Ready to Apply?</h3>
                </div>
                <p>
                  Submit your application today and join our team of innovators.
                  Our recruitment team will review your application within 48 hours.
                </p>

                <div className="sidebar-stats">
                  <div className="stat-item">
                    <span className="stat-number">48h</span>
                    <span className="stat-label">Response Time</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">95%</span>
                    <span className="stat-label">Interview Rate</span>
                  </div>
                </div>

                {/* ═══════ SIDEBAR APPLY BUTTON ═══════ */}
                <Link to={`/careers/${slug}/apply`} className="btn-primary sidebar-btn">
                  <i className="fas fa-paper-plane"></i>
                  Apply Now
                  <i className="fas fa-arrow-right btn-arrow"></i>
                </Link>

                <div className="sidebar-footer">
                  <span className="deadline">
                    <i className="fas fa-clock"></i>
                    {job.applicationDeadline
                      ? `Deadline: ${new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}`
                      : 'Open until filled'}
                  </span>
                </div>

                <div className="sidebar-share">
                  <span className="share-label">
                    <i className="fas fa-share-nodes"></i>
                    Share this role
                  </span>
                  <div className="share-buttons">
                    <button className="share-btn" aria-label="Share on LinkedIn">
                      <i className="fab fa-linkedin-in"></i>
                    </button>
                    <button className="share-btn" aria-label="Share on Twitter">
                      <i className="fab fa-x-twitter"></i>
                    </button>
                    <button className="share-btn" aria-label="Copy link">
                      <i className="fas fa-link"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="sidebar-card sidebar-info-card">
                <h4>
                  <i className="fas fa-circle-info"></i>
                  Quick Info
                </h4>
                <ul className="quick-info-list">
                  <li>
                    <i className="fas fa-briefcase"></i>
                    <span>Full-time position</span>
                  </li>
                  <li>
                    <i className="fas fa-globe"></i>
                    <span>Remote-friendly</span>
                  </li>
                  <li>
                    <i className="fas fa-arrow-trend-up"></i>
                    <span>Growth opportunities</span>
                  </li>
                  <li>
                    <i className="fas fa-hand-holding-heart"></i>
                    <span>Full benefits package</span>
                  </li>
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="career-cta">
        <div className="container">
          <motion.div
            className="cta-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cta-box">
              <div className="cta-content">
                <span className="cta-badge">
                  <i className="fas fa-briefcase"></i>
                  Join Our Team
                </span>
                <h2>Ready to Make an Impact?</h2>
                <p>
                  Take the next step in your career and join a team that's
                  shaping the future of technology and digital innovation.
                </p>

                {/* ═══════ CTA APPLY BUTTON ═══════ */}
                <div className="cta-actions">
                  <Link to={`/careers/${slug}/apply`} className="btn-primary cta-btn">
                    <i className="fas fa-paper-plane"></i>
                    Apply for this Role
                    <i className="fas fa-arrow-right btn-arrow"></i>
                  </Link>
                  <Link to="/careers" className="btn-secondary cta-btn-secondary">
                    <i className="fas fa-briefcase"></i>
                    Explore All Careers
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CareerDetail;