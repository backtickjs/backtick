// JSX typed as React types it, through this package's `jsx-runtime`.
export const drawn = <div className="card">{1}</div>;

// @ts-expect-error: `className` is a string, not a number
export const wrong = <div className={1} />;
