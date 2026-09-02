# cardputer

A backtick client for the M5Stack Cardputer ADV, written in C++.

Not a workspace member and not built by `pnpm` — native code keeps its own
toolchain, for the reason the benchmark frameworks do. The one exception is
`app/`, which is where an app is written and so wants the repo's compiler.

## Flashing it

```sh
make flash                              # plug the device in first
make flash PORT=/dev/cu.usbmodem1101    # where it needs telling which port
```

That builds `app/src/app.tsx` into a bundle, builds the firmware around it, and
writes it. Change the app, run it again.

Needs ESP-IDF at `~/esp/esp-idf` (or `IDF_PATH` set) and Homebrew's `cmake` and
`ninja`.

## Writing an app

`app/src/app.tsx`. It is an ordinary backtick value script that answers with a
drawing:

```tsx
export default cs`{
  const count = $state(0);
  if ($key() === ";") { count.write(count.read() + 1); }
  return <string x={120} y={60} datum="middle-centre">{count.read()}</string>;
}`;
```

Two things are different from the web, and both come from the device.

**Input is read, not delivered.** There is no pointer, so there are no handler
props. `$key()` is what was pressed since the last drawing, and an app that
wants to act on one does it while working out what to draw. The script runs
again whenever a key arrives or something it holds changes.

**Nothing is laid out.** A 240×135 panel has no box model behind it, so every
element carries where it goes. An app that wants a column writes one.

What you can draw is `packages/cardputer-schema` — one element per M5GFX call:
`<string>`, `<rect>`, `<circle>`, `<ellipse>`, `<line>`, `<triangle>`,
`<pixel>`, `<arc>`. Filled or outlined is a `fill` prop rather than two tags.
Beside them: `screenWidth`, `screenHeight`, `textWidth`, `key`, `millis`,
`battery`.

## Seeing it without the device

```sh
cd app && pnpm build      # the app to a bundle
cd .. && make preview     # what the screen would show
make preview ARGS=';'     # …with a key pressed
```

`preview` prints the drawing as markup, so a change to an app is a diff rather
than a flash cycle.

## Testing it

```sh
make test       # the 112 fixtures, on this machine
make headless   # the same client on an emulated ESP32-S3
```

`make test` runs the checked-in fixtures from `tests/test/fixtures/valid`: each
is a `.bundle` this evaluates and a `.value` holding what the reference client
produced. Agreeing with that file, case by case, is what working means — there
is no expectation written here to drift from it.

`make headless` builds a variant with no M5 linked at all and runs it under
QEMU. That is the only build an emulator can run: QEMU has no panel, no I²C and
no ADC, so M5Unified's global constructor never returns there. It prints the
drawing instead of painting it, which checks everything on the real chip except
the pixels.

## What is here

```
src/         the client: a JSON reader, the value model, the interpreter,
             the language's builtins. Compiled by both builds.
test/        the fixture runner and the preview tool, host only.
firmware/    the ESP-IDF project: the renderer, the keyboard, the loop.
app/         where an app is written, and the script that bundles it.
```

## How it works

The device runs no JavaScript. A bundle is an AST as plain data, and this walks
it — which is what `packages/bundler/src/bundle/Bundle.ts` says it is for:

> These types are the contract an interpreter implements: evaluate `root`
> against the `functions` table. Computation ships as ASTs, so nothing here
> needs a JavaScript parser.

Two guarantees from that file are why the C++ is small. `undefined` never
arises, so there is one absent value rather than two. And every node carries
every field it declares, so a reader takes a slot by position and never asks
whether it is there.

**Redrawing is running the bundle again.** There is no reactive graph: a cell
being written bumps a counter, and the loop redraws when it moves. What makes
that safe is `state` handing back the cell it handed back last time — the Nth
`state` of one run is the Nth of the next, which the format guarantees by
making evaluation deterministic.

## Measured, on an emulated ESP32-S3

|                           |                                   |
| ------------------------- | --------------------------------- |
| Free heap at boot         | 383 KB                            |
| The example app's bundle  | 2.0 KB                            |
| Its tree, parsed          | ~25 KB for a 5.5 KB bundle        |
| Free after three drawings | 340 KB                            |
| Firmware                  | 604 KB, 42% of the partition free |

The device has 512 KB of SRAM and no PSRAM, which was the number the whole
design had to answer to. It is not tight.
