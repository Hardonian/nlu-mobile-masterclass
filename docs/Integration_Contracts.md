# Integration Contracts

## Channel adapter

Adapters receive a versioned normalized turn and return a route plan. They must not authorize transactions, store durable customer truth, or bypass the orchestration policy.

## Domain service

The domain service owns identity, authorization, eligibility, execution, receipts, and idempotency. The reference mock service demonstrates this boundary without connecting to a real system.

## Retrieval service

Retrieval responses must include approved source IDs and evidence sufficiency. Source text is not an authorization signal. Conflicting, stale, or insufficient evidence must abstain or hand off.

## Handoff service

Required fields: opaque session/turn IDs, approved journey name, escalation reason, safe context summary, destination queue, service expectation, and fallback contact path. Never send raw sensitive fields by default.
