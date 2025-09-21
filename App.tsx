import React, { useState, useCallback, createContext, useContext, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import WatermarkingDashboardPage from './pages/WatermarkingDashboardPage';
import SteganographyToolsPage from './pages/SteganographyToolsPage';
import UploadsPage from './pages/UploadsPage';
import KeyVaultPage from './pages/KeyVaultPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';
import TermsPage from './pages/TermsPage';
import TeamPage from './pages/TeamPage';
import { Page, User } from './types';

// --- THEME MANAGEMENT ---
type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
// --- END THEME MANAGEMENT ---


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Default for SSR or non-browser envs
  });

  useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  const isLoggedIn = !!user;

  const login = useCallback(() => {
    // In a real app, this would come from an API
    const mockUser: User = {
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      memberSince: 'September 20, 2023',
      avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`, // Ensure fresh avatar
      plan: 'Pro',
      storageUsed: 420, // MB
      storageTotal: 2048, // MB
      watermarksThisMonth: 83,
      watermarkLimit: 500,
      organisation: 'Stark Industries',
      role: 'Lead Security Analyst',
      location: 'New York, USA',
    };
    setUser(mockUser);
    setCurrentPage('home');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentPage('landing');
  }, []);

  const navigateTo = useCallback((page: Page) => {
    const protectedPages: Page[] = ['home', 'watermarking', 'uploads', 'keyVault', 'profile'];
    if (!isLoggedIn && protectedPages.includes(page)) {
      setCurrentPage('login'); // Redirect to login for protected pages
      return;
    }
    setCurrentPage(page);
  }, [isLoggedIn]);

  const renderPage = () => {
    switch (currentPage) {
      // Public pages
      case 'landing':
        return <LandingPage navigateTo={navigateTo} />;
      case 'login':
        return <LoginPage login={login} navigateTo={navigateTo} />;
      case 'register':
        return <RegisterPage login={login} navigateTo={navigateTo} />;
      case 'steganography':
        return <SteganographyToolsPage isLoggedIn={isLoggedIn} navigateTo={navigateTo} />;
       case 'contact':
        return <ContactPage />;
       case 'team':
        return <TeamPage />;
      case 'policy':
        return <PolicyPage />;
      case 'terms':
        return <TermsPage />;

      // Protected pages
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'watermarking':
        return <WatermarkingDashboardPage />;
      case 'uploads':
        return <UploadsPage />;
      case 'keyVault':
        return <KeyVaultPage />;
      case 'profile':
        return <ProfilePage user={user!} setUser={setUser} />; // user is guaranteed to exist here
      
      default:
        return isLoggedIn ? <HomePage navigateTo={navigateTo} /> : <LandingPage navigateTo={navigateTo} />;
    }
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="flex flex-col min-h-screen font-sans">
        <Header 
          currentPage={currentPage} 
          navigateTo={navigateTo} 
          isLoggedIn={isLoggedIn} 
          logout={logout} 
        />
        <main className="flex-grow container mx-auto px-4 py-8">
           <div key={currentPage} className="animate-fadeInUp">
            {renderPage()}
          </div>
        </main>
        <Footer navigateTo={navigateTo} isLoggedIn={isLoggedIn} />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;