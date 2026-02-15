import { readFileSync, writeFileSync } from 'fs';
const path = process.argv[2];
const content = readFileSync(path, 'utf8');
const lines = content.split('\n');
if (lines[0].startsWith('pick ')) {
  lines[0] = lines[0].replace('pick ', 'reword ');
  writeFileSync(path, lines.join('\n'));
}
