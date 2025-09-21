import React, { useState, useCallback } from 'react';
import { UploadIcon } from '../icons/Icons';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, title }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleUpload = () => {
    if (!file) return;
    // Mock upload logic
    console.log('Uploading file:', file.name);
    // In a real app, you would have an onUpload(file) prop
    onClose(); // Close modal after "upload"
    setFile(null); // Reset file state
  };
  
  const handleClose = () => {
    setFile(null);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-white text-2xl" aria-label="Close">&times;</button>
        </div>
        <div className="p-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'border-blue-500 bg-gray-700/50' : 'border-gray-600 hover:border-gray-500'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('modal-file-input')?.click()}
          >
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-300">Drag & drop a file here</p>
            <p className="text-sm text-gray-500">or click to select a file</p>
            <input type="file" id="modal-file-input" className="sr-only" onChange={handleFileChange} />
          </div>
          {file && (
            <div className="mt-4 bg-gray-700 p-3 rounded-lg text-sm text-gray-300">
              Selected file: <span className="font-semibold">{file.name}</span>
            </div>
          )}
        </div>
        <div className="p-6 bg-gray-800/50 border-t border-gray-700 flex justify-end space-x-4 rounded-b-lg">
          <button onClick={handleClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition">Cancel</button>
          <button 
            onClick={handleUpload} 
            disabled={!file} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-blue-800 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
