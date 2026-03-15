import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Zap, Lock, BookOpen, Trash2, AlertCircle } from 'lucide-react';
import { Card, Badge, Button } from '../ui';
import { useProgressStore } from '../../store/useProgressStore';

const ACHIEVEMENTS = [
  { id: 'first-step', title: { en: 'First Step', it: 'Primo Passo' }, desc: { en: 'Complete Lesson 1', it: 'Completa la Lezione 1' }, icon: Target },
  { id: 'maze-runner', title: { en: 'Maze Runner', it: 'Corridore del Labirinto' }, desc: { en: 'Complete the HJKL Maze', it: 'Completa il Labirinto HJKL' }, icon: Zap },
  { id: 'edit-master', title: { en: 'The Editor', it: 'Lo Scrittore' }, desc: { en: 'Complete the CRUD Lesson', it: 'Completa la Lezione CRUD' }, icon: BookOpen },
  { id: 'grammar-master', title: { en: 'Grammar Master', it: 'Maestro di Grammatica' }, desc: { en: 'Unlock Level 2', it: 'Sblocca il Livello 2' }, icon: Trophy },
  { id: 'speed-demon', title: { en: 'Speed Demon', it: 'Velocista' }, desc: { en: 'Complete the Speed Racer lesson', it: 'Completa la lezione Velocità' }, icon: Zap },
  { id: 'halfway-there', title: { en: 'Halfway There', it: 'A Metà Strada' }, desc: { en: 'Complete 6 lessons', it: 'Completa 6 lezioni' }, icon: Target },
  { id: 'wiz-apprentice', title: { en: 'Wizard Apprentice', it: 'Apprendista Mago' }, desc: { en: 'Unlock Level 3', it: 'Sblocca il Livello 3' }, icon: Star },
  { id: 'macro-master', title: { en: 'Macro Master', it: 'Signore delle Macro' }, desc: { en: 'Learn to use Vim Macros', it: 'Impara ad usare le Macro di Vim' }, icon: Zap },
  { id: 'expert', title: { en: 'The Expert', it: 'L\'Esperto' }, desc: { en: 'Complete 10 lessons', it: 'Completa 10 lezioni' }, icon: Trophy },
  { id: 'terminator', title: { en: 'The Terminator', it: 'Il Terminatore' }, desc: { en: 'Finish all 12 lessons', it: 'Finisci tutte e 12 le lezioni' }, icon: Star },
];

const Achievements = ({ unlockedList, language }) => {
  const resetProgress = useProgressStore(state => state.resetProgress);
  const [showConfirm, setShowConfirm] = React.useState(false);
  
  const MMotionDiv = motion.div;
  const total = ACHIEVEMENTS.length;
  const unlockedCount = unlockedList.length;
  const percentage = Math.round((unlockedCount / total) * 100);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-16">
      <div className="max-w-4xl mx-auto space-y-12 pt-6 px-4">
        {/* Progress Header */}
        <div className="glass-morphism rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-12 border-white/5 bg-white/[0.02]">
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-4xl font-display font-black uppercase italic tracking-tight">
              {language === 'it' ? 'I Tuoi Traguardi' : 'Your Achievements'}
            </h2>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">
              {unlockedCount} / {total} {language === 'it' ? 'SBLOCCATI' : 'UNLOCKED'}
            </p>
          </div>
          
          <div className="relative w-44 h-44 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
               <circle cx="88" cy="88" r="78" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
               <motion.circle 
                 cx="88" cy="88" r="78" stroke="currentColor" strokeWidth="10" fill="transparent" 
                 className="text-brand-primary"
                 strokeDasharray={490}
                 initial={{ strokeDashoffset: 490 }}
                 animate={{ strokeDashoffset: 490 - (490 * percentage) / 100 }}
                 transition={{ duration: 1.5, ease: "circOut" }}
               />
             </svg>
             <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-display font-black leading-none">{percentage}%</span>
             </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((a, i) => {
            const isUnlocked = unlockedList.includes(a.id);
            const Icon = a.icon;
            
            return (
              <MMotionDiv
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={isUnlocked ? { scale: 1.02, y: -5 } : {}}
                className={`relative group rounded-2xl p-8 border transition-all ${
                  isUnlocked 
                  ? 'glass-morphism border-brand-primary/30 bg-brand-primary/5' 
                  : 'bg-white/[0.02] border-white/5 opacity-40 grayscale'
                }`}
              >
                <div className="flex items-center space-x-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-xl ${
                    isUnlocked 
                    ? 'bg-brand-primary text-brand-bg shadow-[0_0_30px_rgba(45,212,191,0.2)]' 
                    : 'bg-white/5 text-white/20'
                  }`}>
                    {isUnlocked ? <Icon size={32} /> : <Lock size={32} />}
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-display font-black uppercase italic tracking-widest text-base ${isUnlocked ? 'text-white' : 'text-white/30'}`}>
                      {a.title[language]}
                    </h4>
                    <p className={`text-xs font-bold font-sans ${isUnlocked ? 'text-white/50' : 'text-white/20'}`}>
                      {a.desc[language]}
                    </p>
                    {isUnlocked && (
                      <div className="inline-flex mt-2 px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[8px] font-black tracking-widest uppercase shadow-[0_0_10px_rgba(45,212,191,0.1)]">
                        {language === 'it' ? 'MAESTRATO' : 'MASTERED'}
                      </div>
                    )}
                  </div>
                </div>
              </MMotionDiv>
            );
          })}
        </div>

        {/* Reset Section */}
        <div className="pt-12 mt-12 border-t border-white/5 flex flex-col items-center space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            {language === 'it' ? 'Zona Pericolo' : 'Danger Zone'}
          </p>
          
          {!showConfirm ? (
            <Button 
              onClick={() => setShowConfirm(true)}
              variant="secondary" 
              className="group flex items-center space-x-3 px-8 py-4 bg-white/5 border-white/10 hover:bg-red-500/10 hover:border-red-500/30 text-white/40 hover:text-red-400 transition-all cursor-pointer rounded-2xl"
            >
              <Trash2 size={18} className="group-hover:animate-bounce" />
              <span className="font-display font-black uppercase italic tracking-widest text-xs">
                {language === 'it' ? 'Resetta Tutto' : 'Reset Everything'}
              </span>
            </Button>
          ) : (
            <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center space-x-3 text-red-400 mb-2">
                <AlertCircle size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  {language === 'it' ? 'Sei sicuro al 100%?' : 'Are you 100% sure?'}
                </span>
              </div>
              <div className="flex space-x-4">
                <Button 
                  onClick={() => { resetProgress(); setShowConfirm(false); }}
                  className="px-8 py-4 bg-red-500 text-white hover:bg-red-600 transition-all cursor-pointer rounded-2xl font-display font-black uppercase italic tracking-widest text-xs shadow-lg shadow-red-500/20"
                >
                  {language === 'it' ? 'SÌ, CANCELLA TUTTO' : 'YES, CLEAR ALL'}
                </Button>
                <Button 
                  onClick={() => setShowConfirm(false)}
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 transition-all cursor-pointer rounded-2xl font-display font-black uppercase italic tracking-widest text-xs"
                >
                  {language === 'it' ? 'ANNULLA' : 'CANCEL'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
