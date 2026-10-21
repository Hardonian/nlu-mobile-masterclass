# Facilitator Guide — Conversational NLU for Mobile

## Delivery format

Designed for a 90–120 minute workshop, self-paced cohort review, or team onboarding session. The reader is the primary participant artifact; this guide contains the delivery rhythm, answer key, and review rubric.

## Before the session

- Serve `dist-mobile-nlu/` from a local static server if learners need offline/PWA behaviour.
- Ask learners to open the reader on a phone or in responsive mode and bring one real, bounded customer journey.
- Do not use production customer data in exercises. Supply synthetic orders, policies, and account examples.
- Agree who will play product owner, conversation designer, platform engineer, security/privacy reviewer, and support lead during the capstone review.

## Run of show

| Time | Activity | Facilitator move | Evidence of learning |
| --- | --- | --- | --- |
| 0–10 min | Frame the problem | Ask: “Which customer request must never be handled by an unauthenticated bot?” | Learners distinguish intent from authority. |
| 10–25 min | State design | Draw a happy path, then deliberately add correction, timeout, and handoff exits. | A path names data sources and exit conditions. |
| 25–40 min | Platform translation | Divide teams by CX and Lex, then have them explain the same design to the other team. | Teams map concepts without claiming feature equivalence. |
| 40–55 min | Mobile input and repair | Rewrite vague failure prompts into a bounded choice. | Prompts are scannable and tell users what to do next. |
| 55–75 min | Routing simulator | Change one signal at a time; ask why the route changed. | Teams explain multi-signal routing. |
| 75–95 min | Capstone | Build the refund journey, then review with the rubric below. | A design can pass a release review. |
| 95–120 min | Debrief / commitments | Capture top risks, owners, and the first evaluation slice. | Concrete next action is assigned. |

## Discussion prompts

1. Where could a high-confidence intent still produce harm?
2. Which request is a task, which is a knowledge question, and which needs a specialist?
3. What is the smallest explanation that lets a mobile user repair an error?
4. What evidence would let you show, rather than assume, that a retrieval answer was grounded?
5. Who owns the decision to expose an account detail or perform a transaction?

## Answer key for the in-reader check

For “Cancel my order #7412” with no sign-in, the correct next route is **authenticate, then resume**. Intent classification can identify the likely user goal; it cannot grant permission to view, modify, or cancel an order. After authentication, the service should validate that the order belongs to the user, check cancellation eligibility, explain the result, and request confirmation if appropriate.

## Capstone review rubric

Score each criterion from 0 (missing), 1 (partial), or 2 (release-ready). A production pilot should not ship with a zero in safety, validation, or recovery.

| Criterion | 0 | 1 | 2 |
| --- | --- | --- | --- |
| User outcome | Vague chatbot scope | Task named but completion unclear | Bounded task, success receipt, and owner named |
| State & data | Happy path only | Some slots/parameters listed | State, source of truth, corrections, timeouts, and exits mapped |
| Authority | Assumes intent is enough | Sign-in mentioned | Server-side authentication and authorisation precede protected actions |
| Retrieval | Answers from model memory | Source named but no abstention | Approved sources, evidence threshold, provenance, and abstention defined |
| Recovery | Generic fallback | One retry prompt | Bounded repair, retry limit, handoff, and outage copy tested |
| Measurement | Intent accuracy only | Some analytics named | Outcome, safety, latency, accessibility gates and on-call ownership set |

## Common facilitation traps

- Do not let learners debate vendors before they can state the user journey and data contract.
- Challenge “the model will decide” with: “What evidence authorises that decision?”
- Treat a human handoff as a designed outcome, not a failure to automate.
- Keep examples realistic but synthetic; do not encourage credentials or real order details in a workshop.

