
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div className={`
      glass rounded-3xl p-6 transition-all duration-300 
      ${hoverEffect ? 'hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/10' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;
