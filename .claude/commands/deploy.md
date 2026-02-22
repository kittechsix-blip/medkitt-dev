# Deploy MedKitt

Compile TypeScript, verify all compiled files are staged, bump the service worker cache, and push to GitHub Pages.

## Steps

1. **Compile TypeScript:**
   Run `bunx tsc` from the project root. Verify zero errors.

2. **Verify ALL compiled files are staged:**
   Run `git status docs/` and check for ANY unstaged changes. Every modified file in `docs/` MUST be committed.
   This is critical — the `src/` TypeScript source and the `docs/` compiled output can get out of sync if compiled JS files are forgotten. This has caused production bugs before (e.g., 8 drugs existed in source but were never deployed).

3. **Bump SW cache version:**
   Open `docs/sw.js` and increment the number in `const CACHE_NAME = 'medkitt-vNN';`
   (e.g., v50 → v51). This triggers the service worker update on users' devices.

4. **Stage, commit, and push:**
   Stage all changed files in BOTH `src/` and `docs/`, commit with a descriptive message, and push to `main`.

5. **Verify deployment:**
   Run `gh api repos/kittechsix-blip/medkitt/pages/builds --jq '.[0] | {status, created_at}'` to confirm GitHub Pages built successfully.

6. **Update MEMORY.md:**
   Update the SW cache version in `~/.claude/projects/-Users-kittechsix/memory/MEMORY.md`.

## Important Notes

- NEVER push without checking `git status docs/` first — forgotten compiled files are silent production bugs
- ALWAYS bump the SW cache version on every deploy — this triggers auto-updates on users' phones
- The SW uses network-first for JS/HTML/CSS + auto-reload via `client.navigate()` on upgrade
- If a user reports stale content, send them to: `https://kittechsix-blip.github.io/medkitt/clear.html`
