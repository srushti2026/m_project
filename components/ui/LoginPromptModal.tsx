import React from 'react';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({ isOpen, onLogin, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-start justify-center p-4 pt-24" aria-modal="true" role="dialog">
      <div className="relative group bg-slate-800 rounded-lg shadow-xl w-full max-w-md border border-slate-700 animate-fadeInUp overflow-hidden">
        <div className="relative z-20 p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/20 mb-4">
                <svg className="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
          <h3 className="text-2xl font-bold text-white">Unlock Your Full Potential</h3>
          <div className="mt-2">
            <p className="text-md text-gray-400">
              Create a free account or log in to save your steganography history. Track your work and access it from anywhere.
            </p>
          </div>
          <div className="mt-8 space-y-3">
             <button
              onClick={onLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95"
            >
              Login / Register
            </button>
            <button
              onClick={onClose}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95"
            >
              Continue as Guest
            </button>
          </div>
        </div>
        <div className="card-shimmer-effect"></div>
      </div>
    </div>
  );
};

export default LoginPromptModal;