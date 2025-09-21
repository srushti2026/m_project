import React from 'react';
import { Page } from '../types';
import Card from '../components/ui/Card';

interface RegisterPageProps {
  login: () => void; // Simulate login on register
  navigateTo: (page: Page) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ login, navigateTo }) => {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would create a new user here.
    // For now, we just log them in.
    login();
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-6">Create your VeilForge Account</h2>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-slate-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-gray-900 focus:ring-blue-500 transition-transform transform hover:scale-105"
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-gray-400">
          Already have an account?{' '}
          <button onClick={() => navigateTo('login')} className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
            Sign in
          </button>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;