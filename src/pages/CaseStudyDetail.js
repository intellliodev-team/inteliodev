// CaseStudyDetail.jsx — Intelliodev.io · Modern Burgundy + Cream
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { renderTechBadge } from '../utils/techIconMap';
import './CaseStudyDetail.css';

const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

const getMediaBaseUrl = () => API_BASE_URL.replace('/api', '');

const getMediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
  const baseUrl = getMediaBaseUrl();
  if (path.startsWith('/')) return `${baseUrl}${path}`;
  return `${baseUrl}/${path}`;
};

/* ── Icons ──────────────────────────────────── */
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);
const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
const IconArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
);
const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="100%" height="100%"><polygon points="8 5 19 12 8 19 8 5" /></svg>
);
const IconPause = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="100%" height="100%"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
);
const IconVolume = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
);
const IconMute = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
);
const IconFullscreen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" /></svg>
);
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" /></svg>
);
const IconSpark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></svg>
);
const IconRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
);
const IconLightbulb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2v.3h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" /></svg>
);
const IconTrend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
);
const IconBuilding = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01M12 6h.01M12 10h.01M12 14h.01" /></svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
);

const FloatingIcon = ({ type }) => {
  const icons = { trophy: IconTrophy, spark: IconSpark, rocket: IconRocket, target: IconTarget, lightbulb: IconLightbulb, trend: IconTrend };
  const IconCmp = icons[type] || IconSpark;
  return <IconCmp />;
};

/* ══════════════════════════════════════════════════════════════════════════
   VideoPlayer — Compact custom video with controls
   ══════════════════════════════════════════════════════════════════════════ */
const VideoPlayer = ({ src, poster, title }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    video.currentTime = percent * video.duration;
    setCurrentTime(video.currentTime);
  };

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen?.();
    }
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="csd-video-player-wrapper"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="csd-video-element"
        onError={(e) => { e.target.style.display = 'none'; }}
      />

      {/* Overlay play button (center) */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.button
            className="csd-video-overlay-play"
            onClick={togglePlay}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Play"
          >
            <span className="csd-video-overlay-play-ring" />
            <span className="csd-video-overlay-play-icon"><IconPlay /></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Top caption chip */}
      <div className="csd-video-topbar">
        <div className="csd-video-caption">
          <span className="csd-video-caption-dot" />
          <span>Case Study Film · {title || 'Untitled'}</span>
        </div>
        <div className="csd-video-duration">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Bottom control bar — appears on hover or when paused */}
      <motion.div
        className={`csd-video-controls ${isHovered || !isPlaying ? 'visible' : ''}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered || !isPlaying ? 1 : 0, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button className="csd-video-ctrl-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <IconPause /> : <IconPlay />}
        </button>

        <div className="csd-video-progress" onClick={handleSeek}>
          <div className="csd-video-progress-track">
            <motion.div
              className="csd-video-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
            <span className="csd-video-progress-thumb" style={{ left: `${progressPercent}%` }} />
          </div>
        </div>

        <button className="csd-video-ctrl-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? <IconMute /> : <IconVolume />}
        </button>

        <button className="csd-video-ctrl-btn" onClick={handleFullscreen} aria-label="Fullscreen">
          <IconFullscreen />
        </button>
      </motion.div>

      {/* Ambient auroras */}
      <span className="csd-video-aurora csd-video-aurora-1" aria-hidden="true" />
      <span className="csd-video-aurora csd-video-aurora-2" aria-hidden="true" />
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════════════════════════════════ */
const CaseStudyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState(null);
  const [relatedStudies, setRelatedStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetchCaseStudyData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  }, [slug]);

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

  const fetchCaseStudyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/case-studies/slug/${slug}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Case study not found');
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const currentStudy = await res.json();
      if (!currentStudy || !currentStudy._id) throw new Error('Invalid case study data');
      setStudy(currentStudy);

      try {
        const listRes = await fetch(`${API_BASE_URL}/case-studies`);
        if (listRes.ok) {
          const allStudies = await listRes.json();
          if (Array.isArray(allStudies)) {
            let filtered = allStudies
              .filter((s) => s.industry?.toLowerCase() === currentStudy.industry?.toLowerCase() && s._id !== currentStudy._id)
              .slice(0, 3);
            if (filtered.length < 3) {
              const extra = allStudies.filter((s) => s._id !== currentStudy._id && !filtered.find((f) => f._id === s._id));
              filtered.push(...extra.slice(0, 3 - filtered.length));
            }
            setRelatedStudies(filtered.slice(0, 3));
          } else setRelatedStudies([]);
        } else setRelatedStudies([]);
      } catch (relatedErr) {
        console.warn('Could not fetch related case studies:', relatedErr);
        setRelatedStudies([]);
      }
    } catch (error) {
      console.error('Error fetching case study:', error);
      setError(error.message || 'Failed to load case study');
      setStudy(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="csd-state-screen">
        <div className="csd-loader"><IconSpark /></div>
        <p>Loading case study details...</p>
      </div>
    );
  }

  if (error || !study) {
    return (
      <div className="csd-state-screen csd-error-screen">
        <div className="csd-state-icon"><IconAlert /></div>
        <h2>{error || 'Case Study Not Found'}</h2>
        <p>The case study you are looking for does not exist or has been removed.</p>
        <Link to="/case-studies" className="csd-btn csd-btn-primary">
          <span className="csd-btn-icon"><IconArrowLeft /></span>
          Back to Case Studies
        </Link>
      </div>
    );
  }

  const videoUrl = getMediaUrl(study.video);
  const thumbnailUrl = getMediaUrl(study.thumbnail);

  return (
    <main className="csd-page">
      <motion.div
        className="csd-scroll-progress"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          HERO
         ══════════════════════════════════════════════════════════════════ */}
      <section className="csd-hero">
        <div className="csd-hero-bg" aria-hidden="true">
          <div className="csd-hero-aurora csd-hero-aurora-1" />
          <div className="csd-hero-aurora csd-hero-aurora-2" />
          <div className="csd-hero-aurora csd-hero-aurora-3" />
          <div className="csd-hero-grid" />
          <div className="csd-hero-dots">
            {Array.from({ length: 26 }).map((_, i) => (
              <span key={i} className="csd-hero-dot" style={{ left: `${(i * 41) % 100}%`, top: `${(i * 57) % 100}%`, animationDelay: `${(i % 9) * 0.7}s`, animationDuration: `${6 + (i % 5)}s` }} />
            ))}
          </div>
        </div>

        <div className="csd-floating-icons" aria-hidden="true">
          {['trophy', 'spark', 'rocket', 'target', 'lightbulb', 'trend'].map((type, i) => (
            <motion.div
              key={i}
              className="csd-floating-icon"
              animate={{ y: [0, -18 - i * 4, 0], x: [0, i % 2 === 0 ? 14 : -14, 0], rotate: [0, i * 6, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              style={{ left: `${8 + i * 15}%`, top: `${14 + (i % 4) * 18}%` }}
            >
              <FloatingIcon type={type} />
            </motion.div>
          ))}
        </div>

        <div className="csd-container">
          <motion.div className="csd-breadcrumb" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
           
          </motion.div>

          <div className="csd-hero-magazine">
            <motion.div
              className="csd-hero-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* <motion.div className="csd-hero-tag" whileHover={{ scale: 1.04 }}>
                <span className="csd-hero-tag-dot" />
                <span>Case Study</span>
                <span className="csd-hero-tag-line" />
              </motion.div> */}

              <h1 className="csd-hero-title">{study.title || 'Untitled Case Study'}</h1>
              <p className="csd-hero-lead">{study.description || 'No description available.'}</p>

              <div className="csd-hero-meta">
                <div className="csd-hero-meta-item">
                  <span className="csd-hero-meta-label">Industry</span>
                  <span className="csd-hero-meta-value">{study.industry || 'Technology'}</span>
                </div>
                <div className="csd-hero-meta-item">
                  <span className="csd-hero-meta-label">Client</span>
                  <span className="csd-hero-meta-value">{study.client || 'Confidential'}</span>
                </div>
                <div className="csd-hero-meta-item">
                  <span className="csd-hero-meta-label">Year</span>
                  <span className="csd-hero-meta-value">
                    {study.completionDate ? new Date(study.completionDate).getFullYear() : 'Recent'}
                  </span>
                </div>
              </div>

              <div className="csd-hero-actions">
                <motion.button
                  className="csd-btn csd-btn-primary"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => document.getElementById('csd-story')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="btn-shine" />
                  <span>Read Story</span>
                  <span className="csd-btn-icon"><IconArrowRight /></span>
                </motion.button>
                <motion.button
                  className="csd-btn csd-btn-outline"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate('/contact')}
                >
                  <span className="csd-btn-icon"><IconSend /></span>
                  <span>Get Similar</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="csd-hero-right"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="csd-hero-emblem"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="csd-hero-emblem-inner">
                  <span className="csd-hero-emblem-icon"><IconTrophy /></span>
                </div>
                <div className="csd-hero-emblem-ring" />
                <div className="csd-hero-emblem-ring csd-hero-emblem-ring-2" />
              </motion.div>
              <div className="csd-hero-number">
                <span className="csd-hero-number-label">Project</span>
                <span className="csd-hero-number-value">01</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          VIDEO — Compact
         ══════════════════════════════════════════════════════════════════ */}
      <section className="csd-video-section">
        <div className="csd-video-bg" aria-hidden="true">
          <div className="csd-video-section-aurora" />
          <div className="csd-video-section-grid" />
        </div>

        <div className="csd-container csd-video-inner">
          {videoUrl ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <VideoPlayer src={videoUrl} poster={thumbnailUrl} title={study.title} />
            </motion.div>
          ) : (
            <motion.div
              className="csd-video-empty"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <motion.span
                className="csd-video-empty-icon"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <IconPlay />
              </motion.span>
              <span>Video not available</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STORY
         ══════════════════════════════════════════════════════════════════ */}
      <section className="csd-story" id="csd-story">
        <div className="csd-story-bg" aria-hidden="true">
          <div className="csd-story-aurora csd-story-aurora-1" />
          <div className="csd-story-aurora csd-story-aurora-2" />
          <div className="csd-story-grid" />
          <div className="csd-story-dots">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className="csd-story-dot" style={{ left: `${(i * 47) % 100}%`, top: `${(i * 61) % 100}%`, animationDelay: `${(i % 8) * 0.7}s`, animationDuration: `${7 + (i % 4)}s` }} />
            ))}
          </div>
        </div>

        <div className="csd-container csd-story-inner">
          <motion.div className="csd-story-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="csd-story-eyebrow"><span className="csd-story-eyebrow-dot" />The Story</span>
            <h2 className="csd-story-title">From <span className="csd-text-gradient">Challenge</span> to Results</h2>
            <p className="csd-story-subtitle">A breakdown of how we approached the problem and what we achieved.</p>
          </motion.div>

          <div className="csd-story-timeline">
            <span className="csd-story-timeline-line" aria-hidden="true" />

            {study.challenge && (
              <motion.div
                className="csd-timeline-item csd-timeline-item-left"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="csd-timeline-card">
                  <span className="csd-timeline-card-rail" />
                  <span className="csd-timeline-card-shine" />
                  <span className="csd-timeline-card-num">01</span>
                  <div className="csd-timeline-card-head">
                    <span className="csd-timeline-card-icon"><IconTarget /></span>
                    <span className="csd-timeline-card-kicker">Challenge</span>
                  </div>
                  <h3 className="csd-timeline-card-title">The Problem</h3>
                  <p className="csd-timeline-card-text">{study.challenge}</p>
                </div>
                <span className="csd-timeline-marker"><span className="csd-timeline-marker-inner" /><span className="csd-timeline-marker-ring" /></span>
              </motion.div>
            )}

            {study.solution && (
              <motion.div
                className="csd-timeline-item csd-timeline-item-right"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="csd-timeline-card">
                  <span className="csd-timeline-card-rail" />
                  <span className="csd-timeline-card-shine" />
                  <span className="csd-timeline-card-num">02</span>
                  <div className="csd-timeline-card-head">
                    <span className="csd-timeline-card-icon"><IconLightbulb /></span>
                    <span className="csd-timeline-card-kicker">Solution</span>
                  </div>
                  <h3 className="csd-timeline-card-title">What We Built</h3>
                  <p className="csd-timeline-card-text">{study.solution}</p>
                </div>
                <span className="csd-timeline-marker"><span className="csd-timeline-marker-inner" /><span className="csd-timeline-marker-ring" /></span>
              </motion.div>
            )}

            {study.results && (
              <motion.div
                className="csd-timeline-item csd-timeline-item-left"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="csd-timeline-card">
                  <span className="csd-timeline-card-rail" />
                  <span className="csd-timeline-card-shine" />
                  <span className="csd-timeline-card-num">03</span>
                  <div className="csd-timeline-card-head">
                    <span className="csd-timeline-card-icon"><IconTrend /></span>
                    <span className="csd-timeline-card-kicker">Results</span>
                  </div>
                  <h3 className="csd-timeline-card-title">The Impact</h3>
                  <p className="csd-timeline-card-text">{study.results}</p>
                </div>
                <span className="csd-timeline-marker"><span className="csd-timeline-marker-inner" /><span className="csd-timeline-marker-ring" /></span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          INFO STRIP
         ══════════════════════════════════════════════════════════════════ */}
      <section className="csd-info-strip">
        <div className="csd-info-strip-bg" aria-hidden="true">
          <div className="csd-info-strip-aurora" />
          <div className="csd-info-strip-grid" />
          <div className="csd-info-strip-dots">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="csd-info-strip-dot" style={{ left: `${(i * 41) % 100}%`, top: `${(i * 57) % 100}%`, animationDelay: `${(i % 7) * 0.6}s`, animationDuration: `${7 + (i % 4)}s` }} />
            ))}
          </div>
        </div>

        <div className="csd-container csd-info-strip-inner">
          <motion.div className="csd-info-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="csd-info-eyebrow"><span className="csd-info-eyebrow-dot" />Project Details</span>
            <h2 className="csd-info-title">By the Numbers</h2>
          </motion.div>

          <div className="csd-info-grid">
            {[
              { Icon: IconBuilding, label: 'Industry', value: study.industry || 'Technology' },
              { Icon: IconUsers, label: 'Client', value: study.client || 'Confidential' },
              { Icon: IconCalendar, label: 'Completed', value: study.completionDate ? new Date(study.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recent' },
              { Icon: IconClock, label: 'Duration', value: study.duration || '3 months' },
            ].map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.label}
                  className="csd-info-tile"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                >
                  <span className="csd-info-tile-rail" />
                  <span className="csd-info-tile-shine" />
                  <span className="csd-info-tile-icon"><Icon /></span>
                  <span className="csd-info-tile-label">{item.label}</span>
                  <span className="csd-info-tile-value">{item.value}</span>
                </motion.div>
              );
            })}
          </div>

          {study.technologies && study.technologies.length > 0 && (
            <motion.div
              className="csd-tech-strip"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="csd-tech-strip-label"><span className="csd-tech-strip-dot" />Tech Stack</span>
              <div className="csd-tech-strip-list">
                {study.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="csd-tech-strip-item"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    {renderTechBadge(tech)}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          RELATED
         ══════════════════════════════════════════════════════════════════ */}
      {relatedStudies.length > 0 && (
        <section className="csd-related">
          <div className="csd-related-bg" aria-hidden="true">
            <div className="csd-related-aurora-1" />
            <div className="csd-related-aurora-2" />
            <div className="csd-related-dots">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="csd-related-dot" style={{ left: `${(i * 43) % 100}%`, top: `${(i * 59) % 100}%`, animationDelay: `${(i % 8) * 0.7}s`, animationDuration: `${7 + (i % 5)}s` }} />
              ))}
            </div>
          </div>

          <div className="csd-container csd-related-inner">
            <div className="csd-related-header">
              <div>
                <motion.span className="csd-section-badge" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <span className="csd-section-badge-dot" />More Work
                </motion.span>
                <motion.h2 className="csd-section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
                  Related <span className="csd-text-gradient">Case Studies</span>
                </motion.h2>
              </div>
              <motion.div className="csd-related-count" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} whileHover={{ y: -4 }}>
                <span className="csd-related-count-num">{relatedStudies.length}</span>
                <span className="csd-related-count-label">Projects</span>
              </motion.div>
            </div>

            <div className="csd-related-grid">
              {relatedStudies.map((rel, index) => (
                <RelatedCard
                  key={rel._id || index}
                  study={rel}
                  index={index}
                  getMediaUrl={getMediaUrl}
                  onClickDetails={() => navigate(`/case-studies/${rel.slug || rel._id}`)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          CTA
         ══════════════════════════════════════════════════════════════════ */}
      <section className="csd-cta">
        <div className="csd-container">
          <motion.div className="csd-cta-banner" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="csd-cta-bg" aria-hidden="true">
              <div className="csd-cta-aurora csd-cta-aurora-1" />
              <div className="csd-cta-aurora csd-cta-aurora-2" />
              <div className="csd-cta-aurora csd-cta-aurora-3" />
              <div className="csd-cta-grid" />
              <div className="csd-cta-dots">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span key={i} className="csd-cta-dot" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 61) % 100}%`, animationDelay: `${(i % 6) * 0.7}s`, animationDuration: `${6 + (i % 4)}s` }} />
                ))}
              </div>
            </div>

            <span className="csd-cta-rail" aria-hidden="true" />
            <span className="csd-cta-shine" aria-hidden="true" />

            <div className="csd-cta-left">
              <span className="csd-cta-kicker"><span className="csd-cta-kicker-dot" />Start Your Story</span>
              <h2 className="csd-cta-heading">Ready to Transform<br /><span className="csd-text-gradient">Your Business?</span></h2>
              <p className="csd-cta-text">Let's discuss how our engineering teams can deliver similar business impact for your organization.</p>
            </div>

            <div className="csd-cta-right">
              <motion.button className="csd-cta-btn csd-cta-btn-primary" whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('/contact')}>
                <span className="btn-shine" />
                <span className="csd-cta-btn-icon"><IconRocket /></span>
                <span>Let's Connect</span>
                <span className="csd-cta-btn-arrow"><IconArrowRight /></span>
              </motion.button>
              <Link to="/case-studies" className="csd-cta-btn csd-cta-btn-ghost">
                <span>View All Studies</span>
                <span className="csd-cta-btn-arrow"><IconArrowUpRight /></span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

const RelatedCard = ({ study, index, getMediaUrl, onClickDetails }) => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current && study.video && !videoError) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setVideoError(true));
    }
  };
  const handleMouseLeave = () => {
    if (videoRef.current) videoRef.current.pause();
  };

  const videoUrl = getMediaUrl(study.video);

  return (
    <motion.article
      className="csd-related-card"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClickDetails}
    >
      <span className="csd-related-rail" />
      <span className="csd-related-shine" />
      <span className="csd-related-big-number">{String(index + 1).padStart(2, '0')}</span>

      <div className="csd-related-media">
        {videoUrl && !videoError ? (
          <video ref={videoRef} src={videoUrl} muted loop playsInline preload="metadata" className="csd-related-video" onError={() => setVideoError(true)} />
        ) : (
          <div className="csd-related-placeholder"><span className="csd-related-placeholder-icon"><IconPlay /></span></div>
        )}
        <span className="csd-related-media-tint" />
        <span className="csd-related-media-badge">{study.industry || 'Technology'}</span>
      </div>

      <div className="csd-related-body">
        <h3>{study.title || 'Case Study'}</h3>
        <p>{study.description || 'Learn more about this project.'}</p>
        <div className="csd-related-footer">
          <span className="csd-related-meta">
            <span className="csd-related-meta-icon"><IconCalendar /></span>
            {study.completionDate ? new Date(study.completionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent'}
          </span>
          <span className="csd-related-link">
            <span>View Study</span>
            <span className="csd-related-arrow"><IconArrowRight /></span>
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default CaseStudyDetail;