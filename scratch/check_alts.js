const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const imgMatches = content.match(/<Image[^>]*alt=[\"'{][^>]*>/g);
  if (imgMatches) {
    console.log('\n--- ' + filePath + ' ---');
    imgMatches.forEach(m => {
      const altMatch = m.match(/alt=([\"'{][^\"'}]*[\"'}]?)/);
      if (altMatch) console.log(altMatch[1]);
    });
  }
}

function walkSync(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkSync(filePath);
    } else if (filePath.endsWith('.tsx')) {
      checkFile(filePath);
    }
  }
}

walkSync('src/components');
walkSync('src/app');
