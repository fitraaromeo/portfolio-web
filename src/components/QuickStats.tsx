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
      icon: <FolderGit2 size={24} />,
      value: '5+',
      label: 'Completed Projects'
    },
    {
      icon: <GitCommit size={24} />,
      value: '500+',
      label: 'Code Commits'
    },
    {
      icon: <Layers size={24} />,
      value: '12+',
      label: 'Technologies Mastered'
    },
    {
      icon: <Award size={24} />,
      value: '2+ Yrs',
      label: 'Development Experience'
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
