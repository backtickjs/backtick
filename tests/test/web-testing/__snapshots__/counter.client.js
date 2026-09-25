// 10:10
export default ($0) => {
    const count = $0()(0);
    return (<div>
        <button onclick={() => count.set(count.get() + 1)}>Add</button>
        <p>{"Count: " + count.get()}</p>
      </div>);
};
