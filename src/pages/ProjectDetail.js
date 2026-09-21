// ProjectDetail.jsx — Intelliodev.io · Modern Burgundy + Cream
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { renderTechBadge } from '../utils/techIconMap';
import './ProjectDetail.css';

const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

const DEFAULT_PROJECT_IMAGE =
  'data:image/svg+xml;utf8,' +
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">' +
  '<rect width="1200" height="800" fill="%23F8E8E9"/>' +
  '<rect x="80" y="90" width="1040" height="620" rx="28" fill="%23FFFFFF" stroke="%23990011" stroke-opacity="0.15"/>' +
  '<text x="600" y="400" text-anchor="middle" font-family="Arial,sans-serif" font-size="48" font-weight="700" fill="%23990011">PROJECT PREVIEW</text>' +
  '</svg>';

/* ── Inline SVG Icons ──────────────────────────── */
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconExternalLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
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
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconGraduation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const IconBuilding = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M12 6h.01M12 10h.01M12 14h.01" />
  </svg>
);
const IconDesktop = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
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
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const IconFile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const IconSparkles = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconTrend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconImages = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const getImageUrl = (imagePath) => {
  if (!imagePath) return DEFAULT_PROJECT_IMAGE;
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('data:')
  )
    return imagePath;
  if (imagePath.includes('res.cloudinary.com')) {
    return imagePath.startsWith('//') ? `https:${imagePath}` : imagePath;
  }
  const baseUrl = API_BASE_URL.replace('/api', '');
  if (imagePath.startsWith('/uploads')) return `${baseUrl}${imagePath}`;
  return `${baseUrl}/${imagePath.replace(/^\/+/, '')}`;
};

const handleImageError = (event) => {
  if (!event?.currentTarget) return;
  event.currentTarget.onerror = null;
  event.currentTarget.src = DEFAULT_PROJECT_IMAGE;
};

const safeArray = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);

const getGallery = (project) => {
  const sources = [
    project?.gallery,
    project?.images,
    project?.screenshots,
    project?.projectImages,
  ];
  for (const source of sources) {
    const items = safeArray(source);
    if (items.length) {
      return items
        .map((item) => {
          if (typeof item === 'string') return item;
          return item?.url || item?.image || item?.src || item?.path || '';
        })
        .filter(Boolean);
    }
  }
  return project?.image ? [project.image] : [];
};

const getFeatureList = (project) => {
  const features = safeArray(project?.features || project?.keyFeatures);
  return features.map((feature, index) => {
    if (typeof feature === 'string') {
      return {
        title: feature,
        description: 'A core feature designed around the needs of real users.',
      };
    }
    return {
      title: feature?.title || feature?.name || `Feature ${index + 1}`,
      description:
        feature?.description ||
        feature?.desc ||
        'A core feature designed around the needs of real users.',
    };
  });
};

const getMetricList = (project) => {
  const metrics = safeArray(
    project?.metrics || project?.stats || project?.resultsStats
  );
  return metrics
    .map((metric) => {
      if (typeof metric === 'string') return { value: metric, label: '' };
      return {
        value: metric?.value || metric?.number || metric?.stat || '',
        label: metric?.label || metric?.title || metric?.name || '',
      };
    })
    .filter((metric) => metric.value || metric.label)
    .slice(0, 4);
};

const getServices = (project) => {
  const services = safeArray(project?.services || project?.servicesProvided);
  return services.length
    ? services
    : ['UI/UX Design', 'Development', 'Testing', 'Deployment', 'Maintenance'];
};

const getPlatforms = (project) => {
  const platforms = safeArray(project?.platforms || project?.platform);
  if (platforms.length) return platforms.join(', ');
  return project?.type || project?.projectType || 'Web Application';
};

const formatDate = (value) => {
  if (!value) return 'Ongoing';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`${API_BASE_URL}/projects`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        const projects = Array.isArray(data)
          ? data
          : Array.isArray(data?.projects)
          ? data.projects
          : [];

        const foundProject = projects.find(
          (item) => item?._id === slug || item?.slug === slug
        );
        if (!foundProject) throw new Error('Project not found');

        if (cancelled) return;
        setProject(foundProject);

        const related = projects
          .filter(
            (item) =>
              item?._id !== foundProject?._id &&
              item?.slug !== foundProject?.slug &&
              (!foundProject?.category ||
                item?.category === foundProject?.category)
          )
          .slice(0, 3);
        setRelatedProjects(related);
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading project details:', err);
          setError(err?.message || 'Error loading project.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProjectDetails();
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const gallery = useMemo(() => getGallery(project), [project]);
  const features = useMemo(() => getFeatureList(project), [project]);
  const metrics = useMemo(() => getMetricList(project), [project]);
  const services = useMemo(() => getServices(project), [project]);

  const technologies = safeArray(project?.technologies);

  const overviewText =
    project?.overview ||
    project?.description ||
    'A thoughtfully designed digital product built to solve real business needs and deliver a smooth user experience.';

  const challengeText =
    project?.challenge ||
    'Users needed a simpler and more unified way to access the most important services and information without switching between multiple platforms.';

  const solutionText =
    project?.solution ||
    'We designed and developed a clean, scalable and user-friendly platform that brings the core experience into one connected digital product.';

  const resultsText =
    project?.results ||
    'The final product delivers a faster, clearer and more engaging experience with a scalable foundation for future growth.';

  if (loading) {
    return (
      <div className="project-state-screen">
        <div className="project-loader" />
        <p>Loading project details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-state-screen project-error-screen">
        <div className="state-icon">
          <IconAlert />
        </div>
        <h2>Project not found</h2>
        <p>{error || 'The requested project could not be found.'}</p>
        <button
          className="case-btn case-btn-primary"
          onClick={() => navigate('/projects')}
        >
          <span className="case-btn-icon">
            <IconArrowLeft />
          </span>
          Back to Projects
        </button>
      </div>
    );
  }

  const heroImage = getImageUrl(project.image);
  const phoneImage = getImageUrl(gallery[1] || project.image);

  return (
    <main className="project-detail-page">
      {/* ══════════════════════════════════════════════════════════════════
          HERO — Text left, visual right (as requested)
         ══════════════════════════════════════════════════════════════════ */}
      <section className="pd-hero">
        <div className="pd-hero-bg" aria-hidden="true">
          <div className="pd-hero-aurora pd-hero-aurora-1" />
          <div className="pd-hero-aurora pd-hero-aurora-2" />
          <div className="pd-hero-aurora pd-hero-aurora-3" />
          <div className="pd-hero-grid" />
          <div className="pd-hero-dots">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="pd-hero-dot"
                style={{
                  left: `${(i * 41) % 100}%`,
                  top: `${(i * 57) % 100}%`,
                  animationDelay: `${(i % 9) * 0.7}s`,
                  animationDuration: `${6 + (i % 5)}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="case-container">
          <motion.div
            className="pd-breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            
          </motion.div>

          {/* Two-column: text left, visual right */}
          <div className="pd-hero-split">
            <motion.div
              className="pd-hero-copy"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              

              <h1>{project.title}</h1>

              <p className="pd-hero-lead">
                {project.shortDescription ||
                  project.tagline ||
                  project.description ||
                  'A modern digital product designed to connect people, services and opportunities.'}
              </p>

              <div className="pd-hero-actions">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-btn case-btn-primary"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="btn-shine" />
                    <span>View Live</span>
                    <span className="case-btn-icon">
                      <IconExternalLink />
                    </span>
                  </motion.a>
                )}
                <motion.button
                  className="case-btn case-btn-outline"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() =>
                    document
                      .getElementById('case-study-start')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  <span>Read Case Study</span>
                  <span className="case-btn-icon">
                    <IconArrowRight />
                  </span>
                </motion.button>
              </div>

              {/* Quick stats inline */}
              <div className="pd-hero-quick-stats">
                {[
                  { value: project.industry || 'Technology', label: 'Industry' },
                  { value: project.duration || '4 Months', label: 'Duration' },
                  { value: project.status || 'Live', label: 'Status' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="pd-hero-stat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <span className="pd-hero-stat-value">{stat.value}</span>
                    <span className="pd-hero-stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual — browser mockup + phone */}
            <motion.div
              className="pd-hero-visual"
              initial={{ opacity: 0, x: 35, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="pd-hero-image-frame">
                <div className="browser-topbar">
                  <div className="browser-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="browser-address">
                    {project.liveUrl || 'project-preview.app'}
                  </div>
                  <div className="browser-controls">
                    <span className="browser-dot-menu" />
                  </div>
                </div>
                <div className="browser-screen">
                  <img
                    src={heroImage}
                    alt={`${project.title} preview`}
                    onError={handleImageError}
                  />
                  <span className="pd-hero-image-shine" />
                </div>
              </div>

              <motion.div
                className="pd-phone-float"
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div className="phone-speaker" />
                <div className="phone-screen">
                  <img
                    src={phoneImage}
                    alt={`${project.title} mobile preview`}
                    onError={handleImageError}
                  />
                </div>
                <div className="phone-home-bar" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          NARRATIVE
         ══════════════════════════════════════════════════════════════════ */}
      <section className="pd-narrative" id="case-study-start">
        <div className="pd-narrative-bg" aria-hidden="true">
          <div className="pd-nar-aurora pd-nar-aurora-1" />
          <div className="pd-nar-aurora pd-nar-aurora-2" />
          <div className="pd-nar-grid" />
        </div>

        <div className="case-container pd-narrative-inner">
          

          <div className="pd-nar-grid-layout">
            <motion.div
              className="pd-nar-number"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>01</span>
              <div className="pd-nar-number-line" />
            </motion.div>

            <div className="pd-nar-stack">
              <motion.article
                className="pd-nar-block"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="pd-nar-block-rail" />
                <div className="pd-nar-block-head">
                  <span className="pd-nar-icon">
                    <IconFile />
                  </span>
                  <h2>Overview</h2>
                </div>
                <p>{overviewText}</p>
              </motion.article>

              <motion.article
                className="pd-nar-block"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="pd-nar-block-rail" />
                <div className="pd-nar-block-head">
                  <span className="pd-nar-icon">
                    <IconTarget />
                  </span>
                  <h2>The Challenge</h2>
                </div>
                <p>{challengeText}</p>
              </motion.article>

              <motion.article
                className="pd-nar-block"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="pd-nar-block-rail" />
                <div className="pd-nar-block-head">
                  <span className="pd-nar-icon">
                    <IconLightbulb />
                  </span>
                  <h2>Our Solution</h2>
                </div>
                <p>{solutionText}</p>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURES
         ══════════════════════════════════════════════════════════════════ */}
      {features.length > 0 && (
        <section className="pd-features-section">
          <div className="case-container">
            <div className="pd-section-header">
              <motion.span
                className="pd-section-eyebrow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="pd-eyebrow-dot" />
                What's Inside
              </motion.span>
              <motion.h2
                className="pd-section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                Key <span className="pd-text-gradient">Features</span>
              </motion.h2>
              <motion.p
                className="pd-section-sub"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Everything this product was built to do — beautifully.
              </motion.p>
            </div>

            <motion.div
              className="pd-features-bento"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {features.slice(0, 6).map((feature, i) => {
                const isWide = i % 5 === 0;
                return (
                  <motion.div
                    className={`pd-feature-tile ${
                      isWide ? 'pd-feature-wide' : ''
                    }`}
                    key={`${feature.title}-${i}`}
                    variants={reveal}
                    whileHover={{ y: -8 }}
                  >
                    <span className="pd-feature-rail" />
                    <span className="pd-feature-shine" />
                    <span className="pd-feature-index">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="pd-feature-icon">
                      <IconCheck />
                    </div>

                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>

                    <span className="pd-feature-arrow">
                      <IconArrowRight />
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TECHNOLOGY
         ══════════════════════════════════════════════════════════════════ */}
      {technologies.length > 0 && (
        <section className="pd-tech-section">
          <div className="pd-tech-bg" aria-hidden="true">
            <div className="pd-tech-aurora" />
            <div className="pd-tech-grid" />
          </div>

          <div className="case-container pd-tech-inner">
            <div className="pd-section-header">
              
              <motion.h2
                className="pd-section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                Built With <span className="pd-text-gradient">Modern Tech</span>
              </motion.h2>
              <motion.p
                className="pd-section-sub"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                The stack powering this experience.
              </motion.p>
            </div>

            <div className="pd-tech-constellation">
              <span className="pd-tech-orbit" aria-hidden="true" />
              <span
                className="pd-tech-orbit pd-tech-orbit-2"
                aria-hidden="true"
              />
              <div className="pd-tech-cloud">
                {technologies.map((tech, i) => (
                  <motion.div
                    className="pd-tech-node"
                    key={`${tech}-${i}`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.06,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    whileHover={{ y: -6, scale: 1.08 }}
                  >
                    <span className="pd-tech-node-dot" />
                    <div className="pd-tech-node-pill">
                      {renderTechBadge(tech)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      

      {/* ══════════════════════════════════════════════════════════════════
          INFO
         ══════════════════════════════════════════════════════════════════ */}
      <section className="pd-info-section">
        <div className="case-container">
          <div className="pd-section-header">
            
            <motion.h2
              className="pd-section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              Project <span className="pd-text-gradient">Information</span>
            </motion.h2>
          </div>

          <div className="pd-info-grid-wide">
            {[
              {
                Icon: IconGraduation,
                label: 'Industry',
                value: project.industry || 'Technology',
              },
              {
                Icon: IconBuilding,
                label: 'Project Type',
                value:
                  project.projectType ||
                  project.type ||
                  'Web & Mobile Application',
              },
              {
                Icon: IconDesktop,
                label: 'Platform',
                value: getPlatforms(project),
              },
              {
                Icon: IconCalendar,
                label: 'Duration',
                value: project.duration || '4 Months',
              },
              {
                Icon: IconUsers,
                label: 'Team',
                value: project.team || 'Our Product Team',
              },
              {
                Icon: IconCheck,
                label: 'Status',
                value: project.status || 'Live',
                badge: true,
              },
              {
                Icon: IconLayers,
                label: 'Services',
                value: services.join(' · '),
              },
              {
                Icon: IconClock,
                label: 'Completed',
                value: formatDate(project.completionDate),
              },
            ].map((info, i) => {
              const Icon = info.Icon;
              return (
                <motion.div
                  className="pd-info-tile"
                  key={info.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <span className="pd-info-tile-rail" />
                  <div className="pd-info-tile-icon">
                    <Icon />
                  </div>
                  <div className="pd-info-tile-body">
                    <span className="pd-info-tile-label">{info.label}</span>
                    {info.badge ? (
                      <span className="pd-info-tile-badge">{info.value}</span>
                    ) : (
                      <strong className="pd-info-tile-value">
                        {info.value}
                      </strong>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {project.liveUrl && (
              <motion.a
                className="pd-info-tile pd-info-tile-link"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <span className="pd-info-tile-rail" />
                <div className="pd-info-tile-icon">
                  <IconLink />
                </div>
                <div className="pd-info-tile-body">
                  <span className="pd-info-tile-label">Live Project</span>
                  <strong className="pd-info-tile-value">
                    {project.liveUrl
                      .replace(/^https?:\/\//, '')
                      .replace(/\/$/, '')}
                  </strong>
                </div>
                <span className="pd-info-tile-external">
                  <IconExternalLink />
                </span>
              </motion.a>
            )}

            {project.client && (
              <motion.div
                className="pd-info-tile pd-info-tile-client"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <span className="pd-info-tile-rail" />
                <div className="pd-info-tile-icon">
                  <IconUsers />
                </div>
                <div className="pd-info-tile-body">
                  <span className="pd-info-tile-label">Client</span>
                  <strong className="pd-info-tile-value">
                    {project.client}
                  </strong>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          RELATED
         ══════════════════════════════════════════════════════════════════ */}
      {relatedProjects.length > 0 && (
        <section className="pd-related">
          <div className="case-container">
            <div className="pd-related-heading">
              <motion.span
                className="pd-mini-label"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="pd-mini-dot" />
                MORE WORK
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
              >
                Related <span>Projects</span>
              </motion.h2>
            </div>

            <div className="pd-related-grid">
              {relatedProjects.map((related, i) => (
                <motion.article
                  className="pd-related-card"
                  key={related._id || related.slug}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -8 }}
                  onClick={() =>
                    navigate(`/projects/${related.slug || related._id}`)
                  }
                >
                  <span className="pd-related-rail" />
                  <span className="pd-related-shine" />
                  <div className="pd-related-image">
                    <img
                      src={getImageUrl(related.image)}
                      alt={related.title}
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <span className="pd-related-image-tint" />
                  </div>
                  <div className="pd-related-content">
                    <span className="pd-related-category">
                      {related.category || 'Project'}
                    </span>
                    <h3>{related.title}</h3>
                    <p>
                      {related.description?.substring(0, 100) ||
                        'Explore this project.'}
                    </p>
                    <div className="pd-related-link">
                      <span>View Project</span>
                      <span className="pd-related-arrow">
                        <IconArrowRight />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          CTA
         ══════════════════════════════════════════════════════════════════ */}
      <section className="pd-cta">
        <div className="case-container">
          <motion.div
            className="pd-cta-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
          >
            <div className="pd-cta-bg" aria-hidden="true">
              <div className="pd-cta-aurora pd-cta-aurora-1" />
              <div className="pd-cta-aurora pd-cta-aurora-2" />
              <div className="pd-cta-grid" />
              <div className="pd-cta-dots">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className="pd-cta-dot"
                    style={{
                      left: `${(i * 37) % 100}%`,
                      top: `${(i * 61) % 100}%`,
                      animationDelay: `${(i % 6) * 0.7}s`,
                      animationDuration: `${6 + (i % 4)}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <span className="pd-cta-rail" aria-hidden="true" />
            <span className="pd-cta-shine" aria-hidden="true" />

            <div className="pd-cta-content">
              <span className="pd-cta-rocket">
                <IconRocket />
              </span>
              <div className="pd-cta-copy">
                <h2>Have a similar project in mind?</h2>
                <p>Let's build something amazing together!</p>
              </div>
              <Link to="/contact" className="pd-cta-button">
                <span className="btn-shine" />
                <span>Let's Talk</span>
                <span className="pd-cta-button-arrow">
                  <IconArrowRight />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;