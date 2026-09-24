// 8:33
() => (name) => "hello " + name

// 11:3
() => (props) => <b>{"count " + props.count}</b>

// 18:5
($0, $1) => <div>
      <span>{eval($0())("ada")}</span>
      {eval($1())({ count: 3 })}
    </div>
