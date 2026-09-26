// 44:10
export default () => <em>{"answered"}</em>;

// 54:10
export default ($0, $1, $2) => {
    const drawn = $0()(null);
    const started = $1().setTimeout(() => drawn[1]($2()()), 0);
    return (<>
        {drawn[0]() === null
            ? null
            : eval(drawn[0]())}
      </>);
};

// 67:24
export default ($0, $1, $2) => {
    const asked = $0()(0);
    return (<div>
      <span>{"asked " + asked[0]()}</span>
      <$2 ask={() => {
            asked[1](asked[0]() + 1);
            return asked[0]() > 4 ? null : $1();
        }}/>
    </div>);
};
