// 17:5
export default ($0) => {
    const held = $0()(null);
    return (<div>
          {held.get() === null ? (<span>loading…</span>) : (eval(held.get()))}
        </div>);
};
