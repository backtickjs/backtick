export default ($d) => {
  const f1 = ($0, $1, $2) => {
    const count = $0()($d[0]);
    const Badge = $1()($2());
    return element($d[6], [], () => [
      memo(() => component(Badge, [[$d[1], () => count.get()]])),
      element(
        $d[5],
        [[$d[2], () => () => count.set(count.get() + $d[3]), true]],
        () => $d[4],
      ),
    ]);
  };
  return f1(
    () => state,
    () => evaluate,
    () => ({
      [$d[7]]: {
        [$d[8]]: [
          $d[9],
          [],
          [
            $d[9],
            [[$d[10], $d[11]]],
            [
              $d[12],
              $d[13],
              {},
              [$d[14], $d[15], [$d[16], [$d[17], $d[11]], $d[1]]],
            ],
          ],
        ],
      },
      [$d[18]]: [$d[19], [$d[20], $d[8]], []],
    }),
  );
};
