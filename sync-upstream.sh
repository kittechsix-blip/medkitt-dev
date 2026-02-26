#!/bin/bash
# sync-upstream.sh - Sync dev environment with production

set -e

echo "🔄 Syncing medkitt-dev with upstream (production)..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not a git repository. Run this from medkitt-dev root.${NC}"
    exit 1
fi

# Check if upstream remote exists
if ! git remote | grep -q "upstream"; then
    echo -e "${YELLOW}Adding upstream remote...${NC}"
    git remote add upstream https://github.com/kittechsix-blip/medkitt.git
fi

echo -e "${YELLOW}Fetching latest from upstream (production)...${NC}"
git fetch upstream

echo ""
echo -e "${YELLOW}Checking out main branch...${NC}"
git checkout main

echo ""
echo -e "${YELLOW}Merging upstream/main into local main...${NC}"
if git merge upstream/main --no-edit; then
    echo -e "${GREEN}✓ Successfully merged upstream changes${NC}"
else
    echo -e "${RED}✗ Merge failed. Please resolve conflicts manually.${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Pushing to origin (dev fork)...${NC}"
git push origin main

echo ""
echo -e "${GREEN}✓ Sync complete! Dev environment is up to date with production.${NC}"
echo ""
echo "Next steps:"
echo "  - Your dev site will auto-deploy via GitHub Actions"
echo "  - Check deployment status at: https://github.com/kittechsix-blip/medkitt-dev/actions"
