// Footer.jsx — Intelliodev.io · Modern Burgundy + Cream
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Footer.css';
import logoImg from '../assets/inteliodev.png';

/* ── INLINE SVG ICONS ─────────────────────────────── */
const IconLocation = () => (
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
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.14c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.67.42.36.79 1.07.79 2.16v3.2c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);
const IconDribbble = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
  </svg>
);
const IconYouTube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
  </svg>
);

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.1 });

  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (isInView) setStatus('idle');
  }, [isInView]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setMessage('');
    setTimeout(() => {
      setStatus('success');
      setMessage('Subscribed — check your inbox.');
      setEmail('');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1400);
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Custom Software', path: '/services/custom-software' },
    { name: 'Web Development', path: '/services/web-development' },
    { name: 'Cloud Solutions', path: '/services/cloud-solutions' },
    { name: 'AI Solutions', path: '/services/ai-solutions' },
    { name: 'UI / UX Design', path: '/services/ui-ux-design' },
  ];

  const socialLinks = [
    { Icon: IconLinkedIn, label: 'LinkedIn', href: '#', color: '#0A66C2' },
    { Icon: IconX, label: 'X', href: '#', color: '#000000' },
    { Icon: IconGitHub, label: 'GitHub', href: '#', color: '#171515' },
    { Icon: IconDribbble, label: 'Dribbble', href: '#', color: '#EA4C89' },
    { Icon: IconYouTube, label: 'YouTube', href: '#', color: '#FF0000' },
  ];

  const contacts = [
    { Icon: IconLocation, text: 'New York · USA', href: '#' },
    { Icon: IconPhone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { Icon: IconMail, text: 'hello@intelliodev.io', href: 'mailto:hello@intelliodev.io' },
  ];

  const wrapVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const colVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 220, damping: 16 },
    },
  };

  return (
    <motion.footer
      ref={footerRef}
      className="ft-root"
      variants={wrapVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Background */}
      <div className="ft-bg" aria-hidden="true">
        <div className="ft-aurora ft-aurora-1" />
        <div className="ft-aurora ft-aurora-2" />
        <div className="ft-aurora ft-aurora-3" />
        <div className="ft-aurora ft-aurora-4" />
        <div className="ft-grid" />
        <div className="ft-vignette" />
        <div className="ft-dots">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="ft-dot"
              style={{
                left: `${(i * 43) % 100}%`,
                top: `${(i * 61) % 100}%`,
                animationDelay: `${(i % 9) * 0.7}s`,
                animationDuration: `${6 + (i % 6)}s`,
                background:
                  i % 4 === 0
                    ? 'var(--primary)'
                    : i % 4 === 1
                    ? 'var(--primary-light)'
                    : i % 4 === 2
                    ? '#D14A5C'
                    : '#E56B7A',
              }}
            />
          ))}
        </div>
      </div>

      <div className="ft-container">
        {/* Main grid */}
        <div className="ft-grid-main">
          {/* Brand column */}
          <motion.div className="ft-brand" variants={colVariants}>
            <Link to="/" className="ft-logo-row" aria-label="Intelliodev.io home">
              <span className="ft-logo-box">
                <span className="ft-logo-ring" aria-hidden="true" />
                <span className="ft-logo-orbit" aria-hidden="true" />
                <span className="ft-logo-glow" aria-hidden="true" />
                {!logoError ? (
                  <img
                    src={logoImg}
                    alt="Intelliodev.io"
                    className="ft-logo-img"
                    onError={() => setLogoError(true)}
                    draggable="false"
                  />
                ) : (
                  <span className="ft-logo-fallback-mini">ID</span>
                )}
              </span>
              <span className="ft-company-name">
                <span className="ft-company-white">Intellio</span>
                <span className="ft-company-primary">Dev</span>
              </span>
            </Link>

            <p className="ft-brand-text">
              A senior engineering studio building the unglamorous systems that
              make ambitious products actually ship — and keep shipping.
            </p>

            <div className="ft-contacts">
              {contacts.map((c, idx) => {
                const Icon = c.Icon;
                return (
                  <motion.a
                    key={c.text}
                    href={c.href}
                    className="ft-contact"
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{
                      delay: 0.3 + idx * 0.1,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ x: 6 }}
                  >
                    <span className="ft-contact-rail" aria-hidden="true" />
                    <span className="ft-contact-icon">
                      <Icon />
                    </span>
                    <span className="ft-contact-text">{c.text}</span>
                    <span className="ft-contact-shine" aria-hidden="true" />
                    <span className="ft-contact-chevron">→</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="ft-col" variants={colVariants}>
            <h4 className="ft-col-title">
              <span className="ft-col-dot" />
              Navigate
              <span className="ft-col-underline" />
            </h4>
            <ul className="ft-list">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.name}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredLink(`q-${link.name}`)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link to={link.path} className="ft-link">
                    <span className="ft-link-line" aria-hidden="true" />
                    <span className="ft-link-line second" aria-hidden="true" />
                    <span
                      className={`ft-link-text ${
                        hoveredLink === `q-${link.name}` ? 'is-active' : ''
                      }`}
                    >
                      {link.name}
                    </span>
                    <span className="ft-link-arrow">↗</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div className="ft-col" variants={colVariants}>
            <h4 className="ft-col-title">
              <span className="ft-col-dot" />
              Services
              <span className="ft-col-underline" />
            </h4>
            <ul className="ft-list">
              {serviceLinks.map((link) => (
                <motion.li
                  key={link.name}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredLink(`s-${link.name}`)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link to={link.path} className="ft-link">
                    <span className="ft-link-line" aria-hidden="true" />
                    <span className="ft-link-line second" aria-hidden="true" />
                    <span
                      className={`ft-link-text ${
                        hoveredLink === `s-${link.name}` ? 'is-active' : ''
                      }`}
                    >
                      {link.name}
                    </span>
                    <span className="ft-link-arrow">↗</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter + Social */}
          <motion.div className="ft-newsletter" variants={colVariants}>
            <h4 className="ft-col-title">
              <span className="ft-col-dot" />
              Stay in the loop
              <span className="ft-col-underline" />
            </h4>
            <p className="ft-newsletter-text">
              Monthly notes on shipping, AI tooling, and engineering culture.
            </p>

            <form className="ft-form" onSubmit={handleSubscribe}>
              <div
                className={`ft-input-wrap ${focused ? 'is-focused' : ''} ${
                  email ? 'has-value' : ''
                }`}
              >
                <span className="ft-input-icon">
                  <IconMail />
                </span>
                <input
                  type="email"
                  placeholder=" "
                  id="ft-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  required
                  disabled={status === 'loading'}
                />
                <label htmlFor="ft-email" className="ft-input-label">
                  you@company.com
                </label>
                <span className="ft-input-glow" aria-hidden="true" />
              </div>
              <motion.button
                type="submit"
                className="ft-submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="ft-submit-border" aria-hidden="true" />
                {status === 'loading' ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="ft-spinner"
                  />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
                <span className="ft-submit-shine" aria-hidden="true" />
              </motion.button>
            </form>

            <AnimatePresence>
              {message && (
                <motion.div
                  className={`ft-status ${status}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <span className="ft-status-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="ft-social-wrap">
              <span className="ft-social-label">Follow us</span>
              <div className="ft-social">
                {socialLinks.map((s) => {
                  const Icon = s.Icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="ft-social-btn"
                      variants={socialVariants}
                      onMouseEnter={() => setHoveredSocial(s.label)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      whileHover={{ y: -5, scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      style={{ '--brand': s.color }}
                    >
                      <span className="ft-social-fill" aria-hidden="true" />
                      <span className="ft-social-icon">
                        <Icon />
                      </span>
                      <span className="ft-social-ring" aria-hidden="true" />
                      <AnimatePresence>
                        {hoveredSocial === s.label && (
                          <motion.span
                            className="ft-social-tip"
                            initial={{ opacity: 0, y: 6, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.9 }}
                          >
                            {s.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div className="ft-bottom" variants={colVariants}>
          <div className="ft-bottom-left">
            <span className="ft-copy">
              © {new Date().getFullYear()} Intelliodev.io — All rights reserved.
            </span>
          </div>

          <div className="ft-bottom-center">
            <span className="ft-made">
              Built with <span className="ft-heart-wrap">
                <span className="ft-heart-pulse" aria-hidden="true" />
                <span className="ft-heart-pulse second" aria-hidden="true" />
                <span className="ft-heart">♥</span>
              </span> in New York
            </span>
          </div>

          <div className="ft-bottom-right">
            {['Privacy', 'Terms', 'Security', 'Cookies'].map((t) => (
              <motion.a
                key={t}
                href="#"
                className="ft-legal"
                whileHover={{ y: -2 }}
              >
                <span>{t}</span>
                <span className="ft-legal-underline" aria-hidden="true" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;