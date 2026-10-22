const { execSync } = require('child_process');

console.log('1. git add .');
execSync('git add .', { stdio: 'inherit' });

console.log('2. git commit');
execSync('git commit -m "feat: use user custom 600x600 WhatsApp share image and matching description"', { stdio: 'inherit' });

console.log('3. git push origin main');
execSync('git push origin main', { stdio: 'inherit' });

console.log('Successfully pushed custom WhatsApp share image!');
