import React, { Suspense, lazy } from 'react';
import { MDXProvider } from '@mdx-js/react';
import LessonLayout from './components/layout/LessonLayout';
import { Card, Badge, Button } from './components/ui';
import HJKLMaze from './components/interactive/HJKLMaze';
import GrammarBuilder from './components/interactive/GrammarBuilder';

const components = {
  wrapper: ({ children }) => <LessonLayout {...children.props}>{children}</LessonLayout>,
  Card,
  Badge,
  Button,
  HJKLMaze,
  GrammarBuilder
};

const LessonRenderer = ({ path }) => {
  const DynamicLesson = lazy(() => import(`./content/${path}.mdx`));

  return (
    <Suspense fallback={<div className="animate-pulse text-brand-primary uppercase text-xs">Loading Data Stream...</div>}>
      <MDXProvider components={components}>
        <DynamicLesson />
      </MDXProvider>
    </Suspense>
  );
};

export default LessonRenderer;
