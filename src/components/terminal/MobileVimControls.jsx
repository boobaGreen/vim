import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, CornerDownLeft, Command, X, Keyboard } from 'lucide-react';

const ControlButton = ({ children, onClick, className = '', label }) => {
  const MButton = motion.button;
  return (
    <MButton
      whileTap={{ scale: 0.9, backgroundColor: 'rgba(255,255,255,0.1)' }}
      whileHover={{ scale: 1.05, borderColor: 'rgba(45,212,191,0.5)' }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-xl p-2 min-w-[44px] min-h-[44px] transition-all duration-200 ${className}`}
    >
      {children}
      {label && <span className="text-[7px] uppercase font-bold mt-1 text-white/40">{label}</span>}
    </MButton>
  );
};

const MobileVimControls = ({ onKey, onFocusRequest, currentMode = 'NORMAL' }) => {
  const modeColors = {
    NORMAL: 'text-brand-primary',
    INSERT: 'text-green-400',
    VISUAL: 'text-orange-400',
    REPLACE: 'text-red-400',
  };

  return (
    <div className="flex flex-col space-y-4 p-4 lg:hidden bg-brand-bg/50 backdrop-blur-md border-t border-white/5">
      {/* Mode Indicator & Quick Keys - Always Visible Grid */}
      <div className="grid grid-cols-4 gap-2">
        <div className={`col-span-1 flex items-center justify-center text-[9px] font-black uppercase tracking-tighter px-1 py-2 border rounded-xl bg-white/5 border-white/10 ${modeColors[currentMode] || modeColors.NORMAL} truncate`}>
          {currentMode}
        </div>
        
        <ControlButton onClick={() => onKey('Escape')} label="Esc" className="border-brand-primary/30 bg-brand-primary/5">
          <X size={16} className="text-brand-primary" />
        </ControlButton>
        
        <ControlButton onClick={onFocusRequest} label="Keys" className="bg-brand-primary/10 border-brand-primary/30">
          <Keyboard size={16} className="text-brand-primary" />
        </ControlButton>

        <ControlButton onClick={() => onKey(':')} label="Cmd">
          <span className="text-lg font-display font-black leading-none">:</span>
        </ControlButton>

        <ControlButton onClick={() => onKey('Tab')} label="Tab">
           <Command size={16} className="text-white/60" />
        </ControlButton>

        <ControlButton onClick={() => onKey('/')} label="Find">
           <span className="text-lg font-display font-black leading-none">/</span>
        </ControlButton>

        <ControlButton onClick={() => onKey('u')} label="Undo">
          <span className="text-lg font-display font-black leading-none italic">u</span>
        </ControlButton>
        
        <ControlButton onClick={() => onKey('i')} label="Ins">
          <span className="text-lg font-display font-black leading-none italic">i</span>
        </ControlButton>

        <ControlButton onClick={() => onKey('Enter')} label="Enter">
          <CornerDownLeft size={16} className="text-white/40" />
        </ControlButton>
      </div>

      {/* Navigation D-Pad */}
      <div className="grid grid-cols-3 gap-3 w-fit mx-auto bg-white/[0.01] p-4 rounded-[2rem] border border-white/5 shadow-inner">
        <div />
        <ControlButton onClick={() => onKey('k')} className="!p-1">
          <div className="flex flex-col items-center">
            <ChevronUp size={18} className="text-brand-primary" />
            <span className="text-[10px] font-display font-black text-brand-primary -mt-1">K</span>
          </div>
        </ControlButton>
        <div />
        
        <ControlButton onClick={() => onKey('h')} className="!p-1">
          <div className="flex flex-row items-center space-x-0.5">
            <ChevronLeft size={18} className="text-brand-primary" />
            <span className="text-[10px] font-display font-black text-brand-primary">H</span>
          </div>
        </ControlButton>
        
        <ControlButton onClick={() => onKey('Enter')} className="bg-brand-primary/10 border-brand-primary/20">
          <CornerDownLeft size={18} className="text-brand-primary" />
        </ControlButton>
        
        <ControlButton onClick={() => onKey('l')} className="!p-1">
          <div className="flex flex-row items-center space-x-0.5">
            <span className="text-[10px] font-display font-black text-brand-primary">L</span>
            <ChevronRight size={18} className="text-brand-primary" />
          </div>
        </ControlButton>
        
        <div />
        <ControlButton onClick={() => onKey('j')} className="!p-1">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-display font-black text-brand-primary -mb-1">J</span>
            <ChevronDown size={18} className="text-brand-primary" />
          </div>
        </ControlButton>
        <div />
      </div>

      {/* Helpful Hint */}
      <div className="text-center">
        <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold">
          Swipe terminal to scroll • Double tap to focus
        </p>
      </div>
    </div>
  );
};

export default MobileVimControls;
