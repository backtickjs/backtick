export default ($d) => {
  const f1 = ($0, $1) => {
    const Dot = (props) =>
      element(
        $d[7],
        [
          [$d[0], () => props.x, false],
          [$d[1], () => $d[2], true],
          [$d[3], () => $d[4], true],
        ],
        () => element($d[6], [], () => () => $d[5] + props.x),
      );
    return element($d[29], [], () => [
      element($d[11], [[$d[8], () => $d[9], true]], () => $d[10]),
      element(
        $d[28],
        [
          [$d[12], () => $d[13], true],
          [$d[14], () => $d[15], true],
        ],
        () => [
          memo(() => component($0(), [])),
          memo(() =>
            component($1(), [
              [$d[16], () => () => [$d[17], $d[18]]],
              [$d[19], () => () => (x) => component(Dot, [[$d[20], () => x]])],
            ]),
          ),
          element(
            $d[27],
            [
              [$d[20], () => $d[21], true],
              [$d[22], () => $d[21], true],
              [$d[14], () => $d[23], true],
              [$d[24], () => $d[23], true],
            ],
            () => element($d[26], [], () => $d[25]),
          ),
        ],
      ),
    ]);
  };
  const f2 = () =>
    element(
      $d[7],
      [
        [$d[0], () => $d[2], true],
        [$d[1], () => $d[2], true],
        [$d[3], () => $d[30], true],
        [$d[31], () => $d[32], true],
        [$d[33], () => $d[34], true],
      ],
      null,
    );
  return f1(
    () => () => f2(),
    () => ($0) => list(() => $0.each(), $0.children()),
  );
};
