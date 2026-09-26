// 17:10
($splice0, $splice1) => {
    const Card = (props) => <i>{$splice0() + props.n}</i>;
    return <p>{$splice1(Card)}</p>;
}

// 19:18
($capture0) => <$capture0 n={1}/>

// 27:5
($splice0, $splice1, $tag2) => <div>
      <$tag2 title="host"/>
      {$splice0()}
      {$splice1()}
    </div>

// 29:19
() => "a"

// 30:19
() => "b"

// 42:5
($tag0) => {
    const twice = (Card) => (<div>
          <Card n={1}/>
          <Card n={2}/>
        </div>);
    return (<section>
          <$tag0 title="host"/>
          {twice((props) => (<i>{"row " + props.n}</i>))}
        </section>);
}
