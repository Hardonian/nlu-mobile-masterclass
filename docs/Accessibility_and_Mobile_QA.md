# Accessibility & Mobile QA Guide

## Experience standard

The conversational interface must remain usable when users are on a small screen, in poor connectivity, using a screen reader, keyboard, switch control, zoom, or voice input. “The bot understood the intent” is not sufficient if the next action cannot be found or operated.

## Content and interaction checks

- Use plain, specific language. State the next action before background explanation.
- Keep one primary choice per prompt; group alternatives rather than creating a dense list of equal-weight buttons.
- Do not communicate status through colour, animation, or confidence scores alone.
- Use visible labels for fields; do not rely on placeholder text as the only instruction.
- Give errors and progress messages in an `aria-live` region when the UI updates without navigation.
- Ensure every interactive element is keyboard reachable with a visible focus indicator and a logical order.
- Respect reduced-motion settings and support zoom/reflow up to 400% without hiding essential actions.
- Avoid requiring precise gestures, hover, long press, or a fixed orientation for completion.

## Conversation-specific checks

- A customer can repeat, correct, cancel, start over, or reach support without losing control.
- Prompt wording tells users why an identifier or sign-in is required before it is requested.
- Error text names the problem and gives a bounded next action; it never blames the person.
- Voice/ASR experiences tolerate pauses, partial input, and common transcription variants.
- Handoff includes the service expectation and an accessible non-conversational alternative when possible.

## Mobile test matrix

| Area | Test | Evidence |
| --- | --- | --- |
| Viewport | 320 px width, 200% zoom, 400% reflow | No clipped controls or horizontal task-blocking scroll |
| Keyboard | Tab/shift-tab/enter/space through full journey | Focus is visible; no trap; order is sensible |
| Screen reader | Read prompt, error, result, and handoff | Labels, state changes, and purpose are understandable |
| Network | Slow/offline and dependency timeout | User sees recovery path and no false success |
| Interruptions | App backgrounded, session expires, user changes topic | State restores safely or explains restart |
| Input variance | Typo, short answer, paste, speech-like text | Repair prompt is useful and not punitive |

## Review protocol

1. Test the happy path with keyboard and a screen reader before visual polish.
2. Test every recovery and handoff path on a small viewport.
3. Include people with relevant lived experience in research and usability testing where possible.
4. Record defects against the task outcome, severity, affected users, and the conversation state—not just the screen.
5. Treat blockers to authentication, recovery, support contact, and required disclosures as release blockers.

