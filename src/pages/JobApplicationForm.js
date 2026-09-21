// JobApplicationForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './JobApplicationForm.css';

const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

const JobApplicationForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    coverLetter: '',
  });

  useEffect(() => {
    fetchJobDetails();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/jobs/${slug}`);
      if (!response.ok) throw new Error('The job opening you are applying for could not be found.');
      const data = await response.json();
      setJob(data);
    } catch (err) {
      setError(err.message || 'Error loading job details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeError('');
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      const isValidExt = ['pdf', 'doc', 'docx'].includes(ext);
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isValidExt) {
        setResumeError('Only PDF, DOC, and DOCX files are allowed!');
        setResumeFile(null);
        e.target.value = null;
        return;
      }
      if (!isLt5M) {
        setResumeError('File size exceeds 5MB limit.');
        setResumeFile(null);
        e.target.value = null;
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!job) return;

    if (!resumeFile) {
      setResumeError('Resume file is required.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('jobId', job._id);
      submitData.append('jobTitle', job.title);
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('location', formData.location);
      submitData.append('linkedin', formData.linkedin);
      submitData.append('portfolio', formData.portfolio);
      submitData.append('coverLetter', formData.coverLetter);
      submitData.append('resume', resumeFile);

      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        let errorMessage = 'Failed to submit application.';
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = `Server error (${response.status}): ${response.statusText || 'Unable to process request'}`;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Animations ────────────────────────────────────────────────────
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
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
        <p>Loading application form...</p>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="error-container">
        <div className="error-icon-wrap">
          <i className="fas fa-triangle-exclamation"></i>
        </div>
        <h2>Error loading job opening</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/careers')} className="btn-primary">
          <i className="fas fa-arrow-left"></i>
          Back to Careers
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <main className="application-success-page">
        <div className="container">
          <motion.div
            className="success-card"
            variants={successVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="success-icon-wrapper">
              <motion.div
                className="success-icon-ring"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <i className="fas fa-check"></i>
              </motion.div>
            </div>
            <h2>Application Submitted!</h2>
            <p>
              Thank you for applying for the <strong>{job?.title}</strong> position.
              Our recruitment team will review your application and contact you
              via email or phone if your profile matches our requirements.
            </p>
            <div className="success-actions">
              <Link to="/careers" className="btn-primary">
                <i className="fas fa-briefcase"></i>
                Back to Careers
                <i className="fas fa-arrow-right btn-arrow"></i>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="job-application-page">
      {/* Scroll Progress */}
      <motion.div
        className="application-scroll-progress"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      {/* HERO SECTION */}
      <section className="application-hero">
        <div className="application-hero-bg">
          <div className="application-hero-orb application-hero-orb-1"></div>
          <div className="application-hero-orb application-hero-orb-2"></div>
        </div>

        <div className="container">
          <motion.div
            className="application-hero-content"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            {/* Breadcrumb */}
            <motion.div
              className="application-breadcrumb"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Link to="/careers">Careers</Link>
              <span className="separator">/</span>
              <Link to={`/careers/${slug}`}>{job?.title}</Link>
              <span className="separator">/</span>
              <span className="current">Apply</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              className="application-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
            >
              <i className="fas fa-paper-plane"></i>
              <span>Apply Now</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="application-main-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              Submit Your Application
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="application-subtitle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <i className="fas fa-briefcase"></i>
              {job?.title}
              <span className="dot">·</span>
              <i className="fas fa-building"></i>
              {job?.department}
              <span className="dot">·</span>
              <i className="fas fa-location-dot"></i>
              {job?.location}
            </motion.p>

            {/* Gradient Line */}
            <motion.div
              className="application-gradient-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            />
          </motion.div>
        </div>

        {/* Wave */}
        <div className="application-hero-wave">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path
              d="M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,60 L1440,120 L0,120 Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="application-form-section">
        <div className="container">
          <motion.div
            className="application-form-wrapper"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Form Header */}
            <div className="form-header">
              <div className="form-header-icon">
                <i className="fas fa-file-pen"></i>
              </div>
              <div className="form-header-text">
                <h2>Personal Information</h2>
                <p>Fields marked <span className="required">*</span> are required</p>
              </div>
            </div>

            {error && (
              <motion.div
                className="form-error-alert"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <i className="fas fa-circle-exclamation"></i>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="application-form">
              <motion.div
                className="form-grid"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {/* Full Name */}
                <motion.div className="form-group" custom={0} variants={inputVariants}>
                  <label htmlFor="fullName">
                    Full Name <span className="required">*</span>
                  </label>
                  <div className="input-wrap">
                    <i className="fas fa-user input-icon"></i>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div className="form-group" custom={1} variants={inputVariants}>
                  <label htmlFor="email">
                    Email Address <span className="required">*</span>
                  </label>
                  <div className="input-wrap">
                    <i className="fas fa-envelope input-icon"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div className="form-group" custom={2} variants={inputVariants}>
                  <label htmlFor="phone">
                    Phone Number <span className="required">*</span>
                  </label>
                  <div className="input-wrap">
                    <i className="fas fa-phone input-icon"></i>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div className="form-group" custom={3} variants={inputVariants}>
                  <label htmlFor="location">
                    Location <span className="required">*</span>
                  </label>
                  <div className="input-wrap">
                    <i className="fas fa-location-dot input-icon"></i>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="Austin, TX"
                    />
                  </div>
                </motion.div>

                {/* LinkedIn */}
                <motion.div className="form-group" custom={4} variants={inputVariants}>
                  <label htmlFor="linkedin">LinkedIn Profile</label>
                  <div className="input-wrap">
                    <i className="fab fa-linkedin input-icon"></i>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </motion.div>

                {/* Portfolio */}
                <motion.div className="form-group" custom={5} variants={inputVariants}>
                  <label htmlFor="portfolio">Portfolio URL</label>
                  <div className="input-wrap">
                    <i className="fas fa-globe input-icon"></i>
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://myportfolio.com"
                    />
                  </div>
                </motion.div>

                {/* Resume Upload */}
                <motion.div className="form-group full-width" custom={6} variants={inputVariants}>
                  <label htmlFor="resume">
                    Resume Upload <span className="required">*</span>
                    <span className="file-hint">PDF, DOC, DOCX · Max 5MB</span>
                  </label>
                  <div className="file-upload-wrapper">
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                    />
                    <div className="file-upload-area">
                      <div className="file-upload-icon">
                        <i className="fas fa-cloud-arrow-up"></i>
                      </div>
                      <div className="file-upload-text">
                        <span className="file-upload-title">Click to upload your resume</span>
                        <span className="file-upload-subtitle">or drag and drop</span>
                      </div>
                    </div>
                  </div>
                  {resumeFile && (
                    <motion.div
                      className="selected-file"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <i className="fas fa-file-circle-check"></i>
                      <span className="file-name">{resumeFile.name}</span>
                      <span className="file-size">({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                      <button
                        type="button"
                        className="file-remove"
                        onClick={() => {
                          setResumeFile(null);
                          document.getElementById('resume').value = null;
                        }}
                        aria-label="Remove file"
                      >
                        <i className="fas fa-xmark"></i>
                      </button>
                    </motion.div>
                  )}
                  {resumeError && (
                    <div className="form-error-text">
                      <i className="fas fa-circle-exclamation"></i>
                      {resumeError}
                    </div>
                  )}
                </motion.div>

                {/* Cover Letter */}
                <motion.div className="form-group full-width" custom={7} variants={inputVariants}>
                  <label htmlFor="coverLetter">Cover Letter</label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows="5"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us why you are interested in this position and what makes you a great fit..."
                  />
                </motion.div>
              </motion.div>

              {/* Form Actions */}
              <motion.div
                className="form-actions"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Link to={`/careers/${slug}`} className="btn-secondary cancel-btn">
                  <i className="fas fa-xmark"></i>
                  Cancel
                </Link>
                <motion.button
                  type="submit"
                  className="btn-primary submit-btn"
                  disabled={submitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Submit Application
                      <i className="fas fa-arrow-right btn-arrow"></i>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="application-cta">
        <div className="container">
          <motion.div
            className="cta-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="cta-box">
              <div className="cta-content">
                <span className="cta-badge">
                  <i className="fas fa-circle-question"></i>
                  Questions?
                </span>
                <h2>Need Help With Your Application?</h2>
                <p>
                  If you have any questions about the application process or
                  the role, reach out to our recruitment team.
                </p>
                <Link to="/contact" className="btn-primary cta-btn">
                  <i className="fas fa-envelope"></i>
                  Contact Recruitment
                  <i className="fas fa-arrow-right btn-arrow"></i>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default JobApplicationForm;