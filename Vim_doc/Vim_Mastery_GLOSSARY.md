# GLOSSARY: Vim Mastery Technical Terms

This glossary defines the "Vim Grammar" and internal mechanics taught in this course, using a technical, low-level approach inspired by Salvatore Sanfilippo.

### 1. The Vim Grammar (Language of Productivity)
In Vim, commands are structured as a linguistic sentence.
- **Operator (Verb)**: The action. `d` (delete), `c` (change), `y` (yank).
- **Count (Multiplier)**: How many times. `3`, `5`, `10`.
- **Motion (Noun/Object)**: Where to perform the action. `w` (word), `$` (end of line), `f'` (find next single quote).
*Example*: `d3w` = "Delete (d) three (3) words (w)".

### 2. Text Objects (Structural Logic)
A powerful abstraction that allows acting on structured blocks without manual selection.
- **`i` (Inside)**: Acts inside a boundary. `ci"` changes everything inside double quotes.
- **`a` (Around)**: Acts on the boundary itself. `da(` deletes the parentheses and everything inside them.

### 3. Registers (The Memory Slots)
Internal memory storage for text and commands.
- **`"0`**: Contains the last yanked text.
- **`"a-z`**: User-defined slots for recording **Macros** or storing snippets.
- **`"+`**: The gateway to the system clipboard.

### 4. Macros (The Automation engine)
The ability to record a sequence of keystrokse into a register and replay them.
- `q[register]` to start recording.
- `q` to stop.
- `@[register]` to execute.

### 5. Mode State Machine
Vim is a finite state machine where understanding transitions is key:
- **Normal Mode**: The commander. LISTENS for grammar.
- **Insert Mode**: The producer. WRITES to the buffer.
- **Command Mode**: The orchestrator. MANAGES the environment (`:w`, `:q`).

### 6. The WASM Bridge
The technical layer that allows the C-based Vim engine to communicate with the React UI, providing absolute fidelity to original Vim behavior within the web browser.
