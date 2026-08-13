import React, { useState } from 'react';
import { Phone, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from './SocialIcons';

export const ContactBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const waNumber = "081259306280";

  const handleCopyWa = () => {
    navigator.clipboard.writeText(waNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="contact-banner">
      <h2>Let's Collaborate with Fitra!</h2>
      <p>
        I am open to freelance projects, web application development, and career opportunities. Send a message via WhatsApp or connect with me on social media.
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          padding: '0.6rem 1.25rem',
          borderRadius: '0.75rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.95rem'
        }}>
          <Phone size={18} color="var(--accent-primary)" />
          <span>WhatsApp: {waNumber}</span>
        </div>

        <button className="btn btn-primary" onClick={handleCopyWa}>
          {copied ? <Check size={18} /> : <Copy size={18} />}
          <span>{copied ? 'Copied Number!' : 'Copy WA Number'}</span>
        </button>

        <a 
          href="https://wa.me/6281259306280" 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-secondary"
          style={{ textDecoration: 'none' }}
        >
          <WhatsappIcon size={18} />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      <div className="social-links">
        <a href="https://github.com/fitraaromeo" target="_blank" rel="noreferrer" className="social-btn" title="GitHub - @fitraaromeo">
          <GithubIcon size={20} />
        </a>
        <a href="https://www.linkedin.com/in/fitraaromeo" target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn - @fitraaromeo">
          <LinkedinIcon size={20} />
        </a>
        <a href="https://instagram.com/fitraaromeo" target="_blank" rel="noreferrer" className="social-btn" title="Instagram - @fitraaromeo">
          <InstagramIcon size={20} />
        </a>
        <a href="https://wa.me/6281259306280" target="_blank" rel="noreferrer" className="social-btn" title="WhatsApp - 081259306280">
          <WhatsappIcon size={20} />
        </a>
      </div>
    </section>
  );
};
