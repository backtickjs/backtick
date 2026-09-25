// 13:10
export default ($0, $1) => {
    const selected = $0()(0);
    return (<div>
        <span onclick={() => selected.set(1)}>select</span>
        <div>
          <$1 each={[0, 1, 2]}>
            {(id) => (<a href={selected.get() === id ? "#open" : "#closed"}>
                {"row " + id}
              </a>)}
          </$1>
        </div>
      </div>);
};
