# Production Readiness Checklist

Use this at design review, pre-pilot, and before broad release. A checked item needs an owner and evidence—not only an intention.

## Product & conversation

- [ ] Each supported journey has a user outcome, completion receipt, failure path, and accountable product owner.
- [ ] The conversation supports correction, interruption, no input, no match, cancellation, and restart.
- [ ] Prompts are short enough for a mobile screen and have been reviewed with assistive technology in the target experience.
- [ ] Supported languages, locales, voice/text channel assumptions, and accessibility requirements are explicit.

## Identity, privacy & security

- [ ] Authentication and server-side authorisation protect account data and actions.
- [ ] Sensitive fields are minimised, masked in logs where needed, and covered by approved retention/access controls.
- [ ] Webhooks/hooks validate signatures or approved identity mechanisms, enforce timeouts, and have least-privilege credentials.
- [ ] Irreversible actions require an explicit confirmation and idempotency protection.
- [ ] Threat modelling covers prompt injection or source manipulation in retrieval, account takeover, data leakage, abuse, and dependency failure.

## Retrieval & model behaviour

- [ ] Retrieval uses approved sources with ownership, update cadence, access constraints, and content-quality review.
- [ ] The answer path preserves source IDs/provenance for audit and debugging where policy allows.
- [ ] The system abstains or hands off when evidence is insufficient, conflicting, stale, or outside scope.
- [ ] Generated content cannot directly execute tools or transactions without deterministic validation.

## Quality & evaluation

- [ ] A versioned evaluation set covers the expected journeys, paraphrases, incomplete data, ambiguity, adversarial inputs, locales, and outage paths.
- [ ] Release gates are set for task completion, correct routing, unsafe-answer rate, escalation correctness, p95 latency, and accessibility defects.
- [ ] Evaluation results are segmented by journey/channel/locale and reviewed by product, engineering, and support.
- [ ] Regression tests run for every change to training data, prompts, retrieval corpus, routing policy, or backend integration.

## Operations & governance

- [ ] Events have a privacy-reviewed schema and dashboards include completion, repair count, latency, dependency error, route, and escalation reason.
- [ ] Alerts, runbooks, rollback/kill-switch procedure, and an on-call owner exist for critical failures.
- [ ] Handoff has a clear destination, working hours/expectation, and approved context-transfer policy.
- [ ] Vendor/region constraints, quotas, cost budgets, and dependency ownership have been confirmed.
- [ ] Legal, security, privacy, accessibility, and domain approvals are captured before launch.

## Post-launch cadence

Week 1: daily triage of failures and unsafe outcomes. Week 2–4: weekly evaluation review and source-quality audit. Monthly: retrain/reconfigure only from reviewed evidence; revisit threat model and release gates after material product or model changes.

