# js-framework-benchmark

Backtick's implementation for Stefan Krause's
[js-framework-benchmark](https://github.com/krausest/js-framework-benchmark),
and the runs measured with it.

```
src/            the implementation, built to dist/ as upstream expects one
runs/           results per commit measured, and runs/manifest.json listing them
runs.html       the table of those runs, written by `pnpm table`
```

## Running it

The driver, the static server, the CSS the pages link, and the results page all
live upstream. The first command below clones it into `js-framework-benchmark/`
at the commit pinned in `scripts/fetchJsFrameworkBenchmark.mjs`, installs its
server and driver, and links this app in as `frameworks/keyed/backtick`. Later
commands find it there and leave it alone.

The driver launches the system Chrome, at `/Applications/Google Chrome.app/…`
on macOS, so no browser is downloaded.

Build the implementation, then, from this directory:

```sh
pnpm build
pnpm start              # the benchmark's server, on :8080
pnpm bench              # the real run, in another terminal
pnpm isKeyed            # the keyed classification check a run has to pass
pnpm checkCSP
pnpm results            # rebuild upstream's results page
```

These are upstream's own scripts, and every argument reaches them untouched, so
their README applies verbatim — including that a framework is named
`keyed/backtick` rather than `backtick`, and that a name written after
`--benchmark` is swallowed by that flag. Naming none runs every framework
upstream has, none of which are built.

```sh
pnpm bench keyed/backtick --benchmark 01_ --count 3
pnpm isKeyed keyed/backtick --headless true
```

To measure a reference again, build it in the clone the way upstream builds
every framework:

```sh
cd js-framework-benchmark/frameworks/keyed/svelte && npm ci && npm run build-prod
```

## Adding a run

```sh
commit=$(git rev-parse --short HEAD)
mkdir -p runs/$commit
cp js-framework-benchmark/webdriver-ts/results/backtick-*.json runs/$commit/
# add it to runs/manifest.json, then:
pnpm table
```

Two sharp edges. `--framework` matches `keyed/<name>` by exact equality, not by
prefix. And the server lists a framework only when its directory has a
`package-lock.json`, which is why this app keeps one though pnpm installs it.
