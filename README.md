# 🧙‍♂️ Vim Mastery: The Universal Editor Trainer

![Vim Mastery Banner](https://img.shields.io/badge/VIM-MASTERY-2dd4bf?style=for-the-badge&logo=vim&logoColor=white)
![Version](https://img.shields.io/badge/VERSION-1.21-FFD700?style=for-the-badge)
![Platform](https://img.shields.io/badge/PLATFORM-CROSS_DEVICE-646cff?style=for-the-badge)

**Vim Mastery** is a premium, gamified educational platform that adapts to your environment. Whether you are on a high-end desktop workstation or a mobile device, Vim Mastery ensures you learn the language of Vim with maximum efficiency.

## 🚀 The Interactivity Overhaul (v1.21)
Our latest release redefines how Vim is taught on the web with massive interactivity improvements:
- **`OpenQuestion` Typing Component**: Moving beyond multiple-choice, users can now type Vim commands directly into an input to answer questions, simulating the real Vim experience perfectly on both desktop and mobile.
- **Improved Mobile Responsiveness**: A completely overhauled header with an intelligent auto-resizing layout and glassmorphism legends ensures mobile users have the cleanest experience possible.
- **Smart Hardware Detection**: Leverages the `useDevice` hook to detect physical keyboards, gracefully handling hybrid devices with a smart toggle & legend.
- **Expanded Quiz Engine**: 100% of the lessons are now verifiable, with expanded quizzes covering all core editing and navigation actions.
- **Gamified XP System**: Every lesson completed grants **100 XP** with persistent progression.

## 🎮 Gamification & Interactive Elements
Vim Mastery is built on a custom education engine that prioritizes action and feedback. We've replaced passive reading with a reactive environment:

### Progression System
- **XP & Levels**: Every action counts. Completing lessons, passing quizzes, and finishing minigames grants **XP**. Accumulate XP to visually level up in the bottom progress bar, going from a Level 1 Neophyte to a Vim Wizard.
- **Achievements**: Unlock mastery badges for perfect quiz scores, discovering hidden macros, and completing entire structural levels.
- **Smart Analytics**: Your progress is persistently saved locally, syncing your Level, XP, and completed modules across sessions.

### The Interactivity Suite
- **Interactive Quizzes**: Present in every theoretical lesson, dynamically testing your knowledge of commands, motions, and grammar. Uses a sleek, high-contrast UI to illuminate correct/incorrect paths without obscuring data.
- **`OpenQuestion` Engine**: A unique typing component where users must physically type out Vim combos (e.g., `d3w` or `cw`) into an input field, featuring real-time validation, neon-glow borders, and intelligent hints if you fail.
- **Minigames**: 
  - **HJKLMaze**: A mental sandbox to test your navigational efficiency.
  - **SpeedRacer**: A high-stakes refactoring simulation that grades you on finding the quickest path to a text edit utilizing Vim operators and counts.

## 🎨 Premium UX/UI & Animations
We abandoned the traditional "boring terminal" look for a **Cyber-Midnight Aesthetic**:
- **Glassmorphism 2.0**: Navigation bars, tooltips, and floating widgets utilize frosted glass effects, giving depth to the interface without cluttering it.
- **Framer Motion Elements**: 
  - Smooth page transitions and unmounting.
  - Interactive hover scaling on terminal buttons and shortcuts.
  - Pulse animations for active lesson states.
  - Glowing, animated color feedback for right/wrong quiz answers.
- **Adaptive Terminal Layout**: The UI intelligently responds to your hardware. If you are on a touch device, the terminal hides entirely, expanding the interactive content. If a keyboard is plugged in, the WASM terminal mounts instantly for split-view parallel practice.

## 📚 The Curriculum Breakdown
A 12-lesson journey, fully localized in both **English** and **Italian**.

### Level 1: The Neophyte
*Survival and basic text navigation.*
1. **The Zen of Modality**: Understanding Normal vs Insert Modes and the mighty `<ESC>`.
2. **The hjkl Maze**: Dropping the arrow keys forever.
3. **Basic CRUD & File Ops**: `i`, `dd`, `yy`, `p`, `u`, `.`, along with file survival commands `:w`, `:q!`, `ZZ`.
4. **Vim Grammar Intro**: First taste of Verbs + Objects. Moving with `0`, `$`, `gg`, `G` and searching with `/` and `*`.

### Level 2: The Efficient User
*Speed of thought and refactoring power.*
5. **Operators & Motions**: Combining `d`, `c`, `y` with word motions (`w`, `e`, `b`).
6. **Counts & Multipliers**: Scaling commands (e.g., `d3w` to delete 3 words).
7. **Speed Racer**: Action-oriented efficiency and keystroke optimization.
8. **Conclusion & Visual Mode**: Utilizing `v`, `V`, `Ctrl+v` to manipulate blocks of text, indent, and transform cases.

### Level 3: The Vim Wizard
*Total automation and text orchestration.*
9. **Text Objects**: Acting on structures (`ciw`, `da(`, `vit`).
10. **Macros Mastery**: Recording sequences with `q` to automate complex refactoring forever.
11. **Registers & Memory**: Utilizing the 26 user registers and the system clipboard.
12. **Global Power**: Unleashing `:g` and `:s` for bulk text transformations.

## 📂 Project Structure
- `src/hooks/useDevice.js`: Intelligent hardware detection.
- `src/store/useProgressStore.js`: Zustand persistent state for Gamification.
- `src/components/interactive/`: Home to `OpenQuestion`, `Quiz`, `HJKLMaze`, `SpeedRacer`.
- `src/content/`: The MDX curriculum backbone.

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 + Motion 12
- **Core Engine**: `vim-wasm`
- **State**: Zustand (Persistent)

## 📜 License & Credits
Licensed under **GNU General Public License**. Developed with ❤️ by **Claudio Dall'Ara**.
- 🌐 [claudiodallara.it](https://www.claudiodallara.it/)
- 🐙 [Github: boobaGreen](https://github.com/boobaGreen)

---
*MISSION_REDEFINED // VIM_MASTERY_V1.0_UNIVERSAL*
