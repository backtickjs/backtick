const tag = cs`<div class="c">{x}</div>`;
const component = cs`<For each={xs}>{(x) => <Row of={x} />}</For>`;
const fragment = cs`<>{x}</>`;
const later = cs`() => {
  return <For each={xs}>{(x) => <Row of={x} />}</For>;
}`;
const compared = cs`(a: number, b: number) => a < b`;
