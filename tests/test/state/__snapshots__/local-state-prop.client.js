// 17:12
($splice0) => "font-size: " + $splice0()[0]() + "px"

// 18:14
($splice0) => () => {
    $splice0()[1]($splice0()[0]() + 1);
}

// 27:10
($splice0, $tag1) => {
    const size = $splice0()(16);
    return (<div>
        <$tag1 size={size}/>
        <$tag1 size={size}/>
      </div>);
}
