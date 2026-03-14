import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Delete, CornerDownLeft, Space } from 'lucide-react';

const KeyButton = ({ char, wide = false, variant = 'normal', onClick, isShift, layout }) => {
  const displayChar = isShift && layout === 'ALPHA' ? char.toUpperCase() : char;
  
  // Color mapping based on variant
  const variants = {
    normal: 'bg-white/5 border-white/10 text-white/80',
    action: 'bg-brand-primary/20 border-brand-primary/30 text-brand-primary font-black',
    danger: 'bg-red-500/20 border-red-500/30 text-red-400',
  };

  const Icon = char === 'Backspace' ? Delete : 
              char === 'Enter' ? CornerDownLeft : 
              char === 'Space' ? Space : null;

  return (
    <motion.button
      whileTap={{ scale: 0.9, backgroundColor: 'rgba(255,255,255,0.15)' }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(char === 'Backspace' ? 'Backspace' : 
                char === 'Enter' ? 'Enter' : 
                char === 'Space' ? ' ' : displayChar);
      }}
      className={`flex-1 min-h-[44px] rounded-lg border flex items-center justify-center text-sm font-display transition-all duration-200 outline-none ${variants[variant]} ${wide ? 'flex-[1.5]' : ''}`}
    >
      {Icon ? <Icon size={16} /> : displayChar}
    </motion.button>
  );
};

const VirtualVimKeyboard = ({ onKey, className = '' }) => {
  const [layout, setLayout] = useState('ALPHA'); // ALPHA or SYMS
  const [isShift, setIsShift] = useState(false);

  const keyRows = {
    ALPHA: [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ],
    SYMS: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
      ['.', ',', '?', '!', "'"]
    ]
  };

  const currentRows = keyRows[layout];

  return (
    <div className={`flex flex-col space-y-1.5 p-2 bg-black/40 backdrop-blur-xl border-t border-white/5 select-none ${className}`}>
      {/* Dynamic Key Rows */}
      {currentRows.map((row, i) => (
        <div key={i} className="flex space-x-1 justify-center">
          {i === 2 && (
            <KeyButton 
              char={layout === 'ALPHA' ? (isShift ? '⇧' : '⇧') : '#+='} 
              variant="action" 
              isShift={isShift}
              layout={layout}
              onClick={() => layout === 'ALPHA' ? setIsShift(!isShift) : setLayout('SYMS')} 
            />
          )}
          {row.map(char => (
            <KeyButton key={char} char={char} isShift={isShift} layout={layout} onClick={onKey} />
          ))}
          {i === 2 && (
            <KeyButton 
              char="Backspace" 
              variant="normal" 
              onClick={onKey} 
            />
          )}
        </div>
      ))}

      {/* Control Row */}
      <div className="flex space-x-1">
        <KeyButton 
          char="ESC" 
          variant="danger" 
          onClick={() => onKey('Escape')} 
        />
        <KeyButton 
          char={layout === 'ALPHA' ? '123' : 'ABC'} 
          variant="action" 
          wide 
          onClick={() => {
            setLayout(layout === 'ALPHA' ? 'SYMS' : 'ALPHA');
            setIsShift(false);
          }} 
        />
        <KeyButton 
          char="Space" 
          wide 
          onClick={onKey} 
        />
        <KeyButton 
          char=":" 
          variant="action" 
          onClick={onKey} 
        />
        <KeyButton 
          char="Enter" 
          variant="action" 
          wide 
          onClick={onKey} 
        />
      </div>
    </div>
  );
};

export default VirtualVimKeyboard;
