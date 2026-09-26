// 15:10
export default $0 => {
  const total = 1;
  {
    const total = 2;
    return total + $0();
  }
};

// 28:5
export default ($0, $1) => $0() + $1();

// 28:23
export default () => 10;

// 28:49
export default () => 20;
