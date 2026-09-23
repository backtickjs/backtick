export default ($d) => {
  const f1 = ($0) => {
    const size = $0()($d[0]);
    return element(
      $d[7],
      [
        [$d[1], () => $d[2] + size.get() + $d[3], false],
        [
          $d[4],
          () => () => {
            size.set(size.get() + $d[5]);
          },
          true,
        ],
      ],
      () => $d[6],
    );
  };
  return component(() => f1(() => state), []);
};
