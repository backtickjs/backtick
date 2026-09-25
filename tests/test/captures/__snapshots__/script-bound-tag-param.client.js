// 13:5
export default ($0, $1) => {
    const twice = (Row) => (<ul>
          {$0(Row)}
          {$1(Row)}
        </ul>);
    return twice((p) => <li>{"row " + p.n}</li>);
};

// 16:14
export default ($0) => <$0 n={1}/>;

// 17:14
export default ($0) => <$0 n={2}/>;
