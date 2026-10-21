# Top 50 Roadmap — Conversational NLU for Mobile

## How to use this roadmap

This is a sequencing plan, not a promise to build every item. Priority 1 is the next most valuable item after the current course release; do not start lower-priority work if a higher-priority release gate is unresolved. “Done” means evidence exists, not merely that code has been written.

| Priority | Horizon | Item | Primary owner | Proof of done / release gate | Depends on |
| ---: | --- | --- | --- | --- | --- |
| 1 | Now | Select one bounded pilot journey and accountable product owner | Product | Journey charter names user, outcome, non-goals, owner, and handoff destination | — |
| 2 | Now | Define the transaction and data boundary | Product + Domain | State/data map identifies source of truth, permitted actions, and prohibited actions | 1 |
| 3 | Now | Complete privacy, security, and threat-model review | Security + Privacy | Approved risks, data classification, retention, and mitigations are recorded | 2 |
| 4 | Now | Define authentication and authorisation policy | Identity + Domain | Protected data/actions are server-side gated and negative cases are tested | 2, 3 |
| 5 | Now | Establish success, safety, latency, and accessibility release gates | Product + Analytics | Measurable thresholds and accountable reviewers are agreed | 1 |
| 6 | Now | Implement the normalised turn contract | Platform Eng | Versioned adapter contract exists for channel, state, auth, risk, and outcome | 2, 4 |
| 7 | Now | Build the deterministic happy path | Conversation Design + Eng | User can complete the bounded task against a non-production/safe backend | 2, 4, 6 |
| 8 | Now | Add server-side validation and idempotency | Domain Eng | Invalid, duplicate, and replayed actions fail safely | 7 |
| 9 | Now | Add explicit confirmation before irreversible actions | Conversation Design | Confirmation copy and backend confirmation token are tested | 7, 8 |
| 10 | Now | Design recovery, cancel, restart, timeout, and no-match paths | Conversation Design | Every state has a safe exit and plain-language repair copy | 7 |
| 11 | Now | Stand up approved human handoff | Support Ops + Eng | Destination queue, hours, context policy, and fallback message work end to end | 3, 10 |
| 12 | Now | Create the first versioned evaluation set | QA + Conversation Design | At least 30 labelled cases cover happy, ambiguous, noisy, unsafe, and outage paths | 5, 7, 10 |
| 13 | Now | Instrument privacy-reviewed events and dashboard | Analytics + Eng | Route, outcome, latency, repair, dependency error, and escalation are observable | 3, 5, 6 |
| 14 | Now | Run mobile and accessibility QA | QA + Accessibility | Keyboard, screen-reader, zoom/reflow, slow-network, and interrupt tests pass | 7, 10 |
| 15 | Now | Create incident, rollback, and kill-switch runbooks | SRE + Product | Named on-call, alert thresholds, fail-safe mode, and rollback drill exist | 8, 11, 13 |
| 16 | Pilot | Pilot internally with synthetic accounts | Product + Support | Staff complete scripted journeys; failures are triaged and fixed | 7–15 |
| 17 | Pilot | Run shadow evaluation on representative traffic where permitted | Analytics + Privacy | Route and outcome comparison is reviewed without exposing unnecessary content | 3, 12, 13 |
| 18 | Pilot | Launch a tightly scoped customer beta | Product + Support | Entry criteria, opt-out, handoff, and daily review cadence are operating | 16, 17 |
| 19 | Pilot | Establish content/source ownership for policy answers | Content Ops + Legal | Each retrieval source has owner, review cadence, access rule, and expiry handling | 3 |
| 20 | Pilot | Add approved grounded retrieval for information-only questions | Retrieval Eng + Content Ops | Answers include evidence policy; weak/conflicting evidence abstains or hands off | 19, 12, 13 |
| 21 | Pilot | Add retrieval-injection and stale-content tests | Security + Retrieval Eng | Adversarial and stale-source cases are in the regression suite | 20 |
| 22 | Pilot | Calibrate route policy with production evidence | Conversation Design + Analytics | Confidence is one feature in a multi-signal policy; false-route analysis is documented | 13, 18 |
| 23 | Pilot | Improve repair prompts from actual failures | Conversation Design | Top five repair loops have a targeted prompt or product change and an A/B plan | 18, 22 |
| 24 | Pilot | Add dependency timeout, retry, and degraded-mode behaviour | Platform Eng + SRE | Every external dependency has timeout, safe fallback, and user-visible recovery | 15, 20 |
| 25 | Pilot | Validate cost, quota, region, and latency budget | FinOps + Platform Eng | Forecast and guardrails are approved at expected beta load | 18, 20, 24 |
| 26 | Pilot | Conduct formal design-review gate | Product + Security + Support | Rubric has no unresolved critical safety, validation, or recovery gaps | 18–25 |
| 27 | Expand | Expand to the next highest-volume low-risk journey | Product | New journey meets the same charter and gate standard as the pilot | 26 |
| 28 | Expand | Build reusable conversation components and copy patterns | Conversation Design | Confirm/retry/handoff/auth patterns are documented and versioned | 23, 27 |
| 29 | Expand | Add locale and language support deliberately | Product + Localization | Locale-specific evaluation, content ownership, and handoff coverage are in place | 19, 27 |
| 30 | Expand | Add channel-adapter contract tests | Platform Eng | CX/Lex/channel adapter changes cannot silently break the normalised contract | 6, 27 |
| 31 | Expand | Separate agent-assist and customer-facing automation policies | Product + Compliance | Different authority, disclosure, and review rules are encoded and documented | 20, 27 |
| 32 | Expand | Add experiment governance and feature flags | Product + Platform Eng | Experiments have eligibility, metric, stop rule, owner, and rollback control | 13, 26 |
| 33 | Expand | Automate evaluation in release CI | QA + Platform Eng | Dataset regression and policy checks run for relevant configuration changes | 12, 21, 30 |
| 34 | Expand | Build a source-change review workflow | Content Ops | Source updates trigger review, evaluation, and publication/rollback traceability | 19, 20 |
| 35 | Expand | Add role-based audit access to operational data | Security + Analytics | Access, export, retention, and redaction controls are auditable | 3, 13 |
| 36 | Expand | Introduce proactive user-notification only with consent | Product + Privacy | Consent, relevance, quiet-hours, and opt-out policies are testable | 3, 31 |
| 37 | Expand | Strengthen abuse prevention and rate controls | Security + SRE | Threat-specific detection, limits, and response playbooks are exercised | 15, 21 |
| 38 | Expand | Run an independent accessibility usability review | Accessibility + Research | Findings from representative users are prioritised and remediated | 14, 29 |
| 39 | Expand | Establish monthly quality and safety review | Product + Support + Analytics | Decisions, regressions, action owners, and release changes are recorded | 13, 26 |
| 40 | Expand | Define data retention deletion and subject-rights process | Privacy + Data Eng | End-to-end request handling is documented and tested for applicable policy | 3, 35 |
| 41 | Scale | Introduce resilient multi-region or failover strategy as needed | SRE + Platform Eng | Critical failure modes and recovery objectives are tested against business need | 24, 25 |
| 42 | Scale | Add enterprise tenancy and policy isolation where needed | Security + Platform Eng | Tenant boundaries, source access, auditability, and test coverage are verified | 35, 40 |
| 43 | Differentiate | Create task-level quality scorecards for leaders | Analytics + Product | Decision-ready scorecards show outcome, safety, cost, latency, and accessibility by journey | 13, 39 |
| 44 | Differentiate | Introduce supervised human feedback loop | Support Ops + QA | Feedback taxonomy, sampling rules, reviewer training, and change approval exist | 23, 39 |
| 45 | Differentiate | Add guided multimodal input only for a validated user need | Product + Accessibility | Image/file use has consent, accessibility equivalent, privacy review, and evaluation | 3, 38 |
| 46 | Differentiate | Make the course configurable for organisation policy | Learning + Product | Facilitator can choose routes, risks, source policy, and capstone variant without code changes | 26, 28 |
| 47 | Differentiate | Add learner assessment and completion export | Learning + Engineering | Scenario performance and capstone rubric export without collecting unnecessary learner data | 12, 35, 46 |
| 48 | Differentiate | Create role-based learning tracks | Learning | Product, design, engineering, support, and risk tracks map to shared release gates | 46, 47 |
| 49 | Differentiate | Publish an annual platform capability review | Platform Eng + Procurement | CX/Lex capability, regional, security, and cost assumptions are refreshed with decisions | 25, 30 |
| 50 | Differentiate | Reprioritise from measured user and operational evidence | Steering group | Top-50 roadmap is revised; stopped work and trade-offs are explicitly recorded | 39, 43, 49 |

## Critical path

```text
1–5: scope, authority, risk, gates
          ↓
6–15: safe first journey, evaluation, operations
          ↓
16–26: controlled pilot, evidence, formal release decision
          ↓
27–40: repeatable expansion and governance
          ↓
41–50: scale and differentiation only where evidence warrants it
```

## Operating rule

Pause expansion if any of the following occur: a critical privacy/security finding, an unsafe-action defect, a broken handoff, an accessibility blocker, a sustained release-gate miss, or no accountable owner for a journey. Resolve the gate before progressing down the roadmap.

## Repository execution coverage

The project now contains the reusable implementation evidence that can be completed locally: an executable reference router and action guard (`reference-implementation/`), evaluation starter, observability contract, accessibility QA guide, readiness checklist, source-change and incident runbooks, CI verification, and an external-evidence register. Items that require a real cloud account, production backend, customer traffic, legal/security approval, named people, or an operational review remain deliberately evidence-gated in `release/External_Evidence_Register.md`; they cannot be honestly closed by source code alone.
