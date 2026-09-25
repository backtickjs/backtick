// 11:10
export default ($0) => {
    const greet = $0()((name) => "hi " + name);
    return (<span onclick={() => greet.set((name) => "bye " + name)}>
        {greet.get()("ada")}
      </span>);
};
