import React from 'react';
import { motion } from 'framer-motion';

const LessonLayout = ({ children, title, level }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <header className="mb-8">
        <div className="flex items-center space-x-2 text-brand-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-1">
          <span>LEVEL {level}</span>
        </div>
        <h2 className="text-4xl font-black tracking-tighter uppercase italic">
          {title}
        </h2>
        <div className="h-1 w-12 bg-brand-primary mt-2"></div>
      </header>
      
      <div className="prose prose-invert max-w-none 
        prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
        prose-p:text-white/70 prose-p:leading-relaxed
        prose-strong:text-brand-primary prose-strong:font-bold
        prose-code:text-brand-accent prose-code:bg-brand-accent/10 prose-code:px-1 prose-code:rounded
        prose-li:text-white/60">
        {children}
      </div>
    </motion.div>
  );
};

export default LessonLayout;
