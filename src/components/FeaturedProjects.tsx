import React, { useState, useEffect } from 'react';
import { Sparkles, Lock, X } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

import iuranHubImg from '../assets/Iuran Hub.png';
import siakadImg from '../assets/Siakad UM Manado.png';
import carDamageImg from '../assets/Car Damage Detection YOLOv12n.png';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  imageSrc: string;
  githubUrl?: string;
  isPrivate?: boolean;
}

export const FeaturedProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Iuran Hub',
      description: 'Aplikasi platform digital untuk mengelola dana kas dan iuran warga di area komplek secara transparan dan terstruktur.',
      longDescription: 'Iuran Hub adalah solusi manajemen keuangan digital yang dirancang untuk mengelola kas warga komplek perumahan. Aplikasi ini dibangun dengan kombinasi Laravel sebagai API backend, React untuk antarmuka pengguna yang cepat dan responsif, serta MySQL untuk penyimpanan data relasional yang aman.',
      tags: ['Laravel', 'React', 'MySQL', 'Full-Stack'],
      imageSrc: iuranHubImg,
      githubUrl: 'https://github.com/fitraaromeo/iuran-hub'
    },
    {
      id: 2,
      title: 'Siakad UM Manado',
      description: 'Sistem Informasi Akademik Universitas Muhammadiyah Manado. Fokus pada penyediaan RESTful API backend dan arsitektur database relasional.',
      longDescription: 'Sistem Informasi Akademik (SIAKAD) untuk Universitas Muhammadiyah Manado. Pada proyek ini, peran utama meliputi perancangan dan penyediaan RESTful API menggunakan Laravel serta pengelolaan arsitektur database performa tinggi berbasis PostgreSQL.',
      tags: ['Laravel API', 'PostgreSQL', 'Backend', 'Database Admin'],
      imageSrc: siakadImg,
      isPrivate: true
    },
    {
      id: 3,
      title: 'Car Damage Detection',
      description: 'Sistem AI untuk mengidentifikasi & mendeteksi tingkat kerusakan mobil berbasis model YOLOv12n yang terintegrasi dengan web engine FastAPI.',
      longDescription: 'Proyek Computer Vision yang menggabungkan model deteksi objek mutakhir YOLOv12n untuk mendeteksi lokasi dan jenis kerusakan kendaraan secara real-time. Sistem diintegrasikan ke dalam antarmuka web performa tinggi berbasis Python FastAPI.',
      tags: ['YOLOv12n', 'FastAPI', 'Computer Vision', 'Python', 'AI Model'],
      imageSrc: carDamageImg,
      githubUrl: 'https://github.com/fitraaromeo/car-damage-detection-using-yolov12n'
    }
  ];

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="projects" style={{ marginBottom: '4rem' }}>
      <div className="section-header">
        <div className="section-title">
          <Sparkles size={24} color="var(--accent-primary)" />
          <div>
            <h2>Proyek Unggulan</h2>
            <p className="section-subtitle">Klik pada kartu proyek untuk melihat detail lengkap & gambar yang membesar</p>
          </div>
        </div>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => setSelectedProject(project)}
            title="Klik untuk membuka detail proyek"
          >
            <div className="project-banner">
              <img src={project.imageSrc} alt={project.title} loading="lazy" />
            </div>

            <div className="project-body">
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

      {/* Enlarged Detail Popup Modal */}
      {selectedProject && (
        <div 
          className="modal-overlay" 
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="modal-container" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
              title="Tutup (Esc)"
            >
              <X size={20} />
            </button>

            <div className="modal-banner">
              <img src={selectedProject.imageSrc} alt={selectedProject.title} />
            </div>

            <div className="modal-content">
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
