import React from 'react';

const Breadcrumb = ({ level, chapter }) => (
  <div className="flex items-center space-x-4 mb-4">
    <div className="flex items-center space-x-2">
      <span className="text-[10px] font-black text-brand-primary/50 uppercase tracking-[0.2em]">Level</span>
      <span className="w-5 h-5 flex items-center justify-center text-[10px] font-black bg-brand-primary text-brand-bg rounded-sm transform rotate-45">
        <span className="transform -rotate-45">{level}</span>
      </span>
    </div>
    <div className="h-px w-8 bg-white/20"></div>
    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{chapter}</span>
  </div>
);

export default Breadcrumb;
