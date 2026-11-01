class Piece {
  constructor(type, isWhite, r, c) {
    this.type = type;
    this.isWhite = isWhite;
    this.r = r;
    this.c = c;

    this.orthogonal = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    this.diagonal = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    this.knightMoves = [
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
    ];
  }

  isValid(r, c) {
    return 0 <= r && r < 8 && 0 <= c && c < 8;
  }

  getSlidingAttacks(board, directions) {
    const squares = [];
    for (const [dr, dc] of directions) {
      let nr = this.r + dr;
      let nc = this.c + dc;
      while (this.isValid(nr, nc)) {
        squares.push([nr, nc]);
        if (board[nr][nc] !== " ") break;
        nr += dr;
        nc += dc;
      }
    }

    return squares;
  }
}

class Rook extends Piece {
  getAttackedSquares(board) {
    return this.getSlidingAttacks(board, this.orthogonal);
  }
}

class King extends Piece {
  getAttackedSquares() {
    return [...this.orthogonal, ...this.diagonal]
      .map(([dr, dc]) => [this.r + dr, this.c + dc])
      .filter(([nr, nc]) => this.isValid(nr, nc));
  }
}

class Queen extends Piece {
  getAttackedSquares(board) {
    return this.getSlidingAttacks(board, [
      ...this.orthogonal,
      ...this.diagonal,
    ]);
  }
}

class Bishop extends Piece {
  getAttackedSquares(board) {
    return this.getSlidingAttacks(board, this.diagonal);
  }
}

class Knight extends Piece {
  getAttackedSquares() {
    return this.knightMoves
      .map(([dr, dc]) => [this.r + dr, this.c + dc])
      .filter(([nr, nc]) => this.isValid(nr, nc));
  }
}

class Pawn extends Piece {
  getAttackedSquares() {
    const rowOffset = this.isWhite ? -1 : 1;

    return [
      [rowOffset, 1],
      [rowOffset, -1],
    ]
      .map(([dr, dc]) => [this.r + dr, this.c + dc])
      .filter(([nr, nc]) => this.isValid(nr, nc));
  }
}

class PieceFactory {
  static create(chr, r, c) {
    if (chr === " ") return null;
    const type = chr.toUpperCase();
    const isWhite = chr === type;
    const classes = {
      K: King,
      Q: Queen,
      B: Bishop,
      N: Knight,
      P: Pawn,
      R: Rook,
    };

    return classes[type] ? new classes[type](type, isWhite, r, c) : null;
  }
}

function attackedSquares(board) {
  const whiteGrid = Array.from({ length: 8 }, () => Array(8).fill(false));
  const blackGrid = Array.from({ length: 8 }, () => Array(8).fill(false));

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = PieceFactory.create(board[r][c], r, c);
      if (!piece) continue;

      const targetGrid = piece.isWhite ? whiteGrid : blackGrid;
      const targets = piece.getAttackedSquares(board);

      for (const [tr, tc] of targets) {
        targetGrid[tr][tc] = true;
      }
    }
  }
  return board.map((row, r) =>
    row.map((_, c) => {
      const w = whiteGrid[r][c];
      const b = blackGrid[r][c];
      if (w && b) return "WB";
      if (w) return "W ";
      if (b) return " B";
      return "  ";
    })
  );
}
