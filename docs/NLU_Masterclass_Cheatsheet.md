# Conversational NLU for Mobile — Release Guide

## What learners can do after this masterclass

- Choose the right interaction model for a bounded task, a knowledge question, or a sensitive request.
- Model the same task in Dialogflow CX and Amazon Lex V2 without treating the two platforms as identical.
- Design low-confidence, retrieval, confirmation, escalation, and recovery paths that are safe on a small screen.
- Evaluate an agent with real task outcomes—not only intent confidence.

## Course map (90–120 minutes)

| Module | Outcome | Practice |
| --- | --- | --- |
| 1. Product framing | Separate task automation from knowledge assistance | Classify six customer messages |
| 2. State design | Map a mobile task to state, data, and exits | Refund flow canvas |
| 3. Platform translation | Translate CX flows/pages and Lex intents/slots | Architecture comparator |
| 4. Input design | Write examples, slot prompts, and repair prompts | Prompt rewrite |
| 5. Retrieval with guardrails | Decide when and how grounded retrieval can answer | Fallback policy simulation |
| 6. Trust & safety | Handle identity, payments, policy ambiguity, and escalation | Risk review |
| 7. Measurement | Build a test set and release gates | Evaluation scorecard |
| 8. Capstone | Ship a refund assistant plan | Design review checklist |

## Platform translation at a glance

| Design concern | Dialogflow CX | Amazon Lex V2 |
| --- | --- | --- |
| Conversation structure | Flows, pages, routes, parameters | Intents, slots, prompts, next steps / Lambda control |
| NLU training | Intents with training phrases; entities/parameters | Intents with sample utterances; slot types and slots |
| Business logic | Webhooks and fulfillment | Lambda dialog and fulfillment code hooks |
| Knowledge answer pattern | Use a grounded enterprise-search or approved retrieval service behind a controlled route | Use an approved retrieval service or Bedrock Knowledge Base behind a controlled intent / Lambda path |
| Recovery | No-match/no-input handling, routes, event handlers | Fallback intent, retry prompts, Lambda-directed next step |

Platform labels evolve; validate enabled features and regional availability in the official documentation before committing an implementation.

## The routing policy

1. **Deterministic task path** — choose it for actions such as tracking, cancellation, address update, or refund eligibility. Collect only the required data and call an authorised backend.
2. **Grounded knowledge path** — choose it for answerable policy, product, or help-centre questions. Retrieve from approved sources, keep citations/provenance, and abstain when evidence is weak.
3. **Clarify or hand off** — choose it for identity uncertainty, payment changes, regulated advice, threats, repeated failure, or a request outside policy.

Confidence is one signal, not a safety policy. Use intent ambiguity, missing data, retrieval evidence, user risk, repeated failure, and backend results together.

## Minimum production contract

- Authenticate before exposing order, account, or payment information.
- Validate every server-side action; never trust client-filled slots alone.
- Put a timeout, retry policy, and user-readable recovery message around every dependency.
- Log a privacy-reviewed event schema: route, confidence band, completion, repair count, latency, retrieval source IDs, and escalation reason. Avoid raw sensitive content unless it is truly necessary and permitted.
- Test with paraphrases, incomplete inputs, ASR-like errors, code-switching/locales you support, adversarial requests, and outage scenarios.
- Set release gates for task completion, containment, unsafe-answer rate, p95 latency, and accessibility—not a single accuracy score.

## Capstone brief

Design a mobile refund assistant. It must answer a general policy question, locate an authenticated order, check eligibility, request confirmation before an irreversible action, and offer a human handoff after two failed repairs. In the course reader, use the simulator and canvas to pressure-test the routing choices.

## Official implementation references

- [Dialogflow CX concepts](https://cloud.google.com/dialogflow/cx/docs/concept/agent)
- [Dialogflow CX webhooks](https://cloud.google.com/dialogflow/cx/docs/concept/webhook)
- [Amazon Lex V2 intents and slots](https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html)
- [Amazon Lex V2 Lambda hooks](https://docs.aws.amazon.com/lexv2/latest/dg/lambda.html)
- [Amazon Bedrock Knowledge Bases retrieval](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-retrieval-works.html)
