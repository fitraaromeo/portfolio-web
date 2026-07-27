import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickStats } from './components/QuickStats';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ContactBanner } from './components/ContactBanner';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      
      <main>
        <HeroSection />
        <QuickStats />
        <FeaturedProjects />
        <ContactBanner />
      </main>

      <footer className="footer">
        <div>
          © {new Date().getFullYear()} Fitra Romeo Winky. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#hero" className="nav-item">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
