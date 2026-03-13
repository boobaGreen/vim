import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, BookOpen, Trophy, Globe, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useProgressStore } from './store/useProgressStore';
import { Button } from './components/ui';
import VimTerminal from './components/terminal/VimTerminal';
import LessonRenderer from './LessonRenderer';
import Breadcrumb from './components/layout/Breadcrumb';

import Landing from './components/views/Landing';
import Achievements from './components/views/Achievements';

function App() {
  const { language, setLanguage, completedLessons, achievements, currentLessonIndex, nextLesson, prevLesson, goToLesson, resetProgress, view, setView } = useProgressStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const lessons = [
    '01-zen', '02-maze', '03-crud', '04-grammar-intro',
    '05-operators-motions', '06-counts-power', '07-speed-racer', '08-conclusion',
    '09-text-objects', '10-macros', '11-registers', '12-global-commands'
  ];

  const currentModule = 
    currentLessonIndex < 4 ? 'level-1' : 
    currentLessonIndex < 8 ? 'level-2' : 
    'level-3';
  const currentPath = `${language}/${currentModule}/${lessons[currentLessonIndex]}`;

  const MMotionDiv = motion.div;

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-primary/30 flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b-0 py-3 px-4 md:px-10 flex justify-between items-center h-14">
        <button 
          onClick={() => setView('home')}
          className="flex items-center space-x-2 md:space-x-2.5 group outline-none cursor-pointer"
        >
          <div className="bg-brand-primary/10 p-1 md:p-1.5 rounded-lg border border-brand-primary/20 group-hover:scale-110 transition-transform">
            <Terminal className="text-brand-primary w-3.5 h-3.5 md:w-4 md:h-4" />
          </div>
          <span className="font-display font-black text-base md:text-lg tracking-tight uppercase italic group-hover:text-brand-primary transition-colors">VIM<span className="text-brand-primary group-hover:text-white">MASTERY</span></span>
        </button>
        
        <div className="flex items-center space-x-3 md:space-x-10 text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`hover:text-brand-primary transition-all flex items-center space-x-1.5 md:space-x-2 cursor-pointer ${isMenuOpen ? 'text-brand-primary scale-105' : 'text-white/60 hover:scale-105'}`}
          >
            <BookOpen size={12} className="md:w-[14px] md:h-[14px]" /> <span>{language === 'it' ? 'Lezioni' : 'Lessons'}</span>
          </button>
          <button 
            onClick={() => setView('achievements')}
            className={`hover:text-brand-primary transition-all flex items-center space-x-1.5 md:space-x-2 cursor-pointer ${view === 'achievements' ? 'text-brand-primary scale-105' : 'text-white/60 hover:scale-105'}`}
          >
            <Trophy size={12} className="md:w-[14px] md:h-[14px]" /> <span>{language === 'it' ? 'Obiettivi' : 'Achievements'}</span>
          </button>
          <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
          <button 
            onClick={() => setLanguage(language === 'it' ? 'en' : 'it')}
            className="border border-white/20 rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-white/5 hover:border-brand-primary/50 transition-all cursor-pointer"
          >
            <span className="text-[8px] md:text-[9px] uppercase">{language}</span>
          </button>
        </div>
      </nav>

      {/* Dropdown Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-brand-bg/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Lesson Index Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <MMotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-0 w-full bg-brand-bg/95 backdrop-blur-2xl border-b border-white/10 z-50 p-6 md:p-10 max-h-[80vh] overflow-y-auto custom-scrollbar shadow-4xl"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {['level-1', 'level-2', 'level-3'].map((lvl, lIdx) => (
                <div key={lvl} className="space-y-4">
                  <h4 className="text-[10px] font-display font-black tracking-[0.3em] text-brand-primary/50 uppercase border-b border-white/5 pb-2 italic">
                    {language === 'it' ? `LIVELLO ${lIdx + 1}` : `LEVEL ${lIdx + 1}`}
                  </h4>
                  <div className="flex flex-col space-y-1.5">
                    {lessons.slice(lIdx * 4, (lIdx + 1) * 4).map((l, i) => {
                      const absoluteIndex = lIdx * 4 + i;
                      const isCompleted = completedLessons.includes(l);
                      const isActive = currentLessonIndex === absoluteIndex;
                      return (
                        <button
                          key={l}
                          onClick={() => { goToLesson(absoluteIndex); setIsMenuOpen(false); }}
                          className={`flex items-center justify-between p-3.5 rounded-xl text-left transition-all cursor-pointer group border ${
                            isActive ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/30' : 
                            'hover:bg-white/5 border-transparent text-white/50 hover:text-white'
                          }`}
                        >
                          <span className="text-[11px] font-display font-bold uppercase tracking-wide truncate pr-4">{l.replace(/^[0-9]+-/, '').replace(/-/g, ' ')}</span>
                          {isCompleted ? <Trophy size={14} className="text-brand-primary opacity-80" /> : <div className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-brand-primary/40 transition-colors" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </MMotionDiv>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 pt-20 pb-12 px-6 md:px-10 max-w-7xl mx-auto w-full flex flex-col overflow-hidden">
        {view === 'home' && (
          <Landing 
            language={language} 
            onStart={() => { resetProgress(); setView('lesson'); }} 
            onExplore={() => setIsMenuOpen(true)}
          />
        )}
        
        {view === 'achievements' && <Achievements 
           unlockedList={achievements} 
           language={language} 
        />}

        {view === 'lesson' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start h-full">
            {/* Left: Lesson Content Area */}
            <div className="h-full overflow-y-auto pr-0 lg:pr-6 custom-scrollbar space-y-8">
              <div className="space-y-4">
                <Breadcrumb 
                  level={currentModule.split('-')[1].padStart(2, '0')} 
                  chapter={
                    currentLessonIndex < 4 ? (language === 'it' ? 'Livello 1: Il Neofita' : 'Level 1: The Neophyte') :
                    currentLessonIndex < 8 ? (language === 'it' ? 'Livello 2: Utente Efficiente' : 'Level 2: Efficient User') :
                    (language === 'it' ? 'Livello 3: Il Mago di Vim' : 'Level 3: The Vim Wizard')
                  } 
                />
                <div className="h-px bg-white/5 w-full" />
              </div>
              
              <LessonRenderer path={currentPath} />

              <div className="mt-16 p-8 rounded-[2rem] border border-brand-primary/20 bg-brand-primary/[0.03] shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary/30" />
                <div className="text-center sm:text-left relative z-10">
                  <h3 className="text-brand-primary font-display font-black mb-2 flex items-center justify-center sm:justify-start space-x-2 text-[10px] tracking-[0.3em] uppercase italic">
                    <span className="animate-pulse">●</span>
                    <span>{language === 'it' ? 'MISSION STATUS' : 'MISSION STATUS'}</span>
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-xs font-sans">
                    {language === 'it'
                      ? 'Espandi la tua mente. Pratica i comandi nel terminale per sbloccare il prossimo livello.'
                      : 'Expand your mind. Practice the commands in the terminal to unlock the next level.'}
                  </p>
                </div>
                <div className="flex space-x-4 w-full sm:w-auto relative z-10">
                  {currentLessonIndex > 0 && (
                    <Button onClick={prevLesson} variant="secondary" className="flex-1 sm:flex-none cursor-pointer font-display font-bold px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border-white/5 transition-all">
                      &larr; {language === 'it' ? 'Indietro' : 'Back'}
                    </Button>
                  )}
                  {currentLessonIndex < lessons.length - 1 && (
                    <Button onClick={nextLesson} className="flex-1 sm:flex-none cursor-pointer font-display font-bold px-8 py-3 rounded-xl shadow-[0_4px_15px_rgba(45,212,191,0.2)]">
                      {language === 'it' ? 'Prossimo Rango' : 'Next Rank'} &rarr;
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Terminal Area */}
            {/* Terminal Area */}
            <MMotionDiv
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="h-full flex flex-col space-y-6 lg:sticky lg:top-24"
            >
              <div className="glass-morphism rounded-3xl p-1 overflow-hidden shadow-2xl border-white/5 bg-white/[0.01]">
                <VimTerminal />
              </div>
              
              {/* Quick Shortcuts Hint */}
              <div className="grid grid-cols-4 gap-3 md:gap-4">
                {['h', 'j', 'k', 'l'].map(key => (
                  <div key={key} className="glass-morphism py-2.5 md:py-3 px-2 flex flex-col items-center justify-center rounded-2xl border-white/5 bg-white/[0.02] group hover:bg-brand-primary/10 transition-all cursor-default">
                    <span className="text-brand-primary font-display font-black text-lg md:text-xl group-hover:scale-110 transition-transform">{key}</span>
                    <span className="text-[7px] md:text-[9px] text-white/20 uppercase tracking-widest font-bold mt-1">
                      {key === 'h' ? (language === 'it' ? 'SX' : 'Left') : 
                       key === 'j' ? (language === 'it' ? 'GIÙ' : 'Down') : 
                       key === 'k' ? (language === 'it' ? 'SU' : 'Up') : 
                       (language === 'it' ? 'DX' : 'Right')}
                    </span>
                  </div>
                ))}
              </div>
            </MMotionDiv>
          </div>
        )}
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-10 mt-auto glass-morphism border-t-0 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center text-[9px] font-bold tracking-widest uppercase text-white/30 z-50 py-2 gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-brand-primary/50 shrink-0">GNU GENERAL PUBLIC LICENSE</span>
          <div className="h-3 w-px bg-white/5"></div>
          <div className="truncate pr-4">© 2026 CLAUDIO DALL'ARA // SYS_READY</div>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="https://github.com/boobaGreen" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors flex items-center space-x-1 cursor-pointer">
            <Github size={12} /> <span>Github</span>
          </a>
          <a href="https://www.linkedin.com/in/claudio-dall-ara-730aa0302/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors flex items-center space-x-1 cursor-pointer">
            <Linkedin size={12} /> <span>LinkedIn</span>
          </a>
          <a href="https://www.claudiodallara.it/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors flex items-center space-x-1 cursor-pointer">
             <ExternalLink size={12} /> <span>Personal</span>
          </a>
          <div className="h-3 w-px bg-white/5"></div>
          <div className="flex space-x-4 shrink-0 text-brand-primary">
            <span>PROGRESS: {completedLessons.length} / 12</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
