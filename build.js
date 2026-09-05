const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'public');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const filesToCopy = [
  'index.html',
  'thank-you.html',
  'style.css',
  'script.js',
  'nava-logo-gold.png',
  'nava-logo-gold1.png',
  'nava-name-gold.png',
  'svr-home-foods-preview.png',
  'guessproof-ai-preview.png',
  'google7b11f1225658a566.html',
  'robots.txt',
  'sitemap.xml'
];

console.log('Building NAVA Website static distribution...');

filesToCopy.forEach(file => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`✓ Copied: ${file}`);
  } else {
    console.warn(`⚠ Warning: File not found: ${file}`);
  }
});

console.log('Build complete! Distribution ready in public/');
