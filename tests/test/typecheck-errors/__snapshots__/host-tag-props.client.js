// 7:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (props) => (<section>{props.title}</section>));
}

// 12:24
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => ($Card => <$Card />)($splice0()));
}

// 15:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => ($Card => <$Card title={1}/>)($splice0()));
}

// 18:24
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => ($Card => <$Card title="x" nope={1}/>)($splice0()));
}

// 21:27
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => ($For => <$For each={[1]}>{(n) => n}</$For>)($splice0()));
}

// 24:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => ($Card => <$Card key="a" title="x"/>)($splice0()));
}
