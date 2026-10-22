'use strict';

const { routeTurn, authoriseAction } = require('./orchestrator');
const { createMockServices } = require('./mock-services');

const services = createMockServices();
const turn = routeTurn({ candidateIntent: 'refund_order', requestKind: 'transactional', authenticationState: 'authenticated', collectedFields: { orderReference: '7412' } });
const eligibility = services.checkRefundEligibility({ orderReference: '7412', customerId: 'customer-1' });
const authorization = authoriseAction({ action: 'refund_order', authenticationState: 'authenticated', authorised: true, backendEligible: eligibility.eligible, confirmed: true, idempotencyKey: 'demo-7412' });
const execution = authorization.allowed ? services.executeRefund({ orderReference: '7412', customerId: 'customer-1', confirmed: true, idempotencyKey: authorization.idempotencyKey }) : { ok: false, code: 'BLOCKED_BY_POLICY' };
console.log(JSON.stringify({ turn, eligibility, authorization, execution }, null, 2));
