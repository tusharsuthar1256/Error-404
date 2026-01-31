
import React, { useState, useEffect, useMemo } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  useLocation
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import Dashboard from './pages/Dashboard';
import { ThemeContext } from './context/ThemeContext';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const themeValue = useMemo(() => ({ darkMode, toggleTheme }), [darkMode]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <Router>
        <div className="min-h-screen transition-colors duration-300">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/auth" 
              element={<AuthPage onLogin={() => setIsAuthenticated(true)} />} 
            />
            <Route 
              path="/onboarding" 
              element={
                isAuthenticated ? 
                <OnboardingPage onComplete={() => setHasOnboarded(true)} /> : 
                <Navigate to="/auth" />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                (hasOnboarded ? <Dashboard /> : <Navigate to="/onboarding" />) : 
                <Navigate to="/auth" />
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
