# PROJECT ANALYSIS: Vim Mastery Course

## 1. Vision and Objective
The goal is to create the definitive web platform for learning Vim, combining deep technical theory with interactive practice. 
Inspired by Salvatore Sanfilippo (antirez) for its pedagogical depth and clarity, the course will guide users from zero to expert level (Vim Wizard).

## 2. Core Pillars
- **Interactive Terminal**: No more "reading about it". Users type commands directly in a browser-based Vim.
- **Gamification**: Learning through movement. Games inspired by Vim-Adventures but with modern aesthetics.
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
- **Frontend**: Vite + React 19 + Tailwind CSS 4.
- **Animations**: Framer Motion for UI and state-driven interactive components.
- **Core Engine**: `react-vim-wasm` for the real Vim experience.
- **Content Management**: MDX for flexible lesson layouts with embedded interactive components (`GrammarBuilder`, `SpeedRacer`, `HJKLMaze`).
- **State Management**: **Zustand** with persistent storage for user progress and preferences.
- **Bilingual Engine**: `i18next` with dynamic content switching.

## 5. User Interface (UI) Concepts
- **The Dashboard**: A dynamic progression system (Level 1-3).
- **The Terminal Window**: Premium glassmorphism window integrated with the content area.
- **Interactive Layers**: Real-time feedback for motions and grammar construction.
- **Summary Cards**: Beautifully designed flashcards at the end of each lesson.

## 6. Status & Roadmap
- [x] Phase 1: Core Engine & Navigation (hjkl Maze).
- [x] Phase 2: Vim Grammar & Keystroke Efficiency (Speed Racer).
- [x] Phase 3: Advanced Automation (Macros, Registers, Text Objects).
- [ ] Phase 4: Project Expansion (Vim Golf Global, Advanced Scripting).

---
*Updated on 2026-03-13 - Project is in Active Development (Phase 3 Complete)*
