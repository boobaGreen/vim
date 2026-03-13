# GLOSSARY: Vim Mastery Technical Terms

This glossary defines the "Vim Grammar" and internal mechanics taught in this course, using a technical, low-level approach inspired by Salvatore Sanfilippo.

### 1. The Vim Grammar (Soggetto + Verbo + Oggetto)
In Vim, commands are structured as a language.
- **Operator (Verb)**: The action. `d` (delete), `c` (change), `y` (yank).
- **Count (Multiplier)**: How many times. `3`, `5`, `10`.
- **Motion (Noun/Object)**: Where to perform the action. `w` (word), `$` (end of line), `f'` (find next single quote).
*Example*: `d3w` = "Delete (d) three (3) words (w)".

### 2. Text Objects (Oggetti di Testo)
A powerful abstraction that allows acting on structured text.
- **`i` (Inside)**: Acts inside a boundary. `ci"` changes everything inside double quotes.
- **`a` (Around)**: Acts on the boundary itself. `da(` deletes the parentheses and everything inside them.

### 3. The Jump List (Lista dei Salti)
An internal data structure (stack) that records significant navigation.
- Commands like `G`, `/`, or `%` create a jump.
- `Ctrl-o` (Older) and `Ctrl-i` (Inward/Newer) allow navigating this history, similar to browser back/forward buttons.

### 4. The Undo Tree (Albero dei Ripristini)
Unlike traditional linear history, Vim preserves all branches of editing.
- If you undo and make a new change, the "old" future is still accessible via `g-` and `g+`.

### 5. Registers (Registri)
Internal memory slots for text.
- **`"0`**: Always contains the last yank.
- **`"1-9`**: History of deletions.
- **`"a-z`**: User-defined slots for macros or snippets.
- **`"+`**: System clipboard integration.

### 6. Mode State Machine (Macchina a Stati delle Modalità)
Vim is essentially a finite state machine.
- **Normal State**: The command listener.
- **Insert State**: The raw input buffer.
- **Visual State**: The selection processor.
Understanding the transitions between these states is the key to mastering terminal control.
