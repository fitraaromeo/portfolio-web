import React from 'react';
import { FolderGit2, GitCommit, Layers, Award } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export const QuickStats: React.FC = () => {
  const stats: StatItem[] = [
    {
      icon: <FolderGit2 size={22} />,
      value: '5+',
      label: 'Projects Shipped'
    },
    {
      icon: <GitCommit size={22} />,
      value: '500+',
      label: 'Code Commits'
    },
    {
      icon: <Layers size={22} />,
      value: '15+',
      label: 'Technologies'
    },
    {
      icon: <Award size={22} />,
      value: '2+ Yrs',
      label: 'Experience'
    }
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon-wrapper">
            {stat.icon}
          </div>
          <div className="stat-info">
            <h4>{stat.value}</h4>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
