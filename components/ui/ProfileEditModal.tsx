import React, { useState, useEffect } from 'react';
import { User } from '../../types';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, user, setUser }) => {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user); // Sync form data if user prop changes
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="relative group bg-slate-800 rounded-lg shadow-xl w-full max-w-lg border border-slate-700 animate-fadeInUp overflow-hidden">
        <div className="relative z-20">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <h3 className="text-xl font-bold">Edit Profile</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl" aria-label="Close">&times;</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email (cannot be changed)</label>
                <input type="email" name="email" id="email" value={formData.email} readOnly className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-gray-400 cursor-not-allowed" />
              </div>
              <div>
                <label htmlFor="organisation" className="block text-sm font-medium text-gray-300 mb-1">Organisation</label>
                <input type="text" name="organisation" id="organisation" value={formData.organisation || ''} onChange={handleChange} placeholder="e.g., Stark Industries" className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                <input type="text" name="role" id="role" value={formData.role || ''} onChange={handleChange} placeholder="e.g., Lead Security Analyst" className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <input type="text" name="location" id="location" value={formData.location || ''} onChange={handleChange} placeholder="e.g., New York, USA" className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div className="p-6 bg-slate-800/50 border-t border-slate-700 flex justify-end space-x-4 rounded-b-lg">
              <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition">Cancel</button>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">Save Changes</button>
            </div>
          </form>
        </div>
        <div className="card-shimmer-effect"></div>
      </div>
    </div>
  );
};

export default ProfileEditModal;