import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-brand-primary text-brand-bg hover:bg-white',
    secondary: 'bg-white/5 text-white hover:bg-white/10 border border-white/10',
    outline: 'border border-brand-primary text-brand-primary hover:bg-brand-primary/10',
  };

  const MButton = motion.button;

  return (
    <MButton
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-4 py-2 rounded font-bold uppercase tracking-widest text-xs transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </MButton>
  );
};

export const Card = ({ children, title, className = '' }) => (
  <div className={`glass-morphism rounded-xl p-6 neo-shadow ${className}`}>
    {title && <h4 className="text-brand-primary font-black uppercase tracking-tighter mb-4 italic italic">{title}</h4>}
    {children}
  </div>
);

export const Badge = ({ children, color = 'primary' }) => {
  const colors = {
    primary: 'bg-brand-primary/20 text-brand-primary border-brand-primary/30',
    accent: 'bg-brand-accent/20 text-brand-accent border-brand-accent/30',
  };
  return (
    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
};
