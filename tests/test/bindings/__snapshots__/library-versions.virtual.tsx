import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  bundler,
  ClientVersionMismatch,
  type Modules,
  supports,
} from "@backtickjs/bundler";
import { type ClientImport, cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
declare const { Button }: import("@backtickjs/core").ClientModule<typeof import("acme-ui")>;
declare const { Button: Button2 }: import("@backtickjs/core").ClientModule<typeof import("acme-ui-2")>;
import { evaluate } from "../evaluate.ts";

// acme-ui 1 and 2, both installed, the second under an alias, as
// `"acme-ui-2": "npm:acme-ui@2"` installs it: each typed against its own
// version, and each an import of `acme-ui`, the module clients provide. The
// server draws each client the one it has.
function save(modules: Modules) {
  return supports(modules, "acme-ui", "^2.0.0")
    ? cs.lift((() => (
        (void (Button2), (($Button2) => <$Button2 tone="primary" onClick={() => {}}>
          Save
        </$Button2>)(cs.splice((Button2))))
      ))())
    : cs.lift((() => (
        (void (Button), (($Button) => <$Button variant="primary" onClick={() => {}}>
          Save
        </$Button>)(cs.splice((Button))))
      ))());
}

const solid = {
  "solid-js": "1.9.14",
  "solid-js/store": "1.9.14",
  "solid-js/web": "1.9.14",
};

async function bundleFor(input: ReturnType<typeof save>, acme: string) {
  const built = await bundler.build({
    input,
    modules: { ...solid, "acme-ui": acme },
  });
  return built.generate({ format: "es" }).code;
}

describe("two installed versions of one package", () => {
  it("import from the module clients provide, each at its own version", () => {
    const [one, two] = [Button, Button2] as unknown as ClientImport<unknown>[];
    assert.deepEqual(
      [one!.from, one!.version, two!.from, two!.version],
      ["acme-ui", "1.0.0", "acme-ui", "2.0.0"],
    );
  });

  it("bundle each client the version it provides", async () => {
    const one = await bundleFor(save({ "acme-ui": "1.0.0" }), "1.0.0");
    assert.match(one, /from "acme-ui"/);
    assert.match(one, /variant: "primary"/);
    const two = await bundleFor(save({ "acme-ui": "2.1.0" }), "2.1.0");
    assert.match(two, /from "acme-ui"/);
    assert.match(two, /tone: "primary"/);
  });

  it("refuse a client the other version's import", async () => {
    await assert.rejects(
      bundleFor(save({ "acme-ui": "2.0.0" }), "1.0.0"),
      ClientVersionMismatch,
    );
  });

  it("draw what the client's own version draws", async () => {
    // The tests' client provides acme-ui 1.0.0: see `evaluate.ts`.
    render(await evaluate(() => save({ "acme-ui": "1.0.0" })));
    assert.equal(screen.getByRole("button").className, "primary");
    assert.ok(screen.getByText("Save"));
  });
});
