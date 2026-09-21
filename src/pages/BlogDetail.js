// BlogDetail.jsx — Intelliodev.io · Modern Editorial Layout (FIXED)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BlogDetail.css';

const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

const DEFAULT_BLOG_IMAGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23F8E8E9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="42" fill="%23990011">INTELLIODEV</text></svg>`;

const getImageUrl = (imagePath) => {
  if (!imagePath) return DEFAULT_BLOG_IMAGE;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) return imagePath;
  if (imagePath.includes('res.cloudinary.com')) return imagePath.startsWith('//') ? `https:${imagePath}` : imagePath;
  const baseUrl = API_BASE_URL.replace('/api', '');
  if (imagePath.startsWith('/uploads')) return `${baseUrl}${imagePath}`;
  return `${baseUrl}/${imagePath.replace(/^\/+/, '')}`;
};

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = DEFAULT_BLOG_IMAGE;
};

/* ── Icons ─────────────────────────────────── */
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);
const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const IconLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
);
const IconTwitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="100%" height="100%"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="100%" height="100%"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
);
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="100%" height="100%"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
);
const IconSpark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></svg>
);
const IconRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
);
const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.83z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
);
const IconBookOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
);
const IconBullet = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%"><polyline points="20 6 9 17 4 12" /></svg>
);

const FloatingIcon = ({ type }) => {
  const icons = { spark: IconSpark, rocket: IconRocket, book: IconBookOpen, tag: IconTag, check: IconBullet, link: IconLink };
  const IconCmp = icons[type] || IconSpark;
  return <IconCmp />;
};

/* ══════════════════════════════════════════════════════════════════════════
   ROBUST PARSER — handles plain text, markdown, headings, lists
   ══════════════════════════════════════════════════════════════════════════ */
const parseBlogContent = (rawContent) => {
  if (!rawContent || typeof rawContent !== 'string') return [];

  const content = rawContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = content.split('\n');

  const blocks = [];
  let paragraphBuffer = [];
  let listBuffer = [];
  let listType = null;

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      const text = paragraphBuffer.join(' ').trim();
      if (text) blocks.push({ type: 'paragraph', content: text });
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push({ type: 'list', ordered: listType === 'ordered', items: listBuffer });
      listBuffer = [];
      listType = null;
    }
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  lines.forEach((rawLine) => {
    const trimmed = rawLine.trim();

    // Blank line → flush paragraph
    if (!trimmed) {
      flushParagraph();
      return;
    }

    // Skip metadata lines
    if (/^\*\*?(Category|Excerpt|Author|Read Time|Tags|Slug):?\*\*?:/i.test(trimmed)) {
      flushAll();
      return;
    }

    // Skip horizontal rules
    if (/^[-*_]{3,}$/.test(trimmed)) {
      flushAll();
      return;
    }

    // Markdown headings (H1–H4)
    if (trimmed.startsWith('#### ')) {
      flushAll();
      blocks.push({ type: 'h4', content: trimmed.slice(5).trim() });
      return;
    }
    if (trimmed.startsWith('### ')) {
      flushAll();
      blocks.push({ type: 'h3', content: trimmed.slice(4).trim() });
      return;
    }
    if (trimmed.startsWith('## ')) {
      flushAll();
      blocks.push({ type: 'h2', content: trimmed.slice(3).trim() });
      return;
    }
    if (trimmed.startsWith('# ')) {
      flushAll();
      blocks.push({ type: 'h1', content: trimmed.slice(2).trim() });
      return;
    }

    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushParagraph();
      if (listType === 'ordered') flushList();
      listType = 'unordered';
      const clean = trimmed.replace(/^[-*]\s+/, '').trim();
      if (clean) listBuffer.push(clean);
      return;
    }

    // Ordered list
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      flushParagraph();
      if (listType === 'unordered') flushList();
      listType = 'ordered';
      listBuffer.push(numberedMatch[2].trim());
      return;
    }

    /* ───────────────────────────────────────────────────────────────
       PLAIN TEXT HEURISTICS — detect headings without markdown syntax
       ─────────────────────────────────────────────────────────────── */
    const isPlainHeading =
      // Short line (<= 60 chars), no period at end, not ending with punctuation
      trimmed.length <= 60 &&
      !/[.!?,;:]$/.test(trimmed) &&
      // Doesn't start with list/dash patterns
      !/^[-*•]/.test(trimmed) &&
      // Has only 1–8 words
      trimmed.split(/\s+/).length <= 8 &&
      // Previous block is NOT a paragraph (i.e., it stands alone after blank line)
      paragraphBuffer.length === 0 &&
      listBuffer.length === 0;

    if (isPlainHeading) {
      flushAll();
      // "Introduction", "What Is AI Automation?", "The Role of AI Agents", "Conclusion"
      // → treat as H2 (main section heading)
      blocks.push({ type: 'h2', content: trimmed });
      return;
    }

    // Regular paragraph
    if (listBuffer.length) flushList();
    paragraphBuffer.push(trimmed);
  });

  flushAll();
  return blocks;
};

const extractHeadings = (blocks) => {
  const headings = [];
  blocks.forEach((block) => {
    if (block.type === 'h2') headings.push({ level: 'h2', text: block.content });
    else if (block.type === 'h3') headings.push({ level: 'h3', text: block.content });
  });
  return headings;
};

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [readingTime, setReadingTime] = useState(0);
  const [contentBlocks, setContentBlocks] = useState([]);
  const [tocHeadings, setTocHeadings] = useState([]);

  useEffect(() => {
    fetchBlogAndRelated();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);

      const sections = document.querySelectorAll('.bd-heading-h2, .bd-heading-h3');
      let current = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) current = section.id || section.textContent;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentBlocks]);

  useEffect(() => {
    if (blog?.content) {
      const words = blog.content.trim().split(/\s+/).length;
      setReadingTime(Math.max(1, Math.ceil(words / 200)));
      const blocks = parseBlogContent(blog.content);
      setContentBlocks(blocks);
      setTocHeadings(extractHeadings(blocks));
    }
  }, [blog]);

  const fetchBlogAndRelated = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error('Blog post not found');
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data || !data._id) throw new Error('Invalid blog data');
      setBlog(data);

      try {
        const relatedRes = await fetch(`${API_BASE_URL}/blogs/${slug}/related`);
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          setRelatedBlogs(Array.isArray(relatedData) ? relatedData : []);
        }
      } catch {
        setRelatedBlogs([]);
      }
    } catch (err) {
      setError(err.message || 'Unable to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const renderInline = (text) => {
    const parts = [];
    let key = 0;
    const regex = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
      if (match[2]) parts.push(<strong key={`b-${key++}`}>{match[2]}</strong>);
      else if (match[4]) parts.push(<em key={`i-${key++}`}>{match[4]}</em>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    return parts.length ? parts : text;
  };

  const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const renderBlock = (block, index) => {
    const id = block.type === 'h2' || block.type === 'h3' ? slugify(block.content) : undefined;

    switch (block.type) {
      case 'h1':
        return (
          <motion.h1
            key={index}
            className="bd-heading-h1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {block.content}
          </motion.h1>
        );
      case 'h2':
        return (
          <motion.h2
            key={index}
            id={id}
            className="bd-heading-h2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="bd-heading-marker" />
            <span>{block.content}</span>
          </motion.h2>
        );
      case 'h3':
        return (
          <motion.h3
            key={index}
            id={id}
            className="bd-heading-h3"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {block.content}
          </motion.h3>
        );
      case 'h4':
        return (
          <motion.h4
            key={index}
            className="bd-heading-h4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {block.content}
          </motion.h4>
        );
      case 'list':
        return (
          <motion.div
            key={index}
            className="bd-list-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
          >
            <ul className={`bd-list ${block.ordered ? 'bd-list-ordered' : 'bd-list-unordered'}`}>
              {block.items.map((item, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <span className="bd-list-marker">
                    {block.ordered ? <span className="bd-list-number">{i + 1}</span> : <IconBullet />}
                  </span>
                  <span className="bd-list-text">{renderInline(item)}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        );
      case 'paragraph':
      default:
        return (
          <motion.p
            key={index}
            className="bd-paragraph"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderInline(block.content)}
          </motion.p>
        );
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || 'Intelliodev Blog';
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!'));
        return;
      default:
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="bd-state-screen">
        <div className="bd-loader">
          <IconSpark />
        </div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bd-state-screen bd-error-screen">
        <div className="bd-state-icon">
          <IconAlert />
        </div>
        <h2>{error || 'Blog not found'}</h2>
        <p>The requested article could not be found.</p>
        <button onClick={() => navigate('/blogs')} className="bd-btn bd-btn-primary">
          <span className="bd-btn-icon">
            <IconArrowLeft />
          </span>
          Back to Blogs
        </button>
      </div>
    );
  }

  const excerpt =
    blog.excerpt ||
    blog.metaDescription ||
    (contentBlocks.find((b) => b.type === 'paragraph')?.content?.slice(0, 180) + '...') ||
    'Read this article on our blog.';

  return (
    <main className="bd-page">
      <motion.div
        className="bd-scroll-progress"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — MODERN HEADER
         ══════════════════════════════════════════════════════════════════ */}
      <section className="bd-hero">
        <div className="bd-hero-bg" aria-hidden="true">
          <div className="bd-hero-aurora bd-hero-aurora-1" />
          <div className="bd-hero-aurora bd-hero-aurora-2" />
          <div className="bd-hero-dots">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="bd-hero-dot"
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

        <div className="bd-container">
          {/* Breadcrumb */}
          <motion.nav
            className="bd-breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/blogs">
              <span className="bd-breadcrumb-icon">
                <IconBookOpen />
              </span>
              Insights
            </Link>
            <span className="bd-breadcrumb-sep">
              <IconArrowRight />
            </span>
            <span className="bd-breadcrumb-current">
              {blog.category || 'Article'}
            </span>
          </motion.nav>

          <div className="bd-hero-split">
            <motion.div
              className="bd-hero-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="bd-hero-tag"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                whileHover={{ scale: 1.04 }}
              >
                <span className="bd-hero-tag-dot" />
                <span>{blog.category || 'INSIGHTS'}</span>
                <span className="bd-hero-tag-line" />
              </motion.div>

              <motion.h1
                className="bd-hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
              >
                {blog.title || 'Untitled Article'}
              </motion.h1>

              <motion.p
                className="bd-hero-lead"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
              >
                {excerpt}
              </motion.p>

              <motion.div
                className="bd-hero-meta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
              >
                <div className="bd-hero-meta-item">
                  <span className="bd-hero-meta-icon">
                    <IconUser />
                  </span>
                  <div className="bd-hero-meta-text">
                    <span className="bd-hero-meta-label">Author</span>
                    <span className="bd-hero-meta-value">
                      {blog.author || 'Intelliodev Team'}
                    </span>
                  </div>
                </div>
                <div className="bd-hero-meta-item">
                  <span className="bd-hero-meta-icon">
                    <IconCalendar />
                  </span>
                  <div className="bd-hero-meta-text">
                    <span className="bd-hero-meta-label">Published</span>
                    <span className="bd-hero-meta-value">
                      {new Date(blog.publishedDate || blog.createdAt || Date.now()).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <div className="bd-hero-meta-item">
                  <span className="bd-hero-meta-icon">
                    <IconClock />
                  </span>
                  <div className="bd-hero-meta-text">
                    <span className="bd-hero-meta-label">Read Time</span>
                    <span className="bd-hero-meta-value">{readingTime} min</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bd-hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
              >
                <motion.button
                  className="bd-btn bd-btn-primary"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() =>
                    document.getElementById('bd-article')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  <span className="btn-shine" />
                  <span>Start Reading</span>
                  <span className="bd-btn-icon">
                    <IconArrowRight />
                  </span>
                </motion.button>
                <motion.button
                  className="bd-btn bd-btn-outline"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleShare('copy')}
                >
                  <span className="bd-btn-icon">
                    <IconLink />
                  </span>
                  <span>Copy Link</span>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="bd-hero-right"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bd-hero-image-frame">
                <img
                  src={getImageUrl(blog.featuredImage || blog.image)}
                  alt={blog.title || 'Blog post'}
                  onError={handleImageError}
                  loading="lazy"
                />
                <span className="bd-hero-image-shine" />
                <div className="bd-hero-image-badges">
                  <motion.span
                    className="bd-hero-image-badge"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <IconBookOpen />
                    <span>Featured</span>
                  </motion.span>
                  <motion.span
                    className="bd-hero-image-badge bd-hero-image-badge-alt"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65 }}
                  >
                    <IconSpark />
                    <span>{blog.category || 'Insight'}</span>
                  </motion.span>
                </div>
              </div>

              <motion.div
                className="bd-hero-stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                whileHover={{ y: -4 }}
              >
                <span className="bd-hero-stat-card-icon">
                  <IconClock />
                </span>
                <div>
                  <span className="bd-hero-stat-card-value">
                    {readingTime} min read
                  </span>
                  <span className="bd-hero-stat-card-label">Estimated</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROGRESS STRIP
         ══════════════════════════════════════════════════════════════════ */}
      <section className="bd-progress-strip">
        <div className="bd-container">
          <div className="bd-progress-inner">
            <div className="bd-progress-left">
              <span className="bd-progress-icon">
                <IconBookOpen />
              </span>
              <div className="bd-progress-info">
                <span className="bd-progress-label">Reading Progress</span>
                <span className="bd-progress-value">
                  {Math.round(scrollProgress)}% complete
                </span>
              </div>
            </div>
            <div className="bd-progress-bar">
              <motion.div
                className="bd-progress-bar-fill"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ARTICLE
         ══════════════════════════════════════════════════════════════════ */}
      <section className="bd-article-section" id="bd-article">
        <div className="bd-container bd-article-container">
          {tocHeadings.length > 0 && (
            <motion.aside
              className="bd-toc"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bd-toc-card">
                <div className="bd-toc-header">
                  <span className="bd-toc-header-dot" />
                  <span>On This Page</span>
                </div>
                <nav className="bd-toc-nav">
                  <ul className="bd-toc-list">
                    {tocHeadings.map((heading, index) => {
                      const id = slugify(heading.text);
                      const isActive = activeSection === heading.text || activeSection === id;
                      return (
                        <li
                          key={index}
                          className={`bd-toc-item ${heading.level === 'h3' ? 'bd-toc-sub' : ''} ${isActive ? 'active' : ''}`}
                        >
                          <a
                            href={`#${id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            <span className="bd-toc-marker" />
                            <span>{heading.text}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="bd-toc-share">
                  <span className="bd-toc-share-label">Share Article</span>
                  <div className="bd-toc-share-buttons">
                    <motion.button
                      className="bd-share-btn"
                      onClick={() => handleShare('twitter')}
                      whileHover={{ y: -3, scale: 1.08 }}
                      aria-label="Share on Twitter"
                    >
                      <IconTwitter />
                    </motion.button>
                    <motion.button
                      className="bd-share-btn"
                      onClick={() => handleShare('linkedin')}
                      whileHover={{ y: -3, scale: 1.08 }}
                      aria-label="Share on LinkedIn"
                    >
                      <IconLinkedin />
                    </motion.button>
                    <motion.button
                      className="bd-share-btn"
                      onClick={() => handleShare('facebook')}
                      whileHover={{ y: -3, scale: 1.08 }}
                      aria-label="Share on Facebook"
                    >
                      <IconFacebook />
                    </motion.button>
                    <motion.button
                      className="bd-share-btn"
                      onClick={() => handleShare('copy')}
                      whileHover={{ y: -3, scale: 1.08 }}
                      aria-label="Copy link"
                    >
                      <IconLink />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}

          <motion.article
            className="bd-article"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bd-article-content">
              {contentBlocks.length > 0 ? (
                contentBlocks.map((block, index) => renderBlock(block, index))
              ) : (
                <p className="bd-paragraph">No content available for this article.</p>
              )}
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <motion.div
                className="bd-tags"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="bd-tags-label">
                  <IconTag />
                  <span>Tags</span>
                </div>
                <div className="bd-tags-list">
                  {blog.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="bd-tag-item"
                      whileHover={{ y: -3, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              className="bd-article-footer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bd-article-footer-rail" />
              <span className="bd-article-footer-shine" />
              <div className="bd-article-footer-left">
                <span className="bd-article-footer-icon">
                  <IconRocket />
                </span>
                <div>
                  <span className="bd-article-footer-title">
                    Enjoyed this article?
                  </span>
                  <span className="bd-article-footer-sub">
                    Let's build something together.
                  </span>
                </div>
              </div>
              <motion.button
                className="bd-btn bd-btn-primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/contact')}
              >
                <span className="btn-shine" />
                <span>Get in Touch</span>
                <span className="bd-btn-icon">
                  <IconArrowRight />
                </span>
              </motion.button>
            </motion.div>
          </motion.article>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          RELATED
         ══════════════════════════════════════════════════════════════════ */}
      {relatedBlogs.length > 0 && (
        <section className="bd-related">
          <div className="bd-related-bg" aria-hidden="true">
            <div className="bd-related-aurora-1" />
            <div className="bd-related-aurora-2" />
          </div>

          <div className="bd-container bd-related-inner">
            <div className="bd-related-header">
              <div>
                <motion.span
                  className="bd-section-badge"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="bd-section-badge-dot" />
                  More Reading
                </motion.span>
                <motion.h2
                  className="bd-section-title"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 }}
                >
                  Related <span className="bd-text-gradient">Articles</span>
                </motion.h2>
              </div>
              <motion.div
                className="bd-related-count"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -4 }}
              >
                <span className="bd-related-count-num">
                  {relatedBlogs.length}
                </span>
                <span className="bd-related-count-label">Articles</span>
              </motion.div>
            </div>

            <div className="bd-related-grid">
              {relatedBlogs.slice(0, 3).map((item, index) => (
                <motion.article
                  key={item._id || index}
                  className="bd-related-card"
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate(`/blogs/${item.slug || item._id}`)}
                >
                  <span className="bd-related-rail" />
                  <span className="bd-related-shine" />
                  <span className="bd-related-big-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="bd-related-media">
                    <img
                      src={getImageUrl(item.featuredImage || item.image)}
                      alt={item.title || 'Related'}
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <span className="bd-related-media-tint" />
                    <span className="bd-related-media-badge">
                      {item.category || 'Insight'}
                    </span>
                  </div>

                  <div className="bd-related-body">
                    <h3>{item.title || 'Untitled'}</h3>
                    <p>
                      {item.excerpt ||
                        item.metaDescription?.substring(0, 100) ||
                        'Read more about this topic...'}
                    </p>
                    <div className="bd-related-footer">
                      <span className="bd-related-meta">
                        <span className="bd-related-meta-icon">
                          <IconClock />
                        </span>
                        {item.readTime || '5 min read'}
                      </span>
                      <span className="bd-related-link">
                        <span>Read</span>
                        <span className="bd-related-arrow">
                          <IconArrowRight />
                        </span>
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
      <section className="bd-cta">
        <div className="bd-container">
          <motion.div
            className="bd-cta-banner"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bd-cta-bg" aria-hidden="true">
              <div className="bd-cta-aurora bd-cta-aurora-1" />
              <div className="bd-cta-aurora bd-cta-aurora-2" />
            </div>

            <span className="bd-cta-rail" aria-hidden="true" />
            <span className="bd-cta-shine" aria-hidden="true" />

            <div className="bd-cta-left">
              <span className="bd-cta-kicker">
                <span className="bd-cta-kicker-dot" />
                Ready to Apply These Insights?
              </span>
              <h2 className="bd-cta-heading">
                Let's Build Something
                <br />
                <span className="bd-text-gradient">Together.</span>
              </h2>
              <p className="bd-cta-text">
                Speak with our engineering architects about leveraging these
                insights for your team.
              </p>
            </div>

            <div className="bd-cta-right">
              <motion.button
                className="bd-cta-btn bd-cta-btn-primary"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/contact')}
              >
                <span className="btn-shine" />
                <span className="bd-cta-btn-icon">
                  <IconRocket />
                </span>
                <span>Contact Our Team</span>
                <span className="bd-cta-btn-arrow">
                  <IconArrowRight />
                </span>
              </motion.button>
              <Link to="/blogs" className="bd-cta-btn bd-cta-btn-ghost">
                <span>Read More Articles</span>
                <span className="bd-cta-btn-arrow">
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

export default BlogDetail;