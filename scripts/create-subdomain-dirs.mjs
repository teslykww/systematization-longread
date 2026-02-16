#!/usr/bin/env node
import { Client } from 'basic-ftp';
import { readFileSync, existsSync } from 'fs';

async function loadEnv() {
  const file = existsSync('.env.local') ? '.env.local' : existsSync('.env') ? '.env' : null;
  if (!file) return;
  const content = readFileSync(file, 'utf8');
  for (const line of content.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

async function main() {
  await loadEnv();
  const host = process.env.FTP_HOST || '37.140.192.62';
  const user = process.env.FTP_USERNAME || 'u3416804';
  const pass = process.env.FTP_PASSWORD;

  if (!pass) {
    console.error('Set FTP_PASSWORD in .env.local');
    process.exit(1);
  }

  // «В поддиректории»: 1.vlad4you.ru → ./1, 2.vlad4you.ru → ./2
  const dirs = ['1', '2'];
  const client = new Client(60000);

  try {
    await client.access({ host, user, password: pass, secure: false });
    await client.cd('/');
    for (const dir of dirs) {
      try {
        await client.ensureDir(dir);
        console.log('Created:', dir);
      } catch (e) {
        console.error('Failed to create', dir, ':', e.message);
      }
    }
    console.log('Done.');
  } catch (e) {
    console.error('Failed:', e.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

main();
