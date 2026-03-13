# CURRICULUM: Vim Mastery - Zero to Wizard (EN/IT)

## Introduction: The Sanfilippo Method
Inspired by Salvatore Sanfilippo (antirez), this course rejects "glue-code" learning. Each lesson is a terminal-first deep dive. We don't just use Vim; we understand its internal state machines and "stratagems" for text manipulation.

---

## LEVEL 1: THE NEOPHYTE (IL NEOFITA)
*Objective: Survive and navigate without fear.*

### 1-1. The Zen of Modality (Lo Zen della Modalità)
- **Technical Core**: Why Vim is modal. Normal vs Insert vs Command.
- **Interactive Drill**: Toggle modes to unlock "doors" in the terminal.
- **Animation**: A 3D "Dungeon Switcher" that changes the terminal's neon highlight based on the mode.
- **Quiz**: "If you want to type, which mode? If you want to move, which mode?"

### 1-2. The hjkl Maze (Il Labirinto hjkl)
- **Technical Core**: Moving without arrow keys. Muscle memory for fingers.
- **Interactive Component**: `HJKLMaze` - A retro-style navigation game where the cursor is the character.
- **Challenge**: Navigate the maze in under 30 seconds without hitting walls.

### 1-3. Basic CRUD (Operazioni Base)
- **Technical Core**: `i` (insert), `a` (append), `u` (undo), `Ctrl-r` (redo).
- **Interactive Drill**: Editing text files and reversing mistakes.

---

## LEVEL 2: THE EFFICIENT (L'UTENTE EFFICIENTE)
*Objective: Editing at the speed of thought.*

### 2-1. The Vim Grammar (La Grammatica di Vim)
- **Technical Core**: Verb + Count + Motion. Commands as sentences (e.g., `d3w`).
- **Interactive Component**: `GrammarBuilder` - Visual "connecting pieces" showing Verb, Count, and Motion coming together.

### 2-2. Keystroke Efficiency (L'Efficienza)
- **Technical Core**: Operators and basic motions (`w`, `e`, `b`).
- **Interactive Component**: `SpeedRacer` - A gamified challenge that tracks keystrokes for refactoring tasks.

---

## LEVEL 3: THE WIZARD (IL MAGO)
*Objective: Total automation and customization.*

### 3-1. Text Objects & Inside/Around (Oggetti di Testo)
- **Technical Core**: The `i` and `a` modifiers. `ciw`, `da(`, `ci"`.
- **Interactive Drill**: Changing the content inside blocks and brackets with single commands.

### 3-2. Macros & Registers (Macro e Registri)
- **Technical Core**: The 26 registers. `q` for recording. `@` for playing.
- **Scenario**: Automate a repetitive refactoring task on multiple lines.

### 3-3. Global Commands (Potere Globale)
- **Technical Core**: `:g` and `:s`. Complex refactoring across entire files.
- **BOSS BATTLE**: Transforming data lists using advanced Vim patterns.
