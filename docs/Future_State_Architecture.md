# Future-State Architecture Blueprint

## Design target

Build a channel-neutral conversation layer that can use Dialogflow CX or Amazon Lex V2 for deterministic dialogue while keeping policy, identity, orchestration, retrieval, and observability independently governed. The platform is an interaction adapter, not the policy engine or source of truth.

```text
Mobile / web / voice channel
          │
          ▼
Conversation platform (CX flow/page/routes OR Lex intent/slots/hooks)
          │ normalized turn contract
          ▼
Conversation orchestration service
 ┌────────┼───────────┬─────────────┬─────────────┐
 ▼        ▼           ▼             ▼             ▼
Identity  Policy      Workflow      Approved      Handoff
& auth    decision    / domain API  retrieval     / CRM queue
          │           │             │
          └───────────┴──────┬──────┘
                              ▼
                    Event & evaluation pipeline
```

## Responsibility boundaries

| Component | Owns | Must not own |
| --- | --- | --- |
| CX / Lex | Turn capture, state prompts, NLU/slot signals, channel-native repair | Final authorisation, durable customer truth, unbounded policy generation |
| Orchestration service | Route policy, normalised turn contract, dependency timeouts, response composition | Direct access to more data than the active journey needs |
| Identity & policy | Authentication, authorisation, entitlement, consent | Training phrase or retrieval-source management |
| Domain services | Order/payment/account truth, idempotent transactional execution | Conversation-specific prompt text |
| Retrieval service | Approved-source search, source metadata, access filtering | Transaction authorisation or action selection |
| Observability pipeline | Privacy-reviewed events, evaluation and alerting | Storing raw sensitive content by default |

## Normalised turn contract

Pass a small, versioned contract between the platform adapter and the orchestration service. Example fields:

```json
{
  "contractVersion": "1.0",
  "turnId": "uuid",
  "sessionId": "opaque-session-id",
  "channel": "mobile_web",
  "locale": "en-CA",
  "candidateIntent": "refund_request",
  "confidenceBand": "medium",
  "collectedFields": {"orderReference": "redacted-or-tokenised"},
  "authenticationState": "authenticated",
  "repairCount": 0,
  "requestRisk": ["transactional"]
}
```

Keep raw user text out of downstream analytics by default. Add it only under an approved, bounded diagnostic policy.

## Delivery sequence

1. Pilot one bounded, high-volume, low-risk journey with a human fallback.
2. Establish a baseline with an evaluation set and production event schema before expanding scope.
3. Add approved retrieval for information-only questions; require provenance and abstention.
4. Introduce transactional workflows only after identity, policy, confirmation, and idempotency controls are independently tested.
5. Scale across channels using the normalised contract and platform-specific adapters.

## Future-state capabilities to plan, not assume

- Retrieval freshness and source-owner workflows.
- Per-user consent, data residency, regional platform availability, and vendor change management.
- Agent-assist vs customer-facing automation separation.
- Human handoff context policy, queue integration, and service-level expectations.
- Experiment governance: feature flags, shadow evaluation, rollback, and auditability.

