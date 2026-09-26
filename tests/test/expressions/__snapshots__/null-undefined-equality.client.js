// 9:33
export default () => null === null;

// 10:33
export default () => undefined === undefined;

// 14:33
export default () => null !== undefined;

// 15:33
export default () => null === undefined;

// 24:22
export default ($0, $1) => {
  const names = ["a"];
  return [$0() === undefined, $0() !== null, $1() === null, $1() !== undefined, names[1] === undefined, names[1] !== null];
};
