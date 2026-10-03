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
exports.default = (($tag0) => <$tag0 />);
}

// 15:22
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0) => <$tag0 title={1}/>);
}

// 18:24
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0) => <$tag0 title="x" nope={1}/>);
}

// 21:27
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0) => <$tag0 each={[1]}>{(n) => n}</$tag0>);
}
