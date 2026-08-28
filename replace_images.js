const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Replace JSON-LD absolute URLs
      if (content.includes('images.unsplash.com') && fullPath.includes('LocalBusinessSchema')) {
        content = content.replace(/https:\/\/images\.unsplash\.com\/[^"']+/g, 'https://mesapoolremoval.com/hero_pool_demolition.jpg');
        changed = true;
      }
      // Replace JSX/Component relative URLs
      else if (content.includes('images.unsplash.com')) {
        content = content.replace(/https:\/\/images\.unsplash\.com\/[^"']+/g, '/hero_pool_demolition.jpg');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

replaceInDir(path.join(__dirname, 'src'));
console.log('All unsplash images replaced.');
