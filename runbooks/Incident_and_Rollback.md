# Incident & Rollback Runbook

## Trigger conditions

Activate this runbook for: suspected privacy/security exposure, unsafe action execution, broken authentication/authorisation, retrieval source compromise, failed handoff, critical accessibility blocker, sustained latency/dependency failure, or material release-gate miss.

## First 15 minutes

1. Assign incident commander and record timestamp, scope, and customer impact.
2. Enable the narrowest safe control: disable transactional route, disable retrieval route, or divert to human support. Preserve authenticated self-service only if it is known safe.
3. Stop rollout/experiments and retain privacy-approved diagnostic evidence.
4. Notify security, privacy, product, support, and on-call owners according to your escalation policy.
5. Publish an approved user-facing status/recovery message; do not speculate.

## Containment decision tree

| Failure | Immediate safe mode | Evidence to preserve |
| --- | --- | --- |
| Unsafe transaction | Disable affected action; force human review | Opaque turn IDs, action logs, authorisation result, deployment version |
| Identity fault | Block protected reads/actions; require re-authentication | Auth state/result, provider status, affected route/version |
| Retrieval compromise | Disable retrieval source/route; answer only deterministic help or hand off | Source IDs, retrieval configuration/version, route events |
| Handoff outage | Present supported non-conversational contact route | Queue status, event timestamps, user-visible message version |
| Dependency latency | Apply timeouts; show recovery and avoid false completion | Dependency name, p95/p99 latency, error category |

## Recovery and follow-up

- Re-enable only after the failing scenario has a regression test and the relevant owner signs off.
- Record root cause, customer impact, mitigations, owner, due date, and any data-notification obligation.
- Update the evaluation set, route policy, content workflow, and roadmap only from reviewed evidence.
- Run a rollback/kill-switch exercise at least quarterly or before material architecture change.

