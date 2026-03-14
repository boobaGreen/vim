import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, CornerDownLeft, Command, Type, Move } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';
import VirtualVimKeyboard from './VirtualVimKeyboard';

const CONTENT = {
  it: {
    nav: "Nav",
    type: "Scrivi",
    modeSuffix: "MODALITÀ",
    engagementHint: "Vim Mastery Unified Console Attivata",
    proTips: [
      "Pro Tip: Ctrl+[ per uscire",
      "Pro Tip: Ctrl+c per escape rapido",
      "Pro Tip: Usa 'Esc' sulla tastiera fisica",
      "Vim Tip: 'i' per Insert mode",
      "Vim Tip: 'v' per Visual mode"
    ]
  },
  en: {
    nav: "Nav",
    type: "Type",
    modeSuffix: "MODE",
    engagementHint: "Vim Mastery Unified Console Engaged",
    proTips: [
      "Pro Tip: Ctrl+[ also exits",
      "Pro Tip: Ctrl+c is a quick escape",
      "Pro Tip: Use 'Esc' on physical keys",
      "Vim Tip: 'i' for Insert mode",
      "Vim Tip: 'v' for Visual mode"
    ]
  }
};

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
  const language = useProgressStore((state) => state.language);
  const localized = CONTENT[language] || CONTENT.en;

  const [activeTab, setActiveTab] = useState('NAV'); // NAV or TYPE
  const [tipIndex, setTipIndex] = useState(0);

  // Cycle tip when mode changes to INSERT or on manual tab switch
  React.useEffect(() => {
    if (currentMode === 'INSERT') {
      setTipIndex(prev => (prev + 1) % localized.proTips.length);
    }
  }, [currentMode, localized.proTips.length]);

  const modeColors = {
    NORMAL: 'text-brand-primary',
    INSERT: 'text-green-400',
    VISUAL: 'text-orange-400',
    REPLACE: 'text-red-400',
  };

  return (
    <div className="flex flex-col bg-[#0A0A0B]/90 backdrop-blur-2xl border-t border-white/10 select-none overflow-hidden h-full">
      {/* Tab Switcher & Status */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 relative">
        <div className={`text-[9px] font-black uppercase tracking-widest ${modeColors[currentMode] || modeColors.NORMAL} flex-shrink-0`}>
          {currentMode} {localized.modeSuffix}
        </div>
        
        <div className="flex bg-black/40 p-1 rounded-full border border-white/10 flex-shrink-0">
          <button 
            onClick={() => setActiveTab('NAV')}
            className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase transition-all flex items-center ${activeTab === 'NAV' ? 'bg-brand-primary text-black' : 'text-white/40'}`}
          >
            <Move size={11} className="mr-1" /> {localized.nav}
          </button>
          <button 
            onClick={() => setActiveTab('TYPE')}
            className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase transition-all flex items-center ${activeTab === 'TYPE' ? 'bg-brand-primary text-black' : 'text-white/40'}`}
          >
            <Type size={11} className="mr-1" /> {localized.type}
          </button>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <AnimatePresence mode="wait">
            {currentMode !== 'NORMAL' && (
              <motion.div 
                key={tipIndex}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                className="text-[7px] text-white/30 font-bold uppercase italic tracking-tighter hidden xs:block max-w-[80px] sm:max-w-none truncate"
              >
                {localized.proTips[tipIndex]}
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => onKey('Escape')} 
            className="bg-red-500/10 border border-red-500/30 text-red-500 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter hover:bg-red-500/20 active:scale-95 transition-all shadow-[0_0_10px_rgba(239,68,68,0.1)]"
          >
            ESC
          </button>
        </div>
      </div>

      {/* Main Control Area */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'NAV' ? (
            <motion.div 
              key="nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-3 sm:p-4 grid grid-cols-2 gap-4 sm:gap-6 h-full items-center"
            >
              {/* Quick Keys Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <ControlButton onClick={() => onKey('u')} label="Undo"><span className="text-base sm:text-lg font-black italic">u</span></ControlButton>
                <ControlButton onClick={() => onKey('i')} label="Ins"><span className="text-base sm:text-lg font-black italic">i</span></ControlButton>
                <ControlButton onClick={() => onKey(':')} label="Cmd"><span className="text-base sm:text-lg font-black leading-none">:</span></ControlButton>
                <ControlButton onClick={() => onKey('Tab')} label="Tab"><Command size={18} /></ControlButton>
              </div>

              {/* Compact D-Pad */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mx-auto scale-90 sm:scale-100">
                <div />
                <ControlButton onClick={() => onKey('k')} className="!p-1.5">
                  <ChevronUp size={20} />
                </ControlButton>
                <div />
                <ControlButton onClick={() => onKey('h')} className="!p-1.5">
                  <ChevronLeft size={20} />
                </ControlButton>
                <ControlButton onClick={() => onKey('Enter')} className="!p-1.5 bg-brand-primary/10 border-brand-primary/30 text-brand-primary">
                  <CornerDownLeft size={20} />
                </ControlButton>
                <ControlButton onClick={() => onKey('l')} className="!p-1.5">
                  <ChevronRight size={20} />
                </ControlButton>
                <div />
                <ControlButton onClick={() => onKey('j')} className="!p-1.5">
                  <ChevronDown size={20} />
                </ControlButton>
                <div />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="type"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="h-full pt-2"
            >
              <VirtualVimKeyboard onKey={onKey} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* UX Hint */}
      <div className="py-1 bg-brand-primary/95 shadow-[0_-5px_20px_rgba(45,212,191,0.1)] flex-shrink-0">
         <div className="text-[7px] text-center font-black text-brand-bg uppercase tracking-[0.25em]">
            {localized.engagementHint}
         </div>
      </div>
    </div>
  );
};

export default UnifiedMobileConsole;
