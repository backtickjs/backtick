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

Build an implementation the way upstream requires of every one of them:

```sh
cd frameworks/keyed/svelte && npm install && npm run build-prod
```

Then, from this directory:

```sh
pnpm start              # the benchmark's server, serving *these* frameworks, on :8080
pnpm bench              # the real run, in another terminal
pnpm isKeyed            # the keyed classification check a run has to pass
pnpm checkCSP
pnpm results            # rebuild the results table
```

## The same cases, without a browser

```sh
pnpm test          # the nine CPU cases against test/snapshots
pnpm test:update   # rewrite the snapshots
```

A run in Chrome answers how long something took, which is a different question
from what the framework decided to do — and a noisy one: two runs a day apart
have read 2–7% apart with nothing between them but the machine. So the cases
are also driven headlessly, through the interpreter every target runs, against a
host of plain objects that writes down each of the ten operations it is asked
for. A snapshot is that stream, folded, for the one interaction the benchmark
measures.

What it is for is the half a duration cannot show. `04_select1k` says a
selection sets `class` on all thousand rows to move two of them;
`03_update10th1k` says a partial update builds a hundred rows from nothing
rather than replacing a hundred strings. Both are opportunities, and both are
also the guard: an optimisation lands as a count going down, and a regression
lands as one going up, whatever Chrome says that day.

The app has to be built first — `pnpm build` from the root, or `npm run
build-prod` in its directory — because what is drawn is its
`dist/bundle.js`.
Labels are `Math.random()`'s, so text is counted but never written down.

These are upstream's own scripts, and every argument reaches them untouched, so
their README applies verbatim — including that a framework is named
`keyed/svelte` rather than `svelte`, that naming none runs all of them, and that
a name written after `--benchmark` is swallowed by that flag.

```sh
pnpm bench keyed/svelte --benchmark 01_ --count 3
pnpm isKeyed keyed/svelte --headless true
```

`cli.mjs` forwards each command to the checkout and does nothing else. The one
exception is `start`: upstream's server serves its own `frameworks/` unless told
otherwise, and it resolves the directory it is given relative to its _own_ repo
root — so the argument it wants is
`../backtick/benchmarks/js-framework-benchmark/frameworks`, which the script
works out rather than asking anyone to remember.

Three sharp edges it doesn't paper over. A framework directory without
`package-lock.json` is skipped in silence — absent from `/ls`, and the driver
then reports nothing at all. `--framework` matches `keyed/<name>` by exact
equality, not by prefix. And the server scans `keyed` _and_ `non-keyed`,
failing if either is missing, which is why an empty `non-keyed/` is checked in.
