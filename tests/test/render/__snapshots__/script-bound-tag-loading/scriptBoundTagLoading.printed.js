export default ($d) => {
  const f1 = ($0, $1, $2) => {
    const count = $0()($d[0]);
    const drawn = $0()(null);
    const Badge = (props) => {
      const held = drawn.get();
      return held === null ? null : $1()(held)(props);
    };
    return element($d[9], [], () => [
      memo(() =>
        drawn.get() === null
          ? element($d[2], [], () => $d[1])
          : component(Badge, [[$d[3], () => count.get()]]),
      ),
      element($d[6], [[$d[4], () => () => drawn.set($2()), true]], () => $d[5]),
      element(
        $d[6],
        [[$d[4], () => () => count.set(count.get() + $d[7]), true]],
        () => $d[8],
      ),
    ]);
  };
  return f1(
    () => state,
    () => evaluate,
    () => ({
      [$d[10]]: {
        [$d[11]]: [
          $d[12],
          [],
          [
            $d[12],
            [[$d[13], $d[14]]],
            [
              $d[15],
              $d[16],
              {},
              [$d[17], $d[18], [$d[19], [$d[20], $d[14]], $d[3]]],
            ],
          ],
        ],
      },
      [$d[21]]: [$d[22], [$d[23], $d[11]], []],
    }),
  );
};
