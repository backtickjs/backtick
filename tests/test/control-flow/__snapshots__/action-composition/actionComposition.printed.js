export default ($d) => {
  const f1 = ($0) => {
    $0();
  };
  const f2 = ($0) => {
    $0();
  };
  const f3 = () => {
    const x = $d[0];
  };
  return f1(() => f2(f3));
};
