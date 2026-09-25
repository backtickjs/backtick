// 14:10
export default ($0) => <em>{"rows " + $0()}</em>;

// 18:10
export default () => <em>{"nothing to hand it"}</em>;

// 22:3
export default ($0) => (props) => $0(props);

// 22:51
export default ($0) => $0.count;

// 27:16
export default ($0, $1) => {
    const Rows = eval($0());
    const Empty = eval($1());
    const wrongType = <Rows count={"one"}/>;
    const unknownName = <Rows nope={1}/>;
    const missing = <Rows />;
    const called = <Empty count={1}/>;
    return (<div>
      
      <Rows count={1}/>
      {Empty}
      {wrongType}
      {unknownName}
      {missing}
      {called}
      
      {eval(null)}
    </div>);
};
