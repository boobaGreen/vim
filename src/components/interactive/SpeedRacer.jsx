import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, RotateCcw } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';

const CONTENT = {
  it: {
    challenges: [
      { id: 1, source: "hello world vim", target: "vim", hint: "Usa d2w", par: 3 },
      { id: 2, source: "apple orange banana", target: "apple banana", hint: "Usa dw su orange", par: 2 },
      { id: 3, source: "uno due tre quattro", target: "tre quattro", hint: "Usa d2w", par: 2 },
      { id: 4, source: "cancella tutto questo", target: "", hint: "Usa d3w", par: 2 },
      { id: 5, source: "testo da pulire", target: "pulire", hint: "Usa dw", par: 2 },
      { id: 6, source: "vim is extreme", target: "vim extreme", hint: "Usa dw su is", par: 2 },
      { id: 7, source: "1 2 3 4 5", target: "4 5", hint: "Usa d3w", par: 2 },
      { id: 8, source: "elimina la x", target: "limina la x", hint: "Usa x", par: 1 },
      { id: 9, source: "salva il mondo", target: "mondo", hint: "Usa d2w", par: 2 },
      { id: 10, source: "viva il re", target: "", hint: "Usa d3w", par: 2 }
    ],
    ui: {
      title: "Sfida Speed Racer",
      keys: "Tasti",
      source: "Sorgente",
      target: "Obiettivo",
      hint: "Suggerimento",
      par: "Par: {n} Tasti",
      challengeCount: "Sfida {x} di {y}",
      reset: "Resetta",
      winTitle: "Record Battuto!",
      winDesc: "Efficienza Massima Raggiunta",
      next: "Prossima Sfida",
      showHint: "Mostra Suggerimento"
    }
  },
  en: {
    challenges: [
      { id: 1, source: "hello world vim", target: "vim", hint: "Use d2w", par: 3 },
      { id: 2, source: "apple orange banana", target: "apple banana", hint: "Use dw on orange", par: 2 },
      { id: 3, source: "one two three four", target: "three four", hint: "Use d2w", par: 2 },
      { id: 4, source: "delete all this", target: "", hint: "Use d3w", par: 2 },
      { id: 5, source: "text to clean", target: "clean", hint: "Use dw", par: 2 },
      { id: 6, source: "vim is extreme", target: "vim extreme", hint: "Use dw on is", par: 2 },
      { id: 7, source: "1 2 3 4 5", target: "4 5", hint: "Use d3w", par: 2 },
      { id: 8, source: "delete the x", target: "elete the x", hint: "Use x", par: 1 },
      { id: 9, source: "save the world", target: "world", hint: "Use d2w", par: 2 },
      { id: 10, source: "long live king", target: "", hint: "Use d3w", par: 2 }
    ],
    ui: {
      title: "Speed Racer Challenge",
      keys: "Keys",
      source: "Source",
      target: "Target",
      hint: "Hint",
      par: "Par: {n} Keys",
      challengeCount: "Challenge {x} of {y}",
      reset: "Reset",
      winTitle: "Record Broken!",
      winDesc: "Maximum Efficiency Reached",
      next: "Next Challenge",
      showHint: "Show Hint"
    }
  }
};

const SpeedRacerGame = ({ challenge, onWin, currentIdx, totalChallenges, resetGlobal, keystrokes, setKeystrokes }) => {
  const language = useProgressStore((state) => state.language);
  const localized = CONTENT[language] || CONTENT.en;

  const [currentText, setCurrentText] = useState(challenge.source);
  const [cursorPos, setCursorPos] = useState(0);
  const [commandBuffer, setCommandBuffer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showWinOverlay, setShowWinOverlay] = useState(false);

  const handleWin = useCallback(() => {
    setShowWinOverlay(true);
    onWin();
  }, [onWin]);

  const processVimCommand = useCallback((cmd) => {
    let newText = currentText;
    let newPos = cursorPos;
    let valid = false;

    const fullCmd = commandBuffer + cmd;
    
    if (fullCmd === 'x') {
      newText = currentText.slice(0, cursorPos) + currentText.slice(cursorPos + 1);
      newPos = Math.min(cursorPos, newText.length - 1);
      if (newPos < 0) newPos = 0;
      valid = true;
      setCommandBuffer("");
    }
    else if (fullCmd.startsWith('d')) {
      const match = fullCmd.match(/^d(\d*)w$/);
      if (match) {
        const count = parseInt(match[1] || "1");
        let tempText = currentText;
        let tempPos = cursorPos;
        
        for (let i = 0; i < count; i++) {
          const remaining = tempText.slice(tempPos);
          const nextSpace = remaining.indexOf(" ");
          if (nextSpace === -1) {
            tempText = tempText.slice(0, tempPos);
            break;
          } else {
            tempText = tempText.slice(0, tempPos) + tempText.slice(tempPos + nextSpace + 1);
          }
        }
        newText = tempText;
        newPos = Math.min(tempPos, newText.length - 1);
        if (newPos < 0) newPos = 0;
        valid = true;
        setCommandBuffer("");
      } else if (fullCmd === 'd' || /d\d+$/.test(fullCmd)) {
        setCommandBuffer(fullCmd);
        return;
      } else {
        setCommandBuffer("");
      }
    }
    else if (fullCmd === 'h') {
      newPos = Math.max(0, cursorPos - 1);
      valid = true;
      setCommandBuffer("");
    } else if (fullCmd === 'l') {
      newPos = Math.min(currentText.length - 1, cursorPos + 1);
      valid = true;
      setCommandBuffer("");
    } else {
        setCommandBuffer("");
    }

    if (valid) {
      setCurrentText(newText);
      setCursorPos(newPos);
      setKeystrokes(prev => prev + 1);
      
      if (newText.trim() === challenge.target.trim()) {
        handleWin();
      }
    }
  }, [currentText, cursorPos, commandBuffer, handleWin, challenge.target, setKeystrokes]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showWinOverlay) return;
      if (e.key.length === 1 && /[a-z0-9]/.test(e.key)) {
        processVimCommand(e.key);
      } else if (e.key === 'Backspace') {
        setCommandBuffer("");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [processVimCommand, showWinOverlay]);

  const resetChallenge = () => {
    setCurrentText(challenge.source);
    setCursorPos(0);
    setKeystrokes(0);
    setCommandBuffer("");
    setShowHint(false);
    setShowWinOverlay(false);
  };

  const MMotionDiv = motion.div;

  return (
    <div className="glass-morphism p-6 sm:p-8 rounded-3xl border-white/10 space-y-6 neo-shadow relative overflow-hidden">
      <MMotionDiv 
        animate={{ opacity: [0.1, 0.2, 0.1] }} 
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-0 right-0 p-4 pointer-events-none"
      >
        <Zap size={80} className="text-brand-primary" />
      </MMotionDiv>

      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2 text-brand-primary">
          <Trophy size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{localized.ui.title}</span>
        </div>
        <div className="text-2xl font-black italic text-brand-primary">
          {keystrokes} <span className="text-[10px] uppercase tracking-normal not-italic text-white/30">{localized.ui.keys}</span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-1">{localized.ui.source}</p>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 font-mono text-sm sm:text-base text-white/60 min-h-[80px] flex items-center overflow-hidden relative">
              <div className="flex flex-wrap">
                {currentText.split("").map((char, i) => (
                  <span key={i} className={`relative ${i === cursorPos ? 'text-brand-bg bg-brand-primary' : ''}`}>
                    {char === " " ? "\u00A0" : char}
                    {i === cursorPos && (
                      <motion.div 
                        layoutId="cursor"
                        className="absolute inset-0 bg-brand-primary -z-10"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </span>
                ))}
                {currentText.length === 0 && cursorPos === 0 && (
                   <span className="text-brand-bg bg-brand-primary">&nbsp;</span>
                )}
              </div>
              {commandBuffer && (
                <div className="absolute bottom-1 right-2 text-[9px] font-black text-brand-primary opacity-50 uppercase">
                  Cmd: {commandBuffer}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest px-1">{localized.ui.target}</p>
            <div className="bg-brand-primary/5 p-4 rounded-2xl border border-brand-primary/20 font-mono text-sm sm:text-base text-brand-primary min-h-[80px] flex items-center overflow-x-auto">
              {challenge.target}
            </div>
          </div>
        </div>
        
        <div className="bg-white/[0.02] p-4 rounded-2xl border border-dashed border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group hover:bg-white/5 transition-colors min-h-[56px]">
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
            {localized.ui.hint}: 
            {showHint ? (
              <span className="text-white/60 italic lowercase">{challenge.hint}</span>
            ) : (
              <button 
                onClick={() => setShowHint(true)}
                className="text-[9px] text-brand-primary border border-brand-primary/30 px-2 py-0.5 rounded-full hover:bg-brand-primary/10 transition-colors"
              >
                {localized.ui.showHint}
              </button>
            )}
          </div>
          <div className="text-[9px] font-black text-brand-primary px-2 py-1 bg-brand-primary/10 rounded uppercase tracking-tighter">
            {localized.ui.par.replace('{n}', challenge.par || 3)}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest relative z-10">
        <div className="text-white/40">{localized.ui.challengeCount.replace('{x}', currentIdx + 1).replace('{y}', totalChallenges)}</div>
        <button onClick={resetChallenge} className="flex items-center space-x-1 hover:text-white transition-colors">
          <RotateCcw size={12} />
          <span>{localized.ui.reset}</span>
        </button>
      </div>

      <AnimatePresence>
        {showWinOverlay && (
          <MMotionDiv 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-bg/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="bg-brand-primary/20 p-6 rounded-full mb-6 text-brand-primary">
              <Zap size={48} className="animate-pulse" />
            </div>
            <h3 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter mb-2">{localized.ui.winTitle}</h3>
            <p className="text-white/50 text-xs uppercase tracking-[0.2em] font-bold mb-8">{localized.ui.winDesc}</p>
            <div className="flex gap-4">
               <button 
                onClick={resetChallenge}
                className="px-6 py-3 bg-white/10 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-white/20 transition-all border border-white/10"
              >
                {localized.ui.reset}
              </button>
              <button 
                onClick={resetGlobal}
                className="px-8 py-3 bg-brand-primary text-brand-bg font-black rounded-2xl uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(45,212,191,0.3)] hover:scale-105 transition-transform"
              >
                {localized.ui.next}
              </button>
            </div>
          </MMotionDiv>
        )}
      </AnimatePresence>

      <div className="lg:hidden text-[8px] text-white/20 uppercase text-center font-bold tracking-widest">
        Usa la console mobile per inviare i comandi i, x, dw
      </div>
    </div>
  );
};

const SpeedRacer = ({ onComplete, onCompleteId }) => {
  const language = useProgressStore((state) => state.language);
  const localized = CONTENT[language] || CONTENT.en;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);

  const handleGlobalWin = useCallback(() => {
    if (onComplete) onComplete();
    useProgressStore.getState().completeLesson(onCompleteId || '07-speed-racer');
  }, [onComplete, onCompleteId]);

  const nextChallenge = () => {
    if (currentIdx < localized.challenges.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setKeystrokes(0);
    }
  };

  return (
    <SpeedRacerGame 
      key={`${currentIdx}-${language}`}
      currentIdx={currentIdx}
      totalChallenges={localized.challenges.length}
      challenge={localized.challenges[currentIdx]}
      onWin={handleGlobalWin}
      resetGlobal={nextChallenge}
      keystrokes={keystrokes}
      setKeystrokes={setKeystrokes}
    />
  );
};

export default SpeedRacer;
