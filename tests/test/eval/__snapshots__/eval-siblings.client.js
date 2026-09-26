// 10:10
export default () => <em>{"from another bundle"}</em>;

// 19:5
export default ($0) => <div>
      <span>before</span>
      {eval($0())}
      <span>after</span>
    </div>;
