const { execSync } = require('child_process');

console.log('1. git add .');
execSync('git add .', { stdio: 'inherit' });

console.log('2. git commit');
execSync('git commit -m "feat: add WhatsApp Open Graph meta tags, og-image, and app-icon"', { stdio: 'inherit' });

console.log('3. git push origin main');
execSync('git push origin main', { stdio: 'inherit' });

console.log('Done!');
