#!/usr/bin/env node

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "../public/images");
const outputDir = path.join(__dirname, "../public/images/optimized");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image optimization settings
const formats = [
  { ext: "webp", quality: 80 },
  { ext: "avif", quality: 70 },
  { ext: "jpg", quality: 85 },
];

const sizes = [
  { width: 400, suffix: "-sm" },
  { width: 800, suffix: "-md" },
  { width: 1200, suffix: "-lg" },
  { width: 1920, suffix: "-xl" },
];

async function optimizeImage(inputPath, outputPath, format, quality, width) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Calculate height maintaining aspect ratio
    const height = Math.round((width * metadata.height) / metadata.width);

    await image
      .resize(width, height, {
        fit: "cover",
        position: "center",
      })
      .toFormat(format.ext, { quality })
      .toFile(outputPath);

    console.log(`✓ Generated ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
  }
}

async function processImages() {
  const files = fs
    .readdirSync(inputDir)
    .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

  console.log(`Found ${files.length} images to optimize...\n`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;

    console.log(`Processing ${file}...`);

    for (const format of formats) {
      for (const size of sizes) {
        const outputFileName = `${baseName}${size.suffix}.${format.ext}`;
        const outputPath = path.join(outputDir, outputFileName);

        await optimizeImage(
          inputPath,
          outputPath,
          format,
          format.quality,
          size.width
        );
      }
    }

    console.log(`Completed ${file}\n`);
  }

  console.log("🎉 Image optimization complete!");
  console.log(`Optimized images saved to: ${outputDir}`);
}

processImages().catch(console.error);
