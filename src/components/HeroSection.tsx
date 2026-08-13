import React from 'react';
import { ArrowRight, Terminal, Cpu } from 'lucide-react';
import profilePhoto from '../assets/Photo.JPEG';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="status-badge" style={{ marginBottom: '1.25rem' }}>
          <Terminal size={14} />
          <span>AI Engineer & Full-Stack Developer</span>
        </div>
        
        <h1>
          Hi, I'm <span className="gradient-text">Fitra Romeo Winky</span>
        </h1>
        
        <p>
          Specialized in <strong>Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, & NLP</strong>. Strong background in <strong>Web Backend & Database</strong> development, capable of engineering complete <strong>Full-Stack Web</strong> applications.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            <span>Explore Projects</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className="hero-card">
        <div className="profile-avatar-wrapper">
          <img src={profilePhoto} alt="Fitra Romeo Winky" className="profile-img" />
        </div>

        <div className="card-title-center">
          <h3>Fitra Romeo Winky</h3>
          <p>AI / ML Engineer • Backend & Full-Stack</p>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          borderRadius: '0.75rem',
          background: 'var(--badge-bg)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.85rem'
        }}>
          <Cpu size={20} color="var(--accent-primary)" />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Focus Areas</div>
            <div style={{ color: 'var(--text-secondary)' }}>AI, Vision, NLP, Backend & DB</div>
          </div>
        </div>
      </div>
    </section>
  );
};
