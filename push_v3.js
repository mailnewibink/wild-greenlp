const { execSync } = require('child_process');

console.log('1. Staging changes...');
execSync('git add -A', { stdio: 'inherit' });

console.log('2. Committing v3 update...');
execSync('git commit -m "feat: update APK to v3.0 (WildAndGreen-v3.apk)"', { stdio: 'inherit' });

console.log('3. Pushing to GitHub main...');
execSync('git push origin main', { stdio: 'inherit' });

console.log('All done! Successfully pushed v3 update.');
