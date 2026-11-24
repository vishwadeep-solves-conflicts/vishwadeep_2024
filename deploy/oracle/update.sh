#!/usr/bin/env bash
# Run by the sites-deploy timer every 10 minutes: refreshes this kit from GitHub,
# then deploys any site whose repo has new commits. Can also be run by hand.
set -euo pipefail
KIT_REPO=/opt/sites-kit
cd "$KIT_REPO"
git fetch -q --depth 1 origin main
# Follow main once the kit has been merged there; until then stay on the current branch.
if git cat-file -e FETCH_HEAD:deploy/oracle/deploy.sh 2>/dev/null; then
  git checkout -q -B main FETCH_HEAD
else
  git fetch -q --depth 1 origin "$(git rev-parse --abbrev-ref HEAD)"
  git reset -q --hard FETCH_HEAD
fi
exec "$KIT_REPO/deploy/oracle/deploy.sh"
