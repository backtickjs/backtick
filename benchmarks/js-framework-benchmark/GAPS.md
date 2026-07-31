# js-framework-benchmark — what backtick can't do yet

Stefan Krause's [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark)
implemented in backtick as far as the framework currently reaches, and a record
of every wall it hit. The point is not the numbers — backtick can't yet run the
official driver, so nothing here is comparable to the published results. The
point is that each operation the benchmark asks for either works, works
expensively, or can't be written at all, and that sorts the work.

```sh
pnpm build && pnpm bench   # times every operation, no browser needed
pnpm start                 # the app at :5180, for profiling by hand
```

`bench` bundles the app, evaluates it with the same interpreter every client
runs, and drives the operations by calling the handlers the benchmark's driver
would click. It reports interpreter time and `elements rebuilt` — the number of
elements the host is handed after the operation, which on the web client is the
number of DOM nodes it recreates.

## Where it stands

Measured on this machine, 2026-07-30, median of 5, `REPEATS=5 pnpm bench`:

```
bundle        449 KB of JSON
startup       2.33 ms to evaluate, 15 elements

operation                           interpreter   elements rebuilt
--------------------------------------------------------------------
create rows (1k)                    8.37 ms       4,015
replace all rows (1k)               7.68 ms       4,015
partial update (every 10th of 1k)   4.09 ms       4,015
select row (of 1k)                  4.00 ms       4,015
swap rows (of 1k)                   3.75 ms       4,015
remove row (of 1k)                  3.78 ms       4,011
create many rows (10k)              82.42 ms      40,015
append rows (1k to 10k)             43.94 ms      44,015
clear rows (10k)                    0.05 ms       15
```

Read the last column first. Selecting a row changes one row's colour and hands
the host 4,015 elements. That ratio, not the milliseconds, is the finding.

## The one deliberate deviation

The benchmark's `create` generates its 1,000 rows on the spot. A script here
reaches no globals — no `Math.random()` — and has no way to grow an array, so
the app generates a pool of 11,000 rows on the server and the client slices it
(gaps E and F below). Slicing still builds a real array and renders it, so what
the operations cost to _draw_ is measured honestly; what generating rows costs
is not measured at all, and the 449 KB bundle is the pool riding along as data.

## Gap register

| #                    | Gap                                                           | Evidence                                                                                                    | Blocks                                                                                     |
| -------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **A** Reconciliation | The web client replaces every node on every change            | `web-client/src/dom.ts` — `renderInto` is `container.replaceChildren(...)`                                  | Every operation's DOM time; select/swap/remove worst                                       |
| **B** Re-render      | A `write` re-renders the whole owning instance                | `js-interpreter/src/interpret.ts` — `write` calls `render(instance)`                                        | Interpreter time scales with the table, not the change                                     |
| **C** Keyed identity | Child instances are reused **by position**, not by key        | Probe: click b twice, drop the row above it, and the count stays on the slot — `b:2 c:1` became `b:0 c:2`   | The benchmark's keyed category; also a latent bug for stateful rows                        |
| **D** Keys + splices | A keyed element can't be spliced into a script                | Bundler: _"Can't splice a keyed component into a script"_                                                   | Rows built from client data can't carry keys at all                                        |
| **E** Globals        | Scripts reach no globals — no `Math`, `Date`, `Array`, `JSON` | `interpret.ts` — identifiers resolve only from scope; _"there are no globals"_                              | Client-side row generation; forced the server pool                                         |
| **F** Array surface  | Pure operations only: no `push`, `splice`, index assignment   | `cs-runtime/src/ClientArray.ts`                                                                             | `swap` is an O(n) `map` rebuild where others pay O(1)                                      |
| **G** DOM semantics  | No table/button elements, no `id` or `class` props            | Components render `div`/`span`/`img`/`a`; only `testID` → `data-testid`                                     | The official driver, whose selectors are `#run`, `tbody>tr:nth-child(n)>td:nth-child(2)>a` |
| **H** Interactive    | No `Button`; `Link` takes `href` but no `onPress`             | `core/src/components/Link.ts`                                                                               | Buttons are `div`s and the row's select/remove links are `span`s                           |
| **I** Splice types   | An `interface` doesn't satisfy `SpliceableValue`              | `state(rows)` with `interface Row` — _"not assignable to SpliceableValue"_; the same type as an alias works | Ergonomics: `interface` is what a user reaches for first                                   |

## Suggested order

1. **C and D** first. They are correctness, not speed: a list whose children
   hold state today attributes that state to the wrong child as soon as the list
   changes shape. Everything else is a number that improves; this is a wrong
   answer. Keyed reuse also has to exist before the benchmark's keyed category
   means anything.
2. **A**, then **B**. A is where the orders of magnitude are — the host recreates
   the table to repaint one row. B is the same shape one layer up, and is
   visible in the table above without a browser, which makes it the easier of
   the two to iterate against.
3. **E and F**. Until scripts can generate and mutate arrays, `create` and `swap`
   aren't backtick's own answers, they're the server's.
4. **G and H**. These don't move any number — they're what lets the official
   driver run at all, so the results become comparable rather than indicative.
5. **I** whenever convenient.

## What this harness does not measure

DOM time, layout, paint, memory, and startup — the benchmark's own metrics —
all need a browser and the official driver, which needs G. Interpreter time is a
floor: it's what every client pays before it draws anything.
