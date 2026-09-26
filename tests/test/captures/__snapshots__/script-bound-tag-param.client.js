// 13:5
($splice0, $splice1) => {
    const twice = (Row) => (<ul>
          {$splice0(Row)}
          {$splice1(Row)}
        </ul>);
    return twice((p) => <li>{"row " + p.n}</li>);
}

// 16:14
($capture0) => <$capture0 n={1}/>

// 17:14
($capture0) => <$capture0 n={2}/>
