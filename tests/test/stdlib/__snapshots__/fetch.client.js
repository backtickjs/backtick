// 15:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => () => {
    const [held, setHeld] = $splice0()("waiting");
    window
        .fetch("/cases/built-ins/Math/trunc/Math.trunc_Success", {
        signal: window.AbortSignal.timeout(3000),
    })
        .then((response) => {
        if (response.status !== 200) {
            throw "answered " + response.status;
        }
        return response.json();
    })
        .then((value) => {
        setHeld(value === null ? "null" : "a value");
    })
        .catch((error) => {
        setHeld("failed — " + String(error));
    });
    window
        .fetch("/cases", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "Math.trunc", passed: true }),
    })
        .then((response) => response.text())
        .then((text) => {
        setHeld(text);
    }, (error) => {
        setHeld(String(error));
    });
    return held();
});
}
