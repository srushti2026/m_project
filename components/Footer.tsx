import React from 'react';
import { Page } from '../types';
import { GithubIcon, BlogIcon } from './icons/Icons';

interface FooterProps {
  navigateTo: (page: Page) => void;
  isLoggedIn: boolean;
}

const Footer: React.FC<FooterProps> = ({ navigateTo, isLoggedIn }) => {
  const linkClasses = "text-slate-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer";

  const handleLinkClick = (page: Page) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(page);
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700/50 mt-16">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-slate-900 dark:text-white text-2xl font-bold">Veil<span className="text-blue-500">Forge</span></h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-gray-400">Securing your digital assets with modern steganography.</p>
             <div className="flex space-x-4 mt-4">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={linkClasses}><BlogIcon /></a>
                <a href="#" className={linkClasses}><GithubIcon /></a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {isLoggedIn ? (
                <>
                  <li><a href="#" onClick={handleLinkClick('home')} className={linkClasses}>Home</a></li>
                  <li><a href="#" onClick={handleLinkClick('watermarking')} className={linkClasses}>Dashboard</a></li>
                  <li><a href="#" onClick={handleLinkClick('uploads')} className={linkClasses}>Uploads</a></li>
                </>
              ) : (
                 <li><a href="#" onClick={handleLinkClick('steganography')} className={linkClasses}>Steganography Tools</a></li>
              )}
               <li><a href="#" onClick={handleLinkClick('keyVault')} className={linkClasses}>Key Vault</a></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" onClick={handleLinkClick('policy')} className={linkClasses}>Privacy Policy</a></li>
              <li><a href="#" onClick={handleLinkClick('terms')} className={linkClasses}>Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="#" onClick={handleLinkClick('team')} className={linkClasses}>Our Team</a></li>
              <li><a href="#" onClick={handleLinkClick('contact')} className={linkClasses}>Contact Us</a></li>
              <li><span className="text-sm text-slate-600 dark:text-gray-400">support@veilforge.com</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-6 text-center text-sm text-slate-500 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} VeilForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;