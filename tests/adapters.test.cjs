'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { routeTurn } = require('../reference-implementation/orchestrator');
const { toDialogflowCx, toAmazonLexV2, validateRoutePlan } = require('../reference-implementation/adapters');

test('adapter payloads preserve policy metadata and provenance', () => {
  const plan = routeTurn({ requestKind: 'knowledge', retrieval: { approved: true, evidenceSufficient: true, sourceIds: ['policy-v4'] } });
  const cx = toDialogflowCx(plan);
  const lex = toAmazonLexV2(plan);
  assert.equal(cx.contractVersion, '1.0');
  assert.deepEqual(cx.sessionParameters.sourceIds, ['policy-v4']);
  assert.deepEqual(JSON.parse(lex.sessionState.sessionAttributes.sourceIds), ['policy-v4']);
});

test('adapters reject incomplete plans', () => {
  assert.throws(() => validateRoutePlan(null), /complete route plan/);
});
