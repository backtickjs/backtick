// 15:12
$0 => "font-size: " + $0().get() + "px"

// 16:14
$0 => () => {
    $0().set($0().get() + 1);
}

// 25:10
($0, $1) => {
    const size = $0()(16);
    return (<div>
        <$1 size={size}/>
        <$1 size={size}/>
      </div>);
}
