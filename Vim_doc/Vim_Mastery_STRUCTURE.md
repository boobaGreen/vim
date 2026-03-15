# PROJECT STRUCTURE: Vim Mastery

```text
vim-mastery/
├── public/                 # Static assets (favicons, etc.)
├── src/
│   ├── components/
│   │   ├── terminal/       # VimTerminal.jsx
│   │   ├── views/          # Landing.jsx, Achievements.jsx
│   │   ├── ui/             # MDXComponents.jsx, index.jsx (Button, etc.)
│   │   │   ├── interactive/    # HJKLMaze, GrammarBuilder, SpeedRacer, Quiz, OpenQuestion
│   │   │   ├── layout/         # LessonLayout, CompletionCard, Breadcrumb
│   ├── hooks/          # useDevice.js (Hardware Detection)
│   ├── store/          # useProgressStore.js (XP, Level, Progression)
│   ├── LessonRenderer.jsx  # MDX Provider & Component Mapping
│   ├── App.jsx             # Main Routing & Layout
│   ├── index.css           # Global Styles (Tailwind v4 tokens)
│   └── main.jsx
├── Vim_doc/                # Comprehensive Project Documentation
├── dist/                   # Production Build
├── package.json
└── vite.config.js
```

## Key Files Detail

### `src/components/terminal/VimTerminal.jsx`
The terminal heart. Integrates `vim-wasm` worker and manages interactivity with lesson content.

### `src/components/ui/MDXComponents.jsx`
Premium didactic components:
- `Kbd`: Keyboard shortcut styling.
- `InfoBox`: Glowing glassmorphism callouts.
- `Step`: Bold sequence indicators.
- `CommandTable`: Interactive syntax guides.

### `src/content/**/*.mdx`
The 12-unique-lesson core curriculum (24 files total, fully bilingual). Every lesson includes mandatory touch-friendly verification (Quizzes/Simulations).

### `src/store/useProgressStore.js`
Handles:
- XP & Leveling system.
- Completion status & Achievements.
- Keyboard Override state.
- Bilingual state (EN/IT).

### `src/index.css`
Advanced Cyber-Midnight Design System:
- **Tailwind CSS v4** base.
- Custom **Glassmorphism 2.0** utilities.
- Professional typography tokens (**Outfit** & **Inter**).
