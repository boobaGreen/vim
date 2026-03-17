# 🧙‍♂️ Vim Mastery: The Universal Editor Trainer

![Vim Mastery Banner](https://img.shields.io/badge/VIM-MASTERY-2dd4bf?style=for-the-badge&logo=vim&logoColor=white)
![Version](https://img.shields.io/badge/VERSION-1.30-FFD700?style=for-the-badge)
![Platform](https://img.shields.io/badge/PLATFORM-CROSS_DEVICE-646cff?style=for-the-badge)

**Vim Mastery** is a premium, gamified educational platform that adapts to your environment. Whether you are on a high-end desktop workstation or a mobile device, Vim Mastery ensures you learn the language of Vim with maximum efficiency.

## 🚀 The Interactivity Overhaul (v1.4)

Our latest release redefines how Vim is taught on the web with massive interactivity improvements:

- **Real Vim Simulation (Speed Racer)**: The Speed Racer challenge is no longer a placeholder. It now features a custom Vim command processor (supporting `x`, `dw`, `d2w`, etc.) with real-time text manipulation and cursor feedback, eliminating the need for external terminal testing for validation.
- **`OpenQuestion` Typing Component**: Moving beyond multiple-choice, users can now type Vim commands directly into an input to answer questions, simulating the real Vim experience perfectly on both desktop and mobile.
- **Unified Mobile Console**: A persistent, semi-transparent console that bridges the gap between touch input and terminal commands, now fully integrated with interactive challenges.
- **Smart Hardware Detection**: Leverages the `useDevice` hook to detect physical keyboards, gracefully handling hybrid devices with a smart toggle & legend.
- **Expanded Quiz Engine**: 100% of the lessons are now verifiable, with expanded quizzes covering all core editing and navigation actions.
- **Gamified XP System**: Every lesson completed grants **100 XP** with persistent progression.

## 🎮 Gamification & Interactive Elements

Vim Mastery is built on a custom education engine that prioritizes action and feedback. We've replaced passive reading with a reactive environment:

### Progression System

- **XP & Levels**: Every interaction counts. Completing a lesson grants a baseline of **100 XP**. Accumulate XP to visually level up the bottom progress bar, advancing from a Level 1 Neophyte up to Level 12 Vim Wizard.
- **Achievements (Bilingual)**: A dedicated trophy room dynamically translates into EN/IT. Unlocking features grants badges:
  - _First Step_ (Finish Lesson 1)
  - _Maze Runner_ (Beat the HJKL Maze)
  - _Grammar Master_ (Unlock Level 2)
  - _Wizard Apprentice_ (Unlock Level 3)
  - _The Terminator_ (Complete all 12 modules)
- **Smart Analytics**: Your progress is persistently saved locally via Zustand middleware, syncing your Level, XP, and completed modules perfectly across sessions.

### The Interactivity Suite

- **Interactive Quizzes (33 Questions total)**: Present in every theoretical lesson, dynamically testing your knowledge.
  - **L01: Zen** (6 Questions - testing ESC and modes)
  - **L02: Maze** (5 Questions - testing HJKL navigation)
  - **L05: Operators** (5 Questions - testing verb+motion)
  - **L06: Counts** (5 Questions - testing multipliers)
  - **L07: Speed Racer** (4 Questions - testing refactoring speed)
  - **L08: Conclusion** (4 Questions - testing visual mode & synthesis)
  - **L09, L10, L11, L12** (4 Questions each - testing advanced wizardry)
- **`OpenQuestion` Engine**: A unique typing component where users must physically type out correct Vim combo strings (e.g., `d3w`, `cw`, `y5w`) into a styled input field, featuring real-time validation, neon-glow borders, and intelligent contextual hints if you fail.
- **Minigames**:
  - **HJKLMaze**: A mental Sandbox UI to test your navigational efficiency.
  - **SpeedRacer**: A high-stakes refactoring simulation that grades you on finding the absolute quickest path to a text edit utilizing Vim operators and counts.

## 🎨 Premium UX/UI & Animations

We abandoned the traditional "boring terminal" look for a **Cyber-Midnight Aesthetic**:

- **Glassmorphism 2.0**: Navigation bars, tooltips, and floating widgets utilize frosted glass effects, giving depth to the interface without obscuring content beneath.
- **Framer Motion Elements**:
  - **Page Layout**: Smooth layout mounting/unmounting transitions.
  - **Buttons**: Interactive hover scaling and layout bumping on terminal buttons and shortcuts.
  - **Feedback Status**: Pulse animations for active lesson states. Glowing neon borders (green/red) and animated drop-shadow popups for correct/incorrect `OpenQuestion` and `Quiz` submissions.
  - **Data Visualization**: An SVG animated circle-progress bar for total Completion tracking inside the Achievements view.
- **Adaptive Terminal Layout**: The UI intelligently responds to your hardware via pointer detection.
  - **Touch device**: The terminal hides entirely, expanding the interactive theoretical content to full width.
  - **Desktop/Keyboard**: The WASM terminal mounts instantly for split-view parallel practice.
  - **Manual Override**: A glassmorphism tooltip allows hybrid users (e.g., iPad + Keyboard) to force the terminal visible.

## 📚 The Curriculum Breakdown

A comprehensive 12-lesson journey, fully localized in both **English** and **Italian**.

### Level 1: The Neophyte

_Survival and basic text navigation._

1. **The Zen of Modality**: Understanding Normal vs Insert Modes. `i`, `I`, `a`, `A`, `o`, `O` and the mighty `<ESC>`. (6 Qs)
2. **The hjkl Maze**: Dropping the arrow keys forever. Navigating lines efficiently. (5 Qs)
3. **Basic CRUD & File Ops**: Master file survival `:w`, `:q`, `:wq`, `ZZ`, `ZQ`. Basic editing with `x`, `dd`, `yy`, `p`, `u`, `Ctrl-R`, and `.`.
4. **Vim Grammar Intro**: First taste of Verbs + Objects. Moving horizontally `0`, `$`, `^`, `f`, `t`. Moving vertically `gg`, `G`, `%`. Searching with `/`, `?`, `n`, `N`, `*`.

### Level 2: The Efficient User

_Speed of thought and refactoring power._ 5. **Operators & Motions**: Combining verbs (`d`, `c`, `y`) with word motions (`w`, `e`, `b`). Contains an `OpenQuestion` integration. (5 Qs) 6. **Counts & Multipliers**: Scaling commands (e.g., `d3w`, `4j`). Contains an `OpenQuestion` integration. (5 Qs) 7. **Speed Racer**: Action-oriented efficiency and keystroke optimization. Focuses on finding the shortest path sequence. (4 Qs) 8. **Conclusion & Visual Mode**: Utilizing `v`, `V`, `Ctrl+v` to manipulate blocks of text, indent (`>`, `<`), and transform cases (`u`, `U`). (4 Qs)

### Level 3: The Vim Wizard

_Total automation and text orchestration._ 9. **Text Objects**: Acting on structures inside/around (`ciw`, `da(`, `vit`). 10. **Macros Mastery**: Recording complex sequences with `q`, playing with `@`, and recursive editing. 11. **Registers & Memory**: Utilizing the 26 unique user registers (`"a` to `"z`) and the system clipboard (`"+y`). 12. **Global Power**: Unleashing the Command-line mode `:g` (Global) and `:s` (Substitute) filters for bulk multi-file regex transformations.

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

_MISSION_REDEFINED // VIM_MASTERY_V1.0_UNIVERSAL_
