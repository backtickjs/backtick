// 15:42
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0() + "!");
}

// 22:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const greeting = $splice0();
    return greeting + "!";
});
}

// 31:15
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (props) => <b>{props.children}</b>);
}

// 37:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => ($Badge => <$Badge>{$splice1()}</$Badge>)($splice0()));
}

// 47:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => (<p>
        {$splice0()}
        {[1, 2].map((n) => (($Badge => <$Badge>{n}</$Badge>)($splice1())))}
      </p>));
}

// 62:47
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => fetch("/rows"));
}
