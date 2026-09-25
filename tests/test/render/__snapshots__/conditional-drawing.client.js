// 31:10
export default ($0, $1, $2) => {
    const shown = $0()(false);
    const started = $1().setTimeout(() => {
        if ($2()()) {
            shown.set(true);
        }
    }, 0);
    return <>{shown.get() ? <em>shown</em> : <i>waiting</i>}</>;
};

// 44:28
export default ($0, $1) => {
    const builds = $0()(0);
    return (<div>
      <span>{"builds " + builds.get()}</span>
      <section>
        <$1 again={() => {
            builds.set(builds.get() + 1);
            return builds.get() < 5;
        }}/>
      </section>
    </div>);
};
