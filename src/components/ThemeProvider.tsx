
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'vacation' | 'vasa-gym';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Remove all theme classes
    document.documentElement.classList.remove('light', 'dark', 'vacation', 'vasa-gym');
    
    // Add current theme class
    document.documentElement.classList.add(theme);
    
    // Apply theme-specific styles
    const root = document.documentElement;
    
    switch (theme) {
      case 'dark':
        root.style.setProperty('--background', '0 0% 3%');
        root.style.setProperty('--foreground', '0 0% 98%');
        root.style.setProperty('--card', '0 0% 6%');
        root.style.setProperty('--card-foreground', '0 0% 98%');
        root.style.setProperty('--popover', '0 0% 6%');
        root.style.setProperty('--popover-foreground', '0 0% 98%');
        root.style.setProperty('--primary', '220 100% 70%');
        root.style.setProperty('--primary-foreground', '0 0% 5%');
        root.style.setProperty('--secondary', '215 28% 17%');
        root.style.setProperty('--secondary-foreground', '0 0% 98%');
        root.style.setProperty('--muted', '215 28% 17%');
        root.style.setProperty('--muted-foreground', '217 11% 65%');
        root.style.setProperty('--accent', '210 100% 80%');
        root.style.setProperty('--accent-foreground', '0 0% 5%');
        root.style.setProperty('--destructive', '0 75% 60%');
        root.style.setProperty('--destructive-foreground', '0 0% 98%');
        root.style.setProperty('--border', '215 28% 20%');
        root.style.setProperty('--input', '215 28% 20%');
        root.style.setProperty('--ring', '220 100% 70%');
        break;
        
      case 'vacation':
        root.style.setProperty('--background', '195 100% 98%');
        root.style.setProperty('--foreground', '200 30% 15%');
        root.style.setProperty('--card', '195 80% 96%');
        root.style.setProperty('--card-foreground', '200 30% 15%');
        root.style.setProperty('--popover', '195 80% 96%');
        root.style.setProperty('--popover-foreground', '200 30% 15%');
        root.style.setProperty('--primary', '195 100% 45%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '40 100% 85%');
        root.style.setProperty('--secondary-foreground', '30 50% 25%');
        root.style.setProperty('--muted', '195 50% 92%');
        root.style.setProperty('--muted-foreground', '195 20% 45%');
        root.style.setProperty('--accent', '25 100% 60%');
        root.style.setProperty('--accent-foreground', '0 0% 100%');
        root.style.setProperty('--destructive', '350 80% 55%');
        root.style.setProperty('--destructive-foreground', '0 0% 100%');
        root.style.setProperty('--border', '195 40% 85%');
        root.style.setProperty('--input', '195 40% 90%');
        root.style.setProperty('--ring', '195 100% 45%');
        break;
        
      case 'vasa-gym':
        root.style.setProperty('--background', '0 0% 8%');
        root.style.setProperty('--foreground', '210 100% 90%');
        root.style.setProperty('--card', '0 0% 12%');
        root.style.setProperty('--card-foreground', '210 100% 90%');
        root.style.setProperty('--popover', '0 0% 12%');
        root.style.setProperty('--popover-foreground', '210 100% 90%');
        root.style.setProperty('--primary', '10 100% 55%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '35 100% 50%');
        root.style.setProperty('--secondary-foreground', '0 0% 0%');
        root.style.setProperty('--muted', '0 0% 18%');
        root.style.setProperty('--muted-foreground', '210 20% 70%');
        root.style.setProperty('--accent', '210 100% 60%');
        root.style.setProperty('--accent-foreground', '0 0% 100%');
        root.style.setProperty('--destructive', '0 85% 60%');
        root.style.setProperty('--destructive-foreground', '0 0% 100%');
        root.style.setProperty('--border', '0 0% 25%');
        root.style.setProperty('--input', '0 0% 20%');
        root.style.setProperty('--ring', '10 100% 55%');
        break;
        
      default: // light theme
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '0 0% 5%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '0 0% 5%');
        root.style.setProperty('--popover', '0 0% 100%');
        root.style.setProperty('--popover-foreground', '0 0% 5%');
        root.style.setProperty('--primary', '220 100% 40%');
        root.style.setProperty('--primary-foreground', '0 0% 100%');
        root.style.setProperty('--secondary', '210 40% 92%');
        root.style.setProperty('--secondary-foreground', '0 0% 5%');
        root.style.setProperty('--muted', '210 40% 96%');
        root.style.setProperty('--muted-foreground', '215 16% 45%');
        root.style.setProperty('--accent', '210 100% 50%');
        root.style.setProperty('--accent-foreground', '0 0% 100%');
        root.style.setProperty('--destructive', '0 85% 60%');
        root.style.setProperty('--destructive-foreground', '0 0% 100%');
        root.style.setProperty('--border', '214 32% 91%');
        root.style.setProperty('--input', '214 32% 91%');
        root.style.setProperty('--ring', '220 100% 40%');
        break;
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
