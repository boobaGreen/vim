import React, { Suspense, lazy } from 'react';
import { MDXProvider } from '@mdx-js/react';
import LessonLayout from './components/layout/LessonLayout';
import { Card, Badge, Button } from './components/ui';
import HJKLMaze from './components/interactive/HJKLMaze';
import GrammarBuilder from './components/interactive/GrammarBuilder';
import SpeedRacer from './components/interactive/SpeedRacer';

import { Kbd, InfoBox, CommandTable, Step } from './components/ui/MDXComponents';

const components = {
  wrapper: ({ children }) => <LessonLayout {...children.props}>{children}</LessonLayout>,
  Card,
  Badge,
  Button,
  HJKLMaze,
  GrammarBuilder,
  SpeedRacer,
  Kbd,
  InfoBox,
  CommandTable,
  Step
};

const lessons = import.meta.glob('./content/**/*.mdx');
console.log('Available lessons:', Object.keys(lessons));
const lazyLessons = Object.fromEntries(
  Object.entries(lessons).map(([key, importFn]) => [key, lazy(importFn)])
);

const LessonRenderer = ({ path }) => {
  const lessonKey = `./content/${path}.mdx`;
  console.log('Loading lesson:', lessonKey);
  const DynamicLesson = lazyLessons[lessonKey];

  if (!DynamicLesson) {
    return <div className="text-red-500 font-mono text-xs p-4 border border-red-500/20 bg-red-500/5">Error: Lesson not found at {lessonKey}</div>;
  }

  return (
    <Suspense fallback={<div className="animate-pulse text-brand-primary uppercase text-xs">Loading Data Stream...</div>}>
      <MDXProvider components={components}>
        <div className="prose max-w-none">
          <DynamicLesson />
        </div>
      </MDXProvider>
    </Suspense>
  );
};

export default LessonRenderer;
