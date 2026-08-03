import assert from "node:assert/strict";

// The benchmark's CPU cases, as `webdriver-ts/src/benchmarksPuppeteer.ts`
// defines them: nine of them, each a `setUp` the driver does first and a `run`
// it measures. Upstream's checks are kept — they are what says the app did the
// thing rather than nothing — with the row counts and indices it uses.
//
// Only `run` is recorded. What `setUp` costs is the benchmark's preparation,
// and a snapshot of it would be a snapshot of five warmups.

const WARMUP = 5;
const ROW = (n) => `tbody>tr:nth-of-type(${n})`;
const ID = (n) => `${ROW(n)}>td:nth-of-type(1)`;
const LABEL = (n) => `${ROW(n)}>td:nth-of-type(2)>a`;
const REMOVE = (n) => `${ROW(n)}>td:nth-of-type(3)>a>span:nth-of-type(1)`;

// A thousand rows and then none, `count` times over: what most of the cases
// warm up with, so that what they measure is not the first of anything.
function cycle(driver, count) {
  for (let at = 0; at < count; at++) {
    driver.click("#run");
    assert.equal(driver.text(ID(1)), String(at * 1000 + 1));
    driver.click("#clear");
    assert.ok(!driver.exists(ROW(1000)));
  }
}

export const cases = [
  {
    id: "01_run1k",
    label: "create rows",
    measured:
      "click #run, with a thousand rows drawn and cleared five times first",
    setUp: (driver) => cycle(driver, WARMUP),
    run: (driver) => driver.click("#run"),
    check: (driver) => {
      assert.equal(driver.text(ID(1000)), String((WARMUP + 1) * 1000));
    },
  },
  {
    id: "02_replace1k",
    label: "replace all rows",
    measured: "click #run over a table that already holds a thousand rows",
    setUp: (driver) => {
      for (let at = 0; at < WARMUP; at++) {
        driver.click("#run");
        assert.equal(driver.text(ID(1)), String(at * 1000 + 1));
      }
    },
    run: (driver) => driver.click("#run"),
    check: (driver) => {
      assert.equal(driver.text(ID(1)), String(WARMUP * 1000 + 1));
    },
  },
  {
    id: "03_update10th1k",
    label: "partial update",
    measured: "click #update, which appends ` !!!` to every tenth row's label",
    setUp: (driver) => {
      driver.click("#run");
      assert.ok(driver.exists(ROW(1000)));
      for (let at = 0; at < 3; at++) {
        driver.click("#update");
        assert.ok(driver.text(LABEL(991)).endsWith(" !!!".repeat(at + 1)));
      }
    },
    run: (driver) => driver.click("#update"),
    check: (driver) => {
      assert.ok(driver.text(LABEL(991)).endsWith(" !!!".repeat(4)));
    },
  },
  {
    id: "04_select1k",
    label: "select row",
    measured: "click a row's label, with another row already selected",
    setUp: (driver) => {
      driver.click("#run");
      assert.equal(driver.text(ID(1000)), "1000");
      driver.click(LABEL(5));
      assert.ok(driver.hasClass(ROW(5), "danger"));
      assert.equal(driver.count("tbody>tr.danger"), 1);
    },
    run: (driver) => driver.click(LABEL(2)),
    check: (driver) => {
      assert.ok(driver.hasClass(ROW(2), "danger"));
      assert.equal(driver.count("tbody>tr.danger"), 1);
    },
  },
  {
    id: "05_swap1k",
    label: "swap rows",
    measured: "click #swaprows, which exchanges the second row and the 999th",
    setUp: (driver) => {
      driver.click("#run");
      assert.ok(driver.exists(ROW(1000)));
      for (let at = 0; at <= WARMUP; at++) {
        driver.click("#swaprows");
        assert.equal(driver.text(ID(999)), at % 2 === 0 ? "2" : "999");
      }
    },
    run: (driver) => driver.click("#swaprows"),
    check: (driver) => {
      assert.equal(driver.text(ID(999)), WARMUP % 2 === 0 ? "999" : "2");
      assert.equal(driver.text(ID(2)), WARMUP % 2 === 0 ? "2" : "999");
    },
  },
  {
    id: "06_remove-one-1k",
    label: "remove row",
    measured: "click the fourth row's remove icon",
    setUp: (driver) => {
      driver.click("#run");
      assert.ok(driver.exists(ROW(1000)));
      // Upstream removes its way down to the fourth row, so the row the
      // measured click removes is one that has rows above it and below it.
      for (let at = 0; at < WARMUP; at++) {
        const row = WARMUP - at + 4;
        assert.equal(driver.text(ID(row)), String(row));
        driver.click(REMOVE(row));
      }
      driver.click(REMOVE(6));
    },
    run: (driver) => driver.click(REMOVE(4)),
    check: (driver) => {
      assert.equal(driver.text(ID(4)), String(4 + WARMUP + 1));
    },
  },
  {
    id: "07_create10k",
    label: "create many rows",
    measured: "click #runlots, for ten thousand rows",
    setUp: (driver) => cycle(driver, WARMUP),
    run: (driver) => driver.click("#runlots"),
    check: (driver) => {
      assert.ok(driver.exists(`${ROW(10000)}>td:nth-of-type(2)>a`));
    },
  },
  {
    id: "08_create1k-after1k",
    label: "append rows to large table",
    measured: "click #add, over a table that already holds a thousand rows",
    setUp: (driver) => {
      cycle(driver, WARMUP);
      driver.click("#run");
      assert.ok(driver.exists(ROW(1000)));
    },
    run: (driver) => driver.click("#add"),
    check: (driver) => {
      assert.ok(driver.exists(ROW(2000)));
    },
  },
  {
    id: "09_clear1k",
    label: "clear rows",
    measured: "click #clear, over a table that holds a thousand rows",
    setUp: (driver) => {
      cycle(driver, WARMUP);
      driver.click("#run");
      assert.equal(driver.text(ID(1)), String(WARMUP * 1000 + 1));
    },
    run: (driver) => driver.click("#clear"),
    check: (driver) => {
      assert.ok(!driver.exists(ROW(1000)));
    },
  },
];
