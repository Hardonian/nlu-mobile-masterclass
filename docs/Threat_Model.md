# Threat Model

## Assets

- Learner progress and assessment results.
- Course content and vendor guidance.
- Reference policy logic and evaluation cases.
- Any future organization-specific policy configuration.

## Threats and controls

| Threat | Control | Evidence still required |
| --- | --- | --- |
| Content tampering | Protected branch, review, checksums, deployment rollback | Hosting configuration and drill |
| Malicious course input | Output encoding, bounded downloads, no server execution | Browser security testing |
| Progress privacy leak | Local-only default, consented analytics, retention policy | Privacy review |
| Retrieval/source manipulation | Approved source owners, provenance, abstention, regression set | Real retrieval implementation |
| Unsafe transaction execution | Server authorization, confirmation, idempotency, trusted backend | Domain integration tests |
| Dependency compromise | Lockfile, audit, secret scanning, minimal runtime dependencies | CI and supplier review |

## Open decisions

- Whether hosted learner accounts are required.
- Which analytics provider, if any, is approved.
- Whether organization-specific content requires tenant isolation.
