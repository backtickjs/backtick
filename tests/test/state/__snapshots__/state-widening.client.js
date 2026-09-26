// 24:10
export default ($0, $1, $2) => {
    const flag = $0()(true);
    const tone = $0()($1());
    const step = $0()(() => 0);
    return (<span onclick={() => {
            flag[1](false);
            tone[1]($2());
            step[1](() => () => 1);
        }}>
        {flag[0]() + " " + tone[0]() + " " + step[0]()()}
      </span>);
};
