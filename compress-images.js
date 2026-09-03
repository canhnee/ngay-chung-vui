// Compress large images for Cloudinary upload
// Requires: npm install sharp

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public/wedding-img';
const outputDir = './public/wedding-img-compressed';

// Images larger than 10MB that need compression
const largeImages = [
  'anh3.jpg', 'anh8.JPG', 'anh9.JPG', 'anh10.JPG', 'anh11.JPG',
  'anh12.JPG', 'anh13.JPG', 'anh17.JPG', 'anh21.JPG', 'anh23.JPG',
  'anh24.JPG', 'anh25.JPG', 'anh26.JPG', 'anh27.JPG', 'anh28.JPG'
];

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🖼️  Compressing large images...\n');

async function compressImage(filename) {
  const inputPath = path.join(inputDir, filename);
  const outputPath = path.join(outputDir, filename);
  
  try {
    const stats = fs.statSync(inputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    console.log(`📸 ${filename} (${sizeMB} MB)`);
    
    // Compress with Sharp
    await sharp(inputPath)
      .jpeg({
        quality: 80, // Reduce quality to 80%
        progressive: true,
        mozjpeg: true // Better compression
      })
      .resize(3000, 3000, { // Max 3000px on longest side
        fit: 'inside',
        withoutEnlargement: true
      })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`   ✅ Compressed to ${newSizeMB} MB (saved ${savings}%)\n`);
    
    return true;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
    return false;
  }
}

async function compressAll() {
  console.log(`Processing ${largeImages.length} images...\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const filename of largeImages) {
    const result = await compressImage(filename);
    if (result) success++;
    else failed++;
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Compressed: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`\n📁 Output: ${outputDir}`);
  console.log('\nNow upload images from wedding-img-compressed/ to Cloudinary!');
}

compressAll().catch(console.error);
