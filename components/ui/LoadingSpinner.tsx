import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  message?: string;
}

/**
 * A reusable loading spinner component with hydration warning suppression
 * Use this component to avoid hydration errors caused by browser extensions
 * that add attributes like bis_skin_checked="1" to div elements
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  className = '',
  message
}) => {
  // Size mappings
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-4'
  };
  
  // Get the appropriate size class
  const sizeClass = sizeClasses[size];
  
  return (
    <div className={`flex justify-center items-center py-8 ${className}`} suppressHydrationWarning={true}>
      <div 
        className={`${sizeClass} border-gray-200 border-t-${color} rounded-full animate-spin`} 
        suppressHydrationWarning={true}
      ></div>
      {message && <span className="ml-2 text-gray-600">{message}</span>}
    </div>
  );
};

export default LoadingSpinner; 