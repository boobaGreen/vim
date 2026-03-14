import React, { useEffect } from 'react';
import { Vim } from 'react-vim-wasm';

const VimTerminal = () => {

  useEffect(() => {
    // Basic interaction logic with the Vim instance could go here
    // react-vim-wasm is a high-level wrapper, focus detection happens via events
  }, []);

  return (
    <div className="flex flex-col w-full min-h-[500px] lg:h-[600px] glass-morphism rounded-lg overflow-hidden neo-shadow group bg-[#0A0A0B]">
      {/* Header Bar */}
      <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between transition-colors group-hover:bg-white/10 flex-shrink-0">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
        </div>
        <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">
          Vim Console -- wasm_v9.0
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 relative pt-2">
        <Vim
          worker="./vim.worker.js" 
          onVimExit={() => console.log('Vim Exited')}
          onError={(err) => console.error('Vim Error:', err)}
          className="w-full h-full"
        />
        
        {/* Animated Cursor Hint at Bottom Right */}
        <div className="absolute bottom-4 right-4 animate-pulse pointer-events-none">
          <div className="w-2 h-4 bg-brand-primary"></div>
        </div>
      </div>
    </div>
  );

};

export default VimTerminal;
