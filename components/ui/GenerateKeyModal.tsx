import React, { useState } from 'react';
import { CryptoKey } from '../../types';

interface GenerateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyGenerated: (newKey: Omit<CryptoKey, 'id' | 'dateCreated'>) => void;
}

const GenerateKeyModal: React.FC<GenerateKeyModalProps> = ({ isOpen, onClose, onKeyGenerated }) => {
  const [keyLabel, setKeyLabel] = useState('');
  const [passphrase, setPassphrase] = useState('');

  const handleGenerate = () => {
    if (!keyLabel.trim()) {
      // In a real app, you might show a more integrated error message
      alert('Key Label is required.');
      return;
    }

    // In a real app, this would involve complex crypto operations.
    // For now, we just pass the data up.
    // We can use the presence of a passphrase to determine the type for demonstration.
    const keyType = passphrase ? 'RSA-2048' : 'AES-256';

    onKeyGenerated({
      label: keyLabel,
      type: keyType,
    });

    // Reset form and close
    setKeyLabel('');
    setPassphrase('');
    onClose();
  };
  
  const handleClose = () => {
      setKeyLabel('');
      setPassphrase('');
      onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md border border-slate-700 animate-fadeInUp">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-bold">Generate New Key</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-white text-2xl" aria-label="Close">&times;</button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="keyLabel" className="block text-sm font-medium text-gray-300 mb-1">Key Label (required)</label>
            <input
              type="text"
              id="keyLabel"
              value={keyLabel}
              onChange={(e) => setKeyLabel(e.target.value)}
              placeholder="e.g., ResearchDocsKey"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="passphrase" className="block text-sm font-medium text-gray-300 mb-1">Passphrase (optional)</label>
            <input
              type="password"
              id="passphrase"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Enter a passphrase (optional)"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500"
            />
             <p className="text-xs text-gray-500 mt-1">If left blank, a fully random key will be generated. If filled, it will be used in key derivation.</p>
          </div>
        </div>
        <div className="p-6 bg-slate-800/50 border-t border-slate-700 flex justify-end space-x-4 rounded-b-lg">
          <button type="button" onClick={handleClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition">Cancel</button>
          <button 
            onClick={handleGenerate} 
            disabled={!keyLabel.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateKeyModal;
