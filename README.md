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

## 🌟 Key Features
- **WASM Vim Engine**: A real Vim 9.0 environment running in your browser via WebAssembly.
- **Physical Keyboard Override**: A manual toggle for hybrid devices (like iPads with keyboards) to force the terminal visible.
- **24-Lesson Curriculum**: Comprehensive journey from `hjkl` to `Global` commands, fully localized in **English and Italian**.
- **Cyber-Midnight Aesthetics**: Premium glassmorphism, bioactive animations, and high-performance typography.

## 📂 Project Structure
- `src/hooks/useDevice.js`: The brain behind hardware detection.
- `src/store/useProgressStore.js`: Persistent state for XP, Level, and progression.
- `src/components/interactive/Quiz.jsx`: The new touch-first interactive engine.
- `src/content/`: MDX curriculum with interactive component integration.

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
