export default ($d) => {
  const f1 = ($0) => {
    const count = $0()($d[0]);
    return element(
      $d[13],
      [
        [$d[1], () => $d[2], true],
        [$d[3], () => $d[4], true],
        [$d[5], () => () => count.set(count.get() + $d[6]), true],
      ],
      () => [
        element(
          $d[10],
          [[$d[3], () => $d[7], true]],
          () => () => (count.get() > $d[0] ? $d[8] : $d[9]),
        ),
        element($d[10], [], () => () => $d[11] + count.get() + $d[12]),
      ],
    );
  };
  return component(() => f1(() => state), []);
};
