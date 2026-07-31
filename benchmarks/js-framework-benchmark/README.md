# js-framework-benchmark

Stefan Krause's [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark),
mirrored: the same directory layout, so an implementation written here is one
the benchmark's own server lists and its driver runs, with no adapter in
between.

```
frameworks/keyed/<name>/    one implementation, as upstream expects one
```

Each implementation is its own npm project — `npm install && npm run build-prod`
inside its directory — and none of them are pnpm workspace members. The
`benchmarks/*` glob in `pnpm-workspace.yaml` reaches one level, which stops at
this directory, so a framework's toolchain stays its own.

## What's here

- `frameworks/keyed/svelte` — the reference to measure against, copied
  unmodified from upstream at commit `247fafa` (2026-07-28). Left as it arrived
  so what it does is the benchmark's answer rather than a reading of it.

## Running it

The driver, the static server, the CSS the pages link, and the results table
all live upstream, and stay there. Clone it beside this repo once:

```sh
git clone https://github.com/krausest/js-framework-benchmark ../../../js-framework-benchmark
cd ../../../js-framework-benchmark && npm ci
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm run install-webdriver-ts
```

The browser downloads are skipped because the driver launches the system
Chrome, at `/Applications/Google Chrome.app/…` on macOS. Set `JSFB_HOME` if the
checkout is somewhere else.

Then, from this directory:

```sh
pnpm rebuild svelte     # npm install && npm run build-prod, as upstream requires
pnpm start              # the benchmark's server, serving *these* frameworks, on :8080
pnpm bench svelte       # the real run — add --benchmark 01_ --count 3 to keep it short
pnpm isKeyed svelte     # the keyed classification check a run has to pass
pnpm results            # rebuild the results table
```

`cli.mjs` is what makes those one-liners: the server resolves its frameworks
root relative to its _own_ repo root rather than to the caller, so the argument
it wants is `../backtick/benchmarks/js-framework-benchmark/frameworks` — which
the script works out rather than asking anyone to remember.

Three sharp edges it doesn't paper over. A framework directory without
`package-lock.json` is skipped in silence — absent from `/ls`, and the driver
then reports nothing at all. `--framework` matches `keyed/<name>` by exact
equality, not by prefix. And the server scans `keyed` _and_ `non-keyed`,
failing if either is missing, which is why an empty `non-keyed/` is checked in.
