// src/utils/qr.ts
// Generador de matriz QR estándar ISO/IEC 18004 en TypeScript puro (sin dependencias externas, 100% offline)

const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);

(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) {
    EXP[i] = EXP[i - 255];
  }
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP[LOG[a] + LOG[b]];
}

function rsGeneratorPoly(deg: number): Uint8Array {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < deg; i++) {
    const next = new Uint8Array(poly.length + 1);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], EXP[i]);
    }
    poly = next;
  }
  return poly;
}

function rsEncode(data: number[], ecLen: number): number[] {
  const gen = rsGeneratorPoly(ecLen);
  const msg = new Uint8Array(data.length + ecLen);
  msg.set(data, 0);
  for (let i = 0; i < data.length; i++) {
    const coef = msg[i];
    if (coef !== 0) {
      for (let j = 1; j < gen.length; j++) {
        msg[i + j] ^= gfMul(gen[j], coef);
      }
    }
  }
  return Array.from(msg.slice(data.length));
}

interface VersionSpec {
  version: number;
  dataCodewords: number;
  ecCodewords: number;
  alignment: number[];
}

// Versiones 1 a 5 en Nivel L (bloque único Reed-Solomon, hasta 106 bytes)
const VERSIONES_L: VersionSpec[] = [
  { version: 1, dataCodewords: 19, ecCodewords: 7, alignment: [] },
  { version: 2, dataCodewords: 34, ecCodewords: 10, alignment: [6, 18] },
  { version: 3, dataCodewords: 55, ecCodewords: 15, alignment: [6, 22] },
  { version: 4, dataCodewords: 80, ecCodewords: 20, alignment: [6, 26] },
  { version: 5, dataCodewords: 108, ecCodewords: 26, alignment: [6, 30] },
];

function utf8Bytes(texto: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < texto.length; i++) {
    let code = texto.charCodeAt(i);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else {
      bytes.push(
        0xe0 | (code >> 12),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f)
      );
    }
  }
  return bytes;
}

function calcularBitsFormato(eclBits: number, mask: number): number {
  const data = (eclBits << 3) | mask;
  let rem = data << 10;
  for (let i = 14; i >= 10; i--) {
    if ((rem >> i) & 1) {
      rem ^= 0x537 << (i - 10);
    }
  }
  return ((data << 10) | rem) ^ 0x5412;
}

function evaluarMascara(mask: number, r: number, c: number): boolean {
  switch (mask) {
    case 0:
      return (r + c) % 2 === 0;
    case 1:
      return r % 2 === 0;
    case 2:
      return c % 3 === 0;
    case 3:
      return (r + c) % 3 === 0;
    case 4:
      return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
    case 5:
      return ((r * c) % 2) + ((r * c) % 3) === 0;
    case 6:
      return (((r * c) % 2) + ((r * c) % 3)) % 2 === 0;
    case 7:
      return (((r + c) % 2) + ((r * c) % 3)) % 2 === 0;
    default:
      return false;
  }
}

function colocarBitsFormato(matriz: boolean[][], size: number, mask: number): void {
  // Nivel L = 0b01
  const bits = calcularBitsFormato(0b01, mask);

  // Copia superior izquierda
  const colsTopLeft = [0, 1, 2, 3, 4, 5, 7, 8];
  for (let i = 0; i < 8; i++) {
    const bit = ((bits >> (14 - i)) & 1) === 1;
    matriz[8][colsTopLeft[i]] = bit;
  }
  const rowsTopLeft = [7, 5, 4, 3, 2, 1, 0];
  for (let i = 0; i < 7; i++) {
    const bit = ((bits >> (6 - i)) & 1) === 1;
    matriz[rowsTopLeft[i]][8] = bit;
  }

  // Segunda copia (inferior izquierda + superior derecha)
  for (let i = 0; i < 7; i++) {
    const bit = ((bits >> (14 - i)) & 1) === 1;
    matriz[size - 1 - i][8] = bit;
  }
  for (let i = 0; i < 8; i++) {
    const bit = ((bits >> (7 - i)) & 1) === 1;
    matriz[8][size - 8 + i] = bit;
  }
  // Módulo oscuro fijo
  matriz[size - 8][8] = true;
}

function calcularPenalidad(matriz: boolean[][]): number {
  const n = matriz.length;
  let penalidad = 0;

  // Regla 1: filas y columnas con 5+ módulos iguales consecutivos
  for (let r = 0; r < n; r++) {
    let racha = 1;
    for (let c = 1; c < n; c++) {
      if (matriz[r][c] === matriz[r][c - 1]) {
        racha++;
        if (racha === 5) penalidad += 3;
        else if (racha > 5) penalidad += 1;
      } else {
        racha = 1;
      }
    }
  }
  for (let c = 0; c < n; c++) {
    let racha = 1;
    for (let r = 1; r < n; r++) {
      if (matriz[r][c] === matriz[r - 1][c]) {
        racha++;
        if (racha === 5) penalidad += 3;
        else if (racha > 5) penalidad += 1;
      } else {
        racha = 1;
      }
    }
  }

  // Regla 2: bloques 2x2 del mismo color
  for (let r = 0; r < n - 1; r++) {
    for (let c = 0; c < n - 1; c++) {
      const v = matriz[r][c];
      if (
        matriz[r][c + 1] === v &&
        matriz[r + 1][c] === v &&
        matriz[r + 1][c + 1] === v
      ) {
        penalidad += 3;
      }
    }
  }

  return penalidad;
}

/**
 * Genera una matriz booleana 2D (true = módulo negro, false = módulo blanco)
 * que representa un código QR válido según ISO/IEC 18004.
 */
export function generarMatrizQr(texto: string): boolean[][] {
  const bytes = utf8Bytes(texto || 'VGY');
  const spec =
    VERSIONES_L.find((v) => bytes.length + 2 <= v.dataCodewords) ||
    VERSIONES_L[VERSIONES_L.length - 1];

  const payload = bytes.slice(0, spec.dataCodewords - 2);
  const bits: number[] = [];

  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) {
      bits.push((val >> i) & 1);
    }
  };

  // Modo Byte (0100) + longitud en 8 bits
  pushBits(0b0100, 4);
  pushBits(payload.length, 8);
  for (const b of payload) {
    pushBits(b, 8);
  }

  // Terminador (hasta 4 ceros)
  const capacidadBits = spec.dataCodewords * 8;
  const term = Math.min(4, capacidadBits - bits.length);
  pushBits(0, term);

  // Relleno hasta múltiplo de 8
  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  // Relleno de bytes alternando 0xEC y 0x11
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bits.length < capacidadBits) {
    pushBits(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  const dataBytes: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) {
      b = (b << 1) | bits[i + j];
    }
    dataBytes.push(b);
  }

  const ecBytes = rsEncode(dataBytes, spec.ecCodewords);
  const todosBytes = [...dataBytes, ...ecBytes];
  const todosBits: number[] = [];
  for (const b of todosBytes) {
    for (let j = 7; j >= 0; j--) {
      todosBits.push((b >> j) & 1);
    }
  }

  const size = 17 + 4 * spec.version;
  const base: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );
  const reservado: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );

  // Patrones de búsqueda (7x7) + separadores blancos (8x8)
  const colocarFinder = (top: number, left: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = top + r;
        const cc = left + c;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        reservado[rr][cc] = true;
        if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
          const borde = r === 0 || r === 6 || c === 0 || c === 6;
          const centro = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          base[rr][cc] = borde || centro;
        } else {
          base[rr][cc] = false;
        }
      }
    }
  };

  colocarFinder(0, 0);
  colocarFinder(0, size - 7);
  colocarFinder(size - 7, 0);

  // Patrones de alineación (5x5)
  for (const cr of spec.alignment) {
    for (const cc of spec.alignment) {
      if (reservado[cr][cc]) continue;
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          const rr = cr + r;
          const col = cc + c;
          reservado[rr][col] = true;
          const borde = Math.abs(r) === 2 || Math.abs(c) === 2;
          const centro = r === 0 && c === 0;
          base[rr][col] = borde || centro;
        }
      }
    }
  }

  // Patrones de sincronización (fila 6 y columna 6)
  for (let i = 8; i < size - 8; i++) {
    if (!reservado[6][i]) {
      reservado[6][i] = true;
      base[6][i] = i % 2 === 0;
    }
    if (!reservado[i][6]) {
      reservado[i][6] = true;
      base[i][6] = i % 2 === 0;
    }
  }

  // Reservar áreas de información de formato y módulo oscuro
  for (let i = 0; i <= 8; i++) {
    reservado[8][i] = true;
    reservado[i][8] = true;
  }
  for (let i = 0; i < 8; i++) {
    reservado[8][size - 1 - i] = true;
    reservado[size - 1 - i][8] = true;
  }
  base[size - 8][8] = true;

  // Colocación de datos en zigzag de derecha a izquierda
  let bitIdx = 0;
  let subiendo = true;
  for (let col = size - 1; col >= 1; col -= 2) {
    if (col === 6) col--; // Saltar columna de timing
    for (let paso = 0; paso < size; paso++) {
      const r = subiendo ? size - 1 - paso : paso;
      for (let d = 0; d < 2; d++) {
        const c = col - d;
        if (!reservado[r][c]) {
          base[r][c] = bitIdx < todosBits.length ? todosBits[bitIdx] === 1 : false;
          bitIdx++;
        }
      }
    }
    subiendo = !subiendo;
  }

  // Evaluar las 8 máscaras y elegir la de menor penalidad
  let mejorMatriz = base;
  let mejorPenalidad = Infinity;

  for (let mask = 0; mask < 8; mask++) {
    const candidata: boolean[][] = base.map((fila, r) =>
      fila.map((valor, c) =>
        reservado[r][c] ? valor : evaluarMascara(mask, r, c) ? !valor : valor
      )
    );
    colocarBitsFormato(candidata, size, mask);
    const pen = calcularPenalidad(candidata);
    if (pen < mejorPenalidad) {
      mejorPenalidad = pen;
      mejorMatriz = candidata;
    }
  }

  return mejorMatriz;
}
