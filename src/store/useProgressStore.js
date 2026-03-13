import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useProgressStore = create(
  persist(
    (set) => ({
      currentLevel: 1,
      currentLessonIndex: 0,
      completedLessons: [],
      achievements: [],
      language: 'it',
      view: 'home', // 'home', 'lesson', 'achievements'
      settings: {
        theme: 'cyber-dark',
        terminalFont: 'JetBrains Mono',
      },

      setView: (view) => set({ view }),
      
      completeLesson: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        })),

      nextLesson: () => set((state) => ({ currentLessonIndex: state.currentLessonIndex + 1, view: 'lesson' })),
      prevLesson: () => set((state) => ({ currentLessonIndex: Math.max(0, state.currentLessonIndex - 1), view: 'lesson' })),
      goToLesson: (index) => set({ currentLessonIndex: index, view: 'lesson' }),
      resetProgress: () => set({ currentLessonIndex: 0, completedLessons: [], view: 'home' }),
      
      unlockAchievement: (achievementId) =>
        set((state) => ({
          achievements: state.achievements.includes(achievementId)
            ? state.achievements
            : [...state.achievements, achievementId],
        })),

      setLanguage: (lang) => set({ language: lang }),
      setLevel: (level) => set({ currentLevel: level }),
    }),
    {
      name: 'vim-mastery-progress',
    }
  )
);
