// 13:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const twice = (Row) => (<ul>
          {$splice0(Row)}
          {$splice1(Row)}
        </ul>);
    return twice((p) => <li>{"row " + p.n}</li>);
});
}

// 16:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => <$capture0 n={1}/>);
}

// 17:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => <$capture0 n={2}/>);
}
