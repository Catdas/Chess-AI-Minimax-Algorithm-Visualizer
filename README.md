# ♟️ Chess AI – Minimax Algorithm Visualizer

An interactive, web-based educational dashboard visually demonstrating **how a Chess-playing AI uses the Minimax algorithm** step by step to evaluate moves and choose optimal strategy.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

---

## 🌟 Core Concepts

The visualizer demonstrates the classic **Minimax Principle** in decision theory and game-tree search:

* **MAX = AI Player (White)**: Tries to **maximize** the board evaluation score.
* **MIN = Opponent (Black)**: AI assumes the opponent will play the response that **minimizes** the AI's evaluation score.
* **Minimax Decision**: The AI selects the move that guarantees the **highest worst-case evaluation** after considering all opponent counter-moves:  
  $$\text{AI Move} = \arg\max \left( \min(\text{Move A}), \min(\text{Move B}), \min(\text{Move C}) \right)$$

---

## ✨ Features

- **🎯 Interactive 8×8 Chessboard**:
  - Rendered with inline vector SVG chess pieces for crisp display on all screens.
  - Rank & file coordinate indicators (a–h, 1–8).
  - Interactive square selection and move highlights.

- **📈 5-Step Minimax Wizard**:
  1. *Generate Possible Moves*
  2. *MAX – AI Turn*
  3. *MIN – Opponent Turn*
  4. *Evaluate Positions*
  5. *Select Best Move*

- **🌳 Dynamic SVG Search Tree**:
  - Dynamically calculated tree graph rendering MAX (Blue) and MIN (Orange) nodes.
  - Displays evaluation scores and move names at every branch.
  - Highlights the optimal Minimax path in **glowing emerald green**.

- **📊 Position Evaluation Breakdown**:
  - **Material Scores**: Pawn (1), Knight (3), Bishop (3), Rook (5), Queen (9), King (200).
  - **Positional Piece-Square Tables (PST)**: Rewards central control, pawn advancement, and piece activity.

- **💻 Monospace Terminal Execution Log**:
  - Live animated log stream outputting minimax decisions, evaluated candidate branches, and worst-case calculations line by line.

- **🧠 AI Decision Explanation Panel**:
  - Displays a visual mathematical proof explaining exactly why the winning move was chosen over alternative candidate moves.

- **⚡ Interactive Controls & Presets**:
  - **Preset Scenarios**:
    - *Tactical Knight Fork* (Recommended tactical setup)
    - *Midgame Attack*
    - *Endgame Pawn Race*
    - *Standard Opening*
  - **Search Depth Selector**: Depth 1, Depth 2, or Depth 3.
  - **Playback Controls**: Step-by-Step mode, Auto Play with adjustable speed slider (0.5x to 3.0x), and Reset.

---

## 🛠️ Project Structure

```
Chess-AI-Minimax-Algorithm-Visualizer/
├── index.html   # Main dashboard HTML structure
├── style.css    # Modern light-theme dashboard design system
├── script.js    # Pure JS chess engine, minimax search, SVG tree visualizer & UI controller
└── README.md    # Documentation
```

---

## 🚀 How to Run

1. Clone or download this repository:
   ```bash
   git clone https://github.com/Catdas/Chess-AI-Minimax-Algorithm-Visualizer.git
   ```
2. Open `index.html` directly in any web browser:
   - No backend servers, Node.js, or build steps required!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
