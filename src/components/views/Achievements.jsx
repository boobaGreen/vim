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

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full py-12 px-4 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white flex items-center justify-center gap-3">
          <Trophy className="text-brand-primary" size={32} />
          {language === 'it' ? 'I TUOI OBIETTIVI' : 'YOUR ACHIEVEMENTS'}
        </h2>
        <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">Progress: {unlockedList.length} / {ACHIEVEMENTS.length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map((a, i) => {
          const isUnlocked = unlockedList.includes(a.id);
          return (
            <MMotionDiv
              key={a.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-morphism p-6 rounded-2xl border transition-all ${
                isUnlocked ? 'border-brand-primary/30 bg-brand-primary/5' : 'border-white/5 opacity-50 grayscale'
              }`}
            >
              <div className="flex items-center space-x-6">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${isUnlocked ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/5 text-white/20'}`}>
                  {isUnlocked ? <a.icon size={32} /> : <Lock size={32} />}
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-white uppercase italic tracking-widest text-sm">{a.title}</h4>
                  <p className="text-xs text-white/40 font-bold">{a.desc}</p>
                  {isUnlocked && <Badge color="primary">UNLOCKED</Badge>}
                </div>
              </div>
            </MMotionDiv>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
