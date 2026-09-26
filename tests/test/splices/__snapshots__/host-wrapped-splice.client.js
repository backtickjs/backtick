// 17:10
export default ($0, $1) => {
  const outer = $0();
  return $1(outer);
};

// 19:18
export default ($0, $1) => {
  const middle = 10;
  return middle + $0($1);
};

// 21:30
export default $0 => $0;

// 27:10
export default $0 => $0() + 1;

// 38:5
export default ($0, $1) => $0() + $1();

// 38:15
export default () => 1;

// 38:32
export default () => 2;
