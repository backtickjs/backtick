export default ($d) => {
  const f1 = ($0, $1) => {
    const rows = $0()([]);
    const add = (row) => {
      rows.set([row]);
    };
    const label = (row) => {
      return row.label;
    };
    return element($d[9], [], () => [
      element(
        $d[6],
        [[$d[0], () => () => add({ [$d[1]]: $d[2], [$d[3]]: $d[4] }), true]],
        () => $d[5],
      ),
      element(
        $d[9],
        [],
        () => () =>
          component($1(), [
            [$d[7], () => () => rows.get()],
            [
              $d[8],
              () => () => (row) => element($d[6], [], () => () => label(row)),
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
