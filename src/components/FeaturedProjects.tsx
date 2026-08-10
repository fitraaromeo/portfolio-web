import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, Lock, X, ShieldAlert, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

import iuranHubImg from '../assets/Iuran Hub.png';
import siakadImg from '../assets/Siakad UM Manado.png';
import carDamageImg from '../assets/Car Damage Detection YOLOv12n.png';
import otoscanImg from '../assets/otoscan.png';

interface Project {
  id: number;
  title: string;
  shortDesc: string;
  description: string;
  longDescription?: string;
  tags: string[];
  imageSrc?: string;
  bannerIcon?: React.ReactNode;
  githubUrl?: string;
  isPrivate?: boolean;
  category: string;
}

const SLIDE_INTERVAL = 4500;

export const FeaturedProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'OtoScan AI',
      shortDesc: 'Intelligent Vehicle Inspection System',
      description: 'Sistem inspeksi fisik kendaraan berbasis kecerdasan buatan dengan YOLOv12 Computer Vision. Monorepo dengan Flutter, Go Fiber API, dan Python FastAPI terintegrasi penuh.',
      longDescription: 'OtoScan AI adalah sistem inspeksi kendaraan full-stack berarsitektur microservice (Monorepo). Frontend Flutter multi-platform mengirimkan foto 4-sisi kendaraan ke Go Fiber REST API, yang meneruskannya ke Python FastAPI AI service untuk inferensi YOLOv12. Model mendeteksi 6 jenis kerusakan: dent, scratch, crack, glass shatter, lamp broken, dan tire flat — hasilnya dikembalikan sebagai annotated bounding box image dan laporan JSON ke Flutter secara real-time.',
      tags: ['Flutter', 'Go Fiber', 'FastAPI', 'YOLOv12', 'PostgreSQL', 'Computer Vision'],
      imageSrc: otoscanImg,
      githubUrl: 'https://github.com/fitraaromeo/Otoscan-AI',
      category: 'AI / Full-Stack'
    },
    {
      id: 2,
      title: 'Car Damage Detection',
      shortDesc: 'AI-Powered Damage Classifier',
      description: 'Sistem AI untuk mengidentifikasi & mendeteksi tingkat kerusakan mobil berbasis model YOLOv12n yang terintegrasi dengan web engine FastAPI.',
      longDescription: 'Proyek Computer Vision yang menggabungkan model deteksi objek mutakhir YOLOv12n untuk mendeteksi lokasi dan jenis kerusakan kendaraan secara real-time. Sistem diintegrasikan ke dalam antarmuka web performa tinggi berbasis Python FastAPI.',
      tags: ['YOLOv12n', 'FastAPI', 'Computer Vision', 'Python', 'AI Model'],
      imageSrc: carDamageImg,
      githubUrl: 'https://github.com/fitraaromeo/car-damage-detection-using-yolov12n',
      category: 'Computer Vision'
    },
    {
      id: 3,
      title: 'Honeypot Data Analysis',
      shortDesc: 'Anomaly Detection with Isolation Forest',
      description: 'Sistem deteksi anomali untuk mengidentifikasi pola serangan dalam data honeypot menggunakan Isolation Forest, 10+ feature engineering, dan klasifikasi jenis serangan otomatis.',
      longDescription: 'Sistem deteksi anomali dan analisis keamanan honeypot berbasis Machine Learning (Unsupervised Isolation Forest). Mengimplementasikan 10+ fitur engineering (entropy, command length, suspicious pattern count, recon commands), mengklasifikasi 7 jenis serangan (Reconnaissance, Data Exfiltration, Malware Deployment, Privilege Escalation, Persistence, Command Injection, Web Exploit), serta memberikan rating keparahan (Critical, High, Medium, Low) secara otomatis.',
      tags: ['Isolation Forest', 'Python', 'Scikit-Learn', 'Cybersecurity', 'ML'],
      bannerIcon: <ShieldAlert className="project-banner-icon" />,
      isPrivate: true,
      category: 'Machine Learning'
    },
    {
      id: 4,
      title: 'Iuran Hub',
      shortDesc: 'Digital Community Finance Platform',
      description: 'Aplikasi platform digital untuk mengelola dana kas dan iuran warga di area komplek secara transparan dan terstruktur.',
      longDescription: 'Iuran Hub adalah solusi manajemen keuangan digital yang dirancang untuk mengelola kas warga komplek perumahan. Aplikasi ini dibangun dengan kombinasi Laravel sebagai API backend, React untuk antarmuka pengguna yang cepat dan responsif, serta MySQL untuk penyimpanan data relasional yang aman.',
      tags: ['Laravel', 'React', 'MySQL', 'Full-Stack'],
      imageSrc: iuranHubImg,
      githubUrl: 'https://github.com/fitraaromeo/iuran-hub',
      category: 'Full-Stack Web'
    },
    {
      id: 5,
      title: 'Siakad UM Manado',
      shortDesc: 'Academic Information System API',
      description: 'Sistem Informasi Akademik Universitas Muhammadiyah Manado. Fokus pada penyediaan RESTful API backend dan arsitektur database relasional performa tinggi.',
      longDescription: 'Sistem Informasi Akademik (SIAKAD) untuk Universitas Muhammadiyah Manado. Pada proyek ini, peran utama meliputi perancangan dan penyediaan RESTful API menggunakan Laravel serta pengelolaan arsitektur database performa tinggi berbasis PostgreSQL.',
      tags: ['Laravel API', 'PostgreSQL', 'Backend', 'Database Admin'],
      imageSrc: siakadImg,
      isPrivate: true,
      category: 'Backend'
    },
  ];

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goPrev = useCallback(() => {
    goToSlide((activeSlide - 1 + projects.length) % projects.length);
  }, [activeSlide, goToSlide, projects.length]);

  const goNext = useCallback(() => {
    goToSlide((activeSlide + 1) % projects.length);
  }, [activeSlide, goToSlide, projects.length]);

  // Auto-slide
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % projects.length);
    }, SLIDE_INTERVAL);
  }, [projects.length]);

  useEffect(() => {
    if (!isPaused) {
      startInterval();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startInterval]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentProject = projects[activeSlide];

  return (
    <section id="projects" style={{ marginBottom: '4rem' }}>
      <div className="section-header">
        <div className="section-title">
          <Sparkles size={24} color="var(--accent-primary)" />
          <div>
            <h2>Proyek Unggulan</h2>
            <p className="section-subtitle">Klik pada kartu proyek untuk melihat detail lengkap</p>
          </div>
        </div>
      </div>

      {/* ── Auto-Sliding Featured Carousel ── */}
      <div
        className="featured-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slide Track */}
        <div
          className="featured-slide"
          key={activeSlide}
          onClick={() => setSelectedProject(currentProject)}
          title="Klik untuk detail proyek"
        >
          {/* Left: Image */}
          <div className="featured-slide-image">
            {currentProject.imageSrc ? (
              <img src={currentProject.imageSrc} alt={currentProject.title} />
            ) : (
              <div className="featured-slide-icon-placeholder">
                {currentProject.bannerIcon || <ShieldAlert size={72} color="var(--accent-primary)" />}
              </div>
            )}
            <div className="featured-slide-overlay" />
          </div>

          {/* Right: Content */}
          <div className="featured-slide-content">
            <div className="featured-slide-badges">
              <span className="project-category-badge">{currentProject.category}</span>
              {activeSlide === 0 && (
                <span className="project-category-badge project-badge-green">⭐ Latest</span>
              )}
            </div>

            <h3 className="project-featured-title">{currentProject.title}</h3>
            <p className="project-featured-subtitle">{currentProject.shortDesc}</p>
            <p className="project-featured-desc">{currentProject.description}</p>

            <div className="project-tech-tags" style={{ marginBottom: '1.5rem' }}>
              {currentProject.tags.map((tag, idx) => (
                <span key={idx} className="tech-tag">{tag}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {currentProject.githubUrl ? (
                <a
                  href={currentProject.githubUrl}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: '0.875rem', padding: '0.55rem 1.1rem' }}
                >
                  <GithubIcon size={16} />
                  <span>Source Code</span>
                </a>
              ) : currentProject.isPrivate ? (
                <div className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.55rem 1.1rem', cursor: 'default', opacity: 0.8 }}>
                  <Lock size={16} />
                  <span>Private Repo</span>
                </div>
              ) : null}
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.875rem', padding: '0.55rem 1.1rem' }}
                onClick={e => { e.stopPropagation(); setSelectedProject(currentProject); }}
              >
                <ExternalLink size={16} />
                <span>Detail</span>
              </button>
            </div>
          </div>
        </div>

        {/* Controls: Prev / Next Arrows */}
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={e => { e.stopPropagation(); goPrev(); }}
          aria-label="Previous project"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={e => { e.stopPropagation(); goNext(); }}
          aria-label="Next project"
        >
          <ChevronRight size={20} />
        </button>

        {/* Bottom Bar: Dot Indicators + Progress Bar */}
        <div className="carousel-footer">
          <div className="carousel-dots">
            {projects.map((_, idx) => (
              <button
                key={idx}
                className={`carousel-dot ${idx === activeSlide ? 'active' : ''}`}
                onClick={e => { e.stopPropagation(); goToSlide(idx); }}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
          <span className="carousel-counter">
            {activeSlide + 1} / {projects.length}
          </span>
        </div>

        {/* Auto-progress bar */}
        {!isPaused && (
          <div className="carousel-progress-bar" key={`${activeSlide}-${isPaused}`} />
        )}
      </div>

      {/* ── All Projects Grid ── */}
      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-card ${project.id === projects[activeSlide].id ? 'project-card-highlighted' : ''}`}
            onClick={() => setSelectedProject(project)}
            title="Klik untuk membuka detail proyek"
          >
            <div className="project-banner">
              {project.imageSrc ? (
                <img src={project.imageSrc} alt={project.title} loading="lazy" />
              ) : (
                project.bannerIcon || <ShieldAlert className="project-banner-icon" />
              )}
              <span className="project-banner-category">{project.category}</span>
            </div>

            <div className="project-body">
              <p className="project-short-desc">{project.shortDesc}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="project-tech-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="tech-tag">{tag}</span>
                ))}
              </div>

              <div className="project-footer">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    className="project-link"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GithubIcon size={16} />
                    <span>Source Code</span>
                  </a>
                ) : project.isPrivate ? (
                  <div className="project-link" style={{ cursor: 'default', opacity: 0.75 }}>
                    <Lock size={15} color="var(--text-secondary)" />
                    <span style={{ fontSize: '0.85rem' }}>Private Repository</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Detail Modal ── */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
              title="Tutup (Esc)"
            >
              <X size={20} />
            </button>

            <div className="modal-banner">
              {selectedProject.imageSrc ? (
                <img src={selectedProject.imageSrc} alt={selectedProject.title} />
              ) : (
                <div style={{ padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedProject.bannerIcon || <ShieldAlert size={80} color="var(--accent-primary)" />}
                </div>
              )}
            </div>

            <div className="modal-content">
              <span className="project-category-badge" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>
                {selectedProject.category}
              </span>
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.longDescription || selectedProject.description}</p>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Teknologi Utama:
                </div>
                <div className="project-tech-tags">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag" style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {selectedProject.githubUrl ? (
                  <a
                    href={selectedProject.githubUrl}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubIcon size={18} />
                    <span>Kunjungi Repositori GitHub</span>
                  </a>
                ) : selectedProject.isPrivate ? (
                  <div className="btn btn-secondary" style={{ cursor: 'default', opacity: 0.8 }}>
                    <Lock size={18} />
                    <span>Private Repository (Internal / Non-Public)</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
