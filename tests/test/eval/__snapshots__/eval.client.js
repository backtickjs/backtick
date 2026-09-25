// 11:10
export default ($0) => <$0 each={[1, 2, 3]}>
    {(n) => <span>{"item " + n}</span>}
  </$0>;

// 19:19
export default ($0, $1) => <div>
  {eval($0())}
  <b>{eval($1()) + 1}</b>
</div>;
