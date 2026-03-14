import React, { useState } from 'react';
import { CheckCircle2, XCircle, Trophy, ArrowRight } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';
import { Button } from '../ui';

const Quiz = ({ id, questions, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const { language, completeLesson, nextLesson } = useProgressStore();

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
      <motion.div 
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
        <Button onClick={nextLesson} className="w-full sm:w-auto px-10 py-4 rounded-xl">
          {language === 'it' ? 'Prossima Lezione' : 'Next Lesson'} <ArrowRight size={18} className="ml-2" />
        </Button>
      </motion.div>
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

      <div className="space-y-6">
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
                ? "border-green-500/50 bg-green-500/10 text-green-400" 
                : "border-red-500/50 bg-red-500/10 text-red-400";
            } else if (isCorrect !== null && isCorrectAnswer) {
              statusClasses = "border-green-500/30 bg-green-500/5 text-green-400/60";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isCorrect !== null}
                className={`flex items-center justify-between p-5 rounded-2xl border transition-all text-left group overflow-hidden relative ${statusClasses}`}
              >
                <span className="font-sans font-medium text-[15px] relative z-10">
                  {opt[language] || opt.en}
                </span>
                <div className="relative z-10">
                  {isSelected && isCorrect && <CheckCircle2 size={20} className="text-green-500" />}
                  {isSelected && !isCorrect && <XCircle size={20} className="text-red-500" />}
                </div>
                {isSelected && (
                  <motion.div 
                    layoutId="quiz-indicator"
                    className={`absolute inset-0 opacity-10 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
