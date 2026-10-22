'use strict';

/** Safe local-only services for demos and tests. They never call a real provider. */
function createMockServices() {
  const orders = new Map([
    ['7412', { orderReference: '7412', owner: 'customer-1', status: 'delivered', refundEligible: true, refundAmount: 49.99 }],
    ['8413', { orderReference: '8413', owner: 'customer-2', status: 'processing', refundEligible: false, refundAmount: 0 }]
  ]);
  const executed = new Map();
  const sources = new Map([
    ['policy-v4', { sourceId: 'policy-v4', title: 'Return policy', text: 'Eligible items may be returned within 30 days.', approved: true }]
  ]);

  return {
    getOrder({ orderReference, customerId }) {
      const order = orders.get(String(orderReference));
      if (!order || order.owner !== customerId) return { found: false };
      return { found: true, order: { ...order } };
    },
    checkRefundEligibility({ orderReference, customerId }) {
      const result = this.getOrder({ orderReference, customerId });
      if (!result.found) return { eligible: false, reason: 'Order not found for authenticated customer.' };
      return result.order.refundEligible ? { eligible: true, amount: result.order.refundAmount } : { eligible: false, reason: 'Order is not eligible.' };
    },
    executeRefund({ orderReference, customerId, confirmed, idempotencyKey }) {
      if (!confirmed) return { ok: false, code: 'CONFIRMATION_REQUIRED' };
      if (!idempotencyKey) return { ok: false, code: 'IDEMPOTENCY_REQUIRED' };
      if (executed.has(idempotencyKey)) return { ok: true, replay: true, receipt: executed.get(idempotencyKey) };
      const eligibility = this.checkRefundEligibility({ orderReference, customerId });
      if (!eligibility.eligible) return { ok: false, code: 'NOT_ELIGIBLE', reason: eligibility.reason };
      const receipt = { receiptId: `refund-${idempotencyKey}`, orderReference: String(orderReference), amount: eligibility.amount };
      executed.set(idempotencyKey, receipt);
      return { ok: true, replay: false, receipt };
    },
    retrieveApproved({ query }) {
      const normalized = String(query || '').toLowerCase();
      return [...sources.values()].filter((source) => source.approved && (normalized.includes('refund') || normalized.includes('return'))).map((source) => ({ sourceId: source.sourceId, title: source.title, text: source.text }));
    }
  };
}

module.exports = { createMockServices };
