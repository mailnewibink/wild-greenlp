const { execSync } = require('child_process');
const fs = require('fs');

console.log('Staging files...');
execSync('git add -A');

console.log('Committing...');
const commitMsg = 'feat: update APK download to v3.1, update QR codes, and add vercel redirects';
console.log(execSync('git commit -m "' + commitMsg + '"').toString());

console.log('Fetching & pulling origin main...');
try {
  console.log(execSync('git pull --rebase origin main').toString());
} catch(e) {
  console.log('Pull rebase err/info:', e.message);
}

console.log('Pushing to GitHub origin main...');
console.log(execSync('git push origin main').toString());

console.log('Removing deploy.js...');
fs.unlinkSync('deploy.js');

console.log('All done successfully!');
