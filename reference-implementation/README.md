# Reference Orchestration Core

This small, dependency-free JavaScript module makes the course routing policy executable for local learning and test purposes. It is **not** a production service and it does not connect to Dialogflow CX, Amazon Lex V2, identity systems, retrieval systems, or domain backends.

## What it demonstrates

- Authentication before protected transactions.
- Required-field clarification without exposing protected data.
- Backend validation, confirmation, and idempotency before irreversible actions.
- Grounded knowledge only when approved evidence and provenance are available.
- High-risk, repeated-repair, and user-requested handoff.
- Thin illustrative CX/Lex edge mappings.

## Run the tests

```powershell
node reference-implementation/orchestrator.test.js
```

## Integrate safely

1. Replace illustrative adapters with the official provider SDK or webhook contract for your chosen platform.
2. Pass tokenised/approved identifiers; do not make raw customer text or secrets a default log field.
3. Make the domain service—not this module—the source of truth for authorisation, eligibility, and execution.
4. Add provider integration tests, signed request validation, rate limiting, timeout/retry behaviour, observability, and your organisation’s security/privacy controls.

