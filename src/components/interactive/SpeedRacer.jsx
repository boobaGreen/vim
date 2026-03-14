import React, { useState } from 'react';
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
  const currentIdx = 0;
  const [keystrokes, setKeystrokes] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const challenge = CHALLENGES[currentIdx];

  const handleComplete = () => {
    setIsFinished(true);
    if (onComplete) onComplete();
  };

  const MMotionDiv = motion.div;

  return (
    <div className="glass-morphism p-8 rounded-3xl border-white/10 space-y-6 neo-shadow relative overflow-hidden">
      <MMotionDiv 
        animate={{ opacity: [0.1, 0.2, 0.1] }} 
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-0 right-0 p-4"
      >
        <Zap size={80} className="text-brand-primary" />
      </MMotionDiv>

      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <Trophy className="text-brand-primary" size={20} />
          <span className="text-xs font-black uppercase tracking-widest text-white/50">Speed Racer Challenge</span>
        </div>
        <div className="text-2xl font-black italic text-brand-primary">
          {keystrokes} <span className="text-[10px] uppercase tracking-normal not-italic text-white/30">Keys</span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-1">Sorgente</p>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 font-mono text-base text-white/60 min-h-[60px] flex items-center">
              {challenge.source}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest px-1">Obiettivo</p>
            <div className="bg-brand-primary/5 p-4 rounded-2xl border border-brand-primary/20 font-mono text-base text-brand-primary min-h-[60px] flex items-center">
              {challenge.target}
            </div>
          </div>
        </div>
        
        <div className="bg-white/[0.02] p-4 rounded-2xl border border-dashed border-white/10 flex items-center justify-between group hover:bg-white/5 transition-colors">
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Suggerimento: <span className="text-white/60 italic">{challenge.hint}</span></div>
          <div className="text-[9px] font-black text-brand-primary px-2 py-1 bg-brand-primary/10 rounded uppercase tracking-tighter">Par: 3 Keys</div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest relative z-10">
        <div className="text-white/40">Sfida {currentIdx + 1} di {CHALLENGES.length}</div>
        <button onClick={() => setKeystrokes(0)} className="flex items-center space-x-1 hover:text-white transition-colors">
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Completion Overlay */}
      <AnimatePresence>
        {isFinished && (
          <MMotionDiv 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 bg-brand-bg/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="bg-brand-primary/20 p-6 rounded-full mb-6">
              <Zap size={48} className="text-brand-primary animate-pulse" />
            </div>
            <h3 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter mb-2">Record Battuto!</h3>
            <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-bold mb-8">Efficienza Massima Raggiunta</p>
            <button 
              onClick={() => setIsFinished(false)}
              className="px-8 py-3 bg-brand-primary text-brand-bg font-black rounded-2xl uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(45,212,191,0.3)] hover:scale-105 transition-transform"
            >
              Prossima Sfida
            </button>
          </MMotionDiv>
        )}
      </AnimatePresence>

      {/* Interactive Bridge Placeholder */}
      <div 
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-bg to-transparent z-20 flex flex-col items-center justify-end pb-8 cursor-pointer group"
        onClick={handleComplete}
      >
         <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-[10px] font-black text-white flex items-center space-x-3 group-hover:bg-brand-primary group-hover:text-brand-bg transition-all">
            <span className="animate-pulse">●</span>
            <span>CLICCA PER TESTARE NEL TERMINALE</span>
         </div>
      </div>
    </div>
  );
};

export default SpeedRacer;
