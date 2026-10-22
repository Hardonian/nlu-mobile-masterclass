# Browser and Accessibility Test Plan

The repository includes static smoke tests but intentionally does not claim full browser coverage until a browser runner is available in CI.

## Required scenarios

1. Load the course over HTTP and confirm all eight lessons render.
2. Complete and reset progress; reload and confirm state behavior.
3. Run the simulator with transactional, knowledge, risk, and repair inputs.
4. Complete the knowledge check and all practice cases.
5. Generate a local review brief and confirm no network request is required.
6. Install the PWA, disable the network, reload, and verify the offline shell.
7. Test 320px width, 200% zoom, and 400% reflow.
8. Complete the primary flow with keyboard only.
9. Verify screen-reader announcements for route results, feedback, and progress.
10. Verify no false success on dependency or network failure.

## CI acceptance

Use a supported browser automation runner with Chromium/WebKit coverage, upload screenshots and accessibility reports as artifacts, and fail the build on release-blocking defects. Keep this separate from the dependency-free runtime bundle.
