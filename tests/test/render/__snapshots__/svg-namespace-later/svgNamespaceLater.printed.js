export default ($d) => {
  const f1 = ($0, $1) => {
    const xs = $0()([$d[0]]);
    const shown = $0()($d[1]);
    return element($d[17], [], () => [
      element($d[9], [[$d[2], () => $d[3], true]], () => [
        memo(() =>
          component($1(), [
            [$d[4], () => () => xs.get()],
            [
              $d[5],
              () => () => (x) => element($d[7], [], () => () => $d[6] + x),
            ],
          ]),
        ),
        memo(() => (shown.get() ? element($d[7], [], () => $d[8]) : null)),
      ]),
      element($d[7], [], () => $d[10]),
      element(
        $d[14],
        [[$d[11], () => () => xs.set([$d[0], $d[12]]), true]],
        () => $d[13],
      ),
      element(
        $d[14],
        [[$d[11], () => () => shown.set($d[15]), true]],
        () => $d[16],
      ),
    ]);
  };
  return f1(
    () => state,
    () => ($0) => list(() => $0.each(), $0.children()),
  );
};
