// 7:42
export default () => {
  const x = 1;
};

// 11:34
export default () => () => {
  let n = 0;
  n = 1;
};

// 20:5
export default ($0, $1) => b => {
  let n = 0;
  $0();
  if (b) {
    $1()();
    n = 1;
  }
  return n;
};
