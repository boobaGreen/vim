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
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b-0 py-4 px-4 md:px-8 flex justify-between items-center h-16">
        <button 
          onClick={() => setView('home')}
          className="flex items-center space-x-2 group outline-none cursor-pointer"
        >
          <Terminal className="text-brand-primary w-6 h-6 group-hover:animate-pulse" />
          <span className="font-black text-xl tracking-tighter uppercase italic group-hover:text-brand-primary transition-colors">VIM<span className="text-brand-primary group-hover:text-white">MASTERY</span></span>
        </button>
        
        <div className="flex items-center space-x-3 md:space-x-8 text-sm font-medium">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`hover:text-brand-primary transition-colors flex items-center space-x-2 cursor-pointer ${isMenuOpen ? 'text-brand-primary' : ''}`}
          >
            <BookOpen size={16} /> <span className="hidden sm:inline">{language === 'it' ? 'Lezioni' : 'Lessons'}</span>
          </button>
          <button 
            onClick={() => setView('achievements')}
            className={`hover:text-brand-primary transition-colors flex items-center space-x-2 cursor-pointer ${view === 'achievements' ? 'text-brand-primary' : ''}`}
          >
            <Trophy size={16} /> <span className="hidden sm:inline">{language === 'it' ? 'Obiettivi' : 'Achievements'}</span>
          </button>
          <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
          <button 
            onClick={() => setLanguage(language === 'it' ? 'en' : 'it')}
            className="text-xs border border-white/20 rounded-full px-3 py-1 hover:bg-white/5 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Globe size={12} />
            <span className="uppercase">{language}</span>
          </button>
        </div>
      </nav>

      {/* Lesson Index Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <MMotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 w-full bg-brand-bg/95 backdrop-blur-2xl border-b border-white/10 z-40 p-8 max-h-[70vh] overflow-y-auto custom-scrollbar"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {['level-1', 'level-2', 'level-3'].map((lvl, lIdx) => (
                <div key={lvl} className="space-y-4">
                  <h4 className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase border-b border-white/5 pb-2">
                    {language === 'it' ? `LIVELLO ${lIdx + 1}` : `LEVEL ${lIdx + 1}`}
                  </h4>
                  <div className="flex flex-col space-y-1">
                    {lessons.slice(lIdx * 4, (lIdx + 1) * 4).map((l, i) => {
                      const absoluteIndex = lIdx * 4 + i;
                      const isCompleted = completedLessons.includes(l);
                      const isActive = currentLessonIndex === absoluteIndex;
                      return (
                        <button
                          key={l}
                          onClick={() => { goToLesson(absoluteIndex); setIsMenuOpen(false); }}
                          className={`flex items-center justify-between p-3 rounded-lg text-left transition-all cursor-pointer ${
                            isActive ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/20' : 
                            'hover:bg-white/5 text-white/60 hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase tracking-wide truncate pr-4">{l.replace(/^[0-9]+-/, '').replace(/-/g, ' ')}</span>
                          {isCompleted && <Trophy size={12} className="text-brand-primary" />}
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
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start h-full">
            {/* Left: Lesson Content Area */}
            <div className="h-full overflow-y-auto pr-0 md:pr-4 custom-scrollbar">
              <Breadcrumb 
                level={currentModule.split('-')[1].padStart(2, '0')} 
                chapter={
                  currentLessonIndex < 4 ? (language === 'it' ? 'Livello 1: Il Neofita' : 'Level 1: The Neophyte') :
                  currentLessonIndex < 8 ? (language === 'it' ? 'Livello 2: Utente Efficiente' : 'Level 2: Efficient User') :
                  (language === 'it' ? 'Livello 3: Il Mago di Vim' : 'Level 3: The Vim Wizard')
                } 
              />
              
              <LessonRenderer path={currentPath} />

              <div className="mt-12 p-6 rounded-xl border border-brand-primary/20 bg-brand-primary/5 neo-shadow flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="text-center sm:text-left">
                  <h3 className="text-brand-primary font-bold mb-2 flex items-center justify-center sm:justify-start space-x-2 text-xs tracking-widest uppercase">
                    <span className="animate-pulse">●</span>
                    <span>{language === 'it' ? 'TASKS DIDATTICI' : 'DIDACTIC TASK'}</span>
                  </h3>
                  <p className="text-sm text-white/90 leading-snug max-w-xs">
                    {language === 'it'
                      ? 'Naviga le lezioni e usa il terminale per sbloccare la gloria.'
                      : 'Navigate through lessons and use the terminal to unlock glory.'}
                  </p>
                </div>
                <div className="flex space-x-3 w-full sm:w-auto">
                  {currentLessonIndex > 0 && (
                    <Button onClick={prevLesson} variant="secondary" className="flex-1 sm:flex-none cursor-pointer">
                      &larr; {language === 'it' ? 'Indietro' : 'Back'}
                    </Button>
                  )}
                  {currentLessonIndex < lessons.length - 1 && (
                    <Button onClick={nextLesson} variant="outline" className="flex-1 sm:flex-none cursor-pointer">
                      {language === 'it' ? 'Avanti' : 'Next'} &rarr;
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Terminal Area */}
            <MMotionDiv
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="h-full hidden lg:flex flex-col"
            >
              <VimTerminal />
              
              {/* Quick Shortcuts Hint */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {['h', 'j', 'k', 'l'].map(key => (
                  <div key={key} className="glass-morphism py-2 flex flex-col items-center justify-center rounded-lg border-white/5">
                    <span className="text-brand-primary font-black text-lg">{key}</span>
                    <span className="text-[8px] text-white/30 uppercase tracking-tighter">
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
