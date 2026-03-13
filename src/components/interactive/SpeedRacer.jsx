import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, RotateCcw } from 'lucide-react';

const CHALLENGES = [
  {
    id: 1,
    source: "hello world vim",
    target: "vim",
    hint: "Use d2w"
  },
  {
    id: 2,
    source: "apple orange banana",
    target: "apple banana",
    hint: "Use dw on orange"
  }
];

const SpeedRacer = ({ onComplete }) => {
  const [currentIdx] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [isFinished] = useState(false);

  const challenge = CHALLENGES[currentIdx];

  useEffect(() => {
    if (isFinished && onComplete) {
      onComplete();
    }
  }, [isFinished, onComplete]);

  const MMotionDiv = motion.div;

  return (
    <div className="glass-morphism p-8 rounded-2xl border-white/10 space-y-6 neo-shadow relative overflow-hidden">
      <MMotionDiv 
        animate={{ opacity: [0.1, 0.2, 0.1] }} 
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-0 right-0 p-4"
      >
        <Zap size={80} className="text-brand-primary" />
      </MMotionDiv>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Trophy className="text-brand-primary" size={20} />
          <span className="text-xs font-black uppercase tracking-widest text-white/50">Speed Racer Challenge</span>
        </div>
        <div className="text-2xl font-black italic text-brand-primary">
          {keystrokes} <span className="text-[10px] uppercase tracking-normal not-italic text-white/30">Keys</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Source State</p>
          <div className="bg-white/5 p-4 rounded border border-white/10 font-mono text-lg text-white/60">
            {challenge.source}
          </div>
        </div>

        <div className="flex justify-center">
          <MMotionDiv animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <span className="text-brand-primary text-xl">↓</span>
          </MMotionDiv>
        </div>

        <div>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Target Goal</p>
          <div className="bg-brand-primary/10 p-4 rounded border border-brand-primary/30 font-mono text-lg text-brand-primary">
            {challenge.target}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
        <div className="text-white/40">Challenge {currentIdx + 1} of {CHALLENGES.length}</div>
        <button onClick={() => setKeystrokes(0)} className="flex items-center space-x-1 hover:text-white transition-colors">
          <RotateCcw size={12} />
          <span>Reset Challenge</span>
        </button>
      </div>

      {/* This is a placeholder for the actual interactive logic which would bridge to Vim-wasm */}
      <div className="absolute inset-0 bg-brand-bg/80 flex flex-col items-center justify-center backdrop-blur-sm z-20 group cursor-pointer hover:bg-brand-bg/60 transition-all">
         <div className="p-4 bg-brand-primary text-brand-bg font-black rounded transform -rotate-2 group-hover:rotate-0 transition-transform">
           CLICK TO START ENGINE
         </div>
         <p className="mt-4 text-[10px] text-white/40 font-bold uppercase tracking-widest">Bridging to Vim Instance...</p>
      </div>
    </div>
  );
};

export default SpeedRacer;
