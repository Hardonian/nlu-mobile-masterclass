# Deployment Guide

## Static release

Serve `dist-mobile-nlu/` from a static HTTPS host. The host must support SPA/PWA assets, MIME types for `.webmanifest` and `.svg`, immutable asset caching, and a rollback mechanism.

## Required checks

```powershell
npm run verify
python -m http.server 8080 -d dist-mobile-nlu
```

Then verify installation, offline reload, cache update, keyboard navigation, screen-reader announcements, and mobile reflow.

## Production requirements

- HTTPS and a custom domain.
- Security headers and a reviewed content-security policy.
- Error monitoring without raw learner text.
- Availability monitoring and an owner/on-call path.
- Versioned deployment artifact and rollback target.

Credentials, analytics identifiers, and hosting configuration belong in the deployment environment, never in the repository.
