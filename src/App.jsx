import { Terminal, BookOpen, Trophy, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './components/ui';
import VimTerminal from './components/terminal/VimTerminal';
import { useProgressStore } from './store/useProgressStore';

import LessonRenderer from './LessonRenderer';
import Breadcrumb from './components/layout/Breadcrumb';

function App() {
  const { language, setLanguage, completedLessons, currentLevel, currentLessonIndex, nextLesson } = useProgressStore();

  const lessons = [
    '01-zen',
    '02-maze',
    '03-crud',
    '04-grammar-intro'
  ];

  const currentModule = `level-${currentLevel}`;
  const currentPath = `${language}/${currentModule}/${lessons[currentLessonIndex]}`;

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b-0 py-4 px-8 flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <Terminal className="text-brand-primary w-6 h-6" />
          <span className="font-black text-xl tracking-tighter uppercase italic">VIM<span className="text-brand-primary">MASTERY</span></span>
        </div>
        
        <div className="flex items-center space-x-8 text-sm font-medium">
          <button className="hover:text-brand-primary transition-colors flex items-center space-x-2">
            <BookOpen size={16} /> <span>{language === 'it' ? 'Lezioni' : 'Lessons'}</span>
          </button>
          <button className="hover:text-brand-primary transition-colors flex items-center space-x-2">
            <Trophy size={16} /> <span>{language === 'it' ? 'Obiettivi' : 'Achievements'}</span>
          </button>
          <div className="h-4 w-px bg-white/10"></div>
          <button 
            onClick={() => setLanguage(language === 'it' ? 'en' : 'it')}
            className="text-xs border border-white/20 rounded-full px-3 py-1 hover:bg-white/5 transition-all flex items-center space-x-2"
          >
            <Globe size={12} />
            <span className="uppercase">{language}</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Left: Lesson Content Area */}
        <div className="h-full overflow-y-auto pr-4 custom-scrollbar">
          <Breadcrumb 
            level={currentLevel.toString().padStart(2, '0')} 
            chapter={language === 'it' ? 'Capitolo 1: Origini' : 'Chapter 1: Origins'} 
          />
          
          <LessonRenderer path={currentPath} />

          <div className="mt-12 p-6 rounded-xl border border-brand-primary/20 bg-brand-primary/5 neo-shadow flex justify-between items-center">
            <div>
              <h3 className="text-brand-primary font-bold mb-2 flex items-center space-x-2 text-xs tracking-widest uppercase">
                <span className="animate-pulse">●</span>
                <span>DIDACTIC TASK</span>
              </h3>
              <p className="text-sm text-white/90">
                {language === 'it'
                  ? 'Completa l\'interazione per sbloccare la lezione successiva.'
                  : 'Complete the interaction to unlock the next lesson.'}
              </p>
            </div>
            {currentLessonIndex < lessons.length - 1 && (
              <Button onClick={nextLesson} variant="outline">
                Next Lesson &rarr;
              </Button>
            )}
          </div>
        </div>

        {/* Right: Terminal Area */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="h-full"
        >
          <VimTerminal />
          
          {/* Quick Shortcuts Hint */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {['h', 'j', 'k', 'l'].map(key => (
              <div key={key} className="glass-morphism py-2 flex flex-col items-center justify-center rounded-lg border-white/5">
                <span className="text-brand-primary font-black text-lg">{key}</span>
                <span className="text-[8px] text-white/30 uppercase tracking-tighter">
                  {key === 'h' ? 'Left' : key === 'j' ? 'Down' : key === 'k' ? 'Up' : 'Right'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 w-full h-8 glass-morphism border-t-0 px-8 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase text-white/30 z-50">
        <div>SYS_READY // VIM_MASTERY_CORE_OK</div>
        <div className="flex space-x-4">
          <span>PROGRESS: {completedLessons.length} / 24 LESSONS</span>
          <span className="text-brand-primary/50">WIZARD_LEVEL: NEOPHYTE</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
