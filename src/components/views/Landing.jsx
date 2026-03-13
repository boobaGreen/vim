import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Zap, Target, Play } from 'lucide-react';
import { Button } from '../ui';

const Landing = ({ onStart, onExplore, language }) => {
  const MMotionDiv = motion.div;

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center space-y-12">
      <MMotionDiv 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-3xl"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">
          <Zap size={12} className="animate-pulse" />
          <span>Vim Mastery v0.12 System Online</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter italic uppercase text-white leading-[0.9]">
          {language === 'it' ? 'Evolviti in un' : 'Evolve into a'} <br />
          <span className="text-brand-primary block mt-4 drop-shadow-[0_0_20px_rgba(45,212,191,0.25)]">VIM WIZARD</span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-sans">
          {language === 'it' 
            ? 'Domina il linguaggio segreto della produttività. Smetti di editare testo, inizia a scolpirlo alla velocità del pensiero.'
            : 'Master the secret language of productivity. Stop editing text, start carving it at the speed of thought.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
          <Button onClick={onStart} className="px-12 py-5 text-lg w-full sm:w-auto flex items-center justify-center space-x-3 group cursor-pointer font-display font-bold tracking-wide rounded-2xl shadow-[0_0_20px_rgba(45,212,191,0.1)]">
            <Play size={20} className="fill-current group-hover:scale-110 transition-transform" />
            <span>{language === 'it' ? 'INIZIA IL VIAGGIO' : 'START JOURNEY'}</span>
          </Button>
          <Button onClick={onExplore} variant="secondary" className="px-12 py-5 text-lg w-full sm:w-auto cursor-pointer font-display font-bold tracking-wide rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 transition-all">
             {language === 'it' ? 'ESPLORA LIVELLI' : 'EXPLORE LEVELS'}
          </Button>
        </div>
      </MMotionDiv>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl pt-12">
        {[
          { icon: Shield, title: language === 'it' ? 'Modalità' : 'Modes', desc: language === 'it' ? 'Dalla digitazione al comando.' : 'From typing to commanding.' },
          { icon: Target, title: language === 'it' ? 'Grammatica' : 'Grammar', desc: language === 'it' ? 'Verbi, conteggi e movimenti.' : 'Verbs, counts and motions.' },
          { icon: Terminal, title: language === 'it' ? 'Terminal' : 'Terminal', desc: language === 'it' ? 'WASM Vim completo nel browser.' : 'Full WASM Vim in your browser.' },
        ].map((f, i) => (
          <MMotionDiv 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-morphism p-8 rounded-2xl border-white/5 hover:border-brand-primary/30 transition-all group cursor-default"
          >
            <f.icon className="text-brand-primary mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
            <h4 className="font-black uppercase tracking-widest text-white mb-2 text-sm italic">{f.title}</h4>
            <p className="text-xs text-white/40 leading-relaxed italic">{f.desc}</p>
          </MMotionDiv>
        ))}
      </div>
    </div>
  );
};

export default Landing;
