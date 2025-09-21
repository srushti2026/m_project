import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
  const baseClasses = 'relative bg-white dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-lg shadow-md dark:shadow-lg shadow-slate-200/50 dark:shadow-black/20 p-6 overflow-hidden';
  const groupClass = hoverEffect ? 'group' : '';
  
  return (
    <div className={`${baseClasses} ${groupClass} ${className}`}>
       <div className="relative z-20">
        {children}
       </div>
       {hoverEffect && <div className="card-shimmer-effect"></div>}
    </div>
  );
};

export default Card;