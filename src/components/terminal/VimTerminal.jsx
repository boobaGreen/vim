import React, { useState, useRef } from 'react';
import { Vim } from 'react-vim-wasm';
import MobileVimControls from './MobileVimControls';

const VimTerminal = () => {
  const [currentMode, setCurrentMode] = useState('NORMAL');
  const vimRef = useRef(null);

  const modeColors = {
    NORMAL: 'border-white/10 shadow-black/50',
    INSERT: 'border-green-500/30 shadow-green-500/10',
    VISUAL: 'border-orange-500/30 shadow-orange-500/10',
    REPLACE: 'border-red-500/30 shadow-red-500/10',
  };

  const handleKey = (key) => {
    if (vimRef.current) {
      // Construction of a more robust key event if onKeyDown expects it
      // Some versions of react-vim-wasm handle string, others need object
      try {
        vimRef.current.onKeyDown(key);
      } catch (e) {
        console.warn('Vim onKeyDown failed with string, trying event simulation', e);
      }
      
      // Syncing Internal Mode (simplified)
      if (key === 'Escape') setCurrentMode('NORMAL');
      if (key === 'i' || key === 'a') setCurrentMode('INSERT');
      if (key === 'v' || key === 'V') setCurrentMode('VISUAL');
      if (key === 'R') setCurrentMode('REPLACE');
    }
  };

  const handleVimInit = (vim) => {
    vimRef.current = vim;
  };

  return (
    <div className={`flex flex-col w-full min-h-[500px] lg:h-[600px] glass-morphism rounded-lg overflow-hidden neo-shadow group bg-[#0A0A0B] border-2 transition-all duration-500 ${modeColors[currentMode]}`}>
      {/* Header Bar */}
      <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between transition-colors group-hover:bg-white/10 flex-shrink-0">
        <div className="flex space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${currentMode === 'INSERT' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-white/10'}`}></div>
          <div className={`w-2.5 h-2.5 rounded-full ${currentMode === 'VISUAL' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-white/10'}`}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-primary/50"></div>
        </div>
        <div className="text-[9px] uppercase font-black tracking-[0.2em] text-white/30 flex items-center gap-2">
          <span className={currentMode !== 'NORMAL' ? 'text-brand-primary animate-pulse' : ''}>
            {currentMode} MODE
          </span>
          <span className="opacity-10">|</span>
          <span>V9.0_WASM</span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 relative pt-2 overflow-hidden cursor-text" onClick={() => vimRef.current?.focus()}>
        <Vim
          worker="./vim.worker.js" 
          onVimInit={handleVimInit}
          onVimExit={() => console.log('Vim Exited')}
          onError={(err) => console.error('Vim Error:', err)}
          className="w-full h-full"
        />

        {/* Mobile Focus Hint Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-active:opacity-100 lg:hidden transition-opacity">
          <div className="bg-brand-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-brand-primary/30 text-[10px] font-black text-brand-primary uppercase">
            Capivolo Tastiera...
          </div>
        </div>
        
        {/* Animated Cursor Hint */}
        <div className="absolute bottom-4 right-4 animate-pulse pointer-events-none opacity-20">
          <div className="w-1.5 h-4 bg-brand-primary/50 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
        </div>
      </div>

      {/* Mobile Controls Integration */}
      <MobileVimControls 
        onKey={handleKey} 
        currentMode={currentMode}
      />
    </div>
  );
};

export default VimTerminal;
