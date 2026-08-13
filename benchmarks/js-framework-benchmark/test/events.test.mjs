import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { cases } from "./cases.mjs";
import { open } from "./driver.mjs";
import { matchFileSnapshot, render } from "./snapshot.mjs";

// What the benchmark's nine CPU cases ask a host to do, case by case.
//
// The app is `frameworks/keyed/backtick`, drawn by the interpreter every target
// runs — so this measures what the framework decides, without a browser to
// decide anything else. A snapshot is the stream of host operations one
// measured interaction costs: fewer of them is the whole of what an
// optimisation here is, and a case that starts asking for more has regressed
// whatever a run in Chrome happens to say that day.
//
// What is drawn is the app's `Main`, bundled by `bundle.tsx` beside this —
// here rather than in the app, because the app is what goes upstream. It has
// to be built first all the same: `npm run build-prod` in its directory, or
// `pnpm build` from the root.

const here = new URL("./", import.meta.url).pathname;
const snapshots = join(here, "snapshots");
mkdirSync(snapshots, { recursive: true });
const { bundle } = await import("./bundle.js");

for (const each of cases) {
  test(`${each.id} — ${each.label}`, () => {
    const driver = open(bundle);
    each.setUp(driver);
    // Only the click the benchmark times is recorded; what it took to get here
    // is setup.
    const events = driver.record(() => each.run(driver));
    each.check(driver);
    matchFileSnapshot(render(each, events), join(snapshots, `${each.id}.txt`));
  });
}
