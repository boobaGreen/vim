# IMPLEMENTATION PLAN: Vim Mastery (Premium Edition)

## 1. Technical Stack (The "Antirez" Modern Stack)
- **Infrastructure**: Vite + React 18+
- **Styling**: Tailwind CSS 3.4+ for utilities, **Framer Motion** for state-driven animations.
- **Terminal Engine**: `react-vim-wasm`. We use actual Vim compiled to WebAssembly to provide 100% command fidelity.
- **State Engine**: **Zustand**. Ultra-fast progress tracking and terminal-state bridging.
- **Internationalization**: `i18next` with sub-path detection for SEO (`/en`, `/it`).
- **Lesson Engine**: **MDX**. Allows embedding `<VimTerminal />` and `<InteractiveQuiz />` directly into lesson text.

## 2. Component Architecture
- **`VimTerminal.node.js`**: A bridge that monitors the WebAssembly Vim's internal state (buffer content, cursor position, last command).
- **`Layout_Glass.jsx`**: A set of premium UI components using `backdrop-filter` and semi-transparent borders.
- **`PathVisualizer.jsx`**: An SVG layer that draws the "path" of a motion (like `3w` or `f'`) over the terminal.

## 3. SEO & Deployment
- **Hosting**: Migrating from Vercel to `vim.claudiodallara.it` (or similar).
- **Bilingual SEO**: Proper `hreflang` tags, dynamic meta-descriptions based on the current lesson, and OpenGraph images generated for each level.

## 4. Execution Roadmap

### Phase 1: Core Engine (Terminal & Navigation) - [COMPLETED]
- Vite + React 19 + Tailwind 4 initialization.
- Integration of `react-vim-wasm`.
- Built the "hjkl Maze" game.

### Phase 2: Content & Didactics (The Grammar) - [COMPLETED]
- MDX rendering pipeline.
- Created Level 1 & 2 lessons (EN/IT).
- Built `GrammarBuilder` and `SpeedRacer` components.

### Phase 3: Advanced Automation (The Wizard) - [COMPLETED]
- Text Objects, Macros, Registers, and Global Commands content.
- Refactored animation logic for lint compliance.
- Implemented persistent progress state via Zustand.

### Phase 4: Expansion & Certification - [PLANNED]
- Global leaderboards for "Vim Golf".
- Advanced customization tutorials (.vimrc/.lua).
- Final "Boss Battle" evaluation engine.
- Optimization for 120FPS smooth terminal experience.
