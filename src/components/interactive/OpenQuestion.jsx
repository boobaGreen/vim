import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';

const OpenQuestion = ({ question, answer, hint }) => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'correct', 'incorrect'
  const { language } = useProgressStore();

  const qText = typeof question === 'string' ? question : (question[language] || question.en);
  const hText = hint ? (typeof hint === 'string' ? hint : (hint[language] || hint.en)) : null;
  const aText = typeof answer === 'string' ? answer : (answer[language] || answer.en);

  const checkAnswer = (e) => {
    e.preventDefault();
    const cleanInput = input.trim().toLowerCase();
    const cleanAnswer = aText.trim().toLowerCase();
    
    if (cleanInput === cleanAnswer) {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  };

  return (
    <div className="my-8 bg-brand-bg border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
      {status === 'correct' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="absolute inset-0 bg-green-500/5 pointer-events-none" 
        />
      )}
      {status === 'incorrect' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="absolute inset-0 bg-red-500/5 pointer-events-none" 
        />
      )}
      
      <div className="flex items-center space-x-2 text-brand-primary/50 text-[10px] font-black uppercase tracking-[0.3em] italic mb-4">
        <span>{language === 'it' ? 'DOMANDA APERTA' : 'OPEN QUESTION'}</span>
      </div>
      
      <h4 className="text-xl font-display font-medium text-white mb-6 leading-relaxed">
        {qText}
      </h4>

      <form onSubmit={checkAnswer} className="relative">
        <div className="flex bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden focus-within:border-brand-primary/50 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setStatus('idle');
            }}
            placeholder={language === 'it' ? "Scrivi il comando..." : "Type the command..."}
            className="flex-1 bg-transparent px-5 py-4 text-white font-mono placeholder-white/20 outline-none"
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
          />
          <button 
            type="submit"
            className="px-6 bg-white/5 hover:bg-white/10 text-white font-bold transition-colors border-l border-white/10"
          >
            {language === 'it' ? 'VERIFICA' : 'CHECK'}
          </button>
        </div>

        {status === 'correct' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -right-3 -top-3 bg-brand-bg rounded-full p-1 shadow-xl border border-green-500/20"
          >
            <CheckCircle2 size={24} className="text-green-500" />
          </motion.div>
        )}
        
        {status === 'incorrect' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -right-3 -top-3 bg-brand-bg rounded-full p-1 shadow-xl border border-red-500/20"
          >
            <XCircle size={24} className="text-red-500" />
          </motion.div>
        )}
      </form>

      {status === 'incorrect' && hText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-brand-primary"
        >
          💡 Suggerimento: {hText}
        </motion.div>
      )}
    </div>
  );
};

export default OpenQuestion;
