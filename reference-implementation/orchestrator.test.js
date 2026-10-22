'use strict';

const assert = require('node:assert/strict');
const { CONTRACT_VERSION, POLICY_VERSION, ROUTE, routeTurn, authoriseAction, validateTurn } = require('./orchestrator');
const { toDialogflowCx, toAmazonLexV2 } = require('./adapters');

function test(name, fn) {
  try { fn(); console.log(`✓ ${name}`); } catch (error) { console.error(`✗ ${name}`); throw error; }
}

test('requires authentication before a protected order cancellation', () => {
  const decision = routeTurn({ candidateIntent: 'cancel_order', authenticationState: 'unauthenticated', collectedFields: { orderReference: 'tokenised' } });
  assert.equal(decision.route, ROUTE.AUTHENTICATE_THEN_RESUME);
  assert.equal(decision.controls.actionAllowed, false);
});

test('clarifies missing transactional data after authentication', () => {
  const decision = routeTurn({ candidateIntent: 'refund_order', authenticationState: 'authenticated' });
  assert.equal(decision.route, ROUTE.CLARIFY);
  assert.deepEqual(decision.controls.missingFields, ['orderReference']);
});

test('uses deterministic path only with authenticated required data', () => {
  const decision = routeTurn({ candidateIntent: 'refund_order', authenticationState: 'authenticated', collectedFields: { orderReference: 'tokenised' } });
  assert.equal(decision.route, ROUTE.DETERMINISTIC_TASK);
  assert.equal(decision.controls.requiresConfirmation, true);
});

test('uses grounded knowledge only with approved evidence and provenance', () => {
  const decision = routeTurn({ requestKind: 'knowledge', retrieval: { approved: true, evidenceSufficient: true, sourceIds: ['policy-v4'] } });
  assert.equal(decision.route, ROUTE.GROUNDED_KNOWLEDGE);
});

test('does not use knowledge route without approved evidence', () => {
  const decision = routeTurn({ requestKind: 'knowledge', retrieval: { approved: false, evidenceSufficient: true, sourceIds: ['unreviewed'] } });
  assert.equal(decision.route, ROUTE.CLARIFY);
});

test('hands off high-risk and repeated repair requests', () => {
  assert.equal(routeTurn({ riskSignals: ['payment_dispute'] }).route, ROUTE.HUMAN_HANDOFF);
  assert.equal(routeTurn({ repairCount: 2 }).route, ROUTE.HUMAN_HANDOFF);
});

test('blocks irreversible action until all independent controls pass', () => {
  assert.equal(authoriseAction({ action: 'refund_order', authenticationState: 'authenticated', authorised: true, backendEligible: true, confirmed: true }).allowed, false);
  assert.equal(authoriseAction({ action: 'refund_order', authenticationState: 'authenticated', authorised: true, backendEligible: true, confirmed: true, idempotencyKey: 'opaque-key' }).allowed, true);
});

test('maps route plans into platform edge payloads', () => {
  const plan = routeTurn({ requestKind: 'knowledge', retrieval: { approved: true, evidenceSufficient: true, sourceIds: ['policy-v4'] } });
  assert.equal(toDialogflowCx(plan).route, ROUTE.GROUNDED_KNOWLEDGE);
  assert.equal(toAmazonLexV2(plan).sessionState.sessionAttributes.actionAllowed, 'false');
});

test('rejects malformed contract values safely', () => {
  const validation = validateTurn({ contractVersion: '9.0', candidateIntent: 42, riskSignals: ['fraud', 7] });
  assert.equal(validation.valid, false);
  const decision = routeTurn({ contractVersion: '9.0', candidateIntent: 42 });
  assert.equal(decision.route, ROUTE.CLARIFY);
  assert.ok(decision.controls.validationErrors.length > 0);
});

test('emits contract and policy versions for auditability', () => {
  const decision = routeTurn({ requestKind: 'knowledge', retrieval: { approved: true, evidenceSufficient: true, sourceIds: ['policy-v4'] } });
  assert.equal(decision.contractVersion, CONTRACT_VERSION);
  assert.equal(decision.policyVersion, POLICY_VERSION);
});

test('does not accept whitespace-only idempotency keys', () => {
  const decision = authoriseAction({ action: 'refund_order', authenticationState: 'authenticated', authorised: true, backendEligible: true, confirmed: true, idempotencyKey: ' ' });
  assert.equal(decision.allowed, false);
});
