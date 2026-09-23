export default ($d) => {
  const f1 = ($0) => $0();
  const f2 = ($0) => (row) => $0(row);
  const f3 = ($0) => $d[0] + $0;
  return element($d[5], [], () =>
    list(
      () => f1(() => [$d[1], $d[2], $d[3]]),
      f2((row) => element($d[4], [], () => () => f3(row))),
    ),
  );
};
