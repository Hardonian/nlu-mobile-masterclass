'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'dist-mobile-nlu/index.html'), 'utf8');

test('release has a document title, description, and mobile viewport', () => {
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /name="description"/);
  assert.match(html, /name="viewport"/);
  assert.match(html, /Content-Security-Policy/);
});

test('release exposes eight unique lesson sections', () => {
  const ids = [...html.matchAll(/<section id="([^"]+)" class="section lesson-track"/g)].map((m) => m[1]);
  assert.equal(ids.length, 8);
  assert.equal(new Set(ids).size, ids.length);
});

test('interactive controls have labels or accessible names', () => {
  for (const id of ['platform', 'utterance', 'confidence', 'authenticated', 'evidence', 'risk', 'retries', 'simulate', 'resetProgress', 'completeCourse', 'downloadBrief']) {
    assert.match(html, new RegExp(`(?:id="${id}"|for="${id}"|aria-label="[^"]+")`), `missing accessible reference for ${id}`);
  }
});

test('manifest is installable in principle', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'dist-mobile-nlu/manifest.webmanifest'), 'utf8'));
  assert.ok(manifest.name);
  assert.ok(manifest.start_url);
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.icons.length, 2);
});

test('offline shell includes the declared icons', () => {
  const sw = fs.readFileSync(path.join(root, 'dist-mobile-nlu/sw.js'), 'utf8');
  assert.match(sw, /icon-192\.svg/);
  assert.match(sw, /icon-512\.svg/);
});
