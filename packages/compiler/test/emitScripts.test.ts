import assert from "node:assert";
import { describe, it } from "node:test";
import { emitScripts, type Plugin } from "@backtickjs/compiler";
import { addMapping, GenMapping, toEncodedMap } from "@jridgewell/gen-mapping";
import { originalPositionFor, TraceMap } from "@jridgewell/trace-mapping";
import ts from "typescript";

const host = "const script = cs`1 + 1`;";

describe("emitScripts", () => {
  it("emits each script as a module table's entry, mapped into the host file", () => {
    const [script] = emitScripts(ts, "host.tsx", host);
    assert.deepStrictEqual(script?.dependencies, []);
    assert.strictEqual(
      script?.code,
      [
        "(module, exports, require) => {",
        '"use strict";',
        'Object.defineProperty(exports, "__esModule", { value: true });',
        "exports.default = (() => 1 + 1);",
        "}",
      ].join("\n"),
    );
    const map = new TraceMap(script!.map);
    assert.strictEqual(map.sourcesContent, undefined);
    const lines = script!.code.split("\n");
    const line = lines.findIndex((text) => text.includes("1 + 1"));
    assert.deepStrictEqual(
      originalPositionFor(map, {
        line: line + 1,
        column: lines[line]!.indexOf("1 + 1"),
      }),
      {
        source: "host.tsx",
        line: 1,
        column: host.indexOf("1 + 1"),
        name: null,
      },
    );
  });
});

describe("a tag spliced, `<$Card>`", () => {
  it("is numbered where the script first reads it, among the splices", () => {
    const [script] = emitScripts(
      ts,
      "host.tsx",
      "const script = cs`<p>{$a}<$Card />{$b}</p>`;",
    );
    assert.match(
      script!.code,
      /\(\$splice0, \$tag1, \$splice2\) => <p>\{\$splice0\(\)\}<\$tag1 \/>\{\$splice2\(\)\}<\/p>/,
    );
  });
});

// A framework's compile step, as Solid's is: an import and a declaration of
// its own above the module it was given, which it maps column for column.
const plugin: Plugin = (code, id) => {
  const map = new GenMapping({ file: id });
  code.split("\n").forEach((line, index) => {
    for (let column = 0; column < line.length; column++) {
      addMapping(map, {
        generated: { line: index + 3, column },
        source: id,
        original: { line: index + 1, column },
      });
    }
  });
  return {
    code: `import { x } from "lib";\nconst y = x;\n${code}`,
    map: JSON.stringify(toEncodedMap(map)),
  };
};

describe("emitScripts with plugins", () => {
  it("compiles each script to a module table's entry, mapped into the host file", () => {
    const [script] = emitScripts(ts, "host.tsx", host, [plugin]);
    assert.deepStrictEqual(script?.dependencies, ["lib"]);
    // A CommonJS body: its import a `require`, its declarations scoped to it.
    assert.strictEqual(
      script?.code,
      [
        "(module, exports, require) => {",
        '"use strict";',
        'Object.defineProperty(exports, "__esModule", { value: true });',
        'const lib_1 = require("lib");',
        "const y = lib_1.x;",
        "exports.default = (() => 1 + 1);",
        "}",
      ].join("\n"),
    );
    const map = new TraceMap(script!.map);
    assert.strictEqual(map.sourcesContent, undefined);
    const lines = script!.code.split("\n");
    const line = lines.findIndex((text) => text.includes("1 + 1"));
    assert.deepStrictEqual(
      originalPositionFor(map, {
        line: line + 1,
        column: lines[line]!.indexOf("1 + 1"),
      }),
      {
        source: "host.tsx",
        line: 1,
        column: host.indexOf("1 + 1"),
        name: null,
      },
    );
  });
});
