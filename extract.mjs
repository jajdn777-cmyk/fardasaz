import fs from 'fs';
import path from 'path';

const extractPersian = (dir, ext) => {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(extractPersian(fullPath, ext));
    } else if (fullPath.endsWith(ext)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      // match persian characters between > and <, or in quotes
      const matches = content.match(/[\u0600-\u06FF\s]+(?=[<"'])/g);
      if (matches) {
        results.push({ file: fullPath, text: matches.map(m => m.trim()).filter(m => m.length > 1) });
      }
    }
  }
  return results;
}

const all = extractPersian('src', '.tsx');
console.log(JSON.stringify(all, null, 2));
