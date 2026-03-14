import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '../../store/useProgressStore';

const CONTENT = {
  it: {
    verbs: [
      { id: 'd', label: 'CANCELLA', color: 'bg-red-500' },
      { id: 'c', label: 'CAMBIA', color: 'bg-orange-500' },
      { id: 'y', label: 'COPIA (YANK)', color: 'bg-blue-500' },
    ],
    motions: [
      { id: 'w', label: 'PAROLA', desc: 'fino alla prossima parola' },
      { id: 'e', label: 'FINE', desc: 'fino alla fine della parola' },
      { id: 'b', label: 'INDIETRO', desc: 'fino all\'inizio della parola precedente' },
      { id: '$', label: 'FINE RIGA', desc: 'fino alla fine della riga' },
    ],
    ui: {
      times: "VOLTE",
      placeholder: "Costruisci un Comando...",
      step1: "1. Verbo (Azione)",
      step2: "2. Conteggio (Opzionale)",
      step3: "3. Movimento (Bersaglio)",
      result: "RISULTATO",
      reset: "Resetta"
    }
  },
  en: {
    verbs: [
      { id: 'd', label: 'DELETE', color: 'bg-red-500' },
      { id: 'c', label: 'CHANGE', color: 'bg-orange-500' },
      { id: 'y', label: 'YANK (COPY)', color: 'bg-blue-500' },
    ],
    motions: [
      { id: 'w', label: 'WORD', desc: 'to next word' },
      { id: 'e', label: 'END', desc: 'to end of word' },
      { id: 'b', label: 'BACK', desc: 'to previous word' },
      { id: '$', label: 'EOL', desc: 'to end of line' },
    ],
    ui: {
      times: "TIMES",
      placeholder: "Build a Command...",
      step1: "1. Verb (Action)",
      step2: "2. Count (Optional)",
      step3: "3. Motion (Target)",
      result: "RESULT",
      reset: "Reset"
    }
  }
};

const GrammarBuilder = ({ onComplete, onCompleteId }) => {
  const language = useProgressStore((state) => state.language);
  const localized = CONTENT[language] || CONTENT.en;

  const [verb, setVerb] = useState(null);
  const [count, setCount] = useState('');
  const [vimMotion, setVimMotion] = useState(null);

  const MMotionDiv = motion.div;

  const reset = () => {
    setVerb(null);
    setCount('');
    setVimMotion(null);
  };

  React.useEffect(() => {
    if (verb && vimMotion) {
      if (onComplete) onComplete(`${verb.id}${count}${vimMotion.id}`);
      useProgressStore.getState().completeLesson(onCompleteId || '04-grammar-intro');
    }
  }, [verb, count, vimMotion, onComplete, onCompleteId]);

  return (
    <div className="glass-morphism p-6 rounded-xl border-white/10 space-y-8">
      <div className="flex justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 min-h-[100px] flex-wrap">
        <AnimatePresence mode="wait">
          {verb && (
            <MMotionDiv 
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className={`${verb.color} px-4 py-2 rounded font-black text-brand-bg text-xl italic my-1`}
            >
              {verb.label}
            </MMotionDiv>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {count && (
            <MMotionDiv 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              className="bg-white/10 px-4 py-2 rounded font-black text-white text-xl my-1"
            >
              {count} {localized.ui.times}
            </MMotionDiv>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {vimMotion && (
            <MMotionDiv 
              initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
              className="bg-brand-primary px-4 py-2 rounded font-black text-brand-bg text-xl italic my-1"
            >
              {vimMotion.label}
            </MMotionDiv>
          )}
        </AnimatePresence>

        {!verb && !count && !vimMotion && (
          <div className="text-white/20 font-black text-2xl tracking-tighter uppercase italic text-center w-full">
            {localized.ui.placeholder}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{localized.ui.step1}</p>
          <div className="flex flex-wrap gap-2">
            {localized.verbs.map(v => (
              <button key={v.id} onClick={() => setVerb(v)} className={`px-3 py-1 rounded text-xs font-bold border ${verb?.id === v.id ? 'bg-white/20 border-white' : 'border-white/10 hover:bg-white/5'}`}>
                {v.id}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{localized.ui.step2}</p>
          <div className="flex flex-wrap gap-2">
            {[2, 3, 5].map(n => (
              <button key={n} onClick={() => setCount(n.toString())} className={`px-3 py-1 rounded text-xs font-bold border ${count === n.toString() ? 'bg-white/20 border-white' : 'border-white/10 hover:bg-white/5'}`}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{localized.ui.step3}</p>
          <div className="flex flex-wrap gap-2">
            {localized.motions.map(m => (
              <button key={m.id} onClick={() => setVimMotion(m)} className={`px-3 py-1 rounded text-xs font-bold border ${vimMotion?.id === m.id ? 'bg-white/20 border-white' : 'border-white/10 hover:bg-white/5'}`}>
                {m.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <div className="text-sm font-black text-brand-primary">
          {localized.ui.result}: <span className="text-white bg-white/5 px-2 py-1 rounded ml-2 font-mono">
            {verb?.id || ''}{count}{vimMotion?.id || ''}
          </span>
        </div>
        <button onClick={reset} className="text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest">{localized.ui.reset}</button>
      </div>
    </div>
  );
};

export default GrammarBuilder;
