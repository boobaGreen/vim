import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, RotateCcw } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';

const CONTENT = {
  it: {
    challenges: [
      { id: 1, source: "hello world vim", target: "vim", hint: "Usa d2w" },
      { id: 2, source: "apple orange banana", target: "apple banana", hint: "Usa dw su orange" }
    ],
    ui: {
      title: "Sfida Speed Racer",
      keys: "Tasti",
      source: "Sorgente",
      target: "Obiettivo",
      hint: "Suggerimento",
      par: "Par: {n} Tasti",
      challengeCount: "Sfida {x} di {y}",
      reset: "Resetta",
      winTitle: "Record Battuto!",
      winDesc: "Efficienza Massima Raggiunta",
      next: "Prossima Sfida",
      test: "CLICCA PER TESTARE NEL TERMINALE"
    }
  },
  en: {
    challenges: [
      { id: 1, source: "hello world vim", target: "vim", hint: "Use d2w" },
      { id: 2, source: "apple orange banana", target: "apple banana", hint: "Use dw on orange" }
    ],
    ui: {
      title: "Speed Racer Challenge",
      keys: "Keys",
      source: "Source",
      target: "Target",
      hint: "Hint",
      par: "Par: {n} Keys",
      challengeCount: "Challenge {x} of {y}",
      reset: "Reset",
      winTitle: "Record Broken!",
      winDesc: "Maximum Efficiency Reached",
      next: "Next Challenge",
      test: "CLICK TO TEST IN TERMINAL"
    }
  }
};

const SpeedRacer = ({ onComplete, onCompleteId }) => {
  const language = useProgressStore((state) => state.language);
  const localized = CONTENT[language] || CONTENT.en;

  const currentIdx = 0;
  const [keystrokes, setKeystrokes] = useState(0);
  const [showWinOverlay, setShowWinOverlay] = useState(false);

  const challenge = localized.challenges[currentIdx];

  const handleComplete = () => {
    setShowWinOverlay(true);
    if (onComplete) onComplete();
    useProgressStore.getState().completeLesson(onCompleteId || '07-speed-racer');
  };

  const MMotionDiv = motion.div;

  return (
    <div className="glass-morphism p-6 sm:p-8 rounded-3xl border-white/10 space-y-6 neo-shadow relative overflow-hidden">
      <MMotionDiv 
        animate={{ opacity: [0.1, 0.2, 0.1] }} 
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-0 right-0 p-4"
      >
        <Zap size={80} className="text-brand-primary" />
      </MMotionDiv>

      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2 text-brand-primary">
          <Trophy size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{localized.ui.title}</span>
        </div>
        <div className="text-2xl font-black italic text-brand-primary">
          {keystrokes} <span className="text-[10px] uppercase tracking-normal not-italic text-white/30">{localized.ui.keys}</span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-1">{localized.ui.source}</p>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 font-mono text-sm sm:text-base text-white/60 min-h-[60px] flex items-center overflow-x-auto">
              {challenge.source}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest px-1">{localized.ui.target}</p>
            <div className="bg-brand-primary/5 p-4 rounded-2xl border border-brand-primary/20 font-mono text-sm sm:text-base text-brand-primary min-h-[60px] flex items-center overflow-x-auto">
              {challenge.target}
            </div>
          </div>
        </div>
        
        <div className="bg-white/[0.02] p-4 rounded-2xl border border-dashed border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group hover:bg-white/5 transition-colors">
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
            {localized.ui.hint}: <span className="text-white/60 italic">{challenge.hint}</span>
          </div>
          <div className="text-[9px] font-black text-brand-primary px-2 py-1 bg-brand-primary/10 rounded uppercase tracking-tighter">
            {localized.ui.par.replace('{n}', 3)}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest relative z-10">
        <div className="text-white/40">{localized.ui.challengeCount.replace('{x}', currentIdx + 1).replace('{y}', localized.challenges.length)}</div>
        <button onClick={() => setKeystrokes(0)} className="flex items-center space-x-1 hover:text-white transition-colors">
          <RotateCcw size={12} />
          <span>{localized.ui.reset}</span>
        </button>
      </div>

      {/* Completion Overlay */}
      <AnimatePresence>
        {showWinOverlay && (
          <MMotionDiv 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-bg/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="bg-brand-primary/20 p-6 rounded-full mb-6 text-brand-primary">
              <Zap size={48} className="animate-pulse" />
            </div>
            <h3 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter mb-2">{localized.ui.winTitle}</h3>
            <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-bold mb-8">{localized.ui.winDesc}</p>
            <div className="flex gap-4">
               <button 
                onClick={() => { setKeystrokes(0); setShowWinOverlay(false); }}
                className="px-6 py-3 bg-white/10 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-white/20 transition-all border border-white/10"
              >
                {localized.ui.reset}
              </button>
              <button 
                onClick={() => setShowWinOverlay(false)}
                className="px-8 py-3 bg-brand-primary text-brand-bg font-black rounded-2xl uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(45,212,191,0.3)] hover:scale-105 transition-transform"
              >
                {localized.ui.next}
              </button>
            </div>
          </MMotionDiv>
        )}
      </AnimatePresence>

      {/* Interactive Bridge Placeholder */}
      <div 
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-bg to-transparent z-20 flex flex-col items-center justify-end pb-8 cursor-pointer group"
        onClick={handleComplete}
      >
         <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-[9px] font-black text-white flex items-center space-x-3 group-hover:bg-brand-primary group-hover:text-brand-bg transition-all uppercase">
            <span className="animate-pulse">●</span>
            <span>{localized.ui.test}</span>
         </div>
      </div>
    </div>
  );
};

export default SpeedRacer;
