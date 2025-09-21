import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { User, ActivityItem } from '../types';
import ProfileEditModal from '../components/ui/ProfileEditModal';

interface ProfilePageProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const recentActivity: ActivityItem[] = [
    { id: '1', action: 'File Watermarked', details: 'annual_report.docx', timestamp: '2 hours ago' },
    { id: '2', action: 'File Uploaded', details: 'logo_final_v2.png', timestamp: '1 day ago' },
    { id: '3', action: 'Key Generated', details: 'project_gamma_key', timestamp: '3 days ago' },
    { id: '4', action: 'Profile Updated', details: 'User name changed', timestamp: '5 days ago' },
];

const ProfilePage: React.FC<ProfilePageProps> = ({ user, setUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const storagePercentage = (user.storageUsed / user.storageTotal) * 100;
    const watermarkPercentage = (user.watermarksThisMonth / user.watermarkLimit) * 100;

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* --- Profile Details --- */}
                    <Card>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <img 
                                src={user.avatarUrl} 
                                alt="User Avatar"
                                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                            />
                            <div className="flex-1 text-center sm:text-left">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                                <p className="text-lg text-slate-600 dark:text-gray-400">{user.email}</p>
                                <p className="text-sm text-slate-500 dark:text-gray-500 mt-2">Member since {user.memberSince}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">Edit Profile</button>
                        </div>
                    </Card>

                    {/* --- Additional Details --- */}
                    <Card>
                        <h3 className="text-xl font-bold mb-4">Additional Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div className="space-y-1">
                                <p className="text-slate-500 dark:text-gray-400 font-semibold">Organisation</p>
                                <p className="text-slate-800 dark:text-gray-200">{user.organisation || 'Not specified'}</p>
                            </div>
                             <div className="space-y-1">
                                <p className="text-slate-500 dark:text-gray-400 font-semibold">Role</p>
                                <p className="text-slate-800 dark:text-gray-200">{user.role || 'Not specified'}</p>
                            </div>
                             <div className="space-y-1 col-span-full">
                                <p className="text-slate-500 dark:text-gray-400 font-semibold">Location</p>
                                <p className="text-slate-800 dark:text-gray-200">{user.location || 'Not specified'}</p>
                            </div>
                        </div>
                    </Card>

                    {/* --- Security & Notifications --- */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card>
                             <h3 className="text-xl font-bold mb-4">Security Settings</h3>
                             <div className="space-y-3">
                                 <button className="w-full text-left p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition">Change Password</button>
                                 <div className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                                     <span>Two-Factor Auth</span>
                                     <button className="text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Enable</button>
                                 </div>
                             </div>
                        </Card>
                         <Card>
                             <h3 className="text-xl font-bold mb-4">Preferences</h3>
                             <div className="space-y-3">
                                <label className="flex justify-between items-center cursor-pointer">
                                    <span>Product Updates</span>
                                    <input type="checkbox" className="sr-only peer" defaultChecked/>
                                    <div className="relative w-11 h-6 bg-slate-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                                 <label className="flex justify-between items-center cursor-pointer">
                                    <span>Security Alerts</span>
                                    <input type="checkbox" className="sr-only peer" defaultChecked/>
                                     <div className="relative w-11 h-6 bg-slate-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                             </div>
                        </Card>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* --- Subscription --- */}
                    <Card>
                        <h3 className="text-xl font-bold mb-4">Subscription Plan</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                                <span className="font-bold text-2xl text-blue-500 dark:text-blue-400">{user.plan} Plan</span>
                                <button className="text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Upgrade</button>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Watermarks</span>
                                    <span>{user.watermarksThisMonth} / {user.watermarkLimit}</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${watermarkPercentage}%` }}></div>
                                </div>
                            </div>
                             <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Storage Used</span>
                                    <span>{user.storageUsed}MB / {user.storageTotal}MB</span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${storagePercentage}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* --- Recent Activity --- */}
                    <Card>
                        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                        <ul className="space-y-3">
                            {recentActivity.map(activity => (
                                <li key={activity.id} className="flex items-start text-sm">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-gray-200">{activity.action}: <span className="font-normal text-slate-600 dark:text-gray-300">{activity.details}</span></p>
                                        <p className="text-xs text-slate-500 dark:text-gray-500">{activity.timestamp}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
            <ProfileEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={user}
                setUser={setUser}
            />
        </div>
    );
};

export default ProfilePage;