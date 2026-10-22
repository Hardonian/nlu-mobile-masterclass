'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const course = JSON.parse(fs.readFileSync(path.join(root, 'src/content/course.json'), 'utf8'));
if (!Array.isArray(course.lessons) || course.lessonCount !== course.lessons.length) throw new Error('Course content lesson count is inconsistent.');
const csv = fs.readFileSync(path.join(root, 'docs/Evaluation_Dataset_Template.csv'), 'utf8').trim();
const lines = csv.split(/\r?\n/);
if (lines.length < 2) throw new Error('Evaluation dataset must contain a header and at least one case.');
const header = lines[0].split(',');
for (const field of ['id', 'input', 'expected_route', 'action_allowed']) {
  if (!header.includes(field)) throw new Error(`Evaluation dataset is missing required column: ${field}`);
}

const html = fs.readFileSync(path.join(root, 'dist-mobile-nlu/index.html'), 'utf8');
const lessonIds = [...html.matchAll(/<section id="([^"]+)" class="section lesson-track"/g)].map((m) => m[1]);
if (lessonIds.length !== 8) throw new Error(`Expected 8 lesson sections, found ${lessonIds.length}.`);
if (new Set(lessonIds).size !== lessonIds.length) throw new Error('Lesson section IDs must be unique.');
if (JSON.stringify(lessonIds) !== JSON.stringify(course.lessons.map((lesson) => lesson.id))) throw new Error('Source lesson IDs do not match the distribution.');

console.log(`Validated ${lines.length - 1} evaluation cases and ${lessonIds.length} lessons.`);
