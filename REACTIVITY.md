# Handing the reactivity to Solid

Where the migration stands, what it would delete, and the order to do it in.
Written after a spike and one failed attempt, so the traps are recorded rather
than rediscovered.

## Why

`interpret.ts` grew roughly 200 lines of hand-rolled reactivity: dependency
tracking, subscription lifetime, invalidation, and a skip that had to know what
a write could affect. It works and it is fast, but it produced a real bug — a
child handed another instance's cell kept stale values through a write, because
a cell handle is one object whatever its cell holds, so "nothing I was given is
different" was not the same as "nothing I draw is". That class of bug is what a
mature dependency graph exists to prevent.

The renderer is a different story: two spikes (snabbdom, and a reading of
VanJS/Sinuous/Voby/dom-expressions) both said keep ours, because it is fed two
things a general renderer can't know — which subtrees the interpreter says are
unchanged, and which element shapes repeat. **This is about the graph, not the
DOM.**

## What the spike proved

`packages/web-sdk/solid-spike.mjs` models our shape on Solid's primitives:
instance → owner, cell → signal, prop → render effect, children → `mapArray`.

- The stale-child case is **correct by construction**. A row reading a cell in a
  prop _and_ in a branch updates both, declaring nothing.
- Updates are already fine-grained: selecting a row re-ran three effects, not the
  list, not the other rows.
- Disposal is the owner's: after `dispose()`, further writes did nothing at all.
  No unregistering, no pruning.
- `mapArray` keeps per-row owners across a removal, which is the keyed identity
  we hand-rolled.

## Two traps, both cost a cycle

- **Node resolves Solid's server build**, where reactivity is inert — initial
  effects run and updates silently do nothing. Import `solid-js/dist/solid.js`
  in anything that runs under Node, including test harnesses.
- **`createEffect` is deferred.** DOM writes want `createRenderEffect`, which
  runs synchronously and matches our synchronous host.
- **The content has to be a `createMemo`, not an effect** (found doing step 2,
  and the reason the design below says effect where the code says memo). A write
  made from inside a computation is only _queued_ — `runUpdates` sees it is
  already in a cycle and returns without flushing — so a parent that sets a
  child's slots and then reads the child's element gets the element from before
  the write. A memo has no such gap: reading a stale one recomputes it on the
  spot. `apply` embeds what the child drew, so it must read, and the whole
  design rests on that being current.

## The design

1. **Slots become a signal.** A parent handing new arguments is currently a
   manual `render(instance)` call, and a Solid computation cannot be re-run by
   hand. With `instance.slots` as a signal, the content re-runs by itself — this
   is what lets `render()` stop being called from outside, and it is the piece
   that isn't obvious until you try it.
2. **The content becomes one `createRenderEffect`.** Whatever it reads, it
   re-runs for; a structural change _is_ that re-run.
3. **Each dynamic prop becomes a nested `createRenderEffect`** that writes
   `element.props[prop]` and emits `{kind: "prop"}`. Nested under the content's
   computation, so re-rendering disposes them rather than leaving them watching.
4. **Keep `same()` and the closure memo.** The skip becomes "don't set the slots
   signal when the arguments are equal" — one comparison, same benefit, none of
   the re-render machinery.

The prop effect, which is the whole of step 3:

```ts
createRenderEffect(() => {
  const value = evaluateExpr(bundle, expr, slots, null, instance);
  if (built.props[prop] === value) return;
  built.props[prop] = value;
  instance?.notify?.({ kind: "prop", element: built, prop, value });
});
```

## What deletes

`PropBinding`, `Pending`, `track`, `computing`, `rendering`, `watchers`,
`structural`, `reads`, `writing`, `made`, `forget`, `watching`, `cellName`,
`numbered`, and the branch in `write` that chooses between refreshing props and
re-rendering. Around 200 lines, and with them the conditions that had to be
correct for the skip to be safe.

## Steps 1–2 are measured

Cells as signals and instances as owners (`createRoot`) landed and benchmarked —
column `solid` in `runs.html`, against `b2bc5df`:

|           |        ours |       solid |          |
| --------- | ----------: | ----------: | -------: |
| create 1k |        37.6 |        37.7 |       0% |
| update    |        28.0 |        27.5 |      −2% |
| select    |         7.0 |         7.5 |      +7% |
| swap      |        23.3 |        23.5 |      +1% |
| memory    |      5.9 MB |      6.1 MB |      +3% |
| **size**  | **26.8 KB** | **32.1 KB** | **+20%** |

CPU is a wash. The payload is the cost: +5 KB puts us at 0.94× svelte on a
column we were winning at 0.78×. **Nothing deleted at this step** — props are
still evaluated in our render loop, so the tracking machinery is all still
there. This column is the price without the benefit, which is why the decision
belongs to the column after steps 3–4.

## The decision rule

If steps 3–4 land and CPU stays flat, the trade is **5 KB for deleting the
machinery that caused the stale-child bug**, and it is worth taking. If those
lines do not actually delete — if an adapter grows beside them instead — revert
and lose nothing but a dependency.

## Steps 3–4 are measured, and the rule is met

Prop effects, slots as a signal, and the content as a memo landed — column
`graph` in `runs.html`, against `b2bc5df` and the steps 1–2 column:

|             |        ours |   solid 1–2 |  solid 3–4 |          |
| ----------- | ----------: | ----------: | ---------: | -------: |
| create 1k   |        37.6 |        37.7 |       34.4 |      −9% |
| create 10k  |       364.2 |       371.1 |      343.6 |      −6% |
| replace 1k  |        40.9 |        40.8 |       38.4 |      −6% |
| update      |        28.0 |        27.5 |       28.1 |       0% |
| select      |         7.0 |         7.5 |        8.4 |     +20% |
| swap        |        23.3 |        23.5 |       23.9 |      +3% |
| remove      |        15.3 |        15.3 |       14.9 |      −3% |
| **clear**   |    **30.4** |    **31.1** |   **12.7** | **−58%** |
| memory      |      5.9 MB |      6.1 MB |     7.2 MB |     +23% |
| **cleared** | **24.9 MB** | **25.8 MB** | **1.2 MB** | **−95%** |
| size        |     26.8 KB |     32.1 KB |    32.3 KB |     +21% |

CPU did not merely stay flat: six of nine are faster, because a re-render now
builds a computation per prop where it used to build a `Pending` per prop and
a binding besides.

**The two bold rows are the machinery being gone rather than replaced.** Every
`PropBinding` a row built was registered in the Set on the instance that owned
the cell, and only the instance that _made_ it could take it out again — so a
row built by a script, which never re-renders, was held by its parent forever.
That is what 24.9 MB after a clear was. An owner drops what it made without
being asked, so it is 1.2 MB now, and clearing eight tables is 12.7 ms instead
of 30.4.

`select` is the one that costs: +1.4 ms, from a thousand render effects being
run where a thousand bindings were refreshed. Payload is +0.2 KB on top of the
steps 1–2 column — the graph was the price, and steps 3–4 were nearly free.

## Order to do it in, and why

A scripted attempt failed by cutting too coarsely: the range holding the
tracking globals also holds `evaluate`, `whileNotifying`, `notifying` and
`rendering`, so removing it in one pass broke the module. Delete from the leaves
inwards, building after each:

1. prop effects (step 3) — verify the nine checks
2. `PropBinding`, `Pending`, `track`
3. the instance fields: `watchers`, `structural`, `reads`, `made`
4. the module globals **last**, one at a time — they are interleaved with code
   that stays

Then slots-as-a-signal (step 1) and the content effect (step 2), which is where
`render()` stops being called from outside.

## Verifying

- the nine driver assertions, replayed directly:
  `scratchpad/correctness.mjs` — same selectors and warmup counts as
  `webdriver-ts`, seconds rather than minutes
- the stale-child case, which no existing test covers: a child handed a cell,
  reading it in a prop, a text child, and a branch. **This belongs in
  `packages/e2e/test/fixtures/valid/` before the migration, not after** — it is
  the only test that would have caught the bug, and the only one that will catch
  it coming back.
- `pnpm run bench keyed/backtick`, then a column in `runs.html`

It went in first, as `local-state-child-reads.tsx`, and it earned its place:
against the pre-`b2bc5df` skip it fails with both rows entirely stale, and it
is the only one of the eight state tests that does. The migration then made it
pass by construction — nothing recorded what a child read, and it still redraws.

`isKeyed` is worth more than it looks. It asserts node identity across create,
remove and swap in a real browser, which is the half `*.value` snapshots cannot
see.

## One thing the graph changed that the host can see

A write used to be one `shape`, because the instance that _owned_ the cell was
the one that re-rendered and everything under it came along. Now each reader
re-runs on its own, so a cell that two children read is two re-runs — and,
told straight through, two `shape` events for one write. The host redraws from
the root either way, so the second is a redraw of a tree that is already right.

`write` gathers what moved and says it once at the end, which keeps the
contract the hosts were written against. `local-state-child-reads.tsx` pins it:
two rows redraw, one `shape`.

## Not done

- `scratchpad/correctness.mjs` isn't in the tree — the nine assertions were
  verified through `isKeyed` and the driver run instead.
- The rows a script builds are still never disposed: `instantiate` roots them,
  and nothing holds them to drop them. It no longer _retains_ them, which is
  what the cleared-memory row above is, but a `select` still runs every effect
  that ever subscribed. That is the +20%, and it is the next thing to look at.

## Should the renderer be replaced at the same time?

Asked about pairing this with swapping `dom.ts` for uhtml. Coherent in
principle, and the wrong move now.

**They overlap.** uhtml's value is that it remembers where the dynamic holes are
and updates those. A Solid render effect updates exactly the dynamic props. Adopt
both and every attribute has two mechanisms that could write it: wrap the
template call in an effect and the per-prop effects are pointless, or keep the
per-prop effects and the holes are. Half of whichever you added is dead weight.

**The fit is real where it exists.** uhtml caches templates by the identity of
the statics array, and we already have the right key — the `shape` field on
`Element`, the `BundleElement` it was evaluated from, which is what the prototype
cache in `dom.ts` already uses. A statics array generated per shape is a genuine
possibility rather than a hack, and it is the statics/dynamics model ranked first
in `RESEARCH.md`.

**Followed through, it arrives at dom-expressions.** Solid signals, templates
cloned per shape, holes patched by effects — that is Solid's own renderer. If
that is the destination, take `template`/`insert`/`reconcileArrays` rather than
rebuilding them from uhtml and glue, remembering that dom-expressions is a
compile target and driving it at runtime cuts against its grain.

**Sequencing.** Every column in `runs.html` isolates one change; that is how
matching instances by key showed up as fixing `remove` and regressing `clear`,
and how the snabbdom spike gave a clean 8%. Two migrations in one column and
nobody can say whether +20% payload came from the graph or the renderer, or
whether a win in one hid a loss in the other.

**So:** finish the reactivity migration alone — `dom.ts` needs no changes for it,
because the change stream is already the interface. Then ask the renderer a
sharper question: with effects owning updates, does it still do anything Solid
doesn't? Likely two things — building nodes (cloning, measured at −11%) and
reconciling keyed lists. If that is all that remains it will be ~200 lines, and
the swap is worth pricing then, with numbers instead of a guess.

**One cost specific to us:** uhtml means the web renderer speaks HTML strings
where every other target speaks elements. That is a per-target choice and
allowed, but it moves the web client further from the shared vocabulary — and it
does not fix the attribute semantics worth borrowing. The `on`-prefix and
`aria-` guesses in `applyProps` would become uhtml's conventions to map onto,
not conventions to inherit.

## State now

Last commit `d5ec29e`. The migration is done and uncommitted: `interpret.ts` is
−122 lines net (235 out, 113 in), `dom.ts` is untouched — the change stream was
the interface, as expected. The whole suite passes (354 tests), `isKeyed`
classifies, and the `graph` column is in `runs.html`.

New beside it: `src/solid.d.ts`, which types `solid-js/dist/solid.js` by
borrowing from the name the package does type, and
`fixtures/valid/local-state-child-reads.tsx` with two tests over it in
`state.test.ts`.

Still uncommitted from before: `snabbdom` in `web-sdk`, untracked
`src/client/snabbdom.ts`, `solid-spike.mjs`, `RESEARCH.md`, this file.
`git checkout packages/` returns to pre-Solid, and now throws away the
migration with it.
