// 13:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const [size, setSize] = $splice0()(16);
    return (<span style={"font-size: " + size() + "px"} onclick={() => {
            setSize(size() + 1);
        }}>
        press
      </span>);
});
}

// 28:19
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => <div>
  {$splice0()}
  {$splice1()}
</div>);
}
