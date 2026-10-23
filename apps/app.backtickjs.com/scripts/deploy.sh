#!/bin/sh
# Deploys app.backtickjs.com to production, built on this machine: it compiles
# apps/mobile/server, outside this folder, so Vercel can't build it alone. A
# monorepo's prebuilt output names its files from the repo's root, so it's
# deployed from there, by the project's ids rather than a link.
set -e
cd "$(dirname "$0")/.."
vercel pull --yes --environment production
vercel build --prod
root=$(git rev-parse --show-toplevel)
org=$(node -p 'require("./.vercel/project.json").orgId')
project=$(node -p 'require("./.vercel/project.json").projectId')
mkdir -p "$root/.vercel"
rm -rf "$root/.vercel/output"
mv .vercel/output "$root/.vercel/output"
trap 'rm -rf "$root/.vercel/output"; rmdir "$root/.vercel" 2>/dev/null || true' EXIT
cd "$root"
VERCEL_ORG_ID=$org VERCEL_PROJECT_ID=$project vercel deploy --prebuilt --prod --yes
