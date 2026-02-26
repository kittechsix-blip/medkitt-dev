# MedKitt Branching Strategy

This document outlines the branching strategy for MedKitt development.

## Branch Overview

### Main Branches

| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `main` (prod) | Production code | Production site |
| `main` (dev) | Development code | Dev site (GitHub Pages) |

### Feature Branches

All new features start as feature branches:

```
feature/pwa-install
feature/breadcrumb-nav
feature/scrapling-pipeline
```

## Workflow

### 1. Production (Source of Truth)

```
kittechsix-blip/medkitt (main)
         ↑
    (sync only)
         ↓
kittechsix-blip/medkitt-dev (main)
```

### 2. Development Flow

```
main (synced from prod)
   │
   ├──→ feature/pwa-install ──→ PR ──→ merge to dev main
   │
   ├──→ feature/breadcrumb-nav ──→ PR ──→ merge to dev main
   │
   └──→ feature/scrapling-pipeline ──→ PR ──→ merge to dev main
```

## Branch Naming Conventions

### Feature Branches
```
feature/<short-description>
```

Examples:
- `feature/pwa-install`
- `feature/breadcrumb-nav`
- `feature/scrapling-pipeline`

### Bug Fix Branches
```
fix/<short-description>
```

Examples:
- `fix/login-redirect`
- `fix/mobile-layout`

### Hotfix Branches (production emergencies)
```
hotfix/<short-description>
```

## Best Practices

1. **Always branch from synced main**
   ```bash
   git checkout main
   ./sync-upstream.sh
   git checkout -b feature/my-feature
   ```

2. **Keep branches focused**
   - One feature per branch
   - Small, reviewable commits

3. **Regular syncs**
   - Sync with production at least daily
   - Rebase feature branches on main if needed

4. **Clean up after merge**
   ```bash
   git branch -d feature/completed-feature
   git push origin --delete feature/completed-feature
   ```

## Current Feature Branches

- `feature/pwa-install` - PWA install hero component
- `feature/breadcrumb-nav` - Breadcrumb navigation
- `feature/scrapling-pipeline` - Scrapling data pipeline

## Promotion to Production

When a feature is ready for production:

1. Final testing on dev site
2. Copy changes to production repo (manual or PR)
3. The production repo has its own deployment pipeline

## Emergency Fixes

For production emergencies:

1. Fix in `medkitt` (production) directly
2. Then sync the fix to dev:
   ```bash
   ./sync-upstream.sh
   ```
