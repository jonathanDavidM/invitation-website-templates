import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

// Downscale the attire illustrations to a web-sane width while keeping the
// alpha channel. Prints final dimensions so the component can set width/height.
const files = ["ladies", "gentlemen"];
const MAX_W = 1400;

for (const name of files) {
  const src = `public/images/attire/${name}.png`;
  const buf = readFileSync(src);
  const out = await sharp(buf)
    .resize({ width: MAX_W, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
  writeFileSync(src, out);
  const meta = await sharp(out).metadata();
  console.log(`${name}: ${meta.width}x${meta.height}, ${(out.length / 1024).toFixed(0)} KB`);
}
