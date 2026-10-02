// 12:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const word = "ab";
    return {
        padded: word.padStart(4) + "|" + word.padEnd(5, "-="),
        trimmed: "  x  ".trimStart() + "|" + "  x  ".trimEnd() + "|",
        at: [word.at(0), word.at(-1), word.at(5)],
        replaced: "a.b.c".replaceAll(".", "/"),
        replacedBy: "a.b".replaceAll(".", (found, offset) => "" + offset),
    };
});
}
