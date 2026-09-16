import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { render, screen } from "@backtickjs/web-testing";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import type { BacktickElement } from "@backtickjs/core";

// A bundle written into a page's `<script>`, which must not end it early.
const validDir = join(fixturesRoot, "valid");
const importFixture = createFixtureLoader("stringify");
const text = `& < > " ' </script> <!-- -->`;

describe("bundler.stringify", () => {
  it("writes no `<` a script's parser could read", async () => {
    const bundle = await bundler.run(
      await importFixture(validDir, "script-close-text.tsx"),
    );
    // The text is in there to escape, or this proves nothing.
    assert.ok(JSON.stringify(bundle).includes("</script>"));
    assert.ok(!bundler.stringify(bundle).includes("<"));
  });

  it("parses back to the same bundle", async () => {
    const bundle = await bundler.run(
      await importFixture(validDir, "script-close-text.tsx"),
    );
    assert.deepEqual(JSON.parse(bundler.stringify(bundle)), bundle);
  });

  it("draws the text as written", async () => {
    await render(
      await importFixture<BacktickElement>(validDir, "script-close-text.tsx"),
    );
    assert.ok(screen.getByText(text));
  });
});
