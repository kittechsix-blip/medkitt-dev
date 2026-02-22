# Deploy MedKitt

Compile TypeScript, bump the service worker cache, and push to GitHub Pages.

## Steps

1. **Compile TypeScript:**
   Run `bunx tsc` from the project root. Verify zero errors.

2. **Bump SW cache version:**
   Open `docs/sw.js` and increment the number in `const CACHE_NAME = 'medkitt-vNN';`
   (e.g., v44 → v45). This triggers the service worker update on users' devices.

3. **Commit and push:**
   Stage all changed files in `src/` and `docs/`, commit with a descriptive message, and push to `main`.

4. **Verify deployment:**
   Run `gh api repos/kittechsix-blip/medkitt/pages/builds --jq '.[0] | {status, created_at}'` to confirm GitHub Pages built successfully.

## Important Notes

- ALWAYS bump the SW cache version on every deploy — this is what triggers auto-updates on users' phones
- The SW uses network-first for JS/HTML/CSS, so users get fresh code automatically when online
- The `controllerchange` listener in app.ts auto-reloads the page when a new SW activates
- If a user reports stale content, send them to: `https://kittechsix-blip.github.io/medkitt/clear.html`
- Current SW cache version can be found in MEMORY.md — update it after each deploy
