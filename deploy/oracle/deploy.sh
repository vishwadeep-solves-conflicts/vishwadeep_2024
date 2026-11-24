#!/usr/bin/env bash
# Fetches the built files of every site listed in sites.conf and publishes them
# under /srv/sites. Nothing is built here: GitHub Actions in each repo builds the
# site and pushes the result to a branch (see sites.conf). Safe to run again at
# any time; each site is swapped in whole.
#   usage: sudo ./deploy.sh        (FORCE=1 republishes sites that haven't changed)
set -euo pipefail

KIT="$(cd "$(dirname "$0")" && pwd)"
SRC="${SRC:-/opt/sites-src}"   # checkouts of the built branches
OUT="${OUT:-/srv/sites}"        # what Caddy serves
OWNER="${OWNER:-https://github.com/vishwadeep-solves-conflicts}"

mkdir -p "$SRC" "$OUT"

failed=""
while read -r repo path branch; do
  echo "==> $repo ($branch) -> /$path/"
  set +e
  (
  set -e
  url="$OWNER/$repo"
  rc=0; git ls-remote --exit-code --heads "$url" "$branch" >/dev/null || rc=$?
  if [ "$rc" = 2 ]; then
    echo "    no '$branch' branch yet (its build hasn't run), keeping what's live"
    exit 0
  fi
  [ "$rc" = 0 ] || exit "$rc"

  dir="$SRC/$repo@$branch"
  if [ -d "$dir/.git" ]; then
    git -C "$dir" fetch -q --depth 1 origin "$branch"
    git -C "$dir" reset -q --hard FETCH_HEAD
  else
    rm -rf "$dir"
    git clone -q --depth 1 --branch "$branch" "$url" "$dir"
  fi

  rev="$(git -C "$dir" rev-parse HEAD)"
  if [ "${FORCE:-0}" != 1 ] && [ -f "$OUT/$path/.rev" ] && [ "$(cat "$OUT/$path/.rev")" = "$rev" ]; then
    echo "    unchanged ($rev), skipped"
    exit 0
  fi

  stage="$(mktemp -d)"
  cp -a "$dir/." "$stage/"
  rm -rf "$stage/.git"
  echo "$rev" > "$stage/.rev"
  chmod -R a+rX "$stage"
  rm -rf "$OUT/$path.old"
  [ -d "$OUT/$path" ] && mv "$OUT/$path" "$OUT/$path.old"
  mv "$stage" "$OUT/$path"
  rm -rf "$OUT/$path.old"
  ) </dev/null
  rc=$?
  set -e
  if [ "$rc" != 0 ]; then
    echo "!!! $repo failed, keeping whatever was live before" >&2
    failed="$failed $repo"
  fi
done < <(grep -vE '^\s*(#|$)' "$KIT/sites.conf")

echo "==> hub -> /"
install -m 644 "$KIT/hub/index.html" "$OUT/index.html"
if [ -n "$failed" ]; then echo "Done, but these failed:$failed" >&2; exit 1; fi
echo "Done."
