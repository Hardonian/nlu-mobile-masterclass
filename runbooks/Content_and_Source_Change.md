# Content & Retrieval Source Change Runbook

## Before publishing a source change

1. Name the content owner, business reason, effective date, expiry/review date, and affected journey.
2. Confirm the source is approved, access-filtered, current, and free of secrets or unintended personal data.
3. Add or update evaluation cases for the changed policy and adjacent ambiguous/exception cases.
4. Test retrieval precision, evidence sufficiency, conflicting sources, stale source removal, and abstention.
5. Obtain required legal/compliance/domain approval before the source becomes customer-facing.

## Publish sequence

1. Version the source and record its source ID.
2. Publish to non-production retrieval index or review environment.
3. Run the labelled evaluation set and human spot-checks; compare to the previous version.
4. Approve gradual release with rollback source/version identified.
5. Monitor retrieval support rate, handoff rate, unsafe-answer reports, and source-specific failures.

## Rollback conditions

Rollback the source or route immediately for false policy claims, unauthorised content, source-access failure, material grounding regression, or a required policy correction. Preserve approved evidence for the change review; do not retain unnecessary user text.

