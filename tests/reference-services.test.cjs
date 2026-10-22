'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { createMockServices } = require('../reference-implementation/mock-services');
const { createEvent } = require('../reference-implementation/events');
const { ROUTE, routeTurn } = require('../reference-implementation/orchestrator');

test('mock domain service enforces ownership and idempotency', () => {
  const services = createMockServices();
  assert.equal(services.getOrder({ orderReference: '7412', customerId: 'customer-2' }).found, false);
  const first = services.executeRefund({ orderReference: '7412', customerId: 'customer-1', confirmed: true, idempotencyKey: 'abc' });
  const replay = services.executeRefund({ orderReference: '7412', customerId: 'customer-1', confirmed: true, idempotencyKey: 'abc' });
  assert.equal(first.ok, true);
  assert.equal(replay.replay, true);
  assert.deepEqual(replay.receipt, first.receipt);
});

test('approved retrieval returns provenance only', () => {
  const services = createMockServices();
  const results = services.retrieveApproved({ query: 'refund policy' });
  assert.equal(results[0].sourceId, 'policy-v4');
  assert.equal(Object.hasOwn(results[0], 'approved'), false);
});

test('event factory excludes raw content and emits the contract version', () => {
  const event = createEvent({ eventName: 'turn_routed', occurredAt: new Date().toISOString(), turnId: 't-1', sessionId: 's-1', channel: 'mobile_web', route: ROUTE.CLARIFY, outcome: 'presented', rawText: 'do not store me' });
  assert.equal(event.eventVersion, '1.0');
  assert.equal(Object.hasOwn(event, 'rawText'), false);
});
