// 17:12
export default ($0) => "font-size: " + $0()[0]() + "px";

// 18:14
export default ($0) => () => {
    $0()[1]($0()[0]() + 1);
};

// 27:10
export default ($0, $1) => {
    const size = $0()(16);
    return (<div>
        <$1 size={size}/>
        <$1 size={size}/>
      </div>);
};
