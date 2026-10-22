# External Evidence Register

This register converts the roadmap’s environment-dependent items into evidence-based gates. Fill it only with approved references; do not put credentials, customer data, or secrets in this repository.

| Roadmap priorities | Gate | Accountable owner | Evidence link / ticket | Status | Review date |
| --- | --- | --- | --- | --- | --- |
| 1–5 | Pilot charter, data boundary, risk approval, release thresholds | Unassigned | `docs/Product_Requirements.md`, `docs/Product_Metrics.md` | Repository draft; approval pending |  |
| 6–15 | Platform configuration, auth, domain integration, events, accessibility, rollback drill | Technical owner pending | `reference-implementation/`, `docs/Deployment_Guide.md`, `runbooks/` | Repository patterns available; environment evidence pending |  |
| 16–26 | Internal test, customer beta, retrieval/content approval, cost and formal release review | Product owner pending | `docs/Facilitator_Guide.md`, `docs/Evaluation_Dataset_Template.csv` | Pilot not run |  |
| 27–40 | Expansion, localisation, CI, source governance, audit, accessibility study | Unassigned | `.github/workflows/`, `docs/Accessibility_and_Mobile_QA.md` | CI implemented; external review pending |  |
| 41–50 | Scale/resilience, tenancy, learning governance, capability review, re-prioritisation | Unassigned | `docs/Commercialization_Plan.md`, `docs/Threat_Model.md` | Design artifacts available; business decisions pending |  |

## Completion rule

Do not change a row to complete because a document exists. Completion requires named owner, approval/evidence reference, test or review date, and any exception/expiry handling.
