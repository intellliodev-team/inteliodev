// Contact.jsx — Intelliodev.io · Modern Burgundy + Cream
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  fadeUpVariants,
  pageHeaderVariants,
  pageHeaderTitle,
  pageHeaderSubtitle,
  defaultViewport,
} from '../utils/animationVariants';
import './Contact.css';

const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

/* ── Inline SVG Icons ──────────────────────────── */
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconSpinner = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" width="100%" height="100%">
    <path d="M21 12a9 9 0 1 1-6.2-8.6" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.83z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IconMessage = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* Floating hero icon */
const FloatingHeroIcon = ({ type }) => {
  const common = {
    width: 34,
    height: 34,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  if (type === 'phone')
    return (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  if (type === 'mail')
    return (
      <svg {...common}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    );
  if (type === 'pin')
    return (
      <svg {...common}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  if (type === 'chat')
    return (
      <svg {...common}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  if (type === 'handshake')
    return (
      <svg {...common}>
        <path d="M11 17l-5-5a2 2 0 1 1 3-3l1 1 3-3 3 3 1-1a2 2 0 1 1 3 3l-5 5-2-2-2 2z" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2" />
    </svg>
  );
};

const contactInfoItems = [
  { Icon: IconPin, label: 'Address', key: 'address', accent: 'Locate us' },
  { Icon: IconPhone, label: 'Phone', key: 'phone', accent: 'Call us' },
  { Icon: IconMail, label: 'Email', key: 'email', accent: 'Email us' },
  { Icon: IconClock, label: 'Hours', key: 'hours', accent: 'Open' },
];

const Contact = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const headerRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.05 });
  const isFormInView = useInView(formRef, { once: false, amount: 0.1 });
  const isMapInView = useInView(mapRef, { once: false, amount: 0.1 });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/settings/public`);
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  }, []);

  useEffect(() => {
    const jobParam = searchParams.get('job');
    if (jobParam) {
      setFormData((prev) => ({
        ...prev,
        subject: `Application for: ${jobParam}`,
        message: `Dear Hiring Team,\n\nI am writing to express my interest in the "${jobParam}" position. Please find my details attached below.\n\nBest regards,\n`,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => navigate('/'), 3000);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMapSrc = () => {
    if (settings?.googleMapsUrl) {
      if (
        settings.googleMapsUrl.includes('/embed') ||
        settings.googleMapsUrl.includes('embed?pb=')
      ) {
        return settings.googleMapsUrl;
      }
      return `https://maps.google.com/maps?q=${encodeURIComponent(
        settings.googleMapsUrl
      )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }
    if (settings) {
      const query = `${settings.address}, ${settings.city}, ${settings.state}, ${settings.country}`;
      return `https://maps.google.com/maps?q=${encodeURIComponent(
        query
      )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }
    return 'https://maps.google.com/maps?q=Times+Square,New+York,NY,USA&t=&z=13&ie=UTF8&iwloc=&output=embed';
  };

  /* Variants */
  const headerContentVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.12 },
    },
  };

  const floatingIconVariants = {
    animate: (i) => ({
      y: [0, -16 - i * 4, 0],
      x: [0, i % 2 === 0 ? 12 : -12, 0],
      rotate: [0, i * 5, 0],
      transition: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 },
    }),
  };

  const statNumberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] } },
  };

  const formInputVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const infoCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const mapVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <main className="contact-page">
      {/* Scroll Progress */}
      <motion.div
        className="contact-scroll-progress"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* ── Header ────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        className="contact-page-header"
        variants={pageHeaderVariants}
        initial="hidden"
        animate={isHeaderInView ? 'visible' : 'hidden'}
      >
        <div className="contact-header-bg" aria-hidden="true">
          <div className="contact-header-bg-aurora aurora-1" />
          <div className="contact-header-bg-aurora aurora-2" />
          <div className="contact-header-bg-aurora aurora-3" />
          <div className="contact-header-bg-grid" />
          <div className="contact-header-bg-dots">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="chd-dot"
                style={{
                  left: `${(i * 41) % 100}%`,
                  top: `${(i * 57) % 100}%`,
                  animationDelay: `${(i % 8) * 0.7}s`,
                  animationDuration: `${6 + (i % 5)}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="contact-floating-icons" aria-hidden="true">
          {['phone', 'mail', 'pin', 'chat', 'handshake', 'sparkle'].map((type, i) => (
            <motion.div
              key={i}
              className="floating-icon"
              custom={i}
              variants={floatingIconVariants}
              animate="animate"
              style={{ left: `${10 + i * 15}%`, top: `${14 + i * 12}%` }}
            >
              <FloatingHeroIcon type={type} />
            </motion.div>
          ))}
        </div>

        <div className="container">
          <motion.div
            className="contact-header-content"
            variants={headerContentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={pageHeaderTitle} className="contact-main-heading">
              <span className="heading-light">
                Let&apos;s <span className="heading-highlight">Connect</span> <span className="heading-gradient">With Us</span>
              </span>
            </motion.h1>

            <motion.p variants={pageHeaderSubtitle} className="contact-header-subtitle">
              Have a project in mind? Reach out and let&apos;s start a
              conversation — our team responds within hours.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Contact Section ───────────────────────── */}
      <section className="contact-section">
        <div className="container">
          <motion.div
            className="contact-section-header"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            {/* <h2 className="section-title">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="section-subtitle">
              We&apos;re here to help you with your digital transformation journey.
            </p>
            <div className="section-divider">
              <span /><span /><span />
            </div> */}
          </motion.div>

          {/* Info cards */}
          <motion.div
            className="contact-info-cards"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
          >
            {contactInfoItems.map((item, index) => {
              const IconCmp = item.Icon;
              return (
                <motion.div
                  key={item.key}
                  className="info-card"
                  custom={index}
                  variants={infoCardVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <span className="info-card-rail" />
                  <span className="info-card-shine" />
                  <div className="info-card-top">
                    <span className="info-card-icon">
                      <IconCmp />
                    </span>
                    <span className="info-card-badge">{item.accent}</span>
                  </div>
                  <span className="info-card-label">{item.label}</span>
                  <div className="info-card-value">
                    {item.key === 'address' ? (
                      settings ? (
                        <>
                          {settings.address}
                          <br />
                          {settings.city}, {settings.state} {settings.postalCode}
                          <br />
                          {settings.country}
                        </>
                      ) : (
                        'New York, USA'
                      )
                    ) : item.key === 'phone' ? (
                      <a href={`tel:${settings ? settings.phone : '+15551234567'}`}>
                        {settings ? settings.phone : '+1 (555) 123-4567'}
                      </a>
                    ) : item.key === 'email' ? (
                      <a href={`mailto:${settings ? settings.email : 'hello@intelliodev.io'}`}>
                        {settings ? settings.email : 'hello@intelliodev.io'}
                      </a>
                    ) : (
                      'Mon–Fri · 9AM – 6PM'
                    )}
                  </div>
                  <span className="info-card-arrow">
                    <IconArrow />
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.div
            ref={formRef}
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.65 }}
          >
            <div className="contact-form-side">
              <span className="contact-form-side-kicker">Direct line</span>
              <h3>Send us a message</h3>
              <p>
                Tell us about your project, timeline, and goals. Our senior team
                will get back within a few hours.
              </p>
              <ul className="contact-form-points">
                <li><span className="cfp-dot" />Senior engineer replies</li>
                <li><span className="cfp-dot" />No sales pitch</li>
                <li><span className="cfp-dot" />NDA on request</li>
              </ul>
            </div>

            <div className="contact-form-main">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    className="success-message"
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="success-icon-ring">
                      <span className="success-ring-pulse" />
                      <IconCheck />
                    </div>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We&apos;ll get back soon.</p>
                    <div className="success-redirect">
                      <span>Redirecting to home…</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          className="error-message"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <span className="em-icon"><IconAlert /></span> {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="form-row">
                      <motion.div className="form-group" custom={0} variants={formInputVariants} initial="hidden" animate="visible">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder=" "
                        />
                        <label htmlFor="name">Full Name *</label>
                        <span className="input-icon"><IconUser /></span>
                        <span className="input-glow" />
                      </motion.div>
                      <motion.div className="form-group" custom={1} variants={formInputVariants} initial="hidden" animate="visible">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder=" "
                        />
                        <label htmlFor="email">Email Address *</label>
                        <span className="input-icon"><IconMail /></span>
                        <span className="input-glow" />
                      </motion.div>
                    </div>

                    <div className="form-row">
                      <motion.div className="form-group" custom={2} variants={formInputVariants} initial="hidden" animate="visible">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder=" "
                        />
                        <label htmlFor="phone">Phone Number</label>
                        <span className="input-icon"><IconPhone /></span>
                        <span className="input-glow" />
                      </motion.div>
                      <motion.div className="form-group" custom={3} variants={formInputVariants} initial="hidden" animate="visible">
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder=" "
                        />
                        <label htmlFor="subject">Subject *</label>
                        <span className="input-icon"><IconTag /></span>
                        <span className="input-glow" />
                      </motion.div>
                    </div>

                    <motion.div className="form-group full" custom={4} variants={formInputVariants} initial="hidden" animate="visible">
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder=" "
                      />
                      <label htmlFor="message">Tell us about your project *</label>
                      <span className="input-icon"><IconMessage /></span>
                      <span className="input-glow" />
                    </motion.div>

                    <motion.button
                      type="submit"
                      className="contact-submit-btn"
                      disabled={loading}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="btn-shine" />
                      {loading ? (
                        <>
                          <span className="btn-spinner"><IconSpinner /></span>
                          Sending…
                        </>
                      ) : (
                        <>
                          <span className="btn-icon"><IconSend /></span>
                          Send Message
                          <span className="btn-arrow"><IconArrow /></span>
                        </>
                      )}
                    </motion.button>

                    <div className="form-footer">
                      <p>
                        <span className="ff-icon"><IconLock /></span>
                        Your information is secure with us
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            ref={mapRef}
            className="contact-map-section"
            variants={mapVariants}
            initial="hidden"
            animate={isMapInView ? 'visible' : 'hidden'}
          >
            <div className="contact-map-header">
              <span className="contact-map-label">Our Location</span>
              <h2>Visit Our Company</h2>
            </div>
            <div className="map-frame">
              <div className="map-topbar">
                <span className="map-dot red" />
                <span className="map-dot yellow" />
                <span className="map-dot green" />
                <span className="map-url">https://maps.google.com/intelliodev</span>
              </div>
              <motion.div
                className="map-container"
                whileHover={{ scale: 1.005 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <iframe
                  title="Office Map"
                  src={getMapSrc()}
                  width="100%"
                  height="420"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
              <div className="map-overlay">
                <span className="map-overlay-dot" />
                <div>
                  <span className="map-overlay-label">Headquarters</span>
                  <span className="map-overlay-text">
                    {settings
                      ? `${settings.city || 'New York'}, ${settings.country || 'USA'}`
                      : 'New York, USA'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;