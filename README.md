# 🧙‍♂️ Vim Mastery: Zero to Wizard

![Vim Mastery Banner](https://img.shields.io/badge/VIM-MASTERY-2dd4bf?style=for-the-badge&logo=vim&logoColor=white)
![Build Status](https://img.shields.io/badge/VITE-BEYOND_FAST-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Platform](https://img.shields.io/badge/PLATFORM-WASM-FFD700?style=for-the-badge&logo=webassembly&logoColor=black)
![License](https://img.shields.io/badge/LICENSE-GNU_GPL-red?style=for-the-badge)

**Vim Mastery** is a premium, gamified educational platform designed to turn neophytes into Vim Wizards using a full WASM-powered Vim terminal directly in the browser.

## 🌟 The Final Polish (v1.0)
The latest version completes the vision of a professional-grade, cross-platform learning tool:
- **Unified Mobile Console**: A custom-built, touch-first environment featuring a **Virtual QWERTY Keyboard**, a high-precision **Navigation D-Pad**, and quick-action toolbars.
- **Zero-Scroll Architecture**: Optimized viewport management ensures the terminal, keyboard, and instructions all fit on a single mobile screen.
- **24-Lesson Curriculum**: A deep dive from basic `hjkl` movement to advanced macros, fully available in both **English and Italian** (100% localization parity).
- **Edge Educational Tools**: A reactive **Pro-Tip System** that teaches alternative commands (like `Ctrl+[` for Escape) in real-time during Insert mode.
- **Premium Design System**: A cohesive "Cyber-Midnight" aesthetic with glassmorphism, bioactive glowing borders, and Outfit/Inter performance typography.
- **Gamified Progression**: Seamless integration between interactive challenges (`HJKLMaze`, `SpeedRacer`) and lesson advancement via a persistent Zustand store.

## 🚀 Key Features
- **Interactive WASM Terminal**: Real Vim environment powered by `vim-wasm` with high-visibility cursor tracking and `guicursor` injection.
- **Mode-Aware Reactive UI**: The interface physically reacts (colors, shadows) to Vim's internal states (Normal, Insert, Visual, Replace).
- **Touch Utility Belt**: Dedicated mobile controls for `Esc`, `:`, `/`, `u`, `i`, and `Tab`, reachable in thumb-friendly zones.
- **Achievements & Metrics**: Track your progress with a robust achievement system and real-time efficiency metrics in challenges.
- **Deep Localization**: Switch between English and Italian instantly with zero layout shifts or missing content.

## 📂 Project Structure
- `src/content/`: MDX-based curriculum with perfect structural parity between `en` and `it`.
- `src/components/terminal/`: The "Unified Mobile Console" core, bridging WASM logic with touch interaction.
- `src/components/interactive/`: Localized, game-based learning modules.
- `src/components/ui/MDXComponents.jsx`: A library of highly semantic, localized MDX tags for technical education.
- `src/store/`: Centralized state for progress, language, and achievements via `zustand`.

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 + Custom Neon/Midnight Design Tokens
- **Animations**: Framer Motion (Optimized for 60fps mobile transitions)
- **Core Engine**: `vim-wasm` (WebAssembly)
- **Icons**: Lucide-React
- **Typography**: Outfit & Inter (Google Fonts)

## 📜 License
This project is licensed under the **GNU General Public License**.

## 👤 Credits
Developed with ❤️ by **Claudio Dall'Ara**.
- 🌐 [claudiodallara.it](https://www.claudiodallara.it/)
- 🐙 [Github: boobaGreen](https://github.com/boobaGreen)
- 💼 [LinkedIn](https://www.linkedin.com/in/claudio-dall-ara-730aa0302/)

---
*MISSION_ACCOMPLISHED // VIM_MASTERY_V1.0*
