// 10:10
export default ($0) => {
    const label = $0()("hi");
    const row = (size) => {
        const css = "font-size: " + size + "px";
        const press = () => label.set("held");
        return (<div style={css}>
          <span style={css} onclick={() => label.set("pressed")}>
            {label.get()}
          </span>
          <span style="font-size: 8px">fixed</span>
          <span style={css} onclick={press}>
            held
          </span>
        </div>);
    };
    return <div style="padding: 0">{row(12)}</div>;
};
