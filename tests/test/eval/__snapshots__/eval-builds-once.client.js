// 42:10
() => <em>{"answered"}</em>

// 52:10
($0, $1, $2) => {
    const drawn = $0()(null);
    const started = $1().setTimeout(() => drawn.set($2()()), 0);
    return (<>
        {drawn.get() === null
            ? null
            : eval(drawn.get())}
      </>);
}

// 65:24
($0, $1, $2) => {
    const asked = $0()(0);
    return (<div>
      <span>{"asked " + asked.get()}</span>
      <$2 ask={() => {
            asked.set(asked.get() + 1);
            return asked.get() > 4 ? null : $1();
        }}/>
    </div>);
}
