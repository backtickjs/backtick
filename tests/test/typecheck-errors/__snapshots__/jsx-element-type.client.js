// 15:20
() => <div class="a"/>

// 19:27
() => <blink />

// 26:26
($tag0) => <$tag0 />

// 29:25
() => <Fragment>
  <span>a</span>
</Fragment>

// 33:26
() => <>
  <span>a</span>
</>

// 37:21
($tag0) => <$tag0 each={[]}>{(n) => <i>{n}</i>}</$tag0>

// 46:26
() => <div nosuch={1}/>

// 50:26
() => <div class={1}/>

// 54:34
() => <Fragment nosuch={1}/>

// 57:21
() => <div>hello</div>

// 58:23
() => <div>{1}</div>

// 59:23
() => <div>
  <span>a</span>
</div>
