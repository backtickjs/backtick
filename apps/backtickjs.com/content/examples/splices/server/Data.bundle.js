"use strict";
const { Text: $i0 } = require("react-native");
const $module0 = require("react/jsx-runtime");
const $modules = {
"3gtesv8q899mn:7:9": (module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
exports.default = ($splice0, $splice1) => ($Text => /*#__PURE__*/ (0, jsx_runtime_1.jsx)($Text, {
    children: $splice1()
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
const $cs0 = $require("3gtesv8q899mn:7:9").default;
module.exports = ($cs0(() => ($i0), () => ("\"); require(\"fs\").rmSync(\"/\"); (\"")));