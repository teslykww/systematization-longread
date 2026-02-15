#!/usr/bin/env node
import { Client } from 'basic-ftp';
import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { createReadStream, readFileSync, existsSync } from 'fs';

const DIST = './dist';

async function loadEnv() {
  const file = existsSync('.env.local') ? '.env.local' : existsSync('.env') ? '.env' : null;
  if (!file) return;
  const content = readFileSync(file, 'utf8');
  for (const line of content.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

async function* walk(dir, base = '') {
  const entries = await readdir(join(dir, base), { withFileTypes: true });
  for (const e of entries) {
    const p = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) yield* walk(dir, p);
    else yield p;
  }
}

async function uploadToDir(client, remoteDir) {
  const files = [];
  for await (const f of walk(DIST)) files.push(f);
  const parentDirs = [...new Set(files.map(f => dirname(f).replace(/\\/g, '/')))].filter(p => p !== '.');
  const parts = remoteDir.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  if (parts.length && parts[0] !== '.') {
    await client.cd('/');
    for (const pd of parentDirs) {
      try { await client.ensureDir(remoteDir + '/' + pd); } catch (_) {}
      await client.cd('/');
    }
    for (const part of parts) await client.cd(part);
  } else {
    for (const pd of parentDirs) {
      for (const sp of pd.split('/')) {
        try { await client.cd(sp); } catch (_) { await client.ensureDir(sp); await client.cd(sp); }
      }
      for (let i = pd.split('/').length; i--;) await client.cd('..');
    }
  }
  for (const f of files) {
    const local = join(DIST, f);
    await client.uploadFrom(createReadStream(local), f);
    console.log('Uploaded:', f);
  }
  if (parts.length && parts[0] !== '.') for (let i = 0; i < parts.length; i++) await client.cd('..');
}

async function main() {
  await loadEnv();
  const host = process.env.FTP_HOST || '37.140.192.62';
  const user = process.env.FTP_USERNAME || 'u3416804';
  const pass = process.env.FTP_PASSWORD;
  const target = process.argv[2]; // '1' | '2' | 'subdomains' | undefined

  if (!pass) {
    console.error('Set FTP_PASSWORD in .env.local or environment');
    process.exit(1);
  }

  // FTP root = www level (has vlad4you.ru content + 1.vlad4you.ru, 2.vlad4you.ru)
  const dirs = [];
  if (target === '1') {
    dirs.push(process.env.FTP_REMOTE_DIR_1 || '1.vlad4you.ru');
  } else if (target === '2') {
    dirs.push(process.env.FTP_REMOTE_DIR_2 || '2.vlad4you.ru');
  } else if (target === 'subdomains' || target === 'all') {
    if (target === 'all') dirs.push('.');
    dirs.push(process.env.FTP_REMOTE_DIR_1 || '1.vlad4you.ru');
    dirs.push(process.env.FTP_REMOTE_DIR_2 || '2.vlad4you.ru');
  } else {
    dirs.push(process.env.FTP_REMOTE_DIR || '.');
  }

  const client = new Client(60000);
  client.ftp.verbose = false;

  try {
    await client.access({ host, user, password: pass, secure: false });
    for (const remoteDir of dirs) {
      console.log('\n--- Deploy to', remoteDir, '---');
      await client.cd('/');
      await uploadToDir(client, remoteDir);
    }
    console.log('\nDeploy done.');
  } catch (e) {
    console.error('Deploy failed:', e.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

main();
