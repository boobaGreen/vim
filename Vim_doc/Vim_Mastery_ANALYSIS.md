# PROJECT ANALYSIS: Vim Mastery Course

## 1. Vision and Objective
The goal is to create the definitive web platform for learning Vim, combining deep technical theory with interactive practice. 
Inspired by Salvatore Sanfilippo (antirez) for its pedagogical depth and clarity, the course will guide users from zero to expert level (Vim Wizard).

## 2. Core Pillars
- **Interactive Terminal**: Adaptive layout that shows the terminal only when a physical keyboard is detected.
- **Touch-First Progression**: Use of quizzes and interactive simulations as the primary completion mechanic on mobile.
- **Gamification 2.0**: Persistent XP system and Level progression to drive engagement.
- **Aesthetic Excellence**: A premium, "Cyber-Terminal" look with glassmorphism, neon highlights, and buttery-smooth animations.
- **Bilingual (EN/IT)**: Full support for both languages in UI and content.

## 3. Detailed Curriculum (3 Levels)

### Level 1: THE NEOPHYTE (IL NEOFITA)
*Survival in the Void*
1.  **The Zen of Modality**: Understanding why Vim has modes.
2.  **Navigation (The Basics)**: Master hjkl.
3.  **Basic Editing**: `i`, `a`, `o`, `x`, `d`.
4.  **Mistakes & Salvation**: `u`, `Ctrl-r`, `:q!`.
5.  **Motion Basics**: `w`, `b`, `e`, `$`, `0`.
6.  **Capstone Lesson**: Editing your first configuration file.

### Level 2: THE EFFICIENT (L'UTENTE EFFICIENTE)
*Speed of Thought*
1.  **Vim Grammar**: Verb + Motion + Count.
2.  **Visual Mastery**: `v`, `V`, `Ctrl-v`.
3.  **Find & Replace**: Navigating with `/` and substituting with `:s`.
4.  **Multi-File Workflow**: Buffers, Windows, and Tabs.
5.  **Customization**: Creating your first `.vimrc`.
6.  **Capstone Lesson**: The "Vim Golf" Challenge Level 1.

### Level 3: THE WIZARD (IL MAGO)
*Total Automation*
1.  **Text Objects**: `iw`, `it`, `ip`, `i"`. Master the "inside" and "around".
2.  **Registers & Macros**: Recording sequences once to repeat forever.
3.  **The Power of `:`**: The Global command (`:g`), the Norm command.
4.  **Markers and Jumps**: Moving across thousands of lines instantly.
5.  **Modern Vim/Neovim**: Introduction to Plugins (LSP, Treesitter) and Lua/Vimscript.
6.  **Final Project**: Building a personalized IDE using only Vim.

## 4. Technical Architecture
- **Frontend**: Vite + React 19 + Tailwind CSS v4.
- **Device Detection**: Custom `useDevice` hook utilizing pointer media queries for hardware-aware layouts.
- **Animations**: Framer Motion 12 for tactile feedback, XP gains, and state transitions.
- **Core Engine**: `vim-wasm` for the real Vim experience (conditional rendering).
- **Content Management**: MDX v3 with integrated `Quiz` and simulation components.
- **State Management**: **Zustand** with persistent storage for XP, Level, and Lessons.

## 5. User Interface (UI) Concepts
- **VimTerminal Integration**: Integrated terminal with responsive stacking.
- **Outfit Branding**: High-end display typography for a professional look.
- **Glassmorphism 2.0**: Refined visual tokens and hover interactions.

## 6. Status & Roadmap
- [x] Phase 1: Core Engine & Navigation (hjkl Maze).
- [x] Phase 2: Vim Grammar & Keystroke Efficiency (Speed Racer).
- [x] Phase 3: Advanced Automation (Macros, Registers, Text Objects).
- [x] Phase 4: Full Curriculum Deployment (12 Lessons).
- [x] Phase 5: Design Systems and Gamification.
- [x] Phase 6: Professional Design & UX Audit (v0.5).

- [x] Phase 7: Radical Overhaul - Mobile Optimization (v1.0 Universal).
- [x] Phase 8: XP & Leveling Gamification System.

---
*Updated on 2026-03-14 - Project is in Production Ready State (v1.0 Universal)*
