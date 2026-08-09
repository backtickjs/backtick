import { cs } from "@backtickjs/core";

// Storage a script declares for itself, rather than one a component owns and
// splices in. `state(...)` is a declaration and not a call of a name: each time
// the declaration is evaluated there is another cell, which is what lets a
// script build a row that carries its own.
async function Rows() {
  const build = cs`(label: string) => {
    return { label: state(label) };
  }`;

  return (
    <span
      style={cs`"font-size: 16px"`}
      onclick={cs`() => {
        const row = $build("one");
        row.label.write(row.label.read() + " !!!");
      }`}
    >
      {cs`$build("one").label.read()`}
    </span>
  );
}

export default <Rows />;
