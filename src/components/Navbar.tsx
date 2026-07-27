import React, { useState, useEffect } from 'react';
import { Sun, Moon, Send, Menu, X } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <a href="#hero" className="nav-brand" onClick={() => handleNavClick('hero')}>
        <div className="brand-avatar">
          <span>FRW</span>
        </div>
        <span>Fitra<span className="gradient-text">Romeo</span></span>
      </a>

      <div className="nav-actions" style={{ gap: '0.5rem' }}>
        <button 
          className="mobile-toggle-btn"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle Mobile Menu"
          title="Toggle Navigation Menu"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <ul className={`nav-links ${isMobileOpen ? 'open' : ''}`}>
        <li>
          <a 
            href="#hero" 
            className={`nav-item ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={() => handleNavClick('hero')}
          >
            Dashboard
          </a>
        </li>
        <li>
          <a 
            href="#projects" 
            className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => handleNavClick('projects')}
          >
            Projects
          </a>
        </li>
        <li>
          <a 
            href="#contact" 
            className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            Contact
          </a>
        </li>
      </ul>

      <div className="nav-actions">
        <div className="status-badge" title="Open for freelance and full-time opportunities">
          <span className="pulse-dot"></span>
          <span style={{ fontSize: '0.8rem' }}>Available for Hire</span>
        </div>

        <button 
          className="theme-toggle" 
          onClick={onToggleTheme}
          aria-label="Toggle Theme"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
          <Send size={15} />
          <span>Hire Me</span>
        </a>
      </div>
    </nav>
  );
};
