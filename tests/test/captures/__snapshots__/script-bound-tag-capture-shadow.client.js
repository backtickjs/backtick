// 11:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => (props) => <h2>{props.title}</h2>);
}

// 16:10
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const Card = (props) => <i>{$splice0() + props.n}</i>;
    return <p>{$splice1(Card)}</p>;
});
}

// 18:18
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($capture0) => <$capture0 n={1}/>);
}

// 26:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1, $splice2) => (<div>
        {($Card => <$Card title="host"/>)($splice0())}
        {$splice1()}
        {$splice2()}
      </div>));
}

// 29:21
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => "a");
}

// 30:21
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => "b");
}

// 43:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => {
    const twice = (Card) => (<div>
          <Card n={1}/>
          <Card n={2}/>
        </div>);
    return (<section>
          {($Card => <$Card title="host"/>)($splice0())}
          {twice((props) => (<i>{"row " + props.n}</i>))}
        </section>);
});
}
