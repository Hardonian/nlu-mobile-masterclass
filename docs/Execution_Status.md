# Productization Execution Status

This document tracks what can be completed inside the repository and what requires external authority.

## Completed in repository

- Canonical project repository has reproducible Node scripts for validation, tests, content checks, link checks, and static release verification.
- Static release smoke tests cover required metadata, lesson count, accessible control references, and manifest basics.
- Evaluation data and course lesson structure are validated in CI-compatible scripts.
- Course metadata and lesson IDs now have a versioned source file under `src/content/` and are checked against the release distribution.
- Build output receives a deterministic SHA-256 manifest for release traceability.
- CI now includes an obvious-secret scan and a GitHub Pages deployment definition.
- Added local-only mock domain/retrieval services, event factory, assessment source, organization configuration schema, browser test plan, and governance cadence.
- Added integration contracts, release management, accessibility report template, locale readiness, role tracks, assessment export, support operations, and procurement/security packet outlines.
- Remaining non-repository work is enumerated in `docs/Remaining_External_Gates.md`.
- The full verification command now includes `npm audit`; current audit result is zero high-severity vulnerabilities and the automated suite passes 11 tests.

## Evidence-gated work

The following cannot be honestly completed by source changes alone: named product/security/privacy owners, legal approval, cloud accounts, production backend integrations, real retrieval indexes, CRM handoff, customer beta traffic, cost approval, accessibility research with representative users, enterprise tenancy, and commercial pricing.

Each must be recorded in `release/External_Evidence_Register.md` with an owner, evidence link, review date, and expiry/exception handling.

## Immediate release gates

1. Run `npm run verify` on Node 20 or newer.
2. Serve `dist-mobile-nlu/` over HTTP and complete the accessibility/mobile QA matrix.
3. Add browser automation before claiming UI regression coverage.
4. Add deployment secrets and hosting configuration only in the target environment, never in this repository.
