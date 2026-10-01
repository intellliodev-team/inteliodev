// Header.jsx — Modern Floating Navbar · Intelliodev.io
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import logoImg from '../assets/intelidev.png';
import './Header.css';

const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

/* ── Inline SVG icons ─────────────────────────────── */
const IconCaret = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconExternal = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconCube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconImage = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const IconStar = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);

  // Fetch dropdown data
  useEffect(() => {
    const safeFetch = async (path, setter, limit) => {
      try {
        const r = await fetch(`${API_BASE_URL}/${path}`);
        if (r.ok) {
          const d = await r.json();
          setter(Array.isArray(d) ? d.slice(0, limit) : []);
        }
      } catch {
        /* silent */
      }
    };
    safeFetch('projects', setProjects, 4);
    safeFetch('blogs', setBlogs, 3);
    safeFetch('case-studies', setCaseStudies, 3);
  }, []);

  // Scroll detection
  useEffect(() => {
    const getScrollY = () =>
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const onScroll = () => setIsScrolled(getScrollY() > 20);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Reset on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenMobileAccordion(null);
    document.body.style.overflow = 'unset';
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((v) => !v);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  const handleDropdownHover = (key) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  const toggleMobileAccordion = (key) =>
    setOpenMobileAccordion((v) => (v === key ? null : key));

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  const services = servicesData || [];

  return (
    <>
      <header
        ref={headerRef}
        className={`nav-root ${isScrolled ? 'is-scrolled' : 'is-top'}`}
      >
        <div className="nav-shell">
          {/* Logo */}
          <Link
            to="/"
            className="nav-logo"
            onClick={() => setOpenDropdown(null)}
            aria-label="Intelliodev.io home"
          >
            <span className="nav-logo-ring" aria-hidden="true" />
            {!logoError ? (
              <img
                src={logoImg}
                alt="Intelliodev.io"
                className="nav-logo-img"
                onError={() => setLogoError(true)}
                draggable="false"
              />
            ) : (
              <span className="nav-logo-text">
                <span className="lt-dark">Intellio</span>
                <span className="lt-primary">dev</span>
                <span className="lt-dot">.io</span>
              </span>
            )}
          </Link>

          {/* Center Nav */}
          <ul className="nav-links desktop-only">
            <li>
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'is-active' : ''}`}
              >
                <span className="nav-link-text">Home</span>
                <span className="nav-link-sweep" aria-hidden="true" />
              </Link>
            </li>

            {/* Services */}
            <li
              className="nav-dd-wrap"
              onMouseEnter={() => handleDropdownHover('services')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`nav-link nav-dd-trigger ${
                  isActive('/services') ? 'is-active' : ''
                }`}
                onClick={(e) => e.preventDefault()}
                type="button"
              >
                <span className="nav-link-text">Services</span>
                <span className="nav-link-sweep" aria-hidden="true" />
                <span className="nav-caret">
                  <IconCaret />
                </span>
              </button>

              <AnimatePresence>
                {openDropdown === 'services' && (
                  <motion.div
                    className="nav-dd nav-dd-services"
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.97 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => handleDropdownHover('services')}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="nav-dd-head">
                      <span className="nav-dd-eyebrow">What we do</span>
                      <span className="nav-dd-count">
                        {services.length} services
                      </span>
                    </div>

                    <div className="nav-dd-grid">
                      <div className="nav-dd-services-list">
                        {services.slice(0, 6).map((s, idx) => (
                          <motion.div
                            key={s.id || s.slug || s.title}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.04, duration: 0.3 }}
                          >
                            <Link
                              to={`/services/${s.slug || ''}`}
                              className="nav-svc-item"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <span className="nav-svc-icon">
                                <IconCube />
                              </span>
                              <span className="nav-svc-body">
                                <span className="nav-svc-title">{s.title}</span>
                                <span className="nav-svc-desc">
                                  {(s.shortDescription || s.description || '')
                                    .slice(0, 50)}
                                  …
                                </span>
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        className="nav-dd-featured"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15, duration: 0.35 }}
                      >
                        <span className="nav-feat-tag">
                          <IconStar /> Featured
                        </span>
                        <h4>Custom Software</h4>
                        <p>
                          Production-grade systems engineered to scale from MVP
                          to enterprise.
                        </p>
                        <Link
                          to="/services"
                          className="nav-feat-cta"
                          onClick={() => setOpenDropdown(null)}
                        >
                          Explore all
                          <IconArrowRight />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Projects */}
            <li
              className="nav-dd-wrap"
              onMouseEnter={() => handleDropdownHover('projects')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`nav-link nav-dd-trigger ${
                  isActive('/projects') ? 'is-active' : ''
                }`}
                onClick={(e) => e.preventDefault()}
                type="button"
              >
                <span className="nav-link-text">Projects</span>
                <span className="nav-link-sweep" aria-hidden="true" />
                <span className="nav-caret">
                  <IconCaret />
                </span>
              </button>

              <AnimatePresence>
                {openDropdown === 'projects' && (
                  <motion.div
                    className="nav-dd nav-dd-projects"
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.97 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => handleDropdownHover('projects')}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="nav-dd-head">
                      <span className="nav-dd-eyebrow">Recent work</span>
                    </div>

                    <div className="nav-proj-list">
                      {projects.length > 0 ? (
                        projects.map((p, idx) => (
                          <motion.div
                            key={p._id || p.id || p.title}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                          >
                            <Link
                              to={`/projects/${p.slug || p._id || ''}`}
                              className="nav-proj-item"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <span className="nav-proj-thumb">
                                {p.image ? (
                                  <img src={p.image} alt={p.title} />
                                ) : (
                                  <IconImage />
                                )}
                              </span>
                              <span className="nav-proj-body">
                                <span className="nav-proj-title">
                                  {p.title}
                                </span>
                                <span className="nav-proj-cat">
                                  {p.category || 'Case study'}
                                </span>
                              </span>
                            </Link>
                          </motion.div>
                        ))
                      ) : (
                        <span className="nav-empty">No projects yet.</span>
                      )}
                    </div>

                    <Link
                      to="/projects"
                      className="nav-dd-foot-link"
                      onClick={() => setOpenDropdown(null)}
                    >
                      View all projects
                      <IconArrowRight />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Insights */}
            <li
              className="nav-dd-wrap"
              onMouseEnter={() => handleDropdownHover('insights')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`nav-link nav-dd-trigger ${
                  isActive('/blogs') || isActive('/case-studies')
                    ? 'is-active'
                    : ''
                }`}
                onClick={(e) => e.preventDefault()}
                type="button"
              >
                <span className="nav-link-text">Insights</span>
                <span className="nav-link-sweep" aria-hidden="true" />
                <span className="nav-caret">
                  <IconCaret />
                </span>
              </button>

              <AnimatePresence>
                {openDropdown === 'insights' && (
                  <motion.div
                    className="nav-dd nav-dd-insights"
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.97 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => handleDropdownHover('insights')}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="nav-insights-grid">
                      <div className="nav-insights-col">
                        <div className="nav-insights-head">
                          <span className="nav-insights-dot primary" />
                          Blogs
                        </div>
                        <div className="nav-insights-list">
                          {blogs.length > 0 ? (
                            blogs.map((b, idx) => (
                              <motion.div
                                key={b._id || b.id || b.title}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                              >
                                <Link
                                  to={`/blogs/${b.slug || b._id || ''}`}
                                  className="nav-insight-item"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <span className="nav-insight-title">
                                    {b.title}
                                  </span>
                                  <span className="nav-insight-desc">
                                    {(b.excerpt || b.description || '').slice(
                                      0,
                                      50
                                    )}
                                    …
                                  </span>
                                </Link>
                              </motion.div>
                            ))
                          ) : (
                            <span className="nav-empty">No articles yet.</span>
                          )}
                        </div>
                        <Link
                          to="/blogs"
                          className="nav-insights-all"
                          onClick={() => setOpenDropdown(null)}
                        >
                          All blogs
                          <IconArrowRight />
                        </Link>
                      </div>

                      <div className="nav-insights-col">
                        <div className="nav-insights-head">
                          <span className="nav-insights-dot accent" />
                          Case Studies
                        </div>
                        <div className="nav-insights-list">
                          {caseStudies.length > 0 ? (
                            caseStudies.map((c, idx) => (
                              <motion.div
                                key={c._id || c.id || c.title}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                              >
                                <Link
                                  to={`/case-studies/${c.slug || c._id || ''}`}
                                  className="nav-insight-item"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <span className="nav-insight-title">
                                    {c.title}
                                  </span>
                                  <span className="nav-insight-desc">
                                    {(c.excerpt || c.description || '').slice(
                                      0,
                                      50
                                    )}
                                    …
                                  </span>
                                </Link>
                              </motion.div>
                            ))
                          ) : (
                            <span className="nav-empty">
                              No case studies yet.
                            </span>
                          )}
                        </div>
                        <Link
                          to="/case-studies"
                          className="nav-insights-all"
                          onClick={() => setOpenDropdown(null)}
                        >
                          All case studies
                          <IconArrowRight />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link
                to="/about"
                className={`nav-link ${isActive('/about') ? 'is-active' : ''}`}
              >
                <span className="nav-link-text">About</span>
                <span className="nav-link-sweep" aria-hidden="true" />
              </Link>
            </li>

            <li>
              <Link
                to="/careers"
                className={`nav-link ${
                  isActive('/careers') ? 'is-active' : ''
                }`}
              >
                <span className="nav-link-text">Careers</span>
                <span className="nav-link-sweep" aria-hidden="true" />
              </Link>
            </li>
          </ul>

          {/* Right side */}
          <div className="nav-right">
            <motion.button
              className="nav-cta desktop-only"
              onClick={() => navigate('/contact')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              type="button"
            >
              <span className="nav-cta-border" aria-hidden="true" />
              <span className="nav-cta-dot" aria-hidden="true" />
              <span className="nav-cta-label">Contact us</span>
              <span className="nav-cta-arrow" aria-hidden="true">
                <IconArrowRight />
              </span>
              <span className="nav-cta-shine" aria-hidden="true" />
            </motion.button>

            <button
              className={`nav-burger ${isMobileMenuOpen ? 'is-open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              type="button"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="nav-mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={toggleMobileMenu}
              />
              <motion.aside
                className="nav-mobile"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="nav-mobile-head">
                  {!logoError ? (
                    <img
                      src={logoImg}
                      alt="Intelliodev.io"
                      className="nav-mobile-logo"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <span className="nav-logo-text">
                      <span className="lt-dark">Intellio</span>
                      <span className="lt-primary">dev</span>
                      <span className="lt-dot">.io</span>
                    </span>
                  )}
                  <button
                    className="nav-mobile-close"
                    onClick={toggleMobileMenu}
                    aria-label="Close menu"
                    type="button"
                  >
                    <IconClose />
                  </button>
                </div>

                <nav className="nav-mobile-links">
                  <Link to="/" onClick={toggleMobileMenu}>
                    Home
                  </Link>

                  <div className="nav-mobile-acc">
                    <button
                      className="nav-mobile-acc-head"
                      onClick={() => toggleMobileAccordion('services')}
                      type="button"
                    >
                      <span>Services</span>
                      <span
                        className={`nav-mobile-caret ${
                          openMobileAccordion === 'services' ? 'is-open' : ''
                        }`}
                      >
                        <IconCaret />
                      </span>
                    </button>
                    <AnimatePresence>
                      {openMobileAccordion === 'services' && (
                        <motion.div
                          className="nav-mobile-acc-body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link to="/services" onClick={toggleMobileMenu}>
                            All services
                          </Link>
                          {services.slice(0, 6).map((s) => (
                            <Link
                              key={s.id || s.slug || s.title}
                              to={`/services/${s.slug || ''}`}
                              onClick={toggleMobileMenu}
                            >
                              {s.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="nav-mobile-acc">
                    <button
                      className="nav-mobile-acc-head"
                      onClick={() => toggleMobileAccordion('projects')}
                      type="button"
                    >
                      <span>Projects</span>
                      <span
                        className={`nav-mobile-caret ${
                          openMobileAccordion === 'projects' ? 'is-open' : ''
                        }`}
                      >
                        <IconCaret />
                      </span>
                    </button>
                    <AnimatePresence>
                      {openMobileAccordion === 'projects' && (
                        <motion.div
                          className="nav-mobile-acc-body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link to="/projects" onClick={toggleMobileMenu}>
                            All projects
                          </Link>
                          {projects.slice(0, 4).map((p) => (
                            <Link
                              key={p._id || p.id || p.title}
                              to={`/projects/${p.slug || p._id || ''}`}
                              onClick={toggleMobileMenu}
                            >
                              {p.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="nav-mobile-acc">
                    <button
                      className="nav-mobile-acc-head"
                      onClick={() => toggleMobileAccordion('insights')}
                      type="button"
                    >
                      <span>Insights</span>
                      <span
                        className={`nav-mobile-caret ${
                          openMobileAccordion === 'insights' ? 'is-open' : ''
                        }`}
                      >
                        <IconCaret />
                      </span>
                    </button>
                    <AnimatePresence>
                      {openMobileAccordion === 'insights' && (
                        <motion.div
                          className="nav-mobile-acc-body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link to="/blogs" onClick={toggleMobileMenu}>
                            Blogs
                          </Link>
                          <Link to="/case-studies" onClick={toggleMobileMenu}>
                            Case Studies
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link to="/about" onClick={toggleMobileMenu}>
                    About
                  </Link>
                  <Link to="/careers" onClick={toggleMobileMenu}>
                    Careers
                  </Link>

                  <button
                    className="nav-cta nav-cta-mobile"
                    onClick={() => {
                      toggleMobileMenu();
                      navigate('/contact');
                    }}
                    type="button"
                  >
                    <span className="nav-cta-border" aria-hidden="true" />
                    <span className="nav-cta-dot" />
                    <span className="nav-cta-label">Contact us</span>
                    <span className="nav-cta-arrow">
                      <IconArrowRight />
                    </span>
                    <span className="nav-cta-shine" />
                  </button>
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </header>

      <div className="nav-spacer" />
    </>
  );
};

export default Header;