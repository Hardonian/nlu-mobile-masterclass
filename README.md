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

## Supporting assets

- `docs/Facilitator_Guide.md` — workshop timing, answer key, prompts, and capstone rubric.
- `docs/Production_Readiness_Checklist.md` — pre-pilot and launch gates across product, safety, evaluation, and operations.
- `docs/Evaluation_Dataset_Template.csv` — a version-control-ready starter test set.
- `docs/Future_State_Architecture.md` — a vendor-neutral expansion path and normalised turn contract.
- `docs/Accessibility_and_Mobile_QA.md` — practical accessibility and small-screen test protocol.
- `docs/Observability_Event_Contract.json` — privacy-conscious baseline for conversation events.

## Production note

This course deliberately treats grounded retrieval as a controlled informational path—not automatic permission to act. Before implementing a real assistant, validate platform feature availability, identity/authorisation, privacy requirements, approved retrieval sources, observability, and safety review with your organisation.
