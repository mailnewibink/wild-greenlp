const { execSync } = require('child_process');

console.log('1. Staging performance optimizations...');
execSync('git add -A', { stdio: 'inherit' });

console.log('2. Committing...');
execSync('git commit -m "perf: optimize character images (97.5% smaller), add WebP support, lazy loading, and GPU acceleration"', { stdio: 'inherit' });

console.log('3. Pushing to GitHub main...');
execSync('git push origin main', { stdio: 'inherit' });

console.log('Successfully pushed performance updates!');
