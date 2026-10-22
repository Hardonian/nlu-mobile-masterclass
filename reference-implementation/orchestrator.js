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
const CONTRACT_VERSION = '1.0';
const POLICY_VERSION = '0.1.0';

function normalizeTurn(turn) {
  const input = turn && typeof turn === 'object' && !Array.isArray(turn) ? turn : {};
  const collectedFields = input.collectedFields && typeof input.collectedFields === 'object' && !Array.isArray(input.collectedFields) ? input.collectedFields : {};
  const retrieval = input.retrieval && typeof input.retrieval === 'object' && !Array.isArray(input.retrieval) ? input.retrieval : {};
  const riskSignals = Array.isArray(input.riskSignals) ? input.riskSignals : Array.isArray(input.requestRisk) ? input.requestRisk : [];
  return {
    ...input,
    contractVersion: input.contractVersion || CONTRACT_VERSION,
    collectedFields,
    retrieval,
    riskSignals,
    repairCount: Number.isInteger(input.repairCount) && input.repairCount >= 0 ? input.repairCount : 0,
    authenticationState: ['authenticated', 'unauthenticated', 'expired', 'unknown'].includes(input.authenticationState) ? input.authenticationState : 'unknown'
  };
}

function validateTurn(turn) {
  const input = normalizeTurn(turn);
  const errors = [];
  if (input.contractVersion !== CONTRACT_VERSION) errors.push(`Unsupported contract version: ${input.contractVersion}`);
  if (typeof input.candidateIntent !== 'undefined' && typeof input.candidateIntent !== 'string') errors.push('candidateIntent must be a string.');
  if (typeof input.requestKind !== 'undefined' && !['knowledge', 'transactional'].includes(input.requestKind)) errors.push('requestKind must be knowledge or transactional.');
  if (typeof input.collectedFields !== 'object' || Array.isArray(input.collectedFields)) errors.push('collectedFields must be an object.');
  if (typeof input.retrieval !== 'object' || Array.isArray(input.retrieval)) errors.push('retrieval must be an object.');
  if (!Array.isArray(input.riskSignals) || input.riskSignals.some((signal) => typeof signal !== 'string')) errors.push('riskSignals must be an array of strings.');
  return { valid: errors.length === 0, errors, normalized: input };
}

function hasRisk(signals = []) {
  return signals.some((signal) => HIGH_RISK.has(signal));
}

function routeTurn(turn) {
  const validation = validateTurn(turn);
  const input = validation.normalized;
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

  return plan(ROUTE.CLARIFY, validation.valid ? 'The request is not yet safe to execute or sufficiently supported by approved evidence.' : 'The request contract is invalid and cannot be safely executed.', validation.valid ? 'Offer a short, bounded choice or route to human support.' : 'Ask the caller to restart or route to human support.', { actionAllowed: false, validationErrors: validation.errors });
}

function authoriseAction(request) {
  const input = request || {};
  if (!ACTIONS.has(input.action)) return deny('Unsupported action.');
  if (input.authenticationState !== 'authenticated') return deny('Authentication is required.');
  if (!input.authorised) return deny('Server-side authorisation has not been confirmed.');
  if (!input.backendEligible) return deny('The domain system did not confirm eligibility.');
  if (!input.confirmed) return deny('Explicit customer confirmation is required.');
  if (typeof input.idempotencyKey !== 'string' || !input.idempotencyKey.trim()) return deny('An idempotency key is required for an irreversible action.');
  return { allowed: true, policyVersion: POLICY_VERSION, reason: 'Authorised for domain execution only; execute through the trusted backend.', idempotencyKey: input.idempotencyKey };
}

function plan(route, reason, nextStep, controls) {
  return { contractVersion: CONTRACT_VERSION, policyVersion: POLICY_VERSION, route, reason, nextStep, controls: { actionAllowed: false, ...controls } };
}

function deny(reason) {
  return { allowed: false, reason };
}

module.exports = { CONTRACT_VERSION, POLICY_VERSION, ROUTE, normalizeTurn, validateTurn, routeTurn, authoriseAction };
