import React from 'react';
import { Cpu, Brain, Server, Layers } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export const TechStackWidget: React.FC = () => {
  const categories: SkillCategory[] = [
    {
      title: 'Artificial Intelligence & ML',
      icon: <Brain size={20} color="var(--accent-primary)" />,
      skills: [
        { name: 'Machine Learning & Deep Learning', level: 95 },
        { name: 'Computer Vision (OpenCV, YOLO, PyTorch)', level: 92 },
        { name: 'Natural Language Processing (NLP)', level: 88 },
        { name: 'Model Deployment & XAI (Explainable AI)', level: 85 }
      ]
    },
    {
      title: 'Backend & Database Architecture',
      icon: <Server size={20} color="var(--accent-secondary)" />,
      skills: [
        { name: 'Python (FastAPI, Flask, PyTorch)', level: 92 },
        { name: 'Node.js & Express API', level: 85 },
        { name: 'Database (SQL, PostgreSQL, MongoDB)', level: 88 },
        { name: 'RESTful API & System Architecture', level: 90 }
      ]
    },
    {
      title: 'Full-Stack & DevOps Ecosystem',
      icon: <Layers size={20} color="var(--accent-primary)" />,
      skills: [
        { name: 'React.js & TypeScript UI', level: 85 },
        { name: 'HTML5, CSS3 & Modern Styling', level: 90 },
        { name: 'Git, GitHub & Version Control', level: 92 },
        { name: 'Linux Command Line & Environments', level: 85 }
      ]
    }
  ];

  return (
    <section id="skills" style={{ marginBottom: '4rem' }}>
      <div className="section-header">
        <div className="section-title">
          <Cpu size={24} color="var(--accent-primary)" />
          <div>
            <h2>Skills & Specializations</h2>
            <p className="section-subtitle">Core focus on Artificial Intelligence, Backend Development, and Full-Stack Integration</p>
          </div>
        </div>
      </div>

      <div className="skills-grid">
        {categories.map((cat, index) => (
          <div key={index} className="skill-category-card">
            <div className="skill-category-header">
              {cat.icon}
              <h3>{cat.title}</h3>
            </div>

            <div className="skills-list">
              {cat.skills.map((skill, idx) => (
                <div key={idx} className="skill-item">
                  <div className="skill-label">
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--accent-primary)' }}>{skill.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
