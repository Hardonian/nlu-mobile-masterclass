'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const required = [
  'README.md',
  'package.json',
  'src/content/course.json',
  'src/content/assessment.json',
  'dist-mobile-nlu/index.html',
  'dist-mobile-nlu/manifest.webmanifest',
  'dist-mobile-nlu/icon-192.svg',
  'dist-mobile-nlu/icon-512.svg',
  'dist-mobile-nlu/sw.js',
  'docs/Observability_Event_Contract.json',
  'reference-implementation/orchestrator.js',
  'reference-implementation/orchestrator.test.js'
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing required file: ${file}`);
}

JSON.parse(fs.readFileSync(path.join(root, 'dist-mobile-nlu/manifest.webmanifest'), 'utf8'));
JSON.parse(fs.readFileSync(path.join(root, 'docs/Observability_Event_Contract.json'), 'utf8'));

const check = spawnSync(process.execPath, ['--check', path.join(root, 'dist-mobile-nlu/sw.js')], { encoding: 'utf8' });
if (check.status !== 0) throw new Error(check.stderr || 'Service worker syntax check failed.');

console.log(`Validated ${required.length} required project files.`);
