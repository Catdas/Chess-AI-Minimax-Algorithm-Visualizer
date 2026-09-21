/* ==========================================================================
   Chess AI – Minimax Algorithm Visualizer Script
   Pure Vanilla JavaScript Engine, Tree Builder, Step Controller & Interactive UI
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. SVG Chess Piece Vectors ---
  const PIECE_SVGS = {
    'wP': `<svg viewBox="0 0 45 45" class="piece-svg"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 1.38.7 2.6 1.77 3.32-1.92.83-3.27 2.74-3.27 4.96v1.22c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5V21.28c0-2.22-1.35-4.13-3.27-4.96C25.8 15.6 26.5 14.38 26.5 13c0-2.21-1.79-4-4-4zM15 32c-1 0-2 .5-2 1.5V35h19v-1.5c0-1-1-1.5-2-1.5H15z" fill="#ffffff" stroke="#1e293b" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    'wN': `<svg viewBox="0 0 45 45" class="piece-svg"><path d="M22 10c-1.1 0-2 1.1-2 2.5 0 .5.2 1 .5 1.4-2.1.3-4 2.1-4 4.6 0 1.5.7 2.8 1.8 3.7-1.3.9-2.3 2.3-2.3 4 0 2.8 2.7 5.2 6 5.8v2h-4c-1 0-2 .5-2 1.5V36h18v-1.5c0-1-1-1.5-2-1.5h-4v-2c3.3-.6 6-3 6-5.8 0-1.7-1-3.1-2.3-4 1.1-.9 1.8-2.2 1.8-3.7 0-2.5-1.9-4.3-4-4.6.3-.4.5-.9.5-1.4 0-1.4-.9-2.5-2-2.5z" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/></svg>`,
    'wB': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#ffffff" stroke="#1e293b" stroke-width="1.5"><circle cx="22.5" cy="9.5" r="2.5"/><path d="M14.5 35h16c.8 0 1.5-.7 1.5-1.5V32H13v1.5c0 .8.7 1.5 1.5 1.5zM15.5 29h14c1.1 0 2-.9 2-2 0-2.5-2.5-4.5-5.5-5.5.9-.9 1.5-2.2 1.5-3.6 0-2.8-2.2-5-5-5s-5 2.2-5 5c0 1.4.6 2.7 1.5 3.6-3 1-5.5 3-5.5 5.5 0 1.1.9 2 2 2z"/></g></svg>`,
    'wR': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#ffffff" stroke="#1e293b" stroke-width="1.5"><path d="M12 35h21v-3H12v3zm1.5-4h18l-1.5-4H15l-1.5 4zm2.5-5h13v-9H16v9zm-2-11h17V11h-3v2h-4v-2h-3v2h-4v-2h-3v4z"/></g></svg>`,
    'wQ': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#ffffff" stroke="#1e293b" stroke-width="1.5"><path d="M9 26c0 2 1.5 3 3.5 3h20c2 0 3.5-1 3.5-3 0-2-2-5-4-9l2-7-6 4-6-6-6 6-6-4 2 7c-2 4-4 7-4 9zM12 35h21v-3H12v3z"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="7" r="1.5"/><circle cx="22.5" cy="5" r="1.5"/><circle cx="30" cy="7" r="1.5"/><circle cx="36" cy="10" r="1.5"/></g></svg>`,
    'wK': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#ffffff" stroke="#1e293b" stroke-width="1.5"><path d="M22.5 6v4M20.5 8h4M16.5 35h12c1 0 1.5-.5 1.5-1.5V32h-15v1.5c0 1 .5 1.5 1.5 1.5zm-1-4h14c1 0 2-1 2-2.5 0-3-3-5.5-7-6.5 1.5-1.2 2.5-3 2.5-5 0-3.3-2.7-6-6-6s-6 2.7-6 6c0 2 1 3.8 2.5 5-4 1-7 3.5-7 6.5 0 1.5 1 2.5 2 2.5z"/></g></svg>`,
    
    'bP': `<svg viewBox="0 0 45 45" class="piece-svg"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 1.38.7 2.6 1.77 3.32-1.92.83-3.27 2.74-3.27 4.96v1.22c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5V21.28c0-2.22-1.35-4.13-3.27-4.96C25.8 15.6 26.5 14.38 26.5 13c0-2.21-1.79-4-4-4zM15 32c-1 0-2 .5-2 1.5V35h19v-1.5c0-1-1-1.5-2-1.5H15z" fill="#334155" stroke="#0f172a" stroke-width="1.5"/></svg>`,
    'bN': `<svg viewBox="0 0 45 45" class="piece-svg"><path d="M22 10c-1.1 0-2 1.1-2 2.5 0 .5.2 1 .5 1.4-2.1.3-4 2.1-4 4.6 0 1.5.7 2.8 1.8 3.7-1.3.9-2.3 2.3-2.3 4 0 2.8 2.7 5.2 6 5.8v2h-4c-1 0-2 .5-2 1.5V36h18v-1.5c0-1-1-1.5-2-1.5h-4v-2c3.3-.6 6-3 6-5.8 0-1.7-1-3.1-2.3-4 1.1-.9 1.8-2.2 1.8-3.7 0-2.5-1.9-4.3-4-4.6.3-.4.5-.9.5-1.4 0-1.4-.9-2.5-2-2.5z" fill="#334155" stroke="#0f172a" stroke-width="1.5"/></svg>`,
    'bB': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#334155" stroke="#0f172a" stroke-width="1.5"><circle cx="22.5" cy="9.5" r="2.5"/><path d="M14.5 35h16c.8 0 1.5-.7 1.5-1.5V32H13v1.5c0 .8.7 1.5 1.5 1.5zM15.5 29h14c1.1 0 2-.9 2-2 0-2.5-2.5-4.5-5.5-5.5.9-.9 1.5-2.2 1.5-3.6 0-2.8-2.2-5-5-5s-5 2.2-5 5c0 1.4.6 2.7 1.5 3.6-3 1-5.5 3-5.5 5.5 0 1.1.9 2 2 2z"/></g></svg>`,
    'bR': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#334155" stroke="#0f172a" stroke-width="1.5"><path d="M12 35h21v-3H12v3zm1.5-4h18l-1.5-4H15l-1.5 4zm2.5-5h13v-9H16v9zm-2-11h17V11h-3v2h-4v-2h-3v2h-4v-2h-3v4z"/></g></svg>`,
    'bQ': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#334155" stroke="#0f172a" stroke-width="1.5"><path d="M9 26c0 2 1.5 3 3.5 3h20c2 0 3.5-1 3.5-3 0-2-2-5-4-9l2-7-6 4-6-6-6 6-6-4 2 7c-2 4-4 7-4 9zM12 35h21v-3H12v3z"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="7" r="1.5"/><circle cx="22.5" cy="5" r="1.5"/><circle cx="30" cy="7" r="1.5"/><circle cx="36" cy="10" r="1.5"/></g></svg>`,
    'bK': `<svg viewBox="0 0 45 45" class="piece-svg"><g fill="#334155" stroke="#0f172a" stroke-width="1.5"><path d="M22.5 6v4M20.5 8h4M16.5 35h12c1 0 1.5-.5 1.5-1.5V32h-15v1.5c0 1 .5 1.5 1.5 1.5zm-1-4h14c1 0 2-1 2-2.5 0-3-3-5.5-7-6.5 1.5-1.2 2.5-3 2.5-5 0-3.3-2.7-6-6-6s-6 2.7-6 6c0 2 1 3.8 2.5 5-4 1-7 3.5-7 6.5 0 1.5 1 2.5 2 2.5z"/></g></svg>`
  };

  // --- 2. Piece Evaluation & PST Values ---
  const MATERIAL_SCORES = {
    'p': 100, 'n': 320, 'b': 330, 'r': 500, 'q': 900, 'k': 20000
  };

  // Piece-Square Tables (PST) from White perspective (flipped for Black)
  const PST_PAWN = [
    [ 0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [ 5,  5, 10, 25, 25, 10,  5,  5],
    [ 0,  0,  0, 20, 20,  0,  0,  0],
    [ 5, -5,-10,  0,  0,-10, -5,  5],
    [ 5, 10, 10,-20,-20, 10, 10,  5],
    [ 0,  0,  0,  0,  0,  0,  0,  0]
  ];

  const PST_KNIGHT = [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
  ];

  // Preset Board Configurations
  const PRESETS = {
    'tactical_fork': {
      name: "Tactical Knight Fork (Recommended)",
      desc: "White AI (MAX) must choose between Move A (Pawn push +1), Move B (Knight Fork Nc7+ winning Rook +5), or Move C (Bishop move +2).",
      board: [
        ['bR', null, 'bB', 'bQ', 'bK', 'bB', null, 'bR'],
        ['bP', 'bP', 'bP', null, 'bP', 'bP', 'bP', 'bP'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, 'bP', null, null, null, null],
        [null, null, 'wN', 'wP', null, null, null, null],
        [null, null, null, null, 'wP', null, null, null],
        ['wP', 'wP', 'wP', null, null, 'wP', 'wP', 'wP'],
        ['wR', null, 'wB', 'wQ', 'wK', 'wB', null, 'wR']
      ]
    },
    'midgame': {
      name: "Midgame Battery Attack",
      desc: "Tactical middlegame scenario with active queen and bishop battery.",
      board: [
        ['bR', null, null, 'bQ', 'bK', null, null, 'bR'],
        ['bP', 'bP', 'bP', null, null, 'bP', 'bP', 'bP'],
        [null, null, 'bN', 'bP', 'bP', 'bN', null, null],
        [null, null, 'wB', null, null, null, null, null],
        [null, null, null, 'wP', 'wP', null, null, null],
        [null, null, 'wN', null, null, 'wQ', null, null],
        ['wP', 'wP', 'wP', null, null, 'wP', 'wP', 'wP'],
        ['wR', null, null, null, 'wK', 'wB', null, 'wR']
      ]
    },
    'pawn_endgame': {
      name: "Endgame Pawn Race",
      desc: "Endgame position testing pawn promotion speed and king activity.",
      board: [
        [null, null, null, null, 'bK', null, null, null],
        [null, null, 'bP', null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, 'bP', null, null, null, null],
        [null, null, null, 'wP', null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, 'wP', null, null, null],
        [null, null, null, null, 'wK', null, null, null]
      ]
    },
    'standard': {
      name: "Standard Opening",
      desc: "Standard 8x8 starting chess position.",
      board: [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
      ]
    }
  };

  // State Variables
  let currentBoard = [];
  let selectedSquare = null;
  let activeTurn = 'w'; // 'w' = MAX (AI), 'b' = MIN (Opponent)
  let currentDepth = 2;
  let executionSteps = [];
  let currentStepIdx = 0;
  let autoPlayTimer = null;
  let playbackSpeed = 1000; // ms per step
  let lastMinimaxResult = null;

  // DOM Elements
  const elBoard = document.getElementById('chessboard');
  const elStatusText = document.getElementById('status-text');
  const elEvalBadge = document.getElementById('eval-badge');
  const elPresetSelect = document.getElementById('preset-select');
  const elDepthSelect = document.getElementById('depth-select');
  const elBtnRun = document.getElementById('btn-run');
  const elBtnStep = document.getElementById('btn-step');
  const elBtnAuto = document.getElementById('btn-auto');
  const elBtnReset = document.getElementById('btn-reset');
  const elSpeedRange = document.getElementById('speed-range');
  const elSpeedVal = document.getElementById('speed-val');
  const elTreeSvg = document.getElementById('tree-svg');
  const elTermBody = document.getElementById('terminal-body');
  const elEvalBreakdown = document.getElementById('eval-breakdown');
  const elExplanationCard = document.getElementById('explanation-card');
  const elMathProof = document.getElementById('math-proof');

  // --- 3. Chess Engine Functions ---

  function cloneBoard(board) {
    return board.map(row => [...row]);
  }

  function squareToAlgebraic(r, c) {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return files[c] + (8 - r);
  }

  function isSquareOnBoard(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
  }

  function getPieceColor(pieceStr) {
    if (!pieceStr) return null;
    return pieceStr[0]; // 'w' or 'b'
  }

  function getPieceType(pieceStr) {
    if (!pieceStr) return null;
    return pieceStr[1].toLowerCase(); // 'p', 'n', 'b', 'r', 'q', 'k'
  }

  // Generate legal move candidates for a given side ('w' or 'b')
  function generateMoves(board, side) {
    const moves = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && getPieceColor(piece) === side) {
          const pType = getPieceType(piece);
          const pMoves = getPieceMoves(board, r, c, piece, pType, side);
          moves.push(...pMoves);
        }
      }
    }
    return moves;
  }

  function getPieceMoves(board, r, c, piece, pType, side) {
    const moves = [];
    const dir = side === 'w' ? -1 : 1;

    if (pType === 'p') {
      // Forward move
      if (isSquareOnBoard(r + dir, c) && !board[r + dir][c]) {
        moves.push({ from: { r, c }, to: { r: r + dir, c }, piece, name: `${squareToAlgebraic(r, c)}-${squareToAlgebraic(r + dir, c)}` });
        // Initial double step
        const startRow = side === 'w' ? 6 : 1;
        if (r === startRow && !board[r + dir * 2][c]) {
          moves.push({ from: { r, c }, to: { r: r + dir * 2, c }, piece, name: `${squareToAlgebraic(r, c)}-${squareToAlgebraic(r + dir * 2, c)}` });
        }
      }
      // Captures
      for (let dc of [-1, 1]) {
        const nr = r + dir, nc = c + dc;
        if (isSquareOnBoard(nr, nc) && board[nr][nc] && getPieceColor(board[nr][nc]) !== side) {
          moves.push({ from: { r, c }, to: { r: nr, c: nc }, piece, name: `x${squareToAlgebraic(nr, nc)}` });
        }
      }
    } else if (pType === 'n') {
      const offsets = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
      for (let [dr, dc] of offsets) {
        const nr = r + dr, nc = c + dc;
        if (isSquareOnBoard(nr, nc)) {
          const target = board[nr][nc];
          if (!target || getPieceColor(target) !== side) {
            moves.push({ from: { r, c }, to: { r: nr, c: nc }, piece, name: `N${squareToAlgebraic(nr, nc)}` });
          }
        }
      }
    } else if (pType === 'b' || pType === 'r' || pType === 'q') {
      const directions = [];
      if (pType === 'b' || pType === 'q') directions.push([-1,-1],[-1,1],[1,-1],[1,1]);
      if (pType === 'r' || pType === 'q') directions.push([-1,0],[1,0],[0,-1],[0,1]);
      for (let [dr, dc] of directions) {
        let nr = r + dr, nc = c + dc;
        while (isSquareOnBoard(nr, nc)) {
          const target = board[nr][nc];
          if (!target) {
            moves.push({ from: { r, c }, to: { r: nr, c: nc }, piece, name: `${piece[1].toUpperCase()}${squareToAlgebraic(nr, nc)}` });
          } else {
            if (getPieceColor(target) !== side) {
              moves.push({ from: { r, c }, to: { r: nr, c: nc }, piece, name: `${piece[1].toUpperCase()}x${squareToAlgebraic(nr, nc)}` });
            }
            break;
          }
          nr += dr; nc += dc;
        }
      }
    } else if (pType === 'k') {
      const offsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
      for (let [dr, dc] of offsets) {
        const nr = r + dr, nc = c + dc;
        if (isSquareOnBoard(nr, nc)) {
          const target = board[nr][nc];
          if (!target || getPieceColor(target) !== side) {
            moves.push({ from: { r, c }, to: { r: nr, c: nc }, piece, name: `K${squareToAlgebraic(nr, nc)}` });
          }
        }
      }
    }
    return moves;
  }

  function applyMove(board, move) {
    const newBoard = cloneBoard(board);
    newBoard[move.to.r][move.to.c] = move.piece;
    newBoard[move.from.r][move.from.c] = null;
    return newBoard;
  }

  // Position Evaluation Function (Returns score in Pawns: e.g. +3.5)
  function evaluateBoard(board) {
    let materialScore = 0;
    let positionalScore = 0;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece) {
          const color = getPieceColor(piece);
          const type = getPieceType(piece);
          const val = MATERIAL_SCORES[type] || 0;
          
          let pstVal = 0;
          if (type === 'p') {
            pstVal = color === 'w' ? PST_PAWN[r][c] : PST_PAWN[7 - r][c];
          } else if (type === 'n') {
            pstVal = color === 'w' ? PST_KNIGHT[r][c] : PST_KNIGHT[7 - r][c];
          }

          if (color === 'w') {
            materialScore += val;
            positionalScore += pstVal;
          } else {
            materialScore -= val;
            positionalScore -= pstVal;
          }
        }
      }
    }

    // Convert from centipawns to pawn units
    const totalCentiPawns = (materialScore + positionalScore);
    return Math.round(totalCentiPawns / 100 * 10) / 10;
  }

  // --- 4. Minimax Search Engine ---

  let nodeIdCounter = 0;

  function runMinimaxEngine(board, maxDepth) {
    nodeIdCounter = 0;
    executionSteps = [];

    // Step 1: Move Generation
    const rootMoves = generateMoves(board, 'w'); // AI is MAX (White)
    
    // Sort root moves for clear candidate presentation (take top 3-4 candidates)
    const candidates = rootMoves.slice(0, 4);

    executionSteps.push({
      type: 'STEP_1_GENERATE',
      stepNum: 1,
      title: "Step 1: Generate Possible Moves",
      log: `> Minimax engine initialized (Search Depth: ${maxDepth})`,
      logDetail: `> Found ${candidates.length} candidate moves for MAX (AI): ${candidates.map(m => m.name).join(', ')}`,
      candidates: candidates
    });

    const rootNode = {
      id: `node_${nodeIdCounter++}`,
      type: 'MAX',
      moveName: 'Root',
      depth: 0,
      children: [],
      score: null
    };

    // Explore tree recursively
    const minimaxResult = minimaxRecursive(board, maxDepth, 0, true, rootNode, candidates);

    rootNode.score = minimaxResult.score;
    rootNode.bestMove = minimaxResult.bestMove;

    // Mark best path in tree
    markBestPath(rootNode, minimaxResult.bestMove);

    executionSteps.push({
      type: 'STEP_5_SELECT_BEST',
      stepNum: 5,
      title: "Step 5: Select Best Guaranteed Move",
      log: `> MAX compares worst-case scores across candidate branches`,
      logDetail: `> Best guaranteed evaluation: +${minimaxResult.score}. Selected Move: ${minimaxResult.bestMove.name}`,
      bestMove: minimaxResult.bestMove,
      rootNode: rootNode,
      score: minimaxResult.score
    });

    return { rootNode, bestMove: minimaxResult.bestMove, score: minimaxResult.score };
  }

  function minimaxRecursive(board, maxDepth, depth, isMax, parentNode, customMoves = null) {
    const side = isMax ? 'w' : 'b';
    const moves = customMoves || generateMoves(board, side).slice(0, 3); // cap branching factor for clean tree visualization

    if (depth === maxDepth || moves.length === 0) {
      const evalVal = evaluateBoard(board);
      parentNode.score = evalVal;
      parentNode.leafScore = evalVal;
      return { score: evalVal, bestMove: null };
    }

    if (isMax) {
      let maxEval = -Infinity;
      let bestMoveObj = null;

      executionSteps.push({
        type: 'STEP_2_MAX_TURN',
        stepNum: 2,
        title: "Step 2: MAX – AI Turn",
        log: `> MAX node (Depth ${depth}): AI evaluates candidate choices for highest score`,
        nodeId: parentNode.id
      });

      for (let move of moves) {
        const childNode = {
          id: `node_${nodeIdCounter++}`,
          type: 'MIN',
          moveName: move.name,
          move: move,
          depth: depth + 1,
          children: [],
          score: null
        };
        parentNode.children.push(childNode);

        const nextBoard = applyMove(board, move);
        const res = minimaxRecursive(nextBoard, maxDepth, depth + 1, false, childNode);

        childNode.score = res.score;
        if (res.score > maxEval) {
          maxEval = res.score;
          bestMoveObj = move;
        }

        executionSteps.push({
          type: 'STEP_4_EVALUATE',
          stepNum: 4,
          title: "Step 4: Position Evaluation",
          log: `> Evaluated move branch ${move.name} -> Resulting Score: +${res.score}`,
          moveName: move.name,
          score: res.score,
          childNodeId: childNode.id
        });
      }

      parentNode.score = maxEval;
      return { score: maxEval, bestMove: bestMoveObj };

    } else {
      let minEval = Infinity;
      let bestMoveObj = null;

      executionSteps.push({
        type: 'STEP_3_MIN_TURN',
        stepNum: 3,
        title: "Step 3: MIN – Opponent Response",
        log: `> MIN node (Depth ${depth}): Opponent assumed to choose response giving AI lowest score`,
        nodeId: parentNode.id
      });

      for (let move of moves) {
        const childNode = {
          id: `node_${nodeIdCounter++}`,
          type: 'MAX',
          moveName: move.name,
          move: move,
          depth: depth + 1,
          children: [],
          score: null
        };
        parentNode.children.push(childNode);

        const nextBoard = applyMove(board, move);
        const res = minimaxRecursive(nextBoard, maxDepth, depth + 1, true, childNode);

        childNode.score = res.score;
        if (res.score < minEval) {
          minEval = res.score;
          bestMoveObj = move;
        }
      }

      parentNode.score = minEval;
      return { score: minEval, bestMove: bestMoveObj };
    }
  }

  function markBestPath(node, bestMove) {
    if (!node) return;
    node.isBestPath = true;
    if (node.children && node.children.length > 0) {
      // Find child matching best score or best move
      let bestChild = node.children.find(c => c.move === bestMove) || node.children.reduce((acc, curr) => (node.type === 'MAX' ? (curr.score > acc.score ? curr : acc) : (curr.score < acc.score ? curr : acc)), node.children[0]);
      if (bestChild) {
        markBestPath(bestChild, bestChild.bestMove);
      }
    }
  }

  // --- 5. Visual Tree Renderer (SVG) ---

  function renderTreeSVG(rootNode) {
    if (!elTreeSvg || !rootNode) return;
    elTreeSvg.innerHTML = '';

    const width = 680;
    const height = 280;
    const levelY = [40, 140, 240];

    // Compute coordinates for tree nodes
    function computeCoords(node, left, right, level) {
      const x = (left + right) / 2;
      const y = levelY[level] || (40 + level * 90);
      node.x = x;
      node.y = y;

      if (node.children && node.children.length > 0) {
        const step = (right - left) / node.children.length;
        node.children.forEach((child, idx) => {
          computeCoords(child, left + idx * step, left + (idx + 1) * step, level + 1);
        });
      }
    }

    computeCoords(rootNode, 20, width - 20, 0);

    // Draw links
    function drawLinks(node) {
      if (node.children) {
        node.children.forEach(child => {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', node.x);
          line.setAttribute('y1', node.y);
          line.setAttribute('x2', child.x);
          line.setAttribute('y2', child.y);

          let className = 'tree-link';
          if (node.isBestPath && child.isBestPath) className += ' best-link';
          line.setAttribute('class', className);
          elTreeSvg.appendChild(line);

          drawLinks(child);
        });
      }
    }
    drawLinks(rootNode);

    // Draw nodes
    function drawNodes(node) {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      let classNames = `tree-node-group node-${node.type.toLowerCase()}`;
      if (node.isBestPath) classNames += ' node-best';
      g.setAttribute('class', classNames);
      g.setAttribute('transform', `translate(${node.x}, ${node.y})`);

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', 18);
      circle.setAttribute('class', 'tree-node-circle');

      const textType = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textType.setAttribute('class', 'node-text-type');
      textType.setAttribute('y', -3);
      textType.textContent = node.type;

      const textMove = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textMove.setAttribute('class', 'node-text-move');
      textMove.setAttribute('y', 9);
      textMove.textContent = node.moveName === 'Root' ? 'START' : node.moveName;

      g.appendChild(circle);
      g.appendChild(textType);
      g.appendChild(textMove);

      // Score Badge below node
      if (node.score !== null) {
        const scoreBadge = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        scoreBadge.setAttribute('class', 'node-score-badge');
        scoreBadge.setAttribute('y', 32);
        scoreBadge.textContent = node.score > 0 ? `+${node.score}` : `${node.score}`;
        g.appendChild(scoreBadge);
      }

      elTreeSvg.appendChild(g);

      if (node.children) {
        node.children.forEach(drawNodes);
      }
    }
    drawNodes(rootNode);
  }

  // --- 6. UI & Dashboard Renderers ---

  function renderBoard() {
    elBoard.innerHTML = '';
    const files = ['a','b','c','d','e','f','g','h'];

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const sq = document.createElement('div');
        const isLight = (r + c) % 2 === 0;
        sq.className = `square ${isLight ? 'light' : 'dark'}`;
        sq.dataset.row = r;
        sq.dataset.col = c;

        // Coordinate labels
        if (c === 7) {
          const rankLabel = document.createElement('span');
          rankLabel.className = 'coord rank';
          rankLabel.textContent = 8 - r;
          sq.appendChild(rankLabel);
        }
        if (r === 7) {
          const fileLabel = document.createElement('span');
          fileLabel.className = 'coord file';
          fileLabel.textContent = files[c];
          sq.appendChild(fileLabel);
        }

        // Piece rendering
        const piece = currentBoard[r][c];
        if (piece) {
          sq.innerHTML += PIECE_SVGS[piece] || '';
        }

        sq.addEventListener('click', () => handleSquareClick(r, c));
        elBoard.appendChild(sq);
      }
    }

    // Update Eval meter
    const currentEval = evaluateBoard(currentBoard);
    elEvalBadge.textContent = currentEval > 0 ? `+${currentEval}` : `${currentEval}`;
  }

  function handleSquareClick(r, c) {
    // Basic user click interaction for manually moving pieces or testing moves
    if (selectedSquare) {
      const fromR = selectedSquare.r;
      const fromC = selectedSquare.c;
      const piece = currentBoard[fromR][fromC];

      if (piece && getPieceColor(piece) === activeTurn) {
        // Apply manual move
        currentBoard[r][c] = piece;
        currentBoard[fromR][fromC] = null;
        activeTurn = activeTurn === 'w' ? 'b' : 'w';
        selectedSquare = null;
        renderBoard();
        updateStatusBanner(`Move played: ${squareToAlgebraic(fromR, fromC)} to ${squareToAlgebraic(r, c)}. Turn: ${activeTurn === 'w' ? 'MAX (AI)' : 'MIN (Opponent)'}`);
        return;
      }
    }

    if (currentBoard[r][c] && getPieceColor(currentBoard[r][c]) === activeTurn) {
      selectedSquare = { r, c };
      renderBoard();
      const sqEl = elBoard.children[r * 8 + c];
      if (sqEl) sqEl.classList.add('selected');
    } else {
      selectedSquare = null;
      renderBoard();
    }
  }

  function updateStatusBanner(msg) {
    elStatusText.textContent = msg;
  }

  function logTerminalMessage(prefixText, messageText, cssClass = 'log-info') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="log-prefix">${prefixText}</span> <span class="${cssClass}">${messageText}</span>`;
    elTermBody.appendChild(line);
    elTermBody.scrollTop = elTermBody.scrollHeight;
  }

  function clearTerminal() {
    elTermBody.innerHTML = '';
  }

  function highlightStepWizard(stepNum) {
    document.querySelectorAll('.step-item').forEach((item, idx) => {
      item.classList.remove('active', 'completed');
      if (idx + 1 === stepNum) {
        item.classList.add('active');
      } else if (idx + 1 < stepNum) {
        item.classList.add('completed');
      }
    });
  }

  function renderEvaluationBreakdown(candidates, rootNode) {
    elEvalBreakdown.innerHTML = '';

    if (!rootNode || !rootNode.children) return;

    rootNode.children.forEach((child, idx) => {
      const card = document.createElement('div');
      const isWinner = child.isBestPath;
      card.className = `eval-card ${isWinner ? 'best-candidate' : ''}`;

      card.innerHTML = `
        <div class="eval-card-header">
          <span>Move ${String.fromCharCode(65 + idx)}: ${child.moveName}</span>
          ${isWinner ? '<span class="card-badge badge-green">BEST</span>' : ''}
        </div>
        <div class="eval-row">
          <span>Opponent Response:</span>
          <span>MIN Node</span>
        </div>
        <div class="eval-row total">
          <span>Worst-Case Evaluation:</span>
          <span style="color:${isWinner ? 'var(--best-green)' : 'var(--text-main)'}">${child.score > 0 ? '+' : ''}${child.score}</span>
        </div>
      `;
      elEvalBreakdown.appendChild(card);
    });
  }

  function renderExplanationPanel(rootNode, bestMove) {
    if (!rootNode || !bestMove) return;

    elExplanationCard.classList.add('highlight-winner');
    const childScores = rootNode.children.map((c, i) => `Move ${String.fromCharCode(65 + i)} (${c.moveName}) → <b>${c.score > 0 ? '+' : ''}${c.score}</b>`);

    elMathProof.innerHTML = `
      AI selected <b>${bestMove.name}</b> because Minimax examined all possible opponent counter-moves.<br>
      ${childScores.join('<br>')}<br><br>
      MAX selects: <b>max(${rootNode.children.map(c => c.score).join(', ')}) = +${rootNode.score}</b> (Highest Guaranteed Score).
    `;
  }

  // --- 7. Playback & Controller Subsystem ---

  function executeStep(stepIdx) {
    if (stepIdx < 0 || stepIdx >= executionSteps.length) return;
    const step = executionSteps[stepIdx];

    highlightStepWizard(step.stepNum);
    updateStatusBanner(step.title);
    logTerminalMessage(`[Step ${step.stepNum}]`, step.log, step.stepNum === 5 ? 'log-best' : step.stepNum === 3 ? 'log-min' : 'log-max');
    if (step.logDetail) {
      logTerminalMessage(`  ↳`, step.logDetail, 'log-info');
    }

    if (step.type === 'STEP_1_GENERATE') {
      // Highlight candidate move squares on board
      renderBoard();
      step.candidates.forEach(m => {
        const sqIdx = m.to.r * 8 + m.to.c;
        if (elBoard.children[sqIdx]) {
          elBoard.children[sqIdx].classList.add('highlight-max');
        }
      });
    } else if (step.type === 'STEP_5_SELECT_BEST') {
      renderTreeSVG(step.rootNode);
      renderEvaluationBreakdown(null, step.rootNode);
      renderExplanationPanel(step.rootNode, step.bestMove);

      // Animate best move on board
      const fromSq = elBoard.children[step.bestMove.from.r * 8 + step.bestMove.from.c];
      const toSq = elBoard.children[step.bestMove.to.r * 8 + step.bestMove.to.c];
      if (fromSq) fromSq.classList.add('selected');
      if (toSq) toSq.classList.add('highlight-best');

      // Update actual board position
      currentBoard = applyMove(currentBoard, step.bestMove);
      setTimeout(() => {
        renderBoard();
        const newTo = elBoard.children[step.bestMove.to.r * 8 + step.bestMove.to.c];
        if (newTo) newTo.classList.add('highlight-best');
      }, 500);
    }
  }

  function startMinimaxVisualization() {
    stopAutoPlay();
    clearTerminal();
    currentDepth = parseInt(elDepthSelect.value, 10);

    const result = runMinimaxEngine(currentBoard, currentDepth);
    lastMinimaxResult = result;
    currentStepIdx = 0;

    // Render tree
    renderTreeSVG(result.rootNode);
    renderEvaluationBreakdown(null, result.rootNode);

    executeStep(0);
    elBtnStep.disabled = false;
    elBtnAuto.disabled = false;
  }

  function stepNext() {
    if (currentStepIdx < executionSteps.length - 1) {
      currentStepIdx++;
      executeStep(currentStepIdx);
    } else {
      stopAutoPlay();
    }
  }

  function toggleAutoPlay() {
    if (autoPlayTimer) {
      stopAutoPlay();
    } else {
      elBtnAuto.textContent = "⏸ Pause Auto";
      elBtnAuto.classList.replace('btn-success', 'btn-secondary');
      autoPlayTimer = setInterval(() => {
        if (currentStepIdx < executionSteps.length - 1) {
          stepNext();
        } else {
          stopAutoPlay();
        }
      }, playbackSpeed);
    }
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
    elBtnAuto.textContent = "▶ Auto Play";
    elBtnAuto.classList.replace('btn-secondary', 'btn-success');
  }

  function loadPreset(presetKey) {
    stopAutoPlay();
    const preset = PRESETS[presetKey] || PRESETS['tactical_fork'];
    currentBoard = cloneBoard(preset.board);
    activeTurn = 'w';
    selectedSquare = null;
    clearTerminal();
    renderBoard();
    updateStatusBanner(`Loaded Preset: ${preset.name}`);
    logTerminalMessage('SYSTEM', `Loaded preset board: ${preset.name}. ${preset.desc}`);
    elTreeSvg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#94a3b8" font-size="14">Click "Run Minimax AI" to generate the Minimax Search Tree</text>';
    elEvalBreakdown.innerHTML = '<div class="eval-card"><div class="eval-card-header">No Evaluation Yet</div><div class="eval-row"><span>Run algorithm to see breakdown</span></div></div>';
  }

  // --- 8. Event Listeners Initialization ---

  function initEvents() {
    elPresetSelect.addEventListener('change', (e) => loadPreset(e.target.value));
    elBtnRun.addEventListener('click', startMinimaxVisualization);
    elBtnStep.addEventListener('click', stepNext);
    elBtnAuto.addEventListener('click', toggleAutoPlay);
    elBtnReset.addEventListener('click', () => loadPreset(elPresetSelect.value));

    elSpeedRange.addEventListener('input', (e) => {
      const speedVal = parseFloat(e.target.value);
      playbackSpeed = 1000 / speedVal;
      elSpeedVal.textContent = `${speedVal}x`;
      if (autoPlayTimer) {
        stopAutoPlay();
        toggleAutoPlay();
      }
    });

    // Initial board setup
    loadPreset('tactical_fork');
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEvents);
  } else {
    initEvents();
  }

})();
