"use strict";
const { ScrollView: $i0 } = require("react-native");
const { Text: $i1 } = require("react-native");
const { useState: $i2 } = require("react");
const { Pressable: $i3 } = require("react-native");
const $module0 = require("react/jsx-runtime");
const $modules = {
"25wlsdb7ez0q4:20:9": (module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
exports.default = ($splice0, $splice1, $splice2, $splice3, $splice4) => ($ScrollView => /*#__PURE__*/ (0, jsx_runtime_1.jsxs)($ScrollView, {
    children: [($Text => /*#__PURE__*/ (0, jsx_runtime_1.jsxs)($Text, {
            children: ["Good morning, ", $splice2().name]
        }))($splice1()), ($ReorderButton => /*#__PURE__*/ (0, jsx_runtime_1.jsx)($ReorderButton, {
            order: $splice4()
        }))($splice3())]
}))($splice0());
},
"25wlsdb7ez0q4:7:22": (module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
exports.default = ($splice0, $splice1, $splice2) => props => {
    const [added, setAdded] = $splice0()(false);
    return ($Pressable => /*#__PURE__*/ (0, jsx_runtime_1.jsx)($Pressable, {
        onPress: () => setAdded(true),
        children: ($Text => /*#__PURE__*/ (0, jsx_runtime_1.jsx)($Text, {
            children: added ? "Added ✓" : "Reorder " + props.order.name
        }))($splice2())
    }))($splice1());
};
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
const $cs0 = $require("25wlsdb7ez0q4:20:9").default;
const $cs1 = $require("25wlsdb7ez0q4:7:22").default;
module.exports = ($cs0(() => ($i0), () => ($i1), () => ({ id: "u-7", name: "Sam" }), () => ($cs1(() => ($i2), () => ($i3), () => ($i1))), () => ({ id: "o-1042", name: "Flat white" })));