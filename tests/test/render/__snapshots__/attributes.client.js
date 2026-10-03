// 32:30
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => <a href="/counter" id="press">
      go
    </a>);
}

// 44:30
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => <div>
      <svg>
        <path />
      </svg>
    </div>);
}

// 61:29
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => <svg viewBox="0 0 279 38"/>);
}

// 69:29
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => <svg>
      <path stroke-width={2} fill-rule="evenodd"/>
      <filter color-interpolation-filters="sRGB"/>
    </svg>);
}

// 84:29
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => <svg>
      <linearGradient gradientTransform="rotate(90)"/>
      <feTurbulence numOctaves={3}/>
    </svg>);
}

// 95:29
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => <div tabIndex={2}/>);
}

// 104:12
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const [text, setText] = $splice0()("first");
    const [isOn, setIsOn] = $splice0()(false);
    return (<div>
          <input aria-label="text" value={text()}/>
          <input type="checkbox" aria-label="on" checked={isOn()}/>
          <button onclick={() => {
            setText("second");
            setIsOn(true);
        }}>
            write
          </button>
        </div>);
});
}
