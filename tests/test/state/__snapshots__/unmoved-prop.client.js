// 14:10
export default ($0, $1, $2) => {
    const selected = $0()(0);
    const isSelected = $1()(selected[0]);
    return (<div>
        <span onclick={() => selected[1](1)}>select</span>
        <div>
          <$2 each={[0, 1, 2]}>
            {(id) => (<a href={isSelected(id) ? "#open" : "#closed"}>{"row " + id}</a>)}
          </$2>
        </div>
      </div>);
};
