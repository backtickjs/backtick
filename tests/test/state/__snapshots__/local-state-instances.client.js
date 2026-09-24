// 12:10
$0 => {
    const size = $0()(16);
    return (<span style={"font-size: " + size.get() + "px"} onclick={() => {
            size.set(size.get() + 1);
        }}>
        press
      </span>);
}
