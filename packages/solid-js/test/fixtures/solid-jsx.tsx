// JSX typed as Solid types it, through this package's `jsx-runtime`.
export const drawn = <div class="card">{1}</div>;

// @ts-expect-error: `class` is a string, not a number
export const wrong = <div class={1} />;
