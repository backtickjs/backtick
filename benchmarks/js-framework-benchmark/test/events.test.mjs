import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { pathToFileURL } from "node:url";
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
// What is drawn is the app's own `bundle.js` — the same bundle its page
// carries — so the app has to be built first: `npm run build-prod` in its
// directory, or `pnpm build` from the root.

const here = new URL("./", import.meta.url).pathname;
const snapshots = join(here, "snapshots");
const bundled = join(
  here,
  "..",
  "frameworks",
  "keyed",
  "backtick",
  "dist",
  "bundle.js",
);

if (!existsSync(bundled)) {
  throw new Error(
    `no bundle at ${bundled} — build the app first:\n\n` +
      `  cd frameworks/keyed/backtick && npm run build-prod\n`,
  );
}
mkdirSync(snapshots, { recursive: true });
const { bundled: bundle } = await import(pathToFileURL(bundled).href);

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
