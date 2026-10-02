// 13:10
($splice0) => {
    const size = $splice0()(16);
    return (<span style={"font-size: " + size[0]() + "px"} onclick={() => {
            size[1](size[0]() + 1);
        }}>
        press
      </span>);
}

// 28:19
($splice0, $splice1) => <div>
  {$splice0()}
  {$splice1()}
</div>
