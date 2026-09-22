// Gera public/og-image.png (1200x630) sem dependências: rasteriza o monograma
// de app/icon.svg (W + "+") sobre o fundo ink. Rodar: node scripts/generate-og-image.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";

const W = 1200, H = 630;
const ink = [0x0b, 0x0f, 0x17], line = [0x26, 0x31, 0x4a];
const fg = [0xe8, 0xec, 0xf4], signal = [0x5b, 0x8c, 0xff];
const px = new Uint8Array(W * H * 3);

const set = (x, y, c, a = 1) => {
  const i = (y * W + x) * 3;
  for (let k = 0; k < 3; k++) px[i + k] = Math.round(px[i + k] * (1 - a) + c[k] * a);
};
const fill = (x0, y0, x1, y1, c) => {
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) set(x, y, c);
};
// Traço com pontas arredondadas e antialias simples (distância ao segmento).
const stroke = (pts, width, c, scale, ox, oy) => {
  const r = (width * scale) / 2;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = [ox + pts[i][0] * scale, oy + pts[i][1] * scale];
    const [bx, by] = [ox + pts[i + 1][0] * scale, oy + pts[i + 1][1] * scale];
    const minX = Math.floor(Math.min(ax, bx) - r - 1), maxX = Math.ceil(Math.max(ax, bx) + r + 1);
    const minY = Math.floor(Math.min(ay, by) - r - 1), maxY = Math.ceil(Math.max(ay, by) + r + 1);
    const dx = bx - ax, dy = by - ay, len2 = dx * dx + dy * dy;
    for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) {
      const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / len2));
      const d = Math.hypot(x - ax - t * dx, y - ay - t * dy);
      const a = Math.max(0, Math.min(1, r - d + 0.5));
      if (a > 0) set(x, y, c, a);
    }
  }
};

fill(0, 0, W, H, ink);
fill(0, 0, W, 8, signal);            // faixa de destaque no topo
fill(40, 40, W - 40, 42, line);      // moldura
fill(40, H - 42, W - 40, H - 40, line);
fill(40, 40, 42, H - 40, line);
fill(W - 42, 40, W - 40, H - 40, line);

// Monograma do icon.svg (viewBox 64) centralizado.
const s = 9, ox = (W - 64 * s) / 2 + 20, oy = (H - 64 * s) / 2;
stroke([[12, 20], [18, 44], [24, 26], [30, 44], [36, 20]], 5, fg, s, ox, oy);
stroke([[47, 24], [47, 40]], 5, signal, s, ox, oy);
stroke([[39, 32], [55, 32]], 5, signal, s, ox, oy);

// Encoder PNG mínimo (RGB 8 bits).
const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const c = Buffer.alloc(4); c.writeUInt32BE(crc(td));
  return Buffer.concat([len, td, c]);
};
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 2;
const raw = Buffer.alloc((W * 3 + 1) * H);
for (let y = 0; y < H; y++) Buffer.from(px.buffer, y * W * 3, W * 3).copy(raw, y * (W * 3 + 1) + 1);
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0)),
]);
mkdirSync("public", { recursive: true });
writeFileSync("public/og-image.png", png);
console.log(`public/og-image.png gerado (${png.length} bytes)`);
