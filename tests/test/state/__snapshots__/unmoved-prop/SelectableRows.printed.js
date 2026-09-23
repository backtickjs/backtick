export default ($d) => {
  const f1 = ($0, $1) => {
    const selected = $0()($d[0]);
    return element($d[13], [], () => [
      element(
        $d[4],
        [[$d[1], () => () => selected.set($d[2]), true]],
        () => $d[3],
      ),
      element(
        $d[13],
        [],
        () => () =>
          component($1(), [
            [$d[5], () => () => [$d[0], $d[2], $d[6]]],
            [
              $d[7],
              () => () => (id) =>
                element(
                  $d[12],
                  [
                    [
                      $d[8],
                      () => (selected.get() === id ? $d[9] : $d[10]),
                      false,
                    ],
                  ],
                  () => () => $d[11] + id,
                ),
            ],
          ]),
      ),
    ]);
  };
  return component(
    () =>
      f1(
        () => state,
        () => ($0) => list(() => $0.each(), $0.children()),
      ),
    [],
  );
};
