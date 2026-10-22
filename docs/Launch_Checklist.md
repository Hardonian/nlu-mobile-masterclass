# Launch Checklist

## Repository and build

- [ ] Canonical repository boundary is confirmed; the outer legacy wrapper is retired or explicitly maintained.
- [x] Locked Node.js toolchain and verification scripts run locally.
- [x] Unit, static-release, content, link, and obvious-secret checks pass.
- [ ] Browser automation runs in CI.
- [ ] Accessibility testing is completed with representative assistive technology.

## Hosting and operations

- [ ] HTTPS domain and hosting owner are assigned.
- [ ] GitHub Pages or selected host deployment is enabled.
- [ ] Production rollback has been rehearsed.
- [ ] Error and uptime monitoring are configured without raw learner text.
- [ ] Support and incident contacts are named.

## Product and content

- [ ] Product owner approves MVP scope and non-goals.
- [ ] Content owner approves vendor-specific claims and review dates.
- [ ] Facilitator pilot is complete.
- [ ] Learner usability findings are resolved or accepted.
- [ ] Pricing and licensing decisions are complete for the chosen package.

## Privacy, security, and accessibility

- [ ] Privacy review approves progress and analytics behavior.
- [ ] Security review approves CSP, deployment, dependencies, and threat model.
- [ ] Legal review approves third-party links, branding, and commercial terms.
- [ ] Accessibility review has no unresolved blockers.
- [ ] Data retention and deletion policy is published.

## Go/no-go rule

Do not launch while a critical security, privacy, accessibility, broken-handoff, or ownership gate remains unresolved.
