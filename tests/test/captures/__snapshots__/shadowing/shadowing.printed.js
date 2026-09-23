export default ($d) => {
  const f1 = ($0) => {
    const total = $d[0];
    return $0(total);
  };
  const f2 = ($0, $1) => {
    let total = $d[1];
    total = total + $0();
    total = total + $1();
    return total;
  };
  const f3 = ($0) => $0;
  return f1((total) =>
    f2(
      () => f3(total),
      () => $d[2],
    ),
  );
};
