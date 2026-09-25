// 23:10
export default ($0, $1, $2) => {
    const flag = $0()(true);
    const tone = $0()($1());
    const step = $0()(() => 0);
    return (<span onclick={() => {
            flag.set(false);
            tone.set($2());
            step.set(() => 1);
        }}>
        {flag.get() + " " + tone.get() + " " + step.get()()}
      </span>);
};
