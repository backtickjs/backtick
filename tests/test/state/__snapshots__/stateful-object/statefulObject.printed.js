export default ($d) => {
  const f1 = ($0) => {
    const c = $0()($d[0]);
    return element(
      $d[3],
      [
        [
          $d[1],
          () => () => {
            c.add($d[2]);
          },
          true,
        ],
      ],
      () => () => c.get(),
    );
  };
  const f2 = ($0) => (initial) => {
    const count = $0()(initial);
    return {
      [$d[4]]: () => count.get(),
      [$d[5]]: (n) => {
        count.set(count.get() + n);
      },
    };
  };
  return f1(() => f2(() => state));
};
