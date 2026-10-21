'use strict';

/**
 * Dependency-free reference policy engine for a conversational turn.
 * It intentionally returns a decision plan; adapters own CX/Lex response syntax
 * and domain services remain the source of truth for protected actions.
 */

const ROUTE = Object.freeze({
  AUTHENTICATE_THEN_RESUME: 'AUTHENTICATE_THEN_RESUME',
  CLARIFY: 'CLARIFY',
  DETERMINISTIC_TASK: 'DETERMINISTIC_TASK',
  GROUNDED_KNOWLEDGE: 'GROUNDED_KNOWLEDGE',
  HUMAN_HANDOFF: 'HUMAN_HANDOFF'
});

const ACTIONS = new Set(['cancel_order', 'refund_order', 'change_address', 'replace_card']);
const HIGH_RISK = new Set(['payment_dispute', 'regulated', 'self_harm', 'threat', 'fraud', 'policy_exception']);

function hasRisk(signals = []) {
  return signals.some((signal) => HIGH_RISK.has(signal));
}

function routeTurn(turn) {
  const input = turn || {};
  const intent = input.candidateIntent || 'unknown';
  const fields = input.collectedFields || {};
  const retrieval = input.retrieval || {};
  const riskSignals = input.riskSignals || [];
  const authenticated = input.authenticationState === 'authenticated';
  const repairCount = Number.isInteger(input.repairCount) ? input.repairCount : 0;
  const transactional = ACTIONS.has(intent) || input.requestKind === 'transactional';
  const requiredFields = input.requiredFields || (transactional ? ['orderReference'] : []);
  const missingFields = requiredFields.filter((field) => !fields[field]);

  if (hasRisk(riskSignals) || repairCount >= 2 || input.userRequestedHuman) {
    const reason = input.userRequestedHuman ? 'The customer requested human support.' : repairCount >= 2 ? 'Two or more repair attempts have failed.' : 'A high-risk signal requires a specialist process.';
    return plan(ROUTE.HUMAN_HANDOFF, reason, 'Transfer only approved context to the configured support destination.', { preserveContext: true });
  }

  if (transactional && !authenticated) {
    return plan(ROUTE.AUTHENTICATE_THEN_RESUME, 'This request may expose or change protected account data.', 'Explain the sign-in requirement, authenticate, then revalidate the request.', { resumeIntent: intent, actionAllowed: false });
  }

  if (transactional && missingFields.length) {
    return plan(ROUTE.CLARIFY, `Required data is missing: ${missingFields.join(', ')}.`, 'Ask one bounded question for the missing field; do not expose unauthorised choices.', { missingFields, actionAllowed: false });
  }

  if (transactional && authenticated) {
    return plan(ROUTE.DETERMINISTIC_TASK, 'The authenticated request has the required fields for backend validation.', 'Call the domain service, validate eligibility, and request explicit confirmation before an irreversible action.', { actionAllowed: false, requiresBackendValidation: true, requiresConfirmation: true });
  }

  if (input.requestKind === 'knowledge' && retrieval.approved && retrieval.evidenceSufficient && Array.isArray(retrieval.sourceIds) && retrieval.sourceIds.length) {
    return plan(ROUTE.GROUNDED_KNOWLEDGE, 'Approved retrieval evidence supports this informational answer.', 'Return a concise answer restricted to the evidence and preserve source provenance.', { sourceIds: retrieval.sourceIds, actionAllowed: false });
  }

  return plan(ROUTE.CLARIFY, 'The request is not yet safe to execute or sufficiently supported by approved evidence.', 'Offer a short, bounded choice or route to human support.', { actionAllowed: false });
}

function authoriseAction(request) {
  const input = request || {};
  if (!ACTIONS.has(input.action)) return deny('Unsupported action.');
  if (input.authenticationState !== 'authenticated') return deny('Authentication is required.');
  if (!input.authorised) return deny('Server-side authorisation has not been confirmed.');
  if (!input.backendEligible) return deny('The domain system did not confirm eligibility.');
  if (!input.confirmed) return deny('Explicit customer confirmation is required.');
  if (!input.idempotencyKey) return deny('An idempotency key is required for an irreversible action.');
  return { allowed: true, reason: 'Authorised for domain execution only; execute through the trusted backend.', idempotencyKey: input.idempotencyKey };
}

function plan(route, reason, nextStep, controls) {
  return { route, reason, nextStep, controls: { actionAllowed: false, ...controls } };
}

function deny(reason) {
  return { allowed: false, reason };
}

module.exports = { ROUTE, routeTurn, authoriseAction };
