import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const GRID_SIZE = 8;
const INITIAL_POS = { x: 0, y: 0 };
const GOAL_POS = { x: 7, y: 7 };

const HJKLMaze = ({ onComplete }) => {
  const [pos, setPos] = useState(INITIAL_POS);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      setPos((prev) => {
        let newPos = { ...prev };
        if (key === 'h' && prev.x > 0) newPos.x -= 1;
        if (key === 'l' && prev.x < GRID_SIZE - 1) newPos.x += 1;
        if (key === 'k' && prev.y > 0) newPos.y -= 1;
        if (key === 'j' && prev.y < GRID_SIZE - 1) newPos.y += 1;
        
        if (newPos.x !== prev.x || newPos.y !== prev.y) {
          setMoves(m => m + 1);
        }
        return newPos;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (pos.x === GOAL_POS.x && pos.y === GOAL_POS.y) {
      if (onComplete) onComplete(moves);
    }
  }, [pos, moves, onComplete]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="grid grid-cols-8 gap-1 bg-white/5 p-2 rounded-lg border border-white/10 neo-shadow">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isPlayer = pos.x === x && pos.y === y;
          const isGoal = GOAL_POS.x === x && GOAL_POS.y === y;

          return (
            <div 
              key={i} 
              className={`w-10 h-10 rounded-sm flex items-center justify-center transition-colors ${
                isGoal ? 'bg-brand-accent/20 border border-brand-accent/50' : 'bg-white/5'
              }`}
            >
              <AnimatePresence>
                {isPlayer && (
                  <motion.div
                    layoutId="player"
                    className="w-4 h-6 bg-brand-primary neo-shadow ring-2 ring-brand-primary/50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              {isGoal && !isPlayer && <span className="text-brand-accent font-black text-xs opacity-50">$</span>}
            </div>
          );
        })}
      </div>
      
      <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
        MOVES: <span className="text-brand-primary">{moves}</span> | GOAL: <span className="text-brand-accent">$</span>
      </div>
    </div>
  );
};

export default HJKLMaze;
