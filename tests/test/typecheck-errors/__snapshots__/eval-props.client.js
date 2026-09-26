// 15:10
($0) => <em>{"rows " + $0()}</em>

// 19:10
() => <em>{"nothing to hand it"}</em>

// 23:3
($0) => (props) => $0(props)

// 23:51
($0) => $0.count

// 31:16
($0, $1) => {
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
}
