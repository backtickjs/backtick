// 5:14
export default () => () => {
  let n = 0;
  n = 1;
};

// 10:16
export default $0 => {
  const x = $0()();
  return 1;
};

// 15:16
export default $0 => {
  const x = $0()();
};

// 21:15
export default () => text => {
  return text;
};

// 25:23
export default $0 => {
  const x = $0()(true);
  return 1;
};
