# Product Metrics Contract

## Learner funnel

`landing_viewed → course_started → lesson_viewed → scenario_answered → capstone_started → capstone_completed`

## Required dimensions

- Course version
- Locale
- Device class
- Browser family
- Learner role
- Facilitated versus self-serve

## Guardrails

- Do not collect raw learner answers or free-text briefs by default.
- Use opaque learner and session identifiers.
- Record consent before optional analytics.
- Define retention and deletion before enabling a hosted analytics service.

## Decision thresholds

Review a release when completion drops by 10%, scenario accuracy drops by 5 percentage points, or a new accessibility blocker appears.
