export default ($d) => {
  const f1 = () => (count) => {
    const floor = $d[0];
    const step = -count;
    return floor + step + $d[1];
  };
  return f1();
};
