# 🤖 Dialogflow (ES/CX) vs Amazon Lex V2 — Masterclass Cheat-Sheet

## 1. Architectural Paradigms
- **Dialogflow ES:** Flat Contexts with turn lifespans.
- **Dialogflow CX:** State Machine Graph (Flows, Pages, Route Groups, Form Parameters).
- **Amazon Lex V2:** Slot-Filling State Machine with `DialogCodeHook` & `FulfillmentCodeHook`.

## 2. Low-Confidence Fallback (< 0.60)
- Confidence < 0.60 automatically diverts to Grounded Enterprise RAG:
  - **Dialogflow CX:** Vertex AI Search (`answerQuery` API).
  - **Amazon Lex V2:** Amazon Bedrock Knowledge Bases (`RetrieveAndGenerate` API).
