const fs = require('fs');
const path = require('path');

function readLog() {
  const file = path.join(process.cwd(), 'tmp', 'subscribe.log');
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, 'utf-8').trim();
  if (!raw) return [];
  return raw.split('\n').map((l) => {
    try {
      return JSON.parse(l);
    } catch (e) {
      return { raw: l };
    }
  });
}

function toCSV(items) {
  const headers = ['id', 'email', 'createdAt', 'raw'];
  const rows = items.map((it) => headers.map((h) => (it[h] || '').toString().replace(/"/g, '""')));
  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
  return csv;
}

function writeCSV() {
  const items = readLog();
  const csv = toCSV(items);
  const outFile = path.join(process.cwd(), 'tmp', 'subscriptions.csv');
  if (!fs.existsSync(path.join(process.cwd(), 'tmp'))) fs.mkdirSync(path.join(process.cwd(), 'tmp'), { recursive: true });
  fs.writeFileSync(outFile, csv, 'utf-8');
  console.log('Wrote', outFile);
}

if (require.main === module) {
  const arg = process.argv[2];
  if (arg === '--watch') {
    const file = path.join(process.cwd(), 'tmp', 'subscribe.log');
    console.log('Watching', file);
    fs.watch(file, { persistent: true }, () => writeCSV());
    writeCSV();
  } else {
    writeCSV();
  }
}
