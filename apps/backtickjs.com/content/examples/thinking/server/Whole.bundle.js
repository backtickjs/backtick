"use strict";
const { Text: $i0 } = require("react-native");
const $module0 = require("react/jsx-runtime");
const $modules = {
"chpeziv4ml4:8:9": (module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
exports.default = ($splice0, $splice1) => ($Text => /*#__PURE__*/ (0, jsx_runtime_1.jsxs)($Text, {
    children: ["Hello, ", $splice1().name]
}))($splice0());
},
};
const $exports = {
"react/jsx-runtime": $module0,
};
const $require = (id) => {
  if (!(id in $exports)) {
    const module = { exports: {} };
    $exports[id] = module.exports;
    $modules[id](module, module.exports, $require);
    $exports[id] = module.exports;
  }
  return $exports[id];
};
const $cs0 = $require("chpeziv4ml4:8:9").default;
const $thunk0 = () => ($i0);
const $thunk1 = () => ({ id: "u1", name: "Ada", email: "ada@example.com" });
module.exports = ($cs0($thunk0, $thunk1));