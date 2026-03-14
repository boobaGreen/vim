import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useProgressStore = create(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      completedLessons: [],
      achievements: [],
      language: 'it',
      view: 'home', // 'home', 'lesson', 'achievements'
      keyboardOverride: null, // null (auto), true (force keyboard), false (force touch)
      settings: {
        theme: 'cyber-dark',
        terminalFont: 'JetBrains Mono',
      },

      setView: (view) => set({ view }),
      
      completeLesson: (lessonId) =>
        set((state) => {
          const isNew = !state.completedLessons.includes(lessonId);
          const xpGain = 100; // Base XP for completing a lesson
          
          return {
            completedLessons: isNew
              ? [...state.completedLessons, lessonId]
              : state.completedLessons,
            xp: isNew ? state.xp + xpGain : state.xp,
            level: Math.floor((state.xp + (isNew ? xpGain : 0)) / 500) + 1
          };
        }),

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
      setLevel: (level) => set({ level }),
      setKeyboardOverride: (val) => set({ keyboardOverride: val }),
      addXP: (amount) => set((state) => ({ 
        xp: state.xp + amount,
        level: Math.floor((state.xp + amount) / 500) + 1
      })),
    }),
    {
      name: 'vim-mastery-progress',
    }
  )
);
