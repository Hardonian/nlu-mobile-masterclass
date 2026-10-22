# Release Management

## Release types

- Content-only: evaluation and link checks required.
- Policy/reference implementation: unit, contract, security, and regression checks required.
- PWA/runtime: full verification, mobile/accessibility review, and rollback target required.
- External integration: environment, owner, privacy/security approval, and operational drill required.

## Required release record

- Version and build ID
- Change summary and risk level
- Evaluation result
- Accessibility result
- Approvers and review date
- Rollback target
- Known exceptions and expiry date

## Stop conditions

Stop rollout for unsafe routing, broken authentication boundaries, false completion, inaccessible required actions, corrupted offline state, or materially stale content.
