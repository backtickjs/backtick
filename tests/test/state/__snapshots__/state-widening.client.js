// 24:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => {
    const [flag, setFlag] = $splice0()(true);
    const [tone, setTone] = $splice0()($splice1());
    const [step, setStep] = $splice0()(() => 0);
    return (<span onclick={() => {
            setFlag(false);
            setTone($splice2());
            setStep(() => () => 1);
        }}>
        {flag() + " " + tone() + " " + step()()}
      </span>);
});
}
