"use strict";
const { View: $i0 } = require("react-native");
const { Text: $i1 } = require("react-native");
const $module0 = require("react/jsx-runtime");
const $modules = {
"1qlemy4wvzr85:23:9": (module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
exports.default = ($splice0, $splice1, $splice2, $splice3, $splice4) => ($View => /*#__PURE__*/ (0, jsx_runtime_1.jsxs)($View, {
    style: {
        padding: 24,
        gap: 8
    },
    children: [($Text => /*#__PURE__*/ (0, jsx_runtime_1.jsx)($Text, {
            style: {
                fontSize: 28,
                fontWeight: "bold"
            },
            children: $splice2()
        }))($splice1()), ($Text => /*#__PURE__*/ (0, jsx_runtime_1.jsx)($Text, {
            children: $splice4() ? "In stock" : "Sold out"
        }))($splice3())]
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
const $cs0 = $require("1qlemy4wvzr85:23:9").default;
const $thunk0 = () => ($i0);
const $thunk1 = () => ($i1);
const $thunk2 = () => ("Ceramic dripper");
const $thunk3 = () => (true);
module.exports = ($cs0($thunk0, $thunk1, $thunk2, $thunk1, $thunk3));