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
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-widest">
          <Zap size={12} className="animate-pulse" />
          <span>Vim Mastery v0.11 Ready</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-white leading-none">
          {language === 'it' ? 'Evolviti in un' : 'Evolve into a'} <br />
          <span className="text-brand-primary block mt-2 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">VIM WIZARD</span>
        </h1>

        <p className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
          {language === 'it' 
            ? 'Dimentica il mouse. Smetti di digitare, inizia a manipolare. Il linguaggio segreto della produttività estrema ti aspetta.'
            : 'Forget the mouse. Stop typing, start manipulating. The secret language of extreme productivity awaits you.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Button onClick={onStart} className="px-10 py-4 text-lg w-full sm:w-auto flex items-center justify-center space-x-3 group cursor-pointer">
            <Play size={20} className="fill-current group-hover:scale-110 transition-transform" />
            <span>{language === 'it' ? 'INIZIA IL VIAGGIO' : 'START JOURNEY'}</span>
          </Button>
          <Button onClick={onExplore} variant="secondary" className="px-10 py-4 text-lg w-full sm:w-auto cursor-pointer">
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
