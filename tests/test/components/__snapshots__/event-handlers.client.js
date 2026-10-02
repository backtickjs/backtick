// 16:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const said = $splice0()("");
    return (<form onsubmit={(event) => {
            event.preventDefault();
            said[1](event.type + " " + event.cancelable);
        }}>
          <textarea oninput={(event) => said[1](event.currentTarget.value)}/>
          <input oninput={(event) => said[1](event.currentTarget.value)}/>
          <button onclick={(event) => said[1](event.clientX + " " + event.currentTarget.tagName)}>
            {said[0]()}
          </button>
        </form>);
});
}
