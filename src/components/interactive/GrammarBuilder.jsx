import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

const VERBS = [
  { id: 'd', label: 'DELETE', color: 'bg-red-500' },
  { id: 'c', label: 'CHANGE', color: 'bg-orange-500' },
  { id: 'y', label: 'YANK (COPY)', color: 'bg-blue-500' },
];

const MOTIONS = [
  { id: 'w', label: 'WORD', desc: 'to next word' },
  { id: 'e', label: 'END', desc: 'to end of word' },
  { id: 'b', label: 'BACK', desc: 'to previous word' },
  { id: '$', label: 'EOL', desc: 'to end of line' },
];

const GrammarBuilder = () => {
  const [verb, setVerb] = useState(null);
  const [count, setCount] = useState('');
  const [motion, setMotion] = useState(null);

  const reset = () => {
    setVerb(null);
    setCount('');
    setMotion(null);
  };

  return (
    <div className="glass-morphism p-6 rounded-xl border-white/10 space-y-8">
      <div className="flex justify-center items-center space-x-4 min-h-[100px]">
        <AnimatePresence mode="wait">
          {verb && (
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className={`${verb.color} px-4 py-2 rounded font-black text-brand-bg text-xl italic`}
            >
              {verb.label}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {count && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              className="bg-white/10 px-4 py-2 rounded font-black text-white text-xl"
            >
              {count} TIMES
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {motion && (
            <motion.div 
              initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
              className="bg-brand-primary px-4 py-2 rounded font-black text-brand-bg text-xl italic"
            >
              {motion.label}
            </motion.div>
          )}
        </AnimatePresence>

        {!verb && !count && !motion && (
          <div className="text-white/20 font-black text-2xl tracking-tighter uppercase italic italic">Build a Command...</div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">1. Verb (Action)</p>
          <div className="flex flex-wrap gap-2">
            {VERBS.map(v => (
              <button key={v.id} onClick={() => setVerb(v)} className={`px-3 py-1 rounded text-xs font-bold border ${verb?.id === v.id ? 'bg-white/20 border-white' : 'border-white/10 hover:bg-white/5'}`}>
                {v.id}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">2. Count (Optional)</p>
          <div className="flex flex-wrap gap-2">
            {[2, 3, 5].map(n => (
              <button key={n} onClick={() => setCount(n.toString())} className={`px-3 py-1 rounded text-xs font-bold border ${count === n.toString() ? 'bg-white/20 border-white' : 'border-white/10 hover:bg-white/5'}`}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">3. Motion (Target)</p>
          <div className="flex flex-wrap gap-2">
            {MOTIONS.map(m => (
              <button key={m.id} onClick={() => setMotion(m)} className={`px-3 py-1 rounded text-xs font-bold border ${motion?.id === m.id ? 'bg-white/20 border-white' : 'border-white/10 hover:bg-white/5'}`}>
                {m.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <div className="text-sm font-black text-brand-primary">
          RESULT: <span className="text-white bg-white/5 px-2 py-1 rounded ml-2 fon-mono">
            {verb?.id || ''}{count}{motion?.id || ''}
          </span>
        </div>
        <button onClick={reset} className="text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest">Reset</button>
      </div>
    </div>
  );
};

export default GrammarBuilder;
