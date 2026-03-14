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
      vimRef.current.onKeyDown(key);
      
      // Simple heuristic for mode detection based on keys
      if (key === 'Escape') setCurrentMode('NORMAL');
      if (key === 'i' || key === 'a') setCurrentMode('INSERT');
      if (key === 'v' || key === 'V') setCurrentMode('VISUAL');
      if (key === 'R') setCurrentMode('REPLACE');
    }
  };

  // Crude way to detect mode changes by observing terminal output or events
  // react-vim-wasm doesn't expose a direct 'onModeChange', so we can listen to events
  // or use the command line output if accessible. 
  // For this high-level implementation, we'll implement a state-based approach
  // where we update the mode based on certain key presses in a simplified way
  // OR rely on the user to see it, but here we'll try to sync basic modes.
  
  const handleVimInit = (vim) => {
    vimRef.current = vim;
  };

  return (
    <div className={`flex flex-col w-full min-h-[500px] lg:h-[600px] glass-morphism rounded-lg overflow-hidden neo-shadow group bg-[#0A0A0B] border-2 transition-all duration-500 ${modeColors[currentMode]}`}>
      {/* Header Bar */}
      <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between transition-colors group-hover:bg-white/10 flex-shrink-0">
        <div className="flex space-x-2">
          <div className={`w-3 h-3 rounded-full ${currentMode === 'INSERT' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500/50'}`}></div>
          <div className={`w-3 h-3 rounded-full ${currentMode === 'VISUAL' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-yellow-500/50'}`}></div>
          <div className="w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(45,212,191,0.5)]"></div>
        </div>
        <div className="text-[10px] uppercase font-bold tracking-widest text-white/50 flex items-center gap-2">
          <span className={currentMode !== 'NORMAL' ? 'animate-pulse text-brand-primary' : ''}>
            {currentMode} MODE
          </span>
          <span className="opacity-20">//</span>
          <span>wasm_v9.0</span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 relative pt-2 overflow-hidden">
        <Vim
          worker="./vim.worker.js" 
          onVimInit={handleVimInit}
          onVimExit={() => console.log('Vim Exited')}
          onError={(err) => console.error('Vim Error:', err)}
          className="w-full h-full"
        />
        
        {/* Animated Cursor Hint at Bottom Right */}
        <div className="absolute bottom-4 right-4 animate-pulse pointer-events-none opacity-50">
          <div className="w-2 h-4 bg-brand-primary shadow-[0_0_10px_rgba(45,212,191,0.8)]"></div>
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
