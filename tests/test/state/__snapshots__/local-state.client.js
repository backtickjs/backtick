// 14:10
export default ($0) => {
    const size = $0()(16);
    return (<span style={"font-size: " + size[0]() + "px"} onclick={() => {
            size[1](size[0]() + 1);
        }}>
        press
      </span>);
};
