import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// =====================================================
// UPLOAD AUDIO FILE
// =====================================================
async function uploadAudio() {
  console.log('\n🎵 Uploading audio file...');
  
  const audioPath = path.join(__dirname, 'public', 'audio', 'audio_doanket.mp3');
  
  if (!fs.existsSync(audioPath)) {
    console.error('❌ Audio file not found:', audioPath);
    return null;
  }
  
  const audioFile = fs.readFileSync(audioPath);
  const fileName = 'audio_doanket.mp3';
  
  console.log(`📤 Uploading: ${fileName} (${(audioFile.length / 1024 / 1024).toFixed(2)} MB)`);
  
  const { data, error } = await supabase.storage
    .from('wedding-music')
    .upload(fileName, audioFile, {
      contentType: 'audio/mpeg',
      cacheControl: '3600',
      upsert: true // Overwrite if exists
    });
  
  if (error) {
    console.error('❌ Error uploading audio:', error.message);
    return null;
  }
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from('wedding-music')
    .getPublicUrl(fileName);
  
  console.log('✅ Audio uploaded successfully!');
  console.log('🔗 Public URL:', urlData.publicUrl);
  
  return urlData.publicUrl;
}

// =====================================================
// UPLOAD PHOTOS
// =====================================================
async function uploadPhotos() {
  console.log('\n📸 Uploading wedding photos...');
  
  const photosDir = path.join(__dirname, 'public', 'wedding-img');
  
  if (!fs.existsSync(photosDir)) {
    console.error('❌ Photos directory not found:', photosDir);
    return [];
  }
  
  const files = fs.readdirSync(photosDir)
    .filter(file => /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file))
    .sort((a, b) => {
      // Sort by number in filename
      const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      return numA - numB;
    });
  
  console.log(`📁 Found ${files.length} photos to upload`);
  
  const uploadedUrls = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(photosDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    const fileSize = (fileBuffer.length / 1024 / 1024).toFixed(2);
    
    console.log(`📤 [${i + 1}/${files.length}] Uploading: ${file} (${fileSize} MB)`);
    
    const { data, error } = await supabase.storage
      .from('wedding-photos')
      .upload(file, fileBuffer, {
        contentType: file.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg',
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      console.error(`❌ Error uploading ${file}:`, error.message);
      continue;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('wedding-photos')
      .getPublicUrl(file);
    
    uploadedUrls.push({
      filename: file,
      url: urlData.publicUrl
    });
    
    console.log(`✅ Uploaded: ${file}`);
  }
  
  return uploadedUrls;
}

// =====================================================
// UPDATE DATABASE WITH NEW URLS
// =====================================================
async function updateDatabase(audioUrl, photoUrls) {
  console.log('\n💾 Updating database with new URLs...');
  
  // Map photo URLs to sections
  const photoMapping = [
    // Opening (anh1-3)
    { file: 'anh1.jpg', section: 'opening', order: 1 },
    { file: 'anh2.jpg', section: 'opening', order: 2 },
    { file: 'anh3.jpg', section: 'opening', order: 3 },
    // Story (anh4-8)
    { file: 'anh4.jpg', section: 'story', order: 1 },
    { file: 'anh5.jpg', section: 'story', order: 2 },
    { file: 'anh6.jpg', section: 'story', order: 3 },
    { file: 'anh7.jpg', section: 'story', order: 4 },
    { file: 'anh8.JPG', section: 'story', order: 5 },
    // Gallery (anh9-18)
    { file: 'anh9.JPG', section: 'gallery', order: 1 },
    { file: 'anh10.JPG', section: 'gallery', order: 2 },
    { file: 'anh11.JPG', section: 'gallery', order: 3 },
    { file: 'anh12.JPG', section: 'gallery', order: 4 },
    { file: 'anh13.JPG', section: 'gallery', order: 5 },
    { file: 'anh14.JPG', section: 'gallery', order: 6 },
    { file: 'anh15.JPG', section: 'gallery', order: 7 },
    { file: 'anh16.JPG', section: 'gallery', order: 8 },
    { file: 'anh17.JPG', section: 'gallery', order: 9 },
    { file: 'anh18.JPG', section: 'gallery', order: 10 },
    // Anime (anh19-21)
    { file: 'anh19.JPG', section: 'anime', order: 1 },
    { file: 'anh20.JPG', section: 'anime', order: 2 },
    { file: 'anh21.JPG', section: 'anime', order: 3 },
    // Finale (anh22-25)
    { file: 'anh22.JPG', section: 'finale', order: 1 },
    { file: 'anh23.JPG', section: 'finale', order: 2 },
    { file: 'anh24.JPG', section: 'finale', order: 3 },
    { file: 'anh25.JPG', section: 'finale', order: 4 },
    // Extra gallery (anh26-28)
    { file: 'anh26.JPG', section: 'gallery', order: 11 },
    { file: 'anh27.JPG', section: 'gallery', order: 12 },
    { file: 'anh28.JPG', section: 'gallery', order: 13 },
  ];
  
  // Update music URL in fallbackWedding.ts
  const fallbackPath = path.join(__dirname, 'src', 'data', 'fallbackWedding.ts');
  let fallbackContent = fs.readFileSync(fallbackPath, 'utf8');
  
  // Replace audio URL
  if (audioUrl) {
    fallbackContent = fallbackContent.replace(
      /music_url: '\/audio\/audio_doanket\.mp3'/,
      `music_url: '${audioUrl}'`
    );
  }
  
  // Replace photo URLs
  photoUrls.forEach(({ filename, url }) => {
    const lowerFilename = filename.toLowerCase();
    const pattern = new RegExp(`image_url: '\\/wedding-img\\/${filename.replace('.', '\\.')}'`, 'gi');
    fallbackContent = fallbackContent.replace(pattern, `image_url: '${url}'`);
  });
  
  fs.writeFileSync(fallbackPath, fallbackContent);
  console.log('✅ Updated fallbackWedding.ts with new URLs');
}

// =====================================================
// MAIN FUNCTION
// =====================================================
async function main() {
  console.log('🚀 Starting upload to Supabase Storage...');
  console.log('📍 Supabase URL:', supabaseUrl);
  
  try {
    // Upload audio
    const audioUrl = await uploadAudio();
    
    // Upload photos
    const photoUrls = await uploadPhotos();
    
    console.log('\n📊 UPLOAD SUMMARY:');
    console.log(`✅ Audio: ${audioUrl ? 'Success' : 'Failed'}`);
    console.log(`✅ Photos: ${photoUrls.length}/28 uploaded`);
    
    // Update database/fallback
    await updateDatabase(audioUrl, photoUrls);
    
    console.log('\n✅ ALL DONE!');
    console.log('📝 Next steps:');
    console.log('1. Commit changes to git');
    console.log('2. Deploy to Vercel');
    console.log('3. Test the website');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
