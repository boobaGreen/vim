# 🧙‍♂️ Vim Mastery: Zero to Wizard

![Vim Mastery Banner](https://img.shields.io/badge/VIM-MASTERY-2dd4bf?style=for-the-badge&logo=vim&logoColor=white)
![Build Status](https://img.shields.io/badge/VITE-BEYOND_FAST-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Platform](https://img.shields.io/badge/PLATFORM-WASM-FFD700?style=for-the-badge&logo=webassembly&logoColor=black)
![License](https://img.shields.io/badge/LICENSE-GNU_GPL-red?style=for-the-badge)

**Vim Mastery** is a premium, gamified educational platform designed to turn neophytes into Vim Wizards using a full WASM-powered Vim terminal directly in the browser.

## 🌟 Professional Audit (v0.15)
The latest version introduces a comprehensive **Professional UX & Mobile Audit**:
- **Mobile-First UX**: Interactive Toolbar and D-Pad for seamless terminal control without a physical keyboard.
- **Gamified Completion**: Premium success overlays with trophies and stats for all interactive challenges (`HJKLMaze`, `SpeedRacer`).
- **High-Visibility Terminal**: Enhanced `guicursor` and `cursorline` tracking for a perfectly visible focus state.
- **Reactive Mode Engine**: Real-time terminal styling that reacts to Vim modes (Normal, Insert, Visual).
- **100% Bi-lingual Perfection**: Every UI element, tooltip, and lesson is fully localized (EN/IT).
- **Premium Aesthetics**: Bioactive glowing borders, outfit typography, and radial background depth.

## 🚀 Key Features
- **Interactive WASM Terminal**: Real Vim environment powered by `vim-wasm` with custom touch-injection and visible cursors.
- **Touch Utility Belt**: Dedicated mobile controls for `Esc`, `:`, `/`, and directional `hjkl` motions.
- **On-Screen D-Pad**: Integrated touch navigation for interactive games, making them 100% playable on mobile.
- **12 Lesson Curriculum**: Progress from basic survival to advanced text orchestration with unified content structure.
- **Achievements System**: Unlock badges like "Maze Runner" or "Grammar Master" as you progress.
- **Deep Localization**: Switch between English and Italian with zero hardcoded artifacts.

## 📂 Project Structure
- `src/content/`: MDX-based curriculum with structural consistency (EN/IT).
- `src/components/terminal/`: Bridge to the Vim WASM worker + `MobileVimControls`.
- `src/components/views/`: Main application screens with interactive animations.
- `src/components/ui/`: Custom design system with tactile feedback.
- `src/store/`: Robust state management with `zustand` persistence.

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Custom Bioactive Tokens
- **Animations**: Framer Motion (Hero & Micro-interactions)
- **Core Engine**: `vim-wasm`
- **Icons**: Lucide-React
- **Typography**: Inter & Outfit (Google Fonts)

## 📜 License
This project is licensed under the **GNU General Public License**.

## 👤 Credits
Developed with ❤️ by **Claudio Dall'Ara**.
- 🌐 [claudiodallara.it](https://www.claudiodallara.it/)
- 🐙 [Github: boobaGreen](https://github.com/boobaGreen)
- 💼 [LinkedIn](https://www.linkedin.com/in/claudio-dall-ara-730aa0302/)

---
*SYS_READY // VIM_MASTERY_V0.12*
