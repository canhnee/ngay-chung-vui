// Simple Cloudinary upload script
// Run: node upload-cloudinary.js

import 'dotenv/config';
import fs from 'fs';
import https from 'https';
import { createReadStream } from 'fs';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error('❌ Missing Cloudinary credentials in .env');
  console.log('Add to .env:');
  console.log('CLOUDINARY_CLOUD_NAME=xxx');
  console.log('CLOUDINARY_API_KEY=xxx');
  console.log('CLOUDINARY_API_SECRET=xxx');
  process.exit(1);
}

console.log('🚀 Uploading to Cloudinary...');
console.log('☁️ Cloud:', CLOUD_NAME);

const audioPath = './public/audio/audio_doanket.mp3';

if (!fs.existsSync(audioPath)) {
  console.error('❌ Audio file not found:', audioPath);
  process.exit(1);
}

// Simple upload using fetch (Node 18+)
const uploadFile = async () => {
  const formData = new FormData();
  const fileBuffer = fs.readFileSync(audioPath);
  const blob = new Blob([fileBuffer], { type: 'audio/mpeg' });
  
  formData.append('file', blob, 'audio_doanket.mp3');
  formData.append('upload_preset', 'wedding_audio'); // Use the preset we created
  formData.append('resource_type', 'video'); // Audio files use 'video' resource type
  
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error('❌ Upload failed:', data.error.message);
      process.exit(1);
    }
    
    console.log('✅ Upload successful!');
    console.log('📎 URL:', data.secure_url);
    console.log('\n📝 Copy this URL and send to me:');
    console.log(data.secure_url);
    
    // Update fallback file
    const fallbackPath = './src/data/fallbackWedding.ts';
    let content = fs.readFileSync(fallbackPath, 'utf8');
    content = content.replace(
      /music_url: '.*audio_doanket\.mp3'/,
      `music_url: '${data.secure_url}'`
    );
    fs.writeFileSync(fallbackPath, content);
    console.log('\n✅ Updated fallbackWedding.ts');
    
  } catch (error) {
    console.error('❌ Upload error:', error.message);
    process.exit(1);
  }
};

uploadFile();
