class Fraction {
  constructor(n, d = 1n) {
    if (typeof n === "string") {
      const parts = n.split("/");
      if (parts.length === 2) {
        n = BigInt(parts[0].trim());
        d = BigInt(parts[1].trim());
      } else {
        n = BigInt(n.trim());
        d = 1n;
      }
    } else {
      n = BigInt(n);
      d = BigInt(d);
    }

    if (d < 0n) {
      n = -n;
      d = -d;
    }

    let g = gcd(n, d);
    this.n = n / g;
    this.d = d / g;
  }

  static from(val) {
    if (val instanceof Fraction) return val;
    return new Fraction(val);
  }

  add(other) {
    other = Fraction.from(other);
    return new Fraction(this.n * other.d + this.d * other.n, this.d * other.d);
  }

  sub(other) {
    other = Fraction.from(other);
    return new Fraction(this.n * other.d - this.d * other.n, this.d * other.d);
  }

  mul(other) {
    other = Fraction.from(other);
    return new Fraction(this.n * other.n, this.d * other.d);
  }

  div(other) {
    other = Fraction.from(other);
    if (other.n === 0n) throw Error("Division by zero");
    return new Fraction(this.n * other.d, this.d * other.n);
  }

  isZero() {
    return this.n === 0n;
  }

  neg() {
    return new Fraction(-this.n, this.d);
  }

  toString() {
    if (this.d === 1n) return this.n.toString();
    return `${this.n}/${this.d}`;
  }
}

function gcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function parseInput(inputStr) {
  const lines = inputStr
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter((c) => c.trim().length > 0);
  if (lines.length === 0) return false;
  const M = lines.length;
  const N = lines[0].split(/\s+/).length - 1;

  let matrix = lines.map((line) =>
    line.split(/\s+/).map((x) => new Fraction(x))
  );

  return {
    matrix,
    dim: [M, N],
  };
}

function RREF(matrix, dim) {
  const [M, N] = dim;
  let row = 0;

  for (let col = 0; col < N && row < M; col++) {
    let pivotRow = row;
    while (pivotRow < M && matrix[pivotRow][col].isZero()) {
      pivotRow++;
    }
    if (pivotRow === M) {
      continue;
    }

    let temp = matrix[row];
    matrix[row] = matrix[pivotRow];
    matrix[pivotRow] = temp;

    let pivotValue = matrix[row][col];
    for (let j = col; j <= N; j++) {
      matrix[row][j] = matrix[row][j].div(pivotValue);
    }

    for (let i = 0; i < M; i++) {
      if (i !== row && !matrix[i][col].isZero()) {
        let factor = matrix[i][col];
        for (let j = col; j <= N; j++) {
          matrix[i][j] = matrix[i][j].sub(factor.mul(matrix[row][j]));
        }
      }
    }
    row++;
  }

  return matrix;
}

function consistencyCheck(rrefA, M, N) {
  for (let r = 0; r < M; r++) {
    let allZero = true;
    for (let c = 0; c < N; c++) {
      if (!rrefA[r][c].isZero()) {
        allZero = false;
        break;
      }
    }
    if (allZero && !rrefA[r][N].isZero()) {
      return true;
    }
  }
  return false;
}

function solve(input) {
  let parsed = parseInput(input);
  if (parsed === false) return "SOL=NONE";
  const { matrix, dim } = parsed;
  const [M, N] = dim;
  const reducedMatrix = RREF(matrix, dim);
  if (consistencyCheck(reducedMatrix, M, N)) {
    return "SOL=NONE";
  }

  const pivotColumns = [];
  const colToRow = {};
  for (let r = 0; r < M; r++) {
    for (let c = 0; c < N; c++) {
      if (!reducedMatrix[r][c].isZero()) {
        pivotColumns.push(c);
        colToRow[c] = r;
        break;
      }
    }
  }

  const freeCols = [];
  for (let c = 0; c < N; c++) {
    if (!pivotColumns.includes(c)) {
      freeCols.push(c);
    }
  }

  const particular = new Array(N);
  for (let c = 0; c < N; c++) {
    if (colToRow[c] !== undefined) {
      particular[c] = reducedMatrix[colToRow[c]][N];
    } else {
      particular[c] = new Fraction(0);
    }
  }

  const basisVectors = [];
  for (let k = 0; k < freeCols.length; k++) {
    const fCol = freeCols[k];
    const vec = new Array(N);
    for (let c = 0; c < N; c++) {
      if (c === fCol) {
        vec[c] = new Fraction(1);
      } else if (colToRow[c] !== undefined) {
        vec[c] = reducedMatrix[colToRow[c]][fCol].neg();
      } else {
        vec[c] = new Fraction(0);
      }
    }
    basisVectors.push(vec);
  }

  const formatVec = (vec) =>
    "(" + vec.map((f) => f.toString()).join("; ") + ")";

  let result = "SOL=" + formatVec(particular);
  for (let k = 0; k < basisVectors.length; k++) {
    result += ` + q${k + 1} * ` + formatVec(basisVectors[k]);
  }
  return result;
}
