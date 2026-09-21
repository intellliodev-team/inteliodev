// src/pages/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from 'framer-motion';
import Hero from '../components/Hero';
import ServicesPreview from '../components/ServicesPreview';
import FeaturedProjects from '../components/FeaturedProjects';
import WhyChoose from '../components/WhyChoose';
import IndustriesSection from '../components/IndustriesSection';
import CaseStudiesSection from '../components/CaseStudiesSection';
import TrustedBySection from '../components/TrustedBySection';
import LatestBlogs from '../components/LatestBlogs';
import TestimonialsSection from '../components/TestimonialsSection';
import CareersSection from '../components/CareersSection';
import CTASection from '../components/CTASection';
import './Home.css';
import CaseStudies from './CaseStudies';
import Template from '../components/Template';
import Proof from '../components/Proof';

// Direct API URL
const API_BASE_URL = 'https://inteldev-production.up.railway.app/api';

// Fallback projects data
const FALLBACK_PROJECTS = [
  {
    _id: 'fallback-1',
    title: 'E-Commerce Platform Development',
    description:
      'Modern e-commerce platform with advanced features and seamless user experience.',
    category: 'Web Development',
    image:
      'https://via.placeholder.com/600x400/F8E8E9/990011?text=E-Commerce',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    _id: 'fallback-2',
    title: 'Mobile App Development',
    description:
      'Cross-platform mobile application with intuitive design and real-time features.',
    category: 'Mobile App',
    image: 'https://via.placeholder.com/600x400/F8E8E9/990011?text=Mobile+App',
    techStack: ['React Native', 'Firebase', 'Redux', 'Node.js'],
  },
  {
    _id: 'fallback-3',
    title: 'AI Solution for Business',
    description:
      'Intelligent AI solution that automates business processes and provides insights.',
    category: 'AI Solution',
    image:
      'https://via.placeholder.com/600x400/F8E8E9/990011?text=AI+Solution',
    techStack: ['Python', 'TensorFlow', 'Docker', 'AWS'],
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [blogs, setBlogs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const homeRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (homeRef.current) {
      homeRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      if (homeRef.current) homeRef.current.scrollTop = 0;
    }, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchWithTimeout = (url, timeout = 8000) => {
        return Promise.race([
          fetch(url),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), timeout)
          ),
        ]);
      };

      const [projectsRes, blogsRes, jobsRes, testimonialsRes] =
        await Promise.all([
          fetchWithTimeout(`${API_BASE_URL}/projects/featured`),
          fetchWithTimeout(`${API_BASE_URL}/blogs`),
          fetchWithTimeout(`${API_BASE_URL}/jobs/featured`),
          fetchWithTimeout(`${API_BASE_URL}/testimonials?featured=true`),
        ]);

      let projectsData = FALLBACK_PROJECTS;
      let blogsData = [];
      let jobsData = [];
      let testimonialsData = [];

      try {
        if (projectsRes && projectsRes.ok) {
          const data = await projectsRes.json();
          if (Array.isArray(data) && data.length > 0) {
            projectsData = data;
          } else {
            projectsData = FALLBACK_PROJECTS;
          }
        } else {
          projectsData = FALLBACK_PROJECTS;
        }
      } catch (e) {
        console.error('Error fetching projects:', e);
        projectsData = FALLBACK_PROJECTS;
      }

      try {
        if (blogsRes && blogsRes.ok) {
          const data = await blogsRes.json();
          if (Array.isArray(data)) blogsData = data;
        }
      } catch (e) {
        console.error('Error fetching blogs:', e);
      }

      try {
        if (jobsRes && jobsRes.ok) {
          const data = await jobsRes.json();
          if (Array.isArray(data)) jobsData = data;
        }
      } catch (e) {
        console.error('Error fetching jobs:', e);
      }

      try {
        if (testimonialsRes && testimonialsRes.ok) {
          const data = await testimonialsRes.json();
          if (Array.isArray(data)) testimonialsData = data;
        }
      } catch (e) {
        console.error('Error fetching testimonials:', e);
      }

      setProjects(projectsData);
      setTestimonials(testimonialsData.slice(0, 3));

      let featuredBlogs = blogsData.filter((b) => b.featured === true);
      if (featuredBlogs.length < 3) {
        const nonFeatured = blogsData.filter((b) => b.featured !== true);
        featuredBlogs = [...featuredBlogs, ...nonFeatured].slice(0, 3);
      }
      setBlogs(featuredBlogs);
      setJobs(jobsData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching home page data:', error);
      setError('Failed to load data. Using fallback content.');
      setProjects(FALLBACK_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    fetchData();
  };

  if (error) {
    return (
      <div className="home-container" ref={homeRef}>
        <Hero />
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Something went wrong</h2>
          <p className="error-message">{error}</p>
          <button onClick={handleRetry} className="btn-primary">
            Retry Loading
          </button>
        </div>
        <FeaturedProjects loading={false} projects={FALLBACK_PROJECTS} />
      </div>
    );
  }

  return (
    <div className="home-container" ref={homeRef}>
      <Template />
      <ServicesPreview />
      <WhyChoose />
      <TrustedBySection />
      <Proof />
    </div>
  );
};

export default Home;