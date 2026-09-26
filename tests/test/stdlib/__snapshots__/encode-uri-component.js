import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A whole name rather than a front, so the call crosses as the one name and
// its argument. What a query is built from: a reserved character, a space and a
// character past ASCII each come out percent-encoded, and a number is written
// as a string first. Decoding reads the same bytes back.
async function Encoded() {
  return cs.create(
    "3tch88psikxru:10:9",
    { params: [] },
    {
      code: 'export default () => {\n    return (<span>\n        {"/at?q=" +\n            encodeURIComponent("a b+c&d#\u00E9") +\n            "&page=" +\n            encodeURIComponent(2.5) +\n            " " +\n            decodeURIComponent("a%20b%2Bc%26d%23%C3%A9")}\n      </span>);\n};',
      map: '{"version":3,"file":"encode-uri-component.test.jsx","sourceRoot":"","sources":["encode-uri-component.test.tsx"],"names":[],"mappings":"eASY;IACR,OAAO,CACL,CAAC,IAAI,CACH;QAAA,CAAC,QAAQ;YACP,kBAAkB,CAAC,WAAW,CAAC;YAC/B,QAAQ;YACR,kBAAkB,CAAC,GAAG,CAAC;YACvB,GAAG;YACH,kBAAkB,CAAC,wBAAwB,CAAC,CAChD;MAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
it("Encoded", async (t) => {
  await snapshotCase(t, "Encoded", _jsx(Encoded, {}));
});
