#!/usr/bin/env bash
# Builds the app, then the firmware holding it, then writes it to the device.
#
# One script because the three are one thing: what the device runs is the
# firmware, and what the firmware runs is the bundle built from `app/src`.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PATH="/opt/homebrew/bin:$PATH"

if [ ! -d "${IDF_PATH:-$HOME/esp/esp-idf}" ]; then
  echo "backtick: no ESP-IDF at ${IDF_PATH:-$HOME/esp/esp-idf}" >&2
  exit 1
fi
# shellcheck disable=SC1091
. "${IDF_PATH:-$HOME/esp/esp-idf}/export.sh" >/dev/null

echo "==> the app"
(cd "$here/app" && pnpm build)

echo "==> the firmware"
cd "$here/firmware"
idf.py build

echo "==> the device"
if [ $# -gt 0 ]; then
  idf.py -p "$1" flash monitor
else
  # No port given: esptool finds it, and says so when it cannot.
  idf.py flash monitor
fi
