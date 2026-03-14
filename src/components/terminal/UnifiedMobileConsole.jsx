import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, CornerDownLeft, Command, X, Type, Move } from 'lucide-react';
import VirtualVimKeyboard from './VirtualVimKeyboard';

const ControlButton = ({ children, onClick, active = false, className = '', label }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200 ${
      active 
        ? 'bg-brand-primary/20 border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(45,212,191,0.2)]' 
        : 'bg-white/5 border-white/10 text-white/40'
    } ${className}`}
  >
    {children}
    {label && <span className="text-[7px] uppercase font-bold mt-1">{label}</span>}
  </motion.button>
);

const UnifiedMobileConsole = ({ onKey, currentMode }) => {
  const [activeTab, setActiveTab] = useState('NAV'); // NAV or TYPE

  const modeColors = {
    NORMAL: 'text-brand-primary',
    INSERT: 'text-green-400',
    VISUAL: 'text-orange-400',
    REPLACE: 'text-red-400',
  };

  return (
    <div className="flex flex-col bg-[#0A0A0B]/90 backdrop-blur-2xl border-t border-white/10 select-none overflow-hidden">
      {/* Tab Switcher & Status */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className={`text-[10px] font-black uppercase tracking-widest ${modeColors[currentMode] || modeColors.NORMAL}`}>
          {currentMode} MODE
        </div>
        
        <div className="flex bg-black/40 p-1 rounded-full border border-white/10">
          <button 
            onClick={() => setActiveTab('NAV')}
            className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase transition-all ${activeTab === 'NAV' ? 'bg-brand-primary text-black' : 'text-white/40'}`}
          >
            <Move size={12} className="inline mr-1" /> Nav
          </button>
          <button 
            onClick={() => setActiveTab('TYPE')}
            className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase transition-all ${activeTab === 'TYPE' ? 'bg-brand-primary text-black' : 'text-white/40'}`}
          >
            <Type size={12} className="inline mr-1" /> Type
          </button>
        </div>

        <button onClick={() => onKey('Escape')} className="text-white/20 p-1">
          <X size={16} />
        </button>
      </div>

      {/* Main Control Area */}
      <div className="flex-1 overflow-hidden relative min-h-[220px]">
        <AnimatePresence mode="wait">
          {activeTab === 'NAV' ? (
            <motion.div 
              key="nav"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-4 grid grid-cols-2 gap-6 h-full items-center"
            >
              {/* Quick Keys Grid */}
              <div className="grid grid-cols-2 gap-2">
                <ControlButton onClick={() => onKey('u')} label="Undo"><span className="text-lg font-black italic">u</span></ControlButton>
                <ControlButton onClick={() => onKey('i')} label="Ins"><span className="text-lg font-black italic">i</span></ControlButton>
                <ControlButton onClick={() => onKey(':')} label="Cmd"><span className="text-lg font-black leading-none">:</span></ControlButton>
                <ControlButton onClick={() => onKey('Tab')} label="Tab"><Command size={18} /></ControlButton>
              </div>

              {/* Compact D-Pad */}
              <div className="grid grid-cols-3 gap-2 mx-auto">
                <div />
                <ControlButton onClick={() => onKey('k')} className="!p-1">
                  <ChevronUp size={20} />
                </ControlButton>
                <div />
                <ControlButton onClick={() => onKey('h')} className="!p-1">
                  <ChevronLeft size={20} />
                </ControlButton>
                <ControlButton onClick={() => onKey('Enter')} className="!p-1 bg-brand-primary/10 border-brand-primary/30 text-brand-primary">
                  <CornerDownLeft size={20} />
                </ControlButton>
                <ControlButton onClick={() => onKey('l')} className="!p-1">
                  <ChevronRight size={20} />
                </ControlButton>
                <div />
                <ControlButton onClick={() => onKey('j')} className="!p-1">
                  <ChevronDown size={20} />
                </ControlButton>
                <div />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="type"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <VirtualVimKeyboard onKey={onKey} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* UX Hint */}
      <div className="py-1 bg-brand-primary shadow-[0_-5px_20px_rgba(45,212,191,0.1)]">
         <div className="text-[7px] text-center font-black text-black uppercase tracking-[0.3em]">
            Vim Mastery Unified Console Engaged
         </div>
      </div>
    </div>
  );
};

export default UnifiedMobileConsole;
