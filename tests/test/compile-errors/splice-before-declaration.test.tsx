import { cs } from "@backtickjs/core";

// A splice is read when the `cs` line runs, even in a function of the script,
// where TypeScript would take a read as made when the function is called. So
// reading a host `const`, `let`, class or enum declared after the `cs` line is
// refused there. Each is in a function never called, so nothing reads one at
// runtime.

export function inFunction() {
  const Controls = cs`() => <div style={$styles.overlay} />`;
  const styles = { overlay: { color: "red" } };
  return Controls;
}

export function inFunctionInBlock() {
  const read = cs`{
    const get = () => $label;
    return get;
  }`;
  const label = "ready";
  return read;
}

export function braced() {
  const value = cs`() => ${config.size} * 2`;
  const config = { size: 4 };
  return value;
}

export function asTag() {
  const page = cs`() => <$Card />`;
  const Card = cs`() => <b>card</b>`;
  return page;
}

export function inNestedScript() {
  const outer = cs`() => {
    const name = "n";
    return ${cs`name + $suffix`};
  }`;
  const suffix = "!";
  return outer;
}

export function aClass() {
  const make = cs`() => new $Point()`;
  class Point {}
  return make;
}

// Nothing to refuse: declared above, or read where the host reads it later.

export function declaredAbove() {
  const styles = { overlay: { color: "red" } };
  return cs`() => <div style={$styles.overlay} />`;
}

export function inHostFunction() {
  const later = () => cs`() => $ready`;
  const ready = true;
  return later;
}

export function inHostFunctionInSplice() {
  const read = cs`() => ${() => ready}`;
  const ready = true;
  return read;
}

export function hoisted() {
  const read = cs`() => $hoist()`;
  function hoist() {
    return 1;
  }
  return read;
}
