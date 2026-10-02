import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getBacktickLanguagePlugin } from "@backtickjs/language-plugin";
import { decorateLanguageService } from "@backtickjs/language-service";
import { createLanguage, FileMap } from "@volar/language-core";
import {
  createProxyLanguageService,
  decorateLanguageServiceHost,
  resolveFileLanguageId,
} from "@volar/typescript";
import ts from "typescript";

// What an editor gets for a file with scripts in it: a language service built
// the way the tsserver plugin builds one, over the files on disk.
function languageServiceFor(fileName: string): ts.LanguageService {
  // Read from disk rather than through the host, which the language decorates
  // below to answer from itself.
  const snapshotOf = (name: string) =>
    ts.sys.fileExists(name)
      ? ts.ScriptSnapshot.fromString(ts.sys.readFile(name)!)
      : undefined;
  const host: ts.LanguageServiceHost = {
    getScriptFileNames: () => [fileName],
    getScriptVersion: () => "1",
    getScriptSnapshot: (name) => snapshotOf(name),
    getCurrentDirectory: () => import.meta.dirname,
    getCompilationSettings: () => ({
      strict: true,
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      target: ts.ScriptTarget.ESNext,
      skipLibCheck: true,
      types: [],
      jsx: ts.JsxEmit.ReactJSX,
      jsxImportSource: "@backtickjs/solid-js",
    }),
    getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    directoryExists: ts.sys.directoryExists,
    getDirectories: ts.sys.getDirectories,
    realpath: ts.sys.realpath,
  };
  const language = createLanguage<string>(
    [
      getBacktickLanguagePlugin<string>(ts, (name) => name),
      { getLanguageId: resolveFileLanguageId },
    ],
    new FileMap(ts.sys.useCaseSensitiveFileNames),
    (name) => {
      const snapshot = snapshotOf(name);
      if (snapshot) {
        language.scripts.set(name, snapshot);
      } else {
        language.scripts.delete(name);
      }
    },
  );
  decorateLanguageServiceHost(ts, language, host);
  const { proxy, initialize } = createProxyLanguageService(
    ts.createLanguageService(host),
  );
  initialize(language);
  return decorateLanguageService(proxy, language);
}

const fixture = join(import.meta.dirname, "fixtures", "splices.ts");
const source = readFileSync(fixture, "utf8");
const service = languageServiceFor(fixture);

// Where `text` starts in the fixture, plus `offset`.
const at = (text: string, offset = 0) => {
  const index = source.indexOf(text);
  assert.notEqual(index, -1, `${text} is in the fixture`);
  return index + offset;
};

// What hovering shows at `offset` into the first `text` in the fixture.
const hover = (text: string, offset: number) =>
  ts.displayPartsToString(
    service.getQuickInfoAtPosition(fixture, at(text, offset))?.displayParts,
  );

// What the virtual code wraps a splice in, which hover must not show.
const wrapper = /\bcs\b|splice|lift/;

describe("a splice in the editor", () => {
  it("hovers as the value spliced, not as the splice", () => {
    // On the name, what was spliced.
    assert.equal(hover("$count`", 1), "const count: 1");
    // On the sigil, nothing: not the `cs.splice(…)` the script is checked
    // with.
    assert.doesNotMatch(hover("$count`", 0), wrapper);
  });

  it("hovers a braced splice as the value spliced", () => {
    assert.equal(hover("${count}", 3), "const count: 1");
    assert.doesNotMatch(hover("${count}", 0), wrapper);
    assert.doesNotMatch(hover("${count}", "${count".length), wrapper);
  });

  it("hovers a braced splice's braces as nothing of the wrapper", () => {
    assert.doesNotMatch(hover("${count}", 1), wrapper);
    assert.equal(hover("${count}", 2), "const count: 1");
  });

  // A known gap: at the start of a script, the `cs.lift(…)` the script is
  // written in shows through.
  it.todo("hovers nothing of the wrapper at the start of a script", () => {
    assert.doesNotMatch(hover("$count + 1", 0), wrapper);
  });

  it("completes the host binding after the sigil", () => {
    // At the end of `$Po`: what the editor filters against the host's names,
    // and replaces, is `Po` alone, so accepting `Point` writes `$Point`.
    const completions = service.getCompletionsAtPosition(
      fixture,
      at("$Po", "$Po".length),
      {},
    );
    assert.ok(completions);
    assert.ok(completions.entries.some((entry) => entry.name === "Point"));
    assert.deepEqual(completions.optionalReplacementSpan, {
      start: at("$Po", 1),
      length: "Po".length,
    });
  });
});

const tagsFixture = join(import.meta.dirname, "fixtures", "tags.tsx");
const tagsSource = readFileSync(tagsFixture, "utf8");
const tagsService = languageServiceFor(tagsFixture);

// Where the `nth` `text` starts in the tags fixture, plus `offset`.
const inTags = (text: string, nth = 0, offset = 0) => {
  let index = -1;
  for (let i = 0; i <= nth; i++) {
    index = tagsSource.indexOf(text, index + 1);
    assert.notEqual(index, -1, `${text} #${nth} is in the fixture`);
  }
  return index + offset;
};

// The text each span covers, in the fixture.
const texts = (spans: readonly { textSpan: ts.TextSpan }[] | undefined) =>
  (spans ?? []).map(({ textSpan }) =>
    tagsSource.slice(textSpan.start, textSpan.start + textSpan.length),
  );

// A client component held on the host, used as a tag inside a script, is the
// host's binding to an editor: what it reaches, renames and colors as, whatever
// the virtual code writes the tag as.
//
// To do: the compiler's alias for a host tag answers for it instead (see the
// editor phase of `docs/markup-in-scripts.md`).
describe("a host tag in a script, in the editor", () => {
  const declaration = inTags("Card =");
  const cardTags = [
    inTags("<Card", 0, 1),
    inTags("<Card", 1, 1),
    inTags("</Card", 0, 2),
  ];

  it.todo("goes to the host binding's declaration", () => {
    for (const position of cardTags) {
      const definitions = tagsService.getDefinitionAtPosition(
        tagsFixture,
        position,
      );
      assert.deepEqual(
        definitions?.map(({ textSpan }) => textSpan.start),
        [declaration],
        `from ${position}`,
      );
    }
  });

  it.todo("renames the host binding and every tag naming it together", () => {
    for (const from of [declaration, inTags("</Card", 0, 2)]) {
      const locations = tagsService.findRenameLocations(
        tagsFixture,
        from,
        false,
        false,
        {},
      );
      assert.deepEqual(
        locations?.map(({ textSpan }) => textSpan.start).sort((a, b) => a - b),
        [declaration, ...cardTags],
        `from ${from}`,
      );
      assert.ok(texts(locations).every((text) => text === "Card"));
    }
  });

  it.todo("colors nothing in a comment above the tag", () => {
    const start = inTags("// a comment above the tag");
    const end = tagsSource.indexOf("\n", start);
    const { spans } = tagsService.getEncodedSemanticClassifications(
      tagsFixture,
      { start, length: end - start },
      ts.SemanticClassificationFormat.TwentyTwenty,
    );
    const inComment: string[] = [];
    for (let i = 0; i < spans.length; i += 3) {
      if (spans[i]! >= start && spans[i]! < end) {
        inComment.push(tagsSource.slice(spans[i], spans[i]! + spans[i + 1]!));
      }
    }
    assert.deepEqual(inComment, []);
  });

  it.todo("refuses a server component, under its tag", () => {
    const diagnostics = tagsService.getSemanticDiagnostics(tagsFixture);
    assert.deepEqual(
      diagnostics.map(({ start, length }) =>
        tagsSource.slice(start, start! + length!),
      ),
      ["Server"],
    );
    assert.equal(diagnostics[0]!.start, inTags("<Server", 0, 1));
  });
});

// A splice's host code is checked as the host's, where it is written: an
// `await` in a sync function is refused under the `await`.
describe("a splice's `await`, in the editor", () => {
  const fixture = join(import.meta.dirname, "fixtures", "awaits.ts");
  const source = readFileSync(fixture, "utf8");

  it("is refused under the `await`, in a sync function", () => {
    const diagnostics = languageServiceFor(fixture)
      .getSemanticDiagnostics(fixture)
      .filter(({ code }) => code === 1308);
    assert.deepEqual(
      diagnostics.map(({ start }) => start),
      [source.indexOf("await fetchGreeting")],
    );
  });
});
