'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'dist-mobile-nlu/index.html'), 'utf8');
const links = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).filter((href) => !href.startsWith('#') && !href.startsWith('http'));
const missing = [];
for (const link of links) {
  const target = path.resolve(root, 'dist-mobile-nlu', link);
  if (!fs.existsSync(target)) missing.push(link);
}
if (missing.length) throw new Error(`Broken local links: ${missing.join(', ')}`);
console.log(`Validated ${links.length} local links.`);
