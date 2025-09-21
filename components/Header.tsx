import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import { SettingsIcon, UserIcon } from './icons/Icons';
import { LogoIcon } from './icons/LogoIcon';

interface HeaderProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, navigateTo, isLoggedIn, logout }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinkClasses = (page: Page) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      currentPage === page 
      ? 'bg-blue-600 text-white' 
      : 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
    }`;

  return (
    <header className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-md dark:shadow-lg sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700/50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex items-center gap-2 text-slate-900 dark:text-white text-2xl font-bold cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => navigateTo(isLoggedIn ? 'home' : 'landing')}
            >
              <LogoIcon />
              <span>Veil<span className="text-blue-500">Forge</span></span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isLoggedIn ? (
                  <>
                    <button onClick={() => navigateTo('home')} className={navLinkClasses('home')}>Home</button>
                    <button onClick={() => navigateTo('watermarking')} className={navLinkClasses('watermarking')}>Watermark</button>
                    <button onClick={() => navigateTo('steganography')} className={navLinkClasses('steganography')}>Steganography Tools</button>
                    <button onClick={() => navigateTo('uploads')} className={navLinkClasses('uploads')}>Uploads</button>
                    <button onClick={() => navigateTo('keyVault')} className={navLinkClasses('keyVault')}>Key Vault</button>
                  </>
                ) : (
                   <>
                    <button onClick={() => navigateTo('steganography')} className={navLinkClasses('steganography')}>Steganography Tools</button>
                    <button onClick={() => navigateTo('team')} className={navLinkClasses('team')}>Our Team</button>
                    <button onClick={() => navigateTo('contact')} className={navLinkClasses('contact')}>Contact Us</button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             {isLoggedIn ? (
                <>
                    <button onClick={() => navigateTo('profile')} className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition" aria-label="Profile">
                        <UserIcon />
                    </button>
                    <div className="relative" ref={settingsRef}>
                        <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition" aria-label="Settings">
                            <SettingsIcon />
                        </button>
                        {isSettingsOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <button onClick={() => {navigateTo('team'); setIsSettingsOpen(false);}} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700">Our Team</button>
                                <button onClick={() => {navigateTo('contact'); setIsSettingsOpen(false);}} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700">Contact Us</button>
                                <button onClick={() => {navigateTo('policy'); setIsSettingsOpen(false);}} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700">Policy</button>
                                <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-slate-700">Log out</button>
                            </div>
                        )}
                    </div>
                </>
             ) : (
                <button 
                  onClick={() => navigateTo('login')} 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Login
                </button>
             )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;