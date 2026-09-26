// 15:10
($splice0) => <em>{"rows " + $splice0()}</em>

// 19:10
() => <em>{"nothing to hand it"}</em>

// 23:3
($splice0) => (props) => $splice0(props)

// 23:51
($capture0) => $capture0.count

// 31:16
($splice0, $splice1) => {
    const Rows = eval($splice0());
    const Empty = eval($splice1());
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
