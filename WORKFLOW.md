# MedKitt Dev Workflow

This document describes how to use the MedKitt development environment.

## Overview

- **Production**: `https://github.com/kittechsix-blip/medkitt` (main repo)
- **Development**: `https://github.com/kittechsix-blip/medkitt-dev` (dev fork)
- **Dev Site**: `https://kittechsix-blip.github.io/medkitt-dev/`

## Repository Structure

```
~/Desktop/medkitt-dev/
├── .github/workflows/deploy-dev.yml  # Auto-deploy to GitHub Pages
├── docs/                             # Static site (GitHub Pages source)
├── src/                              # Application source
├── sync-upstream.sh                  # Sync with production script
├── WORKFLOW.md                       # This file
└── BRANCHING.md                      # Branch strategy
```

## Quick Start

### 1. Clone the Dev Environment (if not already done)

```bash
git clone https://github.com/kittechsix-blip/medkitt-dev.git
cd medkitt-dev
```

### 2. Verify Remotes

```bash
git remote -v
```

You should see:
- `origin` → `https://github.com/kittechsix-blip/medkitt-dev.git` (your dev work)
- `upstream` → `https://github.com/kittechsix-blip/medkitt.git` (production)

### 3. Sync with Production

Before starting new work, always sync with production:

```bash
./sync-upstream.sh
```

Or manually:
```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Development Workflow

### Creating a Feature Branch

```bash
# Make sure you're on main and synced
git checkout main
./sync-upstream.sh

# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Make your changes
git add .
git commit -m "Add: description of changes"
git push -u origin feature/your-feature-name
```

### Testing Changes

1. Push your branch to GitHub
2. GitHub Actions will auto-deploy the `docs/` folder to Pages
3. Test at: `https://kittechsix-blip.github.io/medkitt-dev/`

### Merging to Main

```bash
git checkout main
git merge feature/your-feature-name
git push origin main
```

The dev site will auto-update after the push.

## Deployment

GitHub Actions automatically deploys the `docs/` folder to GitHub Pages on every push to `main`.

- **Workflow file**: `.github/workflows/deploy-dev.yml`
- **Deployment status**: https://github.com/kittechsix-blip/medkitt-dev/actions
- **Live URL**: https://kittechsix-blip.github.io/medkitt-dev/

## Syncing Production → Dev

Use the sync script to pull latest changes from production:

```bash
./sync-upstream.sh
```

This will:
1. Fetch latest from `upstream/main` (production)
2. Merge into local `main`
3. Push to `origin/main` (dev)

## Tips

- Always sync before starting new work
- Use feature branches for all changes
- Test on the dev site before promoting to production
- Keep the `docs/` folder ready for GitHub Pages

## GitHub Actions Workflow

The deployment workflow file is at: `.github/workflows/deploy-dev.yml`
If you cannot push it via git, manually create it via GitHub web interface.
