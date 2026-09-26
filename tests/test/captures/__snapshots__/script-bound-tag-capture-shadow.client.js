// 16:10
($0, $1) => {
    const Card = (props) => <i>{$0() + props.n}</i>;
    return <p>{$1(Card)}</p>;
}

// 18:18
($0) => <$0 n={1}/>

// 26:5
($0, $1, $2) => <div>
      <$2 title="host"/>
      {$0()}
      {$1()}
    </div>

// 28:19
() => "a"

// 29:19
() => "b"

// 41:5
($0) => {
    const twice = (Card) => (<div>
          <Card n={1}/>
          <Card n={2}/>
        </div>);
    return (<section>
          <$0 title="host"/>
          {twice((props) => (<i>{"row " + props.n}</i>))}
        </section>);
}
