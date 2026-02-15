import { readFileSync, writeFileSync } from 'fs';
const path = process.argv[2];
if (!path) process.exit(0);
let msg = readFileSync(path, 'utf8');
if (!msg.includes('test: trigger')) {
  msg = 'Landing: business management system, CTA to Telegram';
  writeFileSync(path, msg, 'utf8');
}
