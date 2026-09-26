// 18:5
export default ($0) => {
    const held = $0()(null);
    return (<div>
          {held[0]() === null ? (<span>loading…</span>) : (eval(held[0]()))}
        </div>);
};
