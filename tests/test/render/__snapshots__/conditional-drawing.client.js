// 32:10
export default ($0, $1, $2) => {
    const shown = $0()(false);
    const started = $1().setTimeout(() => {
        if ($2()()) {
            shown[1](true);
        }
    }, 0);
    return <>{shown[0]() ? <em>shown</em> : <i>waiting</i>}</>;
};

// 45:28
export default ($0, $1) => {
    const builds = $0()(0);
    return (<div>
      <span>{"builds " + builds[0]()}</span>
      <section>
        <$1 again={() => {
            builds[1](builds[0]() + 1);
            return builds[0]() < 5;
        }}/>
      </section>
    </div>);
};
