'use strict';

// The current product is intentionally dependency-free. This build gate validates
// the checked-in static release and creates a deterministic build manifest.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const files = ['index.html', 'mobile_notebook_reader.html', 'manifest.webmanifest', 'sw.js'];
const output = { buildId: null, files: {} };
for (const file of files) {
  const full = path.join(root, 'dist-mobile-nlu', file);
  if (!fs.existsSync(full)) throw new Error(`Missing distribution asset: ${file}`);
  output.files[file] = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
}
output.buildId = crypto.createHash('sha256').update(Object.values(output.files).join(':')).digest('hex').slice(0, 16);
fs.writeFileSync(path.join(root, 'dist-mobile-nlu/build-manifest.json'), `${JSON.stringify(output, null, 2)}\n`);
console.log('Static release validated and build manifest generated.');
