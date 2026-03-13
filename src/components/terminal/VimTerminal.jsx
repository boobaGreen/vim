import React, { useRef, useEffect } from 'react';
import { Vim } from 'react-vim-wasm';

const VimTerminal = ({ onCommand, initialText = '', readOnly = false }) => {
  const vimRef = useRef(null);

  useEffect(() => {
    // Basic interaction logic with the Vim instance could go here
    // react-vim-wasm is a high-level wrapper, focus detection happens via events
  }, []);

  return (
    <div className="relative w-full h-[500px] glass-morphism rounded-lg overflow-hidden neo-shadow group">
      <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between z-10 transition-colors group-hover:bg-white/10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
        </div>
        <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">
          Vim Console -- wasm_v9.0
        </div>
      </div>
      
      <div className="mt-8 h-full bg-[#0A0A0B]">
        <Vim
          worker="./vim.worker.js" 
          onVimExit={() => console.log('Vim Exited')}
          className="w-full h-full"
          // In a real implementation, we'd need to handle web worker paths correctly
          // For now, this acts as the UI shell
        />
      </div>

      <div className="absolute bottom-4 right-4 animate-pulse">
        <div className="w-2 h-4 bg-brand-primary"></div>
      </div>
    </div>
  );
};

export default VimTerminal;
