import React, { useState, useRef } from 'react';
import { Vim } from 'react-vim-wasm';
import { useProgressStore } from '../../store/useProgressStore';
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

  const { currentLessonIndex, language } = useProgressStore();

  const handleKey = (key) => {
    if (vimRef.current) {
      // Map key to keyCode for vim-wasm sendKeydown
      const keyCodes = {
        'h': 72, 'j': 74, 'k': 75, 'l': 76,
        'i': 73, 'a': 65, 'v': 86, 'V': 86, 'R': 82, 'u': 85,
        'Escape': 27, 'Enter': 13, 'Tab': 9,
        ':': 186, '/': 191
      };

      try {
        const keyCode = keyCodes[key] || key.charCodeAt(0);
        const modifiers = {
          shift: (key === ':' || key === 'V' || key === 'R')
        };
        
        vimRef.current.sendKeydown(key, keyCode, modifiers);
      } catch (e) {
        console.warn('Vim sendKeydown failed', e);
      }
      
      // Syncing Internal Mode (simplified)
      if (key === 'Escape') setCurrentMode('NORMAL');
      if (key === 'i' || key === 'a') setCurrentMode('INSERT');
      if (key === 'v' || key === 'V') setCurrentMode('VISUAL');
      if (key === 'R') setCurrentMode('REPLACE');
    }
  };

  const handleVimCreated = (vim) => {
    vimRef.current = vim;
  };

  // Lesson-specific initial content
  const getInitialContent = () => {
    if (currentLessonIndex === 0) {
      return language === 'it' 
        ? "Benvenuto nel Vuoto.\n\nSenti il feedback dei tasti.\nMuoviti con h, j, k, l.\n\nNon aver paura di esplorare.\n"
        : "Welcome to the Void.\n\nFeel the feedback of the keys.\nMove with h, j, k, l.\n\nDo not be afraid to explore.\n";
    }
    return language === 'it'
      ? "Pratica i tuoi comandi qui.\n\nOgni tasto è un'arma.\n"
      : "Practice your commands here.\n\nEvery key is a weapon.\n";
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
      <div 
        className="flex-1 relative pt-2 overflow-hidden cursor-text" 
        onClick={() => {
          if (vimRef.current) {
            vimRef.current.focus();
          }
        }}
      >
        <Vim
          worker="/vim.worker.js" 
          vimrc="set number\nset guicursor=a:block-Cursor\nset cursorline\nset laststatus=0\nset noshowmode"
          files={{
            'lesson.txt': getInitialContent()
          }}
          cmdArgs={['lesson.txt']}
          onVimCreated={handleVimCreated}
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
        
        {/* Animated Cursor Hint - Now more visible as a primary guide */}
        <div className="absolute bottom-4 right-4 animate-pulse pointer-events-none opacity-40">
          <div className="w-2 h-5 bg-brand-primary shadow-[0_0_15px_rgba(45,212,191,0.6)] rounded-sm"></div>
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
