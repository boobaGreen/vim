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
      settings: {
        theme: 'cyber-dark',
        terminalFont: 'JetBrains Mono',
      },

      completeLesson: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        })),

      nextLesson: () => set((state) => ({ currentLessonIndex: state.currentLessonIndex + 1 })),
      
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
