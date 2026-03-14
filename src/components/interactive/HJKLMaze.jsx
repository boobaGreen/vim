import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Trophy, RotateCcw, ArrowRight } from 'lucide-react';

const GRID_SIZE = 8;
const INITIAL_POS = { x: 0, y: 0 };
const GOAL_POS = { x: 7, y: 7 };

const HJKLMaze = ({ onComplete }) => {
  const [pos, setPos] = useState(INITIAL_POS);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const MMotionDiv = motion.div;

  const move = useCallback((dir) => {
    if (isWon) return;
    setPos((prev) => {
      let newPos = { ...prev };
      if (dir === 'h' && prev.x > 0) newPos.x -= 1;
      if (dir === 'l' && prev.x < GRID_SIZE - 1) newPos.x += 1;
      if (dir === 'k' && prev.y > 0) newPos.y -= 1;
      if (dir === 'j' && prev.y < GRID_SIZE - 1) newPos.y += 1;
      
      if (newPos.x !== prev.x || newPos.y !== prev.y) {
        setMoves(m => {
          const nextMoves = m + 1;
          // Immediate win check after move with the updated moves count
          if (newPos.x === GOAL_POS.x && newPos.y === GOAL_POS.y) {
            setIsWon(true);
            if (onComplete) onComplete(nextMoves);
          }
          return nextMoves;
        });
      }
      return newPos;
    });
  }, [isWon, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['h', 'j', 'k', 'l'].includes(key)) {
        move(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]); // Only re-bind if move (memoized) changes

  const reset = () => {
    setPos(INITIAL_POS);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <div className="flex flex-col items-center space-y-8 py-4">
      <div className="relative group">
        <div className="grid grid-cols-8 gap-1 bg-white/5 p-3 rounded-2xl border border-white/10 neo-shadow overflow-hidden">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isPlayer = pos.x === x && pos.y === y;
            const isGoal = GOAL_POS.x === x && GOAL_POS.y === y;

            return (
              <div 
                key={i} 
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isGoal ? 'bg-brand-accent/20 border-2 border-brand-accent/50' : 'bg-white/[0.02]'
                } ${isPlayer && isWon ? 'bg-brand-primary/40' : ''}`}
              >
                <AnimatePresence>
                  {isPlayer && (
                    <MMotionDiv
                      layoutId="player"
                      className={`w-4 h-6 sm:w-5 sm:h-7 neo-shadow ring-2 ${isWon ? 'bg-white ring-white/50' : 'bg-brand-primary ring-brand-primary/50'}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
                {isGoal && !isPlayer && (
                  <MMotionDiv 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-brand-accent font-black text-xs"
                  >
                    $
                  </MMotionDiv>
                )}
              </div>
            );
          })}
        </div>

        {/* Win Overlay */}
        <AnimatePresence>
          {isWon && (
            <MMotionDiv 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-brand-bg/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center z-30 border border-brand-primary/30"
            >
              <MMotionDiv 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 bg-brand-primary/20 p-4 rounded-full"
              >
                <Trophy size={48} className="text-brand-primary animate-bounce" />
              </MMotionDiv>
              <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-tighter mb-1">
                Missione Compiuta!
              </h3>
              <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-bold mb-6">
                Completato in <span className="text-brand-primary">{moves}</span> mosse
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={reset}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-[10px] font-black uppercase tracking-widest text-white border border-white/10"
                >
                  <RotateCcw size={14} />
                  <span>Ricomincia</span>
                </button>
                <button 
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary/80 transition-all text-[10px] font-black uppercase tracking-widest text-brand-bg shadow-[0_4px_15px_rgba(45,212,191,0.3)]"
                  onClick={() => alert('Ottimo! Prosegui alla prossima lezione.')}
                >
                  <span>Prosegui</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </MMotionDiv>
          )}
        </AnimatePresence>
      </div>
      
      {/* Mobile Controls for Maze */}
      <div className="grid grid-cols-3 gap-3 md:hidden">
        <div />
        <button onClick={() => move('k')} className="w-14 h-14 rounded-2xl glass-morphism border border-white/10 flex items-center justify-center text-brand-primary active:scale-90 transition-transform">
          <ChevronUp size={24} />
        </button>
        <div />
        
        <button onClick={() => move('h')} className="w-14 h-14 rounded-2xl glass-morphism border border-white/10 flex items-center justify-center text-brand-primary active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => move('j')} className="w-14 h-14 rounded-2xl glass-morphism border border-white/10 flex items-center justify-center text-brand-primary active:scale-90 transition-transform">
          <ChevronDown size={24} />
        </button>
        <button onClick={() => move('l')} className="w-14 h-14 rounded-2xl glass-morphism border border-white/10 flex items-center justify-center text-brand-primary active:scale-90 transition-transform">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex items-center space-x-8 text-[10px] font-black uppercase tracking-widest text-white/40">
        <div className="flex items-center gap-2">
          <span>MOSSE:</span>
          <span className="text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">{moves}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>OBIETTIVO:</span>
          <span className="text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded">$</span>
        </div>
      </div>
    </div>
  );
};

export default HJKLMaze;
