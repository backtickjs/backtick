import { cs } from "@backtickjs/core";
// A component tag naming a binding the script holds calls it, so what the
// binding holds has to be a function: `Tag` here is a number.
// @ts-expect-error: JSX element type 'Tag' does not have any construct or call signatures.
const held = cs.create(
  "xwewmj2gozc5:6:13",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = () => Tag => (0, web_1.createComponent)(Tag, {});\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;kBAKgB,MAACA,GAAW,IAAAC,yBAAA,EAAMD,GAAG,KAAG","names":["Tag","_$createComponent"],"ignoreList":[],"sources":["typecheck-errors/script-element-bound-tag.test.tsx"]}',
  ["solid-js/web"],
);
