// 30:14
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0) => (props) => {
    const [shown, setShown] = $splice0()(false);
    const started = window.setTimeout(() => {
        if (props.again()) {
            setShown(true);
        }
    }, 0);
    return <>{shown() ? <em>shown</em> : <i>waiting</i>}</>;
});
}

// 42:28
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => {
    const [builds, setBuilds] = $splice0()(0);
    return (<div>
      <span>{"builds " + builds()}</span>
      <section>
        {($Held => <$Held again={() => {
                setBuilds(builds() + 1);
                return builds() < 5;
            }}/>)($splice1())}
      </section>
    </div>);
});
}
