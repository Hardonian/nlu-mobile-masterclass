# Organization Configuration

The product is currently configured by versioned repository content. The schema at `src/content/organization-config.schema.json` defines the safe shape for future organization-specific configuration.

## Rules

- Branding may change presentation but not safety policy.
- Organization policy scenarios must identify an owner and review date.
- Custom content must not add direct transaction authority to the course simulator.
- Locales require translated content, evaluation cases, facilitator guidance, and handoff copy before release.
- Configuration changes require the same verification and rollback path as code changes.
