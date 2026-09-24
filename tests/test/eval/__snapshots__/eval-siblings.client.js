// 9:10
() => <em>{"from another bundle"}</em>

// 18:5
$0 => <div>
      <span>before</span>
      {eval($0())}
      <span>after</span>
    </div>
