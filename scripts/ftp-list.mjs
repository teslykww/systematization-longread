import { Client } from 'basic-ftp';
import { readFileSync, existsSync } from 'fs';

function loadEnv() {
  const file = existsSync('.env.local') ? '.env.local' : existsSync('.env') ? '.env' : null;
  if (!file) return;
  const content = readFileSync(file, 'utf8');
  for (const line of content.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

loadEnv();
const client = new Client(10000);
client.ftp.verbose = true;

async function list(path = '.') {
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
      secure: false,
    });
    const list = await client.list(path);
    console.log('Path:', path);
    list.forEach(f => console.log(' ', f.name, f.isDirectory ? '(dir)' : ''));
    await client.cd('/');
    const root = await client.list();
    console.log('\nRoot:');
    root.forEach(f => console.log(' ', f.name, f.isDirectory ? '(dir)' : ''));
    const data = await client.list('data');
    console.log('\ndata/:');
    data.forEach(f => console.log(' ', f.name, f.isDirectory ? '(dir)' : ''));
    const datawww = await client.list('data/www');
    console.log('\ndata/www/:');
    datawww.forEach(f => console.log(' ', f.name, f.isDirectory ? '(dir)' : ''));
  } finally {
    client.close();
  }
}

list().catch(e => { console.error(e); process.exit(1); });
