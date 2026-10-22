'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'coverage'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(js|cjs|json|html|md|yml|yaml|csv|webmanifest)$/.test(entry.name)) files.push(full);
  }
}
walk(root);

const patterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /AKIA[0-9A-Z]{16}/,
  /(?:api[_-]?key|secret|password)\s*[:=]\s*["'][^"']{12,}["']/i
];
const findings = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  for (const pattern of patterns) if (pattern.test(content)) findings.push(path.relative(root, file));
}
if (findings.length) throw new Error(`Potential secret material found in: ${[...new Set(findings)].join(', ')}`);
console.log(`Scanned ${files.length} project text files for obvious secret patterns.`);
