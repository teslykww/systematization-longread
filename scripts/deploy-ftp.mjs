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

async function main() {
  await loadEnv();
  const host = process.env.FTP_HOST || '37.140.192.62';
  const user = process.env.FTP_USERNAME || 'u3416804';
  const pass = process.env.FTP_PASSWORD;
  const remoteDir = process.env.FTP_REMOTE_DIR || '/';

  if (!pass) {
    console.error('Set FTP_PASSWORD in .env.local or environment');
    process.exit(1);
  }

  const client = new Client(60000);
  client.ftp.verbose = false;

  try {
    await client.access({
      host,
      user,
      password: pass,
      secure: false,
    });
    await client.ensureDir(remoteDir);
    const files = [];
    for await (const f of walk(DIST)) files.push(f);
    for (const f of files) {
      const local = join(DIST, f);
      const remote = join(remoteDir, f).replace(/\\/g, '/');
      const remoteDirPath = dirname(remote);
      if (remoteDirPath !== '.') await client.ensureDir(remoteDirPath);
      await client.uploadFrom(createReadStream(local), remote);
      console.log('Uploaded:', f);
    }
    console.log('Deploy done.');
  } catch (e) {
    console.error('Deploy failed:', e.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

main();
