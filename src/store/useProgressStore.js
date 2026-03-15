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
          
          if (!isNew) return state;

          const newCompleted = [...state.completedLessons, lessonId];
          const calculatedXp = state.xp + xpGain;
          
          // Evaluate Achievements
          const newAchievements = [...state.achievements];
          const grant = (id) => { if (!newAchievements.includes(id)) newAchievements.push(id) };

          if (newCompleted.includes('01-zen')) grant('first-step');
          if (newCompleted.includes('02-maze')) grant('maze-runner');
          if (newCompleted.includes('03-crud')) grant('edit-master');
          if (newCompleted.includes('04-grammar-intro')) grant('grammar-master');
          if (newCompleted.includes('07-speed-racer')) grant('speed-demon');
          if (newCompleted.includes('08-conclusion')) grant('wiz-apprentice');
          if (newCompleted.includes('10-macros')) grant('macro-master');
          if (newCompleted.includes('12-global-commands')) grant('terminator');
          
          if (newCompleted.length >= 6) grant('halfway-there');
          if (newCompleted.length >= 10) grant('expert');

          return {
            completedLessons: newCompleted,
            xp: calculatedXp,
            level: Math.floor(calculatedXp / 500) + 1,
            achievements: newAchievements
          };
        }),

      nextLesson: () => set((state) => {
        const totalLessons = 12;
        if (state.currentLessonIndex >= totalLessons - 1) {
          return { view: 'home' }; // Course completed
        }
        return { currentLessonIndex: state.currentLessonIndex + 1, view: 'lesson' };
      }),
      prevLesson: () => set((state) => ({ currentLessonIndex: Math.max(0, state.currentLessonIndex - 1), view: 'lesson' })),
      goToLesson: (index) => set({ currentLessonIndex: index, view: 'lesson' }),
      resetProgress: () => set({ 
        currentLessonIndex: 0, 
        completedLessons: [], 
        view: 'home',
        xp: 0,
        level: 1,
        achievements: []
      }),
      
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
