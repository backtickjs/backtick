import assert from "node:assert";
import { describe, it } from "node:test";
import { type CodeTransform, emitScripts } from "@backtickjs/compiler";
import { originalPositionFor, TraceMap } from "@jridgewell/trace-mapping";
import ts from "typescript";

const host = "const script = cs`1 + 1`;";

describe("emitScripts", () => {
  it("runs each script's code through a transform", () => {
    const seen: Parameters<CodeTransform>[] = [];
    // Moves the code down a line, and says so in its map: the second line is
    // the first line of what it was given.
    const transform: CodeTransform = (code, id) => {
      seen.push([code, id]);
      const map = { version: 3, sources: [id], names: [], mappings: ";AAAA" };
      return { code: `\n${code}`, map: JSON.stringify(map) };
    };
    const [plain] = emitScripts(ts, "host.tsx", host);
    const [compiled] = emitScripts(ts, "host.tsx", host, transform);

    assert.deepStrictEqual(seen, [["() => 1 + 1", "host.tsx"]]);
    assert.strictEqual(compiled?.code, "\n() => 1 + 1");
    // Composed: where the transform's output starts is where the code it was
    // given starts, in the host file.
    const map = new TraceMap(compiled!.map);
    assert.strictEqual(map.sourcesContent, undefined);
    assert.deepStrictEqual(
      originalPositionFor(map, { line: 2, column: 0 }),
      originalPositionFor(new TraceMap(plain!.map), { line: 1, column: 0 }),
    );
  });
});
