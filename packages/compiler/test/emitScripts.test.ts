import assert from "node:assert";
import { describe, it } from "node:test";
import { emitScripts } from "@backtickjs/compiler";
import { originalPositionFor, TraceMap } from "@jridgewell/trace-mapping";
import ts from "typescript";

const host = "const script = cs`1 + 1`;";

describe("emitScripts", () => {
  it("emits each script as an expression, mapped into the host file", () => {
    const [script] = emitScripts(ts, "host.tsx", host);
    assert.strictEqual(script?.code, "() => 1 + 1");
    const map = new TraceMap(script!.map);
    assert.strictEqual(map.sourcesContent, undefined);
    assert.deepStrictEqual(
      originalPositionFor(map, { line: 1, column: "() => ".length }),
      { source: "host.tsx", line: 1, column: host.indexOf("1 + 1"), name: null },
    );
  });
});
