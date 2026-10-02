// 10:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    return (<span>
        {"/at?q=" +
            encodeURIComponent("a b+c&d#é") +
            "&page=" +
            encodeURIComponent(2.5) +
            " " +
            decodeURIComponent("a%20b%2Bc%26d%23%C3%A9")}
      </span>);
});
}
