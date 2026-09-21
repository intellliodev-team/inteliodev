// src/components/ServiceCard.js — Intelliodev.io · Modern Cream Card
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.css';

/* ── Inline SVG icons — no external dependency ───────── */
const TechIcon = ({ tech }) => {
  const t = (tech || '').toLowerCase();

  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (t.includes('react'))
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    );
  if (t.includes('node'))
    return (
      <svg {...common}>
        <path d="M12 2 2 7v10l10 5 10-5V7l-10-5z" />
        <path d="M12 22V12" />
        <path d="M2 7l10 5 10-5" />
      </svg>
    );
  if (t.includes('python'))
    return (
      <svg {...common}>
        <path d="M12 2a5 5 0 0 0-5 5v3h5v1H5a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3h2v-3a3 3 0 0 1 3-3h4a3 3 0 0 0 3-3V7a5 5 0 0 0-5-5z" />
        <circle cx="9" cy="6" r=".5" fill="currentColor" />
        <path d="M12 22a5 5 0 0 0 5-5v-3h-5v-1h7a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3h-2v3a3 3 0 0 1-3 3h-4a3 3 0 0 0-3 3v3a5 5 0 0 0 5 5z" />
        <circle cx="15" cy="18" r=".5" fill="currentColor" />
      </svg>
    );
  if (t.includes('aws'))
    return (
      <svg {...common}>
        <path d="M4 12h16M4 6h16M4 18h16" />
      </svg>
    );
  if (t.includes('docker'))
    return (
      <svg {...common}>
        <rect x="3" y="10" width="4" height="4" />
        <rect x="8" y="10" width="4" height="4" />
        <rect x="13" y="10" width="4" height="4" />
        <rect x="8" y="5" width="4" height="4" />
        <path d="M21 12a3 3 0 0 1-3 3H3" />
      </svg>
    );
  if (t.includes('vue'))
    return (
      <svg {...common}>
        <path d="M2 3h4l6 10L18 3h4L12 21 2 3z" />
        <path d="M7 3h3l2 3 2-3h3" />
      </svg>
    );
  if (t.includes('angular'))
    return (
      <svg {...common}>
        <path d="M12 2 2 5l2 14 8 3 8-3 2-14L12 2z" />
        <path d="M12 6v11" />
      </svg>
    );
  if (t.includes('mongo'))
    return (
      <svg {...common}>
        <path d="M12 2c-2 6-4 9-4 12a4 4 0 0 0 8 0c0-3-2-6-4-12z" />
      </svg>
    );
  if (t.includes('postgres') || t.includes('postgre'))
    return (
      <svg {...common}>
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    );
  if (t.includes('firebase'))
    return (
      <svg {...common}>
        <path d="M4 20 8 4l4 8 4-4 4 12-8 3-8-3z" />
      </svg>
    );
  if (t.includes('next'))
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9 8v8M15 8l-4 6 4 2" />
      </svg>
    );
  if (t.includes('typescript'))
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10h6M10 10v7M15 17c2 0 3-1 3-2s-1-2-3-2-3-1-3-2 1-2 3-2" />
      </svg>
    );
  if (t.includes('stripe'))
    return (
      <svg {...common}>
        <path d="M3 5h18v14H3z" />
        <path d="M8 15c2 0 3-.5 3-1.5s-1.5-1.5-3-2c-1.5-.5-3-1-3-2.5S6 6 8 6" />
      </svg>
    );
  if (t.includes('figma'))
    return (
      <svg {...common}>
        <circle cx="12" cy="6" r="3" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="18" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
      </svg>
    );
  if (t.includes('flutter'))
    return (
      <svg {...common}>
        <path d="M14 2 4 12l3 3 10-10h-3z" />
        <path d="M14 8 8 14l3 3 6-6V8z" />
      </svg>
    );
  if (t.includes('graphql'))
    return (
      <svg {...common}>
        <circle cx="12" cy="4" r="2" />
        <circle cx="4" cy="8" r="2" />
        <circle cx="20" cy="8" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M12 4 4 8M12 4l8 4M4 8l2 10M20 8l-2 10M6 18h12" />
      </svg>
    );
  if (t.includes('kubernetes') || t.includes('k8s'))
    return (
      <svg {...common}>
        <path d="M12 2l8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6l8-4z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  if (t.includes('terraform'))
    return (
      <svg {...common}>
        <path d="M4 4l6 3v6l-6-3V4z" />
        <path d="M14 4l6 3v6l-6-3V4z" />
        <path d="M14 11l6 3v6l-6-3v-6z" />
      </svg>
    );
  if (t.includes('bigquery') || t.includes('sql'))
    return (
      <svg {...common}>
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M12 9v9M9 12h6" />
      </svg>
    );
  if (t.includes('looker'))
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      </svg>
    );

  // default
  return (
    <svg {...common}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 12h6M12 9v6" />
    </svg>
  );
};

const ServiceIcon = ({ name }) => {
  const n = (name || '').toLowerCase();
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (n.includes('robot') || n.includes('ai'))
    return (
      <svg {...common}>
        <rect x="4" y="8" width="16" height="12" rx="3" />
        <circle cx="9" cy="14" r="1.2" fill="currentColor" />
        <circle cx="15" cy="14" r="1.2" fill="currentColor" />
        <path d="M12 8V4M9 4h6M2 14h2M20 14h2" />
      </svg>
    );
  if (n.includes('bullhorn') || n.includes('marketing'))
    return (
      <svg {...common}>
        <path d="M3 11v2a1 1 0 0 0 1 1h2l6 4V6L6 10H4a1 1 0 0 0-1 1z" />
        <path d="M16 8a5 5 0 0 1 0 8" />
      </svg>
    );
  if (n.includes('laptop') || n.includes('code'))
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M2 20h20" />
      </svg>
    );
  if (n.includes('users') || n.includes('team'))
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="10" r="2.5" />
        <path d="M2 20c0-3 3-5 7-5s7 2 7 5" />
        <path d="M15 20c0-2 2-3 4-3s3 1 3 3" />
      </svg>
    );
  if (n.includes('rocket') || n.includes('mvp'))
    return (
      <svg {...common}>
        <path d="M5 15c-1 3-1 4-2 5 1-1 2-1 5-2" />
        <path d="M9 19 5 15l8-11c4-2 7-1 7-1s1 3-1 7L9 19z" />
        <circle cx="14" cy="9" r="1.5" />
      </svg>
    );
  if (n.includes('globe') || n.includes('web'))
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
      </svg>
    );
  if (n.includes('mobile') || n.includes('phone'))
    return (
      <svg {...common}>
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M11 18h2" />
      </svg>
    );
  if (n.includes('infinity') || n.includes('devops'))
    return (
      <svg {...common}>
        <path d="M6 12a3 3 0 1 1 3 3 3 3 0 0 1-3-3z" />
        <path d="M18 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3z" />
        <path d="M6 12c0-3 3-5 6-5s6 2 6 5-3 5-6 5-6-2-6-5z" />
      </svg>
    );
  if (n.includes('check'))
    return (
      <svg {...common}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  if (n.includes('plug') || n.includes('api'))
    return (
      <svg {...common}>
        <path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0V8zM12 18v4" />
      </svg>
    );
  if (n.includes('layer') || n.includes('saas'))
    return (
      <svg {...common}>
        <path d="M12 3 2 8l10 5 10-5-10-5z" />
        <path d="M2 14l10 5 10-5M2 11l10 5 10-5" />
      </svg>
    );
  if (n.includes('cart') || n.includes('ecommerce'))
    return (
      <svg {...common}>
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M2 3h3l2 12h12l2-9H5" />
      </svg>
    );
  if (n.includes('cloud'))
    return (
      <svg {...common}>
        <path d="M18 18H7a5 5 0 1 1 1-9.9A6 6 0 0 1 19 12h-1a3 3 0 0 1 0 6z" />
      </svg>
    );
  if (n.includes('life') || n.includes('support'))
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      </svg>
    );
  if (n.includes('palette') || n.includes('ui') || n.includes('design'))
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="8.5" cy="9.5" r="1.3" fill="currentColor" />
        <circle cx="15.5" cy="9.5" r="1.3" fill="currentColor" />
        <circle cx="8.5" cy="15.5" r="1.3" fill="currentColor" />
        <circle cx="15.5" cy="15.5" r="1.3" fill="currentColor" />
      </svg>
    );
  if (n.includes('comment') || n.includes('consult'))
    return (
      <svg {...common}>
        <path d="M21 12a8 8 0 0 1-12 7l-5 2 2-5A8 8 0 1 1 21 12z" />
      </svg>
    );

  // default — cube
  return (
    <svg {...common}>
      <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.3 7 12 12 20.7 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
};

const ServiceCard = ({ service, index }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -((y - yc) / rect.height) * 6;
    const rotateY = ((x - xc) / rect.width) * 6;
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    }
    setIsHovered(false);
  };

  const handleCardClick = () => {
    navigate(`/services/${service.slug}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.94, rotateX: -8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.55 + index * 0.1 + i * 0.07,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <motion.article
      ref={cardRef}
      className="service-card"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      {/* Rotating conic border */}
      <span className="card-border" aria-hidden="true" />

      {/* Top gradient bar */}
      <span className="card-top-bar" aria-hidden="true" />

      {/* Cursor spotlight */}
      <span className="card-spotlight" aria-hidden="true" />

      {/* Shine sweep */}
      <span className="card-shine" aria-hidden="true" />

      {/* Floating particles */}
      <span className="card-particles" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </span>

      {/* Watermark number */}
      <span className="card-watermark" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Corner accents */}
      <span className="card-corner-tl" aria-hidden="true" />
      <span className="card-corner-br" aria-hidden="true" />

      {/* Header — icon + meta pill */}
      <header className="card-header">
        <motion.div
          className="card-icon-wrap"
          initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
          animate={
            isInView
              ? {
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    delay: 0.2 + index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                    damping: 16,
                  },
                }
              : {}
          }
        >
          <span className="card-icon-ring" aria-hidden="true" />
          <span className="card-icon">
            <ServiceIcon name={service.icon} />
          </span>
        </motion.div>

        <div className="card-meta-pill">
          <span className="card-meta-dot" aria-hidden="true" />
          <span className="card-meta-number">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="card-meta-divider" aria-hidden="true" />
          <span className="card-meta-label">Service</span>
          <span className="card-meta-shine" aria-hidden="true" />
        </div>
      </header>

      {/* Body */}
      <div className="card-body">
        <h3 className="card-title">{service.title}</h3>
        <p className="card-desc">{service.description}</p>
      </div>

      {/* Tech tags */}
      {service.technologies && service.technologies.length > 0 && (
        <div className="card-tags">
          {service.technologies.slice(0, 4).map((tech, i) => (
            <motion.span
              key={tech}
              className="tag"
              variants={tagVariants}
              custom={i}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <span className="tag-icon">
                <TechIcon tech={tech} />
              </span>
              <span className="tag-text">{tech}</span>
            </motion.span>
          ))}
        </div>
      )}

      {/* Footer CTA */}
      <footer className="card-footer">
        <span className="footer-label">
          <span className="footer-label-text">Explore service</span>
          <span className="footer-arrow" aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </span>
      </footer>
    </motion.article>
  );
};

export default ServiceCard;