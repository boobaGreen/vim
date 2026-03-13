# PROJECT STRUCTURE: Vim Mastery

```text
vim-mastery/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── terminal/       # VimTerminal.jsx
│   │   ├── layout/         # Breadcrumb.jsx, LessonLayout.jsx
│   │   ├── ui/             # Button, Card, Badge (index.jsx)
│   │   └── interactive/    # HJKLMaze, GrammarBuilder, SpeedRacer
│   ├── content/
│   │   ├── en/             # English MDX (level-1, level-2, level-3)
│   │   └── it/             # Italian MDX (level-1, level-2, level-3)
│   ├── store/              # useProgressStore.js
│   ├── LessonRenderer.jsx  # MDX Provider & Component Mapping
│   ├── App.jsx             # Main Routing & Layout
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Key Files Detail

### `src/components/terminal/VimTerminal.jsx`
The heart of the application. Integrates `react-vim-wasm` and provides callbacks for lesson progress detection (e.g., detecting when a user correctly identifies a motion).

### `src/content/**/*.mdx`
Lesson files. They use custom components like `<VimExercise />`, `<CheatSheet />`, and `<InteractiveDiagram />`.

### `src/store/useProgressStore.js`
Handles:
- Completion status of lessons.
- Achievements unlocked.
- Language preference.
- Terminal preferences (theme, font).

### `src/styles/theme.css`
Defines the "Cyber-Terminal" aesthetic:
- Background: Deep Obsidian (`#0A0A0B`)
- Primary: Neon Teal (`#2DD4BF`)
- Accent: Electric Purple (`#A855F7`)
- Effect: Backdrop blur 12px for glassmorphism.
