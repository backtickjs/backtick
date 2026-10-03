// 16:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const [said, setSaid] = $splice0()("");
    return (<form onsubmit={(event) => {
            event.preventDefault();
            setSaid(event.type + " " + event.cancelable);
        }}>
          <textarea oninput={(event) => setSaid(event.currentTarget.value)}/>
          <input oninput={(event) => setSaid(event.currentTarget.value)}/>
          <button onclick={(event) => setSaid(event.clientX + " " + event.currentTarget.tagName)}>
            {said()}
          </button>
        </form>);
});
}
