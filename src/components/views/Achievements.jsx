import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Zap, Lock } from 'lucide-react';
import { Card, Badge } from '../ui';

const ACHIEVEMENTS = [
  { id: 'first-step', title: 'First Step', desc: 'Complete Lesson 1', icon: Target },
  { id: 'maze-runner', title: 'Maze Runner', desc: 'Complete the HJKL Maze', icon: Zap },
  { id: 'grammar-master', title: 'Grammar Master', desc: 'Unlock Level 2', icon: Trophy },
  { id: 'wiz-apprentice', title: 'Wizard Apprentice', desc: 'Unlock Level 3', icon: Star },
  { id: 'terminator', title: 'The Terminator', desc: 'Finish all 12 lessons', icon: Star },
];

const Achievements = ({ unlockedList, language }) => {
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
                      {a.title}
                    </h4>
                    <p className={`text-xs font-bold font-sans ${isUnlocked ? 'text-white/50' : 'text-white/20'}`}>
                      {a.desc}
                    </p>
                    {isUnlocked && (
                      <div className="inline-flex mt-2 px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[8px] font-black tracking-widest uppercase">
                        Mastered
                      </div>
                    )}
                  </div>
                </div>
              </MMotionDiv>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
