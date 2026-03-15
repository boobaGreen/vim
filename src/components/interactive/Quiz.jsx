import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, ArrowRight } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';
import { Button } from '../ui';

// Assuming CONTENT is defined elsewhere, e.g., imported from a localization file
// const CONTENT = {
//   en: {
//     moduleCompleted: 'Module Completed!',
//     continueLesson: 'Continue Lesson',
//     // ... other localized strings
//   },
//   it: {
//     moduleCompleted: 'Modulo Completato!',
//     continueLesson: 'Continua Lezione',
//     // ... other localized strings
//   },
// };

const Quiz = ({ id, questions, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const MMotionDiv = motion.div;
  
  const { language, completeLesson } = useProgressStore();

  const handleAnswer = (index) => {
    if (isCorrect !== null) return;
    
    setSelectedAnswer(index);
    const correct = index === questions[currentStep].correctIndex;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(s => s + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setIsFinished(true);
        if (onComplete) onComplete();
        completeLesson(id);
      }
    }, 1500);
  };

  if (isFinished) {
    return (
      <MMotionDiv 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-primary/5 border border-brand-primary/20 rounded-[2rem] p-10 text-center space-y-6 my-10"
      >
        <div className="bg-brand-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <Trophy className="text-brand-primary" size={40} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">
            {language === 'it' ? 'Modulo Completato!' : 'Module Completed!'}
          </h3>
          <p className="text-white/50 text-sm font-sans">
            {language === 'it' 
              ? `Hai risposto correttamente a ${score} su ${questions.length} domande.` 
              : `You answered ${score} out of ${questions.length} questions correctly.`}
          </p>
        </div>
        <Button onClick={() => setIsFinished(false)} className="w-full sm:w-auto px-10 py-4 rounded-xl">
          {language === 'it' ? 'Continua Lezione' : 'Continue Lesson'}
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </MMotionDiv>
    );
  }

  const q = questions[currentStep];

  return (
    <div className="my-10 space-y-8">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary/50 italic">
          QUIZ: {currentStep + 1} / {questions.length}
        </span>
        <div className="flex space-x-1">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${
                i < currentStep ? 'w-4 bg-brand-primary' : 
                i === currentStep ? 'w-8 bg-brand-primary animate-pulse' : 
                'w-2 bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>



      <AnimatePresence mode="wait">
        <MMotionDiv 
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <h4 className="text-xl md:text-2xl font-display font-black text-white leading-tight">
            {q.question[language] || q.question.en}
          </h4>

          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === q.correctIndex;
              
              let statusClasses = "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05] hover:border-white/20";
              if (isSelected) {
                statusClasses = isCorrect 
                  ? "border-green-400/50 bg-green-500/10 text-white shadow-[0_0_15px_rgba(34,197,94,0.15)] font-bold" 
                  : "border-red-400/50 bg-red-500/10 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)] font-bold";
              } else if (isCorrect === false && isCorrectAnswer) {
                statusClasses = "border-brand-primary/60 bg-brand-primary/10 text-brand-primary border-dashed font-bold";
              } else if (isCorrect !== null) {
                statusClasses = "border-white/5 bg-transparent text-white/30 opacity-40";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isCorrect !== null}
                  className={`flex items-center justify-between p-5 rounded-xl border transition-all text-left group overflow-hidden relative ${statusClasses}`}
                >
                  <span className="font-sans text-[15px] relative z-10 transition-colors">
                    {opt[language] || opt.en}
                  </span>
                  <div className="relative z-10 shrink-0 ml-4">
                    {isSelected && isCorrect && <CheckCircle2 size={24} className="text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />}
                    {isSelected && !isCorrect && <XCircle size={24} className="text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />}
                  </div>
                  {isSelected && (
                    <MMotionDiv 
                      layoutId="quiz-indicator"
                      className={`absolute left-0 top-0 bottom-0 w-1 ${isCorrect ? 'bg-green-400' : 'bg-red-400'}`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </MMotionDiv>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
