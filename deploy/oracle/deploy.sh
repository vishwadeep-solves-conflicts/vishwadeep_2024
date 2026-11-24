#!/usr/bin/env bash
# Pulls every site listed in sites.conf, builds the ones that need it, and publishes
# them under /srv/sites. Safe to run again at any time; each site is swapped in whole.
#   usage: sudo ./deploy.sh        (FORCE=1 rebuilds sites that haven't changed)
set -euo pipefail

KIT="$(cd "$(dirname "$0")" && pwd)"
SRC="${SRC:-/opt/sites-src}"   # git checkouts
OUT="${OUT:-/srv/sites}"        # what Caddy serves
OWNER="${OWNER:-https://github.com/vishwadeep-solves-conflicts}"

mkdir -p "$SRC" "$OUT"

grep -vE '^\s*(#|$)' "$KIT/sites.conf" | while read -r repo path dir build; do
  echo "==> $repo -> /$path/"
  if [ -d "$SRC/$repo/.git" ]; then
    git -C "$SRC/$repo" fetch -q --depth 1 origin HEAD
    git -C "$SRC/$repo" reset -q --hard FETCH_HEAD
  else
    git clone -q --depth 1 "$OWNER/$repo" "$SRC/$repo"
  fi

  rev="$(git -C "$SRC/$repo" rev-parse HEAD)"
  if [ "${FORCE:-0}" != 1 ] && [ -f "$OUT/$path/.rev" ] && [ "$(cat "$OUT/$path/.rev")" = "$rev" ]; then
    echo "    unchanged ($rev), skipped"
    continue
  fi

  stage="$(mktemp -d)"
  case "$build" in
    static)
      cp -a "$SRC/$repo/$dir/." "$stage/"
      rm -rf "$stage/.git" "$stage/.gitignore" "$stage"/*.md "$stage/LICENSE" "$stage/netlify.toml" "$stage/scripts"
      # keep the screenshot for the hub's card even when publishing a sub-folder
      [ -f "$SRC/$repo/screenshot.png" ] && cp "$SRC/$repo/screenshot.png" "$stage/"
      ;;
    vite)
      (cd "$SRC/$repo" && npm ci --no-audit --no-fund --silent && npm run build -- --base "/$path/")
      cp -a "$SRC/$repo/dist/." "$stage/"
      ;;
    *) echo "unknown build '$build' for $repo" >&2; exit 1 ;;
  esac

  echo "$rev" > "$stage/.rev"
  chmod -R a+rX "$stage"
  rm -rf "$OUT/$path.old"
  [ -d "$OUT/$path" ] && mv "$OUT/$path" "$OUT/$path.old"
  mv "$stage" "$OUT/$path"
  rm -rf "$OUT/$path.old"
done

echo "==> hub -> /"
install -m 644 "$KIT/hub/index.html" "$OUT/index.html"
echo "Done."
