import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

const originalsPath = process.argv[2];
const destinationPath = process.argv[3];

await fs.mkdir(destinationPath, { recursive: true });
const originals = await fs.readdir(originalsPath);

for (const index of originals.keys())
  await sharp(path.join(originalsPath, originals[index]), {
    limitInputPixels: false,
  })
    .rotate()
    .resize({
      width: 256,
      height: 256,
      position: sharp.strategy.attention,
    })
    .toFile(path.join(destinationPath, `${index}.png`));

for (const index of originals.keys())
  await sharp(path.join(destinationPath, `${index}.png`), {
    limitInputPixels: false,
  }).toFile(path.join(destinationPath, `${index}.webp`));
