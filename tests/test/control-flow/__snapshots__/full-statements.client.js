// 13:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => {
    {
        var late = 1;
    }
    let total = 0;
    for (var i = 0; i < 3; i = i + 1) {
        total = total + i;
    }
    return late + " " + total + " " + i;
}));
}

// 31:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => {
    let x;
    const a = 1, b = 2;
    return [x, a + b];
}));
}

// 45:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => {
    const seen = [];
    outer: for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (j === 1)
                continue outer;
            if (i === 2)
                break outer;
            seen.push(i + ":" + j);
        }
    }
    return seen;
}));
}

// 64:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => {
    const log = [];
    const run = (fail) => {
        try {
            if (fail)
                throw new Error("no");
            log.push("tried");
        }
        catch (error) {
            log.push("caught");
        }
        finally {
            log.push("finally");
        }
    };
    run(false);
    run(true);
    const overridden = (() => {
        try {
            return 1;
        }
        finally {
            return 2;
        }
    })();
    return [log, overridden];
}));
}

// 95:9
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => $splice0()(() => {
    try {
        throw new Error("boom");
    }
    catch ({ message }) {
        return message;
    }
}));
}
