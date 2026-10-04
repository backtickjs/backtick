import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
const $module0 = {
  id: "135u7j9c37e3n:9:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`);\nexports.default = () => props => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => props.n);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAQiB,MAACA,KAAoB;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAASD,KAAK,CAACI,CAAC;IAAA,OAAAH,IAAA;AAAA,IAAK","names":["props","_el$","_tmpl$","_$insert","n"],"ignoreList":[],"sources":["bundler/client-component-on-host.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
// A client component written as a tag on the host, past the typechecker:
// refused when bundling, as it is a tag in a script.
const Badge = cs.create($module0, []);
it("refuses a client import as a tag on the host", async () => {
  await assert.rejects(
    bundler.build({
      // @ts-expect-error: JSX element type 'For' does not have any construct or call signatures.
      input: _jsx(For, { each: [1], children: (n) => n }),
      external: { "solid-js": "1.9.14" },
    }),
    {
      message:
        "`<For>` is a client component, so it can't be a tag on the host. Use it as a tag in a script.",
    },
  );
});
it("refuses a script as a tag on the host", async () => {
  await assert.rejects(
    bundler.build({
      // @ts-expect-error: JSX element type 'Badge' does not have any construct or call signatures.
      input: _jsx(Badge, { n: 1 }),
      external: { "solid-js": "1.9.14" },
    }),
    {
      message:
        "A script is a client component, so it can't be a tag on the host. Use it as a tag in a script.",
    },
  );
});
