# Benchmark baseline

What the driver measured before any reconciliation work, so a later run has
something to be compared against.

- **Recorded** 2026-08-01, from `webdriver-ts/results/*.json` in the upstream
  checkout, rendered at `webdriver-ts-results/dist/index.html`.
- **backtick** at commit `71ab0ec` — the benchmark app complete, every operation
  passing, and before keys could ride a splice. Chrome, headless, 15 iterations
  per CPU benchmark.
- **vanillajs** and **svelte** are from a run the day before (2026-07-31) on the
  same machine. Useful as scale, not as a controlled head-to-head: a different
  session means different background load.
- **Classification: non-keyed.** `isKeyed` fails all three of its tests — the
  renderer replaces the subtree on every state write, so no DOM node survives an
  update. The numbers below are what that costs.

## Duration — median of the total time, in milliseconds

| benchmark | backtick | vanillajs | svelte | backtick ÷ vanillajs |
| --- | ---: | ---: | ---: | ---: |
| create 1,000 rows | 44.7 ±0.7 | 21.2 ±0.2 | 22.9 ±0.2 | 2.11× |
| replace all 1,000 rows | 47.3 ±0.7 | 23.3 ±0.2 | 26.2 ±0.2 | 2.03× |
| partial update (every 10th, ×16) | 122.1 ±1.8 | 12.9 ±3.1 | 14.0 ±0.3 | 9.47× |
| select row | 124.2 ±1.9 | 3.3 ±2.3 | 6.0 ±1.2 | 37.64× |
| swap two rows | 120.4 ±2.7 | 14.2 ±0.5 | 16.4 ±0.5 | 8.48× |
| remove row | 59.9 ±1.0 | 11.5 ±1.5 | 12.5 ±1.2 | 5.21× |
| create 10,000 rows | 464.8 ±2.9 | 223.8 ±3.2 | 240.8 ±2.8 | 2.08× |
| append 1,000 to 1,000 (×2) | 78.9 ±1.1 | 24.9 ±0.3 | 26.3 ±0.6 | 3.17× |
| clear 1,000 rows (×8) | 12.3 ±0.4 | 10.1 ±0.9 | 12.2 ±0.4 | 1.22× |

Read `±` as the standard deviation across iterations.

## Memory — median, in megabytes

| measurement | backtick | vanillajs | svelte | backtick ÷ vanillajs |
| --- | ---: | ---: | ---: | ---: |
| ready memory | 0.6 | 0.6 | 0.6 | 1.12× |
| after 1,000 rows | 3.9 | 1.9 | 2.8 | 2.08× |
| after 1,000 rows and clear | 2.6 | 0.7 | 0.9 | 3.99× |

## Size and startup

| measurement | backtick | vanillajs | svelte | backtick ÷ vanillajs |
| --- | ---: | ---: | ---: | ---: |
| transferred, uncompressed | 20.6 | 11.3 | 34.3 | 1.82× |
| transferred, compressed | 4.8 | 2.5 | 12.2 | 1.92× |
| first paint | 106.6 | 80.7 | 115.0 | 1.32× |

Sizes are kilobytes and include the client, the bundle it draws, and the page.
The interpreter is most of it, and it is a fixed cost rather than one that grows
with the app.

## Reproducing

```sh
pnpm start                                    # upstream's server, on :8080
pnpm bench -- --framework keyed/backtick --headless true
pnpm results                                  # writes the table this was read from
```
