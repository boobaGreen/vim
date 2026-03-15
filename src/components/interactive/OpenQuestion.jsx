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
    <div className="my-8 bg-brand-bg border border-white/10 rounded-2xl p-6 relative group">
      <div className="flex items-center space-x-2 text-brand-primary/50 text-[10px] font-black uppercase tracking-[0.3em] italic mb-4">
        <span>{language === 'it' ? 'DOMANDA APERTA' : 'OPEN QUESTION'}</span>
      </div>
      
      <h4 className="text-xl font-display font-medium text-white mb-6 leading-relaxed">
        {qText}
      </h4>

      <form onSubmit={checkAnswer} className="relative">
        <div className={`flex rounded-xl overflow-hidden transition-all duration-300 border ${
          status === 'correct' ? 'bg-green-500/10 border-green-400/50 shadow-[0_0_15px_rgba(34,197,94,0.15)]' :
          status === 'incorrect' ? 'bg-red-500/10 border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 
          'bg-white/[0.03] border-white/10 focus-within:border-brand-primary/50'
        }`}>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setStatus('idle');
            }}
            placeholder={language === 'it' ? "Scrivi il comando..." : "Type the command..."}
            className={`flex-1 bg-transparent px-5 py-4 font-mono outline-none transition-colors ${
              status === 'correct' ? 'text-green-300 placeholder-green-500/50' :
              status === 'incorrect' ? 'text-red-300 placeholder-red-500/50' : 
              'text-white placeholder-white/20'
            }`}
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            disabled={status === 'correct'}
          />
          {status !== 'correct' && (
            <button 
              type="submit"
              className="px-6 bg-white/5 hover:bg-white/10 text-white font-bold transition-colors border-l border-white/10"
            >
              {language === 'it' ? 'VERIFICA' : 'CHECK'}
            </button>
          )}
        </div>

        {status === 'correct' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <CheckCircle2 size={24} className="text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          </motion.div>
        )}
        
        {status === 'incorrect' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-[100px] top-1/2 -translate-y-1/2"
          >
            <XCircle size={20} className="text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          </motion.div>
        )}
      </form>

      {status === 'incorrect' && hText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 px-5 py-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3"
        >
          <span className="text-red-400 shrink-0 text-base leading-none translate-y-0.5">💡</span>
          <span className="text-[13px] text-red-200 leading-relaxed">
            <strong className="text-red-400 uppercase tracking-widest text-[10px] block mb-1">
              {language === 'it' ? 'Suggerimento' : 'Hint'}
            </strong> 
            {hText}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default OpenQuestion;
