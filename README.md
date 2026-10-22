# Conversational NLU for Mobile

A release-ready, mobile-first masterclass for designing production conversational systems with Dialogflow CX and Amazon Lex V2.

## Included

- An interactive, zero-dependency course reader with eight practical lessons.
- A routing simulator that shows why confidence alone is not a production policy.
- Platform translation, mobile input guidance, safety patterns, release metrics, and a capstone closure checklist.
- An offline-friendly PWA app shell (`manifest.webmanifest` and `sw.js`).
- A complete teaching and production kit in `docs/`: facilitator guide, readiness checklist, evaluation-set starter, and future-state architecture blueprint.

## Run locally

Open `dist-mobile-nlu/index.html` in a browser. For service-worker/offline behaviour, serve the repository with any static server, for example:

```powershell
python -m http.server 8080 -d dist-mobile-nlu
```

Then browse to `http://localhost:8080`.

## Development commands

Requires Node.js 20+.

```powershell
npm install
npm run verify
```

`verify` validates the project shape, content structure, local links, static release, reference implementation, and release smoke tests. The application remains dependency-free at runtime.

## Supporting assets

- `docs/Facilitator_Guide.md` — workshop timing, answer key, prompts, and capstone rubric.
- `docs/Production_Readiness_Checklist.md` — pre-pilot and launch gates across product, safety, evaluation, and operations.
- `docs/Evaluation_Dataset_Template.csv` — a version-control-ready starter test set.
- `docs/Future_State_Architecture.md` — a vendor-neutral expansion path and normalised turn contract.
- `docs/Accessibility_and_Mobile_QA.md` — practical accessibility and small-screen test protocol.
- `docs/Observability_Event_Contract.json` — privacy-conscious baseline for conversation events.
- `docs/Top_50_Roadmap.md` — prioritised delivery plan from pilot foundations through future-state scale.
- `reference-implementation/` — tested dependency-free routing, action-control, and CX/Lex adapter examples.
- `src/content/` — versioned course source metadata checked against the distribution.
- `runbooks/` and `release/` — incident, source-change, and external-evidence execution controls.
- `docs/Execution_Status.md` — repository-complete work versus evidence-gated productization work.

## Verify the reference implementation

```powershell
node reference-implementation/orchestrator.test.js
node --check dist-mobile-nlu/sw.js
```

## Production note

This course deliberately treats grounded retrieval as a controlled informational path—not automatic permission to act. The repository includes a working reference policy module and release artefacts; a real assistant still needs your cloud environment, domain backend, identity integration, approved data sources, named owners, and organisational sign-off. Track those non-repository gates in `release/External_Evidence_Register.md`.
