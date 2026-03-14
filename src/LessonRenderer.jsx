import React, { Suspense, lazy } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { useProgressStore } from './store/useProgressStore';
import LessonLayout from './components/layout/LessonLayout';
import { Card, Badge, Button } from './components/ui';
import HJKLMaze from './components/interactive/HJKLMaze';
import GrammarBuilder from './components/interactive/GrammarBuilder';
import SpeedRacer from './components/interactive/SpeedRacer';
import Quiz from './components/interactive/Quiz';

import { Kbd, InfoBox, CommandTable, Step, DirectionalGrid, ShortcutGrid } from './components/ui/MDXComponents';

const components = {
  wrapper: ({ children, isCompleted, onNext, language }) => (
    <LessonLayout 
      {...children.props} 
      isCompleted={isCompleted} 
      onNext={onNext} 
      language={language}
    >
      {children}
    </LessonLayout>
  ),
  Card,
  Badge,
  Button,
  HJKLMaze,
  GrammarBuilder,
  SpeedRacer,
  Quiz,
  Kbd,
  InfoBox,
  CommandTable,
  Step,
  DirectionalGrid,
  ShortcutGrid
};

const lessons = import.meta.glob('./content/**/*.mdx');
const lazyLessons = Object.fromEntries(
  Object.entries(lessons).map(([key, importFn]) => [key, lazy(importFn)])
);

const LessonRenderer = ({ path, isCompleted, onNext }) => {
  const language = useProgressStore((state) => state.language);
  const lessonKey = `./content/${path}.mdx`;
  const DynamicLesson = lazyLessons[lessonKey];

  if (!DynamicLesson) {
    return (
      <div className="text-red-500 font-mono text-xs p-4 border border-red-500/20 bg-red-500/5 rounded-xl">
        {language === 'it' 
          ? `Errore: Lezione non trovata a ${lessonKey}` 
          : `Error: Lesson not found at ${lessonKey}`}
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="animate-pulse text-brand-primary uppercase text-[10px] font-black tracking-widest py-8">
        {language === 'it' ? 'Caricamento Flusso Dati...' : 'Loading Data Stream...'}
      </div>
    }>
      <MDXProvider components={components}>
        <div className="prose max-w-none">
          <wrapper isCompleted={isCompleted} onNext={onNext} language={language}>
            <DynamicLesson />
          </wrapper>
        </div>
      </MDXProvider>
    </Suspense>
  );
};

export default LessonRenderer;
