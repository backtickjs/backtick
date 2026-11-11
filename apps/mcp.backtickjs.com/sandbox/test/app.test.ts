import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import { installedPackages } from "@backtickjs/core/node";
import { compile } from "../src/compile.ts";
import { typecheck } from "../src/typecheck.ts";

// A counter app, as a model writes one from the service's starter.
const counter = readFileSync(
  join(import.meta.dirname, "fixtures/App.tsx"),
  "utf8",
);

const root = join(import.meta.dirname, "..");

// What a phone carrying the versions installed here sends.
const installed = installedPackages(root);
const phone = JSON.stringify({
  react: installed.react!,
  "react/jsx-runtime": installed.react!,
  "react-native": installed["react-native"]!,
  "react-native-safe-area-context":
    installed["react-native-safe-area-context"]!,
  "expo-router": installed["expo-router"]!,
});

// An app's `App.tsx`, in a directory of its own.
function write(name: string, source: string): string {
  const dir = join(root, ".builds", "test", name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "App.tsx"), source);
  writeFileSync(
    join(dir, "tsconfig.json"),
    `{ "extends": "../../../tsconfig.app.json" }`,
  );
  return join(dir, "App.tsx");
}

describe("typecheck", () => {
  it("passes the counter", () => {
    assert.deepEqual(typecheck(write("counter", counter)), {
      errors: [],
      warnings: [],
    });
  });

  it("reports type errors where they are in the file", () => {
    const file = write(
      "type",
      counter.replace("$useState<number>(0)", '$useState<number>("0")'),
    );
    assert.match(
      typecheck(file).errors.join("\n"),
      /^App\.tsx\(33,51\): error TS2345: Argument of type 'string'/,
    );
  });
  it("reports a regex escaped as if in a string as a warning, not an error", () => {
    const file = write(
      "warning",
      counter.replace(
        '{count + " taps"}',
        '{String(count).replace(/\\\\B/g, ",") + " taps"}',
      ),
    );
    const { errors, warnings } = typecheck(file);
    assert.deepEqual(errors, []);
    assert.match(
      warnings.join("\n"),
      /^App\.tsx\(38,65\): warning TS0: `\\\\B` in this regex matches a backslash/,
    );
  });
});

describe("typecheck's default export", () => {
  it("refuses an app whose default export isn't its Hono server", () => {
    const file = write(
      "export",
      counter.replace("export default app;", "export default styles;"),
    );
    assert.match(
      typecheck(file).errors.join("\n"),
      /^App\.tsx: error: the default export is the app's Hono server/,
    );
  });
});

// An app rendering `layout` at its root layout, `nested` at a nested one and
// `loading` at a loading state.
const nesting = ({
  layout,
  nested,
  loading,
}: Record<"layout" | "nested" | "loading", string>) =>
  `import { cs } from "@backtickjs/core";
import { backtickApp } from "@backtickjs/hono";
import { Hono } from "hono";
import { Stack } from "expo-router" with { backtick: "client" };
import { type ReactNode } from "react" with { backtick: "client" };
import { ActivityIndicator, Text } from "react-native" with { backtick: "client" };

const app = new Hono();
app.use(backtickApp(app));
app.get("/_layout", (context) => context.render(${layout}));
app.get("/day/_layout", (context) => context.render(${nested}));
app.get("/day/_loading", (context) => context.render(${loading}));
app.get("/day", (context) => context.render(cs\`<$Text>Today</$Text>\`));

export default app;
`;
const wellFormed = {
  layout: "cs`() => <$Stack />`",
  nested: "cs`({ children }: { children: ReactNode }) => <>{children}</>`",
  loading: "cs`<$ActivityIndicator />`",
};

describe("typecheck's layouts and loading states", () => {
  it("takes a layout that's a component and a loading state that isn't", () => {
    for (const [name, routes] of [
      ["", wellFormed],
      [
        "-optional-children",
        {
          ...wellFormed,
          layout:
            "cs`({ children }: { children?: ReactNode }) => <$Stack>{children}</$Stack>`",
        },
      ],
    ] as const) {
      assert.deepEqual(typecheck(write(`nesting${name}`, nesting(routes))), {
        errors: [],
        warnings: [],
      });
    }
  });

  it("refuses a root layout that isn't a component taking no props", () => {
    for (const [name, layout] of [
      ["element", "cs`<$Stack />`"],
      [
        "children",
        "cs`({ children }: { children: ReactNode }) => <$Stack>{children}</$Stack>`",
      ],
    ]) {
      assert.match(
        typecheck(
          write(
            `nesting-root-${name}`,
            nesting({ ...wellFormed, layout: layout! }),
          ),
        ).errors.join("\n"),
        /the root \/_layout is a component that takes no props/,
        name,
      );
    }
  });

  it("refuses an element at a nested layout", () => {
    assert.match(
      typecheck(
        write(
          "nesting-nested",
          nesting({ ...wellFormed, nested: "cs`<$Text>Day</$Text>`" }),
        ),
      ).errors.join("\n"),
      /a _layout answers a component, cs`\(\{ children \}\) => …`/,
    );
  });

  it("refuses a component at a loading state, even one it only may be", () => {
    for (const [name, loading] of [
      ["component", "cs`() => <$ActivityIndicator />`"],
      [
        "either",
        "Math.random() > 0.5 ? cs`<$ActivityIndicator />` : cs`() => <$ActivityIndicator />`",
      ],
    ]) {
      assert.match(
        typecheck(
          write(
            `nesting-loading-${name}`,
            nesting({ ...wellFormed, loading: loading! }),
          ),
        ).errors.join("\n"),
        /a _loading answers what it draws, an element/,
        name,
      );
    }
  });

  it("takes render destructured from the context, which has no path to check", () => {
    const source = nesting(wellFormed).replace(
      'app.get("/day", (context) => context.render(',
      'app.get("/day", ({ render }) => render(',
    );
    assert.deepEqual(typecheck(write("nesting-destructured", source)), {
      errors: [],
      warnings: [],
    });
  });
});

// What the runtime runs: the release, imported on its own, answering a
// phone's request.
async function release(source: string, name: string) {
  const { code } = await compile(write(name, source));
  const file = join(root, ".builds", "test", name, "release.mjs");
  writeFileSync(file, code!);
  const { default: app } = await import(file);
  return (path: string, modules: string) =>
    app.fetch(
      new Request(`http://app${path}`, {
        headers: { "x-backtick-modules": modules },
      }),
    ) as Promise<Response>;
}

describe("a release", () => {
  it("answers each route with its screen, bundled for the phone", async () => {
    const open = await release(counter, "release-counter");
    for (const path of ["/", "/day"]) {
      const answer = await open(path, phone);
      assert.equal(answer.status, 200);
      assert.equal(answer.headers.get("content-type"), "text/javascript");
      assert.match(await answer.text(), /require\("react-native"\)/);
    }
  });

  it("answers 426 for a module the phone doesn't provide", async () => {
    const open = await release(
      `import { isRunningInExpoGo } from "expo" with { backtick: "client" };\n` +
        counter.replace(
          "return <Screen />;",
          "$isRunningInExpoGo(); return <Screen />;",
        ),
      "release-import",
    );
    const answer = await open("/", phone);
    assert.equal(answer.status, 426);
    assert.match((await answer.json()).message, /expo/);
  });

  it("answers 404 for a path the app has no route for", async () => {
    const open = await release(counter, "release-404");
    assert.equal((await open("/nowhere", phone)).status, 404);
  });
});

describe("compile", () => {
  it("bundles the counter into one minified release, its server packages in it", async () => {
    const { code, errors } = await compile(write("counter", counter));
    assert.equal(errors, undefined);
    const imports = ts
      .createSourceFile("release.js", code!, ts.ScriptTarget.Latest)
      .statements.filter(ts.isImportDeclaration)
      .map(({ moduleSpecifier }) => (moduleSpecifier as ts.StringLiteral).text);
    assert.deepEqual([...new Set(imports)], ["node:async_hooks"]);
    assert.match(code!, /ClientVersionMismatch/);
    assert.ok(code!.length < 100_000, `${code!.length} bytes`);
  });
});
