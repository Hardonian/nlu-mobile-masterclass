'use strict';

const EVENT_NAMES = new Set(['turn_routed', 'task_completed', 'task_failed', 'handoff_offered', 'dependency_failed']);
const ROUTES = new Set(['DETERMINISTIC_TASK', 'GROUNDED_KNOWLEDGE', 'AUTHENTICATE_THEN_RESUME', 'CLARIFY', 'HUMAN_HANDOFF']);

function createEvent(input) {
  const event = { ...input };
  if (!EVENT_NAMES.has(event.eventName)) throw new Error('Unsupported event name.');
  if (!ROUTES.has(event.route)) throw new Error('Unsupported route.');
  if (!event.turnId || !event.sessionId || !event.occurredAt || !event.channel || !event.outcome) throw new Error('Event is missing required correlation or outcome fields.');
  return {
    eventVersion: '1.0',
    eventName: event.eventName,
    occurredAt: event.occurredAt,
    turnId: event.turnId,
    sessionId: event.sessionId,
    channel: event.channel,
    ...(event.locale ? { locale: event.locale } : {}),
    ...(event.journey ? { journey: event.journey } : {}),
    route: event.route,
    ...(event.confidenceBand ? { confidenceBand: event.confidenceBand } : {}),
    ...(event.authenticationState ? { authenticationState: event.authenticationState } : {}),
    ...(Number.isInteger(event.repairCount) ? { repairCount: event.repairCount } : {}),
    ...(Number.isInteger(event.latencyMs) ? { latencyMs: event.latencyMs } : {}),
    ...(event.dependency ? { dependency: event.dependency } : {}),
    ...(Array.isArray(event.retrievalSourceIds) ? { retrievalSourceIds: event.retrievalSourceIds } : {}),
    ...(event.escalationReason ? { escalationReason: event.escalationReason } : {}),
    outcome: event.outcome
  };
}

module.exports = { createEvent };
