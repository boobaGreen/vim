import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, Zap, Star } from 'lucide-react';
import { Button } from '../ui';

const CompletionCard = ({ isCompleted, onNext, language, isLastLesson }) => {
  const MMotionDiv = motion.div;

  return (
    <AnimatePresence>
      {isCompleted && (
        <MMotionDiv
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="mt-12 p-8 rounded-[2.5rem] border-2 border-brand-primary/30 bg-brand-primary/[0.03] shadow-[0_20px_50px_rgba(45,212,191,0.15)] relative overflow-hidden group"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-primary/20 transition-colors" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-3xl -ml-12 -mb-12" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className={`${isLastLesson ? 'bg-yellow-500' : 'bg-brand-primary'} flex items-center justify-center w-16 h-16 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_20px_rgba(45,212,191,0.4)]`}>
                {isLastLesson 
                  ? <Star size={32} className="text-brand-bg -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                  : <Trophy size={32} className="text-brand-bg -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                }
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] italic">
                  <Zap size={12} className="animate-pulse" />
                  <span>{isLastLesson 
                    ? (language === 'it' ? 'CORSO COMPLETATO!' : 'COURSE COMPLETED!') 
                    : (language === 'it' ? 'LEZIONE COMPLETATA' : 'LESSON COMPLETED')
                  }</span>
                </div>
                <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-tighter">
                  {isLastLesson 
                    ? (language === 'it' ? 'Sei un Mago di Vim!' : 'You Are a Vim Wizard!')
                    : (language === 'it' ? 'Evolviti al Prossimo Rango' : 'Evolve to Next Rank')
                  }
                </h3>
                <p className="text-white/40 text-xs font-sans max-w-xs leading-relaxed">
                  {isLastLesson 
                    ? (language === 'it' 
                      ? 'Hai completato tutte le lezioni. Il tuo viaggio Vim è solo all\'inizio!' 
                      : 'You completed all lessons. Your Vim journey is just beginning!')
                    : (language === 'it' 
                      ? 'Nuove abilità di Vim sono state sbloccate nel tuo arsenale.' 
                      : 'New Vim skills have been unlocked in your arsenal.')
                  }
                </p>
              </div>
            </div>

            <Button 
              onClick={onNext} 
              className="w-full md:w-auto px-12 py-5 text-lg rounded-2xl flex items-center justify-center space-x-3 group/btn shadow-[0_10px_25px_rgba(45,212,191,0.3)] hover:shadow-[0_15px_35px_rgba(45,212,191,0.5)] transition-all"
            >
              <span>{isLastLesson 
                ? (language === 'it' ? 'TORNA ALLA HOME' : 'BACK TO HOME')
                : (language === 'it' ? 'PROSSIMA LEZIONE' : 'NEXT LESSON')
              }</span>
              <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </MMotionDiv>
      )}
    </AnimatePresence>
  );
};

export default CompletionCard;
